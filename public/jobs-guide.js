(() => {
  'use strict';

  const cities = [
    {id:'helsinki',name:['Helsinki region','Helsingin seutu'],city:['Helsinki · Espoo · Vantaa','Helsinki · Espoo · Vantaa'],region:['Uusimaa · Southern Finland','Uusimaa · Etelä-Suomi'],position:['Finland’s biggest job hub','Suomen suurin työpaikkakeskittymä'],summary:['The metro region has Finland’s widest employer mix, with roles across technology, health, business, logistics, public services and more. Search nearby Espoo and Vantaa too.','Metropolialueella on Suomen laajin työnantajavalikoima ja tehtäviä teknologiasta, terveydenhuollosta, liiketoiminnasta, logistiikasta ja julkisista palveluista. Hae myös Espoosta ja Vantaalta.'],sectors:[['Technology & startups','Teknologia ja startupit'],['Health & life sciences','Terveys ja biotieteet'],['Business services','Liike-elämän palvelut'],['Public services','Julkiset palvelut'],['Logistics & hospitality','Logistiikka ja majoitusala']],fit:['Useful if you want to compare many sectors, look for international employers or keep several career paths open.','Sopii, jos haluat vertailla monia aloja, etsiä kansainvälisiä työnantajia tai pitää useita uravaihtoehtoja avoinna.'],language:['English is used in some technology and multinational teams. Customer-facing and public-facing roles often ask for Finnish or Swedish; check each advert.','Englantia käytetään joissakin teknologia- ja kansainvälisissä tiimeissä. Asiakas- ja julkisten palveluiden tehtävissä vaaditaan usein suomea tai ruotsia; tarkista ilmoitus.'],links:[['Work in Finland','https://www.workinfinland.com/en/open-jobs/'],['MyHelsinki · sectors','https://www.myhelsinki.fi/business/key-business-sectors/']]},
    {id:'tampere',name:['Tampere','Tampere'],city:['Tampere · Pirkanmaa','Tampere · Pirkanmaa'],region:['Pirkanmaa · Lakeland','Pirkanmaa · Järvi-Suomi'],position:['Smart industry & ICT','Älykäs teollisuus ja ICT'],summary:['Tampere combines an industrial base with ICT, mobility, health technology and research. Consider employers across the wider Pirkanmaa region.','Tampereella yhdistyvät teollisuus, ICT, liikkuvuus, terveysteknologia ja tutkimus. Tutustu työnantajiin myös laajemmin Pirkanmaalla.'],sectors:[['Smart manufacturing','Älykäs valmistava teollisuus'],['ICT & mobility','ICT ja liikkuvuus'],['Health technology','Terveysteknologia'],['Engineering','Tekniikka'],['Research & education','Tutkimus ja koulutus']],fit:['Useful for engineering, industrial technology, software, health-tech and people who want a university-city environment.','Sopii tekniikan, teollisuuden, ohjelmistojen ja terveysteknologian osaajille sekä yliopistokaupungista kiinnostuneille.'],language:['Specialist teams may use English, while factory, customer, care and public-sector work can require Finnish. Confirm role by role.','Asiantuntijatiimeissä voidaan käyttää englantia, mutta tuotanto-, asiakas-, hoiva- ja julkisen sektorin työssä voidaan vaatia suomea. Tarkista tehtäväkohtaisesti.'],links:[['Business Tampere','https://businesstampere.com/en/why-tampere/tampere-for-investors/'],['Working in Tampere','https://www.tampere.fi/en/relocation-guide-tampere/working-tampere']]},
    {id:'turku',name:['Turku','Turku'],city:['Turku · Southwest Finland','Turku · Varsinais-Suomi'],region:['Varsinais-Suomi · Coast & Archipelago','Varsinais-Suomi · Rannikko ja saaristo'],position:['Maritime & life sciences','Meriteollisuus ja biotieteet'],summary:['Turku’s regional strengths include maritime industries, pharmaceuticals and life sciences, clean transition, food and technology.','Turun seudun vahvuuksia ovat meriteollisuus, lääkkeet ja biotieteet, puhdas siirtymä, elintarvikkeet ja teknologia.'],sectors:[['Maritime & shipbuilding','Meriteollisuus ja laivanrakennus'],['Pharma & life sciences','Lääkkeet ja biotieteet'],['Health technology','Terveysteknologia'],['Clean transition','Puhdas siirtymä'],['Food & nutrition','Elintarvikkeet ja ravitsemus']],fit:['Useful for marine engineering, production, biotech, diagnostics, research and clean-technology roles.','Sopii meritekniikan, tuotannon, biotekniikan, diagnostiikan, tutkimuksen ja puhtaan teknologian tehtäviin.'],language:['Research and specialist teams may work in English. Production, care, customer and public-service roles can require Finnish or Swedish.','Tutkimus- ja asiantuntijatiimeissä voidaan työskennellä englanniksi. Tuotanto-, hoiva-, asiakas- ja julkisten palveluiden tehtävissä voidaan vaatia suomea tai ruotsia.'],links:[['Business Turku · industries','https://businessturku.fi/en/key-industries/']]},
    {id:'oulu',name:['Oulu','Oulu'],city:['Oulu · North Ostrobothnia','Oulu · Pohjois-Pohjanmaa'],region:['North Ostrobothnia · Northern Finland','Pohjois-Pohjanmaa · Pohjois-Suomi'],position:['ICT & HealthTech','ICT ja terveysteknologia'],summary:['Oulu’s ecosystem connects ICT and wireless technology with AI, digital health, microelectronics and industry.','Oulun osaamiskeskittymä yhdistää ICT:n ja langattoman teknologian tekoälyyn, digitaaliseen terveyteen, mikroelektroniikkaan ja teollisuuteen.'],sectors:[['ICT & wireless technology','ICT ja langaton teknologia'],['AI & data','Tekoäly ja data'],['HealthTech','Terveysteknologia'],['Microelectronics','Mikroelektroniikka'],['Industrial technology','Teollisuusteknologia']],fit:['Useful for software, telecom, electronics, health-tech, data, engineering and research careers.','Sopii ohjelmistojen, tietoliikenteen, elektroniikan, terveysteknologian, datan, tekniikan ja tutkimuksen urille.'],language:['International expert roles may use English. Healthcare and customer-facing jobs may require Finnish or Swedish and recognised qualifications.','Kansainvälisissä asiantuntijatehtävissä voidaan käyttää englantia. Terveydenhuollon ja asiakaspalvelun tehtävissä voidaan vaatia suomea tai ruotsia sekä tunnustettua tutkintoa.'],links:[['BusinessOulu · ICT & HealthTech','https://www.businessoulu.com/en/news/businessoulu-is-strengthening-the-development-of-the-defence-healthtech-and-ict-sectors/'],['Work in Finland · jobs','https://www.workinfinland.com/en/open-jobs/']]},
    {id:'vaasa',name:['Vaasa','Vaasa'],city:['Vaasa · Ostrobothnia','Vaasa · Pohjanmaa'],region:['Ostrobothnia · West Coast','Pohjanmaa · Länsirannikko'],position:['Energy technology','Energiateknologia'],summary:['Energy technology is a defining employer cluster, with manufacturing, engineering and industrial services connected to it.','Energiateknologia on alueen keskeinen työnantajakeskittymä, johon liittyy valmistavaa teollisuutta, tekniikkaa ja teollisuuspalveluja.'],sectors:[['Energy technology','Energiateknologia'],['Electrical engineering','Sähkötekniikka'],['Manufacturing','Valmistava teollisuus'],['Industrial services','Teollisuuspalvelut'],['Public sector','Julkinen sektori']],fit:['Useful for electrical and mechanical engineers, technicians, production specialists and energy-transition careers.','Sopii sähkö- ja konetekniikan osaajille, teknikoille, tuotannon asiantuntijoille ja energiamurroksen parissa työskenteleville.'],language:['Some global companies use English in expert teams. Finnish and Swedish both matter in this region; check the employer’s requirements.','Jotkin kansainväliset yritykset käyttävät englantia asiantuntijatiimeissä. Alueella tarvitaan sekä suomea että ruotsia; tarkista työnantajan vaatimukset.'],links:[['City of Vaasa · work','https://www.vaasa.fi/koulutus-ja-tyo/tyomahdollisuudet/'],['EnergyVaasa','https://www.energyvaasa.fi/']]},
    {id:'kuopio',name:['Kuopio','Kuopio'],city:['Kuopio · North Savo','Kuopio · Pohjois-Savo'],region:['North Savo · Lakeland','Pohjois-Savo · Järvi-Suomi'],position:['Health, research & wellbeing','Terveys, tutkimus ja hyvinvointi'],summary:['Kuopio’s university and hospital ecosystem supports health and life sciences, research, health technology, ICT and food-related industries.','Kuopion yliopisto- ja sairaalaympäristö tukee terveyttä ja biotieteitä, tutkimusta, terveysteknologiaa, ICT:tä ja elintarvikealaa.'],sectors:[['Healthcare & life sciences','Terveydenhuolto ja biotieteet'],['Research & education','Tutkimus ja koulutus'],['Health technology','Terveysteknologia'],['ICT','ICT'],['Food & logistics','Elintarvikkeet ja logistiikka']],fit:['Useful for health, biomedical, research, education, technology and food-sector careers.','Sopii terveyden, biolääketieteen, tutkimuksen, koulutuksen, teknologian ja elintarvikealan urille.'],language:['Clinical and care roles often require Finnish or Swedish and recognised qualifications. Research and technology teams may use English.','Kliinisissä ja hoivatyössä vaaditaan usein suomea tai ruotsia sekä tunnustettu tutkinto. Tutkimus- ja teknologiatiimeissä voidaan käyttää englantia.'],links:[['Business Kuopio · region','https://www.businesskuopio.fi/en/invest-in-kuopio/'],['Kuopio ecosystems','https://www.businesskuopio.fi/en/networks-and-partners/ecosystems-and-clusters/']]},
    {id:'rovaniemi',name:['Rovaniemi / Lapland','Rovaniemi / Lappi'],city:['Rovaniemi · Lapland','Rovaniemi · Lappi'],region:['Lapland · Arctic Finland','Lappi · Arktinen Suomi'],position:['Tourism & regional services','Matkailu ja alueelliset palvelut'],summary:['Rovaniemi is a service and administrative centre for Lapland. Tourism sits alongside health and social care, retail, education, public administration and industry.','Rovaniemi on Lapin palvelu- ja hallintokeskus. Matkailun rinnalla työllistävät sosiaali- ja terveyspalvelut, kauppa, koulutus, hallinto ja teollisuus.'],sectors:[['Tourism & hospitality','Matkailu ja majoitusala'],['Health & social care','Sosiaali- ja terveydenhuolto'],['Retail & services','Kauppa ja palvelut'],['Education & public sector','Koulutus ja julkinen sektori'],['Industrial production','Teollisuustuotanto']],fit:['Useful for tourism, accommodation, food service, regional public services and people open to seasonal work.','Sopii matkailun, majoituksen, ravintolapalvelujen, aluehallinnon ja kausityön tehtäviin.'],language:['English can help in international tourism. Employers may also ask for Finnish or other languages; check season dates and housing conditions.','Englannista on hyötyä kansainvälisessä matkailussa. Työnantaja voi vaatia myös suomea tai muita kieliä; tarkista kauden kesto ja asumisehdot.'],links:[['Business Rovaniemi · sectors','https://www.businessrovaniemi.fi/en/Competent-workforce'],['Business Rovaniemi · economy','https://www.businessrovaniemi.fi/en/Why-Rovaniemi/Business-structure']]}
  ];

  const language = () => document.getElementById('ui-language')?.value === 'fi' ? 1 : 0;
  const text = (value) => Array.isArray(value) ? value[language()] : value;
  const cityById = (id) => cities.find((city) => city.id === id) || cities[0];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function renderCity(id) {
    const list = document.getElementById('guide-city-list');
    const detail = document.getElementById('guide-city-detail');
    if (!list || !detail) return;
    const city = cityById(id);
    list.innerHTML = cities.map((item) => `<button class="job-city-choice" type="button" data-guide-city="${item.id}" aria-pressed="${item.id === city.id}"><span class="job-city-icon" aria-hidden="true">${item.id === 'helsinki' ? '⌖' : item.id === 'tampere' ? '⚙' : item.id === 'turku' ? '⚓' : item.id === 'oulu' ? '✦' : item.id === 'vaasa' ? '⚡' : item.id === 'kuopio' ? '✚' : '❄'}</span><span><strong>${text(item.name)}</strong><small>${text(item.city)}</small></span></button>`).join('');
    detail.innerHTML = `<div class="job-city-top"><div><small>${text(city.region)}</small><h3>${text(city.city)}</h3></div><b>${text(city.position)}</b></div><p class="job-city-summary">${text(city.summary)}</p><span class="job-city-label">${language() ? 'Tunnettu aloistaan' : 'Known for'}</span><div class="job-city-sectors">${city.sectors.map((sector) => `<span>${text(sector)}</span>`).join('')}</div><div class="job-city-notes"><div><strong>${language() ? 'Kenelle alue sopii?' : 'Who may find this city useful?'}</strong><p>${text(city.fit)}</p></div><div><strong>${language() ? 'Kielitilanne' : 'Language reality'}</strong><p>${text(city.language)}</p></div></div><div class="job-city-links">${city.links.map(([label,url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}</div>`;
  }

  function setMarketFilters(filters) {
    const selected = Array.isArray(filters) ? filters : [filters];
    document.querySelectorAll('.guide-market-filter').forEach((button) => button.setAttribute('aria-pressed', String(selected.includes(button.dataset.filter))));
    document.querySelectorAll('.guide-market-card').forEach((card) => {
      const categories = card.dataset.categories.split(' ');
      card.hidden = !selected.includes('all') && !categories.some((category) => selected.includes(category));
    });
  }

  function cityIdFromSearch() {
    const value = document.getElementById('job-city')?.value || '';
    const normalized = value.toLocaleLowerCase();
    if (/helsinki|espoo|vantaa/.test(normalized)) return 'helsinki';
    if (normalized.includes('tampere')) return 'tampere';
    if (normalized.includes('turku')) return 'turku';
    if (normalized.includes('oulu')) return 'oulu';
    if (normalized.includes('vaasa')) return 'vaasa';
    if (normalized.includes('kuopio')) return 'kuopio';
    if (normalized.includes('rovaniemi') || normalized.includes('lapland') || normalized.includes('lappi')) return 'rovaniemi';
    return 'helsinki';
  }

  function recommend(event) {
    const role = document.getElementById('job-keyword')?.value.trim() || '';
    const selectedCity = document.getElementById('job-city')?.value || '';
    const cityId = cityIdFromSearch();
    const lang = document.getElementById('work-language')?.value || '';
    let filters = ['all'];
    let route = language() ? 'Vertaa kaupunkiprofiilia sopiviin työnhakupalveluihin. Tarkista alkuperäisen ilmoituksen kielivaatimus.' : 'Compare this city profile with the suggested job platforms. Confirm language expectations in each original advert.';
    const normalized = role.toLocaleLowerCase();
    if (/nurs|health|care|doctor|teacher|education|municipal|public/.test(normalized)) {
      filters = ['public'];
      route = language() ? 'Aloita Kuntarekrystä, Job Market Finlandista ja paikallisten työnantajien urasivuilta. Terveydenhuolto- ja julkisen sektorin tehtävissä tarkista kieli- ja tutkintovaatimukset.' : 'Start with Kuntarekry, Job Market Finland and local employer career pages. Check language and qualification requirements for healthcare and public roles.';
    } else if (/warehouse|clean|restaurant|hotel|season|production|driver|retail|kitchen/.test(normalized)) {
      filters = ['staffing','general'];
      route = language() ? 'Vertaa yleisiä työpaikkasivustoja ja henkilöstöpalveluyrityksiä. Tarkista työaika, aloitus, sopimus ja kielivaatimus.' : 'Compare broad job boards with staffing companies. Check hours, start date, contract and advert language.';
    } else if (/student|intern|graduate|research|trainee/.test(normalized)) {
      filters = ['graduate'];
      route = language() ? 'Aloita Aarresaaresta, yliopistojen urapalveluista, The Hubista ja Work in Finlandista.' : 'Start with Aarresaari, university career services, The Hub and Work in Finland.';
    } else if (/software|technology|engineer|engineering|ict|data|business|design/.test(normalized)) {
      filters = ['english','general'];
      route = language() ? 'Vertaa Work in Finlandia, LinkedIniä, yleisiä työpaikkasivustoja ja työnantajien omia urasivuja.' : 'Compare Work in Finland, LinkedIn, broad job boards and employer career pages.';
    } else if (lang === 'english') {
      filters = ['english'];
      route = language() ? 'Aloita Work in Finlandista, LinkedInistä ja työnantajien omilta urasivuilta. Tarkista jokaisen ilmoituksen työkieli.' : 'Start with Work in Finland, LinkedIn and employer career pages. Verify the working language in each advert.';
    } else if (lang === 'finnish') {
      filters = ['general','public'];
      route = language() ? 'Kokeile yleisiä työpaikkasivustoja ja julkisia työnhakupalveluja. Hae suomen- ja englanninkielisillä tehtävänimikkeillä.' : 'Try broad job boards and public employment services. Search with both Finnish and English job titles.';
    } else if (lang === 'learning') {
      filters = ['english','general','staffing'];
      route = language() ? 'Yhdistä englanninkieliset työnantajat yleisiin työpaikkasivustoihin ja henkilöstöpalveluihin. Tarkista kunkin tehtävän todellinen kielivaatimus.' : 'Combine English-friendly employers with broad job boards and staffing sources. Confirm the real language requirement for each role.';
    }
    renderCity(cityId);
    setMarketFilters(filters);
    const response = document.getElementById('plan-response');
    if (response) {
      const rolePart = role ? (language() ? `Haullesi “${escapeHTML(role)}”` : `For “${escapeHTML(role)}”`) : (language() ? 'Aloitussuunnitelmasi' : 'Your starting plan');
      const placePart = selectedCity || (language() ? 'koko Suomessa' : 'anywhere in Finland');
      response.innerHTML = `<strong>${rolePart} · ${escapeHTML(placePart)}</strong><span>${route}</span><a href="#guide-city-detail">${language() ? 'Katso kaupunkivinkit' : 'See city guidance'} ↓</a>`;
      response.classList.add('show');
    }
    window.setTimeout(() => response?.scrollIntoView({behavior:'smooth',block:'nearest'}), 0);
  }

  document.getElementById('guide-city-list')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-guide-city]');
    if (button) renderCity(button.dataset.guideCity);
  });
  document.querySelectorAll('.guide-market-filter').forEach((button) => button.addEventListener('click', () => setMarketFilters(button.dataset.filter)));
  document.getElementById('job-search-form')?.addEventListener('submit', recommend);
  document.getElementById('ui-language')?.addEventListener('change', () => {
    const lang = language() ? 'fi' : 'en';
    document.querySelectorAll('[data-guide-en][data-guide-fi]').forEach((node) => { node.textContent = node.dataset[`guide${lang === 'fi' ? 'Fi' : 'En'}`]; });
    renderCity(document.querySelector('.job-city-choice[aria-pressed="true"]')?.dataset.guideCity || 'helsinki');
  });
  document.getElementById('listen-work-phrase')?.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance('Olen kiinnostunut tästä työpaikasta.');
    utterance.lang = 'fi-FI';
    utterance.rate = .9;
    window.speechSynthesis.speak(utterance);
  });

  document.querySelectorAll('[data-guide-en][data-guide-fi]').forEach((node) => { node.textContent = node.dataset[language() ? 'guideFi' : 'guideEn']; });
  renderCity('helsinki');
})();
