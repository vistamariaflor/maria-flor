const C='mf-v3',F=['./','./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(cached=>{
  const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>cached||c.match('./index.html'));
  return cached||net;
 })));
});
