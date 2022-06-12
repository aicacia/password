const build = [
  "/password/internal/immutable/start-a05ffd66.js",
  "/password/internal/immutable/pages/__layout.svelte-5e3cc46c.js",
  "/password/internal/immutable/assets/pages/__layout.svelte-58733ea8.css",
  "/password/internal/immutable/error.svelte-1fb29b12.js",
  "/password/internal/immutable/pages/index.svelte-0291b1cd.js",
  "/password/internal/immutable/pages/privacy-policy.svelte-b4a531a0.js",
  "/password/internal/immutable/chunks/index-b46ef222.js",
  "/password/internal/immutable/chunks/index-032e4192.js",
  "/password/internal/immutable/chunks/paths-396f020f.js",
  "/password/internal/immutable/chunks/preload-helper-3187750d.js",
  "/password/internal/immutable/chunks/Layout-b6843b13.js",
  "/password/internal/immutable/assets/Layout-14f30235.css",
  "/password/internal/immutable/chunks/widget-bc58238e.js"
];
const files = [
  "/password/favicon.png",
  "/password/icon.png",
  "/password/manifest.json",
  "/password/robots.txt"
];
const version = "1655063021941";
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
