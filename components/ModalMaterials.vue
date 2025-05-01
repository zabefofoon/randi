<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!w-fit !max-w-[unset] | !bg-blue-950"
    content-wrap-class="!overflow-hidden"
    @close="emit('close')">
    <template #content>
      <div
        class="flex flex-col items-center justify-center | text-white | p-[1.5cqw] border-black border-[0.14cqw] rounded-lg">
        <div class="grid grid-cols-4 | gap-[0.5cqw]">
          <figure
            v-for="(key, index) in materials.keys"
            ref="materialRefs"
            :key="key"
            class="select-none transition-colors | flex flex-col items-center | bg-blue-900 | border-black border-[0.14cqw] rounded-lg p-[1cqw] | cursor-pointer"
            :class="{ selectable: selectChance > 0 }"
            @click="select(index)">
            <div
              class="stat-sprites w-[5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(index),
              }"></div>
            <figcaption class="flex flex-col items-center">
              <span class="text-outline text-[1.5cqw] font-bold">
                {{ materials[key].info.key }}
              </span>
              <span class="text-[1.1cqw]">{{ materials[key].info.description }}</span>
              <span class="text-[1.1cqw]">{{ materials[key].length }}개</span>
            </figcaption>
          </figure>
        </div>
        <div class="flex gap-[2cqw]">
          <button
            v-if="selectChance > 0"
            class="grid place-items-center | relative bg-amber-500 | mt-[2cqw] px-[1.5cqw] py-[0.5cqw] | border-black border-[0.14cqw] rounded-lg | leading-none">
            <span class="text-outline text-[1.7cqw] font-bold">선택가능</span>
            <div
              v-if="selectChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="grid place-items-center | w-[2.5cqw] aspect-square | rounded-full border-black border-[0.14cqw] | bg-red-500 | text-[1.5cqw] text-outline font-bold">
                {{ selectChance }}
              </span>
            </div>
          </button>
          <button
            class="grid place-items-center | relative | mt-[2cqw] px-[1.5cqw] py-[0.5cqw] | border-black border-[0.14cqw] rounded-lg | leading-none"
            :class="{
              'bg-orange-700': gachaChance > 0,
              'bg-gray-700': gachaChance < 1,
            }"
            :disabled="gachaChance < 1"
            @click="gacha">
            <span class="text-outline text-[1.7cqw] font-bold">랜덤뽑기</span>
            <div
              v-if="gachaChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="grid place-items-center | w-[2.5cqw] aspect-square | rounded-full border-black border-[0.14cqw] | bg-red-500 | text-[1.5cqw] text-outline font-bold">
                {{ gachaChance }}
              </span>
            </div>
          </button>
          <button
            v-if="gachaChance > 0 && gameStore.checkSelectedPurchaseItem(Joker)"
            class="grid place-items-center | relative bg-green-700 | mt-[2cqw] px-[1.5cqw] py-[0.5cqw] | border-black border-[0.14cqw] rounded-lg | leading-none"
            @click="useJoker">
            <div
              class="purchase-sprites | absolute top-[-0.5cqw] right-[-0.5cqw] | w-[2cqw] aspect-square shrink-0"
              :style="{
                backgroundPosition: etcUtil.getPurchaseSpritePosition(Joker.meta.spriteIndex),
              }"></div>
            <span class="text-outline text-[1.7cqw] font-bold">조커</span>
            <div
              v-if="jokerLength > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="grid place-items-center | w-[2.5cqw] aspect-square | rounded-full border-black border-[0.14cqw] | bg-red-500 | text-[1.5cqw] text-outline font-bold">
                {{ jokerLength }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Materials } from "~/models/Material"
import { Joker } from "~/models/PurchaseItem"

const props = defineProps<{
  materials: Materials
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const gachaChance = defineModel<number>("gachaChance", { default: 0 })
const selectChance = defineModel<number>("selectChance", { default: 0 })

const nuxt = useNuxtApp()
const gameStore = useGameStore()

const materialRefs = ref<HTMLElement[]>([])
const jokerLength = ref(0)

const gacha = () => {
  if (gachaChance.value < 1) return
  const randomIndex = Phaser.Math.Between(0, 7)
  const selectedMaterialKey = Object.keys(props.materials)[
    randomIndex
  ] as keyof ClassToRaw<Materials>
  props.materials.increase(selectedMaterialKey, 1)
  gachaChance.value--
  nuxt.$sound.play("stat")
  const el = materialRefs.value[randomIndex]
  if (el) {
    el.classList.remove("pop-animate")
    el.classList.add("pop-animate")
    el.addEventListener("animationend", () => el?.classList.remove("pop-animate"))
  }
}

const select = (index: number) => {
  if (selectChance.value < 1) return
  const selectedMaterialKey = Object.keys(props.materials)[index] as keyof ClassToRaw<Materials>
  props.materials.increase(selectedMaterialKey, 1)
  selectChance.value--
  nuxt.$sound.play("stat")
  const el = materialRefs.value[index]
  if (el) {
    el.classList.remove("pop-animate")
    el.classList.add("pop-animate")
    el.addEventListener("animationend", () => el?.classList.remove("pop-animate"))
  }
}

const useJoker = () => {
  if (gachaChance.value < 1) return
  gachaChance.value--
  selectChance.value++

  nuxt.$sound.play("stat")
  jokerLength.value--
  gameStore.spendPurchaseItem(Joker)
}
const initJokerLength = () => {
  if (gameStore.checkSelectedPurchaseItem(Joker))
    jokerLength.value = gameStore.purchasedItems[Joker.meta.id]
}
onMounted(() => {
  initJokerLength()
})
</script>
<style lang="scss" scoped>
.selectable {
  background: linear-gradient(49deg, #b87115, #f2ae37, #f84cd0);
  background-size: 180% 180%;
  animation: gradient-animation 3s ease infinite;
}

.pop-animate {
  animation: pop-rotate 400ms ease;
}

@keyframes pop-rotate {
  0% {
    transform: scale(1) rotate(0deg);
  }

  30% {
    transform: scale(1.1) rotate(12deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
