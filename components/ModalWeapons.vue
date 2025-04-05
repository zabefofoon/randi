<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[50cqw] | !bg-[rgba(0_0_0_/_50%)]"
    @close="emit('close')">
    <template #content>
      <div class="flex flex-col items-center justify-center | text-white">
        <div class="grid grid-cols-4 gap-[1cqw]">
          <figure
            v-for="(weapon, index) in weapons.weapons"
            :key="index"
            class="flex flex-col items-center | py-[1cqw]"
            @click="selectedIndex = index">
            <img
              src="https://picsum.photos/32?id=1"
              class="border border-transparent | w-[5cqw] aspect-square"
              :class="[{ '!border-orange-500': selectedIndex === index }]" />
            <figcaption class="text-[1.5cqw]">
              {{ weapon?.name ?? "????" }}
            </figcaption>
          </figure>
        </div>
        <div
          v-if="selectedWeapon"
          class="mt-[1cqw]">
          <h3 class="text-center text-[1.5cqw]">
            {{ selectedWeapon.description }}
          </h3>
          <div class="mt-[0.5cqw] | grid grid-cols-4 gap-[1cqw] text-[1.5cqw]">
            <div
              v-if="selectedWeapon.physicalDamage"
              class="text-center">
              - 물리데미지: {{ selectedWeapon.physicalDamage }}
            </div>
            <div
              v-if="selectedWeapon.magicalDamage"
              class="text-center">
              - 마법데미지: {{ selectedWeapon.magicalDamage }}
            </div>
            <div
              v-if="selectedWeapon.physicalPenetration"
              class="text-center">
              - 물리관통력: {{ selectedWeapon.physicalPenetration }}
            </div>
            <div
              v-if="selectedWeapon.magicalPenetration"
              class="text-center">
              - 마법관통력: {{ selectedWeapon.magicalPenetration }}
            </div>
            <div
              v-if="selectedWeapon.range"
              class="text-center">
              - 공격거리: {{ selectedWeapon.range }}
            </div>
            <div
              v-if="selectedWeapon.splash"
              class="text-center">
              - 스플래쉬: {{ selectedWeapon.splash }}
            </div>
            <div
              v-if="selectedWeapon.cooltime"
              class="text-center">
              - 쿨타임: {{ selectedWeapon.cooltime }}
            </div>
            <div
              v-if="selectedWeapon.targetLength"
              class="text-center">
              - 공격갯수: {{ selectedWeapon.targetLength }}
            </div>
            <div
              v-if="selectedWeapon.stun"
              class="text-center">
              - 스턴: {{ selectedWeapon.stun }}
            </div>
            <div
              v-if="selectedWeapon.slow"
              class="text-center">
              - 슬로우: {{ selectedWeapon.slow }}
            </div>
          </div>
          <div class="flex flex-col | w-full | mt-[1cqw]">
            <button
              v-for="item in selectedWeapon.nexts"
              :key="item.name"
              class="mt-[1cqw] | bg-[rgba(0_0_0_/_50%)] | py-[0.5cqw] | rounded-full"
              @click="getNextWeapon(item)">
              <div class="text-[1.5cqw]">
                {{ item.name }}
                <span>조합</span>
              </div>
              <div class="flex justify-center | text-[1.2cqw]">
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
            </button>
          </div>
        </div>
        <button
          v-else
          class="mt-[1cqw] | flex flex-col gap-[0.5cqw]"
          @click="gachaWeapon">
          <span class="bg-[rgba(0_0_0_/_50%)] | py-[0.5cqw] | rounded-full | text-[1.5cqw]">
            뽑기
          </span>
          <span class="text-[1.2cqw]">(랜덤 {{ needLength }}개 필요)</span>
        </button>
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
  Hammer,
  Knife,
  MagicGun,
  Ring,
  ShotGun,
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

const selectedIndex = ref(0)
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
  console.log(item)
  if (item.name === "일반쌍권총") props.weapons.addWeapon(0, DoubleGun.of())
  if (item.name === "마법권총") props.weapons.addWeapon(0, MagicGun.of())
  if (item.name === "산탄총") props.weapons.addWeapon(0, ShotGun.of())
  if (item.name === "커터칼") props.weapons.addWeapon(1, CutterKnife.of())
  if (item.name === "회칼") props.weapons.addWeapon(1, SushiKnife.of())
  if (item.name === "망치") props.weapons.addWeapon(1, Hammer.of())
  if (item.name === "두꺼운책") props.weapons.addWeapon(2, ThickBook.of())
  if (item.name === "얇은책") props.weapons.addWeapon(2, ThinBook.of())
  if (item.name === "스프링책") props.weapons.addWeapon(2, SpringBook.of())
}
</script>
