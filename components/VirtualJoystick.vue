<template>
  <UIDropdown
    :value="stepTutorial === 'move'"
    use-arrow
    prevent-hide-outside
    :fit-options-parent="false"
    :position="{
      x: 'RIGHT',
    }">
    <template #button>
      <div
        ref="joyStickWrapEl"
        class="joy-stick-wrap"
        @touchmove="handleTouchmove">
        <button
          v-for="index in 8"
          :key="index"
          class="button"
          :style="{
            top: `calc(50% - 30px * cos(calc((${index} - 1) * 360deg / 8)))`,
            left: `calc(50% - 30px * sin(calc((${index} - 1) * 360deg / 8)))`,
          }"
          :data-index="index"
          :class="{ active: activeIndex === index }"
          @touchstart="activeIndex = undefined"></button>
        <div
          class="circle"
          :style="{
            top: activeIndex
              ? `calc(50% - 40px * cos(calc((${activeIndex} - 1) * 360deg / 8)))`
              : '50%',
            left: activeIndex
              ? `calc(50% - 40px * sin(calc((${activeIndex} - 1) * 360deg / 8)))`
              : '50%',
          }"></div>
      </div>
    </template>
    <template #options>
      <div class="p-[0.5cqw] bg-white rounded-lg | flex gap-[0.5cqw]">
        <p
          v-t="'StepTutorial1'"
          class="text-[1.5cqw] whitespace-nowrap text-right font-bold"></p>
      </div>
    </template>
  </UIDropdown>
</template>

<script setup lang="ts">
import type { StepTutorial } from "~/models/UI"

defineProps<{
  stepTutorial?: StepTutorial
}>()

const activeIndex = defineModel<number>()

const joyStickWrapEl = ref<HTMLDivElement>()

const handleTouchmove = (event: TouchEvent) => {
  if (!joyStickWrapEl.value) return

  const { clientX, clientY } = event.changedTouches[0]
  const { x, y } = getPos(joyStickWrapEl.value)
  const distance = getDistance(clientX, x, clientY, y)

  const nearist = Array.from(joyStickWrapEl.value?.getElementsByClassName("button") ?? [])
    .map((buttonEl) => {
      const { x, y } = getPos(buttonEl)
      return {
        distance: getDistance(clientX, x, clientY, y),
        el: buttonEl as HTMLButtonElement,
      }
    })
    .reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr))

  if (distance > 10 && nearist.distance > 10) {
    activeIndex.value = nearist.el.dataset.index ? +nearist.el.dataset.index : undefined
  } else if (distance <= 10) activeIndex.value = undefined

  const el = document.elementFromPoint(clientX, clientY) as HTMLButtonElement
  if (el?.tagName === "BUTTON") {
    activeIndex.value = el.dataset.index ? +el.dataset.index : undefined
  }
}

const handleTouchend = () => (activeIndex.value = undefined)

const getDistance = (x1: number, x2: number, y1: number, y2: number) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

const getPos = (el: Element) => {
  const rect = el.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  return { x, y }
}

onMounted(() => {
  window.addEventListener("touchend", handleTouchend)
})

onBeforeMount(() => {
  window.removeEventListener("touchend", handleTouchend)
})
</script>

<style lang="scss" scoped>
.joy-stick-wrap {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(255 255 255 / 80%);
  border-radius: 999px;

  .button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 999px;
    outline: 0;
    transform: translate(-50%, -50%);
  }

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    background: rgb(255 255 255 / 80%);
    border-radius: 999px;
    transition: left 150ms ease, top 150ms ease;
    transform: translate(-50%, -50%);
  }
}
</style>
