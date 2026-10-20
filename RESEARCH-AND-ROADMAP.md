# Kielo: research and product plan

## Product idea

**Kielo** is a calm, visual Finnish-learning web app for English- and Bengali-speaking beginners. The interface is in English. Learners can switch lesson explanations between English and Bangla while Finnish examples, audio, and practice stay central.

The name comes from *kielo*, the Finnish name for lily-of-the-valley, Finland's national flower. The visual direction uses lake blue, pine green, snow, soft berry red, and editorial photography inspired by Finnish seasons.

## Research findings

- The Finnish National Agency for Education (OPH) maps YKI grades 1–6 to CEFR A1–C2. YKI is arranged in basic, intermediate, and advanced bands, with a separate assessment for listening, speaking, reading, and writing.
- OPH describes YKI as practical language use and gives recurring themes such as personal background, home, services, culture, travel, health, work, environment, and society. Those themes provide the real-life spine for the course.
- The Council of Europe's CEFR Companion Volume includes Pre-A1 and updated descriptors. Kielo therefore starts before A1 and treats progress as communication tasks rather than a list of grammar labels.
- Yle provides beginner Finnish videos (alphabet, numbers, phrases), subtitled programmes, simplified news, and levelled self-study materials. Kielo links learners to these resources rather than copying or rehosting third-party media.
- The Finnish Meteorological Institute explains the regional variation of Finnish seasons, including the longer northern winter and the midnight sun. Finland's official country communications describe Midsummer, sauna, cottages, and outdoor life. These become the settings for culture-based examples.

## Course map: Pre-A1 to C2

| Level | Learner milestone | Sample course units |
| --- | --- | --- |
| Pre-A1 | Recognise sounds and use first survival phrases | Sounds & spelling; greetings; numbers and time; first questions |
| A1 | Handle simple everyday exchanges | Introductions; café and shop; home and family; directions and transport |
| A2 | Describe routines and past events | Daily life; weather and seasons; health; travel and short messages |
| B1 | Manage familiar situations with connected speech | Work and study; housing; appointments; stories and opinions |
| B2 | Explain ideas and participate in extended discussion | Society; environment; media; formal requests and workplace communication |
| C1–C2 | Understand nuanced Finnish and express precise, flexible ideas | Register and style; argument; idioms; long-form listening and writing |

Each unit is designed around a scene, a short input (image, dialogue, or video link), a compact vocabulary set, one grammar pattern, four-skills practice, and a short review. The app tracks a local progress record so the first version works without an account.

## First release plan

1. **Research and planning:** this document records the teaching model, level map, content sources, and product assumptions.
2. **Mockup:** a responsive learner dashboard shows the current path, next lesson, practice streak, and a Finland-themed scene.
3. **Course experience:** level navigation covers Pre-A1 through C2; each level has a coherent progression, while playable lessons demonstrate the lesson, quiz, listening, speaking, and flashcard patterns.
4. **Culture and media:** season cards connect vocabulary to Finland; a media shelf links to Yle's beginner videos, levelled materials, and simplified news.
5. **Review and delivery:** check the local preview, publish the private preview site, and push the project to a private GitHub repository.

## Design and teaching choices

- Keep the core navigation and controls in English; offer Bangla/English lesson hints as a learner setting.
- Keep Finnish visible beside its translation. Use short sentences, one concept at a time, audio playback, image prompts, and immediate answer feedback.
- Use a progression that includes listening, speaking, reading, and writing. Speaking prompts are practice prompts, not an automated pronunciation score.
- Use learner-created examples and link to Yle for third-party video. External video availability and captions can change, so media cards identify their source and open the official material.
- Save lesson completion and vocabulary review to this browser with `localStorage`; no account or server is needed for the first release.

## Sources

- [Council of Europe: CEFR Companion Volume](https://www.coe.int/en/web/education/-/common-european-framework-of-reference-for-languages-learning-teaching-assessment-14)
- [OPH: YKI levels and four subtests](https://www.oph.fi/en/education-and-qualifications/selecting-right-yki-test-test-days)
- [OPH: YKI topics and practice](https://www.oph.fi/en/education-and-qualifications/yki-test)
- [Yle: Finnish-language beginner videos](https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet)
- [Yle: Finnish self-study materials by level](https://yle.fi/a/20-10002426)
- [Finnish Meteorological Institute: seasons in Finland](https://en.ilmatieteenlaitos.fi/seasons-in-finland)
- [Finland Toolbox: Finnish Midsummer](https://toolbox.finland.fi/seasons-destinations/finnish-midsummer/)
- [thisisFINLAND: Finland's national flower and nature symbols](https://finland.fi/life-society/iconic-finnish-nature-symbols-stand-out/)
