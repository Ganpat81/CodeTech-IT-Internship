/* =========================================
   CACHE CONFIGURATION
   ========================================= */

const CACHE_NAME = "offline-ecommerce-v1";

// Files that will be cached for offline use
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json"
];

/* =========================================
   INSTALL EVENT
   ========================================= */
// Fired when service worker is installed
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  // Activate immediately
  self.skipWaiting();
});

/* =========================================
   ACTIVATE EVENT
   ========================================= */
// Fired when service worker activates
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");

  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  self.clients.claim();
});

/* =========================================
   FETCH EVENT (OFFLINE SUPPORT)
   ========================================= */
// Intercept network requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If found in cache, return it
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request).catch(() => {
        // Optional fallback
        return new Response("You are offline", {
          headers: { "Content-Type": "text/plain" }
        });
      });
    })
  );
});

/* =========================================
   PUSH NOTIFICATION HANDLER
   ========================================= */
// Handles push messages from server
self.addEventListener("push", (event) => {
  const message = event.data
    ? event.data.text()
    : "New offers available!";

  event.waitUntil(
    self.registration.showNotification("Offline Shop", {
      body: message,
      icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
      badge: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
    })
  );
});
