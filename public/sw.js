// LinkX service worker — navigations network-first; hashed assets network-first so updates always land.
// Bump CACHE_NAME when changing caching rules.
const CACHE_NAME = "linkx-v3";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  const isHashedAsset =
    path.includes("/assets/") && /\.(js|css|woff2?|png|jpe?g|svg|webp)$/i.test(path);

  // Hashed Vite bundles: always try network first (cache busted by filename).
  if (isHashedAsset) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // HTML navigations: network first, then cached shell.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          if (res.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match("/linkx/index.html").then((r) => r || caches.match("/linkx/")))
    );
    return;
  }

  // Other same-origin GETs: stale-while-revalidate (network updates cache in background).
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => null);

      return networkFetch.then((networkRes) => networkRes || cached);
    })
  );
});
