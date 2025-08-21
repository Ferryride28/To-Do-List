// A basic service worker to enable offline caching for the Todo Voice + Stickers PWA.
const CACHE_NAME = 'todo-voice-stickers-cache-v1';
const urlsToCache = [
  './',
  './todo-voice-stickers.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  // Perform install steps: open a cache and pre-cache key resources
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});
