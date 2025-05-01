<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <div
      class="content | relative | grid place-items-center | aspect-video max-w-full max-h-full | text-white overflow-hidden">
      <div class="pattern | absolute top-0 left-0 z-[0] | w-full h-full | opacity-40"></div>
      <div class="flex gap-[1cqw] | relative z-[1] | w-3/4 h-4/5 overflow-hidden">
        <div
          class="w-full h-full | flex flex-col items-center gap-[1cqw] | p-[1cqw] | bg-blue-950 | rounded-lg border-black border-[0.2cqw]">
          <div class="mt-auto | flex items-center gap-[0.5cqw]">
            <button
              class="flex flex-col gap-[0.5cqw] | bg-blue-900 rounded-lg"
              @click="emit('next', 'lobby')">
              <span
                class="px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
                돌아가기
              </span>
            </button>
          </div>
        </div>
      </div>
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
  background: linear-gradient(to bottom right, rgb(20 20 20) 0%, #540454 25%, rgb(20 20 20) 100%);

  @media (aspect-ratio >= 16 / 9) {
    width: auto;
    height: 100%;
  }

  @media (aspect-ratio <= 16 / 9) {
    width: 100%;
    height: auto;
  }

  .pattern {
    background: url("/assets/images/pattern.svg");
    background-color: black;
    background-repeat: repeat;
    background-position: center;
    background-size: 0.5cqw;
  }
}
</style>
