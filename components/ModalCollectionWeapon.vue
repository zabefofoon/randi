<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[50cqw] | !bg-blue-950 | text-white font-bold | border-black border-[0.2cqw]"
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
              ref="weaponThumbnailEl"
              class="relative | weapon-sprites border-black border-[0.2cqw] | w-[8cqw] aspect-square | rounded-lg | grid place-content-center"
              :style="{ 'background-position': weapon.meta.spritePosition }">
              <div
                v-if="weapon.meta.enforce"
                class="absolute top-[0] right-[0] translate-x-1/2 -translate-y-1/2 z-[1] | flex items-center justify-center | bg-amber-500 | rounded-full border-[0.2cqw] border-black | w-[2.3cqw] aspect-square">
                <span class="text-[1.1cqw] font-bold text-outline">
                  {{ weapon.meta.enforce }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-[0.5cqw]">
            <p class="text-outline text-[1.8cqw] font-bold">
              Lv.{{ weapon.meta.level }} <span v-t="weapon.meta.name"></span>
              <span
                v-if="weapon.meta.enforce"
                class="text-amber-500 text-[1.5cqw]">
                (+ {{ weapon.meta.enforce }})
              </span>
            </p>
            <p
              v-t="weapon.meta.description"
              class="text-outline text-[1.5cqw] font-bold"></p>
          </div>
        </figure>
        <WeaponCharacteristic
          :key="weapon.meta.enforce"
          :weapon="weapon.meta" />
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
                class="relative | weapon-sprites | w-[5.5cqw] aspect-square | rounded-lg border-black border-[0.2cqw]"
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
                  Lv.{{ next.cls.meta.level }} <span v-t="next.cls.meta.name"></span>
                </span>
                <span
                  v-t="next.cls.meta.description"
                  class="text-[1.3cqw]"></span>
              </div>
              <span
                v-else
                class="text-[1.3cqw]">
                ????
              </span>
            </div>
          </button>
        </div>
        <button
          class="bg-orange-700 border-black border-[0.21cqw] rounded-lg | flex items-center gap-[1cqw] | py-[0.5cqw] px-[2cqw] mx-auto | w-fit | disabled:bg-gray-800 disabled:text-gray-500"
          :disabled="
            gameStore.currentMoney < getNeedEnforceMoney(weapon) ||
            (weapon.meta.enforce != null && weapon.meta.enforce >= 99)
          "
          @click="enforceWeapon(weapon)">
          <template v-if="weapon.meta.enforce != null && weapon.meta.enforce < 99">
            <div class="flex items-center">
              <div
                class="stat-sprites | w-[3cqw] aspect-square"
                :style="{
                  backgroundPosition: etcUtil.getSpritePosition(11),
                }"></div>
              <span class="text-outline font-bold text-[1.7cqw] -mt-[0.2cqw]">
                {{ stringUtil.attachComma(getNeedEnforceMoney(weapon)) }}
              </span>
            </div>
            <span
              v-t="'Enforce'"
              class="text-outline font-bold text-[1.7cqw]"></span>
          </template>
          <span
            v-else
            class="text-outline font-bold text-[1.7cqw]">
            MAX
          </span>
        </button>
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
const soundStore = useSoundStore()
const weaponInstance = ref<Gun>()
const weaponThumbnailEl = ref<HTMLDivElement>()

const enforceWeapon = (weapon: typeof Weapon) => {
  gameStore.setCurrentMoney(gameStore.currentMoney - getNeedEnforceMoney(weapon))
  soundStore.play("coin")

  if (!weaponThumbnailEl.value) return

  const successProbability = (10 - Math.floor(Math.ceil(weapon.meta.enforce ?? 0) / 10)) / 10
  if (Math.random() < successProbability) {
    const enforced = weapon.meta.enforce ?? 0
    weapon.setEnforce(enforced + 1)
    gameStore.increaseEnforceWeapon(weapon)

    weaponThumbnailEl.value.classList.remove("success-animate")
    weaponThumbnailEl.value.classList.add("success-animate")
    etcUtil.restartAnimation(weaponThumbnailEl.value)
    weaponThumbnailEl.value.addEventListener(
      "animationend",
      () => weaponThumbnailEl.value?.classList.remove("success-animate"),
      {
        once: true,
      }
    )
  } else {
    weaponThumbnailEl.value.classList.remove("fail-animate")
    weaponThumbnailEl.value.classList.add("fail-animate")
    etcUtil.restartAnimation(weaponThumbnailEl.value)
    weaponThumbnailEl.value.addEventListener(
      "animationend",
      () => weaponThumbnailEl.value?.classList.remove("fail-animate"),
      { once: true }
    )
  }
}

const getNeedEnforceMoney = (weapon: typeof Weapon) => {
  return (Math.floor(Math.ceil(weapon.meta.enforce ?? 0) / 10) + 1) * 1000
}

onMounted(() => {
  const weapon = props.weapon as typeof Gun
  weaponInstance.value = new weapon()
})
</script>

<style lang="scss" scoped>
.success-animate {
  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
    background: linear-gradient(180deg, transparent, rgb(50 205 50 / 50%), transparent);
    background-size: 300% 300%;
    animation: success-animation 200ms ease;
    will-change: background-position;
  }
}

.fail-animate {
  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
    background: linear-gradient(180deg, transparent, rgb(220 20 60 / 50%), transparent);
    background-size: 300% 300%;
    animation: fail-animation 200ms ease;
    will-change: background-position;
  }
}

@keyframes success-animation {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 0% 100%;
  }
}

@keyframes fail-animation {
  0% {
    background-position: 0% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}
</style>
