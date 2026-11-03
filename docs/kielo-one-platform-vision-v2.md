# Kielo — one platform for Finnish and life in Finland

**Product vision and planning brief · 3 November 2026**

**Planning only:** this document defines the next product direction. It does not authorize or start a site redesign, code changes, data integrations, or publication.

## 1. Vision

Make Kielo the calm, trustworthy place where someone can learn Finnish and understand the next steps for studying, working, moving to, or living in Finland. Every practical topic should also help the learner use Finnish in a real situation.

The product promise is: **Learn the language. Understand the system. Take your next step with a reliable source.**

Kielo should feel like one connected guide, not a collection of unrelated encyclopaedia pages. A learner studying housing vocabulary should be able to continue into rental-home guidance; a job seeker should be able to practise a Finnish interview and then open the official job service.

## 2. Product principles

1. **Start with the person's goal.** Ask what they came to do before showing the full catalogue.
2. **Keep Finnish central.** Explain a useful Finnish phrase, word, or document term alongside each practical topic.
3. **Use plain English by default.** Let users switch the interface to Finnish for immersion and select a separate language for learning help.
4. **Show the source and date.** Give changing rules, deadlines, and statistics a visible “last checked” date and a direct official link.
5. **Separate guidance from decisions.** Kielo explains routes and vocabulary; the responsible Finnish authority decides eligibility, admissions, benefits, and permits.
6. **Never infer language from nationality.** A person's country, residence, and preferred explanation language are separate choices.
7. **Keep the first screen calm.** Use search, short pathways, and progressive detail instead of showing every fact at once.
8. **Design for a phone, keyboard, screen reader, and slow connection from the start.**

## 3. Language model

Treat language as three independent settings:

| Setting | Purpose | Initial plan |
| --- | --- | --- |
| Interface language | Menus, buttons, navigation, and system messages | English by default; Finnish immersion option |
| Target language | Language being learned | Finnish |
| Help language | Translations and learning explanations | User chooses from available language packs; Bangla first, with more packs added after review |

The learner should see Finnish first, an English bridge when useful, and their selected help language when a reviewed translation exists. If a translation is missing, Kielo should label that clearly and fall back to English. It should never silently present an unreviewed machine translation as authoritative.

Add an optional country or region preference only when it helps filter relevant information. Do not use it to guess a person's mother tongue, immigration status, or legal rights.

## 4. Audience and first-use flow

Support five common starting goals:

- **Learn Finnish** — choose a starting level, daily time, and help language.
- **Find work** — explore job-search steps, occupational Finnish, and verified vacancy sources.
- **Apply to study** — find recognised programmes, requirements, application routes, and deadlines.
- **Move to Finland** — follow a before-arrival / first-weeks checklist with links to the right authority.
- **Live in Finland** — find practical services, regional guidance, and everyday Finnish.

After choosing a goal, ask only a few optional questions: current Finnish level, selected help language, and (if useful) a city or region. Let people skip onboarding and use global search immediately. Keep the profile on the device unless an account and cloud backup are explicitly added later.

## 5. Proposed information architecture

### Primary navigation

1. **Home** — search, choose a goal, resume learning, and see a small Finland status panel.
2. **Learn Finnish** — Pre-A1 to C2 pathways, listening, speaking, reading, writing, grammar, vocabulary, pronunciation, and review.
3. **Work & careers** — job-search skills, sector vocabulary, CV and application practice, recognition of qualifications, and official vacancy services.
4. **Study in Finland** — programme discovery, admissions, fees, scholarships, language requirements, arrival planning, and student life.
5. **Live in Finland** — moving checklists, registration concepts, housing, healthcare, education, transport, tax, banking, family life, and digital public services.
6. **Explore Finland** — history, government, regions, population, languages, culture, climate, nature, food, holidays, and travel.
7. **My plan** — saved words, progress, bookmarks, checklists, and optional deadlines.

Keep one **global search** visible across the whole site. Search should cover Finnish words, English meanings, selected-language translations, lessons, Finland topics, and official links. Filters should include goal, Finnish level, topic, region, and source type.

### Home-page wireframe

```text
KIELO       Search Finnish, work, study or life in Finland…     EN / FI   Help language

What brings you to Finland?
[ Learn Finnish ] [ Find work ] [ Apply to study ] [ Move here ] [ Explore Finland ]

Continue where you left off                      Today's Finnish · 100 words

Finland now: Helsinki time · selected city weather · 19-region comparison

Recommended next steps for your goal
Official guide | Finnish phrase to practise | Save to My plan

Explore a topic: Work · Study · Housing · Health · Culture · Nature · Transport
```

On mobile, stack the goal cards and keep search, language choice, and “continue” easy to reach. Keep time and weather available, but let the user's chosen goal remain the main visual focus.

## 6. Core journeys

### A. Learn Finnish for a real-life goal

Choose a level → learn a short phrase → hear a natural Finnish voice → practise in a scene → see English and the chosen help language → save the word → open the related Work, Study, or Live guide.

Examples: understand a job ad, ask about a university application, book a health appointment, view a rental home, or use public transport.

### B. Search for work

Choose a field and region → learn Finnish job-ad vocabulary → practise a CV, application, and interview → open trusted vacancy and employment-service links → save a personal checklist. Start with links to Job Market Finland, Work in Finland, and EURES. Integrate live listings only if an official feed or licence permits it; do not scrape or republish listings without permission.

### C. Apply to a university or UAS

Choose a subject and programme language → browse recognised institutions and official programme records → compare eligibility, tuition, scholarship, language proof, and application route → save deadlines and a document checklist → open Studyinfo and the institution's own admissions page. Every deadline must be programme-specific and checked at its official source.

### D. Move to Finland

Choose a broad situation and intended arrival stage → get a dated checklist → learn key terms → open the responsible authority. Keep identity code, address, municipality of residence, residence permit, tax, and social-security guidance as distinct topics. The guide should not decide eligibility or replace Migri, DVV, the Tax Administration, Kela, or a municipality.

### E. Understand a Finnish topic

Choose a region or topic → read a short, sourced explanation → learn a few Finnish words → listen to a phrase or watch an official clip → answer a small recall question → save the topic and source.

## 7. Product modules and useful additions

### Finnish Learning Centre

- Preserve the existing Pre-A1–C2 course, Daily 100, dictionary, voice choices, dialogues, and skill labs.
- Connect lesson examples to job, study, housing, healthcare, and public-service situations.
- Provide captioned video links, transcripts where permitted, adjustable audio speed, and bilingual phrase lists.
- Offer a placement check as a practice suggestion, never as an official CEFR/YKI result.

### Work & Careers

- Finnish and English job-ad phrasebook with selected-language explanations.
- CV and cover-letter builder using local drafts; vocabulary and tone checks before export.
- Interview role-play and Finnish workplace-dialogue practice.
- Profession pages covering common Finnish terms and whether a regulated profession may require official recognition.
- Official vacancy, job-search, and employment-service links by region.

### Study in Finland

- Programme finder based on official Studyinfo records where use and data access allow.
- Filters for degree, subject, location, programme language, and application route.
- A comparison checklist for admission criteria, tuition, scholarship, language proof, and required documents.
- A local application planner with manually confirmed deadlines and links to each institution.
- Student-life Finnish for campus, housing, healthcare, and group work.

### Live in Finland

- Before-arrival, first-week, and first-month checklists.
- Plain-language explanations of government, local-government, and wellbeing-services roles.
- Housing, healthcare, school, childcare, transport, tax, banking, Kela, and public digital-service guides.
- Optional regional directory for municipalities, libraries, employment services, universities, and language courses.
- Official emergency and support links, clearly separated from learning content.

### Explore Finland

- Keep the existing 19 Finland chapters and extend them with source-linked, dated mini-lessons.
- Add regional stories, maps, seasonal words, food and market vocabulary, public holidays, design, sauna, media, sports, and nature etiquette.
- Present Sámi and other communities with primary sources and respectful, specific context; avoid stereotypes.

### Cross-site tools

- Global search and a Finnish–English–selected-language glossary.
- A “save this next step” planner that joins learning progress to practical checklists.
- Optional reminders for learner-chosen dates; no automatic deadline claims.
- An evidence-grounded assistant as a later phase: answers must link to the source paragraph and show when it was last checked.
- Downloadable low-data learning packs and offline saved vocabulary.

## 8. Information quality and safety

Use an editorial source hierarchy: Finnish authorities and official portals first; recognised institutions and public services next; reputable cultural sources for context. Each factual page should record:

- canonical topic ID and plain-language summary;
- interface and learning-support translations, with review status;
- Finnish key terms and example phrases;
- official source URL, source language, and responsible organisation;
- last-checked date, review frequency, and content owner;
- scope (national / regional / municipal), audience, and any eligibility caveat;
- a visible next action that opens the official source.

Mark fast-changing information such as admissions deadlines, residence requirements, job-service processes, benefits, fares, and opening hours as time-sensitive. Use official APIs or feeds when allowed. Otherwise, link to the live source and avoid copying a snapshot that could look current. Keep legal, immigration, and eligibility explanations educational and route-specific; never promise a permit, admission, job, or benefit.

## 9. Visual and interaction direction

Retain Kielo's Finnish nature palette and recognizable brand, but redesign the information hierarchy around tasks. Use pine and lake colours, warm paper-like surfaces, seasonal photography, clear cards, generous spacing, and Finnish phrase chips. Avoid a generic government portal look and avoid overwhelming the learner with flags or dense dashboards.

Every major topic card should answer three questions at a glance: **What can I do here? What Finnish will I learn? Where is the trusted source?** Add clear source/date labels, quiet progressive disclosure, large touch targets, keyboard focus, reduced-motion support, readable contrast, and a low-data option.

## 10. Delivery roadmap

Do not attach calendar estimates until the implementation scope and available time are agreed.

### Phase 0 — Vision and source map · planning now

- Confirm the one-platform promise, audiences, language model, information architecture, and official-source rules.
- Map the current Kielo features into this v2 navigation; identify what should be kept, moved, or retired.
- No code changes in this phase.

### Phase 1 — Journey design and mockups

- Sketch the desktop and mobile Home, global search, Work, Study, Live, and Learn screens.
- Prototype the five main user journeys and validate that a first-time visitor can find a next step quickly.
- Review English/Finnish interface labels and the Bangla help-language flow.
- Deliver an approved IA, content model, mockup set, and release scope before implementation.

#### Learn Finnish hub and existing-course integration plan · 3 November 2026

**Status: planning only.** The Home mockup is approved for now. Design the Learn Finnish page next as its own desktop and mobile mockup; do not implement it or the new platform shell until the relevant mockups and journeys are approved.

**What the existing app already provides:** a 60-lesson guided path from Pre-A1 through C2, level progress, lesson scenes and audio, Daily 100, a searchable Finnish dictionary, spaced vocabulary review, pronunciation/listening/speaking/reading/writing/grammar/conversation practice, voice settings, video lessons, Finland Explorer, and local progress backup/restore. Use these as the starting content and capabilities for the new learning area.

**Click flow from the global navigation**

1. `Learn Finnish` opens a course hub, not an individual lesson. The global platform navigation stays available, with a compact learning sub-navigation for `Overview`, `Levels`, `Daily words`, `Dictionary`, and `Practice`.
2. A returning learner sees one prominent `Continue learning` action for the next incomplete lesson, alongside due word reviews and a small progress summary. If no lesson is next, offer `Browse your course` and a review action instead.
3. A new learner sees `Start from the beginning`, `Choose my level`, and an optional short starting-point check. The check suggests a place to begin; it is not an official CEFR or YKI result. Let learners skip it and change levels at any time.
4. Choosing a level opens the existing course map filtered to that band. Opening a lesson uses the current lesson experience, including its scene, Finnish audio, practice, and completion action.
5. Daily words, dictionary, review shelf, and skill labs open their existing learning pages. Finland-related lesson scenes can link onward to the matching Work, Study, Live, or Explore guide; those guides remain in their own platform sections.

**Learn Finnish hub mockup layout**

- **First screen on mobile:** page title and a brief promise; one clear `Continue` or `Start` button; a compact progress / daily-review card. Keep the first action visible without scrolling.
- **Course map:** seven Pre-A1–C2 level cards with a plain-language goal, lesson count, progress, and a `View lessons` action. Keep all levels reachable; do not lock advanced material behind a gate.
- **Practice by skill:** a scannable grid for Listening, Speaking, Reading, Writing, Grammar, Pronunciation, Spoken Finnish, Conversation, Voice & audio, and Video lessons. Show a short description and time/level cue where known.
- **Daily learning tools:** Daily 100, due reviews, and dictionary, with today's progress and a way to browse the full vocabulary collection.
- **Learn through Finland:** a few seasonal and practical scene cards (for example transport, work, study, services, lake and forest life) that teach Finnish in context and lead to the matching platform guide.
- **Desktop:** use a calm content column with a compact progress rail or side panel. Avoid putting every one of the 60 lessons or every tool in the first viewport.

**Language and voice rules**

- The platform interface remains English or Finnish. The `Explain in` control appears inside Finnish lessons and learning explanations only, not across Work, Study, Live, or Explore pages.
- Start the lesson-help selector with reviewed English and Bangla support, and show only languages whose lesson translations are actually available. Add more mother-tongue packs after translation review; do not imply that a country choice automatically creates a reliable translation.
- Keep Finnish as the target language in every learning path. Preserve accessible play/pause controls, voice choice and pace where supported, captions/transcripts for video, and text alternatives when a device has no Finnish voice.

**Implementation approach after mockup approval**

1. Inventory the existing page renderers, lesson IDs, progress keys, voice/audio behavior, and local backup format; record which modules can be connected directly and which need a small adapter.
2. Add the Learn Finnish hub inside the existing application shell and connect its cards to existing `path`, lesson, Daily 100, dictionary, practice, voice, and video destinations. Reuse the current content/state/renderers instead of creating parallel copies or placing the old app in an iframe.
3. Keep the existing storage keys and same-site origin through the transition so saved lessons, reviews, preferences, and drafts remain available. If the final domain or origin changes, prepare and verify a supported progress export/import before moving learners; never silently discard progress.
4. Migrate the current learning pages into the new global shell in small, reviewable slices, with a back-to-Learn link and a visible location indicator. Keep a way to open the familiar course map while the rest of the platform is introduced.
5. Before release, manually review the full new-learner and returning-learner journeys on a narrow mobile viewport and desktop, including keyboard navigation, language switching, audio playback, saved progress, and backup/restore. Do this after the design is approved and implementation is authorized.

**Mockup review checklist**

- A first-time learner can tell where to start and begin without a setup wizard.
- A returning learner can resume in one action and can find review words just as quickly.
- The level path, daily vocabulary, dictionary, and skill practice are discoverable without overwhelming the page.
- The page makes clear that English/Finnish are interface languages and the selected support language is for Finnish lesson explanations.
- Mobile layout has readable cards and touch controls, no clipped header/labels, and no horizontal overflow.
- The proposed links point to existing learning capabilities wherever possible; any missing capability is explicitly marked as future work.

### Phase 2 — New platform shell

- Build the redesigned navigation, global search, language settings, onboarding, and task-based Home.
- Migrate existing Finnish lessons, weather/time, Daily 100, dictionary, and voice features without losing local progress.
- Add source/date components, bookmarks, and a local “My plan” area.

### Phase 3 — Live in Finland and public services

- Structure the moving and everyday-life guides by situation and authority.
- Add regional service discovery and clearly sourced guides for registration, housing, healthcare, tax, transport, and family services.
- Review sensitive pages and selected-language explanations before release.

### Phase 4 — Work and careers

- Add job-search vocabulary, CV/application practice, interview role-play, qualification-recognition guidance, and regional employment links.
- Link to official vacancy and employment services; evaluate feeds and licensing before any in-app listing integration.

### Phase 5 — Study and admissions

- Add programme discovery and institution links, application-route explanations, cost/scholarship planning, and a personal deadline checklist.
- Verify programme-level requirements at Studyinfo and the institution before showing them as current.

### Phase 6 — Finland knowledge and multilingual expansion

- Expand regional and cultural guides using current official and reputable sources.
- Add more help-language packs only after translation review capacity is defined.
- Consider source-grounded AI answers, richer offline packs, and opt-in accounts only after privacy and quality review.

### Phase 7 — Release and maintenance

- Check keyboard and screen-reader flows, mobile layouts, language fallbacks, source freshness, and data-saving behaviour.
- Publish the reviewed release to the existing public Site and GitHub Pages.
- Set owners and a recurring refresh schedule for fast-changing sections.

## 11. How success should be measured

- A first-time user can identify a useful next step without reading the whole site.
- Learners can change help language without losing their Finnish progress.
- People reach the correct official job, programme, or public-service page from a Kielo guide.
- Search results make it clear whether a result is a lesson, Kielo explanation, or official source.
- More users complete lessons and save useful words across multiple weeks.
- Every time-sensitive guide shows its source, scope, and last-checked date.
- Mobile, keyboard, screen-reader, and low-bandwidth journeys remain usable.

## 12. Official source map checked 3 November 2026

- [Finnish National Agency for Education — YKI](https://www.oph.fi/en/national-certificates-language-proficiency-yki): language certificates assess four separate skills; the level scale connects to CEFR A1–C2.
- [Study in Finland — Admissions](https://www.studyinfinland.fi/admissions): programme routes, requirements, and application periods vary; verify details with Studyinfo and the institution.
- [Studyinfo — official programme and application portal](https://studyinfo.fi/konfo/en/): primary place to find programme records and apply.
- [Job Market Finland — job-search service](https://tyomarkkinatori.fi/en): official search, jobseeker profile, and public employment-services information.
- [InfoFinland — Find a job in Finland](https://infofinland.fi/work-and-enterprise/find-a-job-in-finland): practical job-search, document, and support information with relevant public links.
- [InfoFinland — Registering as a resident](https://infofinland.fi/en/moving-to-finland/registering-as-a-resident): explains that personal identity code, address, and municipality-of-residence registration are related but distinct steps.
- [Suomi.fi — Immigrant checklist](https://www.suomi.fi/citizen/moving-and-traveling/migration/guide/as-an-immigrant-in-finland/an-immigrant-s-check-list): a public-service overview that routes people to responsible authorities and local services.
- [Study in Finland — Beware of fake universities](https://www.studyinfinland.fi/news-events/beware-of-fake-universities): directs applicants to recognised institution and programme sources.
- [Statistics Finland — Regions 2026](https://stat.fi/en/luokitukset/maakunta/maakunta_1_20260101) and [population structure](https://stat.fi/en/statistics/vaerak): regional and population data sources.
- [Finnish Meteorological Institute — Seasons in Finland](https://en.ilmatieteenlaitos.fi/seasons-in-finland): seasonal and climate context.

**Planning boundary:** official source pages and systems remain the authority for admissions, jobs, residence rights, benefits, and services. Kielo's role is to make them easier to understand and to help people practise the Finnish they need along the way.
