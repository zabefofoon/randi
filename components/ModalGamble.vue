<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[50cqw] | !bg-transparent"
    @close="emit('close')">
    <template #content>
      <div class="flex items-center gap-[1cqw]">
        <div class="flex flex-col gap-[1cqw] | flex-shrink-0">
          <figure
            v-for="(menu, index) in menus"
            :key="menu.name"
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
            <figcaption class="text-outline text-[1.5cqw] font-bold text-white">
              {{ menu.name }}
            </figcaption>
          </figure>
        </div>
        <div
          class="w-full | flex flex-col items-center justify-center | p-[1cqw] | bg-blue-950 | text-white | rounded-lg border-black border-[0.2cqw]">
          <ModalGambleMoneyPannel
            v-if="selectedIndex === 0"
            v-model:coins="coins"
            v-model:gamblings="gamblings" />
          <ModalGambleEnforcePannel
            v-else-if="selectedIndex === 1"
            v-model:coins="coins"
            v-model:gamblings="gamblings"
            :enforces="enforces" />
          <ModalGambleStatPannel
            v-else
            v-model:coins="coins"
            v-model:gamblings="gamblings"
            :materials="materials" />
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Enforces } from "~/models/Enforces"
import type { Materials } from "~/models/Material"
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

const menus = [
  {
    name: "돈",
    spriteIndex: 11,
  },
  {
    name: "강화",
    spriteIndex: 8,
  },
  {
    name: "스텟",
    spriteIndex: 9,
  },
]
</script>
