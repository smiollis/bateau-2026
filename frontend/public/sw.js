// Service Worker for Un Bateau à Paris — v1
// Cache-first static assets, stale-while-revalidate pages, network-first API

const STATIC_CACHE = 'bateau-static-v1';
const PAGES_CACHE = 'bateau-pages-v1';
const IMAGE_CACHE = 'bateau-images-v1';

const EXPECTED_CACHES = [STATIC_CACHE, PAGES_CACHE, IMAGE_CACHE];

const MAX_IMAGES = 100;
const MAX_PAGES = 50;

// --- Install: pre-cache nothing, let runtime caching handle it ---
self.addEventListener('install', (event) => {
  // Activate immediately without waiting for existing clients to close
  self.skipWaiting();
});

// --- Activate: clean up old caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !EXPECTED_CACHES.includes(name))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// --- Helpers ---

function isStaticAsset(url) {
  return /\.(js|css|woff2|woff|ttf)(\?.*)?$/i.test(url.pathname);
}

function isImageAsset(url) {
  return /\.(png|jpg|jpeg|webp|avif|svg|ico)(\?.*)?$/i.test(url.pathname);
}

function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

/**
 * Trim a cache to a maximum number of entries (FIFO — oldest first).
 */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    // Delete oldest entries (those added first)
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map((key) => cache.delete(key)));
  }
}

// --- Strategies ---

/**
 * Cache-first: return cached response if available, otherwise fetch & cache.
 */
async function cacheFirst(request, cacheName, maxEntries) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      // Trim in the background — don't block the response
      trimCache(cacheName, maxEntries);
    }
    return response;
  } catch (error) {
    // If offline and not cached, return a basic offline response
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/**
 * Stale-while-revalidate: return cached response immediately,
 * then fetch in the background to update the cache.
 */
async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Always kick off a network fetch to refresh the cache
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
        trimCache(cacheName, maxEntries);
      }
      return response;
    })
    .catch(() => cached); // If network fails, fall back to cache

  // Return the cached version immediately if available, otherwise wait for network
  return cached || fetchPromise;
}

/**
 * Network-first: try network, fall back to cache.
 */
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// --- Fetch handler ---
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API calls: network-first
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(request, PAGES_CACHE));
    return;
  }

  // Static assets (JS, CSS, fonts): cache-first
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, 200));
    return;
  }

  // Images: cache-first with a dedicated cache
  if (isImageAsset(url)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, MAX_IMAGES));
    return;
  }

  // HTML page navigations: stale-while-revalidate
  if (isNavigationRequest(request)) {
    event.respondWith(staleWhileRevalidate(request, PAGES_CACHE, MAX_PAGES));
    return;
  }
});
