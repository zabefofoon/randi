<template>
  <div
    ref="selectorEl"
    v-click-outside="() => showOptions(false)"
    class="dropdown"
    @mouseenter="mouseenterHandler"
    @mouseleave="mouseleaveHandler">
    <!-- 버튼 slot. 없다면, 기본 버튼 노출 -->
    <slot
      name="button"
      :show-options="showOptions">
    </slot>
    <!-- 버튼 slot. 없다면, 기본 버튼 노출 -->

    <!-- Options 영역 -->
    <ClientOnly>
      <Transition :name="`select-options-${optionsPosition.y.toLocaleLowerCase()}`">
        <ul
          v-if="isShowOptions"
          class="options"
          :style="optionsPositionClass">
          <!-- Options slot -->
          <slot
            name="options"
            :show-options="showOptions"></slot>
          <!-- Options slot -->
        </ul>
      </Transition>
    </ClientOnly>
    <!-- Options 영역 -->
  </div>
</template>
<script setup lang="ts">
import debounce from "lodash.debounce"
import type { Position } from "~/models/UI"

const props = defineProps<{
  position?: Position
}>()

const emit = defineEmits<{
  (e: "opened", value: boolean): void
  (e: "mouseenter" | "mouseleave", showOptions: (value?: boolean) => void): void
}>()

onMounted(() => {
  window.addEventListener(
    "scroll",
    debounce(() => showOptions(false), 100, { leading: true })
  )
})

const isShowOptions = ref(false)
const selectorEl = ref<HTMLSelectElement>()
const optionsPosition = ref<Position>({
  x: "RIGHT",
  y: "BOTTOM",
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const optionsPositionClass = computed<Record<string, any>>(() => {
  const xAxis = optionsPosition.value.x === "LEFT" ? { left: 0 } : { right: 0 }
  const yAxis =
    optionsPosition.value.y === "BOTTOM"
      ? { bottom: "-10px", transform: "translate(0, 100%)" }
      : { top: "-10px", transform: "translate(0, -100%)" }
  return { ...xAxis, ...yAxis }
})

const showOptions = (value?: boolean): void => {
  isShowOptions.value = value === undefined ? !isShowOptions.value : value
  calculatePosition()

  emit("opened", isShowOptions.value)
}

const calculatePosition = (): void => {
  if (import.meta.server) return

  const rect = selectorEl.value?.getBoundingClientRect()
  if (rect == null) return

  // 뷰포트 좌측상단(0,0)으로부터의 거리
  const relativeLeft = rect.left
  const relativeTop = rect.top

  if (props.position?.x != null) {
    optionsPosition.value.x = props.position.x
  } else {
    const overScreenMiddle = relativeLeft > window.innerWidth / 2
    optionsPosition.value.x = overScreenMiddle ? "RIGHT" : "LEFT"
  }

  if (props.position?.y != null) {
    optionsPosition.value.y = props.position.y
  } else {
    const overScreenMiddle = relativeTop > window.innerHeight / 2
    optionsPosition.value.y = overScreenMiddle ? "TOP" : "BOTTOM"
  }
}

let mouseTimer: NodeJS.Timeout
const mouseenterHandler = (): void => {
  emit("mouseenter", showOptions)
  clearTimeout(mouseTimer)
}

const mouseleaveHandler = (): void => {
  mouseTimer = setTimeout(() => emit("mouseleave", showOptions), 300)
}
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;

  .options {
    position: absolute;
    z-index: 10;
    width: 100%;
    pointer-events: none;
    border-radius: 10px;
  }
}
</style>
