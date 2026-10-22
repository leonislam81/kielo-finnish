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
    {icon:"🕰️",title:"History & independence",text:"A compact timeline, key turning points, and the words to talk about them.",fi:"historia · itsenäisyys",url:"https://toolbox.finland.fi/life-society/finfo-facts-about-finland-2/",source:"Finland Toolbox"},
    {icon:"🏛️",title:"Government & public services",text:"Understand parliament, local services, everyday civic vocabulary, and where official information lives.",fi:"valtio · kunta",url:"https://finland.fi/facts-stats-and-info/finland-in-facts/",source:"This is Finland"},
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
  let fullDictionaryPromise=null,fullDictionaryEntries=null,fullDictionaryError="";
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
  let activeGroup=0,activeTopicIndex=-1,dailyQuiz=null;
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
  function speakFinnish(text){
    if(!("speechSynthesis"in window)||!("SpeechSynthesisUtterance"in window))return;
    const voices=getVoices();
    if(!voices.length){
      const note=document.querySelector(".finland-voice-note");
      if(note)note.textContent="This browser has no Finnish speech voice installed, so it cannot speak this word yet. Try an official Yle Finnish clip, or install a Finnish voice in your device’s speech settings.";
      const toast=document.getElementById("toast");if(toast){toast.textContent="No Finnish voice is installed in this browser yet.";toast.classList.add("visible");window.clearTimeout(toast.kieloTimer);toast.kieloTimer=window.setTimeout(()=>toast.classList.remove("visible"),2600)}
      return;
    }
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text),chosen=localStorage.getItem("kielo-finnish-voice")||"",selected=voices.find(voice=>voice.name===chosen)||voices[0];
    utterance.lang="fi-FI";utterance.rate=Number(localStorage.getItem("kielo-finnish-rate")||".86");if(selected)utterance.voice=selected;
    window.speechSynthesis.speak(utterance);
  }
  function setActiveCustomPage(page){
    document.querySelectorAll(".nav-link").forEach(button=>button.classList.toggle("active",button.dataset.redesignPage===page||(page==="home"&&button.dataset.page==="home")));
  }
  function customPageTitle(title,description,kicker){
    return '<div class="page-title-row finland-custom-page"><div><div class="page-kicker">'+esc(kicker)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></div>';
  }
  function voiceTools(){
    const available=getVoices().length>0;
    const note=available?"Choose a Finnish voice installed by your browser/device. Device speech can sound different on each system; the browser does not reliably label voice gender. For natural recorded Finnish, open the <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle learning clips ↗</a>.":"No Finnish voice is currently listed by this browser. Install a Finnish speech voice in your device settings, or use authentic audio from <a href=\"https://yle.fi/aihe/oppiminen/suomen-kielen-alkeet\" target=\"_blank\" rel=\"noreferrer\">Yle’s Finnish lessons ↗</a>. Browser speech settings do not provide a reliable male/female voice label.";
    return '<div class="finland-voice-tools"><label for="finnish-voice-select">Available Finnish voice<select id="finnish-voice-select">'+voiceOptions()+'</select></label><label for="finnish-rate-select">Speaking pace<select id="finnish-rate-select"><option value=".72">Slow</option><option value=".86" selected>Steady</option><option value="1">Natural</option></select></label></div><p class="finland-voice-note">'+note+'</p>';
  }
  function meaningLanguageTools(language){
    return '<div class="finland-meaning-tools"><label for="finland-meaning-language">Daily meanings<select id="finland-meaning-language"><option value="en" '+(language==="en"?"selected":"")+'>English · wide word bank</option><option value="bn" '+(language==="bn"?"selected":"")+'>Bangla · curated word bank</option></select></label><span>Bangla mode includes only words with a curated Bangla meaning. English mode adds the wider frequency bank.</span></div>';
  }
  function setVoiceSelection(){
    const voice=document.getElementById("finnish-voice-select"),rate=document.getElementById("finnish-rate-select");
    if(voice)voice.value=localStorage.getItem("kielo-finnish-voice")||"";
    if(rate)rate.value=localStorage.getItem("kielo-finnish-rate")||".86";
  }
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
      return '<article class="finland-word-card"><div class="finland-word-top"><h3 lang="fi">'+esc(word.fi)+'</h3><span class="finland-word-level">'+esc(word.level)+' · '+esc(word.topic)+'</span></div><p class="finland-word-translation" lang="'+(language==="bn"?"bn":"en")+'">'+esc(primary)+'</p><p class="finland-word-bn" lang="'+(language==="bn"?"en":"bn")+'">'+esc(secondary)+'</p><div class="finland-word-actions"><button type="button" data-daily-speak="'+overall+'" aria-label="Hear '+esc(word.fi)+' in Finnish">▶ Listen</button><button type="button" class="'+(done?"learned":"")+'" data-daily-learn="'+overall+'" aria-pressed="'+done+'">'+(done?"✓ Learned":"Mark learned")+'</button></div></article>';
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
    const needle=query.trim().toLocaleLowerCase();
    const isBangla=/[\u0980-\u09ff]/.test(query);
    if(fullDictionaryEntries&&needle&&!isBangla){
      const matches=[];
      for(const entry of fullDictionaryEntries)if((entry[0]+" "+entry[1]).toLocaleLowerCase().includes(needle))matches.push(entry);
      const escaped=needle.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),wholeMeaning=new RegExp("(^|[^\\p{L}\\p{N}])"+escaped+"($|[^\\p{L}\\p{N}])","iu");
      matches.sort((a,b)=>{
        const rank=entry=>{const fi=entry[0].toLocaleLowerCase(),en=entry[1].toLocaleLowerCase();if(fi===needle&&wholeMeaning.test(en))return 0;if(wholeMeaning.test(en))return 1;if(fi===needle)return 2;if(fi.startsWith(needle))return 3;return 4};
        const difference=rank(a)-rank(b);if(difference)return difference;
        return Number(b[2]||0)-Number(a[2]||0)||a[0].localeCompare(b[0]);
      });
      return {items:matches.slice(pageIndex*60,(pageIndex+1)*60).map(entry=>({fi:entry[0],en:entry[1],bn:"",level:"Finnish–English",topic:entry[2]?Number(entry[2]).toLocaleString()+" Yle news tokens":"Open dictionary",source:"open"})),total:matches.length,full:true};
    }
    const items=dailyVocabulary(false),filtered=needle?items.filter(word=>(word.fi+" "+word.en+" "+word.bn+" "+word.topic).toLocaleLowerCase().includes(needle)):items;
    return {items:filtered.slice(pageIndex*60,(pageIndex+1)*60),total:filtered.length,full:false};
  }
  function dictionaryCards(query="",pageIndex=0){
    const result=dictionaryItems(query,pageIndex);
    if(!result.items.length)return '<div class="finland-dictionary-empty">No word found. Try a Finnish spelling, English meaning, or Bangla translation.</div>';
    return result.items.map(word=>{
      const long=word.source==="open"&&word.en.length>240,summary=long?word.en.slice(0,220).trimEnd()+"…":word.en;
      const full=long?'<details class="finland-definition-details"><summary>Read the full source entry</summary><p>'+esc(word.en)+'</p></details>':'';
      return '<article class="finland-word-card"><div class="finland-word-top"><h3 lang="fi">'+esc(word.fi)+'</h3><span class="finland-word-level">'+esc(word.level)+'</span></div><p class="finland-word-translation">'+esc(summary)+'</p>'+full+'<p class="finland-word-bn" lang="bn">'+esc(word.bn||(word.source==="open"?"English source definition · no Bangla translation in this entry":"Bangla meaning not added yet"))+'</p><div class="finland-word-actions"><button type="button" data-dictionary-speak="'+esc(word.fi)+'" aria-label="Hear '+esc(word.fi)+' in Finnish">▶ Listen</button><span class="finland-word-level">'+esc(word.topic||"")+'</span></div></article>';
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
  async function loadFullDictionary(){
    const button=document.getElementById("finland-load-full-dictionary"),status=document.getElementById("finland-dictionary-status");
    if(fullDictionaryEntries){updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");return}
    if(fullDictionaryPromise)return fullDictionaryPromise;
    if(button)button.disabled=true;if(status)status.textContent="Loading the compressed Finnish–English headword dictionary…";
    fullDictionaryPromise=fetchGzipJson("data/fi-en-dictionary.json.gz").then(entries=>{
      fullDictionaryEntries=entries;fullDictionaryError="";
      if(button){button.textContent="Finnish–English dictionary loaded";button.disabled=true;}
      if(status)status.textContent=entries.length.toLocaleString()+" entries are ready. Search Finnish headwords and English definitions; the curated learner list remains available for Bangla meanings.";
      updateDictionaryResults(document.getElementById("finland-dictionary-search")?.value||"");
      return entries;
    }).catch(error=>{
      fullDictionaryError=error?.message||"The full dictionary could not be loaded.";
      if(button){button.disabled=false;button.textContent="Try loading the Finnish–English dictionary again";}
      if(status)status.textContent=fullDictionaryError+" The 273-word trilingual learner list still works.";
      fullDictionaryPromise=null;return [];
    });
    return fullDictionaryPromise;
  }
  function renderDictionary(){
    const page=document.getElementById("page-content");if(!page)return;
    const count=dailyVocabulary(false).length;
    page.innerHTML=customPageTitle("Finnish dictionary","Search Finnish, English, or Bangla in the learner list, then open the wider Finnish–English headword collection when you need it.","Words for real life")+
      '<div class="finland-dictionary-note"><strong>'+count+' curated trilingual learner words are ready immediately.</strong> These course and daily words include Finnish, English, Bangla, level and topic. Kotus publishes a Finnish headword list with more than 100,000 entries, but that list itself has no English or Bangla definitions. <a href="https://kotus.fi/sanakirjat/kielitoimiston-sanakirja/" target="_blank" rel="noreferrer">Open Kotus usage dictionary ↗</a></div>'+
      '<div class="finland-dictionary-tools"><input class="finland-dictionary-search" id="finland-dictionary-search" type="search" placeholder="Search suomi / English / বাংলা" autocomplete="off" aria-label="Search Finnish dictionary"><span class="finland-word-level" id="finland-dictionary-count"></span></div>'+
      '<section class="finland-dictionary-results" id="finland-dictionary-results" aria-live="polite">'+dictionaryCards("")+'</section><button class="button-secondary" id="finland-dictionary-more" type="button" data-dictionary-more hidden>Show more matches</button>'+
      '<div class="finland-dictionary-load"><div><strong>Wider Finnish–English dictionary</strong><br>254,435 source headwords · approximately 11.6 MiB compressed · downloaded only when you choose it. The source reports a translation for 82.78% of entries; other entries may be English definitions. Bangla meanings remain in the curated learner list above.</div><button id="finland-load-full-dictionary" type="button">Load wider dictionary</button></div><p class="finland-dictionary-status" id="finland-dictionary-status" role="status" aria-live="polite">Your search and learning progress stay in this browser. The wider open dataset downloads only if you choose it.</p>'+
      '<div class="finland-dictionary-source">The wider dictionary is an open Finnish–English compilation from FinnWordNet / Open Multilingual Wordnet, Princeton WordNet 3.0 and English Wiktionary via kaikki.org. This compact version searches headwords, not every inflected Finnish form. Source notices and licence are included in <a href="data/fi-en-ATTRIBUTION.txt" target="_blank" rel="noreferrer">Kielo’s attribution file ↗</a>. <a href="https://danielgregorini.github.io/koreader-dicts/fr/fi-en/" target="_blank" rel="noreferrer">Dataset coverage and licence ↗</a> · Kotus’ word list is not a complete list of every Finnish word.</div>'+
      '<div class="finland-page-footer"><p>Finnish audio uses an installed browser/device voice.</p><button class="button-primary" type="button" data-redesign-page="daily">Study today’s 100 words →</button></div>';
    setActiveCustomPage("dictionary");
    if(fullDictionaryEntries){const button=document.getElementById("finland-load-full-dictionary"),status=document.getElementById("finland-dictionary-status");if(button){button.textContent="Finnish–English dictionary loaded";button.disabled=true}if(status)status.textContent=fullDictionaryEntries.length.toLocaleString()+" entries are ready in this browser.";}
    updateDictionaryResults("");
  }
  function renderCustom(page){
    const target=document.getElementById("page-content");if(!target)return;
    if(page==="daily")renderDaily();else if(page==="dictionary")renderDictionary();
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function chapterMarkup(){
    return '<section class="finland-chapters" id="finland-chapters"><div class="finland-chapters-intro"><h2>Explore Finland, chapter by chapter</h2><p>Learn with an original vocabulary set, a real-life phrase, a quick check and a source to explore further.</p></div><div class="finland-chapter-grid">'+topics.map((topic,index)=>'<article class="finland-chapter"><span class="finland-chapter-icon" aria-hidden="true">'+topic.icon+'</span><h3>'+esc(topic.title)+'</h3><p>'+esc(topic.text)+'</p><div class="finland-chapter-foot"><span class="finland-chapter-words">'+esc(topic.fi)+'</span></div><div class="finland-chapter-actions"><button type="button" data-finland-topic="'+index+'">Learn this chapter →</button><a href="'+esc(topic.url)+'" target="_blank" rel="noreferrer">'+esc(topic.source)+' ↗</a></div></article>').join("")+'</div><p class="finland-data-note">Fast-changing statistics are dated and linked to the source. The linked page is for further reading; the language activities in Kielo are original practice.</p></section>';
  }
  function renderFinlandTopic(index){
    const topic=topics[index],lesson=chapterLearning[index],page=document.getElementById("page-content");if(!topic||!lesson||!page)return;
    activeTopicIndex=index;
    const words=lesson.words.map(([fi,en,bn])=>'<article class="finland-topic-word"><strong lang="fi">'+esc(fi)+'</strong><span>'+esc(en)+'</span><small lang="bn">'+esc(bn)+'</small><button type="button" data-topic-speak="'+esc(fi)+'" aria-label="Hear '+esc(fi)+' in Finnish">▶ Listen</button></article>').join("");
    const options=lesson.options.map((option,choice)=>'<button type="button" data-topic-answer="'+choice+'">'+esc(option)+'</button>').join("");
    page.innerHTML=customPageTitle(topic.title,"Connect Finnish to a real part of Finland. Read, listen, say a phrase, and check one meaning.","Finland learning chapter")+
      '<section class="finland-topic-panel"><h2>Finland note</h2><p>'+esc(lesson.fact)+'</p><h2>Useful words</h2><section class="finland-topic-vocab" aria-label="Finnish vocabulary">'+words+'</section><div class="finland-topic-phrase"><span>TRY THIS SENTENCE</span><strong lang="fi">'+esc(lesson.phrase)+'</strong><span>'+esc(lesson.en)+'</span><small lang="bn">'+esc(lesson.bn)+'</small><button type="button" class="button-secondary" data-topic-speak="'+esc(lesson.phrase)+'">▶ Hear the sentence</button></div><section class="finland-topic-quiz"><h3>'+esc(lesson.question)+'</h3>'+options+'<p class="finland-topic-feedback" id="finland-topic-feedback" role="status" aria-live="polite"></p></section><p class="finland-topic-source">Further reading: <a href="'+esc(topic.url)+'" target="_blank" rel="noreferrer">'+esc(topic.source)+' ↗</a></p><button class="button-secondary" type="button" data-page="culture">← All Finland chapters</button></section>';
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
    if(group){activeGroup=Number(group.dataset.dailyGroup)||0;dailyQuiz=null;renderDaily();return}
    const next=event.target.closest("[data-daily-next]");
    if(next){activeGroup=Math.min(9,activeGroup+1);dailyQuiz=null;renderDaily();return}
    const previous=event.target.closest("[data-daily-prev]");
    if(previous){activeGroup=Math.max(0,activeGroup-1);dailyQuiz=null;renderDaily();return}
    const learn=event.target.closest("[data-daily-learn]");
    if(learn){const words=dayWords(),word=words[Number(learn.dataset.dailyLearn)];if(!word)return;const progress=dailyProgress();if(progress.has(word.fi))progress.delete(word.fi);else progress.add(word.fi);storeDailyProgress(progress);renderDaily();return}
    const listen=event.target.closest("[data-daily-speak]");
    if(listen){const word=dayWords()[Number(listen.dataset.dailySpeak)];if(word)speakFinnish(word.fi);return}
    const dictionaryListen=event.target.closest("[data-dictionary-speak]");
    if(dictionaryListen){speakFinnish(dictionaryListen.dataset.dictionarySpeak);return}
    const refresh=event.target.closest("[data-weather-refresh]");
    if(refresh){loadWeather(true);return}
  },true);
  document.addEventListener("change",event=>{
    if(event.target?.id==="finland-meaning-language"){
      localStorage.setItem("kielo-daily-meaning-language",event.target.value==="bn"?"bn":"en");activeGroup=0;dailyQuiz=null;renderDaily();
    }
    if(event.target?.id==="finland-city"){
      localStorage.setItem(cityKey,event.target.value);cachedWeather=null;
      try{const saved=readJSON(weatherKey,null);if(saved?.cityId!==event.target.value)lastWeatherMessage="Loading current conditions…"}catch(_error){}
      updateClock();refreshStatusContent();loadWeather(true);
    }
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
