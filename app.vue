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
import { I18N_COOKIE } from "./const"

const i18n = useI18n()
const headers = useRequestHeaders()
const iphoneHistoryDetector = useIphoneHistoryDetector()

const initLocale = async (): Promise<void> => {
  const preferLang = import.meta.client
    ? window.navigator.language
    : headers["accept-language"]?.split(",")?.[0] ?? "ko"

  const savedLocaleInCookie = useCookie(I18N_COOKIE).value ?? preferLang
  await i18n.setLocale(savedLocaleInCookie)
}

await initLocale()

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
