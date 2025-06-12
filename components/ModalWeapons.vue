<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[60cqw] | !bg-transparent"
    content-wrap-class="!overflow-visible"
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
                class="box-content | relative | border-[0.2cqw] | w-[5cqw] aspect-square | rounded-lg | grid place-content-center"
                :class="{
                  'weapon-sprites': weapon,
                  'border-orange-500': selectedIndex === index,
                  'border-black': selectedIndex !== index,
                }"
                :style="{ 'background-position': weapon?.spritePosition }">
                <span
                  v-if="!weapon"
                  class="font-bold text-[3cqw]">
                  ?
                </span>
                <div
                  v-if="weapon?.enforce"
                  class="absolute top-[0] right-[0] translate-x-1/2 -translate-y-1/2 z-[1] | flex items-center justify-center | bg-amber-500 | rounded-full border-[0.2cqw] border-black | w-[2.3cqw] aspect-square">
                  <span class="text-[1.1cqw] text-white font-bold text-outline">
                    {{ weapon.enforce }}
                  </span>
                </div>
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
              <span
                v-if="weapon?.name"
                v-t="weapon.name"></span>
              <span v-else>????</span>
            </figcaption>
          </figure>
        </div>
        <div
          class="w-full | flex flex-col items-center justify-center | p-[1cqw] | bg-blue-950 | text-white | rounded-lg border-black border-[0.2cqw]">
          <div class="min-w-[66%]">
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
                Lv.{{ selectedWeapon.level }} <span v-t="selectedWeapon.name"></span>
                <span
                  v-if="selectedWeapon.enforce"
                  class="text-amber-500 text-[1.5cqw]">
                  &nbsp;(+ {{ selectedWeapon.enforce }})
                </span>
              </template>
              <template v-else>????</template>
            </h2>
            <h3
              class="text-outline text-[1.5cqw] font-bold"
              :class="{ 'text-center': !selectedWeapon }">
              <span
                v-if="selectedWeapon?.description"
                v-t="selectedWeapon?.description"></span>
              <span v-else>????</span>
            </h3>
            <WeaponCharacteristic
              v-if="selectedWeapon"
              :weapon="selectedWeapon" />
            <div class="flex flex-col | w-full | mt-[1cqw]">
              <template
                v-for="(item, nextIndex) in selectedWeapon?.nexts"
                :key="item.cls.meta?.name">
                <UIDropdown
                  :value="nextIndex === 0 && stepTutorial === 'weapon-select'"
                  use-arrow
                  prevent-hide-outside
                  :fit-options-parent="false"
                  :position="{
                    y: 'TOP',
                  }">
                  <template #button>
                    <button
                      class="w-full | select-none flex items-center gap-[1cqw] | mt-[1cqw] | px-[1cqw] py-[0.2cqw] | border-black border-[0.2cqw] rounded-lg disabled:bg-gray-700 overflow-hidden"
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
                          class="weapon-sprites | w-[4cqw] aspect-square | rounded-lg border-black border-[0.2cqw]"
                          :style="{ 'background-position': item.cls.meta.spritePosition }"></div>
                        <div
                          v-else
                          class="w-[4cqw] aspect-square | rounded-lg border-black border-[0.2cqw] | flex items-center justify-center">
                          <span class="gasoek-one-regular font-bold text-[2cqw]">?</span>
                        </div>
                      </div>

                      <div class="flex flex-col gap-[0.2cqw]">
                        <div class="flex items-center gap-[0.5cqw]">
                          <span class="text-outline text-[1.5cqw] font-bold">
                            Lv.{{ item.cls.meta.level }} <span v-t="item.cls.meta?.name"></span>
                          </span>
                          <span
                            v-if="getNeedLevel(item)"
                            class="text-[1.2cqw] | font-bold text-outline"
                            :class="{
                              'text-red-500': !checkHasLevel(item),
                            }">
                            ({{ getNeedLevel(item) }})
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
                              {{
                                i18n.t("NeedMaterialUnit", {
                                  key: i18n.t(material.key),
                                  length: material.length,
                                })
                              }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </template>
                  <template #options>
                    <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
                      <p
                        v-t="'StepTutorial9'"
                        class="text-[1.5cqw] whitespace-nowrap text-right font-bold text-black"></p>
                      <button
                        v-t="'Next'"
                        class="relative z-[1] | rounded-lg bg-orange-600 border-[0.2cqw] border-black | px-[1cqw] | text-outline whitespace-nowrap text-white text-[1.2cqw] font-bold"
                        @click="stepTutorial = 'gacha'"></button>
                    </div>
                  </template>
                </UIDropdown>
              </template>
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
              {{ i18n.t("MaterialGatcha") }}
            </span>
            <span class="text-outline text-[1.2cqw] font-bold">
              {{ i18n.t("NeedMaterials", { length: needLength }) }}
            </span>
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
import type { StepTutorial } from "~/models/UI"
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
const stepTutorial = defineModel<StepTutorial>("stepTutorial")

const i18n = useI18n()
const { gtag } = useGtag()

const gameStore = useGameStore()
const soundStore = useSoundStore()

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

  soundStore.play("equip")
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

  soundStore.play("equip")

  gtag("event", "무기선택", { weapon: cls.meta.name })
}

const isWeaponGettable = computed(() => {
  return props.materials.totalLength >= needLength.value
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
      return i18n.t("NeedWeapons", { level: 3, length: 2 })
    case 5:
      return i18n.t("NeedWeapons", { level: 4, length: 3 })
    case 6:
      return i18n.t("NeedWeapons", { level: 5, length: 4 })
  }
}

const loadAllAttack = () => {
  isAllWeaponEffect.value = props.weapons.minLevel > minLevel
}

onMounted(() => {
  minLevel = props.weapons.minLevel
  if (stepTutorial.value === "weapon") stepTutorial.value = "weapon-select"
})

watch(selectedIndex, () => soundStore.play("select"))
</script>
