<template>
  <!-- <VitePwaManifest /> -->
  <AppGlobalLoadingContainer />
  <NuxtRouteAnnouncer />
  <div
    v-if="!isLoaded"
    class="fixed top-0 left-0 | w-full h-full | bg-white z-[100]"></div>

  <Transition name="fade">
    <div
      v-if="isShowReloadForUpdate"
      class="flex flex-col gap-[0.5cqw] | fixed top-[5cqh] left-1/2 -translate-x-1/2 z-50">
      <p
        class="bg-blue-900/80 | font-bold text-white text-[1.6cqw] text-center | p-[0.5cqw] | rounded-lg border-black border-[0.2cqw]"
        v-html="i18n.t('AppUpdate')"></p>
      <div class="flex items-center gap-[0.2cqw] | text-white text-[1.3cqw] font-bold">
        <button
          v-t="'Decline'"
          class="rounded-lg border-black border-[0.2cqw] | w-full bg-blue-900"
          @click="isShowReloadForUpdate = false"></button>
        <button
          v-t="'Accept'"
          class="rounded-lg border-black border-[0.2cqw] | w-full bg-orange-700"
          @click="updateServiceWorker"></button>
      </div>
    </div>
  </Transition>

  <NuxtPage />
  <ClientOnly>
    <AppSnackbarContainer />
  </ClientOnly>
</template>
<script lang="ts" setup>
import { useIphoneHistoryDetector } from "./composables/useIphoneHistoryDetector"
import { LOADING_APP } from "./const"

const gameStore = useGameStore()
const route = useRoute()
const i18n = useI18n()

const globalLoadingStore = useGlobalLoadingStore()
const iphoneHistoryDetector = useIphoneHistoryDetector()

const isLoaded = ref(false)
const initMode = () => {
  const isIframe = window.self !== window.top

  if (isIframe) {
    window.addEventListener("message", (event) => {
      if (event.data.from === "itch") {
        gameStore.setMode("demo")
        isLoaded.value = true
      }
    })
  } else isLoaded.value = true
}

if (route.query.platform) globalLoadingStore.setGlobalCoverLoading(LOADING_APP)

window.fromApp = (os: "android" | "ios") => {
  gameStore.setMode(os)
  isLoaded.value = true
  globalLoadingStore.deleteGlobalCoverLoading(LOADING_APP)
}

const isShowReloadForUpdate = ref(false)
let waitingWorker: ServiceWorker

const updateServiceWorker = () => {
  if (waitingWorker) waitingWorker.postMessage({ type: "SKIP_WAITING" })
}

onMounted(async () => {
  initMode()

  if (navigator.userAgent.toLowerCase().includes("iphone")) {
    window.addEventListener("touchmove", iphoneHistoryDetector.detectStart)
    window.addEventListener("touchend", iphoneHistoryDetector.detectEnd)
    window.addEventListener("iphoneHistoryBack", iphoneHistoryDetector.historyBackHandler)
    window.addEventListener("touchcancel", iphoneHistoryDetector.historyForwardHandler)
  }

  window.parent.postMessage({ data: "load" }, "*")

  window.appChannel?.postMessage(
    JSON.stringify({
      type: "load",
    })
  )

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      location.reload()
    })

    const registration = await navigator.serviceWorker.getRegistration()
    if (!registration) return

    if (registration.waiting) {
      isShowReloadForUpdate.value = true

      waitingWorker = registration.waiting
      return
    }

    registration.addEventListener("updatefound", () => {
      const newSW = registration.installing
      if (!newSW) return

      newSW.addEventListener("statechange", () => {
        if (newSW.state === "installed" && navigator.serviceWorker.controller) {
          isShowReloadForUpdate.value = true
          waitingWorker = newSW
        }
      })
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("touchmove", iphoneHistoryDetector.detectStart)
  window.removeEventListener("touchend", iphoneHistoryDetector.detectEnd)
  window.removeEventListener("iphoneHistoryBack", iphoneHistoryDetector.historyBackHandler)
  window.removeEventListener("touchcancel", iphoneHistoryDetector.historyForwardHandler)
})
</script>
