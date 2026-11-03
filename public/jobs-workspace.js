(() => {
  'use strict';

  const storageKey = 'kielo-find-work-application-workspace-v1';
  const uiLanguage = document.getElementById('ui-language');
  const form = document.getElementById('application-form');
  if (!form) return;

  const words = {
    en: {
      workspaceKicker:'YOUR NEXT APPLICATION', workspaceTitle:'One clear workspace for each job.', workspaceIntro:'Keep the real advert, your next steps and an editable letter draft together as you apply.', privateLabel:'Private · saved on this device',
      applicationKicker:'MY APPLICATION', applicationTitle:'Keep your next step clear.', applicationIntro:'Start a draft now. Add the original vacancy link when you find a real opening.', roleLabel:'Role or job title', rolePlaceholder:'e.g. Cleaner', employerLabel:'Employer', employerPlaceholder:'Company or organisation', vacancyLinkLabel:'Original job advert link', vacancyLinkPlaceholder:'Paste the employer’s real advert link', vacancyLinkHint:'Use the exact HTTPS link from the original employer or job board.', statusLabel:'Application status', statusPlanning:'Planning', statusPreparing:'Preparing my application', statusApplied:'Applied', statusInterview:'Interview', statusOffer:'Offer received', checklistTitle:'My application checklist', stepRead:'Read the full advert and note the deadline.', stepLanguage:'Check the working language and qualifications.', stepEligibility:'Confirm the requirements that apply to me.', stepDocuments:'Tailor my CV and letter to this role.', stepFollowup:'Record when I applied and when to follow up.', progressCount:'{done} of {total} complete', saveApplication:'Save application', draftSaved:'Changes save on this device.',
      letterKicker:'CV & APPLICATION LETTER', letterTitle:'Prepare a clear first draft.', letterIntro:'Start with a sample, then make every detail true to your experience and the advert.', letterLanguageLabel:'Letter language', yourNameLabel:'Your name', namePlaceholder:'Your name', letterDraftLabel:'Editable application letter draft', letterPlaceholder:'Choose Insert sample to create a starting draft.', insertSample:'Insert sample', copyDraft:'Copy draft', openCv:'Open CV builder', letterSaved:'Your draft is saved only in this browser.',
      phraseKicker:'FINNISH FOR WORK', phraseMeaning:'Could I tell you more about my experience?', meansExperience:'means experience.', listenPhrase:'Listen in Finnish', learnWork:'Learn Finnish for work ↗', savedKicker:'YOUR SAVED APPLICATIONS', savedTitle:'Keep every real job link close.', savedIntro:'Applications with an original vacancy link appear here. You can update their status at any time.',
      savedDraft:'Draft saved on this device. Add the original HTTPS job link to track it in your saved applications.', savedTracker:'Application added to your saved applications below.', invalidUrl:'Paste the original job advert link, beginning with https://.', missingRole:'Add a job title before saving it to your application list.', copied:'Draft copied. Personalize it for the exact advert before sending.', copyFailed:'Select and copy the draft. Personalize it before sending.', sampleInserted:'Sample inserted. Replace the bracketed details with your own experience.', saveFailed:'This browser could not save your changes.', speechUnavailable:'',
      letterGreeting:'Dear Hiring Team at', letterApply:'I am applying for the [job title] position. My experience in [relevant experience] has helped me develop [relevant skills]. I would welcome the opportunity to contribute to your team and tell you more in an interview.', letterClosing:'Kind regards,', fiGreeting:'Hei', fiApply:'Haen [tehtävän nimi] -tehtävää. Aiempi kokemukseni [olennainen kokemus] parissa on kehittänyt [osaaminen]. Keskustelen mielelläni lisää osaamisestani haastattelussa.', fiClosing:'Ystävällisin terveisin,'
    },
    fi: {
      workspaceKicker:'SEURAAVA TYÖHAKEMUKSESI', workspaceTitle:'Selkeä työtila jokaista työpaikkaa varten.', workspaceIntro:'Pidä alkuperäinen ilmoitus, seuraavat tehtävät ja muokattava hakemuskirje samassa paikassa.', privateLabel:'Yksityinen · tallennetaan tälle laitteelle',
      applicationKicker:'TYÖHAKEMUKSENI', applicationTitle:'Pidä seuraava askel selvänä.', applicationIntro:'Aloita luonnos nyt. Lisää alkuperäisen ilmoituksen linkki, kun löydät sopivan paikan.', roleLabel:'Tehtävä tai ammattinimike', rolePlaceholder:'esim. siivooja', employerLabel:'Työnantaja', employerPlaceholder:'Yritys tai organisaatio', vacancyLinkLabel:'Alkuperäisen työpaikkailmoituksen linkki', vacancyLinkPlaceholder:'Liitä työnantajan alkuperäinen ilmoituslinkki', vacancyLinkHint:'Käytä alkuperäisen työnantajan tai työnhakusivuston HTTPS-linkkiä.', statusLabel:'Hakemuksen tila', statusPlanning:'Suunnitteilla', statusPreparing:'Valmistelen hakemusta', statusApplied:'Haettu', statusInterview:'Haastattelu', statusOffer:'Työtarjous saatu', checklistTitle:'Työhakemuksen muistilista', stepRead:'Lue koko ilmoitus ja merkitse määräaika.', stepLanguage:'Tarkista työkieli ja tutkintovaatimukset.', stepEligibility:'Varmista itseäsi koskevat vaatimukset.', stepDocuments:'Muokkaa CV ja hakemuskirje tähän tehtävään.', stepFollowup:'Kirjaa hakupäivä ja yhteydenoton ajankohta.', progressCount:'{done}/{total} tehtävää valmiina', saveApplication:'Tallenna hakemus', draftSaved:'Muutokset tallentuvat tälle laitteelle.',
      letterKicker:'CV JA HAKEMUSKIRJE', letterTitle:'Valmistele selkeä ensimmäinen luonnos.', letterIntro:'Aloita mallista ja muuta tiedot vastaamaan kokemustasi sekä työpaikkailmoitusta.', letterLanguageLabel:'Kirjeen kieli', yourNameLabel:'Nimesi', namePlaceholder:'Nimesi', letterDraftLabel:'Muokattava työhakemuskirjeen luonnos', letterPlaceholder:'Luo aloitusluonnos valitsemalla Lisää malliteksti.', insertSample:'Lisää malliteksti', copyDraft:'Kopioi luonnos', openCv:'Avaa CV-työkalu', letterSaved:'Luonnos tallentuu vain tähän selaimeen.',
      phraseKicker:'SUOMEA TYÖELÄMÄÄN', phraseMeaning:'Voisinko kertoa lisää kokemuksestani?', meansExperience:'tarkoittaa kokemusta.', listenPhrase:'Kuuntele suomeksi', learnWork:'Opiskele suomea työelämään ↗', savedKicker:'TALLENNETUT TYÖHAKEMUKSESI', savedTitle:'Pidä alkuperäiset työpaikkalinkit tallessa.', savedIntro:'Alkuperäisen ilmoituksen linkin sisältävät hakemukset näkyvät tässä. Voit päivittää niiden tilan milloin tahansa.',
      savedDraft:'Luonnos tallennettu tälle laitteelle. Lisää alkuperäisen työpaikkailmoituksen HTTPS-linkki, jotta hakemus näkyy tallennetuissa hakemuksissa.', savedTracker:'Hakemus lisättiin alla oleviin tallennettuihin hakemuksiin.', invalidUrl:'Liitä alkuperäisen työpaikkailmoituksen linkki, joka alkaa https://.', missingRole:'Lisää tehtävän nimi ennen sen tallentamista hakemusluetteloon.', copied:'Luonnos kopioitu. Muokkaa sitä ilmoitusta vastaavaksi ennen lähettämistä.', copyFailed:'Valitse luonnos ja kopioi se. Muokkaa sitä ennen lähettämistä.', sampleInserted:'Malliteksti lisätty. Korvaa hakasulkeissa olevat tiedot omalla kokemuksellasi.', saveFailed:'Selain ei voinut tallentaa muutoksia.', speechUnavailable:'',
      letterGreeting:'Hei', letterApply:'Haen [tehtävän nimi] -tehtävää. Aiempi kokemukseni [olennainen kokemus] parissa on kehittänyt [osaaminen]. Keskustelen mielelläni lisää osaamisestani haastattelussa.', letterClosing:'Ystävällisin terveisin,', fiGreeting:'Hei', fiApply:'Haen [tehtävän nimi] -tehtävää. Aiempi kokemukseni [olennainen kokemus] parissa on kehittänyt [osaaminen]. Keskustelen mielelläni lisää osaamisestani haastattelussa.', fiClosing:'Ystävällisin terveisin,'
    }
  };

  const fields = {
    role: document.getElementById('application-role'),
    employer: document.getElementById('application-employer'),
    url: document.getElementById('application-url'),
    status: document.getElementById('application-status')
  };
  const checks = [...document.querySelectorAll('[data-application-step]')];
  const count = document.getElementById('application-count');
  const progress = document.getElementById('application-progress');
  const progressBar = progress?.parentElement;
  const saveNote = document.getElementById('application-save-note');
  const state = document.getElementById('application-state');
  const letterLanguage = document.getElementById('letter-language');
  const letterName = document.getElementById('letter-name');
  const letterDraft = document.getElementById('letter-draft');
  const letterNote = document.getElementById('letter-note');
  const locale = () => uiLanguage?.value === 'fi' ? 'fi' : 'en';
  const copy = (key) => words[locale()][key] || words.en[key] || '';
  const safeRead = () => {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return data && typeof data === 'object' ? data : {};
    } catch { return {}; }
  };
  let saved = safeRead();

  function setMessage(node, key) { if (node) node.textContent = copy(key); }
  function localize() {
    const lang = locale();
    document.querySelectorAll('[data-ws]').forEach((node) => { node.textContent = copy(node.dataset.ws); });
    document.querySelectorAll('[data-ws-placeholder]').forEach((node) => { node.placeholder = copy(node.dataset.wsPlaceholder); });
    letterDraft.lang = letterLanguage.value === 'fi' ? 'fi' : 'en';
    letterDraft.spellcheck = true;
    document.documentElement.lang = lang;
    renderProgress();
    renderState();
  }
  function renderProgress() {
    const done = checks.filter((box) => box.checked).length;
    if (count) count.textContent = copy('progressCount').replace('{done}', done).replace('{total}', checks.length);
    if (progress) progress.style.width = `${checks.length ? Math.round(done / checks.length * 100) : 0}%`;
    progressBar?.setAttribute('aria-valuenow', String(done));
    progressBar?.setAttribute('aria-label', locale() === 'fi' ? 'Työhakemuksen muistilistan edistyminen' : 'Application checklist progress');
  }
  function renderState() {
    if (!state) return;
    const status = fields.status.value || 'planning';
    const labels = {planning:'statusPlanning', preparing:'statusPreparing', applied:'statusApplied', interview:'statusInterview', offer:'statusOffer'};
    state.textContent = copy(labels[status] || 'statusPlanning');
  }
  function saveDraft() {
    saved = {
      fields: Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value.trim()])),
      steps: Object.fromEntries(checks.map((box) => [box.dataset.applicationStep, box.checked])),
      letter: { language:letterLanguage.value, name:letterName.value, draft:letterDraft.value }
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
      if (saveNote) saveNote.textContent = copy('draftSaved');
      return true;
    } catch {
      setMessage(saveNote, 'saveFailed');
      return false;
    }
  }
  function makeLetter() {
    const name = letterName.value.trim() || (locale() === 'fi' ? '[oma nimi]' : '[your name]');
    const role = fields.role.value.trim() || (locale() === 'fi' ? '[tehtävän nimi]' : '[job title]');
    const employer = fields.employer.value.trim() || (locale() === 'fi' ? '[työnantaja]' : '[employer]');
    if (letterLanguage.value === 'fi') return `Hei ${employer},\n\nHaen tehtävää ${role}. Aiempi kokemukseni [olennainen kokemus] parissa on kehittänyt [osaaminen]. Keskustelen mielelläni lisää osaamisestani haastattelussa.\n\nYstävällisin terveisin,\n${name}`;
    return `Dear Hiring Team at ${employer},\n\nI am applying for the ${role} position. My experience in [relevant experience] has helped me develop [relevant skills]. I would welcome the opportunity to contribute to your team and tell you more in an interview.\n\nKind regards,\n${name}`;
  }

  if (saved.fields && typeof saved.fields === 'object') {
    Object.entries(fields).forEach(([key, field]) => { if (typeof saved.fields[key] === 'string') field.value = saved.fields[key]; });
  }
  checks.forEach((box) => { box.checked = saved.steps?.[box.dataset.applicationStep] === true; });
  if (saved.letter && typeof saved.letter === 'object') {
    if (['en','fi'].includes(saved.letter.language)) letterLanguage.value = saved.letter.language;
    if (typeof saved.letter.name === 'string') letterName.value = saved.letter.name;
    if (typeof saved.letter.draft === 'string') letterDraft.value = saved.letter.draft;
  }

  localize();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveDraft();
    const rawUrl = fields.url.value.trim();
    if (!rawUrl) { setMessage(saveNote, 'savedDraft'); return; }
    let url;
    try { url = new URL(rawUrl); } catch { url = null; }
    if (!url || url.protocol !== 'https:') {
      fields.url.setCustomValidity(copy('invalidUrl'));
      fields.url.reportValidity();
      setMessage(saveNote, 'invalidUrl');
      return;
    }
    fields.url.setCustomValidity('');
    if (!fields.role.value.trim()) {
      fields.role.setCustomValidity(copy('missingRole'));
      fields.role.reportValidity();
      setMessage(saveNote, 'missingRole');
      return;
    }
    fields.role.setCustomValidity('');
    const cityValue = document.getElementById('job-city')?.value || '';
    const city = cityValue === 'other' ? document.getElementById('other-city')?.value.trim() || '' : cityValue;
    const payload = { title:fields.role.value.trim(), employer:fields.employer.value.trim(), city, url:url.href, status:fields.status.value };
    document.dispatchEvent(new CustomEvent('kielo:save-application', {detail:payload}));
    if (payload.error) { setMessage(saveNote, payload.error === 'url' ? 'invalidUrl' : payload.error === 'title' ? 'missingRole' : 'saveFailed'); return; }
    setMessage(saveNote, 'savedTracker');
  });

  fields.url.addEventListener('input', () => fields.url.setCustomValidity(''));
  fields.role.addEventListener('input', () => fields.role.setCustomValidity(''));
  Object.values(fields).forEach((field) => field.addEventListener('input', () => { saveDraft(); renderState(); }));
  fields.status.addEventListener('change', () => { saveDraft(); renderState(); });
  checks.forEach((box) => box.addEventListener('change', () => { saveDraft(); renderProgress(); }));
  [letterName, letterDraft].forEach((field) => field.addEventListener('input', saveDraft));
  letterLanguage.addEventListener('change', () => { letterDraft.lang = letterLanguage.value === 'fi' ? 'fi' : 'en'; saveDraft(); });

  document.getElementById('letter-template')?.addEventListener('click', () => {
    letterDraft.value = makeLetter();
    saveDraft();
    setMessage(letterNote, 'sampleInserted');
    letterDraft.focus();
  });
  document.getElementById('letter-copy')?.addEventListener('click', async () => {
    try {
      if (!letterDraft.value.trim()) { setMessage(letterNote, 'letterPlaceholder'); return; }
      await navigator.clipboard.writeText(letterDraft.value);
      setMessage(letterNote, 'copied');
    } catch {
      letterDraft.focus();
      letterDraft.select();
      setMessage(letterNote, 'copyFailed');
    }
  });
  document.getElementById('listen-phrase')?.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance('Voisinko kertoa lisää kokemuksestani?');
    utterance.lang = 'fi-FI';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  });
  uiLanguage?.addEventListener('change', localize);
})();
