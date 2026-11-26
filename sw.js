// naikkan V tiap ada perubahan besar (v1 -> v2 -> ...)
const V='polyrace-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(['PolyRace.html','manifest.webmanifest','icon-192.png']).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// network-first: online selalu ambil versi terbaru, offline pakai salinan tersimpan
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{})}return res})
    .catch(()=>caches.match(r).then(m=>m||caches.match('PolyRace.html'))))});
