# Kielo — Learn Finnish, gently

Kielo is a bilingual-support Finnish learning web app with an English interface. Learners can switch lesson explanations between English and Bangla. The course map has 28 guided lessons from Pre-A1 through C2, with separate listening, speaking, reading, writing, and grammar labs through C2. Vocabulary review includes the course words plus curated C1 and C2 word sets with contextual examples. It includes browser audio, a short quiz, scene-based pictures, picture matching, spaced vocabulary review, beginner role-plays for a Finnish café, railway station, grocery store, and library, with full-scene audio at slow, steady, or natural speed and a bilingual transcript that alternates each Finnish prompt with its model reply, optional open-response writing mode, a standalone pronunciation lab for Finnish vowels and sound length, and an installable offline app shell.

## Run locally

Open `dist/index.html` in a browser, or serve the `dist` folder with any static web server. The app has no build step or package dependencies.

## Course and research

See [RESEARCH-AND-ROADMAP.md](RESEARCH-AND-ROADMAP.md) for the research notes, course map, design choices, media sources, and next steps. The proficiency path is informed by the Council of Europe's CEFR and the Finnish National Agency for Education's YKI mapping. Official Yle video and study pages open on Yle; they are not copied into this repository.

## Learner data

Lesson completion, review words and their due dates, language preference, writing drafts, and conversation completions are stored in the current browser with `localStorage`. Review intervals grow from 1 to 30 days when a word is recalled and reset to 10 minutes when it needs another try. This first release does not need an account or send learner progress to a server.

Use the **K** profile button to download a JSON backup or restore one on another device. Restore combines lesson completion, known words, review dates, practice completion, and drafts with the current browser; the current device's version wins if the same draft or review schedule exists in both. Backup files stay on your device unless you choose to move or share them.

The home dashboard also shows a weekly study rhythm and consecutive-day streak. A study date is saved locally when you practise, review a word, or work on a writing draft; switching the help language or course level does not add a study day. Streak dates are included in progress backups.
The daily Finnish word also offers an optional three-choice meaning check in your selected English or Bangla help language. After you answer, both translations appear with the example sentence; the daily quiz answer is kept only in the current page session and is not added to your learning backup.

The Spoken Finnish lab compares five common informal phrases with standard written Finnish. Learners hear each phrase, choose its standard equivalent, and reveal an English or Bangla explanation. Completion is saved on this device and included in progress backups. The examples follow Aalto OpenLearning beginner dialogue material; spoken forms vary by speaker and region.

Finnish quick-insert keys (ä, ö, å and uppercase forms) are available beside lesson, writing-lab, and role-play drafts. They insert at the cursor or replace selected text, and normal draft auto-save continues to work.

Each writing area now has an optional, bilingual self-review checklist. It offers three prompts, including a reminder to check Finnish long vowels and double consonants, and does not score or change the learner’s draft. The pronunciation prompt follows [Aalto OpenLearning’s beginner guide](https://openlearning.aalto.fi/mod/page/view.php?id=3388).

The home dashboard now prioritises vocabulary that is due for spaced review, with a one-click route into the review session. When all 28 lessons are complete, it invites learners to revisit the path. Study-rhythm copy also makes clear that a break does not erase locally saved lesson progress.

A Finnish word of the day is selected from the Pre-A1 and A1 course vocabulary using the learner’s local calendar date. Each card starts with an active-recall prompt: the learner sees the Finnish word and sentence, tries to remember their meanings, then reveals the English and Bangla translations. It also includes a Finland scene, normal and slow Finnish sentence audio, a speak-before-listen self-check that stores no voice data, word audio, and a one-click add or remove action for the local spaced-review shelf.

## Media and credits

The app links to official Yle learning materials. Seasonal, café, and travel photography is loaded from Unsplash; an internet connection is needed to show those images. Browser speech synthesis is used for Finnish audio when a Finnish voice is installed. Role-play full-scene playback reads each staff prompt followed by its sample reply, with a pause between turns. The optional transcript shows the whole scene with English or Bangla meanings and line-by-line audio. Learners can hide the meanings for a recall attempt, then reveal them when ready. Finnish-first mode also hides a role-play prompt until the learner selects a response, then reveals the line and its translation. In open-response scenes, optional browser speech recognition can place a Finnish reply in the editable text box; it is not scored or saved. A pace selector adjusts conversation playback from slow to natural speed.

After the first online visit, the service worker caches the Kielo interface, course content, and local cover art for offline study on supported browsers. Learner progress remains in this browser. Unsplash photos, external video pages, and some browser-provided speech voices still need an internet connection or a separately installed Finnish voice. Use **Install app** in a supporting browser, or the browser menu's **Add to Home Screen** option on iPhone or iPad.

The C1 Listening Lab adds three extended talks about renewable energy, Lapland tourism, and libraries. Questions target implied meaning, speaker stance, and qualifications across the whole talk. Browser speech synthesis is synthetic and voice availability varies, so the lab links to Yle Areena for authentic Finnish listening. It is focused practice informed by OPH’s C1 listening descriptors, not a complete C1 course or official YKI task.

The C2 Listening Lab adds three longer Finland-themed talks about neighbourhood sauna culture, winter cycling routes, and digital public services. Learners hear how a speaker qualifies a claim, balances competing needs, and signals a careful position. Browser-generated Finnish audio plays at a natural practice speed, with transcript and English or Bangla support after an answer; Yle Areena offers optional unscripted listening. The focus reflects OPH/YKI’s broad C2 listening description, but the talks are original guided practice, not official YKI recordings.

The C1 Speaking Lab adds four open-ended Finland-set conversations about city planning, Lapland tourism, hybrid work, and library access. Each turn includes a Finnish partner, a prompt, a model answer, and Bangla or English support. Learners connect their reply to the partner’s point, qualify claims, and keep discussion moving. Browser recognition only displays a transcript; it does not score meaning or pronunciation. The activities follow OPH’s C1.1 interaction descriptors and are guided practice, not an official YKI task.

The C1 Writing Lab adds three structured Finland-themed texts about Helsinki housing and urban nature, tourism in Lapland, and the role of public libraries. Learners arrange paragraphs, study a Finnish model with English or Bangla support, hear browser speech, and draft their own response. Drafts save in the current browser and are not scored. The activities follow OPH’s C1 writing descriptors for detailed, well-structured texts supported with reasons and examples; they are guided practice, not official YKI tasks.

The C1 Grammar Lab adds four contextual lessons on active present participles, agent participles, temporal substitute constructions, and compact reported ideas. Learners hear Finnish browser speech, choose a form, and get English or Bangla feedback. The selected patterns support precise, structured expression described at C1.1 by OPH; they are a focused practice set, not an official C1 topic list or a complete grammar syllabus.

The C2 Reading Lab adds three longer Finland-themed passages about a Helsinki library, a Lapland trail, and winter cycling. Learners interpret subtext, tone, and how public wording signals commitment; they can tap selected Finnish words, hear browser audio, read the English or Bangla translation, and check comprehension. The practice reflects OPH/YKI’s broad C2 description of understanding varied written language and subtle differences of tone, but it is not an official YKI task.

The grocery-store role-play adds English and Bangla support for finding rye bread, following a card payment, and asking for a receipt. Its short A1-style practice is original guided material; learners can continue with [Yle’s authentic grocery-shopping lesson](https://yle.fi/a/20-152698), which is marked A2.1 by Yle.


The library role-play introduces a library card, a Finnish address requirement in the Helsinki-region Helmet libraries, a usual four-week loan period, and the due date on a loan receipt. It is original A1 guided practice; for local rules, learners can open [Helmet’s library card and borrowing guide](https://helmet.finna.fi/Content/kirjastokortti-ja-lainaaminen?lng=en-gb).


In conversation practice, learners can either choose a response or write a Finnish reply first and reveal a useful example afterward. Open responses are not machine-scored or saved, because many different replies can be natural.


Open-response scenes now include optional contextual word hints in English or Bangla. Learners can use them to build a reply before revealing the example; hints and typed answers remain temporary.

## Finland A–Z and daily vocabulary

The home page places a Europe/Helsinki clock and current weather at the top. Weather is fetched for the learner’s selected Finnish city, refreshed periodically, and attributed to Open-Meteo. The free API is for non-commercial use under CC BY 4.0; a commercial or ad-supported version would need a paid commercial licence. Weather can be temporarily unavailable without interrupting the lessons.

Daily 100 is date-seeded to Finland’s local date and divided into ten sets. English mode uses a pool of 9,930 Finnish words: 9,910 headwords matched between a Yle News Archive frequency list (2011–2024) and the Finnish–English dictionary, plus curated course words. The frequency figures describe a news corpus, not a universal ranking of spoken Finnish. Bangla mode uses a separate curated pool of 273 words with Bangla and English meanings, so it still provides 100 words each day without guessing translations from the English-only corpus. The daily set and learning progress are kept separately by language.

Each ten-word set now has an optional ten-question recall quiz in the selected language. It gives immediate feedback, highlights the Finnish answer, and shows a temporary score. At the end, learners can review and retry only missed words or restart the full set; quiz results are not added to saved progress.

Daily 100 also has an optional Recall first mode. It hides each word’s meanings until the learner reveals them, supports English and Bangla prompts, and remembers the mode on that device. Revealed meanings last only for the current word set.

The Dictionary starts with 273 curated course and learner entries, searchable in Finnish, English, and Bangla. Finnish ä, ö, and å can be searched as a, o, and a for easier typing (for example, `jarvi` finds `järvi`). Learners can choose to load a wider 254,435-entry Finnish–English headword dictionary (about 11.6 MiB compressed). After the first download, Kielo tries to save it in IndexedDB on the current device for offline search; browser storage limits or private-browsing settings can prevent that, and the page reports when the copy is only available for the current session. Its source reports translations for 82.78% of entries; some remaining entries are English definitions rather than direct translations, and the compact file does not include inflected-form lookup. The wider dataset is downloaded only on request and carries its own licence and attribution notes in [dist/data/ATTRIBUTION.md](dist/data/ATTRIBUTION.md). No single finite word list is described as every Finnish word. Dictionary results can be saved directly to the spaced-review shelf, including entries from the optional wider collection. New words keep their Finnish headword and English source definition; when a Bangla translation is unavailable, the review card says so. Custom saved words are included in local progress backups.

Finland Explorer has twelve short bilingual-support learning chapters: history, public services, people and languages, climate, forests, sea and lakes, transport, education, work, markets, places, and sauna/culture. Each adds Finnish vocabulary, a sentence, audio controls and a quick meaning check, then links to a source for further reading.

Finnish speech uses voices installed in the learner’s browser/device. The browser reports voice names and languages but does not provide reliable male/female labels. The app explains when this device has no Finnish voice and links to Yle’s authentic learning clips. Natural recorded male/female voices require a documented, licensed speech provider; they are not claimed as a capability of device speech synthesis.

The research plan and responsive mockup are in [RESEARCH-AND-ROADMAP.md](RESEARCH-AND-ROADMAP.md) and [docs/redesign-mockup.html](docs/redesign-mockup.html).
