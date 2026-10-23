"use strict";

const CACHE_NAME="kielo-offline-v67";
const SCOPE_URL=new URL(self.registration.scope);
const OFFLINE_PAGE=new URL("index.html",SCOPE_URL).href;
const ASSET_PATHS=[
  "index.html",
  "manifest.webmanifest",
  "styles.css",
  "cafe.css",
  "spoken.css?v=1",
  "sounds.css",
  "listening.css?v=25",
  "reading.css?v=27",
  "writing.css?v=23",
  "speaking.css?v=28",
  "grammar.css?v=27",
  "vocabulary.css?v=1",
  "pwa.css?v=1",
  "backup.css?v=1",
  "rhythm.css?v=7",
  "finnish-keys.css?v=2",
  "redesign.css?v=47",
  "holidays.css?v=1",
  "curriculum.js",
  "advanced-vocabulary.js",
  "daily-vocabulary.js?v=2",
  "data/fi-en-frequent.json.gz?v=3",
  "data/finland-regions-2026.geojson",
  "pwa.js?v=1",
  "neural-speech.js?v=10",
  "sami-experience.js?v=1",
  "supertonic-speech.js?v=6",
  "supertonic-helper.js?v=4",
  "app.js?v=76",
  "redesign.js?v=58",
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
