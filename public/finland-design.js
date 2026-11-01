(() => {
  "use strict";

  const pageContent = document.getElementById("page-content");
  if (!pageContent) return;

  function mountDesignLesson() {
    const cultureChapter = pageContent.querySelector(".finland-culture-journey");
    if (!cultureChapter || cultureChapter.querySelector(".finland-design-lesson")) return;
    const cultureWordsHeading = cultureChapter.querySelector("#finland-culture-words-title");
    if (cultureWordsHeading) cultureWordsHeading.textContent = "Words for sauna and everyday design";

    const lesson = document.createElement("section");
    lesson.className = "finland-design-lesson";
    lesson.setAttribute("aria-labelledby", "finland-design-title");
    lesson.innerHTML = `
      <div class="finland-design-intro">
        <div class="finland-design-art" role="img" aria-label="Illustration of Oodi library in Helsinki, with a wooden façade and bright upper floor">
          <svg viewBox="0 0 520 260" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="oodi-sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#d8e8e1"/><stop offset="1" stop-color="#f1e7d8"/></linearGradient>
              <linearGradient id="oodi-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8f7ed"/><stop offset="1" stop-color="#a9c9c1"/></linearGradient>
            </defs>
            <path fill="url(#oodi-sky)" d="M0 0h520v260H0z"/>
            <circle cx="430" cy="52" r="27" fill="#f3cc83"/>
            <path d="M0 211q92-23 178 0t172 0 170 0v49H0z" fill="#91aa98"/>
            <path d="M70 153q89-83 192-49 61 20 167 8l-23 89H74z" fill="#a87554"/>
            <path d="M91 159q71-58 160-31 65 20 153 10l-12 57H92z" fill="url(#oodi-glass)"/>
            <path d="M94 192h306l-5 20H94z" fill="#d2ad82"/>
            <path d="M104 216h278v15H104z" fill="#704e3d"/>
            <path d="M129 174v38m43-45v45m47-41v41m48-36v36m48-33v33m45-31v31" stroke="#809b94" stroke-width="5"/>
            <path d="M117 147q33-41 69-37m-37-13q20-24 45-20" fill="none" stroke="#fff9e7" stroke-width="7" stroke-linecap="round" opacity=".72"/>
            <path d="M34 232h454" stroke="#31564b" stroke-width="4" opacity=".55"/>
          </svg>
          <span>Helsinki · public space · muotoilu</span>
        </div>
        <div class="finland-design-copy">
          <span class="page-kicker">CULTURE, DESIGN & ARCHITECTURE · A1</span>
          <h3 id="finland-design-title">Design is part of everyday city life.</h3>
          <p>Helsinki joined UNESCO’s Creative Cities Network as a City of Design in 2014. Oodi, Helsinki’s central library, is one example: its architecture combines a wooden façade, three different floor atmospheres and spaces for reading, meeting, learning and making.</p>
          <p lang="bn">২০১৪ সালে হেলসিঙ্কি UNESCO Creative Cities Network-এর City of Design হয়। Oodi—হেলসিঙ্কির কেন্দ্রীয় লাইব্রেরি—এর একটি উদাহরণ: কাঠের সম্মুখভাগ, তিন তলার আলাদা পরিবেশ, আর পড়া, দেখা, শেখা ও কিছু তৈরি করার জায়গা এক ভবনে মিলেছে।</p>
          <p class="finland-design-context">Oodi is one Helsinki example, not a summary of every Finnish building or design tradition.</p>
          <div class="finland-design-phrase">
            <div><span>TRY THIS FINNISH SENTENCE</span><strong lang="fi">Kirjastossa on tilaa kaikille.</strong><small>There is room for everyone in the library.</small><small lang="bn">লাইব্রেরিতে সবার জন্য জায়গা আছে।</small></div>
            <button class="button-secondary" type="button" data-topic-speak="Kirjastossa on tilaa kaikille." aria-label="Hear the Finnish sentence">▶ Listen</button>
          </div>
        </div>
      </div>
      <div class="finland-design-words" aria-label="Design vocabulary with Finnish audio">
        <article><strong lang="fi">muotoilu</strong><span>design</span><small lang="bn">নকশা / ডিজাইন</small><button type="button" data-topic-speak="muotoilu" aria-label="Hear muotoilu">▶</button></article>
        <article><strong lang="fi">arkkitehtuuri</strong><span>architecture</span><small lang="bn">স্থাপত্য</small><button type="button" data-topic-speak="arkkitehtuuri" aria-label="Hear arkkitehtuuri">▶</button></article>
        <article><strong lang="fi">julkinen tila</strong><span>public space</span><small lang="bn">সবার ব্যবহারের জায়গা</small><button type="button" data-topic-speak="julkinen tila" aria-label="Hear julkinen tila">▶</button></article>
        <article><strong lang="fi">kirjasto</strong><span>library</span><small lang="bn">লাইব্রেরি</small><button type="button" data-topic-speak="kirjasto" aria-label="Hear kirjasto">▶</button></article>
        <article><strong lang="fi">avoin</strong><span>open</span><small lang="bn">উন্মুক্ত</small><button type="button" data-topic-speak="avoin" aria-label="Hear avoin">▶</button></article>
        <article><strong lang="fi">kerros</strong><span>floor / storey</span><small lang="bn">তলা</small><button type="button" data-topic-speak="kerros" aria-label="Hear kerros">▶</button></article>
      </div>
      <section class="finland-design-check" aria-labelledby="finland-design-check-title">
        <div><span class="page-kicker">QUICK CHECK · NO RUSH</span><h4 id="finland-design-check-title">Which building is the example in this lesson?</h4><p lang="bn">এই পাঠে কোন ভবনটিকে উদাহরণ হিসেবে দেখানো হয়েছে?</p></div>
        <div class="finland-design-options" role="group" aria-label="Choose the Helsinki building">
          <button type="button" data-finland-design-answer="1">Oodi Central Library</button>
          <button type="button" data-finland-design-answer="0">A Lapland forest cabin</button>
          <button type="button" data-finland-design-answer="0">A market hall in Turku</button>
        </div>
        <p class="finland-design-feedback" id="finland-design-feedback" role="status" aria-live="polite"></p>
      </section>
      <p class="finland-design-sources">Sources, checked 1 November 2026: <a href="https://www.unesco.org/en/creative-cities/helsinki?hub=80094" target="_blank" rel="noreferrer">UNESCO · Helsinki, City of Design ↗</a> · <a href="https://oodihelsinki.fi/en/what-is-oodi/architecture/" target="_blank" rel="noreferrer">Oodi · Architecture ↗</a></p>`;
    cultureChapter.append(lesson);
  }

  pageContent.addEventListener("click", (event) => {
    const answer = event.target.closest("[data-finland-design-answer]");
    if (!answer || answer.disabled) return;
    const options = answer.closest(".finland-design-options");
    const correct = answer.dataset.finlandDesignAnswer === "1";
    options.querySelectorAll("[data-finland-design-answer]").forEach((button) => {
      button.disabled = true;
      if (button.dataset.finlandDesignAnswer === "1") button.classList.add("is-correct");
      else if (button === answer && !correct) button.classList.add("is-incorrect");
    });
    const feedback = answer.closest(".finland-design-check").querySelector(".finland-design-feedback");
    if (feedback) feedback.textContent = correct
      ? "Correct — Oodi is Helsinki’s central library. Say kirjasto once more. / ঠিক — Oodi হেলসিঙ্কির কেন্দ্রীয় লাইব্রেরি। kirjasto শব্দটি আরেকবার বলুন।"
      : "The answer is Oodi Central Library. Notice kirjasto means library. / সঠিক উত্তর Oodi Central Library। মনে রাখুন, kirjasto মানে লাইব্রেরি।";
  });

  const observer = new MutationObserver(mountDesignLesson);
  observer.observe(pageContent, { childList: true, subtree: true });
  mountDesignLesson();
})();
