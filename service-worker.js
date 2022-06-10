const build = [
  "/password/internal/immutable/start-ac1b8181.js",
  "/password/internal/immutable/pages/__layout.svelte-aff631a9.js",
  "/password/internal/immutable/assets/pages/__layout.svelte-a1e48f80.css",
  "/password/internal/immutable/error.svelte-539a2629.js",
  "/password/internal/immutable/pages/index.svelte-8d98faea.js",
  "/password/internal/immutable/assets/pages/index.svelte-cf3861ad.css",
  "/password/internal/immutable/pages/privacy-policy.svelte-7cdb6db8.js",
  "/password/internal/immutable/chunks/index-af903a83.js",
  "/password/internal/immutable/chunks/preload-helper-9c8d85ec.js",
  "/password/internal/immutable/chunks/paths-396f020f.js",
  "/password/internal/immutable/chunks/Layout-846029de.js",
  "/password/internal/immutable/chunks/widget-bc58238e.js"
];
const files = [
  "/password/favicon.png",
  "/password/icon.png",
  "/password/manifest.json",
  "/password/robots.txt"
];
const version = "1654823237480";
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
