<template>
  <div class="w-full">
    <div class="w-full | flex items-center gap-[0.5cqw] text-white">
      <div
        v-for="(number, index) in numbers"
        :key="index"
        class="flex-1 aspect-square | grid place-items-center | border-black border-[0.2cqw] bg-blue-900 | rounded-lg">
        <span class="text-outline text-[4cqw] font-bold">{{ number }}</span>
      </div>
    </div>
    <div class="flex items-center gap-[0.5cqw] | w-full | mt-[1cqw]">
      <button
        v-for="unit in units"
        :key="unit"
        class="flex-1 select-none flex flex-col items-center gap-[0.2cqw] | mt-[1cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | disabled:bg-gray-800 disabled:text-gray-500"
        :class="{
          'bg-purple-500': unit === 10,
          'bg-yellow-400': unit === 100,
          'bg-orange-700': unit === 1000,
        }"
        :disabled="coins < unit"
        @click="gachaAnimated(unit)">
        <div class="flex items-center justify-center gap-[0.5cqw]">
          <span class="text-outline text-[1.5cqw] font-bold">{{ unit }}원 도박</span>
        </div>
        <div class="text-outline text-[1.1cqw] text-left">-{{ unit * 5 }}원 ~ {{ unit * 5 }}원</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const coins = defineModel<number>("coins", { default: 0 })

const units: (10 | 100 | 1000)[] = [10, 100, 1000]
const numbers = ref("-----")
let isAnimating = false

const formatSigned = (value: number) => {
  const isMinus = value < 0
  const padded = Math.abs(value).toString().padStart(4, "0")
  return isMinus ? `-${padded}` : `+${padded}`
}

const gachaAnimated = (unit: 10 | 100 | 1000) => {
  if (isAnimating) return
  coins.value -= unit
  setTimeout(() => {
    isAnimating = false
    coins.value = Math.max(0, coins.value + Number(numbers.value))
  }, 500)

  const finalValue = Phaser.Math.Between(-5 * unit, 5 * unit)

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
</script>
