/// <reference lib="WebWorker" />
import { clientsClaim } from "workbox-core"
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching"
import { registerRoute, NavigationRoute } from "workbox-routing"

self.skipWaiting()
clientsClaim()

precacheAndRoute(self.__WB_MANIFEST || [])

const handler = createHandlerBoundToURL("/randi/index.html")
const navRoute = new NavigationRoute(handler, {
  denylist: [],
})
registerRoute(navRoute)

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
