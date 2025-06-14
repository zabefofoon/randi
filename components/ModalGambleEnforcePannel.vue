<template>
  <div class="w-full | relative">
    <div
      v-if="gameStore.checkSelectedPurchaseItem(Sharper)"
      class="purchase-sprites | absolute top-[-1.5cqw] left-[-1.8cqw] z-[1] | w-[4cqw] aspect-square shrink-0"
      :style="{
        backgroundPosition: etcUtil.getPurchaseSpritePosition(Sharper.meta.spriteIndex),
      }"></div>

    <div class="w-full | flex items-center gap-[0.5cqw] text-white">
      <figure
        v-for="(enforce, index) in enforces.items"
        :key="index"
        ref="cardEl"
        class="relative | flex-1 | grid place-items-center | border-black border-[0.2cqw] bg-blue-900 | rounded-lg | px-[1cqw]">
        <div
          class="w-full aspect-square | stat-sprites"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(12 + index),
          }"></div>
        <figcaption
          v-t="enforce.description"
          class="-mt-[0.5cqw] | text-[1.2cqw] text-center | font-bold text-outline"></figcaption>
        <div class="flex items-center">
          <div
            v-if="!enforce.max || enforce.length < enforce.max"
            class="stat-sprites | w-[2.5cqw] aspect-square"
            :style="{
              backgroundPosition: etcUtil.getSpritePosition(11),
            }"></div>
          <span class="font-bold text-[1.5cqw] text-outline">
            <template v-if="enforce.max && enforce.length >= enforce.max"> MAX </template>
            <template v-else>
              {{ enforces.getExpense(enforce) }}
            </template>
          </span>
        </div>

        <UIDropdown
          class="w-full"
          :value="index === 0 && stepTutorial === 'gacha-enforce'"
          use-arrow
          prevent-hide-outside
          :fit-options-parent="false"
          :position="{
            x: 'RIGHT',
            y: 'TOP',
          }">
          <template #button>
            <button
              class="w-full select-none | bg-orange-700 | border-black border-[0.2cqw] rounded-lg | my-[1cqw] px-[0.5cqw] | disabled:bg-gray-800 disabled:text-gray-500"
              :disabled="
                enforces.getExpense(enforce) > coins || !enforces.checkGachable(enforce.name)
              "
              @click="gacha(enforce, index)">
              <span
                v-t="'MaterialGatcha'"
                class="block | font-bold text-[1.8cqw] text-outline"></span>
            </button>
          </template>
          <template #options>
            <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
              <p
                v-t="'StepTutorial11'"
                class="text-[1.5cqw] whitespace-nowrap text-right font-bold text-black"></p>
            </div>
          </template>
        </UIDropdown>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EnforceItem, Enforces } from "~/models/Enforces"
import { Sharper } from "~/models/PurchaseItem"
import type { StepTutorial } from "~/models/UI"

const props = defineProps<{
  enforces: Enforces
}>()

const coins = defineModel<number>("coins", { default: 0 })
const gamblings = defineModel<number>("gamblings", { default: 0 })
const stepTutorial = defineModel<StepTutorial>("stepTutorial")

const gameStore = useGameStore()
const soundStore = useSoundStore()

const cardEl = ref<HTMLDivElement[]>()

const gacha = (enforce: EnforceItem, index: number) => {
  if (gameStore.isShowStepTutorial && stepTutorial.value !== "gacha-enforce") return
  if (!cardEl.value) return

  coins.value = coins.value - props.enforces.getExpense(enforce)
  if (coins.value < 0) coins.value = 0
  gamblings.value++

  const random = gameStore.selectedPurchaseItems.includes(Sharper.meta.id)
    ? Phaser.Math.Between(0, 3)
    : Phaser.Math.Between(0, 1)

  const el = cardEl.value[index]
  if (random) {
    props.enforces.increase(enforce.name)

    el.classList.remove("success-animate")
    el.classList.add("success-animate")
    etcUtil.restartAnimation(el)
    el.addEventListener("animationend", () => el.classList.remove("success-animate"), {
      once: true,
    })
  } else {
    el.classList.remove("fail-animate")
    el.classList.add("fail-animate")
    etcUtil.restartAnimation(el)
    el.addEventListener("animationend", () => el.classList.remove("fail-animate"), { once: true })
  }
  soundStore.play("coin")
  if (stepTutorial.value === "gacha-enforce") stepTutorial.value = "gacha-stat"
}

onMounted(() => {
  if (stepTutorial.value === "gacha-enforces") stepTutorial.value = "gacha-enforce"
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
