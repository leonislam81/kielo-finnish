(() => {
  'use strict';

  const STORAGE_KEY = 'kielo-cv-builder-v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const ui = document.getElementById('ui-language');
  const copy = {
    en: {
      kicker:'A PRACTICAL NEXT STEP', sectionTitle:'Make your experience easy to see.', sectionIntro:'Create a clear CV for your next application. Your details stay in this browser on this device.',
      entryKicker:'YOUR KIELO CV · SAVED ON THIS DEVICE', entryTitle:'A Finland-ready CV, one step at a time.', entryText:'Add your details, choose your language and review a live preview in a clean, familiar format.',
      startButton:'Create your CV', continueButton:'Continue my CV', savedCv:'Saved CV found on this device', notSaved:'Not saved yet', saveHint:'Your CV is saved only in this browser.',
      exampleNote:'✦ Fictional sample details are editable. Replace every example before applying.', loadSample:'Load sample', confirmSample:'Replace the current form with the fictional sample CV? You can edit every field afterward.', toastSampleLoaded:'Sample CV loaded. Replace its details with your own.',
      clearButton:'Clear my CV', stepDetails:'Your details', stepExperience:'Experience', stepSkills:'Skills', stepReview:'Review',
      detailsTitle:'Start with your details.', detailsIntro:'These details appear at the top of your CV. Only include information you want an employer to use.',
      nameLabel:'Full name', nameHint:'Use the name you use on job applications.', roleLabel:'Job you want', roleHint:'e.g. Housekeeping assistant',
      cvLanguage:'Language for your CV', cvLanguageHint:'Section headings change; your personal text is not translated.', cityLabel:'City or region', cityHint:'e.g. Helsinki',
      emailLabel:'Email', phoneLabel:'Phone', profileLabel:'Short profile', profileHint:'A few lines about your experience and strengths',
      profileHintSmall:'Keep it relevant to the job you are applying for.', photoTitle:'Profile photo <em>(optional)</em>', photoHint:'A photo is optional in Finland. You can make a CV without one.', choosePhoto:'Choose photo',
      detailsFooter:'You can review everything before exporting.', addExperience:'Add experience', experienceTitle:'Show what you have done.',
      experienceIntro:'Start with the experience most relevant to the job. Part-time and volunteer work can count too.',
      addAnotherExperience:'Add another experience', newestFirst:'List the newest experience first.', back:'Back', addEducation:'Add education',
      skillsTitle:'Add education and skills.', skillsIntro:'Choose qualifications, skills and language levels that match your real experience.',
      educationLabel:'Education and training', educationHint:'Add a degree, course or certificate.', addEducationAnother:'Add education or training',
      skillsLabel:'Key skills', skillHint:'Type a skill and press Enter', skillsHint:'Keep skills relevant to your target role.',
      languagesLabel:'Languages and levels', addLanguage:'Add a language', languageHint:'Choose a level you can honestly describe in an interview.',
      referencesLabel:'References (optional)', referencesHint:'Ask permission first. Add their name, role or relationship, organisation, and contact details. Email and phone are optional.',
      referenceEntry:'Reference', addReference:'Add a reference', referenceNameLabel:'Full name', referenceRoleLabel:'Job title / relationship', referenceOrganizationLabel:'Organisation', referenceEmailLabel:'Email', referencePhoneLabel:'Phone',
      referenceNameHint:'e.g. Jamie Sample', referenceRoleHint:'e.g. Former supervisor', referenceOrganizationHint:'e.g. Example Market', referenceEmailHint:'name@example.com', referencePhoneHint:'Optional phone number', referenceNoteLabel:'Optional reference note', referenceNoteHint:'e.g. References available upon request',
      coverLetterHint:'Your cover letter can explain why this particular job interests you.', skillsFooter:'Use a level and dates you can support with confidence.',
      reviewTitle:'Review before you download.', reviewIntro:'Check names, dates, contact details and language levels. Your CV text is not sent to Kielo.',
      reviewContact:'Your contact details are easy to find.', reviewRelevant:'Your experience highlights what matters for this role.', reviewAccurate:'Your dates and language levels are accurate.',
      tailorHint:'Tailor the target role and summary for each application.', reviewButton:'Review my CV', previewDownload:'See preview and formats',
      seePreview:'See live CV preview', hidePreview:'Hide CV preview', previewTitle:'Your CV preview', previewSubtitle:'Clean two-column layout · A4',
      updatesLive:'Updates as you type', downloadTitle:'Download your CV', downloadHint:'Choose a format', downloadPdf:'Save as PDF',
      downloadPng:'Download PNG', downloadJpg:'Download JPG', pdfPrintNote:'PDF opens your browser’s print window. Choose “Save as PDF”.',
      privacyNote:'<b>Your details stay yours.</b> The CV is saved only in this browser on this device.',
      previewEmptyProfile:'Your short profile will appear here.', previewEmptyExperience:'Add a role to show your work experience.',
      previewEmptyEducation:'Add a degree, course or training.', previewEmptySkills:'Your relevant skills will appear here.',
      previewEmptyLanguages:'Add your languages and levels.', previewName:'Your name', previewRole:'Your target role',
      toastNeedName:'Add your name before continuing.', toastSaved:'CV saved on this device.', toastSaveError:'This browser could not save the CV. Try removing the photo or download a copy.',
      toastPhotoError:'Choose a JPG, PNG or WEBP image under 8 MB.', toastPhotoSaved:'Photo added to this device-only CV.',
      toastImageError:'The image could not be prepared in this browser. Try another browser or save as PDF.',
      toastExport:'Preparing your download…', toastCleared:'Saved CV removed from this device.', confirmClear:'Clear the saved CV from this device? This cannot be undone.',
      addJobTitle:'Job title', addEmployer:'Employer', addLocation:'City / country', addDates:'Dates', addTasks:'Main tasks or results',
      jobTitleHint:'e.g. Cleaner', employerHint:'Company or organisation', locationHint:'City, country', datesHint:'2023–2025',
      tasksHint:'One task or result per line', remove:'Remove', workEntry:'Experience', educationEntry:'Education or training',
      qualificationHint:'Course or qualification', schoolHint:'School or provider', yearHint:'Year or dates', chooseLevel:'Choose level',
      languageHintName:'Language', levelHint:'Language level', cvNameSuffix:'CV', filename:'kielo-cv',
      labelProfile:'Profile', labelExperience:'Work experience', labelEducation:'Education and training', labelSkills:'Key skills', labelLanguages:'Languages', labelReferences:'References',
      labelFinnishProfile:'Profiili', labelFinnishExperience:'Työkokemus', labelFinnishEducation:'Koulutus ja valmennus', labelFinnishSkills:'Osaaminen', labelFinnishLanguages:'Kielitaito', labelFinnishReferences:'Suosittelijat',
      printTitle:'Choose “Save as PDF” in your browser’s print window.'
    },
    fi: {
      kicker:'KÄYTÄNNÖN SEURAAVA ASKEL', sectionTitle:'Tuo osaamisesi selkeästi esiin.', sectionIntro:'Luo selkeä CV seuraavaa hakemustasi varten. Tietosi säilyvät tässä selaimessa ja tällä laitteella.',
      entryKicker:'KIELO-CV · TALLENNETTU TÄLLE LAITTEELLE', entryTitle:'Suomeen sopiva CV, yksi askel kerrallaan.', entryText:'Lisää tietosi, valitse CV:n kieli ja tarkista selkeä esikatselu.',
      startButton:'Luo CV', continueButton:'Jatka CV:n tekemistä', savedCv:'CV löytyy tältä laitteelta', notSaved:'Ei vielä tallennettu', saveHint:'CV tallentuu vain tähän selaimeen.',
      exampleNote:'✦ Esimerkkitiedot ovat kuvitteellisia ja muokattavissa. Vaihda kaikki esimerkkitiedot ennen hakemista.', loadSample:'Lataa esimerkki', confirmSample:'Korvataanko nykyiset tiedot kuvitteellisella esimerkkipohjalla? Voit muokata kaikkia kenttiä.', toastSampleLoaded:'Esimerkkipohja ladattu. Vaihda tiedot omiksesi.',
      clearButton:'Tyhjennä CV', stepDetails:'Omat tiedot', stepExperience:'Kokemus', stepSkills:'Osaaminen', stepReview:'Tarkista',
      detailsTitle:'Aloita omista tiedoistasi.', detailsIntro:'Nämä tiedot näkyvät CV:n alussa. Lisää vain tiedot, joita haluat jakaa työnantajalle.',
      nameLabel:'Koko nimi', nameHint:'Käytä työnhaussa käyttämääsi nimeä.', roleLabel:'Tavoittelemasi työ', roleHint:'esim. hotellisiivooja',
      cvLanguage:'CV:n kieli', cvLanguageHint:'CV:n otsikot vaihtuvat; omaa tekstiäsi ei käännetä.', cityLabel:'Kaupunki tai alue', cityHint:'esim. Helsinki',
      emailLabel:'Sähköposti', phoneLabel:'Puhelin', profileLabel:'Lyhyt esittely', profileHint:'Muutama rivi kokemuksestasi ja vahvuuksistasi',
      profileHintSmall:'Kerro hakemaasi työhön liittyvästä osaamisestasi.', photoTitle:'Valokuva <em>(valinnainen)</em>', photoHint:'Valokuva ei ole pakollinen. CV:n voi tehdä myös ilman kuvaa.', choosePhoto:'Valitse kuva',
      detailsFooter:'Voit tarkistaa kaikki tiedot ennen lataamista.', addExperience:'Lisää työkokemus', experienceTitle:'Kerro, mitä olet tehnyt.',
      experienceIntro:'Aloita työhön liittyvästä kokemuksesta. Myös osa-aikatyö ja vapaaehtoistyö voivat olla hyödyllisiä.',
      addAnotherExperience:'Lisää työkokemus', newestFirst:'Listaa uusin kokemus ensin.', back:'Takaisin', addEducation:'Lisää koulutus',
      skillsTitle:'Lisää koulutus ja osaaminen.', skillsIntro:'Valitse koulutukset, taidot ja kielitasot, jotka vastaavat todellista osaamistasi.',
      educationLabel:'Koulutus ja kurssit', educationHint:'Lisää tutkinto, kurssi tai todistus.', addEducationAnother:'Lisää koulutus tai kurssi',
      skillsLabel:'Keskeiset taidot', skillHint:'Kirjoita taito ja paina Enter', skillsHint:'Valitse tavoittelemaasi työhön liittyvät taidot.',
      languagesLabel:'Kielet ja kielitasot', addLanguage:'Lisää kieli', languageHint:'Valitse taso, jonka pystyt kuvaamaan haastattelussa.',
      referencesLabel:'Suosittelijat (valinnainen)', referencesHint:'Pyydä lupa ensin. Lisää nimi, tehtävänimike tai suhde, organisaatio ja yhteystiedot. Sähköposti ja puhelin ovat valinnaisia.',
      referenceEntry:'Suosittelija', addReference:'Lisää suosittelija', referenceNameLabel:'Koko nimi', referenceRoleLabel:'Tehtävänimike / suhde', referenceOrganizationLabel:'Organisaatio', referenceEmailLabel:'Sähköposti', referencePhoneLabel:'Puhelin',
      referenceNameHint:'esim. Mira Esimerkki', referenceRoleHint:'esim. Entinen esihenkilö', referenceOrganizationHint:'esim. Esimerkkikauppa', referenceEmailHint:'nimi@example.com', referencePhoneHint:'Puhelin valinnainen', referenceNoteLabel:'Valinnainen lisätieto', referenceNoteHint:'esim. Suosittelijat saatavilla pyynnöstä',
      coverLetterHint:'Hakemuskirjeessä voit kertoa, miksi haet juuri tätä työpaikkaa.', skillsFooter:'Lisää vain todenmukaiset päivämäärät ja kielitasot.',
      reviewTitle:'Tarkista ennen lataamista.', reviewIntro:'Tarkista nimet, päivämäärät, yhteystiedot ja kielitasot. CV-tekstiäsi ei lähetetä Kielolle.',
      reviewContact:'Yhteystietosi löytyvät helposti.', reviewRelevant:'Kokemuksesi korostaa tämän työn kannalta olennaista.', reviewAccurate:'Päivämäärät ja kielitasot ovat oikein.',
      tailorHint:'Muokkaa tavoitetyötä ja esittelyä jokaista hakemusta varten.', reviewButton:'Tarkista CV', previewDownload:'Esikatsele ja valitse tiedostomuoto',
      seePreview:'Näytä CV-esikatselu', hidePreview:'Piilota CV-esikatselu', previewTitle:'CV-esikatselu', previewSubtitle:'Selkeä kaksipalstainen pohja · A4',
      updatesLive:'Päivittyy kirjoittaessasi', downloadTitle:'Lataa CV', downloadHint:'Valitse tiedostomuoto', downloadPdf:'Tallenna PDF',
      downloadPng:'Lataa PNG', downloadJpg:'Lataa JPG', pdfPrintNote:'PDF avautuu selaimen tulostusikkunassa. Valitse “Tallenna PDF:nä”.',
      privacyNote:'<b>Tietosi pysyvät sinulla.</b> CV tallentuu vain tähän selaimeen ja tällä laitteella.',
      previewEmptyProfile:'Lyhyt esittelysi näkyy tässä.', previewEmptyExperience:'Lisää työtehtävä nähdäksesi työkokemuksen.', previewEmptyEducation:'Lisää tutkinto, kurssi tai koulutus.',
      previewEmptySkills:'Tähän tulevat tehtävän kannalta olennaiset taidot.', previewEmptyLanguages:'Lisää kielet ja kielitasot.', previewName:'Nimesi', previewRole:'Tavoittelemasi työ',
      toastNeedName:'Lisää nimesi ennen kuin jatkat.', toastSaved:'CV tallennettu tälle laitteelle.', toastSaveError:'Selain ei voinut tallentaa CV:tä. Kokeile poistaa kuva tai ladata kopio.',
      toastPhotoError:'Valitse JPG-, PNG- tai WEBP-kuva, joka on alle 8 Mt.', toastPhotoSaved:'Kuva lisättiin vain tälle laitteelle tallennettavaan CV:hen.',
      toastImageError:'Kuvaa ei voitu valmistella tässä selaimessa. Kokeile toista selainta tai tallenna PDF:nä.',
      toastExport:'Valmistellaan latausta…', toastCleared:'Tallennettu CV poistettiin tältä laitteelta.', confirmClear:'Tyhjennetäänkö CV tältä laitteelta? Tätä ei voi perua.',
      addJobTitle:'Tehtävänimike', addEmployer:'Työnantaja', addLocation:'Kaupunki / maa', addDates:'Ajankohta', addTasks:'Keskeiset tehtävät tai saavutukset',
      jobTitleHint:'esim. siivooja', employerHint:'Yritys tai yhteisö', locationHint:'Kaupunki, maa', datesHint:'2023–2025',
      tasksHint:'Yksi tehtävä tai tulos riville', remove:'Poista', workEntry:'Työkokemus', educationEntry:'Koulutus tai kurssi',
      qualificationHint:'Kurssi tai tutkinto', schoolHint:'Oppilaitos tai järjestäjä', yearHint:'Vuosi tai ajankohta', chooseLevel:'Valitse taso',
      languageHintName:'Kieli', levelHint:'Kielitaso', cvNameSuffix:'CV', filename:'kielo-cv',
      labelProfile:'Profiili', labelExperience:'Työkokemus', labelEducation:'Koulutus ja kurssit', labelSkills:'Osaaminen', labelLanguages:'Kielitaito', labelReferences:'Suosittelijat',
      labelFinnishProfile:'Profiili', labelFinnishExperience:'Työkokemus', labelFinnishEducation:'Koulutus ja kurssit', labelFinnishSkills:'Osaaminen', labelFinnishLanguages:'Kielitaito', labelFinnishReferences:'Suosittelijat',
      printTitle:'Valitse selaimen tulostusikkunassa “Tallenna PDF:nä”.'
    }
  };
  const outputLabels = {
    en: { profile:'Profile', experience:'Work experience', education:'Education and training', skills:'Key skills', languages:'Languages', references:'References' },
    fi: { profile:'Profiili', experience:'Työkokemus', education:'Koulutus ja kurssit', skills:'Osaaminen', languages:'Kielitaito', references:'Suosittelijat' }
  };

  let currentStep = 0;
  let saveTimer;
  let toastTimer;
  let photoData = '';
  let experienceCount = 0;
  let educationCount = 0;
  let languageCount = 0;
  let referenceCount = 0;
  let fieldCount = 0;
  let lastSavedState = null;

  function appLanguage() {
    return ui && ui.value === 'fi' ? 'fi' : (localStorage.getItem('kielo-jobs-language-v1') === 'fi' ? 'fi' : 'en');
  }
  function sampleState(language = appLanguage()) {
    if (language === 'fi') return {
      name:'Alex Esimerkki', role:'Asiakaspalvelija', cvLanguage:'fi', city:'Helsinki', email:'alex.example@example.com', phone:'+358 XX XXX XXXX',
      profile:'Ystävällinen ja luotettava asiakaspalvelija, jolla on kokemusta vähittäiskaupasta, kahvilatyöstä ja tapahtuma-avustamisesta. Pidän asiakkaiden auttamisesta ja tiimityöstä. Kehitän parhaillaan suomen kielen taitoani.',
      experience:[
        {title:'Myyjä',employer:'Esimerkkikauppa',location:'Helsinki',dates:'2024–2025',tasks:'Autoin asiakkaita ja vastasin arjen kysymyksiin.\nTäydensin hyllyjä, tarkistin tuotteiden päiväykset ja huolehdin esillepanoista.\nKäytin kassaa ja käsittelin kortti- ja käteismaksuja.\nTyöskentelin tiimin kanssa kiireisinä vuoroina.'},
        {title:'Kahvilatyöntekijä',employer:'Esimerkkikahvila',location:'Helsinki',dates:'2023–2024',tasks:'Valmistelin palvelutiskin, pakkasin tilauksia ja siistin pöytiä.\nNoudatin elintarvikehygienian ohjeita jokaisessa vuorossa.\nAutoin asiakkaita valinnoissa ja selvitin tuotteiden ainesosia.\nTein yhteistyötä keittiön kanssa tilausten sujuvoittamiseksi.'},
        {title:'Tapahtuma-avustaja',employer:'Esimerkkitapahtumat',location:'Helsinki',dates:'2022–2023',tasks:'Valmistelin tiloja, opasteita ja ilmoittautumispisteitä.\nToivotin vieraat tervetulleiksi ja tarkistin ilmoittautumiset.\nAutoin tilan järjestelyissä ennen tapahtumia ja niiden jälkeen.\nTyöskentelin joustavasti iltaisin ja viikonloppuisin.'}
      ],
      education:[{title:'Asiakaspalvelun opinnot',school:'Esimerkkiopisto',location:'Helsinki',dates:'2022–2024'}],
      skills:['Asiakaspalvelu','Tiimityö','Hyllytys','Kassatyö'],languages:[{name:'Suomi',level:'A2'},{name:'Englanti',level:'B2'}],
      references:[{name:'Mira Esimerkki',role:'Entinen esihenkilö',organization:'Esimerkkikauppa',email:'mira.example@example.com',phone:'+358 XX XXX XXXX'}],referenceNote:'',photo:''
    };
    return {
      name:'Alex Example', role:'Customer service assistant', cvLanguage:'en', city:'Helsinki', email:'alex.example@example.com', phone:'+358 XX XXX XXXX',
      profile:'Friendly and dependable service professional with experience in retail, café service and event support. Enjoys helping customers and working as part of a team. Currently improving Finnish.',
      experience:[
        {title:'Shop assistant',employer:'Example Market',location:'Helsinki',dates:'2024–2025',tasks:'Helped customers in person and answered everyday questions.\nRestocked shelves, checked product dates and kept displays organised.\nSupported checkout, cash handling and card payments accurately.\nWorked with the team to keep service friendly during busy shifts.'},
        {title:'Café assistant',employer:'Example Café',location:'Helsinki',dates:'2023–2024',tasks:'Prepared the counter, packed takeaway orders and kept tables clean.\nFollowed food hygiene routines and kept work areas organised.\nHelped customers choose items and explained ingredient information.\nCoordinated with kitchen staff to keep orders moving.'},
        {title:'Event support assistant',employer:'Sample Events',location:'Helsinki',dates:'2022–2023',tasks:'Set up rooms, signs and registration materials before events.\nWelcomed guests, checked registrations and answered basic questions.\nHelped with room changes and reset shared spaces after events.\nWorked flexibly during evening and weekend events.'}
      ],
      education:[{title:'Customer service studies',school:'Example College',location:'Helsinki',dates:'2022–2024'}],
      skills:['Customer service','Teamwork','Stock replenishment','Cash handling'],languages:[{name:'Finnish',level:'A2'},{name:'English',level:'B2'}],
      references:[{name:'Jamie Sample',role:'Former supervisor',organization:'Example Market',email:'jamie.sample@example.com',phone:'+358 XX XXX XXXX'}],referenceNote:'',photo:''
    };
  }
  function words() { return copy[appLanguage()]; }
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }
  function translateBuilder() {
    const dict = words();
    $$('[data-cv-ui]').forEach(node => {
      const value = dict[node.dataset.cvUi];
      if (value !== undefined) {
        if (node.dataset.cvUi === 'privacyNote' || node.dataset.cvUi === 'photoTitle') node.innerHTML = value;
        else node.textContent = value;
      }
    });
    $$('[data-cv-placeholder]').forEach(node => { node.placeholder = dict[node.dataset.cvPlaceholder] || ''; });
    $$('[data-cv-label]').forEach(node => { node.textContent = outputLabels[$('#cv-language')?.value || 'en'][node.dataset.cvLabel] || ''; });
    const start = $('#cv-start');
    if (start) start.querySelector('[data-cv-ui]').textContent = lastSavedState ? dict.continueButton : dict.startButton;
    updateStep(currentStep, false);
  }
  function safeRead() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch { return null; }
  }
  function isUnchangedOldSample(state) {
    if (!state || !['en','fi'].includes(state.cvLanguage)) return false;
    const language = state.cvLanguage;
    const oldExperience = language === 'fi'
      ? [{title:'Myyjä',employer:'Esimerkkikauppa',location:'Helsinki',dates:'2024–2025',tasks:'Autoin asiakkaita myymälässä.\nTäydensin hyllyjä ja pidin myymälän siistinä.\nTyöskentelin tiimin kanssa kiireisinä aikoina.'}]
      : [{title:'Shop assistant',employer:'Example Market',location:'Helsinki',dates:'2024–2025',tasks:'Helped customers in the store.\nRestocked shelves and kept the shop tidy.\nWorked with a team during busy shifts.'}];
    const old = language === 'fi' ? {
      name:'Alex Esimerkki',role:'Asiakaspalvelija',city:'Helsinki',email:'alex.example@example.com',phone:'+358 XX XXX XXXX',
      profile:'Ystävällinen ja luotettava asiakaspalvelija, jolla on kahden vuoden kokemus vähittäiskaupasta. Pidän asiakkaiden auttamisesta ja tiimityöstä. Kehitän parhaillaan suomen kielen taitoani.',
      education:[{title:'Asiakaspalvelun opinnot',school:'Esimerkkiopisto',location:'Helsinki',dates:'2022–2024'}],
      skills:['Asiakaspalvelu','Tiimityö','Hyllytys','Kassatyö'],languages:[{name:'Suomi',level:'A2'},{name:'Englanti',level:'B2'}],
      references:[{name:'Mira Esimerkki',role:'Entinen esihenkilö',organization:'Esimerkkikauppa',email:'mira.example@example.com',phone:'+358 XX XXX XXXX'}]
    } : {
      name:'Alex Example',role:'Customer service assistant',city:'Helsinki',email:'alex.example@example.com',phone:'+358 XX XXX XXXX',
      profile:'Friendly and dependable service professional with two years of retail experience. Enjoys helping customers and working as part of a team. Currently improving Finnish.',
      education:[{title:'Customer service studies',school:'Example College',location:'Helsinki',dates:'2022–2024'}],
      skills:['Customer service','Teamwork','Stock replenishment','Cash handling'],languages:[{name:'Finnish',level:'A2'},{name:'English',level:'B2'}],
      references:[{name:'Jamie Sample',role:'Former supervisor',organization:'Example Market',email:'jamie.sample@example.com',phone:'+358 XX XXX XXXX'}]
    };
    const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
    const referencesMatch = same(state.references,old.references) || (state.references === 'Available upon request' && state.referenceNote === '');
    return state.name === old.name && state.role === old.role && state.city === old.city && state.email === old.email && state.phone === old.phone &&
      state.profile === old.profile && same(state.experience,oldExperience) && same(state.education,old.education) &&
      same(state.skills,old.skills) && same(state.languages,old.languages) && referencesMatch &&
      (!state.referenceNote || state.referenceNote === '') && (!state.photo || state.photo === '');
  }
  function safeSave(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      lastSavedState = state;
      const status = $('#cv-save-status');
      status.classList.add('is-saved');
      status.querySelector('span').textContent = words().savedCv;
      const start = $('#cv-start');
      if (start) start.querySelector('[data-cv-ui]').textContent = words().continueButton;
      return true;
    } catch {
      const status = $('#cv-save-status');
      status.classList.remove('is-saved');
      status.querySelector('span').textContent = words().saveHint;
      showToast(words().toastSaveError);
      return false;
    }
  }
  function currentState() {
    return {
      name: $('#cv-name').value.trim(),
      role: $('#cv-role').value.trim(),
      cvLanguage: $('#cv-language').value,
      city: $('#cv-city').value.trim(),
      email: $('#cv-email').value.trim(),
      phone: $('#cv-phone').value.trim(),
      profile: $('#cv-profile').value.trim(),
      references: $$('.cv-reference-item').map(card => ({
        name:$('[data-reference="name"]',card).value.trim(),
        role:$('[data-reference="role"]',card).value.trim(),
        organization:$('[data-reference="organization"]',card).value.trim(),
        email:$('[data-reference="email"]',card).value.trim(),
        phone:$('[data-reference="phone"]',card).value.trim()
      })).filter(item => Object.values(item).some(Boolean)),
      referenceNote:$('#cv-reference-note').value.trim(),
      photo: photoData,
      experience: $$('.cv-work-item').map(card => ({
        title: $('[data-work="title"]', card).value.trim(),
        employer: $('[data-work="employer"]', card).value.trim(),
        location: $('[data-work="location"]', card).value.trim(),
        dates: $('[data-work="dates"]', card).value.trim(),
        tasks: $('[data-work="tasks"]', card).value.trim()
      })),
      education: $$('.cv-education-item').map(card => ({
        title: $('[data-education="title"]', card).value.trim(),
        school: $('[data-education="school"]', card).value.trim(),
        location: $('[data-education="location"]', card).value.trim(),
        dates: $('[data-education="dates"]', card).value.trim()
      })),
      skills: $$('.cv-chip').map(chip => chip.dataset.skill),
      languages: $$('.cv-language-row').map(row => ({
        name: $('[data-language="name"]', row).value.trim(),
        level: $('[data-language="level"]', row).value
      })).filter(row => row.name)
    };
  }
  function saveSoon() {
    clearTimeout(saveTimer);
    $('#cv-save-status').classList.remove('is-saved');
    $('#cv-save-status').querySelector('span').textContent = appLanguage() === 'fi' ? 'Tallennetaan…' : 'Saving…';
    saveTimer = setTimeout(() => safeSave(currentState()), 450);
  }
  function updateStep(index, shouldScroll = true) {
    currentStep = Math.max(0, Math.min(3, index));
    $$('[data-cv-panel]').forEach((panel, i) => panel.classList.toggle('is-active', i === currentStep));
    $$('[data-cv-step]').forEach((button, i) => {
      button.classList.toggle('is-current', i === currentStep);
      button.setAttribute('aria-current', i === currentStep ? 'step' : 'false');
    });
    const stepNames = [words().stepDetails, words().stepExperience, words().stepSkills, words().stepReview];
    $('#cv-step-count').textContent = (appLanguage() === 'fi' ? 'VAIHE ' : 'STEP ') + (currentStep + 1) + ' / 4 · ' + stepNames[currentStep].toLocaleUpperCase();
    $('#cv-progress-fill').style.width = ((currentStep + 1) * 25) + '%';
    if (shouldScroll && matchMedia('(max-width: 760px)').matches) $('.cv-editor').scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function makeField(labelKey, property, type = 'input', placeholderKey = '') {
    const wrap = document.createElement('label');
    wrap.className = 'cv-mini-field' + (property === 'tasks' ? ' cv-wide' : '');
    const caption = document.createElement('span');
    caption.dataset.cvUi = labelKey;
    caption.textContent = words()[labelKey];
    wrap.appendChild(caption);
    const control = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    const kind = property === 'title' || property === 'employer' || property === 'location' || property === 'dates' || property === 'tasks' ? 'work' : 'education';
    control.dataset[kind] = property;
    control.id = 'cv-' + kind + '-' + property + '-' + (++fieldCount);
    control.name = kind + '-' + property + '-' + fieldCount;
    if (property === 'tasks') {
      control.rows = 3;
      control.maxLength = 700;
    } else {
      control.type = 'text';
      control.maxLength = property === 'title' ? 100 : 140;
    }
    if (placeholderKey) control.placeholder = words()[placeholderKey];
    wrap.appendChild(control);
    return wrap;
  }
  function makeWorkItem(value = {}) {
    const dict = words();
    const card = document.createElement('article');
    card.className = 'cv-repeat-item cv-work-item';
    card.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'cv-repeat-head';
    const title = document.createElement('strong');
    title.textContent = dict.workEntry + ' ' + (++experienceCount);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'cv-remove-button';
    remove.textContent = dict.remove;
    remove.dataset.removeWork = '';
    head.append(title, remove);
    const grid = document.createElement('div');
    grid.className = 'cv-mini-grid';
    const fields = [
      ['addJobTitle','title','input','jobTitleHint'],
      ['addEmployer','employer','input','employerHint'],
      ['addLocation','location','input','locationHint'],
      ['addDates','dates','input','datesHint'],
      ['addTasks','tasks','textarea','tasksHint']
    ];
    fields.forEach(([labelKey, property, type, hint]) => {
      const field = makeField(labelKey, property, type, hint);
      const control = field.querySelector('input,textarea');
      control.value = value[property] || '';
      grid.appendChild(field);
    });
    card.append(head, grid);
    return card;
  }
  function makeEducationItem(value = {}) {
    const dict = words();
    const card = document.createElement('article');
    card.className = 'cv-repeat-item cv-education-item';
    const head = document.createElement('div');
    head.className = 'cv-repeat-head';
    const title = document.createElement('strong');
    title.textContent = dict.educationEntry + ' ' + (++educationCount);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'cv-remove-button';
    remove.textContent = dict.remove;
    remove.dataset.removeEducation = '';
    head.append(title, remove);
    const grid = document.createElement('div');
    grid.className = 'cv-mini-grid';
    const fields = [
      ['qualificationHint','title','education-title'],
      ['schoolHint','school','schoolHint'],
      ['addLocation','location','locationHint'],
      ['yearHint','dates','yearHint']
    ];
    fields.forEach(([labelKey, property, hint]) => {
      const field = makeField(labelKey, property);
      const control = field.querySelector('input');
      control.dataset.education = property;
      control.placeholder = dict[hint] || '';
      control.value = value[property] || '';
      grid.appendChild(field);
    });
    card.append(head, grid);
    return card;
  }
  function addLanguage(value = {}) {
    const dict = words();
    const row = document.createElement('div');
    row.className = 'cv-language-row';
    const name = document.createElement('input');
    name.type = 'text';
    name.maxLength = 60;
    name.dataset.language = 'name';
    name.name = 'language';
    name.setAttribute('aria-label', dict.languageHintName);
    name.placeholder = dict.languageHintName;
    name.value = value.name || '';
    const level = document.createElement('select');
    level.dataset.language = 'level';
    level.setAttribute('aria-label', dict.levelHint);
    level.name = 'languageLevel';
    const levels = appLanguage() === 'fi'
      ? [['Native','Äidinkieli'],['Fluent','Sujuva'],['C2','C2'],['C1','C1'],['B2','B2'],['B1','B1'],['A2','A2'],['A1','A1'],['Beginner','Alkeet']]
      : [['Native','Native'],['Fluent','Fluent'],['C2','C2'],['C1','C1'],['B2','B2'],['B1','B1'],['A2','A2'],['A1','A1'],['Beginner','Beginner']];
    levels.forEach(([v,label]) => { const option=document.createElement('option'); option.value=v; option.textContent=label; level.appendChild(option); });
    level.value = value.level || 'B1';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'cv-remove-language';
    remove.textContent = '×';
    remove.setAttribute('aria-label', appLanguage() === 'fi' ? 'Poista kieli' : 'Remove language');
    remove.addEventListener('click', () => { row.remove(); renderPreview(); saveSoon(); });
    row.append(name, level, remove);
    $('#cv-language-list').appendChild(row);
    languageCount += 1;
  }
  function makeReferenceField(labelKey,property,value,type='text') {
    const dict=words();
    const wrap=document.createElement('label');
    wrap.className='cv-mini-field';
    const caption=document.createElement('span');
    caption.dataset.cvUi=labelKey;
    caption.textContent=dict[labelKey];
    const input=document.createElement('input');
    input.type=type;
    input.maxLength=property==='email'?160:120;
    input.dataset.reference=property;
    input.id='cv-reference-'+property+'-'+(++fieldCount);
    input.name='reference-'+property+'-'+fieldCount;
    input.dataset.cvPlaceholder='reference'+property[0].toUpperCase()+property.slice(1)+'Hint';
    input.placeholder=dict[input.dataset.cvPlaceholder];
    input.value=value[property]||'';
    wrap.append(caption,input);
    return wrap;
  }
  function makeReferenceItem(value={}) {
    const dict=words();
    const card=document.createElement('article');
    card.className='cv-repeat-item cv-reference-item';
    const head=document.createElement('div');
    head.className='cv-repeat-head';
    const title=document.createElement('strong');
    title.textContent=dict.referenceEntry+' '+(++referenceCount);
    const remove=document.createElement('button');
    remove.type='button';
    remove.className='cv-remove-button';
    remove.textContent=dict.remove;
    remove.dataset.removeReference='';
    head.append(title,remove);
    const grid=document.createElement('div');
    grid.className='cv-mini-grid';
    [
      ['referenceNameLabel','name','text'],
      ['referenceRoleLabel','role','text'],
      ['referenceOrganizationLabel','organization','text'],
      ['referenceEmailLabel','email','email'],
      ['referencePhoneLabel','phone','tel']
    ].forEach(([labelKey,property,type])=>grid.appendChild(makeReferenceField(labelKey,property,value,type)));
    card.append(head,grid);
    return card;
  }
  function addSkill(name) {
    const value = name.trim();
    if (!value || $$('.cv-chip').some(chip => chip.dataset.skill.toLocaleLowerCase() === value.toLocaleLowerCase())) return;
    const chip = document.createElement('span');
    chip.className = 'cv-chip';
    chip.dataset.skill = value;
    const text = document.createElement('span');
    text.textContent = value;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '×';
    remove.setAttribute('aria-label', (appLanguage() === 'fi' ? 'Poista taito ' : 'Remove skill ') + value);
    remove.addEventListener('click', () => { chip.remove(); renderPreview(); saveSoon(); });
    chip.append(text, remove);
    $('#cv-skill-box').insertBefore(chip, $('#cv-skill-input'));
  }
  function resetRepeatingLists(state = {}) {
    experienceCount = 0;
    educationCount = 0;
    languageCount = 0;
    referenceCount = 0;
    $('#cv-experience-list').replaceChildren();
    $('#cv-education-list').replaceChildren();
    $('#cv-language-list').replaceChildren();
    $('#cv-reference-list').replaceChildren();
    (state.experience && state.experience.length ? state.experience : [{}]).forEach(item => $('#cv-experience-list').appendChild(makeWorkItem(item)));
    (state.education && state.education.length ? state.education : [{}]).forEach(item => $('#cv-education-list').appendChild(makeEducationItem(item)));
    (state.languages && state.languages.length ? state.languages : []).forEach(addLanguage);
    if (!state.languages || !state.languages.length) addLanguage({});
    (Array.isArray(state.references) ? state.references : []).forEach(item => $('#cv-reference-list').appendChild(makeReferenceItem(item)));
    $('#cv-skill-box').querySelectorAll('.cv-chip').forEach(chip => chip.remove());
    (state.skills || []).forEach(addSkill);
  }
  function applyState(state = {}) {
    $('#cv-name').value = state.name || '';
    $('#cv-role').value = state.role || '';
    $('#cv-language').value = state.cvLanguage === 'fi' ? 'fi' : 'en';
    $('#cv-city').value = state.city || '';
    $('#cv-email').value = state.email || '';
    $('#cv-phone').value = state.phone || '';
    $('#cv-profile').value = state.profile || '';
    $('#cv-reference-note').value = state.referenceNote || (typeof state.references==='string' ? state.references : '');
    photoData = state.photo || '';
    $('#cv-photo-thumb').replaceChildren();
    $('#cv-preview-photo').replaceChildren();
    if (photoData) {
      const small = document.createElement('img');
      small.src = photoData;
      small.alt = '';
      $('#cv-photo-thumb').appendChild(small);
      const large = document.createElement('img');
      large.src = photoData;
      large.alt = appLanguage() === 'fi' ? 'Valokuva CV:ssä' : 'Profile photo in CV';
      $('#cv-preview-photo').appendChild(large);
    } else {
      $('#cv-photo-thumb').textContent = '＋';
      $('#cv-preview-photo').textContent = 'CV';
    }
    resetRepeatingLists(state);
    renderPreview();
    translateBuilder();
  }
  function node(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  }
  function appendContact(target, value, kind) {
    if (!value) return;
    if (target.childNodes.length) target.appendChild(node('span','cv-contact-separator','·'));
    if (kind === 'email') {
      const a = node('a','',value);
      a.href = 'mailto:' + value;
      target.appendChild(a);
    } else if (kind === 'phone') {
      const span = node('span','',value);
      target.appendChild(span);
    } else target.appendChild(node('span','',value));
  }
  function renderPreview() {
    const state = currentState();
    const dict = words();
    $('#cv-preview-name').textContent = state.name || dict.previewName;
    $('#cv-preview-role').textContent = state.role;
    $('#cv-preview-role').hidden = !state.role;
    const contact = $('#cv-preview-contact');
    contact.replaceChildren();
    appendContact(contact,state.city,'city');
    appendContact(contact,state.phone,'phone');
    appendContact(contact,state.email,'email');
    const initials = (state.name || 'CV').split(/\s+/).filter(Boolean).slice(0,2).map(word => word[0]).join('').toLocaleUpperCase() || 'CV';
    if (!state.photo && $('#cv-preview-photo').textContent !== initials) $('#cv-preview-photo').textContent = initials;
    $('#cv-preview-profile').textContent = state.profile;
    $('#cv-preview-profile').hidden = !state.profile;
    $('[data-cv-ui="previewEmptyProfile"]').hidden = Boolean(state.profile);
    const referencePreview=$('#cv-preview-references');
    referencePreview.replaceChildren();
    const savedReferences=state.references.filter(item=>item.name||item.role||item.organization||item.email||item.phone);
    savedReferences.forEach(item=>{
      const card=node('article','cv-resume-reference-entry');
      if(item.name) card.appendChild(node('strong','',item.name));
      const role=[item.role,item.organization].filter(Boolean).join(' · ');
      if(role) card.appendChild(node('small','',role));
      const contact=[item.email,item.phone].filter(Boolean).join(' · ');
      if(contact) card.appendChild(node('small','',contact));
      referencePreview.appendChild(card);
    });
    if(state.referenceNote) referencePreview.appendChild(node('p','cv-resume-reference',state.referenceNote));
    $('#cv-preview-references-section').hidden=!savedReferences.length&&!state.referenceNote;
    $('#cv-preview-experience').replaceChildren();
    const work = state.experience.filter(item => item.title || item.employer || item.location || item.dates || item.tasks);
    if (!work.length) $('#cv-preview-experience').appendChild(node('small','cv-resume-empty',dict.previewEmptyExperience));
    work.forEach(item => {
      const article = node('article','cv-resume-job');
      article.appendChild(node('h5','',item.title || dict.addJobTitle));
      const meta = [item.employer,item.location,item.dates].filter(Boolean).join(' · ');
      if (meta) article.appendChild(node('p','cv-resume-meta',meta));
      const bullets = (item.tasks || '').split(/\n+/).map(line => line.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
      if (bullets.length) {
        const list = node('ul');
        bullets.forEach(line => list.appendChild(node('li','',line)));
        article.appendChild(list);
      }
      $('#cv-preview-experience').appendChild(article);
    });
    $('#cv-preview-education').replaceChildren();
    const education = state.education.filter(item => item.title || item.school || item.location || item.dates);
    if (!education.length) $('#cv-preview-education').appendChild(node('small','cv-resume-empty',dict.previewEmptyEducation));
    education.forEach(item => {
      const article = node('div','cv-resume-education');
      article.appendChild(node('strong','',item.title || dict.qualificationHint));
      const meta = [item.school,item.location,item.dates].filter(Boolean).join(' · ');
      if (meta) article.appendChild(node('small','',meta));
      $('#cv-preview-education').appendChild(article);
    });
    $('#cv-preview-skills').replaceChildren();
    if (!state.skills.length) $('#cv-preview-skills').appendChild(node('small','cv-resume-empty',dict.previewEmptySkills));
    state.skills.forEach(skill => $('#cv-preview-skills').appendChild(node('p','cv-resume-skill',skill)));
    $('#cv-preview-languages').replaceChildren();
    if (!state.languages.length) $('#cv-preview-languages').appendChild(node('small','cv-resume-empty',dict.previewEmptyLanguages));
    state.languages.forEach(item => {
      const row = node('div','cv-resume-language');
      row.append(node('span','',item.name),node('span','',item.level));
      $('#cv-preview-languages').appendChild(row);
    });
    $$('[data-cv-label]').forEach(label => { label.textContent = outputLabels[state.cvLanguage][label.dataset.cvLabel] || ''; });
  }
  function openBuilder() {
    $('#cv-builder-app').hidden = false;
    if (lastSavedState) applyState(lastSavedState);
    else applyState(sampleState(appLanguage()));
    $('#cv-start').querySelector('[data-cv-ui]').textContent = lastSavedState ? words().continueButton : words().startButton;
    $('#cv-builder-app').scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function switchLanguage() {
    const state = $('#cv-builder-app').hidden ? lastSavedState : currentState();
    translateBuilder();
    if (state && !$('#cv-builder-app').hidden) applyState(state);
  }
  function sanitizeFilename(value) {
    return (value || words().filename).normalize('NFKD').replace(/[^\w -]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').slice(0,55).toLowerCase() || words().filename;
  }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function wrapCanvasText(context,text,maxWidth) {
    const lines=[];
    String(text || '').split(/\r?\n/).forEach(paragraph => {
      const words=paragraph.trim().split(/\s+/).filter(Boolean);
      if (!words.length) return;
      let line='';
      words.forEach(word => {
        let part=word;
        while (context.measureText(part).width>maxWidth && part.length>1) {
          const cut=Math.max(1,Math.floor(part.length*maxWidth/context.measureText(part).width));
          const fragment=part.slice(0,cut);
          if (line) { lines.push(line); line=''; }
          lines.push(fragment+'-');
          part=part.slice(cut);
        }
        const candidate=line ? line+' '+part : part;
        if (line && context.measureText(candidate).width>maxWidth) { lines.push(line); line=part; }
        else line=candidate;
      });
      if (line) lines.push(line);
    });
    return lines;
  }
  function makeCanvasLayout(state, language) {
    const measure=document.createElement('canvas').getContext('2d');
    const operations=[];
    const W=840, pad=52, headerH=170, leftW=470, rightX=546, rightW=242, bodyTop=205;
    function textBlock(text,x,y,maxWidth,font,color,lineHeight,bullet=false) {
      measure.font=font;
      const lines=wrapCanvasText(measure,text,maxWidth-(bullet?13:0));
      lines.forEach((line,index) => operations.push({type:'text',text:(bullet&&index===0?'• ':'')+line,x:x+(bullet?12:0),y:y+index*lineHeight,font,color}));
      return y+Math.max(1,lines.length)*lineHeight;
    }
    function section(title,x,y,width) {
      operations.push({type:'heading',text:title.toLocaleUpperCase(),x,y,width});
      return y+35;
    }
    let leftY=bodyTop;
    let rightY=bodyTop;
    if (state.profile) {
      leftY=section(language==='fi'?'Profiili':'Profile',pad,leftY,leftW);
      leftY=textBlock(state.profile,pad,leftY,leftW,'15px Arial','#405d72',21)+22;
    }
    const work=state.experience.filter(item=>item.title||item.employer||item.location||item.dates||item.tasks);
    if (work.length) {
      leftY=section(language==='fi'?'Työkokemus':'Work experience',pad,leftY,leftW);
      work.forEach(item=>{
        const title=item.title||item.employer|| (language==='fi'?'Työkokemus':'Experience');
        leftY=textBlock(title,pad,leftY,leftW,'bold 17px Arial','#173f65',22)+3;
        const meta=[item.employer,item.location,item.dates].filter(Boolean).join(' · ');
        if(meta) leftY=textBlock(meta,pad,leftY,leftW,'italic 13px Arial','#70879a',18)+4;
        if(item.tasks) item.tasks.split(/\r?\n/).filter(Boolean).forEach(task=>{leftY=textBlock(task,pad+3,leftY,leftW-3,'13px Arial','#40596d',19,true)+3;});
        leftY+=14;
      });
    }
    const education=state.education.filter(item=>item.title||item.school||item.location||item.dates);
    if (education.length) {
      leftY=section(language==='fi'?'Koulutus ja kurssit':'Education and training',pad,leftY,leftW);
      education.forEach(item=>{
        leftY=textBlock(item.title||item.school,pad,leftY,leftW,'bold 15px Arial','#173f65',20)+3;
        const meta=[item.school,item.location,item.dates].filter(Boolean).join(' · ');
        if(meta) leftY=textBlock(meta,pad,leftY,leftW,'13px Arial','#718698',18)+9;
      });
    }
    if(state.skills.length){
      rightY=section(language==='fi'?'Osaaminen':'Key skills',rightX,rightY,rightW);
      state.skills.forEach(skill=>{rightY=textBlock(skill,rightX,rightY,rightW,'bold 13px Arial','#315b77',19,true)+6;});
      rightY+=13;
    }
    if(state.languages.length){
      rightY=section(language==='fi'?'Kielitaito':'Languages',rightX,rightY,rightW);
      state.languages.forEach(item=>{
        rightY=textBlock(item.name,rightX,rightY,rightW,'bold 13px Arial','#456277',18)+2;
        rightY=textBlock(item.level,rightX,rightY,rightW,'12px Arial','#758b9b',16)+7;
      });
      rightY+=11;
    }
    const references=state.references.filter(item=>item.name||item.role||item.organization||item.email||item.phone);
    if(references.length||state.referenceNote){
      rightY=section(language==='fi'?'Suosittelijat':'References',rightX,rightY,rightW);
      references.forEach(item=>{
        if(item.name) rightY=textBlock(item.name,rightX,rightY,rightW,'bold 13px Arial','#405d72',18)+2;
        const role=[item.role,item.organization].filter(Boolean).join(' · ');
        if(role) rightY=textBlock(role,rightX,rightY,rightW,'12px Arial','#70879a',16)+3;
        const contact=[item.email,item.phone].filter(Boolean).join(' · ');
        if(contact) rightY=textBlock(contact,rightX,rightY,rightW,'11px Arial','#758b9b',15)+8;
        else rightY+=5;
      });
      if(state.referenceNote) rightY=textBlock(state.referenceNote,rightX,rightY,rightW,'10px Arial','#405d72',15)+8;
      rightY+=3;
    }
    return {operations,width:W,height:Math.max(1188,leftY+48,rightY+48),pad,headerH,leftW,rightX,rightW,bodyTop};
  }
  async function drawCvCanvas(state) {
    await (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
    const language=state.cvLanguage==='fi'?'fi':'en';
    const layout=makeCanvasLayout(state,language);
    const scale=2;
    const canvas=document.createElement('canvas');
    canvas.width=layout.width*scale;
    canvas.height=layout.height*scale;
    const context=canvas.getContext('2d');
    context.scale(scale,scale);
    context.fillStyle='#ffffff'; context.fillRect(0,0,layout.width,layout.height);
    context.fillStyle='#173f65'; context.fillRect(0,0,layout.width,layout.headerH);
    context.fillStyle='#3798d4'; context.fillRect(0,layout.headerH-5,layout.width,5);
    const textX=layout.pad, textWidth=layout.width-layout.pad*2-115;
    context.fillStyle='#ffffff'; context.font='800 27px Arial';
    const nameLines=wrapCanvasText(context,state.name,textWidth).slice(0,2);
    nameLines.forEach((line,index)=>context.fillText(line,textX,60+index*32));
    let infoY=60+nameLines.length*32+2;
    if(state.role){ context.fillStyle='#dbeaf4'; context.font='bold 14px Arial'; context.fillText(state.role.slice(0,90),textX,infoY); infoY+=23; }
    const contact=[state.city,state.email,state.phone].filter(Boolean).join('   ·   ');
    if(contact){
      context.fillStyle='#e4eff6'; context.font='11px Arial';
      wrapCanvasText(context,contact,textWidth).slice(0,3).forEach((line,index)=>context.fillText(line,textX,infoY+index*16));
    }
    const photoX=layout.width-layout.pad-83, photoY=34, photoW=83, photoH=102;
    if(state.photo){
      try {
        const photo=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=state.photo;});
        const ratio=Math.max(photoW/photo.width,photoH/photo.height), dw=photo.width*ratio, dh=photo.height*ratio;
        context.save(); context.beginPath(); context.roundRect(photoX,photoY,photoW,photoH,10); context.clip();
        context.drawImage(photo,photoX+(photoW-dw)/2,photoY+(photoH-dh)/2,dw,dh); context.restore();
        context.strokeStyle='#ffffff';context.lineWidth=3;context.beginPath();context.roundRect(photoX,photoY,photoW,photoH,10);context.stroke();
      } catch { /* Continue with initials if the image is unavailable. */ }
    } else {
      context.fillStyle='#e6eef2';context.beginPath();context.roundRect(photoX,photoY,photoW,photoH,10);context.fill();
      context.fillStyle='#315c78';context.font='800 25px Arial';
      const initials=state.name.trim().split(/\s+/).slice(0,2).map(part=>part[0]).join('').toLocaleUpperCase();
      context.textAlign='center';context.fillText(initials,photoX+photoW/2,photoY+61);context.textAlign='left';
    }
    context.fillStyle='#edf4f8';context.beginPath();context.roundRect(layout.rightX-13,layout.bodyTop-16,layout.rightW+26,layout.height-layout.bodyTop-14,12);context.fill();
    layout.operations.forEach(operation=>{
      if(operation.type==='heading'){
        context.fillStyle='#1c4b70';context.font='800 13px Arial';context.fillText(operation.text,operation.x,operation.y);
        context.fillStyle='#3798d4';context.fillRect(operation.x,operation.y+10,operation.width,2);
      } else {
        context.fillStyle=operation.color;context.font=operation.font;context.fillText(operation.text,operation.x,operation.y);
      }
    });
    return canvas;
  }
  async function exportImage(format) {
    const state = currentState();
    if (!state.name) { showToast(words().toastNeedName); $('#cv-name').focus(); return; }
    const button = $('[data-cv-export="' + format + '"]');
    button.disabled = true;
    showToast(words().toastExport);
    try {
      const canvas = await drawCvCanvas(state);
      const context = canvas.getContext('2d');
      if (format === 'jpg') { context.globalCompositeOperation='destination-over';context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);context.globalCompositeOperation='source-over'; }
      const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const blob = await new Promise(resolve => canvas.toBlob(resolve,mime,format === 'jpg' ? .94 : undefined));
      if (!blob) throw new Error('Canvas export failed');
      downloadBlob(blob,sanitizeFilename(state.name)+'-cv.'+format);
      button.disabled = false;
    } catch (error) {
      button.disabled = false;
      showToast(words().toastImageError);
    }
  }
  function exportPdf() {
    const state = currentState();
    if (!state.name) { showToast(words().toastNeedName); $('#cv-name').focus(); return; }
    safeSave(state);
    const oldTitle = document.title;
    document.title = sanitizeFilename(state.name) + '-' + words().cvNameSuffix;
    document.body.classList.add('cv-printing');
    showToast(words().printTitle);
    const restore = () => {
      document.body.classList.remove('cv-printing');
      document.title = oldTitle;
      window.removeEventListener('afterprint',restore);
    };
    window.addEventListener('afterprint',restore);
    window.print();
    setTimeout(restore,60000);
  }
  function compressPhoto(file) {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const image = new Image();
        image.onerror = reject;
        image.onload = () => {
          const maxWidth = 700;
          const maxHeight = 900;
          const ratio = Math.min(1,maxWidth/image.width,maxHeight/image.height);
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1,Math.round(image.width*ratio));
          canvas.height = Math.max(1,Math.round(image.height*ratio));
          canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL('image/jpeg',.84));
        };
        image.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
  function initialize() {
    lastSavedState = safeRead();
    if (lastSavedState && !Array.isArray(lastSavedState.experience)) lastSavedState = null;
    const refreshSample = isUnchangedOldSample(lastSavedState);
    if (refreshSample) lastSavedState = sampleState(lastSavedState.cvLanguage);
    translateBuilder();
    if (lastSavedState) {
      $('#cv-start').querySelector('[data-cv-ui]').textContent = words().continueButton;
      $('#cv-save-status').classList.add('is-saved');
      $('#cv-save-status').querySelector('span').textContent = words().savedCv;
    }
    $('#cv-start').addEventListener('click',openBuilder);
    $('#cv-form').addEventListener('input',event => {
      if (event.target.id === 'cv-skill-input') return;
      renderPreview();
      saveSoon();
    });
    $('#cv-form').addEventListener('change',event => {
      if (event.target.id === 'cv-photo-file') return;
      renderPreview();
      saveSoon();
    });
    $$('[data-cv-step]').forEach(button => button.addEventListener('click',() => updateStep(Number(button.dataset.cvStep))));
    $$('[data-cv-next]').forEach(button => button.addEventListener('click',() => {
      if (currentStep === 0 && !$('#cv-name').value.trim()) { showToast(words().toastNeedName); $('#cv-name').focus(); return; }
      updateStep(currentStep+1);
    }));
    $$('[data-cv-previous]').forEach(button => button.addEventListener('click',() => updateStep(currentStep-1)));
    $('#cv-add-experience').addEventListener('click',() => { $('#cv-experience-list').appendChild(makeWorkItem()); renderPreview(); saveSoon(); });
    $('#cv-experience-list').addEventListener('click',event => {
      const button = event.target.closest('[data-remove-work]');
      if (!button) return;
      if ($$('.cv-work-item').length <= 1) { button.closest('.cv-work-item').querySelectorAll('input,textarea').forEach(control => control.value=''); }
      else button.closest('.cv-work-item').remove();
      renderPreview(); saveSoon();
    });
    $('#cv-add-education').addEventListener('click',() => { $('#cv-education-list').appendChild(makeEducationItem()); renderPreview(); saveSoon(); });
    $('#cv-education-list').addEventListener('click',event => {
      const button = event.target.closest('[data-remove-education]');
      if (!button) return;
      button.closest('.cv-education-item').remove();
      renderPreview(); saveSoon();
    });
    $('#cv-add-language').addEventListener('click',() => { addLanguage(); renderPreview(); saveSoon(); });
    $('#cv-add-reference').addEventListener('click',() => { $('#cv-reference-list').appendChild(makeReferenceItem()); renderPreview(); saveSoon(); });
    $('#cv-reference-list').addEventListener('click',event => {
      const button=event.target.closest('[data-remove-reference]');
      if(!button) return;
      button.closest('.cv-reference-item').remove();
      renderPreview(); saveSoon();
    });
    $('#cv-skill-input').addEventListener('keydown',event => {
      if (event.key !== 'Enter' && event.key !== ',') return;
      event.preventDefault();
      const input = event.currentTarget;
      const name = input.value.replace(/,$/,'').trim();
      if (!name) return;
      if ($$('.cv-chip').length >= 12) { showToast(appLanguage()==='fi'?'Lisää enintään 12 taitoa.':'Add up to 12 skills.'); return; }
      addSkill(name);
      input.value = '';
      renderPreview(); saveSoon();
    });
    $('#cv-photo-file').addEventListener('change',async event => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (!/^image\/(png|jpe?g|webp)$/i.test(file.type) || file.size > 8*1024*1024) { showToast(words().toastPhotoError); event.target.value=''; return; }
      try {
        photoData = await compressPhoto(file);
        applyState(currentState());
        saveSoon();
        showToast(words().toastPhotoSaved);
      } catch { showToast(words().toastPhotoError); }
    });
    $('#cv-language').addEventListener('change',() => { renderPreview(); saveSoon(); });
    $('#cv-clear').addEventListener('click',() => {
      if (!confirm(words().confirmClear)) return;
      localStorage.removeItem(STORAGE_KEY);
      lastSavedState = null;
      $('#cv-start').querySelector('[data-cv-ui]').textContent = words().startButton;
      $('#cv-save-status').classList.remove('is-saved');
      $('#cv-save-status').querySelector('span').textContent = words().notSaved;
      experienceCount=0; educationCount=0; languageCount=0;
      applyState({});
      updateStep(0);
      showToast(words().toastCleared);
    });
    $('#cv-load-sample').addEventListener('click',() => {
      if (!confirm(words().confirmSample)) return;
      const state=sampleState($('#cv-language').value || appLanguage());
      applyState(state);
      safeSave(currentState());
      showToast(words().toastSampleLoaded);
    });
    $('#cv-preview-toggle').addEventListener('click',() => {
      const open = $('#cv-workspace').classList.toggle('cv-show-preview');
      const label = $('#cv-preview-toggle').querySelector('[data-cv-ui]');
      label.textContent = open ? words().hidePreview : words().seePreview;
      if (open) $('#cv-preview-card').scrollIntoView({behavior:'smooth',block:'start'});
    });
    $('#cv-go-preview').addEventListener('click',() => {
      $('#cv-workspace').classList.add('cv-show-preview');
      if (matchMedia('(max-width:760px)').matches) $('#cv-preview-card').scrollIntoView({behavior:'smooth',block:'start'});
      else $('#cv-preview-card').scrollIntoView({behavior:'smooth',block:'nearest'});
    });
    $$('[data-cv-export]').forEach(button => button.addEventListener('click',() => {
      if (button.dataset.cvExport === 'pdf') exportPdf();
      else exportImage(button.dataset.cvExport);
    }));
    ui?.addEventListener('change',switchLanguage);
    applyState(lastSavedState || sampleState(appLanguage()));
    if (refreshSample) safeSave(currentState());
  }
  initialize();
})();
