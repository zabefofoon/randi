<template>
  <div
    v-if="isShowCookieBanner"
    class="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-3 md:flex-row md:items-center bg-white shadow-lg border border-gray-200 px-6 py-4 md:px-8 md:py-5 text-gray-800 text-sm">
    <p
      class="flex-1 leading-relaxed"
      v-html="i18n.t('CookieDesc')"></p>

    <div class="flex flex-col lg:flex-row gap-x-[0.5cqw]">
      <NuxtLink
        class="text-blue-500 underline"
        to="/terms"
        target="_blank">
        {{ i18n.t("Terms") }}
      </NuxtLink>
      <NuxtLink
        class="text-blue-500 underline"
        to="/privacy"
        target="_blank">
        {{ i18n.t("Privacy") }}
      </NuxtLink>
    </div>

    <div class="flex gap-2 shrink-0">
      <button
        id="cookie-decline"
        class="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
        @click="denyGtag">
        {{ i18n.t("Decline") }}
      </button>
      <button
        id="cookie-accept"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        @click="admitGtag">
        {{ i18n.t("Accept") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "store2"
import { LOCAL_GTAG_COOKIE } from "~/const"

const i18n = useI18n()
const { gtag } = useGtag()

const isShowCookieBanner = ref(false)

const initGtagBanner = () => {
  if (import.meta.dev) return

  const saved = store.get(LOCAL_GTAG_COOKIE) ?? false
  isShowCookieBanner.value = !saved
}

const denyGtag = () => {
  gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })
  store.set(LOCAL_GTAG_COOKIE, true)
  isShowCookieBanner.value = false
}
const admitGtag = () => {
  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  })
  store.set(LOCAL_GTAG_COOKIE, true)
  isShowCookieBanner.value = false
}

onMounted(() => {
  initGtagBanner()
})
</script>
