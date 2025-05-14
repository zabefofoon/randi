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
        <div class="flex flex-col gap-[0.5cqw] | mt-[1cqw]">
          <button
            v-for="next in weaponInstance?.nexts"
            :key="next.cls.meta.name"
            class="flex items-center gap-[0.5cqw]"
            @click="gameStore.checkHasCollection(next.cls.meta.name) && emit('select', next.cls)">
            <div
              class="rounded-lg"
              :class="{
                'bg-white': next.cls.meta?.level === 1,
                'bg-blue-600': next.cls.meta?.level === 2,
                'bg-purple-700': next.cls.meta?.level === 3,
                'bg-yellow-600': next.cls.meta?.level === 4,
                'bg-fuchsia-500': next.cls.meta?.level === 5,
                'bg-red-500': next.cls.meta?.level === 6,
                '!bg-gray-700': !gameStore.checkHasCollection(next.cls.meta.name),
              }">
              <div
                v-if="gameStore.checkHasCollection(next.cls.meta.name)"
                class="weapon-sprites | w-[5.5cqw] aspect-square | rounded-lg border-black border-[0.2cqw]"
                :style="{ 'background-position': next.cls.meta.spritePosition }"></div>
              <div
                v-else
                class="w-[5.5cqw] aspect-square | rounded-lg border-black border-[0.2cqw] | flex items-center justify-center">
                <span class="gasoek-one-regular font-bold text-[2cqw]">?</span>
              </div>
            </div>
            <div class="text-outline text-bold">
              <div
                v-if="gameStore.checkHasCollection(next.cls.meta.name)"
                class="flex flex-col gap-[0.2cqw] items-start">
                <span class="text-[1.6cqw]">
                  Lv.{{ next.cls.meta.level }} {{ next.cls.meta.name }}
                </span>
                <span class="text-[1.3cqw]">{{ next.cls.meta.description }}</span>
              </div>
              <span v-else> ???? </span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Gun } from "~/models/Gun"
import type { Weapon } from "~/models/Weapon"

const props = defineProps<{
  weapon: typeof Weapon
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "select", weapon: typeof Weapon): void
}>()

const gameStore = useGameStore()

const weaponInstance = ref<Gun>()
onMounted(() => {
  const weapon = props.weapon as typeof Gun
  weaponInstance.value = new weapon()
})
</script>
