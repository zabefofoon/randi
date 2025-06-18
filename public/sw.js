/// <reference lib="WebWorker" />
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import { clientsClaim } from "workbox-core"
import { ExpirationPlugin } from "workbox-expiration"
import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from "workbox-precaching"
import { NavigationRoute, registerRoute } from "workbox-routing"
import { CacheFirst } from "workbox-strategies"

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])

cleanupOutdatedCaches()

registerRoute(new NavigationRoute(createHandlerBoundToURL("/")))

registerRoute(
    // 매치 함수
    ({ url, request }) =>
        request.destination === "script" &&
        url.origin === "https://code.createjs.com" &&
        url.pathname.endsWith(".js"),

    // 2️⃣  전략: CacheFirst → 오프라인 시 바로 캐시 제공
    new CacheFirst({
        cacheName: "cdn-createjs",
        plugins: [
            // 200(정상)·0(Opaque) 응답도 캐시 허용
            new CacheableResponsePlugin({ statuses: [0, 200] }),

            // 3️⃣  캐시 만료 정책 (예: 30 일, 10개)
            new ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30,
            }),
        ],
    })
)
