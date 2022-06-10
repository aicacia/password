const build = [
  "/password/_app/immutable/start-5aec8290.js",
  "/password/_app/immutable/pages/__layout.svelte-aff631a9.js",
  "/password/_app/immutable/assets/pages/__layout.svelte-a1e48f80.css",
  "/password/_app/immutable/error.svelte-539a2629.js",
  "/password/_app/immutable/pages/index.svelte-6ec4ffea.js",
  "/password/_app/immutable/assets/pages/index.svelte-cf3861ad.css",
  "/password/_app/immutable/pages/privacy-policy.svelte-2a73d7f2.js",
  "/password/_app/immutable/chunks/index-af903a83.js",
  "/password/_app/immutable/chunks/preload-helper-b1a2c58b.js",
  "/password/_app/immutable/chunks/paths-396f020f.js",
  "/password/_app/immutable/chunks/Layout-4529d9e5.js",
  "/password/_app/immutable/chunks/widget-bc58238e.js"
];
const files = [
  "/password/favicon.png",
  "/password/icon.png",
  "/password/manifest.json",
  "/password/robots.txt"
];
const version = "1654822914667";
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
