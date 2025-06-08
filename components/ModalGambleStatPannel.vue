<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center gap-[0.5cqw] | w-full | mt-[1cqw]">
      <div class="flex items-center gap-[0.5cqw]">
        <figure
          v-for="index in 5"
          :key="index"
          ref="cardEls"
          class="flip-card">
          <div class="flip-card-inner | relative | w-[10cqw] aspect-[3/4]">
            <div
              class="flip-card-front | grid place-items-center | absolute top-0 left-0 | w-full h-full | border-[0.2cqw] border-black rounded-lg | bg-blue-900">
              <div
                class="stat-sprites | w-[6cqw] aspect-square"
                :style="{
                  backgroundPosition: etcUtil.getSpritePosition(15),
                }"></div>
            </div>
            <div
              class="flip-card-back | grid place-items-center | absolute top-0 left-0 | w-full h-full | border-[0.2cqw] border-black rounded-lg"
              :class="results[index - 1] === -1 ? 'bg-gray-700' : 'bg-amber-500'">
              <div
                class="stat-sprites | w-[6cqw] aspect-square"
                :style="{
                  backgroundPosition: etcUtil.getSpritePosition(
                    getCardBack(results[index - 1]).spriteIndex
                  ),
                }"></div>
              <p
                v-t="getCardBack(results[index - 1]).label"
                class="text-[1.3cqw] font-bold text-outline | -translate-y-[0.5cqw] text-center"></p>
            </div>
          </div>
        </figure>
      </div>
      <div class="flex items-center | -translate-x-[0.5cqw] | mt-[1cqw]">
        <div
          class="stat-sprites | w-[2.5cqw] aspect-square"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(11),
          }"></div>
        <span class="font-bold text-[1.5cqw] text-outline"> {{ needCoins }} </span>
      </div>
      <UIDropdown
        :value="stepTutorial === 'gacha-stat-do'"
        use-arrow
        prevent-hide-outside
        :fit-options-parent="false"
        :position="{
          y: 'TOP',
        }">
        <template #button>
          <button
            class="flex-1 select-none flex flex-col items-center gap-[0.2cqw] | px-[1cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg bg-purple-600 | disabled:bg-gray-800 disabled:text-gray-500"
            :disabled="coins < needCoins"
            @click="gacha()">
            <div class="flex items-center justify-center gap-[0.5cqw]">
              <span
                v-t="'MaterialGatcha'"
                class="text-outline text-[1.5cqw] font-bold"></span>
            </div>
          </button>
        </template>
        <template #options>
          <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
            <p
              v-t="'StepTutorial13'"
              class="text-[1.5cqw] whitespace-nowrap text-right font-bold text-black"></p>
          </div>
        </template>
      </UIDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Materials } from "~/models/Material"
import type { StepTutorial } from "~/models/UI"

const props = defineProps<{
  materials: Materials
}>()
const emit = defineEmits<{
  (e: "close"): void
}>()

const coins = defineModel<number>("coins", { default: 0 })
const gamblings = defineModel<number>("gamblings", { default: 0 })
const stepTutorial = defineModel<StepTutorial>("stepTutorial")

const soundStore = useSoundStore()

const cardEls = ref<HTMLDivElement[]>()
const results = ref<number[]>([-1, -1, -1, -1, -1])
const needCoins = 200
let animating = false

const getCardBack = (index: number) => {
  Object.keys(props.materials)

  const spriteIndex = index === -1 ? 16 : index
  const label = index === -1 ? "NoLuck" : Object.keys(props.materials)[index]

  return {
    spriteIndex,
    label,
  }
}

const gacha = async () => {
  if (!cardEls.value) return
  if (animating) return

  animating = true
  coins.value = coins.value - needCoins
  if (coins.value < 0) coins.value = 0
  gamblings.value++
  soundStore.play("coin")

  cardEls.value.forEach((el) => el.classList.remove("active"))
  await etcUtil.sleep(150)

  for (let i = 0; i < cardEls.value.length; i++) {
    const r = Math.random() // 0 이상 1 미만의 실수
    const failProbability = stepTutorial.value === "gacha-stat-do" ? false : r < 0.8
    if (failProbability) results.value[i] = -1
    else results.value[i] = Math.floor(Math.random() * 8)

    const el = cardEls.value[i]
    el.classList.add("active")
    await etcUtil.sleep(25)
  }

  results.value
    .filter((item) => item !== -1)
    .forEach((index) => {
      const key = Object.keys(props.materials)[index] as keyof ClassToRaw<Materials>
      props.materials.increase(key, 1)
    })
  await etcUtil.sleep(150)
  animating = false

  if (stepTutorial.value === "gacha-stat-do") {
    await etcUtil.sleep(500)
    emit("close")
    stepTutorial.value = "skill"
  }
}

onMounted(() => {
  if (stepTutorial.value === "gacha-stat") stepTutorial.value = "gacha-stat-do"
})
</script>
<style lang="scss" scoped>
.flip-card {
  perspective: 1000px;

  .flip-card-inner {
    transition: transform 150ms;
    transform-style: preserve-3d;

    .flip-card-front,
    .flip-card-back {
      backface-visibility: hidden;
    }

    .flip-card-back {
      transform: rotateY(180deg);
    }
  }

  &.active {
    .flip-card-inner {
      transform: rotateY(180deg);
    }
  }
}
</style>
