<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-none | !bg-transparent"
    @close="emit('close')">
    <template #content>
      <div class="flex flex-col items-center justify-center | text-white">
        <h2 class="gasoek-one-regular text-outline | text-[8cqw] | whitespace-nowrap">GAME OVER</h2>
        <h3
          class="gasoek-one-regular text-outline | text-[3.5cqw] leading-none | whitespace-nowrap">
          <span v-if="reason === 'boss-alive'">BOSS ALIVE</span>
          <span v-else-if="reason === 'enemy-over'">TOO MANY ZOMBIES</span>
        </h3>
        <button
          class="flex items-center | bg-red-500 | border-black border-[0.25cqw] | mt-[2cqw] px-[2cqw] py-[1cqw] | rounded-full"
          @click="emit('close')">
          <span
            v-t="'GetRewards'"
            class="font-bold leading-none text-outline text-[1.5cqw]"></span>
        </button>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { GameOverReason } from "~/models/UI"

defineProps<{
  reason: GameOverReason
}>()
const emit = defineEmits<{
  (e: "close"): void
}>()
</script>
