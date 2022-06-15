const build = [
  "/secrets/internal/immutable/start-f48dc673.js",
  "/secrets/internal/immutable/pages/__layout.svelte-51b5392b.js",
  "/secrets/internal/immutable/assets/pages/__layout.svelte-0bc20e30.css",
  "/secrets/internal/immutable/error.svelte-67b8f836.js",
  "/secrets/internal/immutable/pages/index.svelte-e544db2a.js",
  "/secrets/internal/immutable/pages/privacy-policy.svelte-50197b25.js",
  "/secrets/internal/immutable/pages/terms-of-service.svelte-14f97548.js",
  "/secrets/internal/immutable/chunks/index-b32f51c6.js",
  "/secrets/internal/immutable/chunks/index-ffc9c32f.js",
  "/secrets/internal/immutable/chunks/paths-396f020f.js",
  "/secrets/internal/immutable/chunks/preload-helper-91b3b7b7.js",
  "/secrets/internal/immutable/chunks/Layout-b75bc83d.js",
  "/secrets/internal/immutable/assets/Layout-14f30235.css",
  "/secrets/internal/immutable/chunks/widget-bc58238e.js"
];
const files = [
  "/secrets/favicon.png",
  "/secrets/icon.png",
  "/secrets/manifest.json",
  "/secrets/robots.txt"
];
const version = "1655291797171";
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
