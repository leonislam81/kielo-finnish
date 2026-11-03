(() => {
  'use strict';

  const KEYS = {
    language: 'kielo-jobs-language-v1',
    searches: 'kielo-jobs-saved-searches-v1',
    records: 'kielo-jobs-tracker-v1'
  };
  const sources = [
    {id:'tyomarkkinatori',name:'Job Market Finland · Työmarkkinatori',mark:'JM',kind:'public',area:['all','public-sector'],tags:['government','public','job search','work','employment','skills'],url:'https://tyomarkkinatori.fi/en/personal-customers/vacancies',search:'manual',note:'api'},
    {id:'workinfinland',name:'Work in Finland',mark:'WF',kind:'general',area:['all','technology','industry','student'],tags:['international','english','technology','engineering','healthcare','manufacturing','student','summer','professional','job'],url:'https://www.workinfinland.com/en/open-jobs/',search:'query',note:'international'},
    {id:'kuntarekry',name:'Kuntarekry',mark:'KR',kind:'public',area:['all','public-sector','healthcare','education','social'],tags:['municipality','city','public','healthcare','education','social','substitute','summer','finnish','swedish'],url:'https://www.kuntarekry.fi/en/jobs-by-type/',search:'manual',note:'kuntarekry'},
    {id:'duunitori',name:'Duunitori',mark:'DU',kind:'general',area:['all'],tags:['private','local','cleaning','hospitality','logistics','retail','technology','jobs'],url:'https://duunitori.fi/',search:'manual'},
    {id:'jobly',name:'Jobly',mark:'JB',kind:'general',area:['all'],tags:['private','professional','sales','technology','business'],url:'https://www.jobly.fi/',search:'manual'},
    {id:'linkedin',name:'LinkedIn Jobs',mark:'in',kind:'general',area:['all','technology','student'],tags:['professional','technology','business','network','international'],url:'https://www.linkedin.com/jobs/',search:'manual'},
    {id:'indeed',name:'Indeed Finland',mark:'IN',kind:'general',area:['all'],tags:['general','jobs','international','part-time','full-time'],url:'https://fi.indeed.com/',search:'manual'},
    {id:'valtiolle',name:'Valtiolle.fi',mark:'VF',kind:'public',area:['public-sector','technology','education'],tags:['government','state','public','research','administration'],url:'https://valtiolle.fi/en/',search:'manual'},
    {id:'eures',name:'EURES',mark:'EU',kind:'public',area:['all','technology','industry','student'],tags:['europe','international','mobility','public','seasonal'],url:'https://eures.europa.eu/index_en',search:'manual'},
    {id:'careerjet',name:'Careerjet Finland',mark:'CJ',kind:'general',area:['all'],tags:['general','jobs','aggregator'],url:'https://www.careerjet.fi/',search:'manual'},
    {id:'jooble',name:'Jooble Finland',mark:'JO',kind:'general',area:['all'],tags:['general','jobs','aggregator'],url:'https://fi.jooble.org/',search:'manual'},
    {id:'jobsfinland',name:'Jobs in Finland',mark:'JF',kind:'general',area:['all','technology','student'],tags:['international','english','professional','jobs'],url:'https://jobsfinland.fi/',search:'manual'},
    {id:'jobshelsinki',name:'Jobs in Helsinki',mark:'JH',kind:'general',area:['all'],tags:['helsinki','local','jobs'],url:'https://jobsinhelsinki.com/',search:'manual'},
    {id:'myjob',name:'MyJob.fi',mark:'MJ',kind:'general',area:['all'],tags:['local','general','jobs'],url:'https://myjob.fi/en',search:'manual'},
    {id:'jobportal',name:'Job Portal Finland',mark:'JP',kind:'general',area:['all'],tags:['local','general','jobs'],url:'https://www.jobsportal.fi/',search:'manual'},
    {id:'rekrytointi',name:'Rekrytointi.com',mark:'RC',kind:'general',area:['all'],tags:['finnish','general','jobs'],url:'https://www.rekrytointi.com/',search:'manual'},
    {id:'laura',name:'LAURA Recruitment',mark:'LA',kind:'agency',area:['all','technology','industry'],tags:['recruitment','staffing','professional','local'],url:'https://www.laura.fi/',search:'manual'},
    {id:'staffpoint',name:'StaffPoint',mark:'SP',kind:'agency',area:['hospitality','retail','industry','logistics'],tags:['staffing','hospitality','retail','logistics','events'],url:'https://www.staffpoint.fi/',search:'manual'},
    {id:'barona',name:'Barona',mark:'BA',kind:'agency',area:['cleaning','hospitality','logistics','industry','retail'],tags:['staffing','cleaning','restaurant','warehouse','industry','retail'],url:'https://barona.fi/',search:'manual'},
    {id:'eezy',name:'Eezy',mark:'EZ',kind:'agency',area:['hospitality','cleaning','logistics','industry'],tags:['staffing','services','hospitality','cleaning','warehouse'],url:'https://eezy.fi/',search:'manual'},
    {id:'bolt',name:'Bolt.Works',mark:'BW',kind:'agency',area:['cleaning','logistics','industry','construction'],tags:['staffing','construction','warehouse','cleaning','production'],url:'https://www.bolt.works/',search:'manual'},
    {id:'adecco',name:'Adecco Finland',mark:'AD',kind:'agency',area:['all','industry','technology'],tags:['staffing','professional','office','manufacturing'],url:'https://www.adecco.fi/',search:'manual'},
    {id:'manpower',name:'Manpower Finland',mark:'MP',kind:'agency',area:['all','technology','industry'],tags:['staffing','professional','office','manufacturing'],url:'https://www.manpower.fi/',search:'manual'},
    {id:'academicwork',name:'Academic Work',mark:'AW',kind:'agency',area:['technology','student'],tags:['graduates','students','technology','engineering','business'],url:'https://www.academicwork.fi/',search:'manual'},
    {id:'goon',name:'Go On',mark:'GO',kind:'agency',area:['hospitality','cleaning','logistics','industry'],tags:['staffing','hospitality','cleaning','production','warehouse'],url:'https://go-on.fi/',search:'manual'},
    {id:'seure',name:'Seure',mark:'SE',kind:'agency',area:['public-sector','education','healthcare','hospitality'],tags:['municipality','substitute','education','healthcare','cleaning','food services'],url:'https://www.seure.fi/',search:'manual'},
    {id:'sol',name:'SOL',mark:'SO',kind:'agency',area:['cleaning','hospitality'],tags:['cleaning','property','hospitality','services'],url:'https://www.sol.fi/tyopaikat',search:'manual'},
    {id:'iss',name:'ISS Finland',mark:'IS',kind:'agency',area:['cleaning','hospitality','industry'],tags:['cleaning','facilities','food','property','services'],url:'https://www.iss.fi/',search:'manual'},
    {id:'lt',name:'L&T',mark:'LT',kind:'agency',area:['cleaning','industry','logistics'],tags:['cleaning','property','environment','services'],url:'https://www.lt.fi/en/careers',search:'manual'},
    {id:'freska',name:'Freska',mark:'FR',kind:'employer',area:['cleaning'],tags:['cleaning','home services'],url:'https://www.freska.fi/',search:'manual'},
    {id:'nclean',name:'N-Clean',mark:'NC',kind:'employer',area:['cleaning','hospitality'],tags:['cleaning','hotel','services'],url:'https://nclean.fi/',search:'manual'},
    {id:'sryhma',name:'S Group · S-ryhmä',mark:'S',kind:'employer',area:['retail','hospitality','logistics'],tags:['retail','supermarket','restaurant','hotel','regional'],url:'https://s-ryhma.fi/en/work',search:'manual'},
    {id:'kesko',name:'K Group · Kesko',mark:'K',kind:'employer',area:['retail','logistics'],tags:['retail','supermarket','grocery','logistics'],url:'https://www.kesko.fi/tyopaikat/',search:'manual'},
    {id:'lidl',name:'Lidl Finland',mark:'LI',kind:'employer',area:['retail','logistics'],tags:['retail','supermarket','warehouse','logistics'],url:'https://tyopaikat.lidl.fi/',search:'manual'},
    {id:'tokmanni',name:'Tokmanni',mark:'TO',kind:'employer',area:['retail','logistics'],tags:['retail','store','warehouse','logistics'],url:'https://tyopaikat.tokmanni.fi/',search:'manual'},
    {id:'ikea',name:'IKEA Finland',mark:'IK',kind:'employer',area:['retail','logistics'],tags:['retail','store','customer service','warehouse'],url:'https://www.ikea.com/fi/en/this-is-ikea/work-with-us/',search:'manual'},
    {id:'jysk',name:'JYSK',mark:'JY',kind:'employer',area:['retail','logistics'],tags:['retail','store','warehouse'],url:'https://jysk.com/careers',search:'manual'},
    {id:'mcdonalds',name:'McDonald’s Finland',mark:'Mc',kind:'employer',area:['hospitality'],tags:['restaurant','food','part-time','summer'],url:'https://mcdonalds.fi/tyopaikat',search:'manual'},
    {id:'burgerking',name:'Burger King Finland',mark:'BK',kind:'employer',area:['hospitality'],tags:['restaurant','food','part-time','summer'],url:'https://burgerking.fi/tyopaikat',search:'manual'},
    {id:'hesburger',name:'Hesburger',mark:'HE',kind:'employer',area:['hospitality'],tags:['restaurant','food','part-time','summer'],url:'https://www.hesburger.fi/tyopaikat',search:'manual'},
    {id:'espressohouse',name:'Espresso House',mark:'EH',kind:'employer',area:['hospitality'],tags:['cafe','restaurant','food','part-time'],url:'https://fi.espressohouse.com/',search:'manual'},
    {id:'compass',name:'Compass Group Finland',mark:'CG',kind:'employer',area:['hospitality','education'],tags:['food','restaurant','school','workplace services'],url:'https://www.compass-group.fi/',search:'manual'},
    {id:'sodexo',name:'Sodexo Finland',mark:'SD',kind:'employer',area:['hospitality','cleaning'],tags:['food','facilities','cleaning','workplace services'],url:'https://fi.sodexo.com/',search:'manual'},
    {id:'posti',name:'Posti',mark:'PO',kind:'employer',area:['logistics'],tags:['delivery','postal','warehouse','logistics','summer'],url:'https://www.posti.com/careers',search:'manual'},
    {id:'woltcareers',name:'Wolt Careers',mark:'WO',kind:'employer',area:['technology','logistics'],tags:['technology','logistics','delivery','business'],url:'https://careers.wolt.com/en/jobs',search:'manual'},
    {id:'atria',name:'Atria',mark:'AT',kind:'employer',area:['industry'],tags:['food','manufacturing','production'],url:'https://www.atria.com/',search:'manual'},
    {id:'valio',name:'Valio',mark:'VA',kind:'employer',area:['industry','technology'],tags:['food','manufacturing','research','production'],url:'https://www.valio.fi/',search:'manual'},
    {id:'fazer',name:'Fazer',mark:'FZ',kind:'employer',area:['industry','hospitality'],tags:['food','manufacturing','restaurant','production'],url:'https://www.fazergroup.com/careers/',search:'manual'},
    {id:'vr',name:'VR Group',mark:'VR',kind:'employer',area:['logistics','technology'],tags:['rail','transport','engineering','customer service'],url:'https://www.vrgroup.fi/en/vrgroup/careers/',search:'manual'},
    {id:'finnair',name:'Finnair',mark:'FI',kind:'employer',area:['logistics','hospitality','technology'],tags:['aviation','airport','customer service','engineering'],url:'https://company.finnair.com/en/careers',search:'manual'},
    {id:'nokia',name:'Nokia',mark:'NO',kind:'employer',area:['technology','engineering'],tags:['technology','engineering','telecommunications','research'],url:'https://www.nokia.com/careers/',search:'manual'},
    {id:'kone',name:'KONE',mark:'KN',kind:'employer',area:['technology','engineering','industry'],tags:['engineering','technology','maintenance','manufacturing'],url:'https://www.kone.com/en/careers/',search:'manual'},
    {id:'thehub',name:'The Hub · Finland',mark:'TH',kind:'student',area:['technology','student'],tags:['startup','technology','graduates','students','business'],url:'https://thehub.io/jobs?countryCode=FI',search:'manual'},
    {id:'jobteaser',name:'JobTeaser',mark:'JT',kind:'student',area:['student'],tags:['students','graduates','internships','university'],url:'https://www.jobteaser.com/en',search:'manual'},
    {id:'gamesjobs',name:'Games Jobs Finland',mark:'GJ',kind:'student',area:['technology','student'],tags:['games','technology','creative','students'],url:'https://gamesjobs.fi/',search:'manual'},
    {id:'aarresaari',name:'Aarresaari · University careers',mark:'AA',kind:'student',area:['student','education','technology'],tags:['universities','research','academic','students','graduates'],url:'https://www.aarresaari.net/',search:'manual'},
    {id:'tuudo',name:'Tuudo',mark:'TU',kind:'student',area:['student'],tags:['students','internship','university','summer'],url:'https://www.tuudo.fi/',search:'manual'},
    {id:'helsinki',name:'City of Helsinki careers',mark:'HE',kind:'public',area:['public-sector','education','healthcare','technology'],tags:['municipality','city','education','healthcare','public'],url:'https://www.hel.fi/en/open-jobs',search:'manual'},
    {id:'tampere',name:'Working in Tampere · city guide',mark:'TA',kind:'public',area:['public-sector','education','technology'],tags:['municipality','city','public','education','employment information'],url:'https://www.tampere.fi/en/relocation-guide-tampere/working-tampere',search:'manual'},
    {id:'pori',name:'City of Pori · jobs',mark:'PR',kind:'public',area:['public-sector','education','healthcare'],tags:['municipality','city','public','education','careers'],url:'https://www.pori.fi/en/studying-in-pori/career-opportunities/jobs/',search:'manual'},
    {id:'seinajoki',name:'Jobs at the City of Seinäjoki',mark:'SE',kind:'public',area:['public-sector','education','healthcare'],tags:['municipality','city','public','education','careers'],url:'https://www.seinajoki.fi/asukkaaksi/en/work-and-entrepreneurship/to-work-in-seinajoki/jobs-at-the-city-of-seinajoki/',search:'manual'},
    {id:'scandic',name:'Scandic Hotels Finland',mark:'SC',kind:'employer',area:['hospitality'],tags:['hotel','hospitality','restaurant','cleaning'],url:'https://www.scandichotelsgroup.com/career/',search:'manual'},
    {id:'sodexo-careers',name:'Sodexo careers',mark:'SD',kind:'employer',area:['hospitality','cleaning'],tags:['food','facilities','cleaning','services'],url:'https://www.sodexo.com/careers',search:'manual'}
  ];

  const words = {
    en: {skip:'Skip to content',navHome:'Home',navLearn:'Learn Finnish',navJobs:'Find a job',navSources:'Job sources',navCareer:'Career guide',myJobs:'My jobs',language:'Interface language',heroKicker:'WORK · GROW · BELONG',heroTitle:'Find your next step <em>in Finland.</em>',heroIntro:'Search trusted job websites from one place. When you find a real opening, save its original link and keep your application steps together.',heroBadge1:'Original job sources',heroBadge2:'Private, on-device job list',artCaption:'Find a path that feels like yours.',keywordLabel:'Job title, skill or employer',keywordHint:'e.g. cleaner, nurse, warehouse',cityLabel:'City or region',anywhere:'Anywhere in Finland',otherCities:'Other cities',typeLabel:'Employment type',anyType:'Any type',fullTime:'Full-time',partTime:'Part-time',seasonal:'Seasonal / summer',internship:'Internship / trainee',temporary:'Temporary',searchButton:'Find matching sources',popular:'Popular:',quickClean:'Cleaning',quickWarehouse:'Warehouse',quickRestaurant:'Restaurant',quickSummer:'Summer jobs',quickInternship:'Internships',saveSearch:'Save this search',searchHint:'Your search is used to find relevant sources. Live vacancies open on the source’s own website.',trustTitle:'Real job listings stay at their source',trustText:'Kielo currently searches and organizes job-source websites; it does not yet import vacancy feeds. You’ll see the original live listing after opening a source. Job counts and salary details are never guessed.',apiInfo:'About source access ↗',refine:'REFINE SOURCES',filters:'Filters',clear:'Clear',sourceType:'Source type',generalBoards:'Job boards',publicServices:'Public services',agencies:'Recruitment agencies',employers:'Employer careers',students:'Students & graduates',focusArea:'Focus area',allAreas:'All areas',focusCleaning:'Cleaning & facilities',focusHospitality:'Restaurants & hospitality',focusLogistics:'Logistics & warehouse',focusRetail:'Retail & supermarkets',focusTech:'Technology & business',focusPublic:'Public sector',focusIndustry:'Industry & manufacturing',filterNote:'These filters help you choose a useful source. The source website controls its own vacancy filters.',sourceDirectory:'FINNISH JOB SOURCE DIRECTORY',resultsTitle:'Start with a trusted source',resultsIntro:'Choose a job board, public service, recruiter or employer. Openings and applications are handled by each original website.',noSourcesTitle:'No sources match these filters',noSourcesText:'Clear one filter or try a broader search. Job listings are not stored here.',resultsNote:'Vacancy details, language requirements, deadlines and application links should always be checked on the original advert.',savedOnDevice:'SAVED ON THIS DEVICE',savedSearches:'Your saved searches',savedSearchText:'Keep useful search details close by. These are reminders only; no background alerts are sent.',prepare:'PREPARE WITH CONFIDENCE',careerTitle:'A few useful next steps',careerTipOne:'Read the employer and role carefully before applying.',careerTipTwo:'Prepare a CV and a short application that match the position.',careerTipThree:'Recruitment services should not charge job seekers a fee.',officialGuide:'Read the official job-search guide',languageForWork:'FINNISH FOR WORK',workplace:'workplace',phraseTranslation:'I am interested in this job.',learnWorkFinnish:'Learn Finnish for work',browseAll:'BROWSE BY FIELD',directoryTitle:'Explore more places to look',directoryIntro:'A growing directory of Finnish job boards, recruiters and employer career pages. Kielo links to these sources; it does not claim their listings are connected.',searchDirectory:'Search the source directory',directoryHint:'Search sources or fields…',allSourceTypes:'All source types',all:'All',yourJourney:'YOUR JOB JOURNEY',trackerTitle:'Keep your applications together',trackerIntro:'Save a real job by pasting its original vacancy link. Add a private note or update its status as you go.',addJob:'Save a job link',privacyLocal:'Your saved jobs, notes and searches stay in this browser on this device. Kielo does not send them to an account or server.',exportData:'Export my data',trackerEmptyTitle:'Your list is ready when you are',trackerEmptyText:'When a source has an opening you like, add its exact link here. It will appear in your private application tracker.',addFirstJob:'Add my first job',importData:'Import a Kielo backup',safetyTitle:'A safe search is a better search',safetyText:'Check the employer and original vacancy before sharing personal information. Official guidance says employment services are free for job seekers—be cautious if anyone asks you to pay to access a job.',safetyLink:'Official guidance ↗',footerText:'Find work. Learn Finnish. Make a life in Finland.',localOnly:'PRIVATE · SAVED ON THIS DEVICE',modalTitle:'Add a real job to your list',jobTitleLabel:'Job title',employerLabel:'Employer (optional)',locationLabel:'City (optional)',originalLinkLabel:'Original vacancy link',notesLabel:'Private note (optional)',saveJob:'Save to my job list',httpsOnly:'Use the exact HTTPS link from the employer or job source. Notes remain only in this browser.',countSuffix:'sources',openSource:'Open source',openSearch:'Search this source',copyQuery:'Copy search',linkOnly:'Browse source · not connected',sourceApi:'API access required',sourceNoteInternational:'For international professionals. Check language requirements on each advert.',sourceNoteKuntarekry:'Public-sector recruitment. Most adverts are in Finnish or Swedish.',sourceNoteApi:'Official job service. Partner API access requires KEHA Centre activation and credentials.',sourceNoteGeneral:'Search the source website for current openings.',sourceNoteAgency:'Browse current opportunities from this recruiter.',sourceNoteEmployer:'Browse this employer’s own career page.',sourceNoteStudent:'Find internships, graduate roles or university opportunities.',kindGeneral:'JOB BOARD',kindPublic:'PUBLIC SERVICE',kindAgency:'RECRUITMENT',kindEmployer:'EMPLOYER CAREERS',kindStudent:'STUDENT & GRADUATE',searchDone:'Search saved on this device. No email or background alerts are sent.',searchDup:'This search is already saved.',searchDeleted:'Saved search removed.',searchEmpty:'Choose a keyword or filter before saving a search.',jobSaved:'Job link saved on this device.',jobRemoved:'Job removed from your device.',statusSaved:'Saved',statusApplied:'Applied',statusInterview:'Interview',statusOffer:'Offer',statusClosed:'Closed',statusLabel:'Status',editStatus:'Update status',needHttps:'Please enter a secure HTTPS link to the original job advert.',importDone:'Your Kielo backup has been imported.',importError:'This file is not a valid Kielo job-search backup.',exportDone:'Your private job data has been exported.',copyDone:'Search copied. Paste it into the source search box.',copyFail:'Copy was blocked. Use the search text shown above.',noKeyword:'Use the job title, skill, city or work type in the source search box.',confirmRemove:'Remove this saved job and its private notes from this device?',confirmImport:'Import this backup and replace the job-search data on this device?',directoryNoResults:'No source sites match that search.',apiStatus:'Approval needed for live import',statusLocal:'Saved only in this browser',filterSearch:'Sources suited to your search',searchResultsFor:'Showing source websites for',savedLabel:'Saved',savedApply:'Open original advert',savedByKielo:'Saved privately on this device',apiPending:'API access has not been configured in Kielo yet.',guideMore:'Official job-search guide',exportName:'kielo-job-data.json',sourceQueryExplainer:'This source can receive your search terms in its own search box. Location and role are sent as one query.'},
    fi: {skip:'Siirry sisältöön',navHome:'Etusivu',navLearn:'Opiskele suomea',navJobs:'Etsi työtä',navSources:'Työnhakupalvelut',navCareer:'Työopas',myJobs:'Omat työpaikat',language:'Käyttöliittymän kieli',heroKicker:'TYÖ · KASVU · KUULUMINEN',heroTitle:'Löydä seuraava askel <em>Suomesta.</em>',heroIntro:'Hae luotettavia suomalaisia työnhakusivustoja yhdestä paikasta. Kun löydät kiinnostavan paikan, tallenna alkuperäinen linkki ja pidä hakusi järjestyksessä.',heroBadge1:'Alkuperäiset työnhakupalvelut',heroBadge2:'Yksityinen lista omalla laitteella',artCaption:'Löydä itsellesi sopiva suunta.',keywordLabel:'Tehtävä, osaaminen tai työnantaja',keywordHint:'esim. siivooja, sairaanhoitaja, varasto',cityLabel:'Kaupunki tai alue',anywhere:'Kaikkialla Suomessa',otherCities:'Muut kaupungit',typeLabel:'Työsuhteen tyyppi',anyType:'Kaikki tyypit',fullTime:'Kokoaikainen',partTime:'Osa-aikainen',seasonal:'Kausi- / kesätyö',internship:'Harjoittelu',temporary:'Määräaikainen',searchButton:'Etsi sopivia lähteitä',popular:'Suosittuja:',quickClean:'Siivous',quickWarehouse:'Varasto',quickRestaurant:'Ravintola',quickSummer:'Kesätyöt',quickInternship:'Harjoittelut',saveSearch:'Tallenna haku',searchHint:'Hakuehdot auttavat löytämään sopivia lähteitä. Avoimet työpaikat avautuvat alkuperäisellä sivustolla.',trustTitle:'Työpaikkailmoitus säilyy alkuperäisellä sivustolla',trustText:'Kielo auttaa etsimään ja järjestämään työnhakupalveluja, mutta ei vielä tuo niiden ilmoituksia omaan tietokantaan. Näet alkuperäisen ilmoituksen lähdesivustolla. Ilmoitusmääriä tai palkkoja ei arvata.',apiInfo:'Tietoa lähteiden käytöstä ↗',refine:'RAJAA LÄHTEITÄ',filters:'Suodattimet',clear:'Tyhjennä',sourceType:'Lähteen tyyppi',generalBoards:'Työpaikkasivustot',publicServices:'Julkiset palvelut',agencies:'Rekrytointiyritykset',employers:'Työnantajien urasivut',students:'Opiskelijat ja vastavalmistuneet',focusArea:'Ala',allAreas:'Kaikki alat',focusCleaning:'Siivous ja kiinteistöpalvelut',focusHospitality:'Ravintolat ja majoitus',focusLogistics:'Logistiikka ja varasto',focusRetail:'Kauppa ja supermarketit',focusTech:'Teknologia ja liiketoiminta',focusPublic:'Julkinen sektori',focusIndustry:'Teollisuus ja tuotanto',filterNote:'Suodattimet auttavat valitsemaan sopivan lähteen. Ilmoituksia rajataan lähdesivustolla.',sourceDirectory:'SUOMALAISET TYÖNHAKULÄHTEET',resultsTitle:'Aloita luotettavasta lähteestä',resultsIntro:'Valitse työpaikkasivusto, julkinen palvelu, rekrytoija tai työnantaja. Ilmoitukset ja hakemukset käsitellään alkuperäisellä sivustolla.',noSourcesTitle:'Suodattimilla ei löytynyt lähteitä',noSourcesText:'Poista suodatin tai kokeile laajempaa hakua. Työpaikkailmoituksia ei tallenneta Kieloon.',resultsNote:'Tarkista työpaikan tiedot, kielivaatimukset, määräaika ja hakulinkki aina alkuperäisestä ilmoituksesta.',savedOnDevice:'TALLENNETTU TÄLLE LAITTEELLE',savedSearches:'Tallennetut haut',savedSearchText:'Pidä tärkeät hakuehdot tallessa. Ne ovat muistutuksia; taustailmoituksia ei lähetetä.',prepare:'VALMISTAUDU RAUHASSA',careerTitle:'Muutama hyvä seuraava askel',careerTipOne:'Tutustu työnantajaan ja tehtävään ennen hakemista.',careerTipTwo:'Valmistele tehtävään sopiva ansioluettelo ja hakemus.',careerTipThree:'Rekrytointipalvelut ovat työnhakijalle maksuttomia.',officialGuide:'Lue virallinen työnhakuopas',languageForWork:'SUOMEA TYÖELÄMÄÄN',workplace:'työpaikka',phraseTranslation:'Olen kiinnostunut tästä työpaikasta.',learnWorkFinnish:'Opiskele suomea työnhakuun',browseAll:'Selaa aloittain',directoryTitle:'Tutustu muihin hakupaikkoihin',directoryIntro:'Kasvava hakemisto suomalaisista työpaikkasivustoista, rekrytoijista ja työnantajien urasivuista. Kielo linkittää palveluihin, mutta ei väitä niiden ilmoitusten olevan yhdistettyjä.',searchDirectory:'Hae lähdehakemistosta',directoryHint:'Hae lähteitä tai aloja…',allSourceTypes:'Kaikki lähdetyypit',all:'Kaikki',yourJourney:'TYÖNHAKUSI',trackerTitle:'Pidä hakemukset yhdessä paikassa',trackerIntro:'Tallenna kiinnostava työpaikka lisäämällä alkuperäinen ilmoituslinkki. Lisää oma muistiinpano tai päivitä hakemuksen tila.',addJob:'Tallenna työpaikkalinkki',privacyLocal:'Tallennetut työpaikat, muistiinpanot ja haut säilyvät tässä selaimessa omalla laitteellasi. Kielo ei lähetä niitä palvelimelle.',exportData:'Vie tietoni',trackerEmptyTitle:'Lista odottaa sinua',trackerEmptyText:'Kun löydät kiinnostavan paikan, lisää sen tarkka linkki tähän. Se näkyy yksityisessä hakemusseurannassasi.',addFirstJob:'Lisää ensimmäinen työpaikka',importData:'Tuo Kielo-varmuuskopio',safetyTitle:'Turvallinen työnhaku on parempaa työnhakua',safetyText:'Tarkista työnantaja ja alkuperäinen ilmoitus ennen henkilötietojen jakamista. Virallisen ohjeen mukaan työnhakupalvelut ovat työnhakijalle maksuttomia—varo maksua työpaikan saamiseksi.',safetyLink:'Viralliset ohjeet ↗',footerText:'Etsi työtä. Opiskele suomea. Rakenna elämää Suomessa.',localOnly:'YKSITYINEN · TALLENNETTU TÄLLE LAITTEELLE',modalTitle:'Lisää oikea työpaikka listallesi',jobTitleLabel:'Tehtävänimike',employerLabel:'Työnantaja (valinnainen)',locationLabel:'Kaupunki (valinnainen)',originalLinkLabel:'Alkuperäisen ilmoituksen linkki',notesLabel:'Oma muistiinpano (valinnainen)',saveJob:'Tallenna työpaikkalistaani',httpsOnly:'Käytä työnantajan tai lähdesivuston tarkkaa HTTPS-linkkiä. Muistiinpanot säilyvät vain tässä selaimessa.',countSuffix:'lähdettä',openSource:'Avaa lähde',openSearch:'Hae tästä lähteestä',copyQuery:'Kopioi haku',linkOnly:'Lähdesivu · ei yhdistetty',sourceApi:'API-yhteys vaaditaan',sourceNoteInternational:'Kansainvälisille osaajille. Tarkista jokaisen ilmoituksen kielivaatimukset.',sourceNoteKuntarekry:'Julkisen sektorin rekrytointi. Useimmat ilmoitukset ovat suomeksi tai ruotsiksi.',sourceNoteApi:'Julkinen työnhakupalvelu. Kumppani-API vaatii KEHA-keskuksen aktivoinnin ja tunnukset.',sourceNoteGeneral:'Etsi avoimia työpaikkoja lähdesivustolta.',sourceNoteAgency:'Tutustu tämän rekrytoijan avoimiin paikkoihin.',sourceNoteEmployer:'Tutustu työnantajan omaan urasivuun.',sourceNoteStudent:'Etsi harjoitteluja, vastavalmistuneiden tai yliopistojen mahdollisuuksia.',kindGeneral:'TYÖPAIKKASIVUSTO',kindPublic:'JULKINEN PALVELU',kindAgency:'REKRYTOINTI',kindEmployer:'TYÖNANTAJAN URASIVU',kindStudent:'OPISKELIJAT JA VASTAVALMISTUNEET',searchDone:'Haku tallennettiin tälle laitteelle. Sähköpostia tai taustailmoituksia ei lähetetä.',searchDup:'Tämä haku on jo tallennettu.',searchDeleted:'Tallennettu haku poistettiin.',searchEmpty:'Valitse hakusana tai suodatin ennen haun tallentamista.',jobSaved:'Työpaikkalinkki tallennettiin tälle laitteelle.',jobRemoved:'Työpaikka poistettiin tältä laitteelta.',statusSaved:'Tallennettu',statusApplied:'Haettu',statusInterview:'Haastattelu',statusOffer:'Tarjous',statusClosed:'Suljettu',statusLabel:'Tila',editStatus:'Päivitä tila',needHttps:'Lisää turvallinen HTTPS-linkki alkuperäiseen työpaikkailmoitukseen.',importDone:'Kielo-varmuuskopio tuotiin.',importError:'Tämä tiedosto ei ole kelvollinen Kielo-työnhakuvaiheen varmuuskopio.',exportDone:'Yksityiset työnhakutietosi vietiin.',copyDone:'Haku kopioitiin. Liitä se lähdesivuston hakukenttään.',copyFail:'Kopiointi estyi. Käytä yllä näkyviä hakuehtoja.',noKeyword:'Kirjoita tehtävä, taito, kaupunki tai työsuhteen tyyppi lähdesivuston hakukenttään.',confirmRemove:'Poistetaanko tallennettu työpaikka ja sen muistiinpanot tältä laitteelta?',confirmImport:'Tuodaanko tämä varmuuskopio ja korvataanko tämän laitteen nykyiset työnhakutiedot?',directoryNoResults:'Lähdehakemistosta ei löytynyt osumia.',apiStatus:'Lupa tarvitaan live-tuontiin',statusLocal:'Tallennettu vain tässä selaimessa',filterSearch:'Hakuun sopivat lähteet',searchResultsFor:'Lähdesivustot haulle',savedLabel:'Tallennettu',savedApply:'Avaa alkuperäinen ilmoitus',savedByKielo:'Tallennettu yksityisesti tälle laitteelle',apiPending:'Kielo ei ole vielä saanut API-yhteyttä.',guideMore:'Virallinen työnhakuopas',exportName:'kielo-tyonhaku.json',sourceQueryExplainer:'Hakusanat avautuvat tämän lähteen omassa hakukentässä. Kaupunki ja tehtävä lähetetään yhtenä hakuna.'},
    bn: {skip:'মূল কনটেন্টে যান',navHome:'হোম',navLearn:'ফিনিশ শিখুন',navJobs:'চাকরি খুঁজুন',navSources:'চাকরির সাইট',navCareer:'ক্যারিয়ার গাইড',myJobs:'আমার চাকরি',language:'ইন্টারফেসের ভাষা',heroKicker:'কাজ · এগিয়ে চলা · আপন হওয়া',heroTitle:'ফিনল্যান্ডে <em>আপনার পরের ধাপ খুঁজুন।</em>',heroIntro:'এক জায়গা থেকে ফিনল্যান্ডের বিশ্বস্ত চাকরির সাইট খুঁজুন। পছন্দের আসল চাকরিটি পেলে তার মূল লিংক সংরক্ষণ করুন এবং আবেদনের ধাপগুলো গুছিয়ে রাখুন।',heroBadge1:'মূল চাকরির সাইট',heroBadge2:'নিজের ডিভাইসে ব্যক্তিগত তালিকা',artCaption:'আপনার উপযোগী পথটি খুঁজুন।',keywordLabel:'পদ, দক্ষতা বা নিয়োগদাতা',keywordHint:'যেমন: পরিচ্ছন্নতাকর্মী, নার্স, গুদাম',cityLabel:'শহর বা অঞ্চল',anywhere:'ফিনল্যান্ডের যেকোনো স্থান',otherCities:'অন্যান্য শহর',typeLabel:'চাকরির ধরন',anyType:'যেকোনো ধরন',fullTime:'পূর্ণকালীন',partTime:'খণ্ডকালীন',seasonal:'মৌসুমি / গ্রীষ্মকালীন',internship:'ইন্টার্নশিপ / প্রশিক্ষণার্থী',temporary:'অস্থায়ী',searchButton:'মিল থাকা সাইট খুঁজুন',popular:'জনপ্রিয়:',quickClean:'পরিচ্ছন্নতা',quickWarehouse:'গুদাম',quickRestaurant:'রেস্তোরাঁ',quickSummer:'গ্রীষ্মকালীন কাজ',quickInternship:'ইন্টার্নশিপ',saveSearch:'এই সার্চ সংরক্ষণ',searchHint:'আপনার পছন্দ অনুযায়ী প্রাসঙ্গিক সাইট দেখানো হবে। আসল চাকরির বিজ্ঞপ্তি সংশ্লিষ্ট সাইটে খুলবে।',trustTitle:'আসল চাকরির বিজ্ঞপ্তি মূল সাইটেই থাকে',trustText:'Kielo এখন চাকরির সাইট খুঁজে সাজায়, তবে তাদের বিজ্ঞপ্তি নিজের ডেটাবেসে আনে না। কোনো সাইট খুললে সেখানকার আসল বিজ্ঞপ্তি দেখতে পাবেন। চাকরির সংখ্যা বা বেতনের তথ্য অনুমান করে দেখানো হয় না।',apiInfo:'সাইটের ডেটা ব্যবহারের তথ্য ↗',refine:'সাইট বাছাই করুন',filters:'ফিল্টার',clear:'মুছুন',sourceType:'সাইটের ধরন',generalBoards:'চাকরির বোর্ড',publicServices:'সরকারি সেবা',agencies:'নিয়োগ সংস্থা',employers:'কোম্পানির ক্যারিয়ার পেজ',students:'শিক্ষার্থী ও নতুন গ্র্যাজুয়েট',focusArea:'কাজের ক্ষেত্র',allAreas:'সব ক্ষেত্র',focusCleaning:'পরিচ্ছন্নতা ও ভবনসেবা',focusHospitality:'রেস্তোরাঁ ও আতিথেয়তা',focusLogistics:'লজিস্টিকস ও গুদাম',focusRetail:'দোকান ও সুপারমার্কেট',focusTech:'প্রযুক্তি ও ব্যবসা',focusPublic:'সরকারি খাত',focusIndustry:'শিল্প ও উৎপাদন',filterNote:'এই ফিল্টারগুলো কাজের সাইট বেছে নিতে সাহায্য করে। আসল চাকরির বিজ্ঞপ্তি ফিল্টার করে মূল সাইট।',sourceDirectory:'ফিনল্যান্ডের চাকরির সাইট',resultsTitle:'বিশ্বস্ত সাইট থেকে শুরু করুন',resultsIntro:'চাকরির বোর্ড, সরকারি সেবা, নিয়োগ সংস্থা বা কোম্পানি বেছে নিন। বিজ্ঞপ্তি ও আবেদন মূল সাইটেই পরিচালিত হয়।',noSourcesTitle:'এই ফিল্টারে কোনো সাইট মেলেনি',noSourcesText:'একটি ফিল্টার সরান বা একটু সাধারণভাবে খুঁজুন। চাকরির বিজ্ঞপ্তি Kielo-তে সংরক্ষণ করা হয় না।',resultsNote:'পদ, ভাষার চাহিদা, আবেদনের শেষ তারিখ ও লিংক মূল বিজ্ঞপ্তিতে যাচাই করে নিন।',savedOnDevice:'এই ডিভাইসে সংরক্ষিত',savedSearches:'আপনার সংরক্ষিত সার্চ',savedSearchText:'পছন্দের সার্চ মনে রাখুন। এগুলো শুধু রিমাইন্ডার; ব্যাকগ্রাউন্ডে কোনো অ্যালার্ট পাঠানো হয় না।',prepare:'প্রস্তুতি নিন আত্মবিশ্বাসে',careerTitle:'কিছু দরকারি পরের ধাপ',careerTipOne:'আবেদনের আগে নিয়োগদাতা ও পদের বিবরণ ভালো করে পড়ুন।',careerTipTwo:'পদের সঙ্গে মিলিয়ে CV ও সংক্ষিপ্ত আবেদনপত্র তৈরি করুন।',careerTipThree:'চাকরিপ্রার্থীর কাছ থেকে নিয়োগ সেবার ফি নেওয়ার কথা নয়।',officialGuide:'সরকারি চাকরি-খোঁজার গাইড পড়ুন',languageForWork:'কাজের জন্য ফিনিশ',workplace:'কর্মস্থল',phraseTranslation:'আমি এই চাকরিটিতে আগ্রহী।',learnWorkFinnish:'কাজের জন্য ফিনিশ শিখুন',browseAll:'কাজের ক্ষেত্র অনুযায়ী দেখুন',directoryTitle:'আরও চাকরির সাইট দেখুন',directoryIntro:'ফিনল্যান্ডের চাকরির বোর্ড, নিয়োগ সংস্থা ও কোম্পানির ক্যারিয়ার পেজের বাড়তে থাকা ডিরেক্টরি। Kielo শুধু সাইটের লিংক দেয়; তাদের বিজ্ঞপ্তি যুক্ত আছে এমন দাবি করে না।',searchDirectory:'চাকরির সাইট খুঁজুন',directoryHint:'সাইট বা কাজের ক্ষেত্র লিখুন…',allSourceTypes:'সব ধরনের সাইট',all:'সব',yourJourney:'আপনার চাকরির যাত্রা',trackerTitle:'আবেদনগুলো এক জায়গায় রাখুন',trackerIntro:'আসল বিজ্ঞপ্তির লিংক দিয়ে পছন্দের চাকরি সংরক্ষণ করুন। নিজের নোট যোগ করুন বা আবেদনের অবস্থা আপডেট করুন।',addJob:'চাকরির লিংক সংরক্ষণ',privacyLocal:'আপনার চাকরি, নোট ও সার্চ এই ডিভাইসের এই ব্রাউজারেই থাকবে। Kielo এগুলো কোনো অ্যাকাউন্ট বা সার্ভারে পাঠায় না।',exportData:'আমার তথ্য export',trackerEmptyTitle:'আপনার তালিকা প্রস্তুত',trackerEmptyText:'চাকরির সাইটে পছন্দের পদ পেলে তার আসল লিংক এখানে যোগ করুন। আপনার ব্যক্তিগত আবেদন-তালিকায় দেখা যাবে।',addFirstJob:'প্রথম চাকরি যোগ করুন',importData:'Kielo backup import',safetyTitle:'নিরাপদে চাকরি খুঁজুন',safetyText:'ব্যক্তিগত তথ্য দেওয়ার আগে নিয়োগদাতা ও আসল বিজ্ঞপ্তি যাচাই করুন। সরকারি নির্দেশনা অনুযায়ী চাকরিপ্রার্থীর জন্য চাকরির সেবা বিনামূল্যে—চাকরির জন্য টাকা চাইলে সতর্ক হোন।',safetyLink:'সরকারি নির্দেশনা ↗',footerText:'চাকরি খুঁজুন। ফিনিশ শিখুন। ফিনল্যান্ডে জীবন গড়ুন।',localOnly:'ব্যক্তিগত · এই ডিভাইসে সংরক্ষিত',modalTitle:'আসল চাকরি আপনার তালিকায় যোগ করুন',jobTitleLabel:'পদের নাম',employerLabel:'নিয়োগদাতা (ঐচ্ছিক)',locationLabel:'শহর (ঐচ্ছিক)',originalLinkLabel:'আসল বিজ্ঞপ্তির লিংক',notesLabel:'ব্যক্তিগত নোট (ঐচ্ছিক)',saveJob:'আমার চাকরির তালিকায় রাখুন',httpsOnly:'নিয়োগদাতা বা চাকরির সাইটের আসল HTTPS লিংক দিন। নোট এই ব্রাউজারেই থাকবে।',countSuffix:'টি সাইট',openSource:'সাইট খুলুন',openSearch:'এই সাইটে সার্চ',copyQuery:'সার্চ কপি করুন',linkOnly:'সাইট দেখুন · সংযুক্ত নয়',sourceApi:'API access দরকার',sourceNoteInternational:'আন্তর্জাতিক পেশাজীবীদের জন্য। প্রতিটি বিজ্ঞপ্তির ভাষার শর্ত দেখে নিন।',sourceNoteKuntarekry:'সরকারি খাতের নিয়োগ। বেশিরভাগ বিজ্ঞপ্তি Finnish বা Swedish ভাষায়।',sourceNoteApi:'সরকারি চাকরি সেবা। Partner API-এর জন্য KEHA Centre-এর অনুমোদন ও credentials দরকার।',sourceNoteGeneral:'আসল চাকরি খুঁজতে মূল সাইটে যান।',sourceNoteAgency:'এই নিয়োগ সংস্থার বর্তমান সুযোগ দেখুন।',sourceNoteEmployer:'নিয়োগদাতার নিজস্ব ক্যারিয়ার পেজ দেখুন।',sourceNoteStudent:'ইন্টার্নশিপ, নতুন গ্র্যাজুয়েট বা বিশ্ববিদ্যালয়ের সুযোগ দেখুন।',kindGeneral:'চাকরির বোর্ড',kindPublic:'সরকারি সেবা',kindAgency:'নিয়োগ সংস্থা',kindEmployer:'কোম্পানির ক্যারিয়ার পেজ',kindStudent:'শিক্ষার্থী ও গ্র্যাজুয়েট',searchDone:'এই ডিভাইসে সার্চ সংরক্ষণ হয়েছে। ইমেইল বা ব্যাকগ্রাউন্ড অ্যালার্ট পাঠানো হয়নি।',searchDup:'এই সার্চটি আগে থেকেই আছে।',searchDeleted:'সংরক্ষিত সার্চ মুছে ফেলা হয়েছে।',searchEmpty:'সার্চ সংরক্ষণের আগে একটি পদ বা ফিল্টার বেছে নিন।',jobSaved:'চাকরির লিংক এই ডিভাইসে সংরক্ষিত হয়েছে।',jobRemoved:'চাকরিটি এই ডিভাইস থেকে সরানো হয়েছে।',statusSaved:'সংরক্ষিত',statusApplied:'আবেদন করেছি',statusInterview:'সাক্ষাৎকার',statusOffer:'অফার',statusClosed:'বন্ধ',statusLabel:'অবস্থা',editStatus:'অবস্থা আপডেট',needHttps:'আসল চাকরির বিজ্ঞপ্তির নিরাপদ HTTPS লিংক দিন।',importDone:'Kielo backup import হয়েছে।',importError:'এই ফাইলটি সঠিক Kielo job-search backup নয়।',exportDone:'আপনার ব্যক্তিগত চাকরির তথ্য export করা হয়েছে।',copyDone:'সার্চ কপি হয়েছে। মূল সাইটের সার্চ বক্সে paste করুন।',copyFail:'কপি করা যায়নি। উপরে দেখানো সার্চের শব্দ ব্যবহার করুন।',noKeyword:'মূল সাইটের সার্চ বক্সে পদের নাম, দক্ষতা, শহর বা কাজের ধরন লিখুন।',confirmRemove:'এই চাকরি ও ব্যক্তিগত নোট এই ডিভাইস থেকে মুছে দেব?',confirmImport:'এই backup import করে এই ডিভাইসের বর্তমান চাকরির তথ্য বদলে দেব?',directoryNoResults:'এই শব্দে কোনো সাইট মেলেনি।',apiStatus:'Live import-এর অনুমোদন প্রয়োজন',statusLocal:'শুধু এই ব্রাউজারে সংরক্ষিত',filterSearch:'সার্চের জন্য মানানসই সাইট',searchResultsFor:'এই সার্চের সাইট',savedLabel:'সংরক্ষিত',savedApply:'আসল বিজ্ঞপ্তি খুলুন',savedByKielo:'এই ডিভাইসে ব্যক্তিগতভাবে সংরক্ষিত',apiPending:'Kielo-তে এখনো API access সেট করা হয়নি।',guideMore:'সরকারি চাকরি-খোঁজার গাইড',exportName:'kielo-job-data.json',sourceQueryExplainer:'এই সাইটে সার্চের শব্দ পাঠানো যাবে। শহর ও পদের নাম একসঙ্গে সার্চ হবে।'}
  };

  words.en.otherCityHint = 'Type a Finnish city';
  words.fi.otherCityHint = 'Kirjoita suomalainen kaupunki';
  words.bn.otherCityHint = 'ফিনল্যান্ডের শহরের নাম লিখুন';
  words.en.sourceNotePublic = 'Open this public source for job information and current vacancy links.';
  words.fi.sourceNotePublic = 'Avaa julkinen lähde työnhakutietoja ja työpaikkalinkkejä varten.';
  words.bn.sourceNotePublic = 'চাকরির তথ্য ও আসল বিজ্ঞপ্তির লিংকের জন্য সরকারি সাইটটি খুলুন।';
  words.en.storageError = 'This browser could not save your data. Export an existing backup before clearing site data.';
  words.fi.storageError = 'Selain ei voinut tallentaa tietoja. Vie varmuuskopio ennen sivuston tietojen tyhjentämistä.';
  words.bn.storageError = 'এই ব্রাউজারে তথ্য সংরক্ষণ করা যায়নি। সাইটের তথ্য মুছার আগে backup export করুন।';
  words.en.removeJob = 'Remove';
  words.fi.removeJob = 'Poista';
  words.bn.removeJob = 'সরান';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
  const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; } catch { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { toast(current().storageError || 'Could not save on this device.'); return false; } };
  const id = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  let language = read(KEYS.language, 'en');
  let savedSearches = read(KEYS.searches, []);
  let trackedJobs = read(KEYS.records, []);
  let search = { keyword: '', city: '', type: '', focus: '' };
  let toastTimer;
  let modalReturnFocus = null;
  const current = () => words[language] || words.en;

  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 3200);
  }

  function translate() {
    const dict = current();
    document.documentElement.lang = language === 'bn' ? 'bn' : language;
    $$('[data-i18n]').forEach(node => { const value = dict[node.dataset.i18n]; if (value) node.textContent = value; });
    $$('[data-i18n-html]').forEach(node => { const value = dict[node.dataset.i18nHtml]; if (value) node.innerHTML = value; });
    $$('[data-i18n-placeholder]').forEach(node => { const value = dict[node.dataset.i18nPlaceholder]; if (value) node.placeholder = value; });
    $('#ui-language').value = language;
    document.title = `${dict.navJobs} · Kielo`;
    renderSourceResults();
    renderDirectory();
    renderSavedSearches();
    renderTracker();
    renderActiveSearch();
  }

  function criteriaText(criteria = search) {
    const bits = [criteria.keyword, criteria.city, criteria.type ? current()[criteria.type] || criteria.type : '', criteria.focus ? current()[`focus${criteria.focus[0].toUpperCase()}${criteria.focus.slice(1)}`] || criteria.focus : ''].filter(Boolean);
    return bits.join(' · ');
  }

  function readForm() {
    return {
      keyword: $('#job-keyword').value.trim(),
      city: $('#job-city').value === 'other' ? $('#other-city').value.trim() : $('#job-city').value,
      type: $('#job-type').value,
      focus: $('#focus-filter').value
    };
  }

  function setForm(criteria) {
    $('#job-keyword').value = criteria.keyword || '';
    const cityValues = [...$('#job-city').options].map(option => option.value);
    const knownCity = !criteria.city || cityValues.includes(criteria.city);
    $('#job-city').value = knownCity ? criteria.city || '' : 'other';
    $('#other-city').value = knownCity ? '' : criteria.city;
    $('#other-city-shell').hidden = knownCity;
    $('#job-type').value = criteria.type || '';
    $('#focus-filter').value = criteria.focus || '';
    search = { ...search, ...criteria };
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (search.keyword) params.set('q', search.keyword);
    if (search.city) params.set('city', search.city);
    if (search.type) params.set('type', search.type);
    if (search.focus) params.set('focus', search.focus);
    const suffix = params.toString();
    history.replaceState(null, '', `${location.pathname}${suffix ? `?${suffix}` : ''}${location.hash}`);
  }

  function runSearch({ scroll = true, updateHistory = true } = {}) {
    search = readForm();
    if (updateHistory) updateUrl();
    renderSourceResults();
    renderActiveSearch();
    const hint = $('#search-hint');
    hint.textContent = search.keyword || search.city || search.type || search.focus
      ? `${current().filterSearch}: ${criteriaText()}. ${current().searchHint}`
      : current().searchHint;
    if (scroll) $('#job-sources').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function selectedKinds() { return $$('[data-source-filter]:checked').map(input => input.value); }

  function matchesSource(source, criteria, kinds = selectedKinds()) {
    if (kinds.length && !kinds.includes(source.kind)) return false;
    if (source.id === 'tyomarkkinatori') return true;
    if (criteria.focus && !source.area.includes('all') && !source.area.includes(criteria.focus)) return false;
    if (criteria.focus && source.area.includes('all')) return true;
    const terms = normalize(`${criteria.keyword} ${criteria.city} ${criteria.type}`).split(/\s+/).filter(Boolean);
    if (!terms.length || source.kind === 'general' || source.id === 'workinfinland') return true;
    const haystack = normalize(`${source.name} ${source.kind} ${source.area.join(' ')} ${source.tags.join(' ')}`);
    return terms.some(term => haystack.includes(term));
  }

  function sourceDescription(source) {
    const dict = current();
    if (source.note === 'international') return dict.sourceNoteInternational;
    if (source.note === 'kuntarekry') return dict.sourceNoteKuntarekry;
    if (source.note === 'api') return dict.sourceNoteApi;
    return dict[`sourceNote${source.kind[0].toUpperCase()}${source.kind.slice(1)}`] || dict.sourceNoteGeneral;
  }

  function sourceUrl(source, criteria) {
    const url = new URL(source.url);
    if (source.search === 'query') {
      const query = [criteria.keyword, criteria.city, criteria.type ? current()[criteria.type] || criteria.type : ''].filter(Boolean).join(' ');
      if (query) url.searchParams.set('query', query);
    }
    return url.href;
  }

  function sourceCard(source, criteria, primary = false) {
    const dict = current();
    const article = document.createElement('article');
    article.className = 'source-card';
    const top = document.createElement('div'); top.className = 'source-top';
    const mark = document.createElement('span'); mark.className = 'source-symbol'; mark.textContent = source.mark;
    const copy = document.createElement('div'); copy.className = 'source-copy';
    const category = document.createElement('div'); category.className = 'source-category-label'; category.textContent = dict[`kind${source.kind[0].toUpperCase()}${source.kind.slice(1)}`] || source.kind;
    const name = document.createElement('h3'); name.textContent = source.name;
    const description = document.createElement('p'); description.textContent = sourceDescription(source);
    copy.append(category, name, description); top.append(mark, copy);
    const tags = document.createElement('div'); tags.className = 'source-tags';
    const status = document.createElement('span'); status.className = 'source-tag link-only'; status.textContent = source.note === 'api' ? dict.sourceApi : dict.linkOnly; tags.append(status);
    if (source.note === 'international') { const international = document.createElement('span'); international.className = 'source-tag'; international.textContent = 'International talent'; tags.append(international); }
    if (source.note === 'kuntarekry') { const languageNote = document.createElement('span'); languageNote.className = 'source-tag'; languageNote.textContent = 'FI · SV mostly'; tags.append(languageNote); }
    copy.append(tags);
    const actions = document.createElement('div'); actions.className = 'source-actions';
    const open = document.createElement('a'); open.href = sourceUrl(source, criteria); open.target = '_blank'; open.rel = 'noopener noreferrer'; open.className = primary ? 'primary-source-link' : '';
    open.textContent = `${source.search === 'query' && criteriaText(criteria) ? dict.openSearch : dict.openSource} ↗`;
    open.setAttribute('aria-label', `${open.textContent}: ${source.name}`);
    actions.append(open);
    if (criteriaText(criteria) && source.search !== 'query') {
      const copyButton = document.createElement('button'); copyButton.className = 'copy-query'; copyButton.type = 'button'; copyButton.textContent = dict.copyQuery;
      copyButton.addEventListener('click', () => copySearchText(criteria)); actions.append(copyButton);
    }
    article.append(top, actions);
    return article;
  }

  function renderSourceResults() {
    const host = $('#source-results');
    if (!host) return;
    host.replaceChildren();
    const results = sources.filter(source => matchesSource(source, search));
    $('#source-count').textContent = `${results.length} ${current().countSuffix}`;
    $('#no-results').hidden = results.length > 0;
    results.forEach((source, index) => host.append(sourceCard(source, search, index === 0 || source.id === 'workinfinland')));
  }

  function renderActiveSearch() {
    const host = $('#active-search');
    if (!host) return;
    host.replaceChildren();
    const text = criteriaText();
    host.hidden = !text;
    if (!text) return;
    const label = document.createElement('strong'); label.textContent = current().searchResultsFor + ':'; host.append(label);
    [search.keyword, search.city, search.type ? current()[search.type] || search.type : '', search.focus ? current()[`focus${search.focus[0].toUpperCase()}${search.focus.slice(1)}`] || search.focus : ''].filter(Boolean).forEach(value => {
      const chip = document.createElement('span'); chip.className = 'search-chip'; chip.textContent = value; host.append(chip);
    });
  }

  function renderDirectory() {
    const host = $('#directory-grid');
    if (!host) return;
    const query = normalize($('#directory-search').value);
    const kind = $('#directory-category').value;
    const activePill = $('.category-pill.active');
    const pillKind = activePill?.dataset.category || '';
    const filterKind = kind || pillKind;
    const filtered = sources.filter(source => {
      const matchesKind = !filterKind || source.kind === filterKind;
      const haystack = normalize(`${source.name} ${source.kind} ${source.area.join(' ')} ${source.tags.join(' ')}`);
      return matchesKind && (!query || query.split(/\s+/).every(term => haystack.includes(term)));
    });
    host.replaceChildren();
    filtered.forEach(source => {
      const link = document.createElement('a'); link.className = 'directory-source'; link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      const mark = document.createElement('span'); mark.className = 'directory-logo'; mark.textContent = source.mark;
      const text = document.createElement('span'); const name = document.createElement('strong'); name.textContent = source.name;
      const type = document.createElement('small'); type.textContent = current()[`kind${source.kind[0].toUpperCase()}${source.kind.slice(1)}`] || source.kind;
      text.append(name, type); const arrow = document.createElement('span'); arrow.textContent = '↗'; link.append(mark, text, arrow); host.append(link);
    });
    if (!filtered.length) { const empty = document.createElement('p'); empty.className = 'directory-empty'; empty.textContent = current().directoryNoResults; host.append(empty); }
  }

  function renderSavedSearches() {
    const host = $('#saved-search-list'); if (!host) return;
    host.replaceChildren();
    savedSearches.forEach(item => {
      const row = document.createElement('div'); row.className = 'saved-search-item';
      const open = document.createElement('button'); open.type = 'button'; open.className = 'saved-search-open';
      const label = document.createElement('strong'); label.textContent = item.label || current().savedLabel;
      const meta = document.createElement('small'); meta.textContent = item.summary || current().savedByKielo;
      open.append(label, meta);
      open.addEventListener('click', () => { setForm(item.criteria); runSearch(); });
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'saved-search-remove'; remove.setAttribute('aria-label', current().searchDeleted); remove.textContent = '×';
      remove.addEventListener('click', () => { savedSearches = savedSearches.filter(saved => saved.id !== item.id); write(KEYS.searches, savedSearches); renderSavedSearches(); toast(current().searchDeleted); });
      row.append(open, remove); host.append(row);
    });
  }

  function renderTracker() {
    const host = $('#tracker-list'); if (!host) return;
    host.replaceChildren();
    $('#saved-job-count').textContent = String(trackedJobs.length);
    $('#tracker-empty').hidden = trackedJobs.length > 0;
    const statuses = [['saved','statusSaved'],['applied','statusApplied'],['interview','statusInterview'],['offer','statusOffer'],['closed','statusClosed']];
    trackedJobs.forEach(job => {
      const card = document.createElement('article'); card.className = 'tracked-job';
      const head = document.createElement('div'); head.className = 'tracked-job-head';
      const info = document.createElement('div'); const title = document.createElement('h3'); title.textContent = job.title;
      const meta = document.createElement('p'); meta.className = 'tracked-job-meta'; meta.textContent = [job.employer, job.city].filter(Boolean).join(' · ') || current().savedByKielo;
      info.append(title, meta); const statusPill = document.createElement('span'); statusPill.className = 'source-tag'; statusPill.textContent = current()[`status${(job.status || 'saved')[0].toUpperCase()}${(job.status || 'saved').slice(1)}`]; head.append(info, statusPill);
      const link = document.createElement('a'); link.className = 'tracked-job-link'; link.href = job.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = `${current().savedApply} ↗`;
      card.append(head, link);
      if (job.notes) { const note = document.createElement('p'); note.className = 'tracked-job-notes'; note.textContent = job.notes; card.append(note); }
      const controls = document.createElement('div'); controls.className = 'tracked-job-controls';
      const label = document.createElement('label'); label.textContent = current().statusLabel;
      const select = document.createElement('select'); select.setAttribute('aria-label', `${current().editStatus}: ${job.title}`);
      statuses.forEach(([value, key]) => { const option = document.createElement('option'); option.value = value; option.textContent = current()[key]; option.selected = (job.status || 'saved') === value; select.append(option); });
      select.addEventListener('change', () => { job.status = select.value; write(KEYS.records, trackedJobs); renderTracker(); });
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = current().removeJob; remove.setAttribute('aria-label', `${current().removeJob}: ${job.title}`);
      remove.addEventListener('click', () => { if (!confirm(current().confirmRemove)) return; trackedJobs = trackedJobs.filter(saved => saved.id !== job.id); write(KEYS.records, trackedJobs); renderTracker(); toast(current().jobRemoved); });
      controls.append(label, select, remove); card.append(controls); host.append(card);
    });
  }

  function copySearchText(criteria) {
    const text = criteriaText(criteria) || current().noKeyword;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => toast(current().copyDone)).catch(() => toast(`${current().copyFail} ${text}`));
    else toast(`${current().copyFail} ${text}`);
  }

  function openModal(trigger) {
    modalReturnFocus = trigger || document.activeElement;
    $('#job-modal').hidden = false;
    document.body.style.overflow = 'hidden';
    $('input[name="title"]', $('#job-record-form')).focus();
  }

  function closeModal() {
    $('#job-modal').hidden = true;
    document.body.style.overflow = '';
    modalReturnFocus?.focus?.();
  }

  function currentData() { return { version: 1, exportedAt: new Date().toISOString(), savedSearches, jobs: trackedJobs }; }

  function downloadBackup() {
    const blob = new Blob([JSON.stringify(currentData(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = current().exportName;
    document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url); toast(current().exportDone);
  }

  function safeBackup(value) {
    if (!value || typeof value !== 'object' || value.version !== 1 || !Array.isArray(value.savedSearches) || !Array.isArray(value.jobs)) return false;
    const validJobs = value.jobs.every(job => job && typeof job.title === 'string' && typeof job.url === 'string' && /^https:\/\//i.test(job.url));
    const validSearches = value.savedSearches.every(item => item && typeof item === 'object' && item.criteria && typeof item.criteria === 'object');
    return validJobs && validSearches;
  }

  function initFromUrl() {
    const params = new URLSearchParams(location.search);
    const city = params.get('city') || '';
    search = { keyword: params.get('q') || '', city, type: params.get('type') || '', focus: params.get('focus') || '' };
    if (!['','full-time','part-time','seasonal','internship','temporary'].includes(search.type)) search.type = '';
    $('#job-keyword').value = search.keyword;
    const cityValues = [...$('#job-city').options].map(option => option.value);
    const knownCity = !city || cityValues.includes(city);
    $('#job-city').value = knownCity ? city : 'other';
    $('#other-city').value = knownCity ? '' : city;
    $('#other-city-shell').hidden = knownCity;
    $('#job-type').value = search.type; $('#focus-filter').value = search.focus;
  }

  $('#ui-language').value = language;
  $('#ui-language').addEventListener('change', event => { language = ['en','fi','bn'].includes(event.target.value) ? event.target.value : 'en'; write(KEYS.language, language); translate(); });
  $('#job-search-form').addEventListener('submit', event => { event.preventDefault(); runSearch(); });
  $$('[data-query]').forEach(button => button.addEventListener('click', () => { $('#job-keyword').value = button.dataset.query; runSearch(); }));
  $$('[data-source-filter]').forEach(input => input.addEventListener('change', () => renderSourceResults()));
  $('#focus-filter').addEventListener('change', () => { search = readForm(); updateUrl(); renderSourceResults(); renderActiveSearch(); });
  $('#job-city').addEventListener('change', () => { const custom = $('#job-city').value === 'other'; $('#other-city-shell').hidden = !custom; if (!custom) { search = readForm(); updateUrl(); renderSourceResults(); renderActiveSearch(); } else $('#other-city').focus(); });
  $('#other-city').addEventListener('input', () => { search = readForm(); updateUrl(); renderSourceResults(); renderActiveSearch(); });
  $('#clear-filters').addEventListener('click', () => { $$('[data-source-filter]').forEach(input => input.checked = false); setForm({ keyword:'', city:'', type:'', focus:'' }); updateUrl(); renderSourceResults(); renderActiveSearch(); $('#search-hint').textContent = current().searchHint; });
  $('#save-search-button').addEventListener('click', () => {
    const criteria = readForm();
    const summary = criteriaText(criteria);
    if (!summary) { toast(current().searchEmpty); return; }
    const duplicate = savedSearches.some(item => JSON.stringify(item.criteria) === JSON.stringify(criteria));
    if (duplicate) { toast(current().searchDup); return; }
    savedSearches = [{ id: id(), label: summary, summary: current().savedByKielo, criteria }, ...savedSearches].slice(0,30);
    write(KEYS.searches, savedSearches); renderSavedSearches(); toast(current().searchDone);
  });
  $('#saved-jobs-shortcut').addEventListener('click', () => $('#my-jobs').scrollIntoView({ behavior:'smooth', block:'start' }));
  $('#add-job-button').addEventListener('click', event => openModal(event.currentTarget));
  $('#add-first-job').addEventListener('click', event => openModal(event.currentTarget));
  $('#modal-close').addEventListener('click', closeModal);
  $('#job-modal').addEventListener('click', event => { if (event.target === $('#job-modal')) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#job-modal').hidden) closeModal(); });
  $('#job-record-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const rawUrl = String(values.get('url') || '').trim();
    let parsed;
    try { parsed = new URL(rawUrl); } catch { form.elements.url.setCustomValidity(current().needHttps); form.elements.url.reportValidity(); return; }
    if (parsed.protocol !== 'https:') { form.elements.url.setCustomValidity(current().needHttps); form.elements.url.reportValidity(); return; }
    form.elements.url.setCustomValidity('');
    trackedJobs = [{ id:id(), title:String(values.get('title')).trim(), employer:String(values.get('employer')).trim(), city:String(values.get('city')).trim(), url:parsed.href, notes:String(values.get('notes')).trim(), status:'saved', createdAt:new Date().toISOString() }, ...trackedJobs];
    write(KEYS.records, trackedJobs); renderTracker(); form.reset(); closeModal(); toast(current().jobSaved);
  });
  $('#directory-search').addEventListener('input', renderDirectory);
  $('#directory-category').addEventListener('change', () => { $$('.category-pill').forEach(pill => { const active = pill.dataset.category === $('#directory-category').value; pill.classList.toggle('active', active); pill.setAttribute('aria-pressed', String(active)); }); renderDirectory(); });
  $$('.category-pill').forEach(pill => pill.addEventListener('click', () => { $('#directory-category').value = pill.dataset.category; $$('.category-pill').forEach(other => { const active = other === pill; other.classList.toggle('active', active); other.setAttribute('aria-pressed', String(active)); }); renderDirectory(); }));
  const menu = $('#main-nav'); const menuButton = $('#menu-toggle');
  menuButton.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }));
  $('#export-data').addEventListener('click', downloadBackup);
  $('#import-data').addEventListener('change', async event => {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const backup = JSON.parse(await file.text());
      if (!safeBackup(backup)) throw new Error('invalid');
      if (!confirm(current().confirmImport)) return;
      savedSearches = backup.savedSearches.map(item => ({ id:item.id || id(), label:String(item.label || ''), summary:String(item.summary || current().savedByKielo), criteria:{ keyword:String(item.criteria.keyword || ''), city:String(item.criteria.city || ''), type:String(item.criteria.type || ''), focus:String(item.criteria.focus || '') } }));
      trackedJobs = backup.jobs.map(job => ({ id:job.id || id(), title:String(job.title).slice(0,120), employer:String(job.employer || '').slice(0,120), city:String(job.city || '').slice(0,100), url:new URL(job.url).href, notes:String(job.notes || '').slice(0,1000), status:['saved','applied','interview','offer','closed'].includes(job.status) ? job.status : 'saved', createdAt:job.createdAt || new Date().toISOString() }));
      write(KEYS.searches, savedSearches); write(KEYS.records, trackedJobs); translate(); toast(current().importDone);
    } catch { toast(current().importError); }
    finally { event.target.value = ''; }
  });

  initFromUrl();
  translate();
  renderSourceResults();
  renderDirectory();
  renderSavedSearches();
  renderTracker();
})();
