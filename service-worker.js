const CACHE_NAME = 'webpwa-agnes';

const toCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/profile.html",
    "/about.html",
    "/form.html",
    "/content.html",
    "/cards.html",
    "/css/collumnLayout.css",
    "/css/style.css",
    "/js/register.js",
    "/assets/font-awesome/css/font-awesome.css",
    "/assets/font-awesome/css/font-awesome.min.css",
    "/assets/font-awesome/fonts/fontawesome-webfont.eot",
    "/assets/font-awesome/fonts/fontawesome-webfont.svg",
    "/assets/font-awesome/fonts/fontawesome-webfont.ttf",
    "/assets/font-awesome/fonts/fontawesome-webfont.woff",
    "/assets/font-awesome/fonts/fontawesome-webfont.woff2",
    "/assets/font-awesome/fonts/FontAwesome.otf",
    "/assets/font-awesome/less/animated.less",
    "/assets/font-awesome/less/bordered-pulled.less",
    "/assets/font-awesome/less/core.less",
    "/assets/font-awesome/less/fixed-width.less",
    "/assets/font-awesome/less/font-awesome.less",
    "/assets/font-awesome/less/icons.less",
    "/assets/font-awesome/less/larger.less",
    "/assets/font-awesome/less/list.less",
    "/assets/font-awesome/less/mixins.less",
    "/assets/font-awesome/less/path.less",
    "/assets/font-awesome/less/rotated-flipped.less",
    "/assets/font-awesome/less/screen-reader.less",
    "/assets/font-awesome/less/stacked.less",
    "/assets/font-awesome/less/variables.less",
    "/assets/font-awesome/scss/_animated.less",
    "/assets/font-awesome/scss/_bordered-pulled.less",
    "/assets/font-awesome/scss/_core.less",
    "/assets/font-awesome/scss/_fixed-width.less",
    "/assets/font-awesome/scss/_font-awesome.less",
    "/assets/font-awesome/scss/_icons.less",
    "/assets/font-awesome/scss/_larger.less",
    "/assets/font-awesome/scss/_list.less",
    "/assets/font-awesome/scss/_mixins.less",
    "/assets/font-awesome/scss/_path.less",
    "/assets/font-awesome/scss/_rotated-flipped.less",
    "/assets/font-awesome/scss/_screen-reader.less",
    "/assets/font-awesome/scss/_stacked.less",
    "/assets/font-awesome/scss/_variables.less",
    "/assets/font-awesome/HELP_US_OUT.txt",
    "/assets/a.png",
    "/assets/b.png",
    "/assets/c.png",
    "/assets/profile.png",
    "/assets/figma.png",
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
            })
        })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Hapus cache lama', key)
                return caches.delete(key)
            }
            }))
        })
        .then(() => self.clients.claim())
    )
})
