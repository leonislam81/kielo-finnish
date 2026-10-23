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

## Guided Finnish inflection examples

Kielo's curated learner guide contains noun examples and present and simple-past tables for 14 everyday verbs. Present and past forms are checked against Aalto OpenLearning's Finnish grammar and beginner materials; Kotus guidance informs the explanation of the simple-past -i-/-si- marker. The positive past forms of *voida* match its present forms, so the learner guide labels both readings and explains that context distinguishes the tense. The Aalto course content is available under CC BY 4.0; the app links to the sources. The noun examples are a selected practice set informed by Kotus guidance on Finnish inflection. These tables are not a complete morphological dictionary or analyzer.

- Aalto OpenLearning — Finnish verb grammar: <https://openlearning.aalto.fi/mod/book/tool/print/index.php?id=10299>
- Aalto OpenLearning — positive simple past: <https://openlearning.aalto.fi/mod/book/view.php?id=10295>
- Aalto OpenLearning — beginner example *Mä asuin*: <https://openlearning.aalto.fi/mod/page/view.php?id=17004>
- Kotus — simple-past marker in *kosketin*: <https://kotus.fi/tulin-nain-kosketin-ja-soitin/>
- Aalto OpenLearning course content licence: <https://creativecommons.org/licenses/by/4.0/>
- Kotus — marking and explaining inflection: <https://kotus.fi/sana/taivutuksen-merkitseminen/>

## Finland regional boundaries

`finland-regions-2026.geojson` contains the 19 regional boundary features from Statistics Finland's `maakunta4500k_2026` WFS layer, downloaded on 23 October 2026 in GeoJSON / EPSG:4326. Statistics Finland provides the geographic data under its CC BY 4.0 open-data licence. Kielo projects the source geometry for an interactive SVG map; regional names and the population facts shown beside it are maintained as separate, dated lesson data.

- Statistics Finland — municipality-based statistical units and boundary interfaces: <https://stat.fi/en/services/statistical-data-services/geographic-data/statistical-areas/municipality-based-statistical-units>
- Statistics Finland — interface use of geographic data and CC BY 4.0: <https://stat.fi/en/services/statistical-data-services/open-data-and-interfaces/interface-use-of-geographic-data>
- Statistics Finland — 2026 region classification: <https://stat.fi/en/luokitukset/maakunta/maakunta_1_20260101>
- CC BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
