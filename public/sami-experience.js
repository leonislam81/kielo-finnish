(function () {
  const words = [
    { fi: "saamelainen", en: "Sámi person", bn: "সামি ব্যক্তি", level: "Finland", topic: "Sámi people & languages", exampleFi: "Saamelaiset ovat alkuperäiskansa.", exampleEn: "The Sámi are an Indigenous people.", exampleBn: "সামিরা একটি আদিবাসী জনগোষ্ঠী।" },
    { fi: "alkuperäiskansa", en: "Indigenous people", bn: "আদিবাসী জনগোষ্ঠী", level: "Finland", topic: "Sámi people & languages", exampleFi: "Saamelaiset ovat Suomen alkuperäiskansa.", exampleEn: "The Sámi are Finland’s Indigenous people.", exampleBn: "সামিরা ফিনল্যান্ডের আদিবাসী জনগোষ্ঠী।" },
    { fi: "kotiseutualue", en: "homeland area", bn: "স্বদেশ অঞ্চল", level: "Finland", topic: "Sámi people & languages", exampleFi: "Saamelaisten kotiseutualue on Suomessa pohjoisessa.", exampleEn: "The Sámi homeland area in Finland is in the north.", exampleBn: "ফিনল্যান্ডে সামিদের স্বদেশ অঞ্চল উত্তরে।" },
    { fi: "saamen kieli", en: "Sámi language", bn: "সামি ভাষা", level: "Finland", topic: "Sámi people & languages", exampleFi: "Saamen kieli on tärkeä osa saamelaista kulttuuria.", exampleEn: "A Sámi language is an important part of Sámi culture.", exampleBn: "সামি ভাষা সামি সংস্কৃতির গুরুত্বপূর্ণ অংশ।" },
    { fi: "pohjoissaame", en: "Northern Sámi", bn: "উত্তর সামি ভাষা", level: "Finland", topic: "Sámi people & languages", exampleFi: "Pohjoissaamea puhutaan Suomessa.", exampleEn: "Northern Sámi is spoken in Finland.", exampleBn: "ফিনল্যান্ডে উত্তর সামি ভাষা বলা হয়।" },
    { fi: "inarinsaame", en: "Inari Sámi", bn: "ইনারি সামি ভাষা", level: "Finland", topic: "Sámi people & languages", exampleFi: "Inarinsaamea puhutaan perinteisesti Inarijärven alueella.", exampleEn: "Inari Sámi is traditionally spoken around Lake Inari.", exampleBn: "ইনারি হ্রদের আশপাশে ঐতিহ্যগতভাবে ইনারি সামি ভাষা বলা হয়।" },
    { fi: "koltansaame", en: "Skolt Sámi", bn: "স্কোল্ট সামি ভাষা", level: "Finland", topic: "Sámi people & languages", exampleFi: "Koltansaame on yksi Suomessa puhuttavista saamen kielistä.", exampleEn: "Skolt Sámi is one of the Sámi languages spoken in Finland.", exampleBn: "স্কোল্ট সামি ফিনল্যান্ডে বলা সামি ভাষাগুলোর একটি।" },
    { fi: "uhanalainen", en: "endangered", bn: "বিপন্ন", level: "Finland", topic: "Sámi people & languages", exampleFi: "Suomessa puhuttavat kolme saamen kieltä ovat uhanalaisia.", exampleEn: "The three Sámi languages spoken in Finland are endangered.", exampleBn: "ফিনল্যান্ডে বলা তিনটি সামি ভাষাই বিপন্ন।" },
    { fi: "oikeus", en: "right", bn: "অধিকার", level: "Finland", topic: "Sámi people & languages", exampleFi: "Saamelaisilla on oikeus käyttää saamen kieltä viranomaisissa kotiseutualueellaan.", exampleEn: "Sámi people have the right to use a Sámi language with authorities in their homeland area.", exampleBn: "সামি স্বদেশ অঞ্চলে কর্তৃপক্ষের সঙ্গে সামি ভাষা ব্যবহারের অধিকার সামিদের আছে।" },
    { fi: "viranomainen", en: "public authority", bn: "সরকারি কর্তৃপক্ষ", level: "Finland", topic: "Sámi people & languages", exampleFi: "Saamen kieltä voi käyttää viranomaisessa kotiseutualueella.", exampleEn: "A Sámi language can be used with public authorities in the homeland area.", exampleBn: "স্বদেশ অঞ্চলে সরকারি কর্তৃপক্ষের সঙ্গে সামি ভাষা ব্যবহার করা যায়।" },
    { fi: "vierailija", en: "visitor", bn: "দর্শনার্থী", level: "Finland", topic: "Sámi people & languages", exampleFi: "Vierailija kunnioittaa paikallista kulttuuria.", exampleEn: "A visitor respects local culture.", exampleBn: "একজন দর্শনার্থী স্থানীয় সংস্কৃতিকে সম্মান করেন।" },
    { fi: "kunnioittaa", en: "to respect", bn: "সম্মান করা", level: "Finland", topic: "Sámi people & languages", exampleFi: "Vierailija kunnioittaa paikallista kulttuuria.", exampleEn: "A visitor respects local culture.", exampleBn: "একজন দর্শনার্থী স্থানীয় সংস্কৃতিকে সম্মান করেন।" },
    { fi: "poronhoito", en: "reindeer herding", bn: "বলগা হরিণ পালন", level: "Finland", topic: "Sámi people & languages", exampleFi: "Poronhoito on yksi pohjoisen perinteisistä elinkeinoista.", exampleEn: "Reindeer herding is one of the traditional livelihoods in the north.", exampleBn: "বলগা হরিণ পালন উত্তরের ঐতিহ্যবাহী জীবিকাগুলোর একটি।" },
    { fi: "perinne", en: "tradition", bn: "ঐতিহ্য", level: "Finland", topic: "Sámi people & languages", exampleFi: "Perinne elää ja muuttuu nykyajassa.", exampleEn: "Tradition continues and changes in the present day.", exampleBn: "ঐতিহ্য বর্তমান সময়েও বেঁচে থাকে ও বদলায়।" }
  ];

  const scenes = [
    {
      id: "homeland",
      label: "Sápmi & homeland",
      eyebrow: "01 · PLACE & PEOPLE",
      title: "A homeland that predates today’s borders",
      copy: "Sápmi is the Sámi people’s broader homeland across northern Norway, Sweden, Finland and the Kola Peninsula. In Finland, the Sámi homeland area includes Inari, Enontekiö, Utsjoki and the northern part of Sodankylä.",
      bn: "সাপমি সামিদের বৃহত্তর স্বদেশ—উত্তর নরওয়ে, সুইডেন, ফিনল্যান্ড ও কোলা উপদ্বীপজুড়ে। ফিনল্যান্ডে সামি স্বদেশ অঞ্চলে ইনারি, এনোনতেকিও, উতসইয়োকি এবং সোডানক্যলার উত্তর অংশ অন্তর্ভুক্ত।",
      phrase: "Saamelaisten kotiseutualueeseen kuuluvat Inari, Enontekiö, Utsjoki ja Sodankylän pohjoisosa.",
      phraseEn: "The Sámi homeland area includes Inari, Enontekiö, Utsjoki and the northern part of Sodankylä.",
      phraseBn: "সামি স্বদেশ অঞ্চলে ইনারি, এনোনতেকিও, উতসইয়োকি ও সোডানক্যলার উত্তর অংশ অন্তর্ভুক্ত।",
      wordIds: ["kotiseutualue", "saamelainen", "alkuperäiskansa"],
      visual: "homeland"
    },
    {
      id: "languages",
      label: "Three Sámi languages",
      eyebrow: "02 · LANGUAGE & REVITALISATION",
      title: "Three Sámi languages are spoken in Finland",
      copy: "They are Northern Sámi, Inari Sámi and Skolt Sámi. All three are endangered. Inari Sámi is traditionally spoken around Lake Inari and is the only Sámi language spoken exclusively in Finland; revitalisation work is helping it grow.",
      bn: "ফিনল্যান্ডে তিনটি সামি ভাষা বলা হয়: উত্তর সামি, ইনারি সামি ও স্কোল্ট সামি। তিনটিই বিপন্ন। ইনারি সামি ঐতিহ্যগতভাবে ইনারি হ্রদের আশপাশে বলা হয় এবং একমাত্র সামি ভাষা যা শুধু ফিনল্যান্ডেই বলা হয়; ভাষাটিকে ফিরিয়ে আনার কাজ এগোচ্ছে।",
      phrase: "Suomessa puhutaan kolmea saamen kieltä: pohjoissaamea, inarinsaamea ja koltansaamea.",
      phraseEn: "Three Sámi languages are spoken in Finland: Northern Sámi, Inari Sámi and Skolt Sámi.",
      phraseBn: "ফিনল্যান্ডে তিনটি সামি ভাষা বলা হয়: উত্তর সামি, ইনারি সামি ও স্কোল্ট সামি।",
      wordIds: ["pohjoissaame", "inarinsaame", "koltansaame", "uhanalainen"],
      visual: "languages"
    },
    {
      id: "respect",
      label: "Rights & respectful visits",
      eyebrow: "03 · RIGHTS & EVERYDAY LIFE",
      title: "Learn with care; visit as a guest",
      copy: "Finnish law protects Sámi language and culture. In the Sámi homeland, people have the right to use Sámi with public authorities covered by the Language Act. Sámi culture is living and diverse: choose Sámi-led guidance, respect local requests, and treat livelihoods such as reindeer herding as everyday work—not a performance.",
      bn: "ফিনল্যান্ডের আইন সামি ভাষা ও সংস্কৃতি রক্ষা করে। সামি স্বদেশ অঞ্চলে ভাষা আইনের আওতাভুক্ত সরকারি কর্তৃপক্ষের সঙ্গে সামি ভাষা ব্যবহারের অধিকার আছে। সামি সংস্কৃতি জীবন্ত ও বৈচিত্র্যময়: সামিদের পরিচালিত গাইড বেছে নিন, স্থানীয় অনুরোধ মানুন, আর বলগা হরিণ পালনকে প্রদর্শনী নয়—দৈনন্দিন জীবিকা হিসেবে দেখুন।",
      phrase: "Vierailija kunnioittaa paikallista kulttuuria.",
      phraseEn: "A visitor respects local culture.",
      phraseBn: "একজন দর্শনার্থী স্থানীয় সংস্কৃতিকে সম্মান করেন।",
      wordIds: ["oikeus", "viranomainen", "vierailija", "kunnioittaa", "poronhoito", "perinne"],
      visual: "respect"
    }
  ];

  let activeScene = scenes[0].id;
  let quizAnswered = false;

  function reviewButton(word) {
    const saved = window.kieloIsReviewWord?.(word.fi) === true;
    return '<button type="button" class="finland-review-word ' + (saved ? "is-saved" : "") + '" data-topic-review data-review-fi="' + word.fi + '" data-review-en="' + word.en + '" data-review-bn="' + word.bn + '" data-review-topic="' + word.topic + '" aria-pressed="' + saved + '">' + (saved ? "✓ Saved" : "＋ Review") + "</button>";
  }

  function mapVisual() {
    return '<div class="finland-sami-journey" role="img" aria-label="Sápmi spans northern Norway, Sweden, Finland and the Kola Peninsula"><div class="finland-sami-route"><span>Norway</span><i aria-hidden="true"></i><span>Sweden</span><i aria-hidden="true"></i><span class="is-highlighted">Finland</span><i aria-hidden="true"></i><span>Kola Peninsula</span></div><p>Sápmi is older than today’s state borders · <span lang="bn">সাপমি বর্তমান রাষ্ট্রসীমার আগের স্বদেশভূমি</span></p><div class="finland-sami-places"><strong>In Finland · Suomen puolella</strong><span>Inari</span><span>Enontekiö</span><span>Utsjoki</span><span>Northern Sodankylä</span></div></div>';
  }

  function sceneVisual(scene) {
    if (scene.visual === "homeland") return mapVisual();
    if (scene.visual === "languages") return '<div class="finland-sami-language-visual"><article><span>01</span><strong lang="fi">pohjoissaame</strong><small>Northern Sámi</small></article><article><span>02</span><strong lang="fi">inarinsaame</strong><small>Inari Sámi · Inarijärvi</small></article><article><span>03</span><strong lang="fi">koltansaame</strong><small>Skolt Sámi</small></article><p><b>All three are endangered.</b> Language revitalisation and everyday use matter. <span lang="bn">তিনটিই বিপন্ন—ভাষা পুনরুজ্জীবন ও দৈনন্দিন ব্যবহার গুরুত্বপূর্ণ।</span></p></div>';
    return '<div class="finland-sami-care-visual"><article><span aria-hidden="true">◉</span><div><strong>Language rights</strong><small>Ask for Sámi service where the law applies.</small></div></article><article><span aria-hidden="true">⌖</span><div><strong>Sámi-led learning</strong><small>Follow local guidance and listen to Sámi voices.</small></div></article><article><span aria-hidden="true">✿</span><div><strong>Living livelihoods</strong><small>Learn with permission; respect work and community.</small></div></article><p lang="bn">অধিকার জানুন, সামিদের কণ্ঠ শুনুন, স্থানীয় নিয়ম মেনে চলুন।</p></div>';
  }

  function sceneMarkup(scene) {
    const sceneWords = scene.wordIds.map((id) => words.find((word) => word.fi === id)).filter(Boolean);
    const wordCards = sceneWords.map((word) => '<article class="finland-sami-word"><strong lang="fi">' + word.fi + '</strong><span>' + word.en + '</span><small lang="bn">' + word.bn + '</small><div><button type="button" data-topic-speak="' + word.fi + '" aria-label="Hear ' + word.fi + ' in Finnish">▶ Listen</button>' + reviewButton(word) + '</div></article>').join("");
    return '<div class="finland-sami-scene-detail"><div class="finland-sami-scene-copy"><span class="page-kicker">' + scene.eyebrow + '</span><h4>' + scene.title + '</h4><p>' + scene.copy + '</p><p class="finland-sami-bangla" lang="bn">' + scene.bn + '</p><div class="finland-sami-phrase"><div><span>FINNISH IN CONTEXT</span><strong lang="fi">' + scene.phrase + '</strong><p>' + scene.phraseEn + '</p><small lang="bn">' + scene.phraseBn + '</small></div><button type="button" data-topic-speak="' + scene.phrase + '" aria-label="Hear the Finnish phrase">▶</button></div></div>' + sceneVisual(scene) + '<div class="finland-sami-word-grid" aria-label="Finnish vocabulary">' + wordCards + '</div></div>';
  }

  function markup() {
    const sceneTabs = scenes.map((scene) => '<button type="button" role="tab" id="finland-sami-tab-' + scene.id + '" aria-controls="finland-sami-scene-panel" aria-selected="' + (scene.id === activeScene) + '" tabindex="' + (scene.id === activeScene ? "0" : "-1") + '" class="finland-sami-tab ' + (scene.id === activeScene ? "is-active" : "") + '" data-sami-scene="' + scene.id + '"><span>0' + (scenes.indexOf(scene) + 1) + '</span>' + scene.label + '</button>').join("");
    const quizOptions = ["Northern, Inari and Skolt Sámi", "Inari, Kven and Norwegian", "Northern Sámi only"].map((label, index) => '<button type="button" data-sami-answer="' + index + '" ' + (quizAnswered ? "disabled" : "") + '>' + label + '</button>').join("");
    const answerCopy = quizAnswered ? '<p class="finland-sami-quiz-feedback" role="status">Finland’s three Sámi languages are Northern Sámi, Inari Sámi and Skolt Sámi. <span lang="bn">ফিনল্যান্ডের তিনটি সামি ভাষা হলো উত্তর সামি, ইনারি সামি ও স্কোল্ট সামি।</span></p>' : '<p id="finland-sami-quiz-feedback" class="finland-sami-quiz-feedback" role="status" aria-live="polite"></p>';
    return '<section class="finland-sami-experience" aria-labelledby="finland-sami-heading"><div class="finland-sami-heading"><div><span class="page-kicker">SÁMI PEOPLE, LANGUAGES & HOMELAND · PRE-A1–B1</span><h3 id="finland-sami-heading">Learn about Sámi Finland with respect.</h3><p>A short Finnish lesson about the Sámi people, the three Sámi languages spoken in Finland, and how to be a thoughtful guest.</p></div><span class="finland-sami-heading-mark" aria-hidden="true">✿</span></div><div class="finland-sami-tabs" role="tablist" aria-label="Sámi people and language topics">' + sceneTabs + '</div><div id="finland-sami-scene-panel" role="tabpanel" aria-labelledby="finland-sami-tab-' + activeScene + '">' + sceneMarkup(scenes.find((scene) => scene.id === activeScene) || scenes[0]) + '</div><section class="finland-sami-quiz" aria-labelledby="finland-sami-quiz-title"><div><span class="page-kicker">A QUICK CHECK</span><h4 id="finland-sami-quiz-title">Which three Sámi languages are spoken in Finland?</h4><p lang="bn">ফিনল্যান্ডে কোন তিনটি সামি ভাষা বলা হয়?</p></div><div class="finland-sami-quiz-options" role="group" aria-label="Choose the three Sámi languages spoken in Finland">' + quizOptions + '</div>' + answerCopy + '</section><div class="finland-sami-respect-note"><strong>Visit with care</strong><p>Sámi communities are diverse and contemporary. One short lesson cannot represent everyone. Use Sámi-led sources, follow local requests, and do not treat cultural knowledge, symbols or livelihoods as props. <span lang="bn">সামি সম্প্রদায় বৈচিত্র্যময় ও সমসাময়িক। একটি ছোট পাঠ সবার প্রতিনিধিত্ব করে না। সামিদের পরিচালিত উৎস ব্যবহার করুন এবং স্থানীয় অনুরোধ মানুন।</span></p></div><div class="finland-sami-sources"><span>OFFICIAL SOURCES · CHECKED 23 OCT 2026</span><a href="https://samediggi.fi/en/about-us/" target="_blank" rel="noreferrer">Sámi Parliament · About us ↗</a><a href="https://samediggi.fi/en/areas-of-expertise/sami-languages/the-sami-language-act/" target="_blank" rel="noreferrer">Sámi Language Act ↗</a><a href="https://matkailu.samediggi.fi/en/visitor-guidance/" target="_blank" rel="noreferrer">Responsible visitor guidance ↗</a><a href="https://matkailu.samediggi.fi/en/" target="_blank" rel="noreferrer">Visitor guide to Sámi culture ↗</a></div></section>';
  }

  function selectScene(id) {
    const scene = scenes.find((item) => item.id === id);
    if (!scene) return;
    activeScene = id;
    document.querySelectorAll("[data-sami-scene]").forEach((button) => {
      const active = button.dataset.samiScene === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    const panel = document.getElementById("finland-sami-scene-panel");
    if (panel) {
      panel.setAttribute("aria-labelledby", "finland-sami-tab-" + id);
      panel.innerHTML = sceneMarkup(scene);
    }
  }

  document.addEventListener("click", (event) => {
    const sceneButton = event.target.closest("[data-sami-scene]");
    if (sceneButton) {
      selectScene(sceneButton.dataset.samiScene);
      return;
    }
    const answer = event.target.closest("[data-sami-answer]");
    if (!answer || quizAnswered) return;
    quizAnswered = true;
    const correct = Number(answer.dataset.samiAnswer) === 0;
    document.querySelectorAll("[data-sami-answer]").forEach((button, index) => {
      button.disabled = true;
      if (index === 0) button.classList.add("is-correct");
      else if (button === answer && !correct) button.classList.add("is-incorrect");
    });
    const feedback = document.getElementById("finland-sami-quiz-feedback");
    if (feedback) feedback.innerHTML = (correct ? "Correct. " : "Not quite. The answer is: ") + "Northern Sámi, Inari Sámi and Skolt Sámi. <span lang=\"bn\">ঠিক উত্তর: উত্তর সামি, ইনারি সামি ও স্কোল্ট সামি।</span>";
  });

  document.addEventListener("keydown", (event) => {
    const tab = event.target.closest?.("[data-sami-scene]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const current = scenes.findIndex((scene) => scene.id === tab.dataset.samiScene);
    const next = event.key === "Home" ? 0 : event.key === "End" ? scenes.length - 1 : (current + (event.key === "ArrowRight" ? 1 : scenes.length - 1)) % scenes.length;
    const target = document.querySelector('[data-sami-scene="' + scenes[next].id + '"]');
    if (target) {
      event.preventDefault();
      selectScene(scenes[next].id);
      target.focus();
    }
  });

  window.KieloSamiExperience = { words, markup };
})();
