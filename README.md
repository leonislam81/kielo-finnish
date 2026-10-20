# Kielo — Learn Finnish, gently

Kielo is a bilingual-support Finnish learning web app with an English interface. Learners can switch lesson explanations between English and Bangla. The course map has 28 guided lessons from Pre-A1 through C2, with vocabulary, reading, listening, and speaking practice through B2, grammar and writing practice through B2, browser audio, a short quiz, scene-based pictures, picture matching, spaced vocabulary review, beginner role-plays for a Finnish café and railway station, and a standalone pronunciation lab for Finnish vowels and sound length.

## Run locally

Open `dist/index.html` in a browser, or serve the `dist` folder with any static web server. The app has no build step or package dependencies.

## Course and research

See [RESEARCH-AND-ROADMAP.md](RESEARCH-AND-ROADMAP.md) for the research notes, course map, design choices, media sources, and next steps. The proficiency path is informed by the Council of Europe's CEFR and the Finnish National Agency for Education's YKI mapping. Official Yle video and study pages open on Yle; they are not copied into this repository.

## Learner data

Lesson completion, review words and their due dates, language preference, writing drafts, and conversation completions are stored in the current browser with `localStorage`. Review intervals grow from 1 to 30 days when a word is recalled and reset to 10 minutes when it needs another try. This first release does not need an account or send learner progress to a server.

## Media and credits

The app links to official Yle learning materials. Seasonal, café, and travel photography is loaded from Unsplash; an internet connection is needed to show those images. Browser speech synthesis is used for Finnish audio when a Finnish voice is installed.
