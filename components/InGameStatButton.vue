<template>
  <UIDropdown
    :value="stepTutorial === 'stat'"
    use-arrow
    prevent-hide-outside
    :fit-options-parent="false"
    :position="{
      x: 'LEFT',
    }">
    <template #button>
      <button
        class="flex items-center gap-[0.5cqw] | relative | h-fit | pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
        :class="{
          'bg-amber-500': selectChance > 0,
          'bg-blue-950': selectChance <= 0,
        }"
        @click="emit('show')">
        <div
          class="stat-sprites | w-[3cqw] aspect-square"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(9),
          }"></div>
        <span
          v-t="'Stat'"
          class="block | text-white text-[1.8cqw] font-bold text-outline leading-none">
        </span>
        <div
          v-if="gachaChance + selectChance > 0"
          class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
          <span
            class="text-white | grid place-items-center | w-[2.2cqw] aspect-square | rounded-full | bg-red-500 | text-outline text-[1.2cqw] font-bold | border-black border-[0.14cqw]">
            {{ selectChance + gachaChance }}
          </span>
        </div>
      </button>
    </template>
    <template #options>
      <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
        <p
          v-t="'StepTutorial4'"
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
import type { StepTutorial } from "~/models/UI"

defineProps<{
  selectChance: number
  gachaChance: number
  stepTutorial?: StepTutorial
}>()

const emit = defineEmits<{
  (e: "show" | "step-next"): void
}>()
</script>
