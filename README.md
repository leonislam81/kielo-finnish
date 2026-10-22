# Kielo — Learn Finnish, gently

Live app: [Sites](https://kielo-finnish.openmoss1.chatgpt.site/) · [GitHub Pages](https://leonislam81.github.io/kielo-finnish/) · [Source repository](https://github.com/leonislam81/kielo-finnish)

Kielo is a bilingual-support Finnish learning web app with an English interface. Learners can switch lesson explanations between English and Bangla. The course map has 28 guided lessons from Pre-A1 through C2, with separate listening, speaking, reading, writing, and grammar labs through C2. Vocabulary review includes the course words plus curated C1 and C2 word sets with contextual examples. It includes browser audio, a short quiz, scene-based pictures, picture matching, spaced vocabulary review, beginner role-plays for a Finnish café, railway station, grocery store, and library, with full-scene audio at slow, steady, or natural speed and a bilingual transcript that alternates each Finnish prompt with its model reply, optional open-response writing mode, a standalone pronunciation lab for Finnish vowels and sound length, and an installable offline app shell.

## Run locally

Install the locked dependencies, then build and run the local Cloudflare Worker preview:

```sh
npm ci --include=dev --include=optional --no-audit --no-fund
npm run build
npm start
```

Open the URL printed by Wrangler (usually `http://127.0.0.1:8787`). The browser app is in `public/`; `dist/client/` is the generated static output used by GitHub Pages.

## Hosting

- The public Sites deployment runs the Cloudflare Worker and serves the same browser app plus `/api/speech/*`.
- GitHub Pages serves `dist/client/`. It calls the public Sites speech endpoint with a strict CORS origin allowlist; Pages itself does not run server code.
- The Sites project identity and D1 binding are in `.openai/hosting.json`. The schema migration under `drizzle/` stores only a daily aggregate character count, without learner text, account IDs, or IP addresses.

## Optional natural Finnish voices

Open **Voice & audio** from the top bar or Skill Labs to set the Finnish device voice and speaking pace once for lessons, role-plays and vocabulary practice, then preview the choice with English and Bangla meanings. The Worker supports Microsoft Azure Speech's documented Finnish standard neural voices: female Selma and Noora, and male Harri. A short Finnish/English/Bangla sample lets learners audition the voice they selected, including Finnish voices installed by their browser or device. The browser picker keeps the neural options disabled until the Site has all three of these runtime values:

- `AZURE_SPEECH_KEY` — secret Speech resource key.
- `AZURE_SPEECH_REGION` — the resource's region identifier, such as `northeurope`.
- `KIELO_NEURAL_VOICE_DAILY_CHAR_CAP` — a Site-wide daily character cap shared by all visitors, from 1 to 10,000. Leave it unset to keep neural synthesis disabled.

Set the key only through the Sites runtime secret settings; never add it to this repository or a browser bundle. Each learner phrase is sent to Azure only after the learner selects a neural voice and presses a listen control. The Worker validates the selected voice and text, applies the daily Helsinki-time character budget, and returns audio. Until the provider is configured, the app uses a Finnish voice installed on the learner's device, when available. Pricing and free quotas depend on the Azure offer and can change; review the live [Azure Speech pricing](https://azure.microsoft.com/en-us/pricing/details/speech/) before enabling it.

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

The app links to official Yle learning materials. Seasonal, café, and travel photography is loaded from Unsplash; an internet connection is needed to show those images. Device speech remains available when a Finnish voice is installed. Optional neural audio is sent to Azure only after the learner chooses a neural voice and presses a listen control. Role-play full-scene playback reads each staff prompt followed by its sample reply, with a pause between turns. The optional transcript shows the whole scene with English or Bangla meanings and line-by-line audio. Learners can hide the meanings for a recall attempt, then reveal them when ready. Finnish-first mode also hides a role-play prompt until the learner selects a response, then reveals the line and its translation. In open-response scenes, optional browser speech recognition can place a Finnish reply in the editable text box; it is not scored or saved. A pace selector adjusts conversation playback from slow to natural speed.

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

Daily 100 is date-seeded to Finland’s local date and divided into ten sets. English mode uses a pool of 9,946 Finnish words: 9,910 headwords matched between a Yle News Archive frequency list (2011–2024) and the Finnish–English dictionary, plus curated course and Finland Explorer words. The frequency figures describe a news corpus, not a universal ranking of spoken Finnish. Bangla mode uses a separate curated pool of 344 words with Bangla and English meanings, including vocabulary from Finland chapters, regional cards, and their detailed topic word sets; it does not guess translations from the English-only corpus. The daily set and learning progress are kept separately by language.

Each ten-word set now has an optional ten-question recall quiz in the selected language. It gives immediate feedback, highlights the Finnish answer, and shows a temporary score. At the end, learners can review and retry only missed words or restart the full set; quiz results are not added to saved progress.

Daily 100 also has an optional Recall first mode. It hides each word’s meanings until the learner reveals them, supports English and Bangla prompts, and remembers the mode on that device. Revealed meanings last only for the current word set.

The Dictionary starts with 344 curated course and learner entries, searchable in Finnish, English, and Bangla. Its curated entries include the bilingual vocabulary already taught in Finland Explorer, with duplicate Finnish headwords removed; detailed water, transport, market, culture, housing, and health word grids share the same source data with Daily 100. Finnish ä, ö, and å can be searched as a, o, and a for easier typing (for example, `jarvi` finds `järvi`). Learners can choose to load a wider 254,435-entry Finnish–English headword dictionary (about 11.6 MiB compressed). After the first download, Kielo tries to save it in IndexedDB on the current device for offline search; browser storage limits or private-browsing settings can prevent that, and the page reports when the copy is only available for the current session. Its source reports translations for 82.78% of entries; some remaining entries are English definitions rather than direct translations, and the compact file does not include inflected-form lookup. The wider dataset is downloaded only on request and carries its own licence and attribution notes in [public/data/ATTRIBUTION.md](public/data/ATTRIBUTION.md). No single finite word list is described as every Finnish word. Dictionary results can be saved directly to the spaced-review shelf, including entries from the optional wider collection. New words keep their Finnish headword and English source definition; when a Bangla translation is unavailable, the review card says so. Custom saved words are included in local progress backups.

Finland Explorer has fourteen bilingual-support learning chapters: history, public services, people and languages, climate, forests, sea and lakes, transport, education, work, housing, health services, markets, places, and sauna/culture. Each adds Finnish vocabulary, useful phrases, audio controls and a quick meaning check, then links to a source for further reading. The overview adds a Finland-in-numbers snapshot with the latest verified population figures from Statistics Finland and forest-account figures from Luke. It labels the reference year on each number, explains that the forest-stock figure is a theoretical statistical valuation, and pairs the facts with spoken Finnish vocabulary and English/Bangla support.

The **Lakes, sea & archipelago** chapter now includes three selectable picture-led scenes for island ferries, passenger harbours, and lakes/Baltic Sea nature; 12 Finnish water and travel words with English/Bangla meanings and audio; three Finland destination cards; short spoken dialogues; and a water-trip checklist. Current links connect to [Finferries routes and schedules](https://www.finferries.fi/en/ferry-traffic/ferries-and-schedules.html), [Fintraffic marine traffic](https://liikennetilanne.fintraffic.fi/?lang=en), and [Vesi.fi water observations](https://www.vesi.fi/en/blue-green-algae-situation/). Ferry timetables vary by route; water observations can change quickly. The chapter links to official current information rather than presenting a fixed schedule or water status.

The **Traffic & transport** chapter is now a practical Pre-A1–A2 travel lesson with selectable Helsinki transit, long-distance train, and road-condition scenes; 12 Finnish travel words with English/Bangla glosses and audio; short dialogues; and a four-step trip-planning guide. Official links open the [HSL Journey Planner](https://www.hsl.fi/en/hsl/journey-planner), [VR timetables](https://www.vr.fi/en/timetables), and [Fintraffic Traffic Situation map](https://liikennetilanne.fintraffic.fi/kartta/?lang=en). Lesson examples are not live timetable or traffic data. HSL zones and ticket rules depend on the trip; current service information stays with the operator.

The **Cities, regions & places** chapter includes an interactive four-region travel guide: Helsinki region, Coast & Archipelago, Lakeland, and Lapland. Choose a region to reveal an original illustrated scene, example destinations, Finnish vocabulary with Bangla/English meanings, and a spoken phrase. Visit Finland uses these as destination regions; Kielo distinguishes them from Statistics Finland’s administrative and statistical regional boundaries.

The **Universities & study** chapter now includes an illustrated campus scene, an interactive comparison of research-led universities and professionally oriented universities of applied sciences, a five-step application checklist, eight Finnish study terms with English/Bangla meanings and audio, and a three-line admissions dialogue. It links to the live Studyinfo application guide, explains that requirements and deadlines vary by programme, and links to the Finnish National Agency for Education’s SIMHE support information and official introductory video.

The **Jobs & working life** chapter now turns job search into a practical A2–B1 Finnish lesson. Learners can choose between preparing a job application and finding public job-search support, follow a five-step path from skills to interview, hear eight Finnish job terms, and listen to an English/Bangla-supported interview dialogue. Its guidance links to InfoFinland and Job Market Finland; dated job-service steps, work eligibility and qualification recognition are left to the current official instructions.

The **Housing & home life** chapter adds an original apartment illustration, selectable rental-search, viewing, and agreement dialogues, ten Finnish housing words, and a four-step home-search path with Finnish audio and Bangla support. It links to current InfoFinland and KKV guidance, and reminds learners to verify the home and address, read a written lease, and check which charges are included before paying or signing. Lease terms and costs vary by home and agreement.

The **Health services & wellbeing** chapter adds an original health-centre illustration, selectable routine appointment, urgent-care and emergency dialogues, eleven Finnish words with English/Bangla meanings and audio, and a four-step service guide. It links to [InfoFinland health services](https://infofinland.fi/en/health/health-services-in-finland), [Suomi.fi Medical Helpline 116 117](https://www.suomi.fi/services/medical-helpline-116117-digifinland-oy/d19f25d1-1c31-44e6-8a20-12152053af7b), and [Suomi.fi emergency guidance](https://www.suomi.fi/citizen/safety-and-security/emergencies-and-security). The lesson distinguishes urgent non-emergency advice (116 117, except Åland) from emergencies (112), asks learners to check local instructions, and does not assess symptoms or provide medical advice.

The **Markets, shops & food** chapter combines a picture-led market lesson with three interactive scenes (outdoor market, grocery store and market hall), a seasonal Finnish food guide, nine shopping words, a bilingual five-line checkout conversation, and regional foods from Karelia, Savo and Tampere. Learners also practise bottle-return vocabulary and get an official note that deposit returns cover most eligible packages while local sorting instructions vary. Season availability, prices and local service details are not presented as live facts.

The **Culture, sauna & media** chapter adds an original twilight sauna illustration, three switchable everyday situations, nine spoken sauna words, a four-step comfort-first guide, a bilingual house-rules dialogue, and links to Yle’s official beginner and everyday Finnish videos. It notes that customs and swimwear rules vary by venue and avoids treating one practice as universal; UNESCO and Finnish public guidance are linked beside the lesson.

The Government & public services lesson now includes an official, dated map for **valtio** (state), **kunta** (municipality) and **hyvinvointialue** (wellbeing services county), with English and Bangla glosses, audio buttons, and source links. It explains the services municipalities provide and the Helsinki exception: outside Helsinki, the 21 wellbeing services counties organise health, social and rescue services; Helsinki organises its own health and social services. Current references: [Suomi.fi public administration overview](https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works), [municipalities](https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works/municipalities-and-local-government), and [wellbeing services counties](https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works/wellbeing-services-county) (checked 22 October 2026).

The History & independence lesson now offers a short English–Bangla timeline of seven milestones (1809–1995): the Grand Duchy, the Kalevala, the 1906 parliamentary reform, independence, the 1918 Civil War, the republic, and EU membership. Each event has a Finnish history word with audio and a direct source; an original model sentence practises the date of Parliament's approval of independence. The timeline is explicitly a starting point, not a complete account of Finland’s varied histories. Sources: [This is Finland — Main outlines of Finnish history](https://finland.fi/life-society/main-outlines-of-finnish-history/), [Finland Toolbox — Facts about Finland (2025)](https://toolbox.finland.fi/life-society/finfo-facts-about-finland-2/attachment/finfo_facts_2025_en_aukeama_toolbox-2/), and the [European Union — Finland profile](https://european-union.europa.eu/principles-countries-history/eu-countries/finland_en) (checked 22 October 2026).

The optional Azure neural voice path provides Finnish female voices Selma and Noora and male voice Harri. It remains disabled until a Site owner configures an Azure Speech key, matching region, and daily character cap. The key stays server-side; the endpoint accepts only allowlisted voices, short text, and three pace values, and enforces a daily aggregate Helsinki-time character budget. It stores only daily character totals. Before configuration, the app uses the Finnish voice installed by the learner’s browser/device when available and links to Yle’s authentic learning clips.

The research plan and responsive mockup are in [RESEARCH-AND-ROADMAP.md](RESEARCH-AND-ROADMAP.md) and [docs/redesign-mockup.html](docs/redesign-mockup.html).
