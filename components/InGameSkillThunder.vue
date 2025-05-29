<template>
  <UIDropdown
    :value="stepTutorial === 'skill'"
    use-arrow
    prevent-hide-outside
    :fit-options-parent="false"
    :position="{
      x: 'LEFT',
    }">
    <template #button>
      <div class="relative bg-black w-[6cqw] aspect-square rounded-[1cqw] | p-[0.25cqw]">
        <i
          v-if="!has"
          class="icon icon-lock | absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | text-white | text-[1.6cqw]"></i>
        <span
          v-else-if="cooltime < THUNDER_COOLTIME"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | text-white | text-[1.6cqw]">
          {{ THUNDER_COOLTIME - cooltime }}
        </span>
        <div
          class="grid place-items-center | w-full h-full rounded-[inherit]"
          :style="{
            'clip-path':
              stepTutorial === 'skill'
                ? 'none'
                : `inset(0 0 ${100 - (cooltime / THUNDER_COOLTIME) * 100}%  0)`,
          }"
          :class="{
            'bg-gray-700': cooltime < THUNDER_COOLTIME,
            'bg-blue-600': cooltime >= THUNDER_COOLTIME,
          }">
          <button
            class="stat-sprites | w-full aspect-square outline-0 | rounded-[inherit]"
            :style="{
              backgroundPosition: etcUtil.getSpritePosition(20),
              filter: `grayscale(${cooltime < THUNDER_COOLTIME ? 1 : 0})`,
            }"
            :disabled="cooltime < THUNDER_COOLTIME"
            @click="emit('activate')"></button>
        </div>
      </div>
    </template>
    <template #options>
      <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
        <p
          v-t="'StepTutorial5'"
          class="text-[1.5cqw] whitespace-nowrap text-right font-bold"></p>
        <button
          v-t="'Next'"
          class="relative z-[1] | rounded-lg bg-orange-600 border-[0.2cqw] border-black | px-[1cqw] | text-outline whitespace-nowrap text-white text-[1.2cqw] font-bold"
          @click="emit('step-next')"></button>
      </div>
    </template>
  </UIDropdown>
</template>

<script setup lang="ts">
import { THUNDER_COOLTIME } from "~/const"
import type { StepTutorial } from "~/models/UI"

defineProps<{
  has: boolean
  cooltime: number
  stepTutorial?: StepTutorial
}>()

const emit = defineEmits<{
  (e: "activate" | "step-next"): void
}>()
</script>
