<template>
  <div class="prevent-drag">
    <button
      class="full-screen | fixed top-[2vw] right-[2vw] z-[10] | border rounded-full p-[1vw] | bg-white"
      @click="fullScreen">
      <i class="icon icon-fullscreen | block text-black text-[5vw]"></i>
    </button>
    <Lobby
      v-if="currentScene === 'lobby'"
      @next="currentScene = $event" />
    <SelectCharacter
      v-if="currentScene === 'select'"
      @next="currentScene = $event" />
    <InGame
      v-if="currentScene === 'inGame'"
      @next="currentScene = $event" />
    <Result
      v-if="currentScene === 'result'"
      @next="currentScene = $event" />
    <Store
      v-if="currentScene === 'store'"
      @next="currentScene = $event" />
    <Collection
      v-if="currentScene === 'collection'"
      @next="currentScene = $event" />
  </div>
</template>

<script lang="ts" setup>
import store from "store2"
import { LAST_ACCESS } from "~/const"
const TODAY = new Date().toISOString().slice(0, 10)

const i18n = useI18n()
const { gtag } = useGtag()
const snackbarStore = useSnackbarStore()
const gameStore = useGameStore()
const soundStore = useSoundStore()

const currentScene = ref<
  "lobby" | "select" | "inGame" | "store" | "collection" | "result" | "setting"
>("lobby")

const fullScreen = async () => {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen()
  }

  if (screen.orientation && screen.orientation.lock) {
    await screen.orientation.lock("landscape")
  }
}

const checkFirstAccessToday = () => {
  const lastAccess = store.get(LAST_ACCESS)
  return !lastAccess || TODAY > lastAccess
}

onMounted(() => {
  soundStore.preloadSounds()

  if (checkFirstAccessToday()) {
    snackbarStore.showSnackbar({
      message: i18n.t("WelcomeReword"),
      type: "success",
    })

    gameStore.setCurrentMoney(gameStore.currentMoney + 1000)
  }

  store.set(LAST_ACCESS, TODAY)
})
watch(currentScene, (scene) =>
  setTimeout(() => {
    if (scene === "inGame") {
      const volume = soundStore.useBGMSound ? 0.1 : 0.001
      soundStore.playBGM("bgm", volume)
    } else {
      soundStore.stopBGM()
      soundStore.play("door")
    }

    gtag("event", "씬", { scene })
  })
)
</script>
<style lang="scss" scoped>
.full-screen {
  @media (orientation: landscape) {
    display: none;
  }
}
</style>
