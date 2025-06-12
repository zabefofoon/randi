<template>
  <BackgroundPattern>
    <ModalCollectionWeapon
      v-if="isShowWeaponModal"
      :weapon="isShowWeaponModal"
      @close="isShowWeaponModal = undefined"
      @select="selectNextWeapon" />
    <div class="absolute right-[1cqw] top-[1cqw] | flex items-center">
      <div
        class="stat-sprites | w-[2.5cqw] aspect-square"
        :style="{
          backgroundPosition: etcUtil.getSpritePosition(11),
        }"></div>
      <span class="text-outline font-bold text-[1.5cqw] -mt-[0.2cqw]">
        {{ stringUtil.attachComma(gameStore.currentMoney) }}
      </span>
    </div>
    <div class="flex gap-[1cqw] | relative z-[1] | w-3/4 h-4/5 overflow-hidden">
      <div
        class="w-full h-full | flex flex-col items-center gap-[1cqw] | p-[1cqw] | bg-blue-950 | rounded-lg border-black border-[0.2cqw]">
        <div
          class="w-full h-full overflow-auto | grid grid-cols-7 gap-x-[1cqw] gap-y-[1.5cqw] items-start | p-[1cqw]">
          <figure
            v-for="weapon in weapons"
            :key="weapon.meta.name"
            class="flex flex-col items-center justify-center">
            <template v-if="gameStore.checkHasCollection(weapon.meta.name)">
              <div
                class="w-full | border-black border-[0.2cqw] rounded-lg"
                :class="{
                  'bg-white': weapon.meta.level === 1,
                  'bg-blue-500': weapon.meta.level === 2,
                  'bg-purple-600': weapon.meta.level === 3,
                  'bg-yellow-400': weapon.meta.level === 4,
                  'bg-fuchsia-400': weapon.meta.level === 5,
                  'bg-red-400': weapon.meta.level === 6,
                }"
                @click="showWeaponModal(weapon)">
                <div
                  class="weapon-sprites | relative | w-full aspect-square"
                  :style="{ 'background-position': weapon.meta.spritePosition }"
                  @click="showWeaponModal(weapon)">
                  <div
                    v-if="weapon.meta.enforce"
                    class="absolute top-[0] right-[0] translate-x-1/2 -translate-y-1/2 z-[1] | flex items-center justify-center | bg-amber-500 | rounded-full border-[0.2cqw] border-black | w-[2.3cqw] aspect-square">
                    <span class="text-[1.1cqw] font-bold text-outline">
                      {{ weapon.meta.enforce }}
                    </span>
                  </div>
                </div>
              </div>
              <figcaption
                v-t="weapon.meta.name"
                class="text-outline font-bold text-[1.4cqw] text-center"></figcaption>
            </template>
            <template v-else>
              <div
                class="w-full aspect-square | border-black border-[0.2cqw] rounded-lg | flex items-center justify-center">
                <span class="gasoek-one-regular text-outline text-[5cqw] font-bold">?</span>
              </div>
              <figcaption class="text-outline font-bold text-[1.4cqw]">????</figcaption>
            </template>
          </figure>
        </div>
        <div class="mt-auto | flex items-center gap-[0.5cqw]">
          <button
            class="flex flex-col gap-[0.5cqw] | bg-blue-900 rounded-lg"
            @click="emit('next', 'lobby')">
            <span
              v-t="'Back'"
              class="px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.8cqw] font-bold text-outline">
            </span>
          </button>
        </div>
      </div>
    </div>
  </BackgroundPattern>
</template>

<script setup lang="ts">
import {
  AnswerSheet,
  Book,
  Constitution,
  Counterfeit,
  Diary,
  EvacuationMap,
  Grimoire,
  HellMap,
  Labtop,
  LawBook,
  MagicBook,
  Map,
  Menu,
  MobilePhone,
  OrderForm,
  PictureBook,
  Regulations,
  Revelation,
  SpringBook,
  TabletPC,
  TextBook,
  ThickBook,
  ThinBook,
  TreasureMap,
  WorkBook,
} from "~/models/Book"

import {
  AirGun,
  BlessedRevolver,
  Booger,
  BubbleGun,
  Cannon,
  CursedRevolver,
  DoubleGun,
  DrillGun,
  EyeGun,
  FingerGun,
  Firework,
  GrenadeLauncher,
  Gun,
  HeartBreaker,
  MachineGun,
  MagicGun,
  Missile,
  PepperSpray,
  PlasmaGun,
  PulseGun,
  RadiationBeam,
  ShotGun,
  SilentKiller,
  SilverBulletGun,
  TazerGun,
} from "~/models/Gun"

import {
  AX,
  BigAX,
  BlessedSword,
  BornSword,
  ButcherKnife,
  ButterKnife,
  CrossCutSaw,
  CrowBar,
  CursedSword,
  CutterKnife,
  DeathScythe,
  DragonSlayer,
  DualBlade,
  Fist,
  Hammer,
  KitchenKnife,
  KoreanHandPlow,
  LaserSword,
  LongNails,
  Machete,
  Scissors,
  SnotWhip,
  SurgicalKnife,
  SushiKnife,
  SwissArmyKnife,
} from "~/models/Knife"
import {
  BornRing,
  Bugles,
  CandyRing,
  CopperRing,
  CrystalRing,
  DiamondRing,
  DigitalRing,
  FlowerRing,
  FourLeafClover,
  GoldRing,
  JadeRing,
  KnuckleRing,
  LeatherRing,
  ObsidianRing,
  OnionRing,
  OpalRing,
  Ring,
  RubyRing,
  RuneRing,
  SapphireRing,
  SharpieRing,
  SignetRing,
  SilverRing,
  Tattoo,
  VampireRing,
} from "~/models/Ring"
import type { Weapon } from "~/models/Weapon"

const emit = defineEmits<{
  (e: "next", scene: "lobby"): void
}>()
const gameStore = useGameStore()

const weapons = ref<(typeof Weapon)[]>([
  Gun,
  ShotGun,
  DoubleGun,
  MagicGun,
  AirGun,
  MachineGun,
  FingerGun,
  BubbleGun,
  TazerGun,
  PulseGun,
  Firework,
  SilentKiller,
  DrillGun,
  PepperSpray,
  EyeGun,
  GrenadeLauncher,
  SilverBulletGun,
  PlasmaGun,
  Cannon,
  BlessedRevolver,
  CursedRevolver,
  HeartBreaker,
  RadiationBeam,
  Missile,
  Booger,
  ButterKnife,
  KitchenKnife,
  CutterKnife,
  SushiKnife,
  Scissors,
  Hammer,
  AX,
  ButcherKnife,
  LongNails,
  SwissArmyKnife,
  Fist,
  CrossCutSaw,
  CrowBar,
  Machete,
  KoreanHandPlow,
  BornSword,
  SurgicalKnife,
  BlessedSword,
  CursedSword,
  DualBlade,
  BigAX,
  DragonSlayer,
  SnotWhip,
  LaserSword,
  DeathScythe,
  Book,
  ThickBook,
  ThinBook,
  SpringBook,
  TextBook,
  Map,
  PictureBook,
  MagicBook,
  MobilePhone,
  Regulations,
  WorkBook,
  TreasureMap,
  EvacuationMap,
  Diary,
  Menu,
  Revelation,
  Labtop,
  AnswerSheet,
  LawBook,
  HellMap,
  OrderForm,
  Grimoire,
  TabletPC,
  Constitution,
  Counterfeit,
  Ring,
  CopperRing,
  FlowerRing,
  SilverRing,
  JadeRing,
  LeatherRing,
  CandyRing,
  GoldRing,
  KnuckleRing,
  DigitalRing,
  CrystalRing,
  RuneRing,
  SignetRing,
  SharpieRing,
  OnionRing,
  DiamondRing,
  OpalRing,
  ObsidianRing,
  SapphireRing,
  RubyRing,
  Bugles,
  BornRing,
  VampireRing,
  Tattoo,
  FourLeafClover,
])
const weaponKeys = ref<Record<(typeof Weapon)["meta"]["name"], number>>({})
const isShowWeaponModal = ref<typeof Weapon>()
const showWeaponModal = (weapon: typeof Weapon) => {
  isShowWeaponModal.value = weapon
}

const selectNextWeapon = (weapon: typeof Weapon) => {
  isShowWeaponModal.value = undefined
  etcUtil.sleep(1).then(() => (isShowWeaponModal.value = weapon))
}
</script>
