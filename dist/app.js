(function(){
  "use strict";
  const levels=window.KIELO_LEVELS||[];
  const lessons=levels.flatMap(level=>level.lessons.map(lesson=>({...lesson,levelId:level.id,levelLabel:level.label,levelColor:level.color,levelTitle:level.title})));
  const storageKey="kielo-learning-v1";
  let saved={};
  try{saved=JSON.parse(localStorage.getItem(storageKey)||"{}")}catch(_error){saved={}}
  const savedKnown=Array.isArray(saved.known)?saved.known:[];
  const reviewSchedule=saved.review&&typeof saved.review==="object"?saved.review:Object.fromEntries(savedKnown.map(word=>[word,{box:0,due:Date.now()}]));
  savedKnown.forEach(word=>{if(!reviewSchedule[word])reviewSchedule[word]={box:0,due:Date.now()}});
  const state={
    page:"home",filter:"all",help:saved.help==="en"?"en":"bn",completed:new Set(Array.isArray(saved.completed)?saved.completed:[]),known:new Set(savedKnown),reviewSchedule,drafts:saved.drafts||{},lesson:null,step:0,quizChoice:null,quizDone:false,search:"",reviewActive:false,reviewQueue:[],reviewIndex:0,reviewRevealed:false,reviewFinished:false,matchWord:null,matchOptions:[],matchChoice:null
  };
  const pageContent=document.getElementById("page-content");
  const modalBackdrop=document.getElementById("lesson-backdrop");
  const modalContent=document.getElementById("lesson-modal-content");
  const toast=document.getElementById("toast");
  const photo={summer:"https://images.unsplash.com/photo-1627419386455-2ce1ee744cff?auto=format&fit=crop&w=1200&q=84",winter:"https://images.unsplash.com/photo-1580060510168-d909e950a973?auto=format&fit=crop&w=900&q=82",city:"https://images.unsplash.com/photo-1551286771-f713e47e0a85?auto=format&fit=crop&w=900&q=82",twilight:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=82"};
  function sceneForLesson(lesson){
    const wordsInScene=((lesson.scene||"")+" "+(lesson.title||"")+" "+(lesson.focus||"")).toLowerCase();
    if(/snow|winter|cold|weather|frost|lumi|commute/.test(wordsInScene))return {image:photo.winter,label:"A Finnish winter"};
    if(/lake|forest|pine|outdoor|cottage|nature|north|summer/.test(wordsInScene))return {image:photo.summer,label:"Finnish lakes and forests"};
    if(/radio|email|seminar|study group|editorial|dusk|discussion|meeting|office|report/.test(wordsInScene))return {image:photo.twilight,label:"A northern evening"};
    return {image:photo.city,label:"Everyday life in Finland"};
  }
  const wordPictures=[
    [/fire|burn/i,"🔥"],[/wind/i,"🌬️"],[/moon/i,"🌙"],[/hello|greeting/i,"👋"],[/thank you/i,"🙏"],[/one/i,"1️⃣"],[/two/i,"2️⃣"],[/three/i,"3️⃣"],[/what/i,"❔"],[/this/i,"👆"],[/^is$| is /i,"🟰"],[/coffee/i,"☕"],[/tea/i,"🍵"],[/water/i,"💧"],[/home|apartment|balcony|rent/i,"🏠"],[/family|sibling|colleague|neighbour|resident/i,"👥"],[/where/i,"📍"],[/station/i,"🚉"],[/left/i,"⬅️"],[/weather/i,"🌦️"],[/snow|frost/i,"❄️"],[/sun/i,"☀️"],[/wake up|breakfast|weekday|everyday life/i,"🌅"],[/yesterday/i,"🕰️"],[/visit|go|travel|journey|move home|come|hike/i,"🚶"],[/market/i,"🧺"],[/doctor|health|ill/i,"🩺"],[/appointment|time/i,"🗓️"],[/train/i,"🚆"],[/work|experience|job/i,"💼"],[/forest/i,"🌲"],[/lake/i,"🏞️"],[/public transport|transport/i,"🚋"],[/report|summary|email/i,"📝"],[/send/i,"📨"],[/environment|ecological|waste|recycl|sort/i,"♻️"],[/reservation/i,"🎟️"],[/grateful/i,"💛"],[/solution/i,"🧩"],[/cost-effective|convenient/i,"💡"],[/decision/i,"✅"],[/schedule/i,"📅"],[/rain|ironic/i,"🌧️"],[/soon/i,"⏳"],[/accessibility/i,"♿"],[/whole|environment/i,"🌍"]
  ];
  function pictureForWord(word){const text=(word.en+" "+word.fi).toLowerCase();return wordPictures.find(([pattern])=>pattern.test(text))?.[1]||"✨"}
  function dueReviewWords(){const lookup=new Map(words().map(word=>[word.fi,word]));return [...state.known].filter(fi=>Number(state.reviewSchedule[fi]?.due||0)<=Date.now()).map(fi=>lookup.get(fi)).filter(Boolean).sort((a,b)=>(state.reviewSchedule[a.fi]?.due||0)-(state.reviewSchedule[b.fi]?.due||0))}
  function startReview(){state.reviewQueue=dueReviewWords().map(word=>word.fi);state.reviewIndex=0;state.reviewActive=state.reviewQueue.length>0;state.reviewRevealed=false;state.reviewFinished=false;if(!state.reviewActive)showToast("No words are due right now.");renderPractice()}
  function answerReview(rating){
    const fi=state.reviewQueue[state.reviewIndex];if(!fi)return;
    const current=state.reviewSchedule[fi]||{box:0,due:Date.now()};
    if(rating==="again")state.reviewSchedule[fi]={box:0,due:Date.now()+10*60*1000};
    else{const box=Math.min(5,Number(current.box||0)+1);const intervals=[1,3,7,14,30];state.reviewSchedule[fi]={box,due:Date.now()+intervals[box-1]*24*60*60*1000}}
    state.reviewIndex++;state.reviewRevealed=false;
    if(state.reviewIndex>=state.reviewQueue.length){state.reviewActive=false;state.reviewFinished=true;state.reviewQueue=[]}
    persist();renderPractice();
  }
  function startPictureMatch(){
    const pool=words();state.matchWord=pool[Math.floor(Math.random()*pool.length)];
    const distractors=pool.filter(word=>word.fi!==state.matchWord.fi).sort(()=>Math.random()-.5).slice(0,2);
    state.matchOptions=[state.matchWord,...distractors].sort(()=>Math.random()-.5);state.matchChoice=null;renderPractice();
  }
  const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  const persist=()=>localStorage.setItem(storageKey,JSON.stringify({help:state.help,completed:[...state.completed],known:[...state.known],review:state.reviewSchedule,drafts:state.drafts}));
  const doneCount=()=>state.completed.size;
  const pct=()=>Math.round(doneCount()/lessons.length*100);
  const getNextLesson=()=>lessons.find(lesson=>!state.completed.has(lesson.id))||lessons[0];
  const findLesson=id=>lessons.find(lesson=>lesson.id===id)||lessons[0];
  const words=()=>lessons.flatMap(lesson=>lesson.words.map(word=>({fi:word[0],en:word[1],bn:word[2],lessonId:lesson.id,lessonTitle:lesson.title,level:lesson.levelLabel})));
  const helpText=lesson=>state.help==="bn"?lesson.bn:lesson.en;
  const grammarText=lesson=>state.help==="bn"?lesson.grammarBn:lesson.grammar;
  const questionText=lesson=>state.help==="bn"?lesson.questionBn:lesson.question;
  const whyText=lesson=>state.help==="bn"?lesson.whyBn:lesson.why;
  const iconFor=level=>({"pre-a1":"◌","a1":"☕","a2":"◷","b1":"↗","b2":"◈","c1":"✎","c2":"✦"}[level]||"✿");
  function showToast(message){toast.textContent=message;toast.classList.add("visible");window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(()=>toast.classList.remove("visible"),2400)}
  function progressBar(count,total){return `<div class="progress-track"><div class="progress-fill" style="width:${total?Math.min(100,Math.round(count/total*100)):0}%"></div></div>`}
  function setActiveNav(){document.querySelectorAll(".nav-link").forEach(button=>button.classList.toggle("active",button.dataset.page===state.page));document.querySelectorAll("[data-lang-label]").forEach(label=>label.classList.toggle("selected",label.dataset.langLabel===state.help));document.getElementById("word-count").textContent=state.known.size}
  function setPage(page){state.page=page;render();document.getElementById("sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"})}
  function render(){setActiveNav();if(state.page==="home")renderHome();else if(state.page==="path")renderPath();else if(state.page==="practice")renderPractice();else renderCulture()}
  function renderHome(){
    const next=getNextLesson();
    pageContent.innerHTML=`
      <div class="welcome-row"><div><h1>Your Finnish journey starts here.</h1><p>Small steps, real words, and a little more Finland every day.</p></div><div class="date-pill"><span>✦</span> A thoughtful 10-minute session</div></div>
      <section class="hero-card"><div class="hero-copy"><div class="hero-kicker"><span class="kielo-dot">✿</span> Your next step · ${escapeHTML(next.levelLabel)}</div><h2>Learn Finnish, one small moment at a time.</h2><p>From your first <em>hei</em> to confident conversations, follow a clear path built around everyday life in Finland.</p><div class="hero-actions"><button class="button-primary" data-open-lesson="${escapeHTML(next.id)}">${state.completed.size?"Continue learning":"Start your first lesson"}<span>→</span></button><span class="hero-meta">◷ &nbsp;5 minutes · English or Bangla help</span></div></div><div class="hero-visual"><img src="${photo.summer}" alt="A still Finnish lake surrounded by pine trees"/><div class="image-note"><strong>Järvi</strong>Finnish for “lake”</div></div></section>
      <div class="dashboard-stats"><div class="stat-card"><span class="stat-icon">✿</span><div><strong>${doneCount()} / ${lessons.length}</strong><small>lessons completed</small></div></div><div class="stat-card"><span class="stat-icon blue">◉</span><div><strong>${pct()}%</strong><small>of your path explored</small></div></div><div class="stat-card"><span class="stat-icon rose">▣</span><div><strong>${state.known.size}</strong><small>words in your review pile</small></div></div></div>
      <section class="section-block"><div class="section-head"><div><h2>Pick up where you left off</h2><p>Your next lesson is ready when you are.</p></div><button class="link-button" data-page="path">View full path ↗</button></div><div class="next-card"><div class="next-icon">${iconFor(next.levelId)}</div><div><h3>${escapeHTML(next.title)}</h3><p>${escapeHTML(next.levelLabel)} · ${escapeHTML(next.focus)} · 5 min</p></div><div class="next-progress">${progressBar(doneCount(),lessons.length)}<small>${pct()}% complete</small></div></div></section>
      <section class="section-block"><div class="section-head"><div><h2>A path for every stage</h2><p>Start with the sounds. Keep going as far as your curiosity takes you.</p></div><button class="link-button" data-page="path">Explore all 7 levels ↗</button></div><div class="level-grid">${levels.map(levelCard).join("")}</div></section>
      <section class="section-block"><div class="section-head"><div><h2>Finnish, seen through the seasons</h2><p>Remember a new word by tying it to a place, a picture, and a moment.</p></div><button class="link-button" data-page="culture">Explore Finland ↗</button></div><div class="scene-grid"><article class="scene-card"><img src="${photo.summer}" alt="A Finnish lakeside cabin and green forest"/><div class="scene-card-copy"><span>SUMMER · KESÄ</span><h3>Long lake evenings</h3><p>järvi · mökki · aurinko</p></div></article><article class="scene-card"><img src="${photo.winter}" alt="Snow resting on evergreen trees in Lapland"/><div class="scene-card-copy"><span>WINTER · TALVI</span><h3>Quiet northern mornings</h3><p>lumi · metsä · kylmä</p></div></article><article class="scene-card"><img src="${photo.city}" alt="A tram moving through a Finnish city street"/><div class="scene-card-copy"><span>EVERYDAY · ARKI</span><h3>Getting around Helsinki</h3><p>raitiovaunu · asema · koti</p></div></article></div></section>
      <section class="section-block"><div class="section-head"><div><h2>A tiny sound lab</h2><p>Tap a word to hear it in Finnish. The longer vowel changes the meaning.</p></div></div><div class="sound-lab"><div><h3>One letter, a different word</h3><p>Listen for the length of the vowel in each word.</p></div><div class="sound-words"><button class="sound-chip" data-speak="tuli"><strong>tuli</strong><small>fire · আগুন</small></button><button class="sound-chip" data-speak="tuuli"><strong>tuuli</strong><small>wind · বাতাস</small></button><button class="sound-chip" data-speak="kuu"><strong>kuu</strong><small>moon · চাঁদ</small></button></div></div></section>`;
  }
  function levelCard(level){const levelLessons=level.lessons;const complete=levelLessons.filter(lesson=>state.completed.has(lesson.id)).length;return `<button class="level-card" data-level="${escapeHTML(level.id)}"><div class="level-head"><span class="level-badge ${escapeHTML(level.color)}">${escapeHTML(level.label)}</span><span class="level-band">${escapeHTML(level.band)}</span></div><h3>${escapeHTML(level.title)}</h3><p>${escapeHTML(level.description)}</p><div class="level-foot"><span>${levelLessons.length} guided lessons</span><strong>${complete}/${levelLessons.length} done</strong></div></button>`}
  function renderPath(){
    const levelFilter=state.filter;
    const visibleLevels=levelFilter==="all"?levels:levels.filter(level=>level.id===levelFilter);
    pageContent.innerHTML=`<div class="page-title-row"><div><div class="page-kicker">Your course map · 28 short lessons</div><h1>Learning path</h1><p>A clear route from your first Finnish sounds to nuanced, advanced communication. Choose a level to see its scenes and lesson goals.</p></div><button class="button-secondary" data-page="practice">Review vocabulary <span>↗</span></button></div>
      <div class="path-intro"><div><strong>${doneCount()?"Your progress is taking shape.":"Every level starts with useful, everyday Finnish."}</strong><p>YKI and CEFR use six proficiency bands from A1 to C2; Pre-A1 is here for the very first step.</p></div><div class="path-progress-label"><b>${pct()}%</b>${doneCount()} of ${lessons.length} lessons complete</div></div>
      <div class="filter-row"><button class="filter-chip ${levelFilter==="all"?"active":""}" data-filter="all">All levels</button>${levels.map(level=>`<button class="filter-chip ${levelFilter===level.id?"active":""}" data-filter="${escapeHTML(level.id)}">${escapeHTML(level.label)}</button>`).join("")}</div>
      <div>${visibleLevels.map(level=>{const done=level.lessons.filter(lesson=>state.completed.has(lesson.id)).length;return `<section class="curriculum-level"><header class="curriculum-level-header"><span class="level-badge ${escapeHTML(level.color)}">${escapeHTML(level.label)}</span><div><h2>${escapeHTML(level.title)}</h2><p>${escapeHTML(level.description)}</p></div><div class="path-progress-label" style="margin-left:auto"><b>${done}/${level.lessons.length}</b>lessons</div></header><div class="curriculum-units">${level.lessons.map((lesson,index)=>`<div class="unit-row ${state.completed.has(lesson.id)?"done":""}"><span class="unit-number">${state.completed.has(lesson.id)?"✓":String(index+1).padStart(2,"0")}</span><div class="unit-copy"><strong>${escapeHTML(lesson.title)}</strong><small>${escapeHTML(lesson.focus)} · ${escapeHTML(lesson.scene)}</small></div><button class="unit-action" data-open-lesson="${escapeHTML(lesson.id)}" aria-label="Open ${escapeHTML(lesson.title)}">${state.completed.has(lesson.id)?"↻":"→"}</button></div>`).join("")}</div></section>`}).join("")}</div>
      <p class="levels-note">This is a guided self-study path. The YKI certificate is a separate assessment of listening, speaking, reading, and writing.</p>`;
  }
  function renderReviewPanel(due){
    if(state.reviewActive){
      const fi=state.reviewQueue[state.reviewIndex];
      const word=words().find(item=>item.fi===fi);
      const scene=sceneForLesson(findLesson(word.lessonId));
      const revealMarkup=state.reviewRevealed
        ? '<div class="review-answer"><strong>'+escapeHTML(word.en)+'</strong><span>'+escapeHTML(word.bn)+'</span></div>'
        : '<button class="button-primary review-reveal" data-review="reveal">Show meaning <span>↓</span></button>';
      const box=Number(state.reviewSchedule[fi]?.box||0);
      const nextInterval=[1,3,7,14,30][Math.min(4,box)];
      const ratingMarkup=state.reviewRevealed
        ? '<div class="review-rating"><span>How easy was that?</span><button class="button-secondary" data-review="again">Again · 10 min</button><button class="button-primary" data-review="got-it">Got it · '+nextInterval+' day'+(box===0?"":"s")+'</button></div>'
        : '';
      return '<section class="review-panel"><div class="review-panel-top"><div><span class="review-kicker">SPACED REVIEW · '+(state.reviewIndex+1)+' OF '+state.reviewQueue.length+'</span><h2>Bring this word back to mind</h2></div><button class="link-button" data-review="finish">Pause review</button></div><div class="review-card"><div class="review-picture" role="img" aria-label="'+escapeHTML(scene.label)+'" style="--scene-image:url(\''+scene.image+'\')"><span>'+pictureForWord(word)+'</span></div><div class="review-prompt"><small>Say it, then listen</small><h3>'+escapeHTML(word.fi)+'</h3><button class="button-secondary" data-speak="'+escapeHTML(word.fi)+'">▶ &nbsp; Listen</button>'+revealMarkup+'</div></div>'+ratingMarkup+'</section>';
    }
    const nextDue=[...state.known].map(fi=>state.reviewSchedule[fi]?.due).filter(dueAt=>Number(dueAt)>Date.now()).sort((a,b)=>a-b)[0];
    const status=state.reviewFinished?"Lovely work. Your due words are reviewed for now.":due.length?(due.length===1?"1 word is":"Several words are")+" ready to revisit.":state.known.size?"All caught up. Next word due "+(nextDue?new Date(nextDue).toLocaleDateString():"soon")+".":"Add a word to your shelf and it will appear here when you are ready to review.";
    const button=due.length?"Review "+due.length+" word"+(due.length===1?"":"s"):"Up to date";
    return '<section class="review-panel review-start"><div><span class="review-kicker">A LITTLE, OFTEN</span><h2>Your review shelf</h2><p>'+escapeHTML(status)+' Remember a word, reveal the meaning, then choose a review interval.</p></div><button class="button-primary" data-review="start" '+(due.length?"":"disabled")+'>'+button+' <span>↗</span></button></section>';
  }
  function renderMatchPanel(){
    if(!state.matchWord)return '<section class="match-panel"><div class="match-copy"><span class="review-kicker">LOOK · THINK · MATCH</span><h2>Picture match</h2><p>Use a small visual clue to connect an everyday Finnish word with its meaning.</p><button class="button-secondary" data-match="start">Start a picture match <span>✳</span></button></div><div class="match-picture match-picture-empty" role="img" aria-label="Finnish nature and everyday life"><span>🌲</span><span>❄️</span><span>🚋</span></div></section>';
    const word=state.matchWord;
    const scene=sceneForLesson(findLesson(word.lessonId));
    const answered=state.matchChoice!==null;
    const correct=state.matchChoice===word.fi;
    const options=state.matchOptions.map(option=>{
      const right=answered&&option.fi===word.fi;
      const wrong=answered&&option.fi===state.matchChoice&&!correct;
      return '<button class="quiz-option '+(right?"correct":"")+' '+(wrong?"incorrect":"")+'" data-match-choice="'+escapeHTML(option.fi)+'" '+(answered?"disabled":"")+'>'+escapeHTML(option.fi)+'</button>';
    }).join("");
    const feedback=answered
      ? '<div class="match-feedback '+(correct?"":"wrong")+'">'+(correct?"That’s it!":"Good try. The picture matches")+' <strong>'+escapeHTML(word.fi)+'</strong> — '+escapeHTML(word.en)+' · '+escapeHTML(word.bn)+'</div><button class="link-button" data-match="next">Next picture →</button>'
      : '';
    return '<section class="match-panel"><div class="match-copy"><span class="review-kicker">LOOK · THINK · MATCH</span><h2>Which Finnish word fits?</h2><p>Look at the picture, say each option aloud, then choose the word that matches it.</p><div class="match-options">'+options+'</div>'+feedback+'</div><div class="match-picture" role="img" aria-label="'+escapeHTML(scene.label)+' with a visual clue" style="--scene-image:url(\''+scene.image+'\')"><span>'+pictureForWord(word)+'</span><small>'+escapeHTML(scene.label)+'</small></div></section>';
  }
  function renderPractice(){
    const query=state.search.trim().toLowerCase();
    const allWords=words();
    const filtered=allWords.filter(word=>(word.fi+" "+word.en+" "+word.bn).toLowerCase().includes(query));
    const due=dueReviewWords();
    const reviewMarkup=renderReviewPanel(due);
    const matchMarkup=renderMatchPanel();
    const wordTitle=query?filtered.length+" matching words":"Words from your course";
    const wordCards=filtered.map(word=>`<article class="vocab-card"><div class="vocab-top"><h3>${escapeHTML(word.fi)}</h3><button class="icon-button" data-speak="${escapeHTML(word.fi)}" aria-label="Listen to ${escapeHTML(word.fi)}">▶</button></div><p class="vocab-translation">${escapeHTML(word.en)} <span class="bn-text">· ${escapeHTML(word.bn)}</span></p><div class="vocab-source"><span>${escapeHTML(word.level)} · ${escapeHTML(word.lessonTitle)}</span><button class="known-button ${(state.known.has(word.fi)?"known":"")}" data-known="${escapeHTML(word.fi)}">${(state.known.has(word.fi)?"✓ In review":"+ Add to review")}</button></div></article>`).join("");
    pageContent.innerHTML=`<div class="page-title-row"><div><div class="page-kicker">Keep the words close</div><h1>Practice & review</h1><p>Say each word, connect it with a useful sentence, and mark words you want to revisit.</p></div><button class="button-secondary" data-open-lesson="${escapeHTML(getNextLesson().id)}">Continue a lesson <span>→</span></button></div>
      <div class="practice-banner"><div><h2>Your personal word shelf</h2><p>${state.known.size} words marked for review · ${allWords.length} words across the full learning path</p></div><div class="practice-tools"><label class="search-box"><span>⌕</span><input id="word-search" type="search" value="${escapeHTML(state.search)}" placeholder="Find a Finnish word" aria-label="Find a Finnish word"/></label><button class="button-primary" data-open-lesson="${escapeHTML((lessons[Math.floor(Math.random()*lessons.length)]||lessons[0]).id)}">Quick lesson <span>✳</span></button></div></div>
      ${reviewMarkup}${matchMarkup}
      <div class="section-head"><div><h2>${wordTitle}</h2><p>Audio uses the Finnish voice available in your browser.</p></div></div><div class="vocab-grid">${(wordCards.length?wordCards:"<div class=\"vocab-empty\">No matching words yet. Try another search.</div>")}</div>`;
  }
  function renderCulture(){
    const media=window.KIELO_MEDIA||[];
    pageContent.innerHTML=`<div class="page-title-row"><div><div class="page-kicker">Words live in places</div><h1>Finland & media</h1><p>Learn Finnish through the light, weather, journeys, and everyday traditions that shape life across Finland.</p></div></div>
      <section class="culture-hero"><div class="culture-hero-copy"><div class="hero-kicker"><span class="kielo-dot">✿</span> A living classroom</div><h2>Every season gives you something new to say.</h2><p>Finland stretches from the southern coast to Lapland. The days, weather, and daily rhythms change with the seasons—so the language scenes change too.</p><button class="button-primary" data-open-lesson="weather-seasons">Learn a weather phrase <span>→</span></button></div><img src="${photo.twilight}" alt="A deep blue northern twilight sky"/></section>
      <section class="section-block"><div class="section-head"><div><h2>Four seasons, four small word worlds</h2><p>Choose a picture, say the Finnish word, and listen to it once more.</p></div></div><div class="season-grid"><article class="season-card"><div class="season-image"><img src="${photo.winter}" alt="Snow-covered forest in northern Finland"/><span class="season-word">talvi</span></div><div class="season-copy"><h3>Winter · talvi</h3><p>lumi (snow), metsä (forest), pakkasta (frost)</p></div></article><article class="season-card"><div class="season-image"><img src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=720&q=82" alt="Fresh leaves in spring light"/><span class="season-word">kevät</span></div><div class="season-copy"><h3>Spring · kevät</h3><p>kukka (flower), lämmin (warm), kasvaa (to grow)</p></div></article><article class="season-card"><div class="season-image"><img src="${photo.summer}" alt="A pine-lined lake in summer"/><span class="season-word">kesä</span></div><div class="season-copy"><h3>Summer · kesä</h3><p>järvi (lake), mökki (cottage), aurinko (sun)</p></div></article><article class="season-card"><div class="season-image"><img src="${photo.city}" alt="A city street in autumn light"/><span class="season-word">syksy</span></div><div class="season-copy"><h3>Autumn · syksy</h3><p>sade (rain), lehti (leaf), viileä (cool)</p></div></article></div></section>
      <section class="section-block"><div class="section-head"><div><h2>Watch real Finnish, one short clip at a time</h2><p>These official Yle learning pages include short video lessons and visual prompts.</p></div><a class="link-button" href="https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet" target="_blank" rel="noreferrer">Browse all beginner videos ↗</a></div><div class="media-grid">${media.map(item=>`<a class="media-card" href="${escapeHTML(item.url)}" target="_blank" rel="noreferrer"><div class="media-image"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}"/><span class="play-badge">▶</span></div><div class="media-copy"><span class="media-level">${escapeHTML(item.level)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.subtitle)}</p><div class="media-foot"><span>${escapeHTML(item.source)}</span><strong>${escapeHTML(item.tag)} ↗</strong></div></div></a>`).join("")}</div></section>
      <section class="section-block"><div class="section-head"><div><h2>Why the course follows these levels</h2><p>Practice goals reflect real communication tasks at each stage.</p></div></div><div class="sources-note"><strong>Grounded in Finnish learning resources.</strong> OPH maps YKI grades 1–6 to CEFR A1–C2 and assesses four skills separately. Yle provides beginner videos, self-study activities, and simplified news. Kielo uses those as learning references and opens the original media at Yle. <a href="https://www.oph.fi/en/education-and-qualifications/selecting-right-yki-test-test-days" target="_blank" rel="noreferrer">Read about YKI ↗</a> · <a href="https://yle.fi/a/20-10002426" target="_blank" rel="noreferrer">Explore Yle study materials ↗</a></div></section>`;
  }
  function openLesson(id){state.lesson=findLesson(id);state.step=0;state.quizChoice=null;state.quizDone=false;renderLessonModal();modalBackdrop.hidden=false;document.body.style.overflow="hidden";document.querySelector(".close-modal")?.focus()}
  function closeLesson(){modalBackdrop.hidden=true;document.body.style.overflow="";state.lesson=null;render()}
  function renderLessonModal(){
    const lesson=state.lesson;if(!lesson)return;
    const stepNames=["Scene","Words","Pattern","Try it"];
    const complete=state.completed.has(lesson.id);
    const header=`<header class="modal-top"><div><span class="modal-level">${escapeHTML(lesson.levelLabel)} · ${escapeHTML(lesson.focus)}</span><h2 id="lesson-title">${escapeHTML(lesson.title)}</h2></div><button class="close-modal" data-close-modal aria-label="Close lesson">×</button></header><div class="lesson-progress">${stepNames.map((_,index)=>`<span class="${index<=state.step?"active":""}"></span>`).join("")}</div>`;
    if(state.step>3){modalContent.innerHTML=header+`<div class="completion-view"><div class="completion-mark">✓</div><h3>${complete?"Lesson complete!":"A strong little step."}</h3><p>You practised reading, listening, speaking, and writing. Your progress is saved in this browser.</p><button class="button-primary" data-close-modal>Back to learning <span>→</span></button></div>`;return}
    let body="";
    if(state.step===0){const scene=sceneForLesson(lesson);body=`<div class="lesson-scene" style="--scene-image:url('${scene.image}')"><div class="lesson-scene-label"><small>PICTURE THE SCENE · ${escapeHTML(scene.label.toUpperCase())}</small><strong>${escapeHTML(lesson.scene)}</strong></div></div><div class="lesson-phrase-card"><div><div class="fi-phrase">${escapeHTML(lesson.phrase)}</div><div class="translation">${escapeHTML(helpText(lesson))}</div></div><button class="audio-button" data-speak="${escapeHTML(lesson.phrase)}" aria-label="Listen to the Finnish sentence">▶</button></div><div class="lesson-hint">Read the Finnish first. Then use the speaker to hear it slowly. Say the sentence once before you move on.</div>`}
    else if(state.step===1)body=`<h3 class="lesson-subtitle">Three useful words from this scene</h3><div class="word-list">${lesson.words.map(word=>`<div class="lesson-word"><div class="lesson-word-top"><strong>${escapeHTML(word[0])}</strong><button class="icon-button" data-speak="${escapeHTML(word[0])}" aria-label="Listen to ${escapeHTML(word[0])}">▶</button></div><p>${escapeHTML(word[1])}</p><small>${escapeHTML(word[2])}</small></div>`).join("")}</div><div class="lesson-hint">Tap any speaker. Listen for clear vowel sounds, including the dots in ä and ö.</div>`;
    else if(state.step===2)body=`<h3 class="lesson-subtitle">One pattern to take with you</h3><div class="lesson-pattern"><p>${escapeHTML(grammarText(lesson))}</p></div><div class="lesson-hint"><strong>Learning tip:</strong> Keep this whole phrase as a chunk. Grammar gets easier when you notice a pattern inside something you can already say.</div>`;
    else body=`<h3 class="lesson-subtitle">Use it in your own words</h3><div class="try-grid"><div class="try-panel"><h4>Write a little</h4><p>${escapeHTML(lesson.say)}</p><textarea id="lesson-draft" placeholder="Write a short Finnish phrase or sentence...">${escapeHTML(state.drafts[lesson.id]||"")}</textarea><div class="saved-draft" id="draft-status">Saved on this device</div></div><div class="try-panel"><h4>Say it out loud</h4><p>Listen once, then repeat at your own pace.</p><button class="button-secondary" data-speak="${escapeHTML(lesson.phrase)}">▶ &nbsp; Hear the Finnish</button><p style="margin-top:9px">No score—just a chance to find your own Finnish voice.</p></div><div class="quiz-card"><p class="quiz-question">${escapeHTML(questionText(lesson))}</p><div class="quiz-options">${lesson.choices.map(choice=>`<button class="quiz-option ${state.quizDone&&choice===lesson.answer?"correct":""} ${state.quizDone&&choice===state.quizChoice&&choice!==lesson.answer?"incorrect":""}" data-choice="${escapeHTML(choice)}">${escapeHTML(choice)}</button>`).join("")}</div><div class="quiz-feedback ${state.quizDone&&state.quizChoice!==lesson.answer?"wrong":""}">${state.quizDone?escapeHTML((state.quizChoice===lesson.answer?"That's right. ":"Take another look. ")+whyText(lesson)):"Choose an answer to check your understanding."}</div></div></div>`;
    const back=state.step===0?`<button class="button-quiet" data-close-modal>Save for later</button>`:`<button class="button-secondary" data-step="${state.step-1}">← Back</button>`;
    const next=state.step<3?`<button class="button-primary" data-step="${state.step+1}">Next step <span>→</span></button>`:`<button class="button-primary" data-complete-lesson="${escapeHTML(lesson.id)}">${complete?"Done for today":"Complete lesson"} <span>✓</span></button>`;
    modalContent.innerHTML=header+`<div class="lesson-body">${body}</div><footer class="modal-footer"><span class="step-label">${stepNames[state.step]} · ${state.step+1} of 4</span><div class="modal-actions">${back}${next}</div></footer>`;
  }
  function completeLesson(id){state.completed.add(id);persist();state.step=4;renderLessonModal();showToast("Lesson saved to your learning path")}
  function speak(text){if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){showToast("Audio playback is not available in this browser.");return}window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang="fi-FI";utterance.rate=.78;const voices=window.speechSynthesis.getVoices();const finnish=voices.find(voice=>voice.lang.toLowerCase().startsWith("fi"));if(finnish)utterance.voice=finnish;window.speechSynthesis.speak(utterance)}
  function handleClick(event){
    const pageButton=event.target.closest("[data-page]");if(pageButton){setPage(pageButton.dataset.page);return}
    const levelButton=event.target.closest("[data-level]");if(levelButton){state.filter=levelButton.dataset.level;setPage("path");return}
    const filterButton=event.target.closest("[data-filter]");if(filterButton){state.filter=filterButton.dataset.filter;renderPath();return}
    const openButton=event.target.closest("[data-open-lesson]");if(openButton){openLesson(openButton.dataset.openLesson);return}
    const speakButton=event.target.closest("[data-speak]");if(speakButton){speak(speakButton.dataset.speak);return}
    const knownButton=event.target.closest("[data-known]");if(knownButton){const word=knownButton.dataset.known;if(state.known.has(word)){state.known.delete(word);delete state.reviewSchedule[word]}else{state.known.add(word);state.reviewSchedule[word]={box:0,due:Date.now()}}persist();renderPractice();return}
    const reviewButton=event.target.closest("[data-review]");if(reviewButton){const action=reviewButton.dataset.review;if(action==="start")startReview();else if(action==="reveal"){state.reviewRevealed=true;renderPractice()}else if(action==="again"||action==="got-it")answerReview(action);else if(action==="finish"){state.reviewActive=false;state.reviewQueue=[];state.reviewRevealed=false;renderPractice()}return}
    const matchButton=event.target.closest("[data-match]");if(matchButton){if(matchButton.dataset.match==="start"||matchButton.dataset.match==="next")startPictureMatch();return}
    const matchChoice=event.target.closest("[data-match-choice]");if(matchChoice){state.matchChoice=matchChoice.dataset.matchChoice;renderPractice();return}
    const closeButton=event.target.closest("[data-close-modal]");if(closeButton){closeLesson();return}
    const stepButton=event.target.closest("[data-step]");if(stepButton){state.step=Number(stepButton.dataset.step);state.quizChoice=null;state.quizDone=false;renderLessonModal();return}
    const choiceButton=event.target.closest("[data-choice]");if(choiceButton){state.quizChoice=choiceButton.dataset.choice;state.quizDone=true;renderLessonModal();return}
    const completeButton=event.target.closest("[data-complete-lesson]");if(completeButton){completeLesson(completeButton.dataset.completeLesson);return}
    if(event.target===modalBackdrop)closeLesson();
  }
  document.addEventListener("click",handleClick);
  document.getElementById("language-toggle").addEventListener("click",()=>{state.help=state.help==="bn"?"en":"bn";persist();render();if(state.lesson)renderLessonModal()});
  document.getElementById("mobile-menu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
  document.addEventListener("input",event=>{if(event.target.id==="word-search"){state.search=event.target.value;const caret=event.target.selectionStart;renderPractice();const input=document.getElementById("word-search");input.focus();input.setSelectionRange(caret,caret)}if(event.target.id==="lesson-draft"&&state.lesson){state.drafts[state.lesson.id]=event.target.value;persist();const status=document.getElementById("draft-status");if(status)status.textContent="Saved on this device"}});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!modalBackdrop.hidden)closeLesson()});
  render();
})();
