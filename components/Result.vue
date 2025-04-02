<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <div class="content | relative | aspect-video max-w-full max-h-full | bg-white">
      <main class="relative | w-full h-full | flex flex-col justify-center items-center">
        <button @click="emit('next', 'lobby')">로비로 가기</button>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "next", scene: "lobby"): void
}>()
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
