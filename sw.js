const C='mf-v4',F=['./','./index.html','./app.js'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))));
 self.skipWaiting();
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.open(C).then(c=>c.match('./index.html')).then(ok=>ok?caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))):0).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(
  fetch(e.request,{cache:'reload'}).then(r=>{
   if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}
   return caches.match(e.request,{ignoreSearch:true}).then(c=>c||r);
  }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(c=>c||caches.match('./index.html')))
 );
});
