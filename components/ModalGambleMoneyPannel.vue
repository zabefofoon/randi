<template>
  <div class="w-full | relative">
    <div
      v-if="gameStore.checkSelectedPurchaseItem(PayBack)"
      class="purchase-sprites | absolute top-[-1.5cqw] left-[-1.8cqw] | w-[4cqw] aspect-square shrink-0"
      :style="{
        backgroundPosition: etcUtil.getPurchaseSpritePosition(PayBack.meta.spriteIndex),
      }"></div>

    <div class="w-full | | flex items-center gap-[0.5cqw] text-white">
      <div
        v-for="(number, index) in numbers"
        :key="index"
        class="flex-1 aspect-square | grid place-items-center | border-black border-[0.2cqw] bg-blue-900 | rounded-lg">
        <i
          v-if="index === 0 && isPayback"
          class="icon icon-rotate | rotate-animation | text-outline text-[4cqw] font-bold"></i>
        <span
          v-else
          class="text-outline text-[4cqw] font-bold">
          {{ number }}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-[0.5cqw] | w-full | mt-[1cqw]">
      <button
        v-for="unit in units"
        :key="unit"
        class="flex-1 select-none flex flex-col items-center | mt-[1cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | disabled:bg-gray-800 disabled:text-gray-500"
        :class="{
          'bg-purple-500': unit === 10,
          'bg-yellow-400': unit === 100,
          'bg-orange-700': unit === 1000,
        }"
        :disabled="coins < unit"
        @click="gachaAnimated(unit)">
        <div class="flex items-center justify-center">
          <span class="text-outline text-[1.5cqw] font-bold">{{ unit }}원 도박</span>
        </div>
        <div class="text-outline text-[1.3cqw] text-left">-{{ unit * 5 }}원 ~ {{ unit * 5 }}원</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PayBack } from "~/models/PurchaseItem"

const coins = defineModel<number>("coins", { default: 0 })

const gamblings = defineModel<number>("gamblings", { default: 0 })

const gameStore = useGameStore()
const soundStore = useSoundStore()

const units: (10 | 100 | 1000)[] = [10, 100, 1000]
const numbers = ref("-----")
let isAnimating = false

const isPayback = ref(false)

const formatSigned = (value: number) => {
  const isMinus = value < 0
  const padded = Math.abs(value).toString().padStart(4, "0")
  return isMinus ? `-${padded}` : `+${padded}`
}

const gachaAnimated = (unit: 10 | 100 | 1000) => {
  if (isAnimating) return
  isPayback.value = false
  coins.value -= unit
  gamblings.value++
  const finalValue = Phaser.Math.Between(-5 * unit, 5 * unit)

  setTimeout(() => {
    isAnimating = false
    coins.value = Math.max(0, coins.value + Number(numbers.value))
    if (coins.value < 0) coins.value = 0

    if (finalValue < 0 && gameStore.selectedPurchaseItems.includes(PayBack.meta.id)) {
      setTimeout(() => {
        isPayback.value = true

        const paybackMoney = Math.ceil(Math.abs(finalValue) / 2)
        coins.value += paybackMoney
        numbers.value = formatSigned(paybackMoney)
      }, 300)
    }
  }, 500)

  let startTime = 0
  const duration = 300 // ms

  const tick = (timestamp: number) => {
    if (!startTime) startTime = timestamp

    if (timestamp - startTime >= duration) {
      numbers.value = formatSigned(finalValue)
    } else {
      isAnimating = true
      numbers.value = formatSigned(Phaser.Math.Between(-5 * unit, 5 * unit))
      requestAnimationFrame(tick)
    }
  }
  requestAnimationFrame(tick)
}

watch(numbers, () => soundStore.play("coin"))
</script>
<style lang="scss" scoped>
.rotate-animation {
  animation: rotate-animation 300ms ease;
}

@keyframes rotate-animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
