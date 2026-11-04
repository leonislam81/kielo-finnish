(function(){
  "use strict";

  const HELSINKI_ZONE="Europe/Helsinki";
  const LANGUAGE_KEY="kielo-site-language-v1";
  const CITY_KEY="kielo-finland-city-v1";
  const WEATHER_KEY="kielo-finland-weather-v1";
  const cities=[
    {id:"helsinki",name:"Helsinki",region:"Uusimaa",fiRegion:"Uusimaa",lat:60.16952,lon:24.93545},
    {id:"turku",name:"Turku",region:"Southwest Finland",fiRegion:"Varsinais-Suomi",lat:60.45148,lon:22.26869},
    {id:"pori",name:"Pori",region:"Satakunta",fiRegion:"Satakunta",lat:61.48072,lon:21.78518},
    {id:"hamenlinna",name:"Hämeenlinna",region:"Kanta-Häme",fiRegion:"Kanta-Häme",lat:60.99596,lon:24.46434},
    {id:"tampere",name:"Tampere",region:"Pirkanmaa",fiRegion:"Pirkanmaa",lat:61.49911,lon:23.78712},
    {id:"lahti",name:"Lahti",region:"Päijät-Häme",fiRegion:"Päijät-Häme",lat:60.98267,lon:25.66151},
    {id:"kotka",name:"Kotka",region:"Kymenlaakso",fiRegion:"Kymenlaakso",lat:60.46640,lon:26.94582},
    {id:"lappeenranta",name:"Lappeenranta",region:"South Karelia",fiRegion:"Etelä-Karjala",lat:61.05871,lon:28.18871},
    {id:"mikkeli",name:"Mikkeli",region:"South Savo",fiRegion:"Etelä-Savo",lat:61.68857,lon:27.27227},
    {id:"kuopio",name:"Kuopio",region:"North Savo",fiRegion:"Pohjois-Savo",lat:62.89238,lon:27.67703},
    {id:"joensuu",name:"Joensuu",region:"North Karelia",fiRegion:"Pohjois-Karjala",lat:62.60118,lon:29.76316},
    {id:"jyvaskyla",name:"Jyväskylä",region:"Central Finland",fiRegion:"Keski-Suomi",lat:62.24147,lon:25.72088},
    {id:"seinajoki",name:"Seinäjoki",region:"South Ostrobothnia",fiRegion:"Etelä-Pohjanmaa",lat:62.79446,lon:22.82822},
    {id:"vaasa",name:"Vaasa",region:"Ostrobothnia",fiRegion:"Pohjanmaa",lat:63.09600,lon:21.61577},
    {id:"kokkola",name:"Kokkola",region:"Central Ostrobothnia",fiRegion:"Keski-Pohjanmaa",lat:63.83847,lon:23.13066},
    {id:"oulu",name:"Oulu",region:"North Ostrobothnia",fiRegion:"Pohjois-Pohjanmaa",lat:65.01236,lon:25.46816},
    {id:"kajaani",name:"Kajaani",region:"Kainuu",fiRegion:"Kainuu",lat:64.22728,lon:27.72846},
    {id:"rovaniemi",name:"Rovaniemi",region:"Lapland",fiRegion:"Lappi",lat:66.49897,lon:25.68867},
    {id:"mariehamn",name:"Mariehamn",region:"Åland",fiRegion:"Ahvenanmaa",lat:60.09726,lon:19.93481}
  ];
  const words=[
    {fi:"tervetuloa",en:"welcome",fiMeaning:"tervetuloa"},
    {fi:"kiitos",en:"thank you",fiMeaning:"kiitos"},
    {fi:"huomenna",en:"tomorrow",fiMeaning:"huomenna"},
    {fi:"tänään",en:"today",fiMeaning:"tänään"},
    {fi:"koti",en:"home",fiMeaning:"koti"},
    {fi:"metsä",en:"forest",fiMeaning:"metsä"},
    {fi:"järvi",en:"lake",fiMeaning:"järvi"}
  ];
  const textPairs=[
    [".brand-word small","FINLAND, WITH YOU","SUOMI, KANSSASI"],
    [".desktop-nav a:nth-child(1)","Learn Finnish","Opi suomea"],
    [".desktop-nav a:nth-child(2)","Work","Työ"],
    [".desktop-nav a:nth-child(3)","Study","Opiskele"],
    [".desktop-nav a:nth-child(4)","Life in Finland","Elämä Suomessa"],
    [".desktop-nav a:nth-child(5)","Explore","Tutustu"],
    [".header-cta","Start learning","Aloita oppiminen"],
    [".locale-label","Site language","Sivuston kieli"],
    [".mobile-menu a:nth-child(1)","Learn Finnish","Opi suomea"],
    [".mobile-menu a:nth-child(2)","Find work","Löydä työtä"],
    [".mobile-menu a:nth-child(3)","Study in Finland","Opiskele Suomessa"],
    [".mobile-menu a:nth-child(4)","Life in Finland","Elämä Suomessa"],
    [".mobile-menu a:nth-child(5)","Explore Finland","Tutustu Suomeen"],
    [".now-inner .now-card:first-child .now-label","Finland local time","Suomen paikallisaika"],
    ["#weather-label","Current weather","Sää nyt"],
    ["#phrase-support","A warm welcome to Finland.","Lämmin tervetulotoivotus Suomeen."],
    [".weather-credit","Weather by","Sää:"],
    [".search-field label","Search Finnish words, jobs, study, and life in Finland","Hae suomen sanoja, työtä, opintoja ja elämää Suomessa"],
    ["#global-search","Search Finnish, jobs, study, life in Finland…","Hae suomea, työtä, opintoja ja elämää Suomessa…","placeholder"],
    [".hero .eyebrow span:nth-child(2)","LEARN · WORK · LIVE · BELONG","OPI · TYÖSKENTELE · ELÄ · KUULU YHTEISÖÖN"],
    ["#hero-intro","Learn Finnish. Find your way to work, studies, and everyday life—with guidance in the language you choose.","Opiskele suomea. Löydä reittisi työhön, opintoihin ja arkeen — valitsemallasi tukikielellä."],
    ["#hero-cta","Choose your path","Valitse polkusi"],
    ["#hero-secondary","Start with Finnish","Aloita suomesta"],
    [".hero-meta span:last-child","A little Finnish, a little more at home.","Pieni pala suomea, askel lähemmäs kotia."],
    [".word-float span","Today's word","Päivän sana"],
    [".hero-stamp small","your pace","omaan tahtiisi"],
    [".photo-caption strong","A new beginning, at your own pace.","Uusi alku, omaan tahtiisi."],
    [".pathways .section-kicker","START WHERE YOU ARE","ALOITA SIITÄ, MISSÄ OLET"],
    ["#paths-title","What brings you to Finland?","Mikä tuo sinut Suomeen?"],
    [".section-head > p","Choose one small step. Your learning and practical guides stay connected.","Valitse yksi pieni askel. Oppiminen ja arjen oppaat kulkevat rinnakkain."],
    ["#path-grid .path-card:nth-child(1) strong","Learn Finnish","Opi suomea"],
    ["#path-grid .path-card:nth-child(1) p","Start at your level, from first words to fluent conversations.","Aloita omalta tasoltasi, ensisanoista sujuviin keskusteluihin."],
    ["#path-grid .path-card:nth-child(2) strong","Find a job","Löydä työtä"],
    ["#path-grid .path-card:nth-child(2) p","Start with Finland’s official job service and useful workplace Finnish.","Aloita Suomen virallisesta työnhakupalvelusta ja työelämän suomesta."],
    ["#path-grid .path-card:nth-child(3) strong","Study in Finland","Opiskele Suomessa"],
    ["#path-grid .path-card:nth-child(3) p","Plan admissions, compare study routes and costs, and explore student cities.","Suunnittele hakua, vertaile opintopolkuja ja kustannuksia sekä tutustu opiskelijakaupunkeihin."],
    ["#path-grid .path-card:nth-child(4) strong","Make a home here","Rakenna arkea Suomessa"],
    ["#path-grid .path-card:nth-child(4) p","Rent, buy, build, or find student housing with clear Finland-wide guidance.","Löydä selkeät ohjeet vuokraamiseen, ostamiseen, rakentamiseen ja opiskelija-asumiseen Suomessa."],
    ["#path-grid .path-card:nth-child(5) strong","Explore Finland","Tutustu Suomeen"],
    ["#path-grid .path-card:nth-child(5) p","Explore Finnish regions, history, nature, and everyday culture.","Tutustu Suomen alueisiin, historiaan, luontoon ja arkeen."],
    [".finland-heading .section-kicker","GET TO KNOW FINLAND","TUTUSTU SUOMEEN"],
    ["#finland-title","Learn the words. Meet the country behind them.","Opettele sanat. Tutustu niiden takana olevaan maahan."],
    [".finland-heading p","From everyday public services to forests, universities, jobs, and local traditions—each topic pairs Finnish vocabulary with a clear introduction to life in Finland.","Julkisista palveluista metsiin, yliopistoihin, työhön ja perinteisiin — jokainen aihe yhdistää suomen sanat selkeään katsaukseen Suomessa elämiseen."],
    [".finland-overview-link","Explore Finland topics","Tutustu Suomen aiheisiin"],
    [".story-eyebrow","SUOMI · FINLAND · FOUR DISTINCT SEASONS","SUOMI · NELJÄ VUODENAIKAA"],
    [".finland-story h3","One country, many ways to feel at home.","Yksi maa, monia tapoja tuntea olonsa kotoisaksi."],
    [".finland-story p","Follow Finland from the Baltic shoreline and lake country to northern Lapland. Learn the Finnish words as you discover the places, people, and everyday systems that give them meaning.","Tutustu Suomeen Itämeren rannikolta ja järvialueilta pohjoisen Lappiin. Opettele suomen sanoja ja löydä paikat, ihmiset sekä arjen palvelut niiden takana."],
    [".season-list span:nth-child(1) small","winter","talvi"],
    [".season-list span:nth-child(2) small","spring","kevät"],
    [".season-list span:nth-child(3) small","summer","kesä"],
    [".season-list span:nth-child(4) small","autumn","syksy"],
    [".fact-grid .fact-card:nth-child(1) .fact-label","PEOPLE · 2025","VÄESTÖ · 2025"],
    [".fact-grid .fact-card:nth-child(1) .fact-caption","residents at the end of 2025","asukasta vuoden 2025 lopussa"],
    [".fact-grid .fact-card:nth-child(2) .fact-label","REGIONS","ALUEET"],
    [".fact-grid .fact-card:nth-child(2) .fact-caption","regions, from Åland to Lapland","aluetta Ahvenanmaalta Lappiin"],
    [".fact-grid .fact-card:nth-child(3) .fact-label","NATIONAL LANGUAGES","KANSALLISKIELET"],
    [".fact-grid .fact-card:nth-child(3) .fact-caption","Finnish and Swedish; Sámi languages and communities are part of Finland too","Suomi ja ruotsi; saamen kielet ja yhteisöt ovat myös osa Suomea"],
    [".fact-grid .fact-card:nth-child(4) .fact-label","NATURE · CLIMATE","LUONTO · ILMASTO"],
    [".fact-grid .fact-card:nth-child(4) .fact-value","4 seasons","4 vuodenaikaa"],
    [".fact-grid .fact-card:nth-child(4) .fact-caption","with weather and daylight that vary by region","sää ja päivänvalo vaihtelevat alueittain"],
    [".topic-heading .section-kicker","A COUNTRY, MANY STORIES","MAA, MONTA TARINAA"],
    ["#topic-title","Explore Finland from every angle","Tutustu Suomeen monesta näkökulmasta"],
    [".topic-heading p","Start with a topic. Pick up Finnish you can use while you explore.","Valitse aihe ja opi suomea, jota voit käyttää tutustuessasi."],
    [".topic-card:nth-child(1) h4","People & languages","Ihmiset ja kielet"],
    [".topic-card:nth-child(1) .topic-index","01 · PEOPLE","01 · IHMISET"],
    [".topic-card:nth-child(1) p","Population, national languages, Sámi communities, and regional voices.","Väestö, kansalliskielet, saamelaisyhteisöt ja alueiden äänet."],
    [".topic-card:nth-child(2) h4","History & public life","Historia ja julkinen elämä"],
    [".topic-card:nth-child(2) .topic-index","02 · SOCIETY","02 · YHTEISKUNTA"],
    [".topic-card:nth-child(2) p","Understand Finnish history, government, municipalities, and public services.","Tutustu Suomen historiaan, hallintoon, kuntiin ja julkisiin palveluihin."],
    [".topic-card:nth-child(3) h4","Study & universities","Opiskelu ja yliopistot"],
    [".topic-card:nth-child(3) .topic-index","03 · LEARNING","03 · OPISKELU"],
    [".topic-card:nth-child(3) p","Explore universities, admissions, student life, and useful campus Finnish.","Tutustu yliopistoihin, hakemiseen, opiskelijaelämään ja kampussuomeen."],
    [".topic-card:nth-child(4) h4","Jobs & economy","Työ ja talous"],
    [".topic-card:nth-child(4) .topic-index","04 · CAREERS","04 · URA"],
    [".topic-card:nth-child(4) p","Learn about careers, workplaces, job searches, and the Finnish economy.","Opi ammateista, työpaikoista, työnhausta ja Suomen taloudesta."],
    [".topic-card:nth-child(5) h4","Forests, lakes & sea","Metsät, järvet ja meri"],
    [".topic-card:nth-child(5) .topic-index","05 · NATURE","05 · LUONTO"],
    [".topic-card:nth-child(5) p","Discover forests, lake country, the Baltic coast, and nature vocabulary.","Tutustu metsiin, järviseutuun, Itämeren rannikkoon ja luontosanastoon."],
    [".topic-card:nth-child(6) h4","Climate & seasons","Ilmasto ja vuodenajat"],
    [".topic-card:nth-child(6) .topic-index","06 · CLIMATE","06 · ILMASTO"],
    [".topic-card:nth-child(6) p","See how snow, rain, daylight, and the four seasons change across Finland.","Näe, miten lumi, sade, päivänvalo ja vuodenajat vaihtelevat Suomessa."],
    [".topic-card:nth-child(7) h4","Transport & places","Liikenne ja paikat"],
    [".topic-card:nth-child(7) .topic-index","07 · GETTING AROUND","07 · LIIKKUMINEN"],
    [".topic-card:nth-child(7) p","Find your way through city transport, rail journeys, ferries, and regions.","Löydä reittisi kaupunkiliikenteessä, junissa, lautoilla ja eri alueilla."],
    [".topic-card:nth-child(8) h4","Food, markets & culture","Ruoka, torit ja kulttuuri"],
    [".topic-card:nth-child(8) .topic-index","08 · EVERYDAY CULTURE","08 · ARKIKULTTUURI"],
    [".topic-card:nth-child(8) p","Meet local foods, market days, sauna traditions, design, and celebrations.","Tutustu paikalliseen ruokaan, toreihin, saunaan, muotoiluun ja juhliin."],
    [".source-row strong","Fact sources","Tietolähteet"],
    [".source-row a:nth-of-type(1)","Statistics Finland · population 2025","Tilastokeskus · väestö 2025"],
    [".source-row a:nth-of-type(2)","ThisisFINLAND · 19 regions","ThisisFINLAND · 19 aluetta"],
    [".source-row a:nth-of-type(3)","Finland Toolbox · languages","Finland Toolbox · kielet"],
    [".source-row a:nth-of-type(4)","Visit Finland · seasons","Visit Finland · vuodenajat"],
    [".daily-label","YOUR FINNISH · ONE DAY AT A TIME","SUOMEA · YKSI PÄIVÄ KERRALLAAN"],
    ["#daily-title","A hundred useful words. A little more confidence.","Sata hyödyllistä sanaa. Lisää varmuutta."],
    [".daily-card p","Short sets, clear meanings, and Finnish audio. Pick up where you are—your daily goal is yours to choose.","Lyhyitä kokonaisuuksia, selkeitä merkityksiä ja suomenkielistä ääntä. Valitse itsellesi sopiva päivittäinen tavoite."],
    [".daily-count span:first-child","10 small sets of 10","10 pientä 10 sanan kokonaisuutta"],
    [".daily-card .button","Explore Daily 100","Tutustu Päivän 100 sanaa -osioon"],
    [".feature-top small","HEAR IT · SAY IT · KEEP IT","KUUNTELE · SANO · MUISTA"],
    [".phrase-panel h3","A phrase for today","Päivän lause"],
    [".phrase-line p","Welcome to Finland.","Tervetuloa Suomeen."],
    [".phrase-support-note","Choose English or Bangla lesson explanations inside the Finnish learning area.","Valitse suomen oppimisalueella englannin- tai bengalinkieliset selitykset."],
    [".phrase-start-link","Open Finnish lessons","Avaa suomen oppitunnit"],
    [".explore-panel .feature-top small","SMALL STORIES · REAL SOURCES","PIENIÄ TARINOITA · LUOTETTAVIA LÄHTEITÄ"],
    [".explore-panel h3","Get to know Finland","Tutustu Suomeen"],
    [".explore-panel .section-kicker","19 CHAPTERS","19 LUKUA"],
    [".explore-image span:first-child","From the forest to the city","Metsästä kaupunkiin"],
    [".explore-image strong","Explore Finland, your way.","Tutustu Suomeen omalla tavallasi."],
    [".explore-link","History · nature · culture · everyday life","Historia · luonto · kulttuuri · arki"],
    [".trust-inner > strong","Useful Finnish for the life you want to build.","Hyödyllistä suomea elämään, jota rakennat."],
    [".trust-items span:nth-child(1)","Website in English or Finnish","Sivusto englanniksi tai suomeksi"],
    [".trust-items span:nth-child(2)","Choose an explanation language for Finnish lessons","Valitse suomen oppituntien selityskieli"],
    [".trust-items span:nth-child(3)","Official sources, clearly linked","Viralliset lähteet selkeästi linkitetty"],
    ["footer .footer-inner > span:nth-child(2)","Learn Finnish. Find your way in Finland.","Opiskele suomea. Löydä oma polkusi Suomessa."]
  ];

  function safeGet(key){try{return localStorage.getItem(key)}catch(_error){return null}}
  function safeSet(key,value){try{localStorage.setItem(key,value)}catch(_error){}}
  function textTarget(node,value){
    if(!node)return;
    const textNode=Array.from(node.childNodes).find(child=>child.nodeType===Node.TEXT_NODE&&child.textContent.trim());
    if(textNode)textNode.textContent=value+(textNode.textContent.endsWith(" ")?" ":"");
    else node.textContent=value;
  }
  function applyLanguage(language){
    const lang=language==="fi"?"fi":"en";
    document.documentElement.lang=lang;
    const picker=document.getElementById("ui-language");
    if(picker)picker.value=lang;
    for(const [selector,en,fi,attribute] of textPairs){
      const node=document.querySelector(selector);
      if(!node)continue;
      const value=lang==="fi"?fi:en;
      if(attribute)node.setAttribute(attribute,value);
      else textTarget(node,value);
    }
    const title=document.getElementById("hero-title");
    if(title)title.innerHTML=lang==="fi"?"Löydä oma paikkasi <em>Suomessa.</em>":"Find your place <em>in Finland.</em>";
    document.title=lang==="fi"?"Kielo — Suomi, kanssasi":"Kielo — Finland, with you";
    const languageSelect=document.getElementById("ui-language");
    if(languageSelect)languageSelect.setAttribute("aria-label",lang==="fi"?"Sivuston kieli":"Site language");
    const mainNav=document.querySelector(".desktop-nav");
    if(mainNav)mainNav.setAttribute("aria-label",lang==="fi"?"Päänavigaatio":"Main navigation");
    const mobileNav=document.querySelector(".mobile-menu");
    if(mobileNav)mobileNav.setAttribute("aria-label",lang==="fi"?"Mobiilivalikko":"Mobile navigation");
    const languageGroup=document.querySelector(".locale-controls");
    if(languageGroup)languageGroup.setAttribute("aria-label",lang==="fi"?"Sivuston kieli":"Website language");
    const nowStrip=document.querySelector(".now-strip");
    if(nowStrip)nowStrip.setAttribute("aria-label",lang==="fi"?"Suomen paikallinen aika ja sää":"Finland local time and weather");
    const clock=document.getElementById("helsinki-clock");
    if(clock)clock.setAttribute("aria-label",lang==="fi"?"Suomen paikallinen kellonaika":"Current Finland local time");
    const weatherLabelNode=document.querySelector("label[for='weather-city']");
    if(weatherLabelNode)weatherLabelNode.textContent=lang==="fi"?"Sääalue":"Weather region";
    const refreshButton=document.getElementById("weather-refresh");
    if(refreshButton){
      const label=lang==="fi"?"Päivitä säätiedot":"Refresh current weather";
      refreshButton.setAttribute("aria-label",label);
      refreshButton.title=label;
    }
    const card=document.querySelector(".phrase-panel");
    if(card)card.setAttribute("aria-label",lang==="fi"?"Päivän suomenkielinen lause":"A Finnish phrase for today");
    const row=document.querySelector(".feature-row");
    if(row)row.setAttribute("aria-label",lang==="fi"?"Päivän suomenkielinen lause ja Suomeen tutustuminen":"A Finnish phrase and an introduction to Finland");
    const trust=document.querySelector(".trust-strip");
    if(trust)trust.setAttribute("aria-label",lang==="fi"?"Kielon oppimistapa":"Kielo learning approach");
    const glance=document.querySelector(".finland-glance");
    if(glance)glance.setAttribute("aria-label",lang==="fi"?"Suomi lyhyesti":"Finland at a glance");
    const factGrid=document.querySelector(".fact-grid");
    if(factGrid)factGrid.setAttribute("aria-label",lang==="fi"?"Suomen perustietoja":"Finland at a glance");
    const seasonList=document.querySelector(".season-list");
    if(seasonList)seasonList.setAttribute("aria-label",lang==="fi"?"Suomen vuodenajat":"Finnish seasons");
    const heroStamp=document.querySelector(".hero-stamp");
    if(heroStamp)heroStamp.setAttribute("aria-label",lang==="fi"?"Opiskele omaan tahtiisi":"Learn at your own pace");
    const listenButton=document.querySelector(".listen-button");
    if(listenButton)listenButton.setAttribute("aria-label",lang==="fi"?"Kuuntele suomen ääntämys":"Play Finnish pronunciation");
    const photo=document.querySelector(".hero-photo img");
    if(photo)photo.alt=lang==="fi"?"Oppija sillalla veden äärellä syksyisenä päivänä Suomessa":"A learner on a bridge beside water on an autumn day in Finland";
    const mobileToggle=document.querySelector(".menu-toggle");
    if(mobileToggle)mobileToggle.setAttribute("aria-label",mobileToggle.getAttribute("aria-expanded")==="true"?(lang==="fi"?"Sulje valikko":"Close navigation"):(lang==="fi"?"Avaa valikko":"Open navigation"));
    const weatherSelect=document.getElementById("weather-city");
    if(weatherSelect){
      const selected=weatherSelect.value||safeGet(CITY_KEY)||"helsinki";
      weatherSelect.innerHTML=cities.map(city=>'<option value="'+city.id+'">'+city.name+' · '+(lang==="fi"?city.fiRegion:city.region)+'</option>').join("");
      weatherSelect.value=cities.some(city=>city.id===selected)?selected:"helsinki";
      weatherSelect.setAttribute("aria-label",lang==="fi"?"Valitse sää mistä tahansa Suomen 19 maakunnasta":"Choose weather for any of Finland’s 19 regions");
    }
    const feedback=document.getElementById("search-feedback");
    if(feedback&&feedback.dataset.query){
      const count=document.querySelectorAll(".path-card:not([hidden]),.topic-card:not([hidden])").length;
      feedback.textContent=count?(lang==="fi"?"Näytetään "+count+" osuvaa aihetta ja oppimispolkua.":"Showing "+count+" matching guides and learning paths."):(lang==="fi"?"Ei vielä osumia. Kokeile sanoja suomi, työ, opiskelu, sää tai kulttuuri.":"No result yet. Try Finnish, work, study, housing, weather, or culture.");
    }
    safeSet(LANGUAGE_KEY,lang);
    updateClock();
    updateWeatherView();
  }

  function updateClock(){
    const now=new Date(),clock=document.getElementById("helsinki-clock"),date=document.getElementById("helsinki-date");
    if(!clock||!date)return;
    const time=new Intl.DateTimeFormat("en-US",{timeZone:HELSINKI_ZONE,hour:"numeric",minute:"2-digit",second:"2-digit",hourCycle:"h12"}).format(now);
    clock.textContent=time;
    const lang=document.documentElement.lang==="fi"?"fi-FI":"en-US";
    const dateText=new Intl.DateTimeFormat(lang,{timeZone:HELSINKI_ZONE,weekday:"short",month:"short",day:"numeric"}).format(now);
    date.textContent="Helsinki · "+dateText;
  }

  function cachedWeather(){try{return JSON.parse(safeGet(WEATHER_KEY)||"null")}catch(_error){return null}}
  function selectedCity(){return cities.find(city=>city.id===safeGet(CITY_KEY))||cities[0]}
  function weatherText(code){
    const finnish=document.documentElement.lang==="fi";
    if(code===0)return [finnish?"Selkeää":"Clear sky","☀️"];
    if(code===1)return [finnish?"Enimmäkseen selkeää":"Mostly clear","🌤️"];
    if(code===2)return [finnish?"Puolipilvistä":"Partly cloudy","⛅"];
    if(code===3)return [finnish?"Pilvistä":"Overcast","☁️"];
    if(code===45||code===48)return [finnish?"Sumua":"Fog","🌫️"];
    if(code>=51&&code<=57)return [finnish?"Tihkusadetta":"Drizzle","🌦️"];
    if(code>=61&&code<=67)return [finnish?"Sadetta":"Rain","🌧️"];
    if(code>=71&&code<=77)return [finnish?"Lumisadetta":"Snow","🌨️"];
    if(code>=80&&code<=82)return [finnish?"Sadekuuroja":"Rain showers","🌧️"];
    if(code>=85&&code<=86)return [finnish?"Lumikuuroja":"Snow showers","🌨️"];
    if(code>=95)return [finnish?"Ukkosta":"Thunderstorm","⛈️"];
    return [finnish?"Sää nyt":"Current conditions","🌤️"];
  }
  function updateWeatherView(){
    const select=document.getElementById("weather-city"),city=cities.find(item=>item.id===select?.value)||selectedCity();
    if(select&&select.value!==city.id)select.value=city.id;
    const record=cachedWeather(),valid=record?.cityId===city.id&&record.current;
    const current=valid?record.current:null,condition=current?weatherText(Number(current.weather_code)):null;
    const temp=document.getElementById("weather-temp"),summary=document.getElementById("weather-condition"),wind=document.getElementById("weather-wind"),updated=document.getElementById("weather-updated");
    const lang=document.documentElement.lang==="fi";
    if(temp)temp.textContent=current?Math.round(Number(current.temperature_2m))+"°C":"—°C";
    if(summary)summary.textContent=current?condition[0]:(lang?"Haetaan säätietoja…":"Loading conditions…");
    if(wind)wind.textContent=current?(lang?"Tuntuu "+Math.round(Number(current.apparent_temperature))+"° · Tuuli "+Math.round(Number(current.wind_speed_10m))+" km/h":"Feels like "+Math.round(Number(current.apparent_temperature))+"° · Wind "+Math.round(Number(current.wind_speed_10m))+" km/h"):(lang?"Suomi · ajantasaiset olosuhteet":"Finland · current conditions");
    if(updated){
      if(record?.updatedAt&&record.cityId===city.id){
        const time=new Intl.DateTimeFormat("en-US",{timeZone:HELSINKI_ZONE,hour:"numeric",minute:"2-digit",hourCycle:"h12"}).format(new Date(record.updatedAt));
        updated.textContent=lang?"Päivitetty "+time+" Suomen aikaa":"Updated "+time+" Finland time";
      }else updated.textContent=lang?"Säätiedot päivittyvät…":"Updating from the selected region…";
    }
  }

  let weatherRequest=null,weatherAbort=null;
  async function loadWeather(force){
    const city=selectedCity(),record=cachedWeather(),fresh=record?.cityId===city.id&&Date.now()-Number(record.updatedAt||0)<15*60*1000;
    updateWeatherView();
    if(weatherRequest&&!force)return weatherRequest;
    if(fresh&&!force)return;
    if(weatherAbort)weatherAbort.abort();
    weatherAbort=new AbortController();
    const controller=weatherAbort;
    let timeout=0;
    const refresh=document.getElementById("weather-refresh");
    if(refresh)refresh.disabled=true;
    weatherRequest=(async()=>{
      try{
        const params=new URLSearchParams({latitude:String(city.lat),longitude:String(city.lon),current:"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",timezone:HELSINKI_ZONE});
        timeout=window.setTimeout(()=>controller.abort(),12000);
        const response=await fetch("https://api.open-meteo.com/v1/forecast?"+params.toString(),{signal:controller.signal,cache:"no-store"});
        window.clearTimeout(timeout);
        if(!response.ok)throw new Error("Weather service unavailable");
        const data=await response.json();
        if(!data.current||selectedCity().id!==city.id)return;
        safeSet(WEATHER_KEY,JSON.stringify({cityId:city.id,current:data.current,updatedAt:Date.now()}));
      }catch(_error){
        const latest=cachedWeather();
        const condition=document.getElementById("weather-condition");
        if(latest?.cityId!==city.id&&condition)condition.textContent=document.documentElement.lang==="fi"?"Säätietoa ei juuri nyt saada":"Weather temporarily unavailable";
      }finally{
        window.clearTimeout(timeout);
        if(weatherAbort===controller){
          weatherAbort=null;
          weatherRequest=null;
          if(refresh)refresh.disabled=false;
          updateWeatherView();
        }
      }
    })();
    return weatherRequest;
  }

  function updateDailyWord(){
    const day=Math.floor(Date.now()/86400000),word=words[((day%words.length)+words.length)%words.length],term=document.querySelector(".word-float strong"),meaning=document.getElementById("word-gloss");
    if(term)term.textContent=word.fi;
    if(meaning)meaning.textContent=document.documentElement.lang==="fi"?word.fiMeaning:word.en;
  }
  function playPhrase(){
    if(!("speechSynthesis"in window)||!("SpeechSynthesisUtterance"in window))return;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance("Tervetuloa Suomeen.");
    utterance.lang="fi-FI";
    const voice=window.speechSynthesis.getVoices().find(item=>item.lang.toLowerCase().startsWith("fi"));
    if(voice)utterance.voice=voice;
    utterance.rate=.88;
    window.speechSynthesis.speak(utterance);
  }

  const languageSelect=document.getElementById("ui-language");
  const savedLanguage=safeGet(LANGUAGE_KEY)==="fi"?"fi":"en";
  applyLanguage(savedLanguage);
  if(languageSelect)languageSelect.addEventListener("change",event=>{applyLanguage(event.target.value);updateDailyWord();loadWeather(false)});
  updateDailyWord();
  updateClock();
  window.setInterval(updateClock,1000);
  window.setInterval(()=>loadWeather(false),15*60*1000);
  loadWeather(false);

  const citySelect=document.getElementById("weather-city");
  if(citySelect){
    citySelect.value=selectedCity().id;
    citySelect.addEventListener("change",()=>{
      safeSet(CITY_KEY,citySelect.value);
      updateClock();
      updateWeatherView();
      loadWeather(true);
    });
  }
  document.getElementById("weather-refresh")?.addEventListener("click",()=>loadWeather(true));
  document.querySelector(".listen-button")?.addEventListener("click",playPhrase);

  const menuButton=document.querySelector(".menu-toggle"),mobileMenu=document.querySelector(".mobile-menu");
  if(menuButton&&mobileMenu){
    menuButton.addEventListener("click",()=>{
      const open=menuButton.getAttribute("aria-expanded")==="true";
      menuButton.setAttribute("aria-expanded",String(!open));
      menuButton.setAttribute("aria-label",open?(document.documentElement.lang==="fi"?"Avaa valikko":"Open navigation"):(document.documentElement.lang==="fi"?"Sulje valikko":"Close navigation"));
      mobileMenu.classList.toggle("open",!open);
    });
    mobileMenu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mobileMenu.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}));
  }

  const search=document.getElementById("global-search"),feedback=document.getElementById("search-feedback"),cards=[...document.querySelectorAll(".path-card,.topic-card")];
  function searchCards(){
    const query=search.value.trim().toLocaleLowerCase(),lang=document.documentElement.lang==="fi";
    let count=0;
    cards.forEach(card=>{
      const haystack=(card.dataset.search||card.textContent).toLocaleLowerCase();
      const matches=!query||haystack.includes(query);
      card.hidden=!matches;
      if(matches)count++;
    });
    if(feedback){
      feedback.dataset.query=query;
      feedback.textContent=query?(count?(lang?"Näytetään "+count+" osuvaa aihetta ja oppimispolkua.":"Showing "+count+" matching guides and learning paths."):(lang?"Ei vielä osumia. Kokeile sanoja suomi, työ, opiskelu, sää tai kulttuuri.":"No result yet. Try Finnish, work, study, housing, weather, or culture.")):"";
    }
  }
  if(search){
    search.addEventListener("input",searchCards);
    document.querySelector(".search-wrap")?.addEventListener("submit",event=>{
      event.preventDefault();
      searchCards();
      const first=cards.find(card=>!card.hidden);
      if(first)first.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});
    });
    document.addEventListener("keydown",event=>{
      if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){
        event.preventDefault();
        search.focus();
      }
    });
  }
})();
