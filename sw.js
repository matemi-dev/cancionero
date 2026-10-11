// Guarda la app en el celu para que funcione sin internet.
// Con internet trae la versión nueva; sin señal (o si tarda más de 3 s) usa la copia guardada.
const CACHE = "cancionero-v1";
const ARCHIVOS = [
  "./", "index.html", "estilos.css", "app.js", "canciones.js",
  "manifest.webmanifest", "icono.svg", "icono-180.png", "icono-192.png", "icono-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const guardado = await cache.match(e.request, { ignoreSearch: true });
      const red = fetch(e.request).then((r) => { if (r.ok) cache.put(e.request, r.clone()); return r; });
      if (!guardado) return red;
      const espera = new Promise((ok) => setTimeout(() => ok(guardado), 3000));
      return Promise.race([red.catch(() => guardado), espera]);
    })
  );
});
