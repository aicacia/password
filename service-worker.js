const timestamp = 1639952859835;
const build = [
  "/password/_app/start-e8bcaef5.js",
  "/password/_app/assets/start-d5b4de3e.css",
  "/password/_app/pages/__layout.svelte-c6c1da12.js",
  "/password/_app/assets/pages/__layout.svelte-037a3c57.css",
  "/password/_app/error.svelte-f6ef2d49.js",
  "/password/_app/pages/index.svelte-278cf60b.js",
  "/password/_app/pages/passwords.svelte-5e13d16f.js",
  "/password/_app/pages/keys.svelte-eb04b6c2.js",
  "/password/_app/chunks/vendor-f23cb189.js",
  "/password/_app/chunks/singletons-12a22614.js",
  "/password/_app/chunks/paths-28a87002.js",
  "/password/_app/chunks/preload-helper-04e99934.js",
  "/password/_app/chunks/keys-ac9139ce.js",
  "/password/_app/chunks/Modal-4ba55855.js",
  "/password/_app/chunks/widget-3e963cc8.js"
];
const files = [
  "/password/favicon.png",
  "/password/hidden.svg",
  "/password/icon.png",
  "/password/manifest.json",
  "/password/robots.txt",
  "/password/visible.svg"
];
const CACHE_NAME = `static-cache-v${timestamp}`;
const FILES_TO_CACHE = [...build, ...files];
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log("[ServiceWorker] Pre-caching offline page");
    return cache.addAll(FILES_TO_CACHE);
  }));
  self.skipWaiting();
});
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  evt.waitUntil(caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
    if (key !== CACHE_NAME) {
      console.log("[ServiceWorker] Removing old cache", key);
      return caches.delete(key);
    }
  }))));
  self.clients.claim();
});
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  if (evt.request.mode !== "navigate") {
    return;
  }
  evt.respondWith(fetch(evt.request).catch(() => caches.open(CACHE_NAME).then((cache) => cache.match("offline.html"))));
});
