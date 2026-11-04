"use strict";

const CACHE_NAME="kielo-offline-v168";
const SCOPE_URL=new URL(self.registration.scope);
const OFFLINE_PAGE=new URL("index.html",SCOPE_URL).href;
const ASSET_PATHS=[
  "index.html",
  "jobs.html",
  "learn.html",
  "homepage.css?v=layoutfix7",
  "jobs.css?v=font12",
  "cv-builder.css?v=layoutfix4",
  "jobs.js?v=7",
  "jobs-guide.js?v=2",
  "jobs-workspace.js?v=3",
  "cv-builder.js?v=5",
  "homepage.js?v=2",
  "manifest.webmanifest",
  "styles.css?v=layoutfix1",
  "accessibility.css?v=font12",
  "cafe.css?v=layoutfix1",
  "spoken.css?v=font12",
  "sounds.css?v=font12",
  "listening.css?v=font12",
  "reading.css?v=font12",
  "writing.css?v=font12",
  "speaking.css?v=font12",
  "grammar.css?v=font12",
  "vocabulary.css?v=layoutfix1",
  "pwa.css?v=font12",
  "backup.css?v=font12",
  "rhythm.css?v=font12",
  "redesign.css?v=layoutfix2",
  "holidays.css?v=font12",
  "finnish-keys.css?v=font12",
  "finland-design.css?v=font12",
  "learning-centre-polish.css?v=layoutfix1",
  "curriculum.js?v=10",
  "advanced-vocabulary.js",
  "daily-vocabulary.js?v=4",
  "data/fi-en-frequent.json.gz?v=3",
  "data/finland-regions-2026.geojson",
  "pwa.js?v=font12",
  "neural-speech.js?v=49",
  "sami-experience.js?v=1",
  "grammar-cases.js?v=1",
  "supertonic-speech.js?v=19",
  "supertonic-helper.js?v=5",
  "app.js?v=92",
  "redesign.js?v=100",
  "finland-design.js",
  "images/kielo-cover.webp",
  "images/kielo-mark.svg",
  "images/kielo-icon-192.png",
  "images/kielo-icon-512.png"
];
const PRECACHE_URLS=ASSET_PATHS.map(path=>new URL(path,SCOPE_URL).href);

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(PRECACHE_URLS)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name.startsWith("kielo-offline-")&&name!==CACHE_NAME).map(name=>caches.delete(name)))).then(()=>self.clients.claim()));
});

self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==SCOPE_URL.origin||!url.pathname.startsWith(SCOPE_URL.pathname))return;

  if(request.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request);
        if(response.ok)await (await caches.open(CACHE_NAME)).put(OFFLINE_PAGE,response.clone());
        return response;
      }catch(_error){
        return await caches.match(request,{ignoreSearch:true})||await caches.match(OFFLINE_PAGE)||new Response("Kielo is offline. Reconnect once to load the lesson library.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}});
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    try{
      const response=await fetch(request);
      if(response.ok&&response.type==="basic")await cache.put(request,response.clone());
      return response;
    }catch(_error){
      return await cache.match(request)||Response.error();
    }
  })());
});
