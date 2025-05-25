<template>
  <div class="relative bg-black w-[8cqw] aspect-square rounded-[1cqw] | pl-[0.2cqw] pt-[0.2cqw]">
    <div class="bg-green-600 | grid place-items-center | w-full h-full rounded-[inherit]">
      <button
        class="stat-sprites | mb-[0.5cqw] ml-[0.5cqw] | w-[6.5cqw] aspect-square outline-0"
        :style="{
          backgroundPosition: etcUtil.getSpritePosition(21),
        }"
        @click="emit('activate')"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "activate"): void
}>()
</script>
