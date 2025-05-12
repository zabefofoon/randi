<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[40cqw] | !bg-blue-950 | text-white font-bold | border-black border-[0.2cqw]"
    @close="emit('close')">
    <template #content>
      <div class="p-[1cqw] | flex flex-col gap-[1cqw]">
        <figure
          v-if="weapon"
          class="flex gap-[1cqw] items-center">
          <div
            class="rounded-lg"
            :class="{
              'bg-white': weapon.meta.level === 1,
              'bg-blue-500': weapon.meta.level === 2,
              'bg-purple-600': weapon.meta.level === 3,
              'bg-yellow-400': weapon.meta.level === 4,
              'bg-fuchsia-400': weapon.meta.level === 5,
              'bg-red-400': weapon.meta.level === 6,
            }">
            <div
              class="weapon-sprites border-black border-[0.2cqw] | w-[8cqw] aspect-square | rounded-lg | grid place-content-center"
              :style="{ 'background-position': weapon.meta.spritePosition }"></div>
          </div>

          <div class="flex flex-col gap-[0.5cqw]">
            <p class="text-outline text-[1.8cqw] font-bold">
              Lv.{{ weapon.meta.level }} {{ weapon.meta.name }}
            </p>
            <p class="text-outline text-[1.5cqw] font-bold">
              {{ weapon.meta.description }}
            </p>
          </div>
        </figure>
        <WeaponCharacteristic :weapon="weapon.meta" />
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Weapon } from "~/models/Weapon"

defineProps<{
  weapon: typeof Weapon
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()
</script>
