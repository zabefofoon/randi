<template>
  <div
    class="w-screen h-screen | flex items-center justify-center | bg-black | text-white text-[1.8cqw] font-bold text-outline">
    <div class="content | relative | aspect-video max-w-full max-h-full">
      <img
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full | select-none pointer-events-none"
        src="/assets/images/chase.webp" />
      <main class="relative | w-full h-full | flex flex-col justify-center items-center">
        <div
          class="pannel | flex flex-col gap-[1cqw] | w-[80%] aspect-video | border-[0.2cqw] border-black rounded-lg | p-[1cqw]"
          style="background: rgba(0 0 0 / 80%); backdrop-filter: blur(5px)">
          <div class="flex gap-[0.5cqw] flex-1">
            <div
              class="flex-1 | flex flex-col justify-center gap-[0.2cqw] | border-[0.15cqw] border-blue-950 rounded-lg | p-[1cqw]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(18),
                    }"></div>
                  <span v-t="'RoundPoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(rounds) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(17),
                    }"></div>
                  <span v-t="'KillPoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(killed) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(9),
                    }"></div>
                  <span v-t="'StatPoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(materials) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(8),
                    }"></div>
                  <span v-t="'WeaponPoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(weapons) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(11),
                    }"></div>
                  <span v-t="'GoldPoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(coins) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(0),
                    }"></div>
                  <span v-t="'EnforcePoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(enforces) }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="stat-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(10),
                    }"></div>
                  <span v-t="'GamblePoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(gamblings) }}
                </div>
              </div>
              <div
                v-if="isBonusCharacter"
                class="flex items-center justify-between">
                <div class="flex items-center gap-[0.5cqw]">
                  <div
                    class="profile-sprites | w-[3cqw] aspect-square"
                    :style="{
                      backgroundPosition: etcUtil.getProfileSpritePosition(
                        gameStore.selectedCharacterIndex
                      ),
                    }"></div>
                  <span v-t="'CharacterPoint'"></span>
                </div>
                <div>
                  {{ stringUtil.attachComma(bonus) }}
                </div>
              </div>
            </div>
            <div
              class="relative | flex-1 flex flex-col items-center justify-center | border-[0.15cqw] border-blue-950 rounded-lg | p-[1cqw]">
              <div
                v-if="isShowClear"
                v-t="'Clear'"
                class="clear-anim | gasoek-one-regular | absolute left-[4cqw] top-[7cqw] | text-[3cqw]"></div>
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
              class="w-full max-w-[33%] | px-[1cqw] py-[0.2cqw] | border-[0.2cqw] border-black rounded-full | bg-orange-700"
              @click="emit('next', 'lobby')">
              <span
                v-t="'Review'"
                class="block | text-[1.8cqw] font-bold text-outline"></span>
            </button>
            <button
              class="w-full max-w-[33%] | px-[1cqw] py-[0.2cqw] | border-[0.2cqw] border-black rounded-full | bg-blue-900"
              @click="emit('next', 'lobby')">
              <span
                v-t="'Back'"
                class="block | text-[1.8cqw] font-bold text-outline"></span>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "next", scene: "lobby"): void
}>()

const gameStore = useGameStore()
const soundStore = useSoundStore()

const rounds = ref(0)
const killed = ref(0)
const materials = ref(0)
const weapons = ref(0)
const coins = ref(0)
const enforces = ref(0)
const gamblings = ref(0)
const bonus = ref(0)
const total = ref(0)

const isShowClear = ref(false)

const isBonusCharacter = computed(() => {
  return (
    gameStore.checkCharacter(gameStore.selectedCharacter) &&
    gameStore.selectedCharacter.meta.id === "nylonMask"
  )
})

const transitionNumberInterval = (
  target: Ref<number>,
  destination: number,
  duration = 1000
): number => {
  if (duration <= 0) {
    target.value = destination
    return -1
  }

  let startTime: number | undefined
  const startVal = 0
  target.value = startVal

  const tick = (timestamp: number) => {
    if (startTime === undefined) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1) // 0 ~ 1

    target.value = Math.round(startVal + (destination - startVal) * progress)

    if (progress < 1) requestAnimationFrame(tick)
  }

  return requestAnimationFrame(tick)
}

onMounted(async () => {
  const clearReward = gameStore.rewords.isClear

  const _total =
    Object.values(gameStore.rewords).reduce((acc, current) => acc + current, 0) * (clearReward + 1)

  const appliedharacterBonus = isBonusCharacter.value
    ? Math.ceil(numberUtil.addPercent(_total, 30))
    : _total

  gameStore.setCurrentMoney(gameStore.currentMoney + appliedharacterBonus)
  await etcUtil.sleep(300)

  const duration = 500
  transitionNumberInterval(rounds, gameStore.rewords.rounds, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(killed, gameStore.rewords.killed, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(materials, gameStore.rewords.materials, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(weapons, gameStore.rewords.weapons, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(coins, gameStore.rewords.coins, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(enforces, gameStore.rewords.enforces, duration)
  await etcUtil.sleep(duration / 2)
  transitionNumberInterval(gamblings, gameStore.rewords.gamblings, duration)

  if (isBonusCharacter.value) {
    await etcUtil.sleep(duration / 2)
    transitionNumberInterval(bonus, appliedharacterBonus - _total, duration)
  }

  await etcUtil.sleep(duration)
  transitionNumberInterval(
    total,
    clearReward ? appliedharacterBonus / 2 : appliedharacterBonus,
    duration
  )

  if (clearReward) {
    await etcUtil.sleep(duration * 2)
    isShowClear.value = true
    transitionNumberInterval(total, appliedharacterBonus, duration)
  }
})

watch([rounds, killed, materials, weapons, coins, enforces, gamblings, total, bonus], () => {
  if (import.meta.server) return
  soundStore.play("coin")
})
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

  .clear-anim {
    animation: clear-animation 300ms ease forwards;
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

@keyframes clear-animation {
  0% {
    opacity: 0;
    transform: scale(2);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(-45deg);
  }
}
</style>
