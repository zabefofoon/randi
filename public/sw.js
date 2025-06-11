/// <reference lib="WebWorker" />
import { clientsClaim } from "workbox-core"
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching"
import { NavigationRoute, registerRoute } from "workbox-routing"

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])
cleanupOutdatedCaches()

const handler = createHandlerBoundToURL("/randi/index.html")
registerRoute(
  new NavigationRoute(handler, {
    denylist: [],
  })
)

// 메타 JSON → 빈 200 응답
self.addEventListener("fetch", (event) => {
  const { pathname } = new URL(event.request.url)
  if (pathname.startsWith("/assets/builds/meta/")) {
    event.respondWith(
      new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    )
  }
})
