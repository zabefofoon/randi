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
            v-for="(weapon, index) in weapons.weapons"
            :key="index"
            class="flex flex-col items-center"
            @click="selectedIndex = index">
            <div
              class="rounded-lg"
              :class="{
                'bg-white': !weapon || weapon?.level === 1,
                'bg-blue-500': weapon?.level === 2,
                'bg-purple-600': weapon?.level === 3,
                'bg-yellow-400': weapon?.level === 4,
                'bg-fuchsia-400': weapon?.level === 5,
                'bg-red-400': weapon?.level === 6,
              }">
              <div
                class="box-content border-[0.2cqw] | w-[5cqw] aspect-square | rounded-lg | grid place-content-center"
                :class="{
                  'weapon-sprites': weapon,
                  'border-orange-500': selectedIndex === index,
                  'border-black': selectedIndex !== index,
                }"
                :style="{ 'background-position': weapon?.spritePosition }">
                <span
                  v-if="!weapon"
                  class="font-bold text-[3cqw]"
                  >?</span
                >
              </div>
            </div>

            <figcaption
              class="text-outline text-[1.5cqw] font-bold"
              :class="{
                'text-white': !weapon || weapon?.level === 1,
                'text-blue-500': weapon?.level === 2,
                'text-purple-600': weapon?.level === 3,
                'text-yellow-400': weapon?.level === 4,
                'text-fuchsia-400': weapon?.level === 5,
                'text-red-400': weapon?.level === 6,
              }">
              {{ weapon?.name ?? "????" }}
            </figcaption>
          </figure>
        </div>
        <div
          class="w-full | flex flex-col items-center justify-center | p-[1cqw] | bg-blue-950 | text-white | rounded-lg border-black border-[0.2cqw]">
          <div>
            <h2
              class="text-outline text-[2cqw] font-bold | mb-[0.5cqw]"
              :class="{
                'text-white': !selectedWeapon || selectedWeapon?.level === 1,
                'text-blue-500': selectedWeapon?.level === 2,
                'text-purple-600': selectedWeapon?.level === 3,
                'text-yellow-400': selectedWeapon?.level === 4,
                'text-fuchsia-400': selectedWeapon?.level === 5,
                'text-red-400': selectedWeapon?.level === 6,
              }">
              {{ selectedWeapon?.name ?? "????" }}
            </h2>
            <h3 class="text-outline text-[1.5cqw] font-bold">
              {{ selectedWeapon?.description ?? "????" }}
            </h3>
            <div
              v-if="selectedWeapon"
              class="mt-[0.5cqw] | grid grid-cols-4 gap-[0.5cqw] text-[1.2cqw]">
              <div v-if="selectedWeapon.physicalDamage">
                · 물리데미지: {{ selectedWeapon.physicalDamage }}
              </div>
              <div v-if="selectedWeapon.magicalDamage">
                · 마법데미지: {{ selectedWeapon.magicalDamage }}
              </div>
              <div v-if="selectedWeapon.physicalPenetration">
                · 물리관통력: {{ selectedWeapon.physicalPenetration }}
              </div>
              <div v-if="selectedWeapon.magicalPenetration">
                · 마법관통력: {{ selectedWeapon.magicalPenetration }}
              </div>
              <div v-if="selectedWeapon.range">· 공격거리: {{ selectedWeapon.range }}</div>
              <div v-if="selectedWeapon.splash">· 스플래쉬: {{ selectedWeapon.splash }}</div>
              <div v-if="selectedWeapon.cooltime">· 쿨타임: {{ selectedWeapon.cooltime }}</div>
              <div v-if="selectedWeapon.targetLength">
                · 공격갯수: {{ selectedWeapon.targetLength }}
              </div>
              <div v-if="selectedWeapon.stun">· 스턴: {{ selectedWeapon.stun }}</div>
              <div v-if="selectedWeapon.slow">· 슬로우: {{ selectedWeapon.slow }}</div>
            </div>
            <div class="flex flex-col | w-full | mt-[1cqw]">
              <button
                v-for="item in selectedWeapon?.nexts"
                :key="item.cls.meta?.name"
                class="select-none flex items-center gap-[1cqw] | mt-[1cqw] | px-[1cqw] py-[0.2cqw] | border-black border-[0.2cqw] rounded-lg"
                :class="{
                  'bg-white': item.cls.meta?.level === 1,
                  'bg-blue-500': item.cls.meta?.level === 2,
                  'bg-purple-600': item.cls.meta?.level === 3,
                  'bg-yellow-500': item.cls.meta?.level === 4,
                  'bg-fuchsia-400': item.cls.meta?.level === 5,
                  'bg-red-400': item.cls.meta?.level === 6,
                }"
                @click="getNextWeapon(item)">
                <div
                  :class="{
                    'bg-white': item.cls.meta?.level === 1,
                    'bg-blue-600': item.cls.meta?.level === 2,
                    'bg-purple-700': item.cls.meta?.level === 3,
                    'bg-yellow-600': item.cls.meta?.level === 4,
                    'bg-fuchsia-500': item.cls.meta?.level === 5,
                    'bg-red-500': item.cls.meta?.level === 6,
                  }">
                  <div
                    class="weapon-sprites | bg-red-500 | w-[3.5cqw] aspect-square | rounded-lg border-black border-[0.2cqw]"
                    :style="{ 'background-position': item.cls.meta.spritePosition }"></div>
                </div>

                <div class="flex flex-col gap-[0.2cqw]">
                  <div class="flex items-center gap-[0.5cqw]">
                    <span class="text-outline text-[1.5cqw] font-bold"
                      >· {{ item.cls.meta?.name }} 조합</span
                    >
                    <div class="flex justify-center | text-[1.1cqw]">
                      (
                      <div
                        v-for="(material, index) in item.materials"
                        :key="material.name"
                        class="flex gap-[0.2cqw]">
                        <span v-if="index !== 0">&nbsp;+</span>
                        <span>{{ material.name }} {{ material.length }}개</span>
                      </div>
                      )
                    </div>
                  </div>
                  <div class="text-[1.1cqw] text-left">{{ item.cls.meta?.description }}</div>
                </div>
              </button>
            </div>
          </div>
          <button
            v-if="!selectedWeapon"
            class="mt-[1cqw] | flex flex-col gap-[0.5cqw]"
            @click="gachaWeapon">
            <span
              class="bg-orange-700 | py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
              뽑기
            </span>
            <span class="text-[1.2cqw]">(랜덤 {{ needLength }}개 필요)</span>
          </button>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import { Book } from "~/models/Book"
import { ButterKnife } from "~/models/Knife"
import type { Material, Materials } from "~/models/Material"
import { Ring } from "~/models/Ring"
import type { NextInfo, Weapons } from "~/models/Weapon"

const props = defineProps<{
  weapons: Weapons
  materials: Materials
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const selectedIndex = defineModel<number>("selectedIndex", { default: 0 })
const needLength = computed(() => selectedIndex.value * 4)
const selectedWeapon = computed(() => {
  return props.weapons.weapons[selectedIndex.value]
})

const gachaWeapon = () => {
  const totalLength = Object.values(props.materials)
    .map(({ length }) => length)
    .reduce((acc, current) => acc + current, 0)

  if (totalLength >= needLength.value) {
    if (selectedIndex.value === 1) props.weapons.addWeapon(selectedIndex.value, ButterKnife.of())
    if (selectedIndex.value === 2) props.weapons.addWeapon(selectedIndex.value, Book.of())
    if (selectedIndex.value === 3) props.weapons.addWeapon(selectedIndex.value, Ring.of())

    let doneCount = 0
    while (doneCount < needLength.value) {
      const randomIndex = Phaser.Math.Between(0, 7)
      const selectedMaterialKey = Object.keys(props.materials)[randomIndex] as Material["name"]

      if (props.materials[selectedMaterialKey].length > 0) {
        props.materials[selectedMaterialKey].length =
          props.materials[selectedMaterialKey].length - 1
        doneCount++
      }
    }
  }
}

const getNextWeapon = (item: NextInfo) => {
  const isGettable = item.materials.every(
    (material) => props.materials[material.name].length >= material.length
  )
  if (!isGettable) return
  item.materials.forEach((material) => {
    props.materials[material.name].length -= material.length
  })
  props.weapons.addWeapon(selectedIndex.value, new item.cls().setIndex(selectedIndex.value))
}
</script>
