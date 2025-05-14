<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[56cqw] | !bg-transparent"
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
                'text-center': !selectedWeapon,
                'text-white': !selectedWeapon || selectedWeapon?.level === 1,
                'text-blue-500': selectedWeapon?.level === 2,
                'text-purple-600': selectedWeapon?.level === 3,
                'text-yellow-400': selectedWeapon?.level === 4,
                'text-fuchsia-400': selectedWeapon?.level === 5,
                'text-red-400': selectedWeapon?.level === 6,
              }">
              <template v-if="selectedWeapon?.name">
                Lv.{{ selectedWeapon.level }} {{ selectedWeapon.name }}
              </template>
              <template v-else>????</template>
            </h2>
            <h3
              class="text-outline text-[1.5cqw] font-bold"
              :class="{ 'text-center': !selectedWeapon }">
              {{ selectedWeapon?.description ?? "????" }}
            </h3>
            <WeaponCharacteristic
              v-if="selectedWeapon"
              :weapon="selectedWeapon" />
            <div class="flex flex-col | w-full | mt-[1cqw]">
              <button
                v-for="item in selectedWeapon?.nexts"
                :key="item.cls.meta?.name"
                class="select-none flex items-center gap-[1cqw] | mt-[1cqw] | px-[1cqw] py-[0.2cqw] | border-black border-[0.2cqw] rounded-lg disabled:bg-gray-700 overflow-hidden"
                :class="{
                  'bg-white': item.cls.meta?.level === 1,
                  'bg-blue-500': item.cls.meta?.level === 2,
                  'bg-purple-600': item.cls.meta?.level === 3,
                  'bg-yellow-500': item.cls.meta?.level === 4,
                  'bg-fuchsia-400': item.cls.meta?.level === 5,
                  'bg-red-400': item.cls.meta?.level === 6,
                }"
                :disabled="!checkGettable(item)"
                @click="getNextWeapon(item)">
                <div
                  class="rounded-lg"
                  :class="{
                    'bg-white': item.cls.meta?.level === 1,
                    'bg-blue-600': item.cls.meta?.level === 2,
                    'bg-purple-700': item.cls.meta?.level === 3,
                    'bg-yellow-600': item.cls.meta?.level === 4,
                    'bg-fuchsia-500': item.cls.meta?.level === 5,
                    'bg-red-500': item.cls.meta?.level === 6,
                    '!bg-gray-700': !checkGettable(item),
                  }">
                  <div
                    v-if="gameStore.checkHasCollection(item.cls.meta.name)"
                    class="weapon-sprites | w-[3.5cqw] aspect-square | rounded-lg border-black border-[0.2cqw]"
                    :style="{ 'background-position': item.cls.meta.spritePosition }"></div>
                  <div
                    v-else
                    class="w-[3.5cqw] aspect-square | rounded-lg border-black border-[0.2cqw] | flex items-center justify-center">
                    <span class="gasoek-one-regular font-bold text-[2cqw]">?</span>
                  </div>
                </div>

                <div class="flex flex-col gap-[0.2cqw]">
                  <div class="flex items-center">
                    <span class="text-outline text-[1.5cqw] font-bold">
                      Lv.{{ item.cls.meta.level }} {{ item.cls.meta?.name }} 조합
                    </span>
                  </div>
                  <div class="flex | text-outline text-[1.3cqw] text-left font-bold">
                    <div
                      v-for="(material, index) in item.materials"
                      :key="material.key"
                      class="flex | whitespace-nowrap">
                      <span v-if="index !== 0">&nbsp;+&nbsp;</span>
                      <span
                        :class="{
                          'text-red-500': materials[material.key].length < material.length,
                        }">
                        {{ material.key }} {{ material.length }}개
                      </span>
                    </div>
                    <div
                      :class="{
                        'text-red-500': !checkHasLevel(item),
                      }">
                      {{ getNeedLevel(item) }}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <button
            v-if="!selectedWeapon"
            class="mt-[1cqw] | flex flex-col items-center gap-[0.5cqw]"
            :disabled="!isWeaponGettable"
            @click="gachaWeapon">
            <span
              class="block | py-[0.5cqw] px-[2cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline"
              :class="{
                'bg-orange-700': isWeaponGettable,
                'bg-gray-700': !isWeaponGettable,
              }">
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
import type { Gun } from "~/models/Gun"
import { ButterKnife } from "~/models/Knife"
import type { Materials } from "~/models/Material"
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
const isAllWeaponEffect = defineModel<boolean>("isAllWeaponEffect", { default: false })

const nuxt = useNuxtApp()

const gameStore = useGameStore()

let minLevel = 0

const needLength = computed(() => selectedIndex.value * 4)
const selectedWeapon = computed(() => {
  return props.weapons.weapons[selectedIndex.value]
})

const gachaWeapon = () => {
  if (!isWeaponGettable.value) return
  if (selectedIndex.value === 1) {
    props.weapons.addWeapon(selectedIndex.value, ButterKnife.of())
    gameStore.addCollection(ButterKnife.meta.name)
  }
  if (selectedIndex.value === 2) {
    props.weapons.addWeapon(selectedIndex.value, Book.of())
    gameStore.addCollection(Book.meta.name)
  }
  if (selectedIndex.value === 3) {
    props.weapons.addWeapon(selectedIndex.value, Ring.of())
    gameStore.addCollection(Ring.meta.name)
  }

  let doneCount = 0
  while (doneCount < needLength.value) {
    const randomIndex = Phaser.Math.Between(0, 7)
    const selectedMaterialKey = Object.keys(props.materials)[
      randomIndex
    ] as keyof ClassToRaw<Materials>

    if (props.materials[selectedMaterialKey].length > 0) {
      props.materials.decrease(selectedMaterialKey, 1)
      doneCount++
    }
  }

  loadAllAttack()

  nuxt.$sound.play("equip")
}

const getNextWeapon = (item: NextInfo) => {
  if (!checkGettable(item)) return
  item.materials.forEach((material) => {
    props.materials.decrease(material.key, material.length)
  })
  const cls = item.cls as typeof Gun
  props.weapons.addWeapon(selectedIndex.value, new cls().setIndex(selectedIndex.value))
  gameStore.addCollection(cls.meta.name)

  loadAllAttack()

  nuxt.$sound.play("equip")
}

const isWeaponGettable = computed(() => {
  const totalLength = Object.values(props.materials)
    .map(({ length }) => length)
    .reduce((acc, current) => acc + current, 0)

  return totalLength >= needLength.value
})

const checkGettable = (item: NextInfo) => {
  return checkHasMaterial(item) && checkHasLevel(item)
}
const checkHasMaterial = (item: NextInfo) => {
  return item.materials.every((material) => props.materials[material.key].length >= material.length)
}

const checkHasLevel = (item: NextInfo) => {
  switch (item.cls.meta.level) {
    case 4:
      return props.weapons.getHowManyLevels(3) >= 2
    case 5:
      return props.weapons.getHowManyLevels(4) >= 3
    case 6:
      return props.weapons.getHowManyLevels(5) >= 4
    default:
      return true
  }
}

const getNeedLevel = (item: NextInfo) => {
  switch (item.cls.meta.level) {
    case 4:
      return ` + Lv.3 무기 2개`
    case 5:
      return ` + Lv.4 무기 3개`
    case 6:
      return ` + Lv.5 무기 4개`
  }
}

const loadAllAttack = () => {
  isAllWeaponEffect.value = props.weapons.minLevel > minLevel
}

onMounted(() => {
  minLevel = props.weapons.minLevel
})

watch(selectedIndex, () => nuxt.$sound.play("select"))
</script>
