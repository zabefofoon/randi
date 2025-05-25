<template>
  <UIDropdown
    :value="stepTutorial === 'weapon'"
    use-arrow
    prevent-hide-outside
    :fit-options-parent="false"
    :position="{
      x: 'LEFT',
    }">
    <template #button>
      <button
        class="flex items-center gap-[0.5cqw] bg-blue-950 | h-fit | pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
        @click="emit('show')">
        <div
          class="stat-sprites | w-[3cqw] aspect-square"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(8),
          }"></div>
        <span
          v-t="'Weapon'"
          class="block text-white | text-[1.8cqw] font-bold text-outline leading-none">
        </span>
      </button>
    </template>
    <template #options>
      <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
        <p
          v-t="'StepTutorial3'"
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
  stepTutorial?: StepTutorial
}>()

const emit = defineEmits<{
  (e: "show" | "step-next"): void
}>()
</script>
