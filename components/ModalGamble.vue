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
            v-model:coins="coins" />
          <div
            v-else
            class="w-full">
            <div class="flex items-center gap-[0.5cqw] | w-full | mt-[1cqw]">
              <button
                class="flex-1 select-none flex flex-col items-center gap-[0.2cqw] | mt-[1cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg bg-purple-600">
                <div class="flex items-center justify-center gap-[0.5cqw]">
                  <span class="text-outline text-[1.5cqw] font-bold">10원 도박</span>
                </div>
                <div class="text-outline text-[1.1cqw] text-left">-50원 ~ 50원</div>
              </button>
              <button
                class="flex-1 select-none flex flex-col items-center gap-[0.2cqw] | mt-[1cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg bg-yellow-400">
                <div class="flex items-center justify-center gap-[0.5cqw]">
                  <span class="text-outline text-[1.5cqw] font-bold">100원 도박</span>
                </div>
                <div class="text-outline text-[1.1cqw] text-left">-500원 ~ 500원</div>
              </button>
              <button
                class="flex-1 select-none flex flex-col items-center gap-[0.2cqw] | mt-[1cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg bg-orange-700">
                <div class="flex items-center justify-center gap-[0.5cqw]">
                  <span class="text-outline text-[1.5cqw] font-bold">1000원 도박</span>
                </div>
                <div class="text-outline text-[1.1cqw] text-left">-5000원 ~ 5000원</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Materials } from "~/models/Material"
import type { Weapons } from "~/models/Weapon"

defineProps<{
  weapons: Weapons
  materials: Materials
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const selectedIndex = defineModel<number>("selectedIndex", { default: 0 })
const coins = defineModel<number>("coins", { default: 0 })

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
