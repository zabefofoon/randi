<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <img
      class="w-0 h-0"
      src="/assets/images/tutorial.gif" />
    <ModalConfigs
      v-if="isShowConfigPopup"
      @close="showConfigPopup(false)">
      <div class="flex flex-col gap-[0.5cqw] | w-full">
        <div class="flex justify-between gap-[5cqw] mb-[0.5cqw]">
          <span class="text-outline text-[1.7cqw] font-bold">LANGUAGE</span>
        </div>
        <UIDropdown
          :position="{
            x: 'LEFT',
            y: 'BOTTOM',
          }">
          <template #button="{ showOptions }">
            <button
              class="text-[1.7cqw] font-bold text-outline py-[0.3cqw] | rounded-lg border-[0.2cqw] border-black | | bg-amber-500 w-full"
              @click="showOptions()">
              {{ i18n.localeProperties.value.name }}
            </button>
          </template>
          <template #options>
            <div
              class="w-full | flex flex-col gap-[0.2cqw] | bg-blue-900 | max-h-[20cqh] overflow-auto | pointer-events-auto | border-[0.2cqw] border-black rounded-lg">
              <button
                v-for="(locale, index) in i18n.locales.value"
                :key="locale.code"
                class="w-full | text-outline font-bold text-[1.5cqw] | py-[0.5cqw] | border-dotted border-b border-black"
                :class="{ 'border-0': index === i18n.locales.value.length - 1 }"
                @click="i18n.setLocale(locale.code)">
                {{ locale.name }}
              </button>
            </div>
          </template>
        </UIDropdown>
      </div>
    </ModalConfigs>

    <div class="content | relative | aspect-video max-w-full max-h-full">
      <img
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full | select-none pointer-events-none"
        src="/assets/images/main.webp" />

      <main
        class="backdrop-blur-anim | relative | w-full h-full | flex flex-col justify-center items-center">
        <div class="absolute right-[1cqw] top-[1cqw] | flex items-center gap-[1cqw]">
          <button
            class="bg-blue-950 | pr-[0.5cqw] | flex items-center justify-between | rounded-lg border-black border-[0.25cqw]"
            @click="showConfigPopup(true)">
            <div
              class="stat-sprites | w-[2.5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(19),
              }"></div>
            <span
              v-t="'Config'"
              class="text-[1.3cqw] text-white font-bold text-outline"></span>
          </button>
        </div>

        <h1
          class="fade-up | gasoek-one-regular | relative z-[1] | mt-[5cqw] | leading-none text-center text-[7cqw] font-bold text-outline text-white">
          <span v-html="i18n.t('TitleBite')"></span>
          <br />
          <span v-t="'RandomDefence'"></span>
        </h1>

        <div
          class="dissolve | flex flex-col items-center gap-[0.5cqw] | mt-[2cqw] | font-bold text-[2.5cqw] text-white">
          <button
            class="min-w-[20cqw] | flex items-center justify-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-orange-700"
            @click="emit('next', 'select')">
            <div
              v-t="'GameStart'"
              class="text-outline"></div>
          </button>
          <button
            class="w-[20cqw] | flex items-center justify-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-blue-950"
            @click="emit('next', 'collection')">
            <div
              v-t="'Collection'"
              class="text-outline"></div>
          </button>
          <button
            class="w-[20cqw] | flex items-center justify-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-blue-950">
            <div
              v-t="'Review'"
              class="text-outline"></div>
          </button>
          <div class="flex gap-[1cqw] text-[1.2cqw] | mt-[1cqw]">
            <NuxtLink
              class="text-gray-300 underline"
              to="/terms"
              target="_blank">
              {{ i18n.t("Terms") }}
            </NuxtLink>
            <NuxtLink
              class="text-gray-300 underline"
              to="/privacy"
              target="_blank">
              {{ i18n.t("Privacy") }}
            </NuxtLink>
          </div>
        </div>

        <h2
          v-if="runtimeConfig.public.IS_ITCH_MODE"
          class="dissolve | relative z-[1] | mt-[1cqw] | leading-none text-center text-[1.2cqw] font-bold text-outline text-gray-300">
          DEMO
        </h2>
      </main>

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
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "store2"
import { LOCAL_GTAG_COOKIE } from "~/const"

const emit = defineEmits<{
  (e: "next", scene: "inGame" | "select" | "store" | "collection"): void
}>()

const i18n = useI18n()
const { gtag } = useGtag()
const runtimeConfig = useRuntimeConfig()

const gameStore = useGameStore()
const soundStore = useSoundStore()

const isShowConfigPopup = ref(false)
const isShowCookieBanner = ref(false)
const showConfigPopup = (value: boolean) => {
  isShowConfigPopup.value = value
  if (value) soundStore.play("select")
}
const initGtagBanner = () => {
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
  gameStore.initMoney()
  gameStore.initCharacters()
  gameStore.initPurchasedItems()
  gameStore.initCollection()
  gameStore.initShowStepTutorial()
  soundStore.initSounds()
})
</script>
<style lang="scss" scoped>
.content {
  @media (aspect-ratio >= 16 / 9) {
    width: auto;
    height: 100%;
  }

  @media (aspect-ratio <= 16 / 9) {
    width: 100%;
    height: auto;
  }

  .backdrop-blur-anim {
    animation: backdrop-blur 500ms ease 500ms forwards;
  }

  .fade-up {
    opacity: 0;
    animation: fade-up 500ms ease 700ms forwards;
  }

  .dissolve {
    opacity: 0;
    animation: dissolve 500ms ease 1200ms forwards;
  }
}

@keyframes backdrop-blur {
  0% {
    backdrop-filter: blur(0);
  }

  100% {
    backdrop-filter: blur(0.5cqw);
  }
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translate(0, 2cqw);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes dissolve {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
