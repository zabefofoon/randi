<template>
  <AppGlobalLoadingContainer />
  <NuxtRouteAnnouncer />
  <NuxtPage />
  <ClientOnly>
    <AppSnackbarContainer />
  </ClientOnly>
</template>
<script lang="ts" setup>
import { useIphoneHistoryDetector } from "./composables/useIphoneHistoryDetector"

const iphoneHistoryDetector = useIphoneHistoryDetector()

onMounted(() => {
  if (navigator.userAgent.toLowerCase().includes("iphone")) {
    window.addEventListener("touchmove", iphoneHistoryDetector.detectStart)
    window.addEventListener("touchend", iphoneHistoryDetector.detectEnd)
    window.addEventListener("iphoneHistoryBack", iphoneHistoryDetector.historyBackHandler)
    window.addEventListener("touchcancel", iphoneHistoryDetector.historyForwardHandler)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("touchmove", iphoneHistoryDetector.detectStart)
  window.removeEventListener("touchend", iphoneHistoryDetector.detectEnd)
  window.removeEventListener("iphoneHistoryBack", iphoneHistoryDetector.historyBackHandler)
  window.removeEventListener("touchcancel", iphoneHistoryDetector.historyForwardHandler)
})
</script>
