<template>
  <div>
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
    <ClientOnly v-if="currentScene === 'inGame'">
      <InGame @next="currentScene = $event" />
    </ClientOnly>
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
      message: "접속 보상 100코인 적립",
      type: "success",
    })

    gameStore.setCurrentMoney(gameStore.currentMoney + 100)
  }

  store.set(LAST_ACCESS, TODAY)
})
watch(currentScene, (scene) =>
  setTimeout(() => {
    if (scene === "inGame") {
      soundStore.playBGM("bgm", 0.1)
    } else {
      soundStore.stopBGM()
      soundStore.play("door")
    }
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
