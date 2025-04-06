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
            <img
              src="https://picsum.photos/32?id=1"
              class="border-[0.2cqw] | w-[5cqw] aspect-square | rounded-lg"
              :class="{
                'border-orange-500': selectedIndex === index,
                'border-black': selectedIndex !== index,
              }" />
            <figcaption
              class="text-outline text-[1.5cqw] font-bold"
              :class="{
                'text-white': !weapon || weapon?.level === 1,
                'text-purple-600': weapon?.level === 2,
                'text-yellow-400': weapon?.level === 3,
                'text-fuchsia-400': weapon?.level === 4,
                'text-red-400': weapon?.level === 5,
                'text-blue-500': weapon?.level === 6,
              }">
              {{ weapon?.name ?? "????" }}
            </figcaption>
          </figure>
        </div>
        <div
          class="w-full | flex flex-col items-center justify-center | p-[1cqw] | bg-blue-950 | text-white | rounded-lg border-black border-[0.2cqw]">
          <div>
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
                :key="item.name"
                class="select-none flex flex-col gap-[0.2cqw] | mt-[1cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg"
                :class="{
                  'bg-white': item.level === 1,
                  'bg-purple-600': item.level === 2,
                  'bg-yellow-500': item.level === 3,
                  'bg-fuchsia-400': item.level === 4,
                  'bg-red-400': item.level === 5,
                  'bg-blue-500': item.level === 6,
                }"
                @click="getNextWeapon(item)">
                <div class="flex items-center gap-[0.5cqw]">
                  <span class="text-outline text-[1.5cqw] font-bold">· {{ item.name }} 조합</span>
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
                <div class="text-[1.1cqw] text-left">{{ item.description }}</div>
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
import type { Material, Materials } from "~/models/Material"
import {
  Book,
  CutterKnife,
  DoubleGun,
  DoubleRing,
  FlowerRing,
  Hammer,
  Knife,
  MagicGun,
  Ring,
  ShotGun,
  SilverPlateRing,
  SpringBook,
  SushiKnife,
  ThickBook,
  ThinBook,
  type WeaponNext,
  type Weapons,
} from "~/models/Weapon"

const props = defineProps<{
  weapons: Weapons
  materials: Materials
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const selectedIndex = defineModel("selectedIndex", { default: 0 })
const needLength = computed(() => selectedIndex.value * 4)
const selectedWeapon = computed(() => {
  return props.weapons.weapons[selectedIndex.value]
})

const gachaWeapon = () => {
  const totalLength = Object.values(props.materials)
    .map(({ length }) => length)
    .reduce((acc, current) => acc + current, 0)

  if (totalLength >= needLength.value) {
    if (selectedIndex.value === 1) props.weapons.addWeapon(selectedIndex.value, Knife.of())
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

const getNextWeapon = (item: WeaponNext) => {
  const isGettable = item.materials.every(
    (material) => props.materials[material.name].length >= material.length
  )
  if (!isGettable) return
  item.materials.forEach((material) => {
    props.materials[material.name].length -= material.length
  })

  if (item.name === "일반쌍권총") props.weapons.addWeapon(0, DoubleGun.of())
  if (item.name === "마법권총") props.weapons.addWeapon(0, MagicGun.of())
  if (item.name === "산탄총") props.weapons.addWeapon(0, ShotGun.of())
  if (item.name === "커터칼") props.weapons.addWeapon(1, CutterKnife.of())
  if (item.name === "회칼") props.weapons.addWeapon(1, SushiKnife.of())
  if (item.name === "망치") props.weapons.addWeapon(1, Hammer.of())
  if (item.name === "두꺼운책") props.weapons.addWeapon(2, ThickBook.of())
  if (item.name === "얇은책") props.weapons.addWeapon(2, ThinBook.of())
  if (item.name === "스프링책") props.weapons.addWeapon(2, SpringBook.of())
  if (item.name === "더블반지") props.weapons.addWeapon(3, DoubleRing.of())
  if (item.name === "은도금반지") props.weapons.addWeapon(3, SilverPlateRing.of())
  if (item.name === "꽃반지") props.weapons.addWeapon(3, FlowerRing.of())
}
</script>
