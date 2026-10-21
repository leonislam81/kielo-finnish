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

## Media and credits

The app links to official Yle learning materials. Seasonal, café, and travel photography is loaded from Unsplash; an internet connection is needed to show those images. Browser speech synthesis is used for Finnish audio when a Finnish voice is installed. Role-play full-scene playback reads each staff prompt followed by its sample reply, with a pause between turns. The optional transcript shows the whole scene with English or Bangla meanings and line-by-line audio. Learners can hide the meanings for a recall attempt, then reveal them when ready. A pace selector adjusts conversation playback from slow to natural speed.

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
