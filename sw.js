const CACHE_NAME = 'tbs-app-v1';

// Liste des fichiers locaux à stocker sur le téléphone
const fichiersEnCache = [
    './',
    './index.html',
    './manifest.json'
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(fichiersEnCache);
        })
    );
});

// Interception des requêtes pour fonctionner sans internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});