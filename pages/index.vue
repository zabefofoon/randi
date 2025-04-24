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
    <InGame
      v-if="currentScene === 'inGame'"
      @next="currentScene = $event" />
    <Result
      v-if="currentScene === 'result'"
      @next="currentScene = $event" />
  </div>
</template>

<script lang="ts" setup>
const currentScene = ref<"lobby" | "select" | "inGame" | "collection" | "result" | "setting">(
  "lobby"
)

const fullScreen = async () => {
  if (document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    // 구형 Safari 등
    await document.documentElement.webkitRequestFullscreen()
  }

  // 2) 가로 모드 고정 (Screen Orientation API)
  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock("landscape")
      console.log("화면을 가로로 고정했습니다.")
    } catch (err) {
      console.warn("가로 고정에 실패했습니다.", err)
    }
  } else {
    console.warn("해당 브라우저에서는 Screen Orientation API를 지원하지 않습니다.")
  }
}
</script>
<style lang="scss" scoped>
.full-screen {
  @media (orientation: landscape) {
    display: none;
  }
}
</style>
