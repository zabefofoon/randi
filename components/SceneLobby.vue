<template>
  <BackgroundDefault>
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
                @click="setLocale(locale.code)">
                {{ locale.name }}
              </button>
            </div>
          </template>
        </UIDropdown>
      </div>
    </ModalConfigs>

    <img
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover | select-none pointer-events-none"
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
          @click="gameStore.isShowStepTutorial ? emit('next', 'inGame') : emit('next', 'select')">
          <div
            v-t="'GameStart'"
            class="text-outline"></div>
        </button>
        <button
          v-if="!gameStore.isShowStepTutorial"
          class="w-[20cqw] | flex items-center justify-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-blue-950"
          @click="emit('next', 'collection')">
          <div
            v-t="'Collection'"
            class="text-outline"></div>
        </button>
        <!-- <button
          class="w-[20cqw] | flex items-center justify-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-blue-950">
          <div
            v-t="'Review'"
            class="text-outline"></div>
        </button> -->
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
        v-if="gameStore.mode === 'demo'"
        class="dissolve | relative z-[1] | mt-[1cqw] | leading-none text-center text-[1.2cqw] font-bold text-outline text-gray-300">
        v{{ packageJson.version }} - DEMO
      </h2>
      <h2
        v-else
        class="dissolve | relative z-[1] | mt-[1cqw] | leading-none text-center text-[1.2cqw] font-bold text-outline text-gray-300">
        v{{ packageJson.version }}
      </h2>
    </main>

    <SceneLobbyCookieBanner />
  </BackgroundDefault>
</template>

<script setup lang="ts">
import packageJson from "~/package.json"

const emit = defineEmits<{
  (e: "next", scene: "inGame" | "select" | "store" | "collection"): void
}>()

const i18n = useI18n()

const gameStore = useGameStore()
const soundStore = useSoundStore()
const switchLocalePath = useSwitchLocalePath()

const isShowConfigPopup = ref(false)
const showConfigPopup = (value: boolean) => {
  isShowConfigPopup.value = value
  if (value) soundStore.play("select")
}
const setLocale = (locale: typeof i18n.locale.value) => {
  const path = switchLocalePath(locale)
  navigateTo(path, { replace: true })

  window.appChannel?.postMessage(
    JSON.stringify({
      type: "setLocale",
      locale,
    })
  )
}

onMounted(() => {
  gameStore.initMoney()
  gameStore.initCharacters()
  gameStore.initPurchasedItems()
  gameStore.initCollection()
  gameStore.initShowStepTutorial()
  gameStore.initWeaponEnforce()
  gameStore.initWeaponEnforce()
  gameStore.initClearCount()
  soundStore.initSounds()
})
</script>
<style lang="scss" scoped>
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
