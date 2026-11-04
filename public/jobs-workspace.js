(() => {
  'use strict';

  const storageKey = 'kielo-find-work-application-workspaces-v2';
  const legacyKey = 'kielo-find-work-application-workspace-v1';
  const uiLanguage = document.getElementById('ui-language');
  const form = document.getElementById('application-form');
  if (!form) return;

  const words = {
    en: {
      workspaceKicker:'YOUR NEXT APPLICATION',workspaceTitle:'One clear workspace for each job.',workspaceIntro:'Keep the real advert, your next steps and an editable letter draft together as you apply.',privateLabel:'Private · saved on this device',applicationKicker:'SELECTED APPLICATION',applicationTitle:'Choose an application or start a new one.',applicationIntro:'Open one of your saved jobs to continue its checklist and letter.',
      roleLabel:'Role or job title',rolePlaceholder:'e.g. Cleaner',employerLabel:'Employer',employerPlaceholder:'Company or organisation',cityLabel:'City or region',cityPlaceholder:'e.g. Helsinki',vacancyLinkLabel:'Original job advert link',vacancyLinkPlaceholder:'Paste the employer’s real advert link',vacancyLinkHint:'Use the exact HTTPS link from the original employer or job board.',statusLabel:'Application status',statusPlanning:'Planning',statusPreparing:'Preparing my application',statusApplied:'Applied',statusInterview:'Interview',statusOffer:'Offer received',statusClosed:'Closed / not continuing',checklistTitle:'My application checklist',stepRead:'Read the full advert and note the deadline.',stepLanguage:'Check the working language and qualifications.',stepEligibility:'Confirm the requirements that apply to me.',stepDocuments:'Tailor my CV and letter to this role.',stepFollowup:'Record when I applied and when to follow up.',progressCount:'{done} of {total} complete',applicationProgress:'Checklist {done} of {total}',saveApplication:'Save application',draftSaved:'Changes save on this device.',
      letterKicker:'CV & APPLICATION LETTER',letterTitle:'Prepare a clear first draft.',letterIntro:'Start with a sample, then make every detail true to your experience and the advert.',letterLanguageLabel:'Letter language',yourNameLabel:'Your name',namePlaceholder:'Your name',letterDraftLabel:'Editable application letter draft',letterPlaceholder:'Choose Insert sample to create a starting draft.',insertSample:'Insert sample',copyDraft:'Copy draft',openCv:'Open CV builder',letterSaved:'Your draft is saved only in this browser.',phraseKicker:'FINNISH FOR WORK',phraseMeaning:'Could I tell you more about my experience?',meansExperience:'means experience.',listenPhrase:'Listen in Finnish',learnWork:'Learn Finnish for work ↗',
      savedKicker:'YOUR APPLICATIONS',savedTitle:'My applications',newApplication:'Start a new application',filterApplications:'Search your saved applications',filterPlaceholder:'Find one of your saved jobs…',filterEmpty:'No saved application matches that search.',statSaved:'APPLICATIONS SAVED',statActive:'IN PROGRESS',statInterviews:'INTERVIEWS',
      savedDraft:'Draft saved on this device. Add the original HTTPS job link to include it in your application list.',savedTracker:'Application saved. You can reopen it from My applications.',invalidUrl:'Paste the original job advert link, beginning with https://.',missingRole:'Add a job title before saving this application.',copied:'Draft copied. Personalize it for the exact advert before sending.',copyFailed:'Select and copy the draft. Personalize it before sending.',sampleInserted:'Sample inserted. Replace the bracketed details with your own experience.',saveFailed:'This browser could not save your changes.',confirmNew:'Start a blank application? Your current unsaved draft will be replaced.',
      letterPlaceholderText:'Choose Insert sample to create a starting draft.',statusNew:'New application',letterNameFallback:'[your name]',letterRoleFallback:'[job title]',letterEmployerFallback:'[employer]'
    },
    fi: {
      workspaceKicker:'SEURAAVA TYÖHAKEMUKSESI',workspaceTitle:'Selkeä työtila jokaista työpaikkaa varten.',workspaceIntro:'Pidä alkuperäinen ilmoitus, seuraavat tehtävät ja muokattava hakemuskirje samassa paikassa.',privateLabel:'Yksityinen · tallennetaan tälle laitteelle',applicationKicker:'VALITTU TYÖHAKEMUS',applicationTitle:'Valitse hakemus tai aloita uusi.',applicationIntro:'Avaa tallennettu työpaikka jatkaaksesi muistilistaa ja hakemuskirjettä.',
      roleLabel:'Tehtävä tai ammattinimike',rolePlaceholder:'esim. siivooja',employerLabel:'Työnantaja',employerPlaceholder:'Yritys tai organisaatio',cityLabel:'Kaupunki tai alue',cityPlaceholder:'esim. Helsinki',vacancyLinkLabel:'Alkuperäisen työpaikkailmoituksen linkki',vacancyLinkPlaceholder:'Liitä työnantajan alkuperäinen ilmoituslinkki',vacancyLinkHint:'Käytä alkuperäisen työnantajan tai työnhakusivuston HTTPS-linkkiä.',statusLabel:'Hakemuksen tila',statusPlanning:'Suunnitteilla',statusPreparing:'Valmistelen hakemusta',statusApplied:'Haettu',statusInterview:'Haastattelu',statusOffer:'Työtarjous saatu',statusClosed:'Suljettu / ei aktiivinen',checklistTitle:'Työhakemuksen muistilista',stepRead:'Lue koko ilmoitus ja merkitse määräaika.',stepLanguage:'Tarkista työkieli ja tutkintovaatimukset.',stepEligibility:'Varmista itseäsi koskevat vaatimukset.',stepDocuments:'Muokkaa CV ja hakemuskirje tähän tehtävään.',stepFollowup:'Kirjaa hakupäivä ja yhteydenoton ajankohta.',progressCount:'{done}/{total} tehtävää valmiina',applicationProgress:'Muistilista {done}/{total}',saveApplication:'Tallenna hakemus',draftSaved:'Muutokset tallentuvat tälle laitteelle.',
      letterKicker:'CV JA HAKEMUSKIRJE',letterTitle:'Valmistele selkeä ensimmäinen luonnos.',letterIntro:'Aloita mallista ja muuta tiedot vastaamaan kokemustasi sekä työpaikkailmoitusta.',letterLanguageLabel:'Kirjeen kieli',yourNameLabel:'Nimesi',namePlaceholder:'Nimesi',letterDraftLabel:'Muokattava työhakemuskirjeen luonnos',letterPlaceholder:'Luo aloitusluonnos valitsemalla Lisää malliteksti.',insertSample:'Lisää malliteksti',copyDraft:'Kopioi luonnos',openCv:'Avaa CV-työkalu',letterSaved:'Luonnos tallentuu vain tähän selaimeen.',phraseKicker:'SUOMEA TYÖELÄMÄÄN',phraseMeaning:'Voisinko kertoa lisää kokemuksestani?',meansExperience:'tarkoittaa kokemusta.',listenPhrase:'Kuuntele suomeksi',learnWork:'Opiskele suomea työelämään ↗',
      savedKicker:'TYÖHAKEMUKSESI',savedTitle:'Omat hakemukset',newApplication:'Aloita uusi hakemus',filterApplications:'Hae tallennetuista hakemuksista',filterPlaceholder:'Etsi tallennettua työpaikkaa…',filterEmpty:'Hakua vastaavaa tallennettua hakemusta ei löytynyt.',statSaved:'TALLENNETUT HAKEMUKSET',statActive:'KÄSITTELYSSÄ',statInterviews:'HAASTATTELUT',
      savedDraft:'Luonnos tallennettu tälle laitteelle. Lisää alkuperäisen työpaikkailmoituksen HTTPS-linkki hakemusluetteloon tallentamista varten.',savedTracker:'Hakemus tallennettu. Voit avata sen uudelleen hakemusluettelosta.',invalidUrl:'Liitä alkuperäisen työpaikkailmoituksen linkki, joka alkaa https://.',missingRole:'Lisää tehtävän nimi ennen hakemuksen tallentamista.',copied:'Luonnos kopioitu. Muokkaa se ilmoitusta vastaavaksi ennen lähettämistä.',copyFailed:'Valitse luonnos ja kopioi se. Muokkaa sitä ennen lähettämistä.',sampleInserted:'Malliteksti lisätty. Korvaa hakasulkeissa olevat tiedot omalla kokemuksellasi.',saveFailed:'Selain ei voinut tallentaa muutoksia.',confirmNew:'Aloitetaanko tyhjä hakemus? Nykyinen tallentamaton luonnos korvataan.',
      letterPlaceholderText:'Luo aloitusluonnos valitsemalla Lisää malliteksti.',statusNew:'Uusi hakemus',letterNameFallback:'[oma nimi]',letterRoleFallback:'[tehtävän nimi]',letterEmployerFallback:'[työnantaja]'
    }
  };

  const fields = {
    role:document.getElementById('application-role'),
    employer:document.getElementById('application-employer'),
    city:document.getElementById('application-city'),
    url:document.getElementById('application-url'),
    status:document.getElementById('application-status')
  };
  const checks = [...document.querySelectorAll('[data-application-step]')];
  const count = document.getElementById('application-count');
  const progress = document.getElementById('application-progress');
  const progressBar = progress?.parentElement;
  const saveNote = document.getElementById('application-save-note');
  const stateLabel = document.getElementById('application-state');
  const titleLabel = document.getElementById('active-application-title');
  const letterLanguage = document.getElementById('letter-language');
  const letterName = document.getElementById('letter-name');
  const letterDraft = document.getElementById('letter-draft');
  const letterNote = document.getElementById('letter-note');
  const locale = () => uiLanguage?.value === 'fi' ? 'fi' : 'en';
  const copy = key => words[locale()][key] || words.en[key] || '';
  const parse = value => { try { const data=JSON.parse(value||'{}'); return data&&typeof data==='object'?data:{}; } catch { return {}; } };
  const readState = () => parse(localStorage.getItem(storageKey));
  const normalizeStatus = value => ({saved:'planning',applied:'applied',interview:'interview',offer:'offer',closed:'closed'})[value] || (['planning','preparing','applied','interview','offer','closed'].includes(value) ? value : 'planning');
  let state = readState();
  let activeId = state.activeJobId || null;
  let loading = false;
  let syncTimer = 0;

  function migrate() {
    if (state.version === 2 && state.drafts) return;
    state = {version:2,activeJobId:null,drafts:{}};
    const old = parse(localStorage.getItem(legacyKey));
    if (old.fields || old.steps || old.letter) {
      state.drafts.new = {
        fields:{role:old.fields?.role||'',employer:old.fields?.employer||'',city:old.fields?.city||'',url:old.fields?.url||'',status:normalizeStatus(old.fields?.status)},
        steps:old.steps||{},letter:old.letter||{language:'en',name:'',draft:''}
      };
    }
    try { localStorage.setItem(storageKey,JSON.stringify(state)); } catch {}
  }
  migrate();

  function setMessage(node,key) { if (node) node.textContent=copy(key); }
  function currentKey() { return activeId || 'new'; }
  function recordJob(id) {
    if (!id) return null;
    const request={id,job:null};
    document.dispatchEvent(new CustomEvent('kielo:get-application',{detail:request}));
    return request.job;
  }
  function appData() {
    return {steps:Object.fromEntries(checks.map(box=>[box.dataset.applicationStep,box.checked])),letter:{language:letterLanguage.value,name:letterName.value.trim(),draft:letterDraft.value}};
  }
  function snapshot() {
    return {fields:Object.fromEntries(Object.entries(fields).map(([key,field])=>[key,field.value.trim()])),...appData()};
  }
  function saveLocal() {
    state.version=2; state.activeJobId=activeId; state.drafts=state.drafts||{}; state.drafts[currentKey()]=snapshot();
    try { localStorage.setItem(storageKey,JSON.stringify(state)); return true; }
    catch { setMessage(saveNote,'saveFailed'); return false; }
  }
  function scheduleRecordSync() {
    if (!activeId || loading) return;
    window.clearTimeout(syncTimer);
    syncTimer=window.setTimeout(syncRecord,350);
  }
  function syncRecord() {
    window.clearTimeout(syncTimer);
    if (!activeId || loading) return;
    const url=fields.url.value.trim();
    const payload={id:activeId,title:fields.role.value.trim(),employer:fields.employer.value.trim(),city:fields.city.value.trim(),status:fields.status.value,application:appData()};
    try { const parsed=new URL(url); if(parsed.protocol==='https:')payload.url=parsed.href; } catch {}
    document.dispatchEvent(new CustomEvent('kielo:update-application',{detail:payload}));
    markSelected();
  }
  function renderProgress() {
    const done=checks.filter(box=>box.checked).length;
    if(count)count.textContent=copy('progressCount').replace('{done}',done).replace('{total}',checks.length);
    if(progress)progress.style.width=`${checks.length?Math.round(done/checks.length*100):0}%`;
    progressBar?.setAttribute('aria-valuenow',String(done));
    progressBar?.setAttribute('aria-label',locale()==='fi'?'Työhakemuksen muistilistan edistyminen':'Application checklist progress');
  }
  function renderTitle() {
    if(!titleLabel)return;
    const title=fields.role.value.trim();
    titleLabel.textContent=title||(activeId?copy('applicationTitle'):copy('statusNew'));
  }
  function renderState() {
    if(!stateLabel)return;
    const map={planning:'statusPlanning',preparing:'statusPreparing',applied:'statusApplied',interview:'statusInterview',offer:'statusOffer',closed:'statusClosed'};
    stateLabel.textContent=copy(map[fields.status.value]||'statusPlanning');
  }
  function markSelected() {
    document.querySelectorAll('.tracked-job[data-application-id]').forEach(card=>{
      const selected=card.dataset.applicationId===activeId;
      card.classList.toggle('is-current',selected);
      card.querySelector('.tracked-job-edit')?.setAttribute('aria-pressed',String(selected));
    });
  }
  function applyData(data={}) {
    loading=true;
    const f=data.fields||{};
    Object.entries(fields).forEach(([key,field])=>{field.value=typeof f[key]==='string'?f[key]:'';});
    fields.status.value=normalizeStatus(f.status||'planning');
    checks.forEach(box=>box.checked=data.steps?.[box.dataset.applicationStep]===true);
    const letter=data.letter||{};
    letterLanguage.value=['en','fi'].includes(letter.language)?letter.language:'en';
    letterName.value=typeof letter.name==='string'?letter.name:'';
    letterDraft.value=typeof letter.draft==='string'?letter.draft:'';
    letterDraft.lang=letterLanguage.value;
    loading=false;
    renderProgress();renderState();renderTitle();markSelected();
  }
  function selectJob(job) {
    syncRecord();
    if(!job)return;
    activeId=job.id;
    state.activeJobId=activeId;
    const local=state.drafts?.[activeId];
    const data=local||{fields:{role:job.title||'',employer:job.employer||'',city:job.city||'',url:job.url||'',status:normalizeStatus(job.status)},steps:job.application?.steps||{},letter:job.application?.letter||{language:'en',name:'',draft:''}};
    applyData(data);saveLocal();
    const panel=document.getElementById('application-workspace');
    if(window.matchMedia('(max-width: 760px)').matches)panel?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function newApplication(restore=false) {
    if(!restore && !activeId && (fields.role.value||fields.employer.value||fields.url.value||letterDraft.value) && !window.confirm(copy('confirmNew')))return;
    syncRecord();
    activeId=null;
    state.activeJobId=null;
    if(restore && state.drafts?.new)applyData(state.drafts.new);
    else applyData({fields:{status:'planning'},steps:{},letter:{language:locale(),name:'',draft:''}});
    saveLocal();markSelected();
    if(window.matchMedia('(max-width: 760px)').matches)document.getElementById('application-workspace')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function localize() {
    document.querySelectorAll('[data-ws]').forEach(node=>{node.textContent=copy(node.dataset.ws);});
    document.querySelectorAll('[data-ws-placeholder]').forEach(node=>{node.placeholder=copy(node.dataset.wsPlaceholder);});
    document.documentElement.lang=locale();
    letterDraft.lang=letterLanguage.value;
    renderProgress();renderState();renderTitle();markSelected();
  }
  function letterTemplate() {
    const name=letterName.value.trim()||copy('letterNameFallback');
    const role=fields.role.value.trim()||copy('letterRoleFallback');
    const employer=fields.employer.value.trim()||copy('letterEmployerFallback');
    if(letterLanguage.value==='fi')return `Hei ${employer},\n\nHaen tehtävää ${role}. Aiempi kokemukseni [olennainen kokemus] parissa on kehittänyt [osaaminen]. Keskustelen mielelläni lisää osaamisestani haastattelussa.\n\nYstävällisin terveisin,\n${name}`;
    return `Dear Hiring Team at ${employer},\n\nI am applying for the ${role} position. My experience in [relevant experience] has helped me develop [relevant skills]. I would welcome the opportunity to contribute to your team and tell you more in an interview.\n\nKind regards,\n${name}`;
  }

  Object.entries(fields).forEach(([key,field])=>field.addEventListener('input',()=>{if(loading)return;field.setCustomValidity('');saveLocal();scheduleRecordSync();renderState();renderTitle();}));
  fields.status.addEventListener('change',()=>{if(loading)return;saveLocal();scheduleRecordSync();renderState();});
  checks.forEach(box=>box.addEventListener('change',()=>{saveLocal();scheduleRecordSync();renderProgress();}));
  [letterName,letterDraft].forEach(field=>field.addEventListener('input',()=>{saveLocal();scheduleRecordSync();}));
  letterLanguage.addEventListener('change',()=>{letterDraft.lang=letterLanguage.value;saveLocal();scheduleRecordSync();});

  form.addEventListener('submit',event=>{
    event.preventDefault();saveLocal();
    const raw=fields.url.value.trim();
    if(!raw&&!activeId){setMessage(saveNote,'savedDraft');return;}
    let url;try{url=new URL(raw);}catch{url=null;}
    if(!url||url.protocol!=='https:'){fields.url.setCustomValidity(copy('invalidUrl'));fields.url.reportValidity();setMessage(saveNote,'invalidUrl');return;}
    fields.url.setCustomValidity('');
    if(!fields.role.value.trim()){fields.role.setCustomValidity(copy('missingRole'));fields.role.reportValidity();setMessage(saveNote,'missingRole');return;}
    fields.role.setCustomValidity('');
    syncRecord();
    const payload={id:activeId,title:fields.role.value.trim(),employer:fields.employer.value.trim(),city:fields.city.value.trim(),url:url.href,status:fields.status.value,application:appData()};
    document.dispatchEvent(new CustomEvent('kielo:save-application',{detail:payload}));
    if(payload.error){setMessage(saveNote,payload.error==='url'?'invalidUrl':payload.error==='title'?'missingRole':'saveFailed');return;}
    activeId=payload.jobId||activeId;
    if(activeId){state.activeJobId=activeId;saveLocal();selectJob(recordJob(activeId));}
    setMessage(saveNote,'savedTracker');
  });

  document.getElementById('new-application-button')?.addEventListener('click',()=>newApplication(false));
  document.getElementById('tracker-filter')?.addEventListener('input',event=>{
    const query=event.target.value.trim().toLocaleLowerCase();
    const cards=[...document.querySelectorAll('.tracked-job[data-application-id]')];
    let visible=0;cards.forEach(card=>{const match=!query||card.innerText.toLocaleLowerCase().includes(query);card.hidden=!match;if(match)visible++;});
    const empty=document.getElementById('tracker-filter-empty');
    if(empty)empty.hidden=!query||visible>0||cards.length===0;
  });
  document.addEventListener('kielo:edit-application',event=>{const job=recordJob(event.detail?.id);if(job)selectJob(job);});
  document.addEventListener('kielo:application-status-changed',event=>{
    if(event.detail?.id!==activeId)return;
    const map={saved:'planning',applied:'applied',interview:'interview',offer:'offer',closed:'closed'};
    fields.status.value=map[event.detail.status]||fields.status.value;saveLocal();renderState();markSelected();
  });
  document.addEventListener('kielo:application-removed',event=>{if(event.detail?.id===activeId)newApplication(true);});
  document.addEventListener('kielo:application-removed',event=>{
    const removedId=event.detail?.id;
    if(!removedId)return;
    delete state.drafts?.[removedId];
    saveLocal();
  });
  document.addEventListener('kielo:before-export',()=>{syncRecord();saveLocal();});
  window.addEventListener('pagehide',()=>{syncRecord();saveLocal();});
  document.addEventListener('kielo:applications-replaced',()=>{
    const remembered=state.activeJobId?recordJob(state.activeJobId):null;
    const first=document.querySelector('.tracked-job[data-application-id]');
    const next=remembered|| (first?recordJob(first.dataset.applicationId):null);
    if(next)selectJob(next);else newApplication(true);
  });

  document.getElementById('letter-template')?.addEventListener('click',()=>{letterDraft.value=letterTemplate();saveLocal();scheduleRecordSync();setMessage(letterNote,'sampleInserted');letterDraft.focus();});
  document.getElementById('letter-copy')?.addEventListener('click',async()=>{
    if(!letterDraft.value.trim()){setMessage(letterNote,'letterPlaceholderText');return;}
    try{await navigator.clipboard.writeText(letterDraft.value);setMessage(letterNote,'copied');}
    catch{letterDraft.focus();letterDraft.select();setMessage(letterNote,'copyFailed');}
  });
  document.getElementById('listen-phrase')?.addEventListener('click',()=>{
    if(!('speechSynthesis'in window))return;
    window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance('Voisinko kertoa lisää kokemuksestani?');utterance.lang='fi-FI';utterance.rate=.9;window.speechSynthesis.speak(utterance);
  });
  uiLanguage?.addEventListener('change',localize);

  localize();
  const remembered=state.activeJobId?recordJob(state.activeJobId):null;
  if(remembered)selectJob(remembered);
  else {
    const first=document.querySelector('.tracked-job[data-application-id]');
    const firstJob=first?recordJob(first.dataset.applicationId):null;
    if(firstJob)selectJob(firstJob);else newApplication(true);
  }
})();
