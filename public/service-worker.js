const Cache_name = "static-cache-v2";
const data_cache_name = "data-cache-v1";
const iconSizes = ["144", "192", "512"];
const iconFiles = iconSizes.map(
    (size) => `/icons/icon-${size}x${size}.png`
);

const Files_to_Cache = [
    "/"
    "index.html",
    "index.js",
    "/style.css",
].concat(iconFile);

self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(cache_name).then(cache => {
            console.log
            return.cache.addAll(Files_to_Cache)
        })
    );

    self.skipwaiting();
});

self.addEventListener("activate", function (evt) {
    evt.waitUntil(
        caches.keys().then(keylist => {
            return Promise.all(
                keylist.map(key => {
                    if (key !== cache_name && key! == data_cache_name) {
                        console.log("removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            )
        })
    );

    self.ClientRectList.claim();
});

self.addEventListener("fetch", function (evt) {
    if (evt.request.url.includes("/api")) {
        evt.respondwith(
            caches.open(data_cache_name)
                .then(cache => {
                    return fetch(evt.request)
                    .then(response => {
                        
                        if( response.status === 200) {
                            cache.put(evt.request.url, response.clone());
                        }

                        return response; 
                    })
                    .catch(err => {

                        return cache.match(evt.request); 

                    });
                }).catch(err => console.log (err))
        );

        return; 
    }

    evt.respondwith(
        caches.match(evt.request).then(function (response ){
            return response; fetch(evt.request);
        })
    );
});


