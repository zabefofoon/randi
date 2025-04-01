<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[50cqw] | !bg-[rgba(0_0_0_/_50%)]"
    @close="emit('close')">
    <template #content>
      <div class="flex flex-col items-center justify-center | text-white">
        <div class="grid grid-cols-4 | gap-[1cqw]">
          <figure
            v-for="(weapon, index) in weapons.weapons"
            :key="index"
            class="flex flex-col items-center | py-[1cqw]"
            @click="selectedIndex = index">
            <img
              src="https://picsum.photos/32?id=1"
              class="border border-transparent"
              :class="[{ '!border-orange-500': selectedIndex === index }]" />
            <figcaption>
              {{ weapon?.name ?? "????" }}
            </figcaption>
          </figure>
        </div>
        <div
          v-if="selectedWeapon"
          class="mt-[1cqw]">
          <h3>
            {{ selectedWeapon.description }}
          </h3>
          <div>
            <div v-if="selectedWeapon.damage">- 데미지: {{ selectedWeapon.damage }}</div>
            <div v-if="selectedWeapon.range">- 공격거리: {{ selectedWeapon.range }}</div>
            <div v-if="selectedWeapon.splash">- 스플래쉬: {{ selectedWeapon.splash }}</div>
            <div v-if="selectedWeapon.cooltime">- 쿨타임: {{ selectedWeapon.cooltime }}</div>
            <div v-if="selectedWeapon.targetLength">
              - 공격갯수: {{ selectedWeapon.targetLength }}
            </div>
            <div v-if="selectedWeapon.stun">- 스턴: {{ selectedWeapon.stun }}</div>
            <div v-if="selectedWeapon.slow">- 슬로우: {{ selectedWeapon.slow }}</div>
          </div>
          <div class="flex flex-col | w-full | mt-[1cqw]">
            <button
              v-for="item in selectedWeapon.nexts"
              :key="item.name"
              class="mt-[1cqw]">
              <div>
                {{ item.name }}
                <span>조합</span>
              </div>
              <div class="flex justify-center">
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
        <div v-else>
          <button
            class="flex flex-col"
            @click="gachaWeapon">
            <span>뽑기</span>
            <span>(랜덤 {{ selectedIndex * 4 }}개 필요)</span>
          </button>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Material, Materials } from "~/models/Material"
import { Knife, Ring, Wand, type Weapons } from "~/models/Weapon"

const props = defineProps<{
  weapons: Weapons
  materials: Materials
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const selectedIndex = ref(0)

const selectedWeapon = computed(() => {
  return props.weapons.weapons[selectedIndex.value]
})

const gachaWeapon = () => {
  const needLength = selectedIndex.value * 4
  const totalLength = Object.values(props.materials)
    .map(({ length }) => length)
    .reduce((acc, current) => acc + current, 0)

  if (totalLength >= needLength) {
    if (selectedIndex.value === 1) props.weapons.addWeapon(selectedIndex.value, Knife.of())
    if (selectedIndex.value === 2) props.weapons.addWeapon(selectedIndex.value, Wand.of())
    if (selectedIndex.value === 3) props.weapons.addWeapon(selectedIndex.value, Ring.of())

    let doneCount = 0
    while (doneCount < needLength) {
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
</script>
