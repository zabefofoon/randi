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
const nuxt = useNuxtApp()
const gameStore = useGameStore()

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
  // 2) 가로 모드 고정 (Screen Orientation API)
  if (screen.orientation && screen.orientation.lock) {
    await screen.orientation.lock("landscape")
  }
}
onMounted(() => {
  gameStore.initMoney()
  gameStore.initCharacters()
  gameStore.initPurchasedItems()

  nuxt.$sound.registerSound("/assets/sounds/game_bgm.mp3", "bgm")
  nuxt.$sound.registerSound("/assets/sounds/door.mp3", "door")
  nuxt.$sound.registerSound("/assets/sounds/coin.mp3", "coin")
  nuxt.$sound.registerSound("/assets/sounds/select.mp3", "select")
  nuxt.$sound.registerSound("/assets/sounds/equip.mp3", "equip")
  nuxt.$sound.registerSound("/assets/sounds/stat.mp3", "stat")
})
watch(currentScene, (scene) =>
  setTimeout(() => {
    if (scene === "inGame") {
      nuxt.$sound.play("bgm", {
        loop: -1,
        volume: 0.8,
      })
    } else {
      nuxt.$sound.stop("bgm")
      nuxt.$sound.play("door")
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
