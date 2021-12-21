const timestamp = 1640046960310;
const build = [
  "/password/_app/start-90f15585.js",
  "/password/_app/assets/start-d5b4de3e.css",
  "/password/_app/pages/__layout.svelte-2e153bf7.js",
  "/password/_app/assets/pages/__layout.svelte-971ebb93.css",
  "/password/_app/error.svelte-5b8b3755.js",
  "/password/_app/pages/index.svelte-280f216d.js",
  "/password/_app/pages/passwords.svelte-ab9d88c9.js",
  "/password/_app/pages/keys.svelte-1e35ebcd.js",
  "/password/_app/chunks/vendor-cf18c955.js",
  "/password/_app/assets/vendor-86f8c920.css",
  "/password/_app/chunks/singletons-12a22614.js",
  "/password/_app/chunks/paths-28a87002.js",
  "/password/_app/chunks/preload-helper-04e99934.js",
  "/password/_app/chunks/keys-b9524687.js",
  "/password/_app/chunks/Modal-76280f12.js",
  "/password/_app/chunks/widget-3e963cc8.js"
];
const files = [
  "/password/favicon.png",
  "/password/icon.png",
  "/password/manifest.json",
  "/password/robots.txt"
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
