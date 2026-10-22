#!/usr/bin/env python3
"""Build Kielo's compact open Finnish–English dictionary and frequency deck.

Usage:
  python tools/build_finnish_data.py <path-to-fi-en-folder> <path-to-top10000.tsv>

The source files are published by their respective projects under CC BY-SA 4.0
and CC BY 4.0. Keep the supplied attribution files beside the generated assets.
"""

from __future__ import annotations

import gzip
import html
import json
import re
import struct
import sys
from html.parser import HTMLParser
from pathlib import Path


BLOCK_TAGS = {"br", "div", "p", "li", "tr", "section"}


class PlainText(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.bold_parts: list[str] = []
        self.current_bold: list[str] = []
        self.bold_depth = 0

    def handle_starttag(self, tag: str, _attrs: list[tuple[str, str | None]]) -> None:
        if tag in BLOCK_TAGS:
            self.parts.append("\n")
        if tag == "b":
            if self.bold_depth == 0:
                self.current_bold = []
            self.bold_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag in BLOCK_TAGS:
            self.parts.append("\n")
        if tag == "b":
            self.bold_depth = max(0, self.bold_depth - 1)
            if self.bold_depth == 0 and self.current_bold:
                self.bold_parts.append(" ".join(self.current_bold))
                self.current_bold = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)
        if self.bold_depth:
            self.current_bold.append(data)

    def text(self) -> str:
        value = html.unescape(" ".join(self.parts))
        lines = [re.sub(r"\s+", " ", line).strip() for line in value.splitlines()]
        return " · ".join(line for line in lines if line)[:900]

    def best_gloss(self) -> str:
        value = re.sub(r"\s+", " ", self.bold_parts[0] if self.bold_parts else "").strip()
        if value:
            return value[:160]
        value = self.text()
        value = re.sub(r"^\s*/[^/]+/\s*·\s*", "", value)
        value = re.sub(r"^(?:(?:prop\.|proper noun|abbrev\.|n\.|v\.|adj\.|adv\.|pron\.|interj\.)\s*)+", "", value, flags=re.I)
        value = re.sub(r"^\d+\.\s*", "", value)
        return value[:160].strip()


def clean_definition(fragment: bytes) -> str:
    parser = PlainText()
    parser.feed(fragment.decode("utf-8", "replace"))
    parser.close()
    return parser.text()


def concise_gloss(fragment: bytes) -> str:
    parser = PlainText()
    parser.feed(fragment.decode("utf-8", "replace"))
    parser.close()
    return parser.best_gloss()


def frequency_rows(path: Path) -> list[tuple[str, str, int]]:
    rows: list[tuple[str, str, int]] = []
    for line in path.read_text(encoding="utf-8-sig").splitlines()[1:]:
        fields = line.split("\t")
        if len(fields) != 3:
            continue
        word, part_of_speech, count = fields
        try:
            rows.append((word, part_of_speech, int(count)))
        except ValueError:
            continue
    return rows


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    source = Path(sys.argv[1])
    frequency_path = Path(sys.argv[2])
    out_dir = Path("dist/data")
    out_dir.mkdir(parents=True, exist_ok=True)

    index = (source / "fi-en.idx").read_bytes()
    definitions = gzip.decompress((source / "fi-en.dict.dz").read_bytes())
    rows = frequency_rows(frequency_path)
    frequency_by_word: dict[str, int] = {}
    for word, _pos, count in rows:
        frequency_by_word[word] = frequency_by_word.get(word, 0) + count
    frequent_entries: list[list[object]] = []
    seen_frequency: set[str] = set()
    dictionary_count = 0
    cursor = 0

    full_path = out_dir / "fi-en-dictionary.json.gz"
    with full_path.open("wb") as raw_file, gzip.GzipFile(
        fileobj=raw_file, mode="wb", compresslevel=9, mtime=0
    ) as output:
        output.write(b"[")
        first = True
        while cursor < len(index):
            key_end = index.find(b"\0", cursor)
            if key_end < 0 or key_end + 9 > len(index):
                break
            word = index[cursor:key_end].decode("utf-8", "replace").strip()
            offset, size = struct.unpack(">II", index[key_end + 1 : key_end + 9])
            cursor = key_end + 9
            if not word:
                continue
            end = min(offset + size, len(definitions))
            definition = clean_definition(definitions[offset:end])
            if not definition:
                continue
            count = frequency_by_word.get(word, 0)
            entry: list[object] = [word, definition, count]
            if not first:
                output.write(b",")
            output.write(json.dumps(entry, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))
            first = False
            dictionary_count += 1
            key = word
            if count and key not in seen_frequency:
                seen_frequency.add(key)
                frequent_entries.append([word, concise_gloss(definitions[offset:end]), count])
        output.write(b"]")

    frequent_entries.sort(key=lambda item: (-int(item[2]), str(item[0]).casefold(), str(item[0])))
    frequent_path = out_dir / "fi-en-frequent.json.gz"
    with frequent_path.open("wb") as raw_file, gzip.GzipFile(
        fileobj=raw_file, mode="wb", compresslevel=9, mtime=0
    ) as output:
        output.write(json.dumps(frequent_entries, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))

    print(f"Headword entries: {dictionary_count:,}")
    print(f"Frequency-list entries with a dictionary definition: {len(frequent_entries):,} / {len(rows):,}")
    for path in (full_path, frequent_path):
        print(f"{path}: {path.stat().st_size / (1024 * 1024):.2f} MiB gzip")


if __name__ == "__main__":
    main()
