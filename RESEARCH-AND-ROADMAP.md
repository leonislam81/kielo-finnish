# Kielo: research and product plan

## Product idea

**Kielo** is a calm, visual Finnish-learning web app for English- and Bengali-speaking beginners. The interface is in English. Learners can switch lesson explanations between English and Bangla while Finnish examples, audio, and practice stay central.

The name comes from *kielo*, the Finnish name for lily-of-the-valley, Finland's national flower. The visual direction uses lake blue, pine green, snow, soft berry red, and editorial photography inspired by Finnish seasons.

## Research findings

- The Finnish National Agency for Education (OPH) maps YKI grades 1–6 to CEFR A1–C2. YKI is arranged in basic, intermediate, and advanced bands, with a separate assessment for listening, speaking, reading, and writing.
- OPH describes YKI as practical language use and gives recurring themes such as personal background, home, services, culture, travel, health, work, environment, and society. Those themes provide the real-life spine for the course.
- The Council of Europe's CEFR Companion Volume includes Pre-A1 and updated descriptors. Kielo therefore starts before A1 and treats progress as communication tasks rather than a list of grammar labels.
- Yle provides beginner Finnish videos (alphabet, numbers, phrases), subtitled programmes, simplified news, and levelled self-study materials. Kielo links learners to these resources rather than copying or rehosting third-party media.
- Aalto OpenLearning's beginner Finnish course introduces long and short vowels and double consonants. The University of Turku's Finnish teaching videos include pronunciation, vowel harmony, and short/long sound practice. Kielo's Sound Lab turns the first pronunciation ideas into short browser-audio drills and keeps the university resources linked as optional follow-up.
- VR's official ticket flow labels one-way and return options as Meno and Paluu, and Helsinki station departure listings use raide / raiteelta for platform information. These terms inform the station role-play; the lesson does not present live train times.
- The Finnish Meteorological Institute explains the regional variation of Finnish seasons, including the longer northern winter and the midnight sun. Finland's official country communications describe Midsummer, sauna, cottages, and outdoor life. These become the settings for culture-based examples.

## Course map: Pre-A1 to C2

| Level | Learner milestone | Sample course units |
| --- | --- | --- |
| Pre-A1 | Recognise sounds and use first survival phrases | Sounds & spelling; greetings; numbers and time; first questions |
| A1 | Handle simple everyday exchanges | Introductions; café and shop; home and family; directions and transport |
| A2 | Describe routines and past events; understand everyday texts; write concise messages and notes | Daily life; weather and seasons; health; travel; messages, notices, and short everyday writing |
| B1 | Manage familiar situations with connected speech | Work and study; housing; appointments; stories and opinions |
| B2 | Explain ideas and participate in extended discussion | Society; environment; media; formal requests and workplace communication |
| C1–C2 | Understand nuanced Finnish and express precise, flexible ideas | Register and style; argument; idioms; long-form listening and writing |

Each unit is designed around a scene, a short input (image, dialogue, or official video link), a compact vocabulary set, one grammar pattern, four-skills practice, and a short review. The A2 Reading practice uses short messages, a library notice, and a travel note; learners can tap words for English or Bangla meanings and answer detail questions. It links to Yle Selkouutiset for optional real-world reading. A2 Writing now guides learners through arranging Finnish message parts for a reply, a cottage invitation, and a short request; translations, audio, and explanations are available in English or Bangla. The app tracks a local progress record so learners can start without an account. Iterations add scene-specific imagery, visual word matching, a small spaced-review schedule that learners can adjust with Again or Got it, guided café and train-station conversations with listen-and-choose turns, bilingual hints, and phrase replay, plus a standalone Sound Lab for the eight vowels and sound length.

## First release plan

1. **Research and planning:** this document records the teaching model, level map, content sources, and product assumptions.
2. **Mockup:** a responsive learner dashboard shows the current path, next lesson, practice streak, and a Finland-themed scene.
3. **Course experience:** level navigation covers Pre-A1 through C2; each level has a coherent progression, while playable lessons demonstrate the lesson, quiz, listening, speaking, and flashcard patterns.
4. **Culture and media:** season cards connect vocabulary to Finland; a media shelf links to Yle's beginner videos, levelled materials, and simplified news.
5. **Review and delivery:** check the local preview, publish the private preview site, and push the project to a private GitHub repository.
6. **Practice iteration:** ship scene-specific pictures, picture matching, spaced word review, and guided café and train-station conversations.

## Design and teaching choices

- Keep the core navigation and controls in English; offer Bangla/English lesson hints as a learner setting.
- Keep Finnish visible beside its translation. Use short sentences, one concept at a time, audio playback, image prompts, and immediate answer feedback.
- Use a progression that includes listening, speaking, reading, and writing. Speaking prompts are practice prompts, not an automated pronunciation score.
- Use learner-created examples and link to Yle for third-party video. External video availability and captions can change, so media cards identify their source and open the official material.
- Save lesson completion, conversation completion, and vocabulary review to this browser with `localStorage`; no account or server is needed for the first release.

## Sources

- [Council of Europe: CEFR Companion Volume](https://www.coe.int/en/web/education/-/common-european-framework-of-reference-for-languages-learning-teaching-assessment-14)
- [OPH: YKI levels and four subtests](https://www.oph.fi/en/education-and-qualifications/selecting-right-yki-test-test-days)
- [OPH: YKI topics and practice](https://www.oph.fi/en/education-and-qualifications/yki-test)
- [OPH: YKI and CEFR proficiency descriptions](https://www.oph.fi/sites/default/files/documents/169247_proficiency_levels_cefr.pdf)
- [Yle: Selkouutiset in easy Finnish](https://yle.fi/selkouutiset)
- [Yle: Finnish-language beginner videos](https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet)
- [Yle: Finnish self-study materials by level](https://yle.fi/a/20-10002426)
- [Aalto OpenLearning: Tips for mastering Finnish pronunciation](https://openlearning.aalto.fi/mod/page/view.php?id=17025)
- [Aalto OpenLearning: Beginner text-message writing task](https://openlearning.aalto.fi/mod/assign/view.php?id=15404)
- [University of Turku: Finnish language teaching videos](https://www.utu.fi/en/fi/yliopisto/kieli-ja-viestintaopintojen-keskus/tutkimus-ja-kehittaminen/osus/opetusvideot)
- [VR: Helsinki station departures and platform wording](https://www.vr.fi/rautatieasemat-ja-reitit/helsinki)
- [VR: Commuter train tickets](https://www.vr.fi/rautatieasemat-ja-reitit/lahiliikenne)
- [Finnish Meteorological Institute: seasons in Finland](https://en.ilmatieteenlaitos.fi/seasons-in-finland)
- [Finland Toolbox: Finnish Midsummer](https://toolbox.finland.fi/seasons-destinations/finnish-midsummer/)
- [thisisFINLAND: Finland's national flower and nature symbols](https://finland.fi/life-society/iconic-finnish-nature-symbols-stand-out/)
