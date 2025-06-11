<template>
  <AppGlobalLoadingContainer />
  <NuxtRouteAnnouncer />
  <div
    v-if="!isLoaded"
    class="fixed top-0 left-0 | w-full h-full | bg-white z-[100]"></div>
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
  } else {
    isLoaded.value = true
  }
}

if (route.query.platform) globalLoadingStore.setGlobalCoverLoading(LOADING_APP)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // 새 SW가 컨트롤러가 되었음 → 페이지 갱신
    window.location.reload()
  })
}

window.fromApp = (os: "android" | "ios") => {
  gameStore.setMode(os)
  isLoaded.value = true
  globalLoadingStore.deleteGlobalCoverLoading(LOADING_APP)
}

onMounted(() => {
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
})

onBeforeUnmount(() => {
  window.removeEventListener("touchmove", iphoneHistoryDetector.detectStart)
  window.removeEventListener("touchend", iphoneHistoryDetector.detectEnd)
  window.removeEventListener("iphoneHistoryBack", iphoneHistoryDetector.historyBackHandler)
  window.removeEventListener("touchcancel", iphoneHistoryDetector.historyForwardHandler)
})
</script>
