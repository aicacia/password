const build = [
  "/secrets/internal/immutable/start-2a2c7d01.js",
  "/secrets/internal/immutable/pages/__layout.svelte-1247d29b.js",
  "/secrets/internal/immutable/assets/pages/__layout.svelte-67e3e141.css",
  "/secrets/internal/immutable/error.svelte-a7afbb76.js",
  "/secrets/internal/immutable/pages/index.svelte-cae7f88c.js",
  "/secrets/internal/immutable/pages/privacy-policy.svelte-c4cb5eae.js",
  "/secrets/internal/immutable/chunks/index-88b7c50a.js",
  "/secrets/internal/immutable/chunks/index-859dd965.js",
  "/secrets/internal/immutable/chunks/paths-396f020f.js",
  "/secrets/internal/immutable/chunks/preload-helper-91b3b7b7.js",
  "/secrets/internal/immutable/chunks/Layout-c46df740.js",
  "/secrets/internal/immutable/assets/Layout-14f30235.css",
  "/secrets/internal/immutable/chunks/widget-bc58238e.js"
];
const files = [
  "/secrets/favicon.png",
  "/secrets/icon.png",
  "/secrets/manifest.json",
  "/secrets/robots.txt"
];
const version = "1655171779410";
const worker = self;
const FILES = `cache${version}`;
const toCache = build.concat(files);
const staticAssets = new Set(toCache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(toCache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${version}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
