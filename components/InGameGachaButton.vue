<template>
  <UIDropdown
    :value="stepTutorial === 'gacha'"
    use-arrow
    prevent-hide-outside
    :fit-options-parent="false"
    :position="{
      x: 'LEFT',
    }">
    <template #button>
      <button
        class="flex items-center gap-[0.5cqw] bg-orange-700 | h-fit | pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
        @click="
          gameStore.isShowStepTutorial ? stepTutorial === 'gacha' && emit('show') : emit('show')
        ">
        <div
          class="stat-sprites | w-[3cqw] aspect-square"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(10),
          }"></div>
        <span
          v-t="'Gamble'"
          class="block text-white | text-[1.8cqw] font-bold text-outline leading-none">
        </span>
      </button>
    </template>
    <template #options>
      <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
        <p
          v-t="'StepTutorial2'"
          class="text-[1.5cqw] whitespace-nowrap text-right font-bold"></p>
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
  (e: "show"): void
}>()

const gameStore = useGameStore()
</script>
