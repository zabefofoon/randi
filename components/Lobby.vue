<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <div class="content | relative | aspect-video max-w-full max-h-full">
      <img
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full | select-none pointer-events-none"
        src="/assets/images/main.webp" />
      <main
        class="backdrop-blur-anim | relative | w-full h-full | flex flex-col justify-center items-center">
        <h1
          class="fade-up | gasoek-one-regular | relative z-[1] | leading-none text-center text-[5cqw] font-bold text-outline text-white">
          <span class="text-red-500">N</span>
          <span class="text-orange-500">Y</span>
          <span class="text-blue-500">L</span>
          <span class="text-green-500">O</span>
          <span class="text-violet-500">N</span> MASK<br />
          RANDOM DEFENCE
        </h1>
        <div
          class="dissolve | flex flex-col items-center gap-[0.5cqw] | mt-[2cqw] | font-bold text-[2.5cqw] text-white">
          <button
            class="flex items-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-blue-950"
            @click="emit('next', 'collection')">
            <div class="text-outline">Collection</div>
          </button>
          <button
            class="w-full | flex items-center justify-center | relative rounded-lg border-black border-[0.2cqw] | px-[1cqw] | bg-orange-700"
            @click="emit('next', 'select')">
            <div class="text-outline">Game Start</div>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "next", scene: "inGame" | "select" | "store" | "collection"): void
}>()

const gameStore = useGameStore()

onMounted(() => {
  gameStore.initMoney()
  gameStore.initCharacters()
  gameStore.initPurchasedItems()
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
