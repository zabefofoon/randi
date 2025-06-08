<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[62cqw] | !bg-transparent"
    @close="emit('close')">
    <template #content>
      <div class="flex items-center gap-[1cqw]">
        <div class="flex flex-col gap-[1cqw] | flex-shrink-0">
          <template
            v-for="(menu, index) in menus"
            :key="menu.name">
            <UIDropdown
              class="w-full"
              :value="
                (index === 1 && stepTutorial === 'gacha-enforces') ||
                (index === 2 && stepTutorial === 'gacha-stat')
              "
              use-arrow
              prevent-hide-outside
              :fit-options-parent="false"
              :position="{
                x: 'RIGHT',
                y: 'TOP',
              }">
              <template #button>
                <figure
                  class="flex flex-col items-center"
                  @click="selectedIndex = index">
                  <div
                    class="stat-sprites | border-[0.2cqw] | w-[5cqw] aspect-square | rounded-lg"
                    :class="[
                      {
                        'border-orange-500': selectedIndex === index,
                        'border-black': selectedIndex !== index,
                      },
                    ]"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(menu.spriteIndex),
                    }"></div>
                  <figcaption
                    v-t="menu.name"
                    class="text-outline text-[1.5cqw] font-bold text-white"></figcaption>
                </figure>
              </template>
              <template #options>
                <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
                  <p
                    v-t="index === 1 ? 'StepTutorial10' : 'StepTutorial12'"
                    class="text-[1.5cqw] whitespace-nowrap text-right font-bold text-black"></p>
                </div>
              </template>
            </UIDropdown>
          </template>
        </div>
        <div
          class="w-full | flex flex-col items-center justify-center | p-[1cqw] | bg-blue-950 | text-white | rounded-lg border-black border-[0.2cqw]">
          <ModalGambleMoneyPannel
            v-if="selectedIndex === 0"
            v-model:coins="coins"
            v-model:gamblings="gamblings"
            v-model:step-tutorial="stepTutorial" />
          <ModalGambleEnforcePannel
            v-else-if="selectedIndex === 1"
            v-model:coins="coins"
            v-model:gamblings="gamblings"
            v-model:step-tutorial="stepTutorial"
            :enforces="enforces" />
          <ModalGambleStatPannel
            v-else
            v-model:coins="coins"
            v-model:gamblings="gamblings"
            v-model:step-tutorial="stepTutorial"
            :materials="materials"
            @close="emit('close')" />
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Enforces } from "~/models/Enforces"
import type { Materials } from "~/models/Material"
import type { StepTutorial } from "~/models/UI"
import type { Weapons } from "~/models/Weapon"

defineProps<{
  weapons: Weapons
  materials: Materials
  enforces: Enforces
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const selectedIndex = defineModel<number>("selectedIndex", { default: 0 })
const coins = defineModel<number>("coins", { default: 0 })
const gamblings = defineModel<number>("gamblings", { default: 0 })
const stepTutorial = defineModel<StepTutorial>("stepTutorial")

const soundStore = useSoundStore()

const menus = [
  {
    name: "Coin",
    spriteIndex: 11,
  },
  {
    name: "Enforce",
    spriteIndex: 8,
  },
  {
    name: "Stat",
    spriteIndex: 9,
  },
]

onMounted(() => {
  if (stepTutorial.value === "gacha") stepTutorial.value = "gacha-coin"
})

watch(selectedIndex, () => soundStore.play("select"))
</script>
