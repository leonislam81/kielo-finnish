# Kielo dictionary data attribution

## Finnish–English headwords and definitions

The optional compressed dictionary in `fi-en-dictionary.json.gz` is a transformed copy of the `fi-en` StarDict release by koreader-dicts, built from FinnWordNet (`omw-fi`, via Open Multilingual Wordnet 1.4), Princeton WordNet 3.0 (`pwn30`), and Finnish entries from English Wiktionary (`wikt-fi-en`, via kaikki.org / wiktextract). The source declares the compilation **CC BY-SA 4.0**. The included `fi-en-ATTRIBUTION.txt` and `fi-en-LICENSE.txt` preserve the release’s attribution and licence notices. The dataset is not affiliated with the KOReader project.

- Dataset description, counts and coverage: <https://danielgregorini.github.io/koreader-dicts/fr/fi-en/>
- Upstream project: <https://github.com/DanielGregorini/koreader-dicts>
- CC BY-SA 4.0: <https://creativecommons.org/licenses/by-sa/4.0/>
- Princeton WordNet 3.0 licence: <https://wordnet.princeton.edu/license-and-commercial-use>

The dictionary contains both translations and English-only definitions. An English explanation is not always a direct translation. The source reports translations for 82.78% of entries. Finnish inflection forms are not included in Kielo’s compact browser-search file; searching a declined or conjugated form may require its headword.

## Frequency data used by Daily 100

`fi-en-frequent.json.gz` contains definitions matched to headwords in the top-10,000 slice of the Yle Uutisten taajuussanakirja. The source is attributed as follows:

> Yle Uutisten taajuussanakirja — a news-based Finnish frequency dictionary, Daniel Radice, CC BY 4.0. Derived from the Yle Finnish News Archive 2011–2024 (© Yle, CC BY 4.0, via Kielipankki) and the Kotus Nykysuomen sanalista (© Kotus, CC BY 4.0).

- Frequency data and methods: <https://github.com/danradice/yle-uutiset-taajuussanakirja>
- Frequency dataset DOI: <https://doi.org/10.5281/zenodo.22162057>
- CC BY 4.0: <https://creativecommons.org/licenses/by/4.0/>

The Daily 100 picker uses the frequency list to draw a different date-seeded set from 9,910 exact headword matches. The frequency counts come from Finnish Yle news archives from 2011–2024; they are not a universal ranking of everyday speech.

Kielo’s word list and study activities are original learner materials; they do not reproduce the full upstream datasets in their original format.
