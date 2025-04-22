<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <div class="content | relative | aspect-video max-w-full max-h-full | bg-white">
      <main
        class="relative | w-full h-full | flex flex-col justify-center items-center | bg-purple-950">
        <button
          class="absolute top-[1cqw] right-[1cqw] | border rounded-full p-1 | bg-white"
          @click="fullScreen">
          <i class="icon icon-fullscreen | block text-black text-[1.5cqw]"></i>
        </button>
        <img
          class="absolute right-0 bottom-0 w-[30cqw] | select-none pointer-events-none"
          src="~/assets/images/main.png" />
        <h1
          class="gasoek-one-regular | relative z-[1] | leading-none text-center text-[5cqw] font-bold text-white [text-shadow:_.5cqw_.5cqw_0_black] shadow-black">
          <span class="text-red-500">N</span>
          <span class="text-orange-500">Y</span>
          <span class="text-blue-500">L</span>
          <span class="text-green-500">O</span>
          <span class="text-violet-500">N</span> MASK<br />
          RANDOM DEFENCE
        </h1>
        <div class="flex flex-col | mt-[2cqw] | font-bold text-[2cqw] text-white">
          <button
            class="button | flex items-center | relative"
            @click="emit('next', 'inGame')">
            <i class="icon icon-chevron-right | absolute left-0 -translate-x-full | hidden"></i>
            Game Start
          </button>
          <button
            class="button | flex items-center | relative"
            @click="emit('next', 'collection')">
            <i class="icon icon-chevron-right | absolute left-0 -translate-x-full | hidden"></i>
            Collection
          </button>
          <button
            class="button | flex items-center | relative"
            @click="emit('next', 'setting')">
            <i class="icon icon-chevron-right | absolute left-0 -translate-x-full | hidden"></i>
            Setting
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "next", scene: "inGame" | "collection" | "setting"): void
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

onMounted(() => {
  console.log(
    Array.from({ length: 100 }, (_, index) => {
      return Math.pow(index * 2, 2) + 10
    })
  )
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
}

.button {
  &:hover {
    .icon {
      display: block;
    }
  }
}
</style>
