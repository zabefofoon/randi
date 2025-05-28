<template>
  <div class="relative bg-black w-[5cqw] aspect-square rounded-[1cqw] | p-[0.25cqw]">
    <i
      v-if="!has"
      class="icon icon-lock | absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | text-white | text-[1.6cqw]"></i>
    <span
      v-else-if="cooltime < THUNDER_COOLTIME"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | text-white | text-[1.6cqw]">
      {{ THUNDER_COOLTIME - cooltime }}
    </span>
    <div
      class="bg-red-400 | grid place-items-center | w-full h-full rounded-[inherit]"
      :style="{
        'clip-path': `inset(0 0 ${100 - (cooltime / THUNDER_COOLTIME) * 100}%  0)`,
      }"
      :class="{
        'bg-gray-700': cooltime < THUNDER_COOLTIME,
        'bg-blue-600': cooltime >= THUNDER_COOLTIME,
      }">
      <button
        class="stat-sprites | w-full aspect-square outline-0 | rounded-[inherit]"
        :style="{
          backgroundPosition: etcUtil.getSpritePosition(23),
          filter: `grayscale(${cooltime < THUNDER_COOLTIME ? 1 : 0})`,
        }"
        @click="emit('activate')"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { THUNDER_COOLTIME } from "~/const"

defineProps<{
  has: boolean
  cooltime: number
}>()

const emit = defineEmits<{
  (e: "activate"): void
}>()
</script>
