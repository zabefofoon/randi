<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <div class="content | relative | aspect-video max-w-full max-h-full | bg-white">
      <button @click="emit('next')">Next</button>
      <button @click="fullScreen">full</button>
      <VirtualJoystick class="absolute bottom-[12px] left-[12px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "next"): void
}>()

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
.content {
  @media (aspect-ratio >= 16 / 9) {
    width: auto;
    height: 100%;
  }

  @media (aspect-ratio <= 16 / 9) {
    width: 100%;
    height: auto;
  }
}
</style>
