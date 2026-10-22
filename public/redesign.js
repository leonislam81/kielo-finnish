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
  let activeGroup=0,activeTopicIndex=-1,activeRegionId="helsinki",activeStudyRoute="university",activeJobPath="application",activeMarketScene="tori",activeFoodSeason="early-summer",dailyQuiz=null,dailyRecallMode=localStorage.getItem("kielo-daily-recall-mode")==="true",dailyRevealed=new Set();
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
  function setActiveCustomPage(page){
    document.querySelectorAll(".nav-link").forEach(button=>button.classList.toggle("active",button.dataset.redesignPage===page||(page==="home"&&button.dataset.page==="home")));
  }
  function customPageTitle(title,description,kicker){
    return '<div class="page-title-row finland-custom-page"><div><div class="page-kicker">'+esc(kicker)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></div>';
  }
  function voiceTools(){const available=getVoices().length>0;const note=available?"Natural Finnish male/female voices are not connected yet. Choose an installed Finnish device voice, or listen to authentic <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clips ↗</a>.":"This browser has no Finnish voice installed. Natural male/female voices are not connected yet; try an authentic <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clip ↗</a>.";return '<div class=\"finland-voice-tools\"><label for=\"finnish-neural-voice\">Natural Finnish voice<select id=\"finnish-neural-voice\"><option value=\"device\">Device voice · automatic</option><option value=\"fi-FI-SelmaNeural\" data-neural disabled>Female · Selma</option><option value=\"fi-FI-NooraNeural\" data-neural disabled>Female · Noora</option><option value=\"fi-FI-HarriNeural\" data-neural disabled>Male · Harri</option></select></label><label for=\"finnish-voice-select\">Available device voice<select id=\"finnish-voice-select\">'+voiceOptions()+'</select></label><label for=\"finnish-rate-select\">Speaking pace<select id=\"finnish-rate-select\"><option value=\".72\">Slow</option><option value=\".86\" selected>Steady</option><option value=\"1\">Natural</option></select></label></div><p class=\"finland-voice-note\" role=\"status\" aria-live=\"polite\">'+note+'</p>'}
  async function updateNeuralVoiceUi(){const select=document.getElementById("finnish-neural-voice");if(!select||!window.KieloSpeech)return;const note=document.querySelector(".finland-voice-note");const status=await window.KieloSpeech.getStatus();const options=select.querySelectorAll("option[data-neural]");options.forEach(option=>option.disabled=!status.enabled);if(!status.enabled&&select.value!=="device"){select.value="device";localStorage.setItem("kielo-neural-voice","device")}if(note){note.innerHTML=status.enabled?"Azure neural Finnish audio is ready. Speech requests use Microsoft’s service and this Site caps them at "+Number(status.dailyCharacterCap).toLocaleString()+" characters per Finnish day, shared across visitors. Use the device voice if you prefer not to send a phrase for synthesis.":"Natural Finnish male/female voices are not connected yet. Use an installed Finnish device voice or authentic <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clips ↗</a>."}}
  function meaningLanguageTools(language){
    const bn=language==="bn";
    return '<div class="finland-meaning-tools"><label for="finland-meaning-language">Daily meanings<select id="finland-meaning-language"><option value="en" '+(language==="en"?"selected":"")+'>English · wide word bank</option><option value="bn" '+(bn?"selected":"")+'>Bangla · curated word bank</option></select></label><span>'+(bn?"বাংলা অর্থসহ বাছাই করা শব্দ দেখানো হচ্ছে। ইংরেজি মোডে আরও বড় শব্দভান্ডার আছে।":"Bangla mode includes only words with a curated Bangla meaning. English mode adds the wider frequency bank.")+'</span><button class="button-secondary finland-recall-toggle" type="button" data-daily-recall-toggle aria-pressed="'+dailyRecallMode+'">'+(bn?(dailyRecallMode?"✓ আগে মনে করার মোড চালু":"আগে মনে করো · অর্থ লুকাও"):(dailyRecallMode?"✓ Recall first is on":"Recall first · hide meanings"))+'</button></div>';
  }
  function setVoiceSelection(){const voice=document.getElementById("finnish-voice-select"),rate=document.getElementById("finnish-rate-select"),neural=document.getElementById("finnish-neural-voice");if(voice)voice.value=localStorage.getItem("kielo-finnish-voice")||"";if(rate)rate.value=localStorage.getItem("kielo-finnish-rate")||".86";if(neural)neural.value=localStorage.getItem("kielo-neural-voice")||"device";void updateNeuralVoiceUi()}
  function loadFrequentWords(){
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
  function studyRouteDetailMarkup(routeId=activeStudyRoute){
    const routes={
      university:{title:"University · yliopisto",tag:"RESEARCH-LED",description:"Universities combine research with teaching. Their study paths can lead from bachelor’s and master’s degrees to doctoral study.",bn:"বিশ্ববিদ্যালয়ে গবেষণার সঙ্গে পড়াশোনা হয়। স্নাতক ও স্নাতকোত্তর শেষে doctoral study-র পথও থাকতে পারে।",phrase:"Olen kiinnostunut tutkimuksesta.",en:"I am interested in research.",bnPhrase:"আমি গবেষণায় আগ্রহী।",icon:"◌"},
      uas:{title:"University of applied sciences · ammattikorkeakoulu",tag:"WORK-LIFE ORIENTED",description:"Universities of applied sciences focus on professional higher education and applied research and development. Programme entry rules depend on the programme.",bn:"ইউনিভার্সিটি অব অ্যাপ্লাইড সায়েন্সেস পেশাভিত্তিক উচ্চশিক্ষা এবং প্রয়োগমূলক গবেষণা ও উন্নয়নে মনোযোগ দেয়। ভর্তির শর্ত প্রোগ্রামভেদে বদলায়।",phrase:"Opiskelen ammattikorkeakoulussa.",en:"I study at a university of applied sciences.",bnPhrase:"আমি ইউনিভার্সিটি অব অ্যাপ্লাইড সায়েন্সেসে পড়ি।",icon:"⌘"}
    };
    const route=routes[routeId]||routes.university;
    return '<div class="finland-study-route-art finland-study-route-art--'+(routeId==="uas"?"uas":"university")+'" aria-hidden="true"><span class="finland-study-route-icon">'+route.icon+'</span><span class="finland-study-route-tag">'+route.tag+'</span><span class="finland-study-route-horizon"></span></div><div class="finland-study-route-copy"><span class="page-kicker">TWO HIGHER-EDUCATION ROUTES</span><h4>'+esc(route.title)+'</h4><p>'+esc(route.description)+'</p><p class="finland-study-bn" lang="bn">'+esc(route.bn)+'</p><div class="finland-study-route-phrase"><strong lang="fi">'+esc(route.phrase)+'</strong><span>'+esc(route.en)+'</span><small lang="bn">'+esc(route.bnPhrase)+'</small><button type="button" class="button-secondary" data-topic-speak="'+esc(route.phrase)+'">▶ Hear this phrase</button></div></div>';
  }
  function studyPathMarkup(){
    const steps=[
      ["01","Find a programme","Etsi koulutusohjelma","Search the official Studyinfo catalogue and compare programmes that fit your interests."],
      ["02","Check requirements","Tarkista hakukelpoisuus","Read the exact eligibility, language evidence, selection method and required documents for each programme."],
      ["03","Plan and apply","Suunnittele ja hae","Application periods vary. Save the programme’s own deadline and use its current application instructions."],
      ["04","Follow the result","Seuraa valintatulosta","Check the application service and the institution’s messages, then follow the offer’s reply deadline."],
      ["05","Prepare to begin","Valmistaudu aloittamaan","If admitted, check the institution’s arrival guidance for funding, housing, insurance and any permit steps that apply to you."]
    ];
    const stepCards=steps.map(([number,title,fi,detail])=>'<article class="finland-study-step"><span>'+number+'</span><div><h4>'+esc(title)+'</h4><strong lang="fi">'+esc(fi)+'</strong><p>'+esc(detail)+'</p></div></article>').join("");
    const words=[
      ["hakemus","application","আবেদন"],["hakuaika","application period","আবেদনের সময়সীমা"],["hakukelpoisuus","eligibility to apply","আবেদনের যোগ্যতা"],["valintaperuste","selection criterion","নির্বাচনের মানদণ্ড"],
      ["opintopiste","study credit","স্টাডি ক্রেডিট"],["tutkinto","degree / qualification","ডিগ্রি / যোগ্যতা"],["opiskelupaikka","study place","পড়ার সুযোগ"],["lukukausi","semester","সেমিস্টার"]
    ].map(([fi,en,bn])=>'<article class="finland-study-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Listen</button></article>').join("");
    const dialogue=[
      ["Applicant","Olen kiinnostunut tästä koulutusohjelmasta.","I am interested in this degree programme.","আমি এই ডিগ্রি প্রোগ্রামে আগ্রহী।"],
      ["Adviser","Tarkista hakuaika ja valintaperusteet Opintopolusta.","Check the application period and selection criteria in Studyinfo.","Studyinfo-তে আবেদনের সময়সীমা ও নির্বাচনের মানদণ্ড দেখুন।"],
      ["Applicant","Mistä löydän tietoa opintopisteistä?","Where can I find information about study credits?","স্টাডি ক্রেডিট সম্পর্কে তথ্য কোথায় পাব?"]
    ].map(([speaker,fi,en,bn])=>'<article class="finland-study-dialogue-line"><div><span>'+esc(speaker)+'</span><strong lang="fi">'+esc(fi)+'</strong><p>'+esc(en)+'</p><small lang="bn">'+esc(bn)+'</small></div><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear Finnish: '+esc(fi)+'">▶</button></article>').join("");
    return '<section class="finland-study-journey" aria-labelledby="finland-study-heading"><div class="finland-study-hero"><div class="finland-study-hero-copy"><span class="page-kicker">STUDY IN FINLAND · A2–B1 FINNISH</span><h2 id="finland-study-heading">A study path, one Finnish phrase at a time</h2><p>Explore two kinds of higher education, practise useful application language, and follow verified links for the details that change.</p><span class="finland-study-wordmark" lang="fi">opiskella · hakea · valmistua</span></div><div class="finland-study-campus" aria-hidden="true"><svg viewBox="0 0 420 220" role="presentation"><defs><linearGradient id="studySky" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#cfe5e6"/><stop offset="1" stop-color="#eef2df"/></linearGradient></defs><path fill="url(#studySky)" d="M0 0h420v220H0z"/><circle cx="333" cy="45" r="23" fill="#f4d994"/><path fill="#86a98a" d="M0 158q54-53 111 0t117-7q53-53 118 5t74-11v75H0z"/><path fill="#688d70" d="M0 182q57-37 113 0t122-7q55-31 117 9t68-5v41H0z"/><path fill="#f9f8ef" d="M111 80h203v102H111z"/><path fill="#4c7867" d="M95 81 210 30l120 51z"/><path fill="#d7e4d2" d="M129 95h167v87H129z"/><path fill="#638b78" d="M145 108h34v36h-34zm51 0h34v36h-34zm51 0h34v36h-34z"/><path fill="#a1bca5" d="M202 151h29v31h-29z"/><path fill="#355d4d" d="M30 151h9v39h-9zm-10 9h28v6H20zm360-24h10v54h-10zm-12 12h34v7h-34z"/><path fill="#f5f7f0" d="M0 196q114-22 210 0t210-2v26H0z"/><path fill="none" stroke="#b7cbb9" stroke-width="3" d="M0 205q106-18 210 0t210-2"/></svg><span>Campus life · kampuselämä</span></div></div><section class="finland-study-routes" aria-labelledby="finland-study-routes-title"><div class="finland-study-section-heading"><div><span class="page-kicker">CHOOSE A ROUTE</span><h3 id="finland-study-routes-title">Two higher-education paths</h3></div><span>Tap a card for the difference</span></div><div class="finland-study-route-tabs" role="group" aria-label="Choose a type of higher education"><button type="button" data-study-route="university" aria-pressed="'+(activeStudyRoute==="university")+'"><span>◌</span><strong>University</strong><small lang="fi">yliopisto</small></button><button type="button" data-study-route="uas" aria-pressed="'+(activeStudyRoute==="uas")+'"><span>⌘</span><strong>University of applied sciences</strong><small lang="fi">ammattikorkeakoulu · AMK</small></button></div><div class="finland-study-route-detail" id="finland-study-route-detail">'+studyRouteDetailMarkup()+'</div></section><section class="finland-study-steps" aria-labelledby="finland-study-steps-title"><div class="finland-study-section-heading"><div><span class="page-kicker">A PRACTICAL CHECKLIST</span><h3 id="finland-study-steps-title">Five steps from search to start</h3></div><a href="https://studyinfo.fi/konfo/en/sivu/how-to-apply-for-bachelors-and-masters" target="_blank" rel="noreferrer">Current application guide ↗</a></div><div class="finland-study-step-grid">'+stepCards+'</div><p class="finland-study-current-note">Admission dates, eligibility, fees and required documents vary by programme and may change. Confirm every detail in the live Studyinfo listing and with the institution’s admissions service.</p></section><section class="finland-study-vocabulary" aria-labelledby="finland-study-vocabulary-title"><div class="finland-study-section-heading"><div><span class="page-kicker">LANGUAGE FOR THE JOURNEY</span><h3 id="finland-study-vocabulary-title">Eight words to carry with you</h3></div><span>Hear each Finnish word</span></div><div class="finland-study-word-grid">'+words+'</div></section><section class="finland-study-dialogue" aria-labelledby="finland-study-dialogue-title"><div class="finland-study-section-heading"><div><span class="page-kicker">SAY IT IN FINLAND</span><h3 id="finland-study-dialogue-title">Ask about a programme</h3></div><span>A2–B1 · listen and repeat</span></div><div class="finland-study-dialogue-card">'+dialogue+'</div></section><section class="finland-study-support"><div class="finland-study-support-icon" aria-hidden="true">✳</div><div><span class="page-kicker">ALREADY STUDIED ELSEWHERE?</span><h3>Ask whether SIMHE guidance is available</h3><p>The Finnish National Agency for Education describes SIMHE services that help highly educated immigrants explore higher education, make prior learning visible, and connect study with employment. Services are offered through participating institutions; check the current local offer.</p><a href="https://www.oph.fi/en/higher-education-institutions-supporting-immigrants" target="_blank" rel="noreferrer">See current SIMHE support ↗</a></div></section><section class="finland-study-media"><div><span class="finland-study-video-icon" aria-hidden="true">▶</span><span><strong>Official video · SIMHE support in Finland</strong><small>1 min 49 sec · Finnish · Finnish National Agency for Education</small></span></div><a href="https://www.youtube.com/watch?v=ks7joqB-glk" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></section><p class="finland-study-source-note">Sources checked 22 October 2026: <a href="https://www.oph.fi/en/education-system" target="_blank" rel="noreferrer">Finnish National Agency for Education · education system</a> · <a href="https://www.studyinfinland.fi/admissions/bachelors-and-masters-admissions" target="_blank" rel="noreferrer">Study in Finland · admissions</a> · <a href="https://studyinfo.fi/konfo/en/sivu/how-to-apply-for-bachelors-and-masters" target="_blank" rel="noreferrer">Studyinfo · application guide</a> · <a href="https://www.oph.fi/fi/kehittaminen-ja-kansainvalisyys/korkeakoulut-tukemassa-maahanmuuttajia/simhe" target="_blank" rel="noreferrer">OPH · SIMHE video and services</a>.</p></section>';
  }
  function jobPathDetailMarkup(pathId=activeJobPath){
    const routes={
      application:{title:"Apply for a specific job · hakea työpaikkaa",tag:"APPLICATION ROUTE",description:"Read the vacancy carefully, match your experience to its needs, and prepare a separate application and CV. InfoFinland says applications are usually written in the language used in the job advertisement.",bn:"চাকরির বিজ্ঞাপন মনোযোগ দিয়ে পড়ুন, প্রয়োজনের সঙ্গে নিজের অভিজ্ঞতা মিলিয়ে আলাদা আবেদন ও CV তৈরি করুন। InfoFinland জানায়, আবেদন সাধারণত বিজ্ঞাপনের ভাষায় লেখা হয়।",phrase:"Muokkaan hakemukseni tähän työpaikkaan.",en:"I tailor my application to this job.",bnPhrase:"আমি এই চাকরির জন্য আমার আবেদনটি মানিয়ে নিচ্ছি।",icon:"↗",url:"https://infofinland.fi/en/work-and-enterprise/find-a-job-in-finland/job-application-and-cv"},
      support:{title:"Find public job-search support · työnhaun tuki",tag:"PUBLIC SERVICES",description:"Job Market Finland offers job listings, guidance and employment-services e-services. The steps depend on your situation; check the current official instructions before acting.",bn:"Job Market Finland-এ চাকরির বিজ্ঞাপন, নির্দেশনা ও কর্মসংস্থান-সেবার অনলাইন সেবা আছে। আপনার পরিস্থিতি অনুযায়ী ধাপ আলাদা হতে পারে—কোনো পদক্ষেপ নেওয়ার আগে বর্তমান সরকারি নির্দেশনা দেখুন।",phrase:"Mistä löydän työnhaun palvelut?",en:"Where can I find job-search services?",bnPhrase:"চাকরি খোঁজার সেবা কোথায় পাব?",icon:"⌕",url:"https://tyomarkkinatori.fi/en/personal-customers/information-about-working-life/search-for-work"}
    };
    const route=routes[pathId]||routes.application;
    return '<div class="finland-jobs-route-detail"><div class="finland-jobs-route-art finland-jobs-route-art--'+(pathId==="support"?"support":"application")+'" aria-hidden="true"><span>'+route.icon+'</span><small>'+route.tag+'</small></div><div class="finland-jobs-route-copy"><span class="page-kicker">YOUR NEXT PRACTICAL STEP</span><h4>'+esc(route.title)+'</h4><p>'+esc(route.description)+'</p><p class="finland-jobs-bn" lang="bn">'+esc(route.bn)+'</p><div class="finland-jobs-phrase"><strong lang="fi">'+esc(route.phrase)+'</strong><span>'+esc(route.en)+'</span><small lang="bn">'+esc(route.bnPhrase)+'</small><button type="button" data-topic-speak="'+esc(route.phrase)+'">▶ Hear this phrase</button></div><a href="'+esc(route.url)+'" target="_blank" rel="noreferrer">Open the official guide ↗</a></div></div>';
  }
  function jobsPathMarkup(){
    const steps=[
      ["01","Name your skills","Tunnista osaamisesi","Connect your education, work experience and other strengths to the role."],
      ["02","Read the job ad","Lue työpaikkailmoitus","Check the duties, requested skills, application language and deadline."],
      ["03","Tailor your documents","Muokkaa hakemus ja CV","Write a focused application and update your CV for this particular job."],
      ["04","Prepare for the interview","Valmistaudu haastatteluun","Learn about the employer, practise describing your skills, and prepare questions."],
      ["05","Check current rules","Tarkista ajantasaiset ohjeet","Recognition, right to work and public-service steps depend on the profession and situation."]
    ].map(([number,title,fi,detail])=>'<article class="finland-jobs-step"><span>'+number+'</span><div><h4>'+esc(title)+'</h4><strong lang="fi">'+esc(fi)+'</strong><p>'+esc(detail)+'</p></div></article>').join("");
    const words=[
      ["työnhaku","job search","চাকরি খোঁজা"],["työpaikkailmoitus","job advertisement","চাকরির বিজ্ঞাপন"],["osaaminen","skills / competence","দক্ষতা"],["työkokemus","work experience","কাজের অভিজ্ঞতা"],
      ["hakemus","application","আবেদনপত্র"],["ansioluettelo","CV / résumé","জীবনবৃত্তান্ত"],["työhaastattelu","job interview","চাকরির সাক্ষাৎকার"],["aloittaa","to begin / start","শুরু করা"]
    ].map(([fi,en,bn])=>'<article class="finland-jobs-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Listen</button></article>').join("");
    const dialogue=[
      ["Interviewer","Kertoisitko lyhyesti osaamisestasi?","Could you briefly tell me about your skills?","আপনার দক্ষতা সম্পর্কে সংক্ষেপে বলবেন?"],
      ["Applicant","Minulla on kokemusta asiakaspalvelusta.","I have experience in customer service.","গ্রাহকসেবায় আমার অভিজ্ঞতা আছে।"],
      ["Interviewer","Milloin voisit aloittaa?","When could you start?","আপনি কবে থেকে শুরু করতে পারবেন?"],
      ["Applicant","Voisin aloittaa ensi kuussa.","I could start next month.","আমি আগামী মাসে শুরু করতে পারি।"]
    ].map(([speaker,fi,en,bn])=>'<article class="finland-jobs-dialogue-line"><div><span>'+esc(speaker)+'</span><strong lang="fi">'+esc(fi)+'</strong><p>'+esc(en)+'</p><small lang="bn">'+esc(bn)+'</small></div><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear Finnish: '+esc(fi)+'">▶</button></article>').join("");
    const applicationSelected=activeJobPath==="application";
    return '<section class="finland-jobs-journey" aria-labelledby="finland-jobs-heading"><div class="finland-jobs-hero"><div class="finland-jobs-hero-copy"><span class="page-kicker">WORKING LIFE IN FINLAND · A2–B1 FINNISH</span><h2 id="finland-jobs-heading">A job-search journey, from skills to interview</h2><p>Learn useful Finnish for applications and workplace conversations, with practical public links for the steps that change.</p><span lang="fi">työ · osaaminen · työhaastattelu</span></div><div class="finland-jobs-hero-art" role="img" aria-label="Illustrated Finnish city, tram and workplace by the sea"><svg viewBox="0 0 440 190" aria-hidden="true"><defs><linearGradient id="jobs-sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c7e1e4"/><stop offset="1" stop-color="#f3ead3"/></linearGradient></defs><path fill="url(#jobs-sky)" d="M0 0h440v190H0z"/><circle cx="365" cy="36" r="20" fill="#f4d48e"/><path fill="#79a38a" d="M0 124q60-46 121 0t114-5q58-40 111 0t94-10v81H0z"/><path fill="#5d8871" d="M0 151q60-34 121 0t114-3q58-31 111 2t94-10v50H0z"/><path fill="#f7f7ef" d="M45 74h72v69H45zm84-21h87v90h-87zm100 31h77v58h-77z"/><path fill="#749786" d="M53 83h15v17H53zm31 0h15v17H84zm-31 27h15v17H53zm31 0h15v17H84zm55-20h17v19h-17zm35 0h17v19h-17zm-35 30h17v20h-17zm35 0h17v20h-17zm70 0h14v13h-14zm29 0h14v13h-14z"/><path fill="#d27d5e" d="M275 135h111v23H275z"/><path fill="#f9f5e9" d="M286 112h70v23h-70z"/><path fill="#416a58" d="M301 117h18v12h-18zm31 0h18v12h-18z"/><path fill="#e7b56c" d="M290 158h11v5h-11zm71 0h11v5h-11z"/><path fill="#f4f4ec" d="M0 171q110-21 220 0t220-3v22H0z"/></svg><span>työpaikka · a workplace</span></div></div><section class="finland-jobs-routes" aria-labelledby="finland-jobs-routes-title"><div class="finland-jobs-heading-row"><div><span class="page-kicker">CHOOSE A STARTING POINT</span><h3 id="finland-jobs-routes-title">What are you working on?</h3></div><span>Choose a card to practise</span></div><div class="finland-jobs-route-tabs" role="group" aria-label="Choose a job search topic"><button type="button" data-job-path="application" aria-pressed="'+applicationSelected+'"><strong>Applying for a job</strong><small lang="fi">hakemus · ansioluettelo</small></button><button type="button" data-job-path="support" aria-pressed="'+(!applicationSelected)+'"><strong>Finding job-search support</strong><small lang="fi">työnhaun palvelut</small></button></div><div id="finland-jobs-route-detail">'+jobPathDetailMarkup()+'</div></section><section class="finland-jobs-steps" aria-labelledby="finland-jobs-steps-title"><div class="finland-jobs-heading-row"><div><span class="page-kicker">A PRACTICAL ROUTE</span><h3 id="finland-jobs-steps-title">Five steps from skills to interview</h3></div><span>Use the job ad as your guide</span></div><div class="finland-jobs-step-grid">'+steps+'</div></section><section class="finland-jobs-vocabulary" aria-labelledby="finland-jobs-vocabulary-title"><div class="finland-jobs-heading-row"><div><span class="page-kicker">LANGUAGE FOR WORK</span><h3 id="finland-jobs-vocabulary-title">Eight words for your next conversation</h3></div><span>Tap to hear natural Finnish audio</span></div><div class="finland-jobs-word-grid">'+words+'</div></section><section class="finland-jobs-dialogue" aria-labelledby="finland-jobs-dialogue-title"><div class="finland-jobs-heading-row"><div><span class="page-kicker">LISTEN · REPEAT · MAKE IT YOURS</span><h3 id="finland-jobs-dialogue-title">A short interview exchange</h3></div><span>A2–B1 · Finnish audio on every line</span></div><div class="finland-jobs-dialogue-card">'+dialogue+'</div></section><aside class="finland-jobs-culture"><div aria-hidden="true">✳</div><p><strong>Prepare for the conversation, not a stereotype.</strong> Recruitment practices vary by employer and role. Official guidance recommends learning about the employer, connecting your skills to the position and preparing questions of your own.<small lang="bn">প্রতিষ্ঠান ও পদের ভিত্তিতে নিয়োগের পদ্ধতি আলাদা হয়। প্রতিষ্ঠানের বিষয়ে জেনে নিন, পদের সঙ্গে নিজের দক্ষতা মিলিয়ে বলুন, এবং নিজের প্রশ্ন তৈরি করুন।</small></p></aside><aside class="finland-jobs-official-note"><strong>Check the current public guidance</strong><p>Job-search steps, recognition of qualifications and right-to-work requirements depend on your situation. Job Market Finland says its job-applicant-profile process changed on 1 September 2026; publishing a profile does not itself register someone as a job seeker for unemployment services. Confirm the current steps with the official service.</p><div><a href="https://tyomarkkinatori.fi/en/instructions-and-support/personal-customers/instructions-for-the-e-services-at-job-market-finland/start-of-job-search/how-to-begin-your-job-search" target="_blank" rel="noreferrer">Job Market Finland · starting a job search ↗</a><a href="https://infofinland.fi/en/work-and-enterprise/find-a-job-in-finland" target="_blank" rel="noreferrer">InfoFinland · finding work and right-to-work guidance ↗</a></div></aside><p class="finland-jobs-source-note">Sources checked 22 October 2026: <a href="https://infofinland.fi/en/work-and-enterprise/find-a-job-in-finland/job-application-and-cv" target="_blank" rel="noreferrer">InfoFinland · job applications, CVs and interviews</a> · <a href="https://tyomarkkinatori.fi/en/personal-customers/information-about-working-life/search-for-work" target="_blank" rel="noreferrer">Job Market Finland · search for work</a> · <a href="https://www.workinfinland.com/en/" target="_blank" rel="noreferrer">Work in Finland · international careers</a>.</p></section>';
  }
  function marketSceneMarkup(sceneId=activeMarketScene){
    const scenes={
      tori:{title:"At the outdoor market · torilla",tag:"MARKET SQUARE",description:"Market squares bring together stalls, cafés and local sellers. What you find depends on the place, day and season, so check the local market’s current details before you go.",bn:"খোলা বাজার চত্বরে দোকান, ক্যাফে ও স্থানীয় বিক্রেতা একসঙ্গে থাকে। কী পাওয়া যাবে তা স্থান, দিন ও ঋতুভেদে বদলায়—যাওয়ার আগে বাজারের বর্তমান তথ্য দেখুন।",phrase:"Paljonko mansikat maksavat?",en:"How much are the strawberries?",bnPhrase:"স্ট্রবেরির দাম কত?",icon:"♧",link:"https://www.visitfinland.com/en/articles/finnish-food-culture/",source:"Visit Finland · seasonal food"},
      grocery:{title:"At the grocery store · ruokakaupassa",tag:"EVERYDAY SHOPPING",description:"Find a product, ask where it is, and pay by card. Card payments are common in Finland, although payment options can differ between shops and market stalls.",bn:"পণ্য খুঁজুন, কোথায় আছে জিজ্ঞেস করুন, তারপর কার্ডে দাম দিন। ফিনল্যান্ডে কার্ডে পেমেন্ট সাধারণ, তবে দোকান ও বাজারের স্টলভেদে পদ্ধতি আলাদা হতে পারে।",phrase:"Missä on ruisleipä?",en:"Where is the rye bread?",bnPhrase:"রাই ব্রেড কোথায়?",icon:"⌕",link:"https://infofinland.fi/en/settling-in-finland/everyday-life-in-finland",source:"InfoFinland · everyday life"},
      hall:{title:"At the market hall · kauppahallissa",tag:"INDOOR MARKET",description:"Market halls offer an indoor place to meet food stalls and cafés. Try a Finnish dish, ask for a portion, and take your time with a new word.",bn:"ইনডোর মার্কেট হলে খাবারের স্টল ও ক্যাফে পাওয়া যায়। ফিনিশ খাবার চেখে দেখুন, এক পরিবেশন চাইতে শিখুন, আর নতুন শব্দটি ধীরে বলুন।",phrase:"Lohikeitto, kiitos.",en:"Salmon soup, please.",bnPhrase:"এক বাটি স্যামন স্যুপ দিন, দয়া করে।",icon:"▤",link:"https://www.visitfinland.com/en/articles/finlands-traditional-and-iconic-foods/",source:"Visit Finland · Finnish dishes"}
    };
    const scene=scenes[sceneId]||scenes.tori;
    return '<div class="finland-market-scene-detail"><div class="finland-market-scene-art finland-market-scene-art--'+esc(sceneId)+'" aria-hidden="true"><span>'+scene.icon+'</span><small>'+scene.tag+'</small></div><div class="finland-market-scene-copy"><span class="page-kicker">A PLACE TO USE FINNISH</span><h4>'+esc(scene.title)+'</h4><p>'+esc(scene.description)+'</p><p class="finland-market-bn" lang="bn">'+esc(scene.bn)+'</p><div class="finland-market-phrase"><strong lang="fi">'+esc(scene.phrase)+'</strong><span>'+esc(scene.en)+'</span><small lang="bn">'+esc(scene.bnPhrase)+'</small><button type="button" data-topic-speak="'+esc(scene.phrase)+'">▶ Hear this phrase</button></div><a href="'+esc(scene.link)+'" target="_blank" rel="noreferrer">'+esc(scene.source)+' ↗</a></div></div>';
  }
  function seasonalFoodMarkup(seasonId=activeFoodSeason){
    const seasons={
      "early-summer":{title:"Early summer · alkukesä",note:"New potatoes, fresh dill and strawberries are examples Visit Finland highlights for early summer. The harvest varies by region and year.",bn:"গ্রীষ্মের শুরুতে নতুন আলু, তাজা ডিল আর স্ট্রবেরির দেখা মেলে। ফসলের সময় অঞ্চল ও বছরভেদে বদলাতে পারে।",words:[["uudet perunat","new potatoes","নতুন আলু"],["tilli","dill","ডিল পাতা"],["mansikka","strawberry","স্ট্রবেরি"]]},
      autumn:{title:"Autumn harvest · syksyn sato",note:"Autumn brings examples such as wild mushrooms, lingonberries and root vegetables. Learn the words even when you’re shopping out of season.",bn:"শরতে বুনো মাশরুম, লিঙ্গনবেরি ও শিকড়জাত সবজির মতো খাবার দেখা যায়। অন্য ঋতুতে কেনাকাটা করলেও শব্দগুলো কাজে লাগবে।",words:[["sieni","mushroom","মাশরুম"],["puolukka","lingonberry","লিঙ্গনবেরি"],["juurekset","root vegetables","শিকড়জাত সবজি"]]},
      staples:{title:"Everyday staples · arjen perusruokaa",note:"Rye, oats and fish appear in Finland’s food stories across seasons. Pick a familiar item and practise asking for it in Finnish.",bn:"ফিনল্যান্ডের খাবারের গল্পে নানা ঋতুতে রাই, ওটস ও মাছের কথা আসে। পরিচিত কোনো খাবার বেছে নিয়ে Finnish-এ চাইতে অনুশীলন করুন।",words:[["ruisleipä","rye bread","রাই ব্রেড"],["kaura","oats","ওটস"],["kala","fish","মাছ"]]}
    };
    const season=seasons[seasonId]||seasons["early-summer"];
    const cards=season.words.map(([fi,en,bn])=>'<article class="finland-market-season-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶</button></article>').join("");
    return '<div class="finland-market-season-detail"><div><h4>'+esc(season.title)+'</h4><p>'+esc(season.note)+'</p><small lang="bn">'+esc(season.bn)+'</small></div><div class="finland-market-season-words">'+cards+'</div></div>';
  }
  function marketExperienceMarkup(){
    const routes=[["tori","Outdoor market","tori · mansikka"],["grocery","Grocery store","ruokakauppa · ruisleipä"],["hall","Market hall","kauppahalli · lohikeitto"]];
    const routeButtons=routes.map(([id,title,words])=>'<button type="button" data-market-scene="'+id+'" aria-pressed="'+(activeMarketScene===id)+'"><strong>'+title+'</strong><small lang="fi">'+words+'</small></button>').join("");
    const seasons=[["early-summer","Early summer"],["autumn","Autumn harvest"],["staples","Everyday staples"]].map(([id,title])=>'<button type="button" data-food-season="'+id+'" aria-pressed="'+(activeFoodSeason===id)+'">'+title+'</button>').join("");
    const words=[["tori","market square","বাজার চত্বর"],["kauppahalli","market hall","ইনডোর বাজার"],["ruokakauppa","grocery store","মুদির দোকান"],["hinta","price","দাম"],["mansikka","strawberry","স্ট্রবেরি"],["mustikka","bilberry","বিলবেরি"],["ruisleipä","rye bread","রাই ব্রেড"],["pantti","bottle deposit","বোতলের জামানত"],["leipäosasto","bread section","রুটির বিভাগ"]].map(([fi,en,bn])=>'<article class="finland-market-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Listen</button></article>').join("");
    const dialogue=[["Customer","Anteeksi, missä on ruisleipä?","Excuse me, where is the rye bread?","মাফ করবেন, রাই ব্রেড কোথায়?"],["Shop assistant","Se on leipäosastolla.","It is in the bread section.","ওটা রুটির বিভাগে আছে।"],["Customer","Voinko maksaa kortilla?","Can I pay by card?","আমি কি কার্ডে পেমেন্ট করতে পারি?"],["Shop assistant","Kyllä. Haluatko kuitin?","Yes. Would you like a receipt?","হ্যাঁ। আপনি কি রসিদ চান?"],["Customer","Kyllä, kiitos.","Yes, thank you.","হ্যাঁ, ধন্যবাদ।"]].map(([speaker,fi,en,bn])=>'<article class="finland-market-dialogue-line"><div><span>'+esc(speaker)+'</span><strong lang="fi">'+esc(fi)+'</strong><p>'+esc(en)+'</p><small lang="bn">'+esc(bn)+'</small></div><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear Finnish: '+esc(fi)+'">▶</button></article>').join("");
    const regionalFoods=[["Karelia","karjalanpiirakka","Karelian pie","Rice-filled rye pastry; often served with egg butter.","কারেলিয়ান পাই—রাইয়ের খোলসে ভরা ভাতের পুর, প্রায়ই ডিমের মাখনের সঙ্গে পরিবেশিত।"],["Savo","kalakukko","fish-filled rye loaf","A regional rye loaf baked with fish and pork inside.","মাছ ও শূকরের মাংস ভরা রাইয়ের রুটি—সাভো অঞ্চলের বিশেষ খাবার।"],["Tampere","mustamakkara","regional sausage","A Tampere specialty often paired with lingonberry jam.","ট্যাম্পেরের বিশেষ সসেজ, যা প্রায়ই লিঙ্গনবেরি জ্যামের সঙ্গে খাওয়া হয়।"]].map(([place,fi,en,detail,bn])=>'<article class="finland-market-region-card"><span>'+esc(place)+'</span><strong lang="fi">'+esc(fi)+'</strong><small>'+esc(en)+'</small><p>'+esc(detail)+'</p><p lang="bn">'+esc(bn)+'</p><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Hear the food name</button></article>').join("");
    return '<section class="finland-market-journey" aria-labelledby="finland-market-heading"><div class="finland-market-hero"><div class="finland-market-hero-copy"><span class="page-kicker">MARKETS, FOOD & DAILY LIFE · PRE-A1–A2</span><h2 id="finland-market-heading">A Finnish market day, from tori to grocery aisle</h2><p>Use Finnish to find a favourite food, ask a seller a question, and notice how Finnish meals connect with the seasons and regions.</p><span lang="fi">tori · ruoka · ostokset</span></div><div class="finland-market-hero-art" role="img" aria-label="Illustrated Finnish market stall with berries, bread and a seaside tram"><svg viewBox="0 0 440 190" aria-hidden="true"><defs><linearGradient id="market-sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c9e5e5"/><stop offset="1" stop-color="#f1ead4"/></linearGradient></defs><path fill="url(#market-sky)" d="M0 0h440v190H0z"/><circle cx="363" cy="34" r="20" fill="#f4d48e"/><path fill="#7ca38a" d="M0 128q58-42 120 0t115-3q59-43 119 2t86-6v69H0z"/><path fill="#4f7f70" d="M0 154q54-28 120 0t115-4q58-30 119 3t86-5v42H0z"/><path fill="#f8f7ee" d="M35 91h86v66H35z"/><path fill="#c86d5c" d="M25 92h106L78 48z"/><path fill="#d9e3d6" d="M46 105h18v18H46zm39 0h18v18H85z"/><path fill="#e7b66f" d="M139 113h128v37H139z"/><path fill="#557c63" d="M130 107h146v10H130z"/><path fill="#ab5546" d="M146 101q25-24 49 0v8h-49zm47 0q25-24 49 0v8h-49z"/><path fill="#e6ca82" d="M148 91h93v9h-93z"/><path fill="#405e4d" d="M166 128h15v10h-15zm41 0h15v10h-15zm41 0h15v10h-15z"/><path fill="#d27d5e" d="M291 130h98v23h-98z"/><path fill="#f8f4e8" d="M302 106h69v24h-69z"/><path fill="#456a58" d="M317 112h17v12h-17zm30 0h17v12h-17z"/><path fill="#e7b56c" d="M306 153h10v5h-10zm62 0h10v5h-10z"/><path fill="#f7f4eb" d="M0 173q110-16 220 0t220-2v19H0z"/></svg><span>mansikka · strawberry</span></div></div><section class="finland-market-routes" aria-labelledby="finland-market-routes-title"><div class="finland-market-heading-row"><div><span class="page-kicker">CHOOSE A SCENE</span><h3 id="finland-market-routes-title">Where would you like to practise?</h3></div><span>Each card gives you a phrase to use</span></div><div class="finland-market-route-tabs" role="group" aria-label="Choose a Finnish food-shopping scene">'+routeButtons+'</div><div id="finland-market-scene-detail">'+marketSceneMarkup()+'</div></section><section class="finland-market-season" aria-labelledby="finland-market-season-title"><div class="finland-market-heading-row"><div><span class="page-kicker">FOLLOW THE FINNISH YEAR</span><h3 id="finland-market-season-title">A small seasonal food guide</h3></div><span>Explore with Finnish words and audio</span></div><div class="finland-market-season-tabs" role="group" aria-label="Choose a seasonal food group">'+seasons+'</div><div id="finland-market-season-detail">'+seasonalFoodMarkup()+'</div><p class="finland-market-season-note">Season and availability vary by region and year. This is a language-learning guide, not a live stock list.</p></section><section class="finland-market-vocabulary" aria-labelledby="finland-market-vocabulary-title"><div class="finland-market-heading-row"><div><span class="page-kicker">LANGUAGE FOR THE AISLE</span><h3 id="finland-market-vocabulary-title">Nine useful shopping words</h3></div><span>Tap to hear every word</span></div><div class="finland-market-word-grid">'+words+'</div><p class="finland-market-word-note"><strong lang="fi">mustikka</strong> usually means a wild bilberry, a common berry in Finnish food stories. <span lang="bn">mustikka সাধারণত বুনো বিলবেরি বোঝায়।</span></p></section><section class="finland-market-dialogue" aria-labelledby="finland-market-dialogue-title"><div class="finland-market-heading-row"><div><span class="page-kicker">LISTEN · REPEAT · SHOP</span><h3 id="finland-market-dialogue-title">Find bread and pay at the shop</h3></div><span>Pre-A1–A2 · audio on every line</span></div><div class="finland-market-dialogue-card">'+dialogue+'</div></section><section class="finland-market-regions" aria-labelledby="finland-market-regions-title"><div class="finland-market-heading-row"><div><span class="page-kicker">TASTE FINLAND BY REGION</span><h3 id="finland-market-regions-title">Three local foods, three places</h3></div><span>Names include Finnish audio</span></div><div class="finland-market-region-grid">'+regionalFoods+'</div></section><aside class="finland-market-return"><div aria-hidden="true">♻</div><p><strong>Return the bottle · palauta pullo</strong>Many grocery stores have a return machine for empty beverage bottles and cans. You get the deposit back for most eligible packages; sorting instructions can vary by municipality.<small lang="bn">অনেক মুদির দোকানে খালি বোতল ও ক্যান ফেরত দেওয়ার মেশিন থাকে। অধিকাংশ গ্রহণযোগ্য প্যাকেজের জামানত ফেরত পাওয়া যায়; বাছাইয়ের নিয়ম পৌরসভাভেদে বদলাতে পারে।</small><button type="button" data-topic-speak="Palautan pullot kauppaan.">▶ Hear: Palautan pullot kauppaan.</button></p></aside><p class="finland-market-source-note">Sources checked 22 October 2026: <a href="https://www.visitfinland.com/en/articles/finnish-food-culture/" target="_blank" rel="noreferrer">Visit Finland · food culture and seasonal ingredients</a> · <a href="https://www.visitfinland.com/en/articles/finlands-traditional-and-iconic-foods/" target="_blank" rel="noreferrer">Visit Finland · traditional foods by region</a> · <a href="https://infofinland.fi/en/settling-in-finland/everyday-life-in-finland" target="_blank" rel="noreferrer">InfoFinland · everyday life and card payments</a> · <a href="https://infofinland.fi/housing/waste-and-recycling" target="_blank" rel="noreferrer">InfoFinland · bottle return and recycling</a>.</p></section>';
  }
  function renderFinlandTopic(index){
    const topic=topics[index],lesson=chapterLearning[index],page=document.getElementById("page-content");if(!topic||!lesson||!page)return;
    activeTopicIndex=index;
    const words=lesson.words.map(([fi,en,bn])=>'<article class="finland-topic-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Listen</button></article>').join("");
    const options=lesson.options.map((option,choice)=>'<button type="button" data-topic-answer="'+choice+'">'+esc(option)+'</button>').join("");
    page.innerHTML=customPageTitle(topic.title,"Connect Finnish to a real part of Finland. Read, listen, say a phrase, and check one meaning.","Finland learning chapter")+
      '<section class="finland-topic-panel"><h2>Finland note</h2><p>'+esc(lesson.fact)+'</p>'+(index===0?historyTimelineMarkup():index===1?civicGuideMarkup():index===7?studyPathMarkup():index===8?jobsPathMarkup():index===9?marketExperienceMarkup():index===10?regionExperienceMarkup():"")+'<h2>Useful words</h2><section class="finland-topic-vocab" aria-label="Finnish vocabulary">'+words+'</section><div class="finland-topic-phrase"><span>TRY THIS SENTENCE</span><strong lang="fi">'+esc(lesson.phrase)+'</strong><span>'+esc(lesson.en)+'</span><small lang="bn">'+esc(lesson.bn)+'</small><button type="button" class="button-secondary" data-topic-speak="'+esc(lesson.phrase)+'">▶ Hear the sentence</button></div><section class="finland-topic-quiz"><h3>'+esc(lesson.question)+'</h3>'+options+'<p class="finland-topic-feedback" id="finland-topic-feedback" role="status" aria-live="polite"></p></section><p class="finland-topic-source">Further reading: <a href="'+esc(topic.url)+'" target="_blank" rel="noreferrer">'+esc(topic.source)+' ↗</a></p><button class="button-secondary" type="button" data-page="culture">← All Finland chapters</button></section>';
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
    const studyRouteButton=event.target.closest("[data-study-route]");
    if(studyRouteButton){activeStudyRoute=studyRouteButton.dataset.studyRoute;document.querySelectorAll("[data-study-route]").forEach(button=>button.setAttribute("aria-pressed",String(button===studyRouteButton)));const detail=document.getElementById("finland-study-route-detail");if(detail)detail.innerHTML=studyRouteDetailMarkup(activeStudyRoute);return}
    const jobPathButton=event.target.closest("[data-job-path]");
    if(jobPathButton){activeJobPath=jobPathButton.dataset.jobPath;document.querySelectorAll("[data-job-path]").forEach(button=>button.setAttribute("aria-pressed",String(button===jobPathButton)));const detail=document.getElementById("finland-jobs-route-detail");if(detail)detail.innerHTML=jobPathDetailMarkup(activeJobPath);return}
    const marketSceneButton=event.target.closest("[data-market-scene]");
    if(marketSceneButton){activeMarketScene=marketSceneButton.dataset.marketScene;document.querySelectorAll("[data-market-scene]").forEach(button=>button.setAttribute("aria-pressed",String(button===marketSceneButton)));const detail=document.getElementById("finland-market-scene-detail");if(detail)detail.innerHTML=marketSceneMarkup(activeMarketScene);return}
    const foodSeasonButton=event.target.closest("[data-food-season]");
    if(foodSeasonButton){activeFoodSeason=foodSeasonButton.dataset.foodSeason;document.querySelectorAll("[data-food-season]").forEach(button=>button.setAttribute("aria-pressed",String(button===foodSeasonButton)));const detail=document.getElementById("finland-market-season-detail");if(detail)detail.innerHTML=seasonalFoodMarkup(activeFoodSeason);return}
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
