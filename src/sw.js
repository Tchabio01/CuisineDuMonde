import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

self.skipWaiting();
clientsClaim();

// Les fichiers sont injectés automatiquement pendant la compilation.
precacheAndRoute(self.__WB_MANIFEST);

// En cas de perte de réseau, afficher l'application déjà mise en cache.
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET' || request.mode !== 'navigate') {
    return;
  }

  event.respondWith(
    fetch(request).catch(async () => {
      const cachedPage = await caches.match('/index.html');
      return cachedPage || Response.error();
    })
  );
});
