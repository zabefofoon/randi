<template>
  <div
    class="w-screen h-screen | flex items-center justify-center | bg-black | text-white text-[1.8cqw] font-bold text-outline">
    <div class="content | relative | aspect-video max-w-full max-h-full | bg-purple-950">
      <img
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full | select-none pointer-events-none"
        src="/assets/images/chase.webp" />
      <main class="relative | w-full h-full | flex flex-col justify-center items-center">
        <div
          class="pannel | flex flex-col gap-[1cqw] | w-[80%] aspect-video | border-[0.2cqw] border-black rounded-lg | p-[1cqw]"
          style="background: rgba(0 0 0 / 80%); backdrop-filter: blur(5px)">
          <div class="gasoek-one-regular | text-[4cqw] text-center">REWORD</div>

          <div class="flex gap-[0.5cqw] flex-1">
            <div
              class="flex-1 | flex flex-col justify-center gap-[0.2cqw] | border-[0.15cqw] border-blue-950 rounded-lg | p-[1cqw]">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(18),
                    }"></div>
                  <span>라운드 점수</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(rounds) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(17),
                    }"></div>
                  <span>처치한 적</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(killed) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(9),
                    }"></div>
                  <span>스텟 점수</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(materials) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(8),
                    }"></div>
                  <span>무기 점수</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(weapons) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(11),
                    }"></div>
                  <span>골드 점수</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(coins) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(0),
                    }"></div>
                  <span>강화 점수</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(enforces) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(10),
                    }"></div>
                  <span>도박 점수</span>
                </div>
                <div class="">
                  {{ stringUtil.attachComma(gamblings) }}
                </div>
              </div>
            </div>
            <div
              class="flex-1 flex flex-col items-center justify-center | border-[0.15cqw] border-blue-950 rounded-lg | p-[1cqw]">
              <div class="mt-[0.2cqh] | flex items-center justify-between | pr-[0.5cqw] rounded-lg">
                <div
                  class="stat-sprites | w-[8cqw] aspect-square"
                  :style="{
                    backgroundPosition: etcUtil.getSpritePosition(11),
                  }"></div>
                <span class="gasoek-one-regular | text-[4cqw] text-white font-bold">
                  +{{ stringUtil.attachComma(total) }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center gap-[0.4cqw]">
            <button
              class="w-full max-w-[33%] | px-[1cqw] py-[0.2cqw] | border-[0.2cqw] border-black rounded-full | bg-blue-900"
              @click="emit('next', 'lobby')">
              <span class="block | text-[1.8cqw] font-bold text-outline"> 로비로 가기 </span>
            </button>
            <button
              class="w-full max-w-[33%] | px-[1cqw] py-[0.2cqw] | border-[0.2cqw] border-black rounded-full | bg-orange-700"
              @click="emit('next', 'lobby')">
              <span class="block | text-[1.8cqw] font-bold text-outline"> 리뷰쓰기 </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOCAL_MONEY } from "~/const"

const emit = defineEmits<{
  (e: "next", scene: "lobby"): void
}>()

const rewordsStore = useRewordsStore()

const rounds = ref(0)
const killed = ref(0)
const materials = ref(0)
const weapons = ref(0)
const coins = ref(0)
const enforces = ref(0)
const gamblings = ref(0)
const total = ref(0)

onMounted(async () => {
  const _total = Object.values(rewordsStore.rewords).reduce((acc, current) => acc + current, 0)
  localStorage.setItem(LOCAL_MONEY, `${_total}`)

  await etcUtil.sleep(300)

  const duration = 500
  transitionNumberInterval(rounds, rewordsStore.rewords.rounds, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(killed, rewordsStore.rewords.killed, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(materials, rewordsStore.rewords.materials, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(weapons, rewordsStore.rewords.weapons, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(coins, rewordsStore.rewords.coins, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(enforces, rewordsStore.rewords.enforces, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(gamblings, rewordsStore.rewords.gamblings, duration)

  await etcUtil.sleep(duration)

  transitionNumberInterval(total, _total, duration)
})

const transitionNumberInterval = (
  target: Ref<number>,
  destination: number,
  duration = 1000 // 기본 1초
): number => {
  if (duration <= 0) {
    target.value = destination
    return -1
  }

  let startTime: number | undefined
  const startVal = 0 // 기존 로직과 동일하게 0부터 시작
  target.value = startVal

  const tick = (timestamp: number) => {
    if (startTime === undefined) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1) // 0 ~ 1

    // 선형 보간 후 정수로
    target.value = Math.round(startVal + (destination - startVal) * progress)

    if (progress < 1) requestAnimationFrame(tick) // 아직 진행 중
  }

  return requestAnimationFrame(tick)
}
</script>
<style lang="scss" scoped>
.content {
  @media (aspect-ratio >= 16 / 9) {
    width: auto;
    height: 100%;
  }

  @media (aspect-ratio <= 16 / 9) {
    width: 100%;
    height: auto;
  }

  .pannel {
    opacity: 0;
    animation: appear 1000ms ease 300ms forwards;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
