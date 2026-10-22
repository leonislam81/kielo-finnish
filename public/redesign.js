(function(){
  "use strict";
  const HELSINKI_ZONE="Europe/Helsinki";
  const cityKey="kielo-finland-city-v1";
  const weatherKey="kielo-finland-weather-v1";
  const dailyProgressKey="kielo-daily-100-progress-v1";
  const cities=[
    {id:"helsinki",name:"Helsinki",lat:60.1699,lon:24.9384},
    {id:"tampere",name:"Tampere",lat:61.4978,lon:23.7610},
    {id:"turku",name:"Turku",lat:60.4518,lon:22.2666},
    {id:"oulu",name:"Oulu",lat:65.0121,lon:25.4651},
    {id:"rovaniemi",name:"Rovaniemi",lat:66.5039,lon:25.7294},
    {id:"kuopio",name:"Kuopio",lat:62.8924,lon:27.6770}
  ];
  const topics=[
    {icon:"🕰️",title:"History & independence",text:"Trace Finland’s changing status, cultural milestones and independence through a sourced timeline.",fi:"historia · itsenäisyys",url:"https://finland.fi/life-society/main-outlines-of-finnish-history/",source:"This is Finland"},
    {icon:"🏛️",title:"Government & public services",text:"See which level handles national decisions, local services, and health or social care.",fi:"valtio · kunta",url:"https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works",source:"Suomi.fi"},
    {icon:"👥",title:"People, languages & society",text:"Explore population, languages, regions, and social life with dated official facts.",fi:"väestö · yhteiskunta",url:"https://stat.fi/en/statistics/pop",source:"Statistics Finland"},
    {icon:"🌦️",title:"Climate & seasons",text:"Follow the changing year, daylight, snow and weather from the south to Lapland.",fi:"sää · vuodenajat",url:"https://en.ilmatieteenlaitos.fi/seasons-in-finland",source:"Finnish Meteorological Institute"},
    {icon:"🌲",title:"Forests & nature",text:"Learn forest, wildlife and outdoor words through Finnish nature and current research.",fi:"metsä · luonto",url:"https://www.luke.fi/en/statistics/forest-resources",source:"Natural Resources Institute Finland"},
    {icon:"🌊",title:"Lakes, sea & archipelago",text:"Meet lake life, the Baltic Sea, islands, ports and coastal vocabulary.",fi:"järvi · meri · saaristo",url:"https://www.traficom.fi/en/fairways-and-ports",source:"Traficom"},
    {icon:"🚋",title:"Traffic & transport",text:"Practise tickets, routes and safe travel; open official live route and traffic services.",fi:"liikenne · reitti",url:"https://www.hsl.fi/en/travelling",source:"HSL"},
    {icon:"🎓",title:"Universities & study",text:"Learn the language of degrees, applications, campus life and study options.",fi:"yliopisto · opiskelu",url:"https://studyinfo.fi/",source:"Studyinfo"},
    {icon:"💼",title:"Jobs & working life",text:"Prepare for applications, interviews, workplace talk and job-search services.",fi:"työ · työnhaku",url:"https://www.workinfinland.com/en/",source:"Work in Finland"},
    {icon:"🧺",title:"Markets, shops & food",text:"Handle everyday shopping, prices, local food and conversations at the market.",fi:"tori · hinta",url:"https://finland.fi/life-society/",source:"This is Finland"},
    {icon:"📍",title:"Cities, regions & places",text:"Travel from Helsinki to the lake district and the north with place-based Finnish.",fi:"kaupunki · paikka",url:"https://www.visitfinland.com/en/",source:"Visit Finland"},
    {icon:"🧖",title:"Culture, sauna & media",text:"Explore customs and daily rhythms, then hear Finnish from original media.",fi:"sauna · kulttuuri",url:"https://finland.fi/life-society/bare-facts-of-the-sauna/",source:"This is Finland"}
  ];
  const travelRegions=[
    {id:"helsinki",title:"Helsinki region",icon:"🏙️",art:["🌲","🚋","🌊"],scene:"City life sits close to Nordic nature, public saunas, design and coastal day trips.",bnScene:"নর্ডিক প্রকৃতি, পাবলিক সাউনা, নকশা ও উপকূলের ভ্রমণের পাশেই নগরজীবন।",places:"Helsinki · Porvoo · Espoo",url:"https://www.visitfinland.com/en/places-to-go/helsinki-region/",words:[["kaupunki","city","শহর"],["pääkaupunki","capital city","রাজধানী"],["raitiovaunu","tram","ট্রাম"]],phrase:"Helsinki on Suomen pääkaupunki.",en:"Helsinki is the capital of Finland.",bn:"হেলসিঙ্কি ফিনল্যান্ডের রাজধানী।"},
    {id:"coast",title:"Coast & Archipelago",icon:"⛵",art:["🌊","⛵","🏝️"],scene:"The Baltic shoreline links island communities, maritime towns and ferry routes. Swedish-speaking communities are part of the coastal story.",bnScene:"বাল্টিক উপকূল দ্বীপের জনপদ, সমুদ্রঘেঁষা শহর ও ফেরির পথকে যুক্ত করে। উপকূলের ইতিহাসে সুইডিশভাষী জনসমাজও রয়েছে।",places:"Turku · Rauma · Åland",url:"https://www.visitfinland.com/en/places-to-go/coast-and-archipelago/",words:[["meri","sea","সমুদ্র"],["saaristo","archipelago","দ্বীপপুঞ্জ"],["saari","island","দ্বীপ"]],phrase:"Lautta kulkee saarelle.",en:"The ferry travels to the island.",bn:"ফেরিটি দ্বীপে যায়।"},
    {id:"lakeland",title:"Lakeland",icon:"🛶",art:["🌲","🏡","🛶"],scene:"Lakes, forest, cottages and year-round water activities shape this broad travel area.",bnScene:"হ্রদ, বন, কটেজ ও সারা বছরের জলকেন্দ্রিক কাজকর্ম এই বিস্তৃত ভ্রমণ-অঞ্চলকে চেনায়।",places:"Tampere · Kuopio · Savonlinna",url:"https://www.visitfinland.com/en/places-to-go/lakeland/",words:[["järvi","lake","হ্রদ"],["metsä","forest","বন"],["mökki","cottage","কটেজ"]],phrase:"Mökki on järven rannalla.",en:"The cottage is by the lake.",bn:"কটেজটি হ্রদের ধারে।"},
    {id:"lapland",title:"Lapland",icon:"🌌",art:["🌌","🌲","❄️"],scene:"Northern landscapes, Sámi culture, Arctic seasons, and distinct daylight rhythms make this a varied region. Follow local guidance when visiting nature areas.",bnScene:"উত্তরের ভূদৃশ্য, সামি সংস্কৃতি, আর্কটিক ঋতু ও দিনের আলোর ভিন্ন ছন্দ—সব মিলিয়ে এই অঞ্চল বৈচিত্র্যময়। প্রকৃতিতে গেলে স্থানীয় নির্দেশনা মানুন।",places:"Rovaniemi · Inari · Levi",url:"https://www.visitfinland.com/en/places-to-go/lapland/",words:[["pohjoinen","north","উত্তর"],["tunturi","fell","উত্তরের গোলাকার পাহাড়"],["revontulet","Northern Lights","মেরুজ্যোতি"]],phrase:"Revontulet näkyvät Lapissa talvella.",en:"The Northern Lights are visible in Lapland in winter.",bn:"শীতকালে ল্যাপল্যান্ডে মেরুজ্যোতি দেখা যায়।"}
  ];
  const finlandFacts=[
    {icon:"👥",value:"5,652,881",label:"people",meta:"31 December 2025",fi:"väestö",en:"population",bn:"জনসংখ্যা",url:"https://stat.fi/en/statistics/vaerak",source:"Statistics Finland"},
    {icon:"🧓",value:"23.8%",label:"aged 65 or over",meta:"2025",fi:"ikä",en:"age",bn:"বয়স",url:"https://stat.fi/en/statistics/vaerak",source:"Statistics Finland"},
    {icon:"🌲",value:"22.4 million ha",label:"forest area",meta:"2024 · FAO definition",fi:"metsäala",en:"forest area",bn:"বনাঞ্চল",url:"https://www.luke.fi/en/statistics/forest-accounts/forest-accounts-2024",source:"Luke"},
    {icon:"🪵",value:"€139 billion",label:"growing stock value",meta:"2024 · theoretical accounting value",fi:"puusto",en:"growing stock",bn:"বনে দাঁড়ানো গাছের মজুতের মূল্য",url:"https://www.luke.fi/en/statistics/forest-accounts/forest-accounts-2024",source:"Luke"}
  ];
  const chapterLearning=[
    {fact:"Finland declared independence in 1917. Use the linked timeline for the events that led to independence and the years that followed.",phrase:"Suomi itsenäistyi vuonna 1917.",en:"Finland became independent in 1917.",bn:"ফিনল্যান্ড ১৯১৭ সালে স্বাধীন হয়।",words:[["historia","history","ইতিহাস"],["itsenäisyys","independence","স্বাধীনতা"],["vuosi","year","বছর"],["muistaa","to remember","মনে রাখা"]],question:"Which word means “independence”?",options:["itsenäisyys","vuosi","muistaa"],answer:0},
    {fact:"Finland is a parliamentary republic. Municipalities organise many local services; responsibilities can change, so use the official source for current details.",phrase:"Kunta järjestää monia arjen palveluja.",en:"A municipality organises many everyday services.",bn:"পৌরসভা দৈনন্দিন জীবনের অনেক সেবা পরিচালনা করে।",words:[["eduskunta","parliament","সংসদ"],["kunta","municipality","পৌরসভা"],["äänestää","to vote","ভোট দেওয়া"],["palvelu","service","সেবা"]],question:"Which word means “municipality”?",options:["palvelu","kunta","eduskunta"],answer:1},
    {fact:"Finnish and Swedish are Finland’s national languages. Sámi languages are spoken by Sámi people, the Indigenous people of the northern region; languages and communities are diverse.",phrase:"Suomessa puhutaan suomea ja ruotsia.",en:"Finnish and Swedish are spoken in Finland.",bn:"ফিনল্যান্ডে ফিনিশ ও সুইডিশ ভাষা বলা হয়।",words:[["väestö","population","জনসংখ্যা"],["kieli","language","ভাষা"],["ruotsi","Swedish","সুইডিশ"],["saamelaiset","the Sámi","সামি জনগোষ্ঠী"]],question:"Which word means “language”?",options:["väestö","kieli","ruotsi"],answer:1},
    {fact:"The Finnish Meteorological Institute describes thermal seasons by temperature patterns. Their timing differs between the south and north and can shift from one year to another.",phrase:"Päivänvalo muuttuu vuodenajan mukaan.",en:"Daylight changes with the season.",bn:"ঋতুর সঙ্গে দিনের আলোর সময় বদলে যায়।",words:[["sää","weather","আবহাওয়া"],["vuodenaika","season","ঋতু"],["lämpötila","temperature","তাপমাত্রা"],["päivänvalo","daylight","দিনের আলো"]],question:"Which word means “season”?",options:["lämpötila","sää","vuodenaika"],answer:2},
    {fact:"Forests shape Finland’s landscape and are tracked in long-running national statistics. Trails, berry picking and outdoor access have their own local guidance; check signs and current rules.",phrase:"Metsässä on merkitty polku.",en:"There is a marked trail in the forest.",bn:"বনে একটি চিহ্নিত পথ আছে।",words:[["metsä","forest","বন"],["puu","tree","গাছ"],["polku","trail","পায়ে চলার পথ"],["marja","berry","বেরি"]],question:"Which word means “forest”?",options:["marja","metsä","polku"],answer:1},
    {fact:"Finland has a long Baltic coastline as well as lakes and island landscapes. Coastal travel, ports and lake life differ by region and season.",phrase:"Kesällä kävelemme rannikkoa pitkin.",en:"In summer, we walk along the coast.",bn:"গ্রীষ্মে আমরা উপকূল ধরে হাঁটি।",words:[["meri","sea","সমুদ্র"],["järvi","lake","হ্রদ"],["saari","island","দ্বীপ"],["rannikko","coast","উপকূল"]],question:"Which word means “island”?",options:["järvi","rannikko","saari"],answer:2},
    {fact:"Transit tickets and route systems are regional. HSL covers the Helsinki region; check the local operator for routes, prices, service changes and accessibility.",phrase:"Missä vaihdan raitiovaunuun?",en:"Where do I change to the tram?",bn:"ট্রামে উঠতে আমি কোথায় পরিবর্তন করব?",words:[["joukkoliikenne","public transport","গণপরিবহন"],["lippu","ticket","টিকিট"],["pysäkki","stop","স্টপ"],["vaihtaa","to change / transfer","পরিবর্তন করা"]],question:"Which word means “ticket”?",options:["pysäkki","lippu","vaihtaa"],answer:1},
    {fact:"Finland’s higher education includes universities and universities of applied sciences. Studyinfo is the official application service; eligibility and language requirements vary by programme.",phrase:"Hän hakee yliopistoon.",en:"They are applying to a university.",bn:"তিনি বিশ্ববিদ্যালয়ে আবেদন করছেন।",words:[["yliopisto","university","বিশ্ববিদ্যালয়"],["korkeakoulu","higher-education institution","উচ্চশিক্ষা প্রতিষ্ঠান"],["hakemus","application","আবেদন"],["tutkinto","degree","ডিগ্রি"]],question:"Which word means “application”?",options:["tutkinto","hakemus","yliopisto"],answer:1},
    {fact:"Job-search language is useful, but job titles, language expectations and right-to-work requirements vary. Work in Finland provides current guidance and links to services.",phrase:"Olen kiinnostunut tästä työpaikasta.",en:"I am interested in this job.",bn:"আমি এই চাকরিতে আগ্রহী।",words:[["työpaikka","job / workplace","চাকরি / কর্মস্থল"],["hakemus","application","আবেদন"],["ansioluettelo","CV / résumé","জীবনবৃত্তান্ত"],["haastattelu","interview","সাক্ষাৎকার"]],question:"Which word means “interview”?",options:["haastattelu","työpaikka","ansioluettelo"],answer:0},
    {fact:"A tori is an open market square. Opening days, sellers and seasonal products vary, so check the local market’s current information before planning a visit.",phrase:"Mitä tämä maksaa?",en:"How much does this cost?",bn:"এটার দাম কত?",words:[["tori","market square","বাজার চত্বর"],["hinta","price","দাম"],["tuore","fresh","তাজা"],["maksaa","to cost / to pay","দাম হওয়া / পরিশোধ করা"]],question:"Which word means “price”?",options:["tuore","maksaa","hinta"],answer:2},
    {fact:"The capital, Helsinki, sits on the southern coast. Finnish regions have different landscapes, distances and local services; use place names and current travel sources when planning.",phrase:"Helsinki on Suomen pääkaupunki.",en:"Helsinki is the capital of Finland.",bn:"হেলসিঙ্কি ফিনল্যান্ডের রাজধানী।",words:[["kaupunki","city","শহর"],["pääkaupunki","capital city","রাজধানী"],["keskusta","city centre","শহরের কেন্দ্র"],["pohjoinen","north / northern","উত্তর / উত্তরাঞ্চল"]],question:"Which word means “capital city”?",options:["kaupunki","pohjoinen","pääkaupunki"],answer:2},
    {fact:"Sauna is a living Finnish tradition with regional and personal variation. This reading explains the practice without treating one custom as universal; follow the host’s guidance in a shared sauna.",phrase:"Sauna kuuluu monen arkeen.",en:"Sauna is part of many people’s everyday life.",bn:"অনেকের দৈনন্দিন জীবনের অংশ হলো সাউনা।",words:[["sauna","sauna","সাউনা"],["löyly","steam / heat of the sauna","সাউনার বাষ্প / গরম ভাব"],["pyyhe","towel","তোয়ালে"],["sääntö","rule","নিয়ম"]],question:"Which word means “towel”?",options:["löyly","pyyhe","sääntö"],answer:1}
  ];
  const esc=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||"null")??fallback}catch(_error){return fallback}}
  function cityNow(){const id=localStorage.getItem(cityKey)||"helsinki";return cities.find(city=>city.id===id)||cities[0]}
  function helsinkiDayKey(date=new Date()){
    const parts=new Intl.DateTimeFormat("en-CA",{timeZone:HELSINKI_ZONE,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(date);
    const part=type=>parts.find(item=>item.type===type)?.value||"";
    return part("year")+"-"+part("month")+"-"+part("day");
  }
  function formattedHelsinkiDate(date=new Date()){
    return new Intl.DateTimeFormat("en-US",{timeZone:HELSINKI_ZONE,weekday:"long",day:"numeric",month:"long"}).format(date);
  }
  let cachedWeather=readJSON(weatherKey,null),weatherRequest=null,lastWeatherMessage="";
  let frequentWordPromise=null,frequentWordsReady=false,frequentWordsError="";
  let fullDictionaryPromise=null,fullDictionaryEntries=null,fullDictionaryError="",fullDictionarySavedOffline=false;
  let dictionarySearchTimer=0,dictionaryPage=0;
  function weatherLabel(code){
    if(code===0)return ["Clear sky","☀️"];
    if(code===1)return ["Mostly clear","🌤️"];
    if(code===2)return ["Partly cloudy","⛅"];
    if(code===3)return ["Overcast","☁️"];
    if(code===45||code===48)return ["Fog","🌫️"];
    if(code>=51&&code<=57)return ["Drizzle","🌦️"];
    if(code>=61&&code<=67)return ["Rain","🌧️"];
    if(code>=71&&code<=77)return ["Snow","🌨️"];
    if(code>=80&&code<=82)return ["Rain showers","🌧️"];
    if(code>=85&&code<=86)return ["Snow showers","🌨️"];
    if(code>=95)return ["Thunderstorm","⛈️"];
    return ["Current conditions","🌤️"];
  }
  function localUpdated(when){
    if(!when)return "Waiting for the first update";
    return "Updated "+new Intl.DateTimeFormat("en-US",{timeZone:HELSINKI_ZONE,hour:"numeric",minute:"2-digit"}).format(new Date(when))+" Finland time";
  }
  async function fetchGzipJson(path){
    if(!("DecompressionStream"in window))throw new Error("This browser cannot open the compressed word bank.");
    const response=await fetch(new URL(path,document.baseURI),{cache:"force-cache"});
    if(!response.ok)throw new Error("The word bank could not be loaded ("+response.status+").");
    const stream=response.body.pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).json();
  }
  function statusMarkup(){
    const city=cityNow(),weather=cachedWeather?.cityId===city.id?cachedWeather:null;
    const current=weather?.current,conditions=current?weatherLabel(Number(current.weather_code)):null;
    const cityOptions=cities.map(item=>'<option value="'+item.id+'" '+(item.id===city.id?"selected":"")+'>'+item.name+"</option>").join("");
    const temperature=current?Math.round(Number(current.temperature_2m))+"°C":"—";
    const apparent=current?Math.round(Number(current.apparent_temperature))+"°":"";
    const summary=current?conditions[0]:(lastWeatherMessage||"Loading current conditions…");
    const icon=current?conditions[1]:"🌦️";
    const wind=current?Math.round(Number(current.wind_speed_10m))+" km/h":"—";
    const humidity=current?Math.round(Number(current.relative_humidity_2m))+"%":"—";
    return '<section class="finland-status-grid" id="finland-status" aria-label="Finland local time and weather">'+
      '<article class="finland-status-card"><div class="finland-status-head"><div class="finland-status-label"><span class="status-icon" aria-hidden="true">◷</span> Finland local time</div><span class="finland-live">LIVE CLOCK</span></div><div class="finland-clock-line"><time class="finland-clock" id="finland-clock" aria-label="Current time in Finland">—:—:—</time><span class="finland-timezone" id="finland-timezone"></span></div><div class="finland-clock-date" id="finland-date"></div></article>'+
      '<article class="finland-status-card"><div class="finland-status-head"><div class="finland-status-label"><span class="status-icon" aria-hidden="true">☁</span> Current weather</div><div class="finland-weather-tools"><label class="sr-only" for="finland-city">Choose a Finnish city</label><select class="finland-city-select" id="finland-city" aria-label="Choose a Finnish city">'+cityOptions+'</select><button class="finland-refresh" type="button" data-weather-refresh aria-label="Refresh weather" title="Refresh weather">↻</button></div></div><div class="finland-weather-main" id="finland-weather-content"><span class="finland-weather-icon" aria-hidden="true">'+icon+'</span><div><div class="finland-temperature">'+esc(temperature)+' <span class="finland-weather-copy">'+esc(summary)+'</span></div><div class="finland-weather-copy">'+(current?"Feels like "+esc(apparent):"Weather can take a few seconds to load")+'</div></div><div class="finland-weather-facts">Wind '+esc(wind)+'<br>Humidity '+esc(humidity)+'</div></div><div class="finland-weather-credit"><span id="finland-weather-updated">'+esc(localUpdated(weather?.updatedAt))+'</span><a href="https://open-meteo.com/en/terms" target="_blank" rel="noreferrer" title="Free API use is for non-commercial purposes and requires CC BY 4.0 attribution">Weather by Open-Meteo · CC BY 4.0 ↗</a></div></article></section>';
  }
  function refreshStatusContent(){
    const card=document.getElementById("finland-status");if(!card)return;
    const city=cityNow(),weather=cachedWeather?.cityId===city.id?cachedWeather:null,current=weather?.current,conditions=current?weatherLabel(Number(current.weather_code)):null;
    const icon=card.querySelector(".finland-weather-icon"),temp=card.querySelector(".finland-temperature"),copy=card.querySelector(".finland-weather-copy"),facts=card.querySelector(".finland-weather-facts"),updated=document.getElementById("finland-weather-updated");
    if(icon)icon.textContent=current?conditions[1]:"🌦️";
    if(temp)temp.innerHTML=esc(current?Math.round(Number(current.temperature_2m))+"°C":"—")+' <span class="finland-weather-copy">'+esc(current?conditions[0]:(lastWeatherMessage||"Loading current conditions…"))+"</span>";
    const secondary=card.querySelector(".finland-temperature")?.parentElement?.querySelector(":scope > .finland-weather-copy");
    if(secondary)secondary.textContent=current?"Feels like "+Math.round(Number(current.apparent_temperature))+"°":"Weather can take a few seconds to load";
    if(facts)facts.innerHTML="Wind "+(current?Math.round(Number(current.wind_speed_10m))+" km/h":"—")+"<br>Humidity "+(current?Math.round(Number(current.relative_humidity_2m))+"%":"—");
    if(updated)updated.textContent=localUpdated(weather?.updatedAt);
  }
  function updateClock(){
    const clock=document.getElementById("finland-clock");if(!clock)return;
    const now=new Date();
    clock.textContent=new Intl.DateTimeFormat("en-GB",{timeZone:HELSINKI_ZONE,hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).format(now);
    const zone=new Intl.DateTimeFormat("en-US",{timeZone:HELSINKI_ZONE,timeZoneName:"short"}).formatToParts(now).find(item=>item.type==="timeZoneName")?.value||"Europe/Helsinki";
    const tz=document.getElementById("finland-timezone");if(tz)tz.textContent=zone+" · "+HELSINKI_ZONE;
    const date=document.getElementById("finland-date");if(date)date.textContent=cityNow().name+" · "+formattedHelsinkiDate(now);
  }
  async function loadWeather(force=false){
    if(weatherRequest)return weatherRequest;
    const city=cityNow(),fresh=cachedWeather?.cityId===city.id&&Date.now()-Number(cachedWeather.updatedAt||0)<15*60*1000;
    if(!force&&fresh){refreshStatusContent();return}
    weatherRequest=(async()=>{
      try{
        const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
        const params=new URLSearchParams({latitude:String(city.lat),longitude:String(city.lon),current:"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",timezone:HELSINKI_ZONE});
        const response=await fetch("https://api.open-meteo.com/v1/forecast?"+params.toString(),{signal:controller.signal,cache:"no-store"});
        clearTimeout(timeout);
        if(!response.ok)throw new Error("Weather service returned "+response.status);
        const data=await response.json();
        if(!data.current)throw new Error("Weather data is not available right now");
        cachedWeather={cityId:city.id,current:data.current,updatedAt:Date.now()};
        localStorage.setItem(weatherKey,JSON.stringify(cachedWeather));
        lastWeatherMessage="";
      }catch(error){lastWeatherMessage=cachedWeather?.cityId===city.id?"Showing the latest saved weather":(error?.name==="AbortError"?"Weather update timed out":"Weather temporarily unavailable")}
      finally{weatherRequest=null;refreshStatusContent()}
    })();
    return weatherRequest;
  }
  function dailyVocabulary(includeFrequency=true){
    const result=[],seen=new Set();
    const add=(fi,en,bn,level,topic)=>{
      if(!fi||seen.has(String(fi).toLocaleLowerCase("fi")))return;
      seen.add(String(fi).toLocaleLowerCase("fi"));
      result.push({fi:String(fi),en:String(en||""),bn:String(bn||""),level:String(level||"A1"),topic:String(topic||"Everyday Finnish")});
    };
    (window.KIELO_LEVELS||[]).forEach(level=>(level.lessons||[]).forEach(lesson=>(lesson.words||[]).forEach(word=>add(word[0],word[1],word[2],level.label,lesson.title))));
    (window.KIELO_ADVANCED_WORDS||[]).forEach(word=>add(word.fi,word.en,word.bn,word.level,word.topic));
    (window.KIELO_DAILY_WORDS||[]).forEach(word=>add(word.fi,word.en,word.bn,word.level,word.topic));
    if(includeFrequency)(window.KIELO_FREQUENT_WORDS||[]).forEach(([fi,en,frequency])=>{
      add(fi,en,"","News corpus","Yle · "+new Intl.NumberFormat("en",{notation:"compact",maximumFractionDigits:1}).format(Number(frequency||0))+" occurrences");
    });
    return result;
  }
  function dailyShuffle(items,seed){
    let value=seed>>>0;
    const random=()=>{value+=0x6D2B79F5;let t=value;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296};
    const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out;
  }
  function selectedDailyLanguage(){return localStorage.getItem("kielo-daily-meaning-language")||"en"}
  function dailyBank(language=selectedDailyLanguage()){
    return dailyVocabulary(language==="en").filter(word=>language!=="bn"||Boolean(word.bn?.trim()));
  }
  function dayWords(language=selectedDailyLanguage()){
    const key=helsinkiDayKey(),hash=key.split("").reduce((total,char)=>Math.imul(total^char.charCodeAt(0),16777619),2166136261)>>>0;
    return dailyShuffle(dailyBank(language),hash).slice(0,100);
  }
  let activeGroup=0,activeTopicIndex=-1,activeRegionId="helsinki",dailyQuiz=null,dailyRecallMode=localStorage.getItem("kielo-daily-recall-mode")==="true",dailyRevealed=new Set();
  function dailyProgress(dateKey=helsinkiDayKey(),language=selectedDailyLanguage()){
    const saved=readJSON(language==="bn"?dailyProgressKey+"-bn":dailyProgressKey,{});
    const values=Array.isArray(saved[dateKey])?saved[dateKey]:[];
    return new Set(values);
  }
  function storeDailyProgress(set,dateKey=helsinkiDayKey(),language=selectedDailyLanguage()){
    const key=language==="bn"?dailyProgressKey+"-bn":dailyProgressKey,saved=readJSON(key,{});
    saved[dateKey]=[...set];
    const keep=Object.keys(saved).sort().slice(-90).reduce((next,key)=>(next[key]=saved[key],next),{});
    try{localStorage.setItem(key,JSON.stringify(keep))}catch(_error){}
  }
  function getVoices(){try{return "speechSynthesis"in window?window.speechSynthesis.getVoices().filter(voice=>voice.lang?.toLowerCase().startsWith("fi")):[]}catch(_error){return []}}
  function voiceOptions(){
    const voices=getVoices(),chosen=localStorage.getItem("kielo-finnish-voice")||"";
    return '<option value="">Automatic Finnish voice</option>'+voices.map(voice=>'<option value="'+esc(voice.name)+'" '+(voice.name===chosen?"selected":"")+'>'+esc(voice.name)+" · "+esc(voice.lang)+(voice.localService?" · device":"")+"</option>").join("");
  }
  function speakFinnish(text){if(window.KieloSpeech)window.KieloSpeech.speak(text,Number(localStorage.getItem("kielo-finnish-rate")||".86"))}
  function setActiveCustomPage  function setActiveCustomPage(page){
    document.querySelectorAll(".nav-link").forEach(button=>button.classList.toggle("active",button.dataset.redesignPage===page||(page==="home"&&button.dataset.page==="home")));
  }
  function customPageTitle(title,description,kicker){
    return '<div class="page-title-row finland-custom-page"><div><div class="page-kicker">'+esc(kicker)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></div>';
  }
  function voiceTools(){const available=getVoices().length>0;const note=available?"Natural Finnish male/female voices are not connected yet. Choose an installed Finnish device voice, or listen to authentic <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clips ↗</a>.":"This browser has no Finnish voice installed. Natural male/female voices are not connected yet; try an authentic <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clip ↗</a>.";return '<div class=\"finland-voice-tools\"><label for=\"finnish-neural-voice\">Natural Finnish voice<select id=\"finnish-neural-voice\"><option value=\"device\">Device voice · automatic</option><option value=\"fi-FI-SelmaNeural\" data-neural disabled>Female · Selma</option><option value=\"fi-FI-NooraNeural\" data-neural disabled>Female · Noora</option><option value=\"fi-FI-HarriNeural\" data-neural disabled>Male · Harri</option></select></label><label for=\"finnish-voice-select\">Available device voice<select id=\"finnish-voice-select\">'+voiceOptions()+'</select></label><label for=\"finnish-rate-select\">Speaking pace<select id=\"finnish-rate-select\"><option value=\".72\">Slow</option><option value=\".86\" selected>Steady</option><option value=\"1\">Natural</option></select></label></div><p class=\"finland-voice-note\" role=\"status\" aria-live=\"polite\">'+note+'</p>'}
  async function updateNeuralVoiceUi(){const select=document.getElementById("finnish-neural-voice");if(!select||!window.KieloSpeech)return;const note=document.querySelector(".finland-voice-note");const status=await window.KieloSpeech.getStatus();const options=select.querySelectorAll("option[data-neural]");options.forEach(option=>option.disabled=!status.enabled);if(!status.enabled&&select.value!=="device"){select.value="device";localStorage.setItem("kielo-neural-voice","device")}if(note){note.innerHTML=status.enabled?"Azure neural Finnish audio is ready. Speech requests use Microsoft’s service and this Site caps them at "+Number(status.dailyCharacterCap).toLocaleString()+" characters per Finnish day, shared across visitors. Use the device voice if you prefer not to send a phrase for synthesis.":"Natural Finnish male/female voices are not connected yet. Use an installed Finnish device voice or authentic <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clips ↗</a>."}}
  function meaningLanguageTools  function meaningLanguageTools(language){
    const bn=language==="bn";
    return '<div class="finland-meaning-tools"><label for="finland-meaning-language">Daily meanings<select id="finland-meaning-language"><option value="en" '+(language==="en"?"selected":"")+'>English · wide word bank</option><option value="bn" '+(bn?"selected":"")+'>Bangla · curated word bank</option></select></label><span>'+(bn?"বাংলা অর্থসহ বাছাই করা শব্দ দেখানো হচ্ছে। ইংরেজি মোডে আরও বড় শব্দভান্ডার আছে।":"Bangla mode includes only words with a curated Bangla meaning. English mode adds the wider frequency bank.")+'</span><button class="button-secondary finland-recall-toggle" type="button" data-daily-recall-toggle aria-pressed="'+dailyRecallMode+'">'+(bn?(dailyRecallMode?"✓ আগে মনে করার মোড চালু":"আগে মনে করো · অর্থ লুকাও"):(dailyRecallMode?"✓ Recall first is on":"Recall first · hide meanings"))+'</button></div>';
  }
  function setVoiceSelection(){const voice=document.getElementById("finnish-voice-select"),rate=document.getElementById("finnish-rate-select"),neural=document.getElementById("finnish-neural-voice");if(voice)voice.value=localStorage.getItem("kielo-finnish-voice")||"";if(rate)rate.value=localStorage.getItem("kielo-finnish-rate")||".86";if(neural)neural.value=localStorage.getItem("kielo-neural-voice")||"device";void updateNeuralVoiceUi()}
  function loadFrequentWords  function loadFrequentWords(){
    if(frequentWordsReady)return Promise.resolve(window.KIELO_FREQUENT_WORDS||[]);
    if(frequentWordPromise)return frequentWordPromise;
    frequentWordPromise=fetchGzipJson("data/fi-en-frequent.json.gz?v=3").then(items=>{
      window.KIELO_FREQUENT_WORDS=items;frequentWordsReady=true;frequentWordsError="";
      if(document.getElementById("finland-daily-loading"))renderDaily();
      return items;
    }).catch(error=>{
      frequentWordsError=error?.message||"The expanded word list is temporarily unavailable.";
      frequentWordPromise=null;
      if(document.getElementById("finland-daily-loading"))renderDaily();
      return [];
    });
    return frequentWordPromise;
  }
  function renderDaily(){
    const page=document.getElementById("page-content");if(!page)return;
    const language=selectedDailyLanguage();
    if(language==="en"&&!frequentWordsReady&&!frequentWordsError){
      page.innerHTML=customPageTitle("Daily 100","A Finnish date, a fresh set of 100 words, and ten manageable groups of ten.","Learn through everyday Finland")+
        '<section class="finland-daily-overview"><div><h2>Preparing today’s 100 words</h2><p>Loading the frequency-based Finnish word collection. Your search and progress stay in this browser.</p></div><span class="finland-daily-counter" aria-hidden="true">100</span></section>'+meaningLanguageTools(language)+voiceTools()+'<p class="finland-dictionary-status" id="finland-daily-loading" role="status" aria-live="polite">Opening the Finnish word collection…</p>';
      setActiveCustomPage("daily");setVoiceSelection();loadFrequentWords();return;
    }
    const day=helsinkiDayKey(),items=dayWords(language),availableWords=dailyBank(language).length,learned=dailyProgress(day,language),start=activeGroup*10,group=items.slice(start,start+10);
    const dailySourceCopy=language==="bn"?"This Bangla-enabled set uses curated course and learner words, so each entry has English and Bangla meanings.":frequentWordsReady?"This set changes at midnight in Finland and is drawn from a frequency-ranked Finnish news corpus plus Kielo’s lesson words.":"The expanded word bank is unavailable right now, so this set uses Kielo’s built-in learner vocabulary.";
    const groupButtons=Array.from({length:10},(_,index)=>{
      const count=items.slice(index*10,index*10+10).filter(word=>learned.has(word.fi)).length;
      return '<button class="finland-group-button '+(index===activeGroup?"active ":"")+(count===10?"done":"")+'" type="button" data-daily-group="'+index+'" aria-label="Word set '+(index+1)+', '+count+' of 10 learned" aria-pressed="'+(index===activeGroup)+'">'+(count===10?"✓":index+1)+'</button>';
    }).join("");
    const cards=group.map((word,index)=>{
      const overall=start+index,done=learned.has(word.fi);
      const primary=language==="bn"?(word.bn||"বাংলা অর্থ যোগ করা হচ্ছে"):word.en,secondary=language==="bn"?word.en:(word.bn||(word.level==="News corpus"?"No Bangla translation in this source · এই উৎসে বাংলা অর্থ নেই":"বাংলা অর্থ যোগ করা হচ্ছে"));
      const revealed=dailyRevealed.has(overall),recall=dailyRecallMode;
      const meanings=recall&&!revealed?'<div class="finland-recall-hidden" lang="'+(language==="bn"?"bn":"en")+'">'+(language==="bn"?"অর্থ প্রকাশের আগে একটু থামুন, মনে করার চেষ্টা করুন।":"Pause and recall the meaning before revealing it.")+'</div>':'<p class="finland-word-translation" lang="'+(language==="bn"?"bn":"en")+'">'+esc(primary)+'</p><p class="finland-word-bn" lang="'+(language==="bn"?"en":"bn")+'">'+esc(secondary)+'</p>';
      const revealControl=recall?'<button class="finland-word-reveal" type="button" data-daily-meaning-toggle="'+overall+'" aria-expanded="'+revealed+'">'+(language==="bn"?(revealed?"অর্থ লুকাও":"অর্থ দেখাও"):(revealed?"Hide meaning":"Reveal meaning"))+'</button>':'';
      return '<article class="finland-word-card"><div class="finland-word-top"><h3 lang="fi">'+esc(word.fi)+'</h3><span class="finland-word-level">'+esc(word.level)+' · '+esc(word.topic)+'</span></div><div class="finland-word-meaning-area">'+meanings+revealControl+'</div><div class="finland-word-actions"><button type="button" data-daily-speak="'+overall+'" aria-label="Hear '+esc(word.fi)+' in Finnish">▶ Listen</button><button type="button" class="'+(done?"learned":"")+'" data-daily-learn="'+overall+'" aria-pressed="'+done+'">'+(done?"✓ Learned":"Mark learned")+'</button></div></article>';
    }).join("");
    page.innerHTML=customPageTitle("Daily 100","A Finnish date, a fresh set of 100 words, and ten manageable groups of ten.","Learn through everyday Finland")+
      '<section class="finland-daily-overview"><div><h2>Today’s Finnish word journey</h2><p>'+esc(formattedHelsinkiDate())+' · Europe/Helsinki · '+esc(dailySourceCopy)+' 100 daily words from a pool of '+availableWords.toLocaleString()+'.</p></div><div class="finland-daily-counter">'+Math.min(100,learned.size)+' <small>/ 100 learned</small></div></section>'+
      meaningLanguageTools(language)+voiceTools()+'<div class="finland-groups" role="group" aria-label="Choose one of ten word sets">'+groupButtons+'</div>'+
      '<div class="finland-page-footer"><p>Set '+(activeGroup+1)+' of 10 · words '+(start+1)+'–'+(start+group.length)+'</p><div><button class="button-secondary" type="button" data-daily-prev '+(activeGroup===0?"disabled":"")+'>← Previous set</button> <button class="button-primary" type="button" data-daily-next '+(activeGroup===9?"disabled":"")+'>Next set →</button></div></div>'+
      '<section class="finland-word-grid" aria-label="Finnish words in set '+(activeGroup+1)+'">'+cards+'</section>'+dailyQuizMarkup(language,items)+
      '<div class="finland-page-footer"><p>Saved learning progress stays on this device. '+(frequentWordsError?'<button class="link-button" type="button" data-frequency-retry>Try loading the larger word bank again</button> · ':'')+(frequentWordsReady?'Frequency counts come from Finnish Yle news (2011–2024), not a universal ranking of spoken words. ':'')+'<a href="data/ATTRIBUTION.md" target="_blank" rel="noreferrer">Sources ↗</a></p><button class="link-button" type="button" data-page="home">← Back to home</button></div>';
    setActiveCustomPage("daily");setVoiceSelection();
  }
  function dailyQuizMarkup(language,items){
    const day=helsinkiDayKey();
    if(dailyQuiz&&(dailyQuiz.language!==language||dailyQuiz.group!==activeGroup||dailyQuiz.day!==day))dailyQuiz=null;
    const labels=language==="bn";
    const heading="Quick check · Set "+(activeGroup+1);
    if(!dailyQuiz)return '<section class="finland-daily-quiz" aria-labelledby="finland-daily-quiz-title"><div><span class="finland-quiz-kicker">RECALL · 10 QUESTIONS</span><h2 id="finland-daily-quiz-title">'+heading+'</h2><p>'+(labels?"প্রতিটি অর্থের সঙ্গে সঠিক Finnish শব্দটি মেলাও। এই সেটের ১০টি শব্দই একবার করে আসবে।":"Match each meaning to its Finnish word. All 10 words in this set appear once.")+'</p></div><button class="button-primary" type="button" data-daily-quiz-start>'+(labels?"শুরু করি →":"Start quick check →")+'</button></section>';
    if(dailyQuiz.questionIndex>=dailyQuiz.questions.length){
      const score=dailyQuiz.score,total=dailyQuiz.questions.length,missed=dailyQuiz.missed||[];
      const rows=missed.map(entry=>'<li><strong lang="fi">'+esc(entry.question.word.fi)+'</strong><span lang="'+(labels?"bn":"en")+'">'+esc(entry.question.meaning)+'</span><small>'+(labels?"তুমি বেছে নিয়েছিলে: ":"You chose: ")+'<span lang="fi">'+esc(entry.chosen)+'</span></small></li>').join("");
      const review=missed.length?'<div class="finland-quiz-review"><h3 id="finland-quiz-review-title">'+(labels?"আবার দেখে নাও · ":"Words to revisit · ")+missed.length+'</h3><ul aria-labelledby="finland-quiz-review-title">'+rows+'</ul></div>':'';
      const reviewButton=missed.length?'<button class="button-primary" type="button" data-daily-quiz-missed>'+(labels?"ভুল হওয়া শব্দগুলো অনুশীলন →":"Practice missed words →")+'</button>':'';
      return '<section class="finland-daily-quiz finland-daily-quiz-result" aria-labelledby="finland-daily-quiz-title"><div><span class="finland-quiz-kicker">'+(dailyQuiz.scope==="missed"?(labels?"পুনরায় অনুশীলন শেষ":"REVIEW COMPLETE"):"SET COMPLETE")+'</span><h2 id="finland-daily-quiz-title">'+(labels?"তোমার স্কোর ":"Your score: ")+score+' / '+total+'</h2><p>'+(missed.length?(labels?"ভুল হওয়া শব্দগুলো নিচে দেখো, চাইলে শুধু সেগুলো আবার অনুশীলন করো।":"Review these words below, or practise only the ones you missed."):(labels?"দারুণ! এই রাউন্ডের সব শব্দ চিনতে পেরেছ।":"Excellent recall. You matched every word this round."))+'</p></div>'+review+'<div class="finland-quiz-result-actions">'+reviewButton+'<button class="button-secondary" type="button" data-daily-quiz-restart>'+(labels?"পুরো সেট আবার করো":"Retry full set")+'</button></div></section>';
    }
    const question=dailyQuiz.questions[dailyQuiz.questionIndex],correct=question.word.fi,answered=dailyQuiz.answered,chosen=dailyQuiz.chosen;
    const choices=question.choices.map((word,choice)=>'<button type="button" class="finland-quiz-choice '+(answered&&word.fi===correct?"correct":"")+(answered&&word.fi===chosen&&chosen!==correct?" incorrect":"")+'" data-daily-quiz-answer="'+choice+'" '+(answered?"disabled":"")+' lang="fi">'+esc(word.fi)+'</button>').join("");
    const feedback=answered?(chosen===correct?(labels?"সঠিক! "+correct+" মানে “"+question.meaning+"”।":"Correct! "+correct+" means “"+question.meaning+"”."):(labels?"সঠিক উত্তর: "+correct+" — “"+question.meaning+"”।":"The answer is "+correct+" — “"+question.meaning+"”.")):"";
    const total=dailyQuiz.questions.length,completed=dailyQuiz.questionIndex+(answered?1:0),progress=Math.round(completed/total*100);
    return '<section class="finland-daily-quiz" aria-labelledby="finland-daily-quiz-title"><div class="finland-quiz-heading"><div><span class="finland-quiz-kicker">'+(dailyQuiz.scope==="missed"?(labels?"ভুল হওয়া শব্দ":"MISSED WORDS"):(labels?"দৈনিক অনুশীলন":"DAILY PRACTICE"))+' · '+(dailyQuiz.questionIndex+1)+' / '+total+'</span><h2 id="finland-daily-quiz-title">'+heading+'</h2></div><span class="finland-quiz-score">'+(labels?"স্কোর ":"Score ")+dailyQuiz.score+'</span></div><div class="finland-quiz-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+completed+'"><span style="width:'+progress+'%"></span></div><p class="finland-quiz-prompt">'+(labels?"Finnish-এ কী হবে:":"What is the Finnish word for:")+' <strong lang="'+(labels?"bn":"en")+'">'+esc(question.meaning)+'</strong></p><div class="finland-quiz-choices" role="group" aria-label="Choose the Finnish word">'+choices+'</div><p class="finland-quiz-feedback" id="finland-daily-quiz-feedback" role="status" aria-live="polite" tabindex="-1">'+esc(feedback)+'</p>'+(answered?'<button class="button-primary" type="button" data-daily-quiz-next>'+(dailyQuiz.questionIndex===total-1?(labels?"ফলাফল দেখো →":"See results →"):(labels?"পরের প্রশ্ন →":"Next question →"))+'</button>':'')+'</section>';
  }
  function startDailyQuiz(language=selectedDailyLanguage(),questionSet=null){
    const items=dayWords(language),group=items.slice(activeGroup*10,activeGroup*10+10),seedText=helsinkiDayKey()+":"+language+":"+activeGroup;
    const seed=seedText.split("").reduce((total,char)=>Math.imul(total^char.charCodeAt(0),16777619),2166136261)>>>0;
    const questions=questionSet?dailyShuffle(questionSet,seed):dailyShuffle(group,seed).map((word,position)=>{
      const meaning=language==="bn"?(word.bn||""):word.en;
      const distractors=items.filter(candidate=>candidate.fi!==word.fi&&(language==="bn"?candidate.bn:candidate.en)!==meaning);
      const alternatives=dailyShuffle(distractors,seed+position+1).slice(0,3);
      const fallback=items.filter(candidate=>candidate.fi!==word.fi&&!alternatives.some(option=>option.fi===candidate.fi));
      while(alternatives.length<3&&fallback.length)alternatives.push(fallback.shift());
      return {word,meaning,choices:dailyShuffle([word,...alternatives],seed+position+101)};
    });
    dailyQuiz={day:helsinkiDayKey(),language,group:activeGroup,questions,questionIndex:0,score:0,answered:false,chosen:"",missed:[],scope:questionSet?"missed":"set"};
  }
  function dictionaryItems(query="",pageIndex=0){
    const needle=dictionaryFold(query.trim());
    const isBangla=/[\u0980-\u09ff]/.test(query);
    if(fullDictionaryEntries&&needle&&!isBangla){
      const matches=[];
      for(const entry of fullDictionaryEntries)if(dictionaryFold(entry[0]+" "+entry[1]).includes(needle))matches.push(entry);
      const escaped=needle.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),wholeMeaning=new RegExp("(^|[^\\p{L}\\p{N}])"+escaped+"($|[^\\p{L}\\p{N}])","iu");
      matches.sort((a,b)=>{
        const rank=entry=>{const fi=dictionaryFold(entry[0]),en=dictionaryFold(entry[1]);if(fi===needle)return 0;if(fi.startsWith(needle))return 1;if(wholeMeaning.test(en))return 2;return 3};
        const difference=rank(a)-rank(b);if(difference)return difference;
        return Number(b[2]||0)-Number(a[2]||0)||a[0].localeCompare(b[0]);
      });
      return {items:matches.slice(pageIndex*60,(pageIndex+1)*60).map(entry=>({fi:entry[0],en:entry[1],bn:"",level:"Finnish–English",topic:entry[2]?Number(entry[2]).toLocaleString()+" Yle news tokens":"Open dictionary",source:"open"})),total:matches.length,full:true};
    }
    const items=dailyVocabulary(false),filtered=needle?items.filter(word=>dictionaryFold(word.fi+" "+word.en+" "+word.bn+" "+word.topic).includes(needle)):items;
    return {items:filtered.slice(pageIndex*60,(pageIndex+1)*60),total:filtered.length,full:false};
  }
  function dictionaryFold(value){return String(value??"").normalize("NFC").toLocaleLowerCase().replace(/[äå]/g,"a").replace(/ö/g,"o")}
  function dictionaryCards(query="",pageIndex=0){
    const result=dictionaryItems(query,pageIndex);
    if(!result.items.length)return '<div class="finland-dictionary-empty">No word found. Try a Finnish spelling, English meaning, or Bangla translation.</div>';
    return result.items.map(word=>{
      const long=word.source==="open"&&word.en.length>240,summary=long?word.en.slice(0,220).trimEnd()+"…":word.en;
      const full=long?'<details class="finland-definition-details"><summary>Read the full source entry</summary><p>'+esc(word.en)+'</p></details>':'';
      const saved=window.kieloIsReviewWord?.(word.fi)===true;
      const saveButton='<button type="button" data-dictionary-review="'+esc(word.fi)+'" data-review-en="'+esc(word.en)+'" data-review-bn="'+esc(word.bn||"")+'" data-review-level="'+esc(word.level||"Dictionary")+'" data-review-topic="'+esc(word.topic||"Open dictionary")+'" aria-pressed="'+saved+'">'+(saved?"✓ In review":"+ Save to review")+'</button>';
      return '<article class="finland-word-card"><div class="finland-word-top"><h3 lang="fi">'+esc(word.fi)+'</h3><span class="finland-word-level">'+esc(word.level)+'</span></div><p class="finland-word-translation">'+esc(summary)+'</p>'+full+'<p class="finland-word-bn" lang="bn">'+esc(word.bn||(word.source==="open"?"English source definition · no Bangla translation in this entry":"Bangla meaning not added yet"))+'</p><div class="finland-word-actions"><button type="button" data-dictionary-speak="'+esc(word.fi)+'" aria-label="Hear '+esc(word.fi)+' in Finnish">▶ Listen</button>'+saveButton+'<span class="finland-word-level">'+esc(word.topic||"")+'</span></div></article>';
    }).join("");
  }
  function updateDictionaryResults(query=""){
    const result=document.getElementById("finland-dictionary-results"),count=document.getElementById("finland-dictionary-count"),more=document.getElementById("finland-dictionary-more");
    if(!result)return;
    const state=dictionaryItems(query,dictionaryPage);
    result.innerHTML=dictionaryCards(query,dictionaryPage);
    if(count)count.textContent=state.total.toLocaleString()+" "+(state.full?"Finnish–English matches":"learner words")+(state.total>60?" · showing "+Math.min((dictionaryPage+1)*60,state.total).toLocaleString():"");
    if(more)more.hidden=(dictionaryPage+1)*60>=state.total;
  }
  function openDictionaryCache(){
    return new Promise((resolve,reject)=>{
      if(!("indexedDB"in window)){reject(new Error("Device storage is unavailable."));return}
      const request=window.indexedDB.open("kielo-dictionary-cache-v1",1);
      request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains("dictionary"))request.result.createObjectStore("dictionary")};
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error||new Error("Device storage could not be opened."));
      request.onblocked=()=>reject(new Error("Device storage is busy in another tab."));
    });
  }
  async function readCachedDictionary(){
    let db;
    try{
      db=await openDictionaryCache();
      return await new Promise(resolve=>{
        const transaction=db.transaction("dictionary","readonly"),request=transaction.objectStore("dictionary").get("fi-en-headwords-v1");
        request.onsuccess=()=>resolve(Array.isArray(request.result?.entries)?request.result.entries:null);
        request.onerror=()=>resolve(null);
        transaction.onabort=()=>resolve(null);
      });
    }catch(_error){return null}finally{db?.close()}
  }
  async function saveDictionaryOffline(entries){
    let db;
    try{
      db=await openDictionaryCache();
      return await new Promise(resolve=>{
        const transaction=db.transaction("dictionary","readwrite");
        transaction.objectStore("dictionary").put({entries,savedAt:Date.now()},"fi-en-headwords-v1");
        transaction.oncomplete=()=>resolve(true);
        transaction.onerror=()=>resolve(false);
        transaction.onabort=()=>resolve(false);
      });
    }catch(_error){return false}finally{db?.close()}
  }
  function showDictionaryReady(entries,offline){
    const button=document.getElementById("finland-load-full-dictionary"),message=document.getElementById("finland-dictionary-status");
    if(button){button.textContent=offline?"Dictionary ready offline":"Dictionary loaded for this session";button.disabled=true;}
    if(message)message.textContent=entries.length.toLocaleString()+" entries are ready. Search Finnish headwords and English definitions; "+(offline?"this copy is saved on this device for offline search.":"device storage was unavailable, so reconnect to load it again next time.")+" The curated learner list remains available for Bangla meanings.";
  }
  async function loadFullDictionary(){
    const button=document.getElementById("finland-load-full-dictionary"),status=document.getElementById("finland-dictionary-status");
    if(fullDictionaryEntries){updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");return}
    if(fullDictionaryPromise)return fullDictionaryPromise;
    if(button)button.disabled=true;if(status)status.textContent="Checking this device for a saved dictionary…";
    fullDictionaryPromise=(async()=>{
      const cached=await readCachedDictionary();
      if(cached){
        fullDictionaryEntries=cached;fullDictionarySavedOffline=true;fullDictionaryError="";
        showDictionaryReady(cached,true);
        updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");
        return cached;
      }
      if(status)status.textContent="No saved copy found. Downloading the compressed Finnish–English dictionary…";
      try{
        const entries=await fetchGzipJson("data/fi-en-dictionary.json.gz");
        if(!Array.isArray(entries))throw new Error("The dictionary file has an unexpected format.");
        fullDictionaryEntries=entries;fullDictionaryError="";
        fullDictionarySavedOffline=await saveDictionaryOffline(entries);
        showDictionaryReady(entries,fullDictionarySavedOffline);
        updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");
        return entries;
      }catch(error){
        fullDictionaryError=error?.message||"The full dictionary could not be loaded.";
        if(button){button.disabled=false;button.textContent="Try loading the Finnish–English dictionary again";}
        if(status)status.textContent=fullDictionaryError+" The 273-word trilingual learner list still works.";
        fullDictionaryPromise=null;return [];
      }
    })();
    return fullDictionaryPromise;
  }
  function renderDictionary(){
    const page=document.getElementById("page-content");if(!page)return;
    const count=dailyVocabulary(false).length;
    page.innerHTML=customPageTitle("Finnish dictionary","Search Finnish, English, or Bangla in the learner list, then open the wider Finnish–English headword collection when you need it.","Words for real life")+
      '<div class="finland-dictionary-note"><strong>'+count+' curated trilingual learner words are ready immediately.</strong> These course and daily words include Finnish, English, Bangla, level and topic. Kotus publishes a Finnish headword list with more than 100,000 entries, but that list itself has no English or Bangla definitions. <a href="https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/" target="_blank" rel="noreferrer">Open Kotus usage dictionary ↗</a></div>'+
      '<div class="finland-dictionary-tools"><input class="finland-dictionary-search" id="finland-dictionary-search" type="search" placeholder="Search järvi or jarvi / English / বাংলা" autocomplete="off" aria-label="Search Finnish dictionary; Finnish ä, ö, and å can be typed as a, o, and a"><span class="finland-word-level" id="finland-dictionary-count"></span></div>'+
      '<section class="finland-dictionary-results" id="finland-dictionary-results" aria-live="polite">'+dictionaryCards("")+'</section><button class="button-secondary" id="finland-dictionary-more" type="button" data-dictionary-more hidden>Show more matches</button>'+
      '<div class="finland-dictionary-load"><div><strong>Wider Finnish–English dictionary</strong><br>254,435 source headwords · approximately 11.6 MiB compressed · downloaded only when you choose it, then saved on this device for offline search when storage allows. The source reports a translation for 82.78% of entries; other entries may be English definitions. Bangla meanings remain in the curated learner list above.</div><button id="finland-load-full-dictionary" type="button">Load wider dictionary</button></div><p class="finland-dictionary-status" id="finland-dictionary-status" role="status" aria-live="polite">Your search and learning progress stay in this browser. The wider open dataset downloads only if you choose it.</p>'+
      '<div class="finland-dictionary-source">The wider dictionary is an open Finnish–English compilation from FinnWordNet / Open Multilingual Wordnet, Princeton WordNet 3.0 and English Wiktionary via kaikki.org. This compact version searches headwords, not every inflected Finnish form. Source notices and licence are included in <a href="data/fi-en-ATTRIBUTION.txt" target="_blank" rel="noreferrer">Kielo’s attribution file ↗</a>. <a href="https://danielgregorini.github.io/koreader-dicts/fr/fi-en/" target="_blank" rel="noreferrer">Dataset coverage and licence ↗</a> · Kotus’ word list is not a complete list of every Finnish word.</div>'+
      '<div class="finland-page-footer"><p>Finnish audio uses an installed browser/device voice.</p><button class="button-primary" type="button" data-redesign-page="daily">Study today’s 100 words →</button></div>';
    setActiveCustomPage("dictionary");
    if(fullDictionaryEntries)showDictionaryReady(fullDictionaryEntries,fullDictionarySavedOffline);
    updateDictionaryResults("");
  }
  function renderCustom(page){
    const target=document.getElementById("page-content");if(!target)return;
    if(page==="daily")renderDaily();else if(page==="dictionary")renderDictionary();
    document.getElementById("sidebar")?.classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function chapterMarkup(){
    const facts=finlandFacts.map(fact=>'<article class="finland-fact-card"><div class="finland-fact-top"><span aria-hidden="true">'+fact.icon+'</span><small>'+esc(fact.meta)+'</small></div><strong class="finland-fact-value">'+esc(fact.value)+'</strong><span class="finland-fact-label">'+esc(fact.label)+'</span><div class="finland-fact-word"><span><b lang="fi">'+esc(fact.fi)+'</b><small>'+esc(fact.en)+' · <span lang="bn">'+esc(fact.bn)+'</span></small></span><button type="button" data-topic-speak="'+esc(fact.fi)+'" aria-label="Hear '+esc(fact.fi)+' in Finnish">▶</button></div><a class="finland-fact-source" href="'+esc(fact.url)+'" target="_blank" rel="noreferrer">'+esc(fact.source)+' ↗</a></article>').join("");
    return '<section class="finland-chapters" id="finland-chapters"><div class="finland-chapters-intro"><h2>Explore Finland, chapter by chapter</h2><p>Learn with an original vocabulary set, a real-life phrase, a quick check and a source to explore further.</p></div><section class="finland-facts" aria-labelledby="finland-facts-title"><div class="finland-facts-heading"><div><span class="page-kicker">A COUNTRY IN CONTEXT</span><h2 id="finland-facts-title">Finland in numbers</h2><p>Small facts, useful Finnish. Data years are shown on each card.</p></div><span class="finland-facts-checked">Sources checked 22 Oct 2026</span></div><div class="finland-facts-grid">'+facts+'</div><p class="finland-facts-note">The forest stock value is a statistical accounting estimate, not cash value or a quoted market price. Each source explains its definitions.</p><div class="finland-facts-phrase"><div><b lang="fi">Suomessa asuu noin 5,65 miljoonaa ihmistä.</b><span>About 5.65 million people live in Finland.</span><small lang="bn">ফিনল্যান্ডে প্রায় ৫৬.৫ লাখ মানুষ থাকেন।</small></div><button type="button" data-topic-speak="Suomessa asuu noin viisi miljoonaa kuusisataaviisikymmentä tuhatta ihmistä." aria-label="Hear the Finnish sentence">▶ Hear Finnish</button></div></section><div class="finland-chapter-grid">'+topics.map((topic,index)=>'<article class="finland-chapter"><span class="finland-chapter-icon" aria-hidden="true">'+topic.icon+'</span><h3>'+esc(topic.title)+'</h3><p>'+esc(topic.text)+'</p><div class="finland-chapter-foot"><span class="finland-chapter-words">'+esc(topic.fi)+'</span></div><div class="finland-chapter-actions"><button type="button" data-finland-topic="'+index+'">Learn this chapter →</button><a href="'+esc(topic.url)+'" target="_blank" rel="noreferrer">'+esc(topic.source)+' ↗</a></div></article>').join("")+'</div><p class="finland-data-note">Fast-changing statistics are dated and linked to the source. The linked page is for further reading; the language activities in Kielo are original practice.</p></section>';
  }
  function historyTimelineMarkup(){
    const moments=[
      {year:"1809",fi:"autonomia",en:"autonomy",bn:"স্বায়ত্তশাসন",title:"A Grand Duchy",detail:"After centuries within the Swedish realm, Finland became an autonomous Grand Duchy of the Russian Empire.",bnDetail:"সুইডিশ রাজ্যের অংশ হিসেবে বহু শতাব্দীর পর ফিনল্যান্ড রুশ সাম্রাজ্যের স্বায়ত্তশাসিত Grand Duchy হয়।",url:"https://finland.fi/life-society/main-outlines-of-finnish-history/",source:"This is Finland"},
      {year:"1849",fi:"Kalevala",en:"national epic",bn:"জাতীয় মহাকাব্য",title:"The Kalevala is published",detail:"Elias Lönnrot’s collection of folk poetry helped shape Finnish national culture and identity.",bnDetail:"এলিয়াস ল্যনরটের লোককবিতার সংকলন ফিনিশ জাতীয় সংস্কৃতি ও পরিচয়ের বিকাশে ভূমিকা রাখে।",url:"https://toolbox.finland.fi/life-society/finfo-facts-about-finland-2/attachment/finfo_facts_2025_en_aukeama_toolbox-2/",source:"Finland Toolbox · 2025 facts"},
      {year:"1906",fi:"äänioikeus",en:"right to vote",bn:"ভোটাধিকার",title:"Parliamentary reform",detail:"Finland adopted a unicameral Parliament and universal suffrage. Women gained the right to vote and stand for election.",bnDetail:"এককক্ষবিশিষ্ট সংসদ ও সর্বজনীন ভোটাধিকার চালু হয়। নারীরা ভোট ও নির্বাচনে প্রার্থী হওয়ার অধিকার পান।",url:"https://toolbox.finland.fi/life-society/finfo-facts-about-finland-2/attachment/finfo_facts_2025_en_aukeama_toolbox-2/",source:"Finland Toolbox · 2025 facts"},
      {year:"1917",fi:"itsenäisyysjulistus",en:"declaration of independence",bn:"স্বাধীনতার ঘোষণাপত্র",title:"Parliament approves independence",detail:"On 6 December, Parliament approved the declaration of independence.",bnDetail:"৬ ডিসেম্বর সংসদ স্বাধীনতার ঘোষণাপত্র অনুমোদন করে।",url:"https://finland.fi/life-society/main-outlines-of-finnish-history/",source:"This is Finland"},
      {year:"1918",fi:"sisällissota",en:"civil war",bn:"গৃহযুদ্ধ",title:"A difficult year",detail:"A civil war broke out in January and ended in May. Its divisions left a lasting mark on Finnish society.",bnDetail:"জানুয়ারিতে গৃহযুদ্ধ শুরু হয়ে মে মাসে শেষ হয়। এর বিভাজন ফিনিশ সমাজে দীর্ঘস্থায়ী প্রভাব ফেলে।",url:"https://finland.fi/life-society/main-outlines-of-finnish-history/",source:"This is Finland"},
      {year:"1919",fi:"tasavalta",en:"republic",bn:"প্রজাতন্ত্র",title:"The republic takes shape",detail:"Finland became a republic, and K. J. Ståhlberg was elected its first president.",bnDetail:"ফিনল্যান্ড প্রজাতন্ত্র হয় এবং K. J. Ståhlberg প্রথম রাষ্ট্রপতি নির্বাচিত হন।",url:"https://finland.fi/life-society/main-outlines-of-finnish-history/",source:"This is Finland"},
      {year:"1995",fi:"Euroopan unioni",en:"European Union",bn:"ইউরোপীয় ইউনিয়ন",title:"Finland joins the EU",detail:"Finland became a member of the European Union on 1 January.",bnDetail:"১ জানুয়ারি ফিনল্যান্ড ইউরোপীয় ইউনিয়নের সদস্য হয়।",url:"https://european-union.europa.eu/principles-countries-history/eu-countries/finland_en",source:"European Union"}
    ];
    const cards=moments.map(moment=>'<article class="finland-history-event"><span class="finland-history-year">'+esc(moment.year)+'</span><div class="finland-history-copy"><h4>'+esc(moment.title)+'</h4><p>'+esc(moment.detail)+'</p><small lang="bn">'+esc(moment.bnDetail)+'</small><div class="finland-history-word"><button type="button" data-topic-speak="'+esc(moment.fi)+'" aria-label="Hear '+esc(moment.fi)+' in Finnish">▶</button><span><b lang="fi">'+esc(moment.fi)+'</b><small>'+esc(moment.en)+' · <span lang="bn">'+esc(moment.bn)+'</span></small></span></div><a href="'+esc(moment.url)+'" target="_blank" rel="noreferrer">'+esc(moment.source)+' ↗</a></div></article>').join("");
    const phrase="Eduskunta hyväksyi itsenäisyysjulistuksen 6. joulukuuta 1917.";
    return '<section class="finland-history" aria-labelledby="finland-history-heading"><div class="finland-history-heading"><div><span class="page-kicker">A SHORT, SOURCED TIMELINE · CHECKED 22 OCT 2026</span><h3 id="finland-history-heading">Seven moments in Finland’s story</h3><p>Read each moment, learn one Finnish history word, and open the source for more context.</p></div><span>1809 → 1995</span></div><div class="finland-history-grid">'+cards+'</div><div class="finland-history-phrase"><div><span>PUT A DATE INTO A SENTENCE</span><strong lang="fi">'+esc(phrase)+'</strong><p>Parliament approved the declaration of independence on 6 December 1917.</p><small lang="bn">১৯১৭ সালের ৬ ডিসেম্বর সংসদ স্বাধীনতার ঘোষণাপত্র অনুমোদন করে।</small></div><button type="button" data-topic-speak="'+esc(phrase)+'">▶ Hear Finnish</button></div><p class="finland-history-note">This is a short learning timeline, not a complete account of Finland’s diverse regional and community histories.</p></section>';
  }
  function civicGuideMarkup(){
    const layers=[
      {fi:"valtio",en:"state",bn:"রাষ্ট্র",detail:"Finland’s highest state bodies include Parliament, the Government and the President.",bnDetail:"ফিনল্যান্ডের সর্বোচ্চ রাষ্ট্রীয় সংস্থার মধ্যে রয়েছে সংসদ, সরকার ও রাষ্ট্রপতি।",url:"https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works",source:"Administration overview"},
      {fi:"kunta",en:"municipality",bn:"পৌরসভা",detail:"Finland has around 300 municipalities. Examples of their services include education, early childhood education and libraries.",bnDetail:"ফিনল্যান্ডে প্রায় ৩০০টি পৌরসভা আছে। তাদের সেবার উদাহরণ হলো শিক্ষা, শিশুর প্রাথমিক শিক্ষা ও লাইব্রেরি।",url:"https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works/municipalities-and-local-government",source:"Municipalities and local government"},
      {fi:"hyvinvointialue",en:"wellbeing services county",bn:"কল্যাণসেবা অঞ্চল",detail:"Outside Helsinki, 21 counties organise health, social and rescue services. Helsinki organises its own health and social services.",bnDetail:"Helsinki ছাড়া ২১টি কল্যাণসেবা অঞ্চল স্বাস্থ্য, সামাজিক ও উদ্ধারসেবা পরিচালনা করে। Helsinki নিজেই স্বাস্থ্য ও সামাজিক সেবা পরিচালনা করে।",url:"https://www.suomi.fi/citizen/rights-and-participation-in-society/legal-and-consumer-protection/guide/how-finlands-public-administration-works/wellbeing-services-county",source:"Wellbeing services counties"}
    ];
    const cards=layers.map(layer=>'<article class="finland-civic-card"><div class="finland-civic-word"><strong lang="fi">'+esc(layer.fi)+'</strong><button type="button" data-topic-speak="'+esc(layer.fi)+'" aria-label="Hear '+esc(layer.fi)+' in Finnish">▶ Listen</button></div><span class="finland-civic-gloss">'+esc(layer.en)+' · <span lang="bn">'+esc(layer.bn)+'</span></span><p>'+esc(layer.detail)+'</p><small lang="bn">'+esc(layer.bnDetail)+'</small><a href="'+esc(layer.url)+'" target="_blank" rel="noreferrer">'+esc(layer.source)+' ↗</a></article>').join("");
    const phrase="Tarvitsen terveyspalveluja. Mihin otan yhteyttä?";
    return '<section class="finland-civic-map" aria-labelledby="finland-civic-heading"><div class="finland-civic-heading"><div><span class="page-kicker">EVERYDAY FINLAND · 22 OCT 2026</span><h3 id="finland-civic-heading">Who handles which service?</h3><p>Learn three useful words, then check the official source for your area.</p></div><span>National · municipal · regional</span></div><div class="finland-civic-grid">'+cards+'</div><div class="finland-civic-phrase"><div><span>ASK ABOUT A SERVICE</span><strong lang="fi">'+esc(phrase)+'</strong><p>“I need health services. Who should I contact?”</p><small lang="bn">“আমি স্বাস্থ্যসেবা চাই। কার সঙ্গে যোগাযোগ করব?”</small></div><button type="button" data-topic-speak="'+esc(phrase)+'">▶ Hear Finnish</button></div></section>';
  }
  function regionDetailMarkup(region){
    const art=region.art.map(icon=>'<span aria-hidden="true">'+icon+'</span>').join("");
    const words=region.words.map(([fi,en,bn])=>'<li><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶</button><span><strong lang="fi">'+esc(fi)+'</strong><small>'+esc(en)+' · <span lang="bn">'+esc(bn)+'</span></small></span></li>').join("");
    return '<div class="finland-region-detail"><div class="finland-region-art finland-region-art--'+esc(region.id)+'" role="img" aria-label="Illustrated scene for '+esc(region.title)+'"><span class="finland-region-art-icons" aria-hidden="true">'+art+'</span><span class="finland-region-art-label">'+esc(region.title)+'</span></div><div class="finland-region-copy"><span class="page-kicker">A PLACE, A PHRASE, THREE WORDS</span><h4>'+esc(region.title)+'</h4><p>'+esc(region.scene)+'</p><p class="finland-region-bn" lang="bn">'+esc(region.bnScene)+'</p><p class="finland-region-places"><strong>Places to know</strong> · '+esc(region.places)+'</p><ul class="finland-region-word-list">'+words+'</ul><div class="finland-region-phrase"><strong lang="fi">'+esc(region.phrase)+'</strong><span>'+esc(region.en)+'</span><small lang="bn">'+esc(region.bn)+'</small><button class="button-secondary" type="button" data-topic-speak="'+esc(region.phrase)+'">▶ Hear this phrase</button></div><a class="finland-region-source" href="'+esc(region.url)+'" target="_blank" rel="noreferrer">Visit Finland · '+esc(region.title)+' ↗</a></div></div>';
  }
  function regionExperienceMarkup(){
    const active=travelRegions.find(region=>region.id===activeRegionId)||travelRegions[0];
    const choices=travelRegions.map(region=>'<button type="button" class="finland-region-choice '+(region.id===active.id?'active':'')+'" data-region-select="'+esc(region.id)+'" aria-pressed="'+(region.id===active.id)+'"><span class="finland-region-choice-icon" aria-hidden="true">'+region.icon+'</span><span><strong>'+esc(region.title)+'</strong><small lang="fi">'+esc(region.words[0][0])+' · '+esc(region.words[1][0])+'</small></span></button>').join("");
    return '<section class="finland-region-explorer" aria-labelledby="finland-region-heading"><div class="finland-region-heading"><div><span class="page-kicker">TRAVEL THROUGH FINLAND</span><h3 id="finland-region-heading">Four destination regions</h3><p>Choose a region to explore places and learn useful Finnish.</p></div><span class="finland-region-count">4 postcards</span></div><div class="finland-region-choices" role="group" aria-label="Choose a Finnish destination region">'+choices+'</div><div id="finland-region-detail">'+regionDetailMarkup(active)+'</div><p class="finland-region-note">These are Visit Finland’s travel regions, not administrative boundaries. For official statistical regions, see <a href="https://stat.fi/en/luokitukset/maakunta/maakunta_1_20260101" target="_blank" rel="noreferrer">Statistics Finland · Regions 2026 ↗</a>. <a href="https://www.visitfinland.com/en/places-to-go/" target="_blank" rel="noreferrer">All Finland destinations ↗</a></p></section>';
  }
  function renderFinlandTopic(index){
    const topic=topics[index],lesson=chapterLearning[index],page=document.getElementById("page-content");if(!topic||!lesson||!page)return;
    activeTopicIndex=index;
    const words=lesson.words.map(([fi,en,bn])=>'<article class="finland-topic-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Listen</button></article>').join("");
    const options=lesson.options.map((option,choice)=>'<button type="button" data-topic-answer="'+choice+'">'+esc(option)+'</button>').join("");
    page.innerHTML=customPageTitle(topic.title,"Connect Finnish to a real part of Finland. Read, listen, say a phrase, and check one meaning.","Finland learning chapter")+
      '<section class="finland-topic-panel"><h2>Finland note</h2><p>'+esc(lesson.fact)+'</p>'+(index===0?historyTimelineMarkup():index===1?civicGuideMarkup():index===10?regionExperienceMarkup():"")+'<h2>Useful words</h2><section class="finland-topic-vocab" aria-label="Finnish vocabulary">'+words+'</section><div class="finland-topic-phrase"><span>TRY THIS SENTENCE</span><strong lang="fi">'+esc(lesson.phrase)+'</strong><span>'+esc(lesson.en)+'</span><small lang="bn">'+esc(lesson.bn)+'</small><button type="button" class="button-secondary" data-topic-speak="'+esc(lesson.phrase)+'">▶ Hear the sentence</button></div><section class="finland-topic-quiz"><h3>'+esc(lesson.question)+'</h3>'+options+'<p class="finland-topic-feedback" id="finland-topic-feedback" role="status" aria-live="polite"></p></section><p class="finland-topic-source">Further reading: <a href="'+esc(topic.url)+'" target="_blank" rel="noreferrer">'+esc(topic.source)+' ↗</a></p><button class="button-secondary" type="button" data-page="culture">← All Finland chapters</button></section>';
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function enhanceHome(){
    const page=document.getElementById("page-content");
    if(!page?.querySelector(".welcome-row"))return;
    if(!page.querySelector("#finland-status"))page.insertAdjacentHTML("afterbegin",statusMarkup());
    if(!page.querySelector(".finland-daily-promo")){
      const promo=document.createElement("section");promo.className="finland-daily-promo";
      const date=formattedHelsinkiDate(),learned=dailyProgress().size;
      promo.innerHTML='<div><div class="page-kicker">TODAY IN FINLAND · '+esc(date.toUpperCase())+'</div><h2>100 useful Finnish words, in ten calm sets.</h2><p>The daily set changes with Finland’s date. Listen, learn, save, and review at your own pace.</p><div class="daily-pips" aria-hidden="true">'+Array.from({length:10},(_,index)=>'<i '+(index===0?'class="done"':"")+'></i>').join("")+'</div></div><div><div class="finland-daily-progress">'+learned+' <small>/ 100</small></div><button class="finland-daily-open" type="button" data-redesign-page="daily">Start today’s words →</button></div>';
      const existing=page.querySelector(".daily-word-card");if(existing)existing.insertAdjacentElement("afterend",promo);else page.appendChild(promo);
    }
    updateClock();refreshStatusContent();
  }
  function enhanceExplorer(){
    const page=document.getElementById("page-content"),hero=page?.querySelector(".culture-hero");
    if(!hero||page.querySelector("#finland-chapters"))return;
    const heading=page.querySelector(".page-title-row h1");if(heading)heading.textContent="Explore Finland";
    const intro=page.querySelector(".page-title-row p");if(intro)intro.textContent="Learn Finnish through the country’s history, people, seasons, forests, waters, transport, education, work and culture.";
    hero.insertAdjacentHTML("afterend",chapterMarkup());
  }
  function enhance(){
    enhanceHome();enhanceExplorer();
    const top=document.getElementById("connection-label");if(top)top.textContent="Finland · Europe/Helsinki";
  }
  document.addEventListener("click",event=>{
    const custom=event.target.closest("[data-redesign-page]");
    if(custom){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();renderCustom(custom.dataset.redesignPage);return}
    const chapter=event.target.closest("[data-finland-topic]");
    if(chapter){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();renderFinlandTopic(Number(chapter.dataset.finlandTopic));return}
    const regionChoice=event.target.closest("[data-region-select]");
    if(regionChoice){activeRegionId=regionChoice.dataset.regionSelect;const explorer=regionChoice.closest(".finland-region-explorer"),region=travelRegions.find(item=>item.id===activeRegionId);if(!region||!explorer)return;explorer.querySelectorAll("[data-region-select]").forEach(button=>{const selected=button.dataset.regionSelect===activeRegionId;button.classList.toggle("active",selected);button.setAttribute("aria-pressed",String(selected))});const detail=explorer.querySelector("#finland-region-detail");if(detail)detail.innerHTML=regionDetailMarkup(region);explorer.querySelector('[data-region-select="'+activeRegionId+'"]')?.focus({preventScroll:true});return}
    const answerButton=event.target.closest("[data-topic-answer]");
    if(answerButton){const lesson=chapterLearning[activeTopicIndex],feedback=document.getElementById("finland-topic-feedback");if(lesson){const chosen=Number(answerButton.dataset.topicAnswer),correct=chosen===lesson.answer;answerButton.classList.add(correct?"correct":"incorrect");answerButton.closest(".finland-topic-quiz").querySelectorAll("[data-topic-answer]").forEach((button,i)=>{button.disabled=true;if(i===lesson.answer)button.classList.add("correct")});if(feedback)feedback.textContent=correct?"Correct — nice work. Say the Finnish word once more.":"Not quite. The highlighted choice is the correct Finnish word; listen and try it again.";}return}
    const chapterListen=event.target.closest("[data-topic-speak]");
    if(chapterListen){speakFinnish(chapterListen.dataset.topicSpeak);return}
    if(event.target.closest("#finland-load-full-dictionary")){loadFullDictionary();return}
    if(event.target.closest("[data-dictionary-more]")){dictionaryPage++;updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");return}
    if(event.target.closest("[data-frequency-retry]")){frequentWordsError="";frequentWordPromise=null;renderDaily();return}
    if(event.target.closest("[data-daily-quiz-start]")){startDailyQuiz();renderDaily();document.querySelector("[data-daily-quiz-answer]")?.focus({preventScroll:true});return}
    if(event.target.closest("[data-daily-quiz-restart]")){startDailyQuiz();renderDaily();document.querySelector("[data-daily-quiz-answer]")?.focus({preventScroll:true});return}
    if(event.target.closest("[data-daily-quiz-missed]")&&dailyQuiz){const missed=dailyQuiz.missed.map(entry=>entry.question);if(missed.length){startDailyQuiz(dailyQuiz.language,missed);renderDaily();document.querySelector("[data-daily-quiz-answer]")?.focus({preventScroll:true})}return}
    const quizAnswer=event.target.closest("[data-daily-quiz-answer]");
    if(quizAnswer&&dailyQuiz){const question=dailyQuiz.questions[dailyQuiz.questionIndex];if(!question||dailyQuiz.answered)return;const choice=question.choices[Number(quizAnswer.dataset.dailyQuizAnswer)];if(!choice)return;dailyQuiz.chosen=choice.fi;dailyQuiz.answered=true;if(choice.fi===question.word.fi)dailyQuiz.score++;else dailyQuiz.missed.push({question,chosen:choice.fi});renderDaily();document.getElementById("finland-daily-quiz-feedback")?.focus({preventScroll:true});return}
    if(event.target.closest("[data-daily-quiz-next]")&&dailyQuiz){dailyQuiz.questionIndex++;dailyQuiz.answered=false;dailyQuiz.chosen="";renderDaily();document.querySelector("[data-daily-quiz-answer]")?.focus({preventScroll:true});return}
    const group=event.target.closest("[data-daily-group]");
    if(event.target.closest("[data-daily-recall-toggle]")){dailyRecallMode=!dailyRecallMode;dailyRevealed.clear();localStorage.setItem("kielo-daily-recall-mode",String(dailyRecallMode));renderDaily();return}
    const revealMeaning=event.target.closest("[data-daily-meaning-toggle]");
    if(revealMeaning){const wordIndex=Number(revealMeaning.dataset.dailyMeaningToggle);if(dailyRevealed.has(wordIndex))dailyRevealed.delete(wordIndex);else dailyRevealed.add(wordIndex);renderDaily();document.querySelector('[data-daily-meaning-toggle="'+wordIndex+'"]')?.focus({preventScroll:true});return}
    if(group){activeGroup=Number(group.dataset.dailyGroup)||0;dailyQuiz=null;dailyRevealed.clear();renderDaily();return}
    const next=event.target.closest("[data-daily-next]");
    if(next){activeGroup=Math.min(9,activeGroup+1);dailyQuiz=null;dailyRevealed.clear();renderDaily();return}
    const previous=event.target.closest("[data-daily-prev]");
    if(previous){activeGroup=Math.max(0,activeGroup-1);dailyQuiz=null;dailyRevealed.clear();renderDaily();return}
    const learn=event.target.closest("[data-daily-learn]");
    if(learn){const words=dayWords(),word=words[Number(learn.dataset.dailyLearn)];if(!word)return;const progress=dailyProgress();if(progress.has(word.fi))progress.delete(word.fi);else progress.add(word.fi);storeDailyProgress(progress);renderDaily();return}
    const listen=event.target.closest("[data-daily-speak]");
    if(listen){const word=dayWords()[Number(listen.dataset.dailySpeak)];if(word)speakFinnish(word.fi);return}
    const dictionaryReview=event.target.closest("[data-dictionary-review]");
    if(dictionaryReview){
      const input={fi:dictionaryReview.dataset.dictionaryReview,en:dictionaryReview.dataset.reviewEn,bn:dictionaryReview.dataset.reviewBn,level:dictionaryReview.dataset.reviewLevel,topic:dictionaryReview.dataset.reviewTopic};
      if(window.kieloToggleReviewWord?.(input)){
        updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");
        [...document.querySelectorAll("[data-dictionary-review]")].find(button=>button.dataset.dictionaryReview===input.fi)?.focus({preventScroll:true});
      }
      return;
    }
    const dictionaryListen=event.target.closest("[data-dictionary-speak]");
    if(dictionaryListen){speakFinnish(dictionaryListen.dataset.dictionarySpeak);return}
    const refresh=event.target.closest("[data-weather-refresh]");
    if(refresh){loadWeather(true);return}
  },true);
  document.addEventListener("change",event=>{
    if(event.target?.id==="finland-meaning-language"){
      localStorage.setItem("kielo-daily-meaning-language",event.target.value==="bn"?"bn":"en");activeGroup=0;dailyQuiz=null;dailyRevealed.clear();renderDaily();
    }
    if(event.target?.id==="finland-city"){
      localStorage.setItem(cityKey,event.target.value);cachedWeather=null;
      try{const saved=readJSON(weatherKey,null);if(saved?.cityId!==event.target.value)lastWeatherMessage="Loading current conditions…"}catch(_error){}
      updateClock();refreshStatusContent();loadWeather(true);
    }
    if(event.target?.id==="finnish-neural-voice"){localStorage.setItem("kielo-neural-voice",event.target.value);setVoiceSelection()}
    if(event.target?.id==="finnish-voice-select"){localStorage.setItem("kielo-finnish-voice",event.target.value);setVoiceSelection()}
    if(event.target?.id==="finnish-rate-select"){localStorage.setItem("kielo-finnish-rate",event.target.value)}
  });
  document.addEventListener("input",event=>{
    if(event.target?.id==="finland-dictionary-search"){
      const query=event.target.value;dictionaryPage=0;window.clearTimeout(dictionarySearchTimer);
      dictionarySearchTimer=window.setTimeout(()=>updateDictionaryResults(query),120);
    }
  });
  const content=document.getElementById("page-content");
  if(content)new MutationObserver(enhance).observe(content,{childList:true});
  setInterval(updateClock,1000);
  window.setTimeout(enhance,0);
  if("speechSynthesis"in window)window.speechSynthesis.addEventListener?.("voiceschanged",()=>{
    const voice=document.getElementById("finnish-voice-select");
    if(voice){voice.innerHTML=voiceOptions();setVoiceSelection()}
  });
  const initialCity=cityNow(),savedWeather=cachedWeather;
  if(savedWeather?.cityId===initialCity.id)refreshStatusContent();
  loadWeather(false);
  window.setInterval(()=>loadWeather(false),15*60*1000);
})();
