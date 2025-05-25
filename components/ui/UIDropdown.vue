<template>
  <div
    v-click-outside="() => !preventHideOutside && showOptions(false)"
    class="ui-dropdown">
    <div
      ref="reference"
      class="reference">
      <slot
        name="button"
        :show-options="showOptions"></slot>
    </div>
    <Transition :name="transitionName">
      <div
        v-show="isShow"
        ref="floating"
        class="options"
        :class="optionsClass"
        :style="floatingStyles">
        <div
          v-if="useArrow"
          ref="arrowRef"
          class="arrow"
          :style="arrowStyles"></div>
        <slot
          name="options"
          :show-options="showOptions"></slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { Position } from "~/models/UI"

import {
  arrow as arrowMw,
  autoPlacement,
  autoUpdate,
  getOverflowAncestors,
  hide,
  offset,
  shift,
  size,
  useFloating,
  type Placement,
} from "@floating-ui/vue"

const props = withDefaults(
  defineProps<{
    position?: Partial<Position>
    optionsClass?: string
    fitOptionsParent?: boolean
    value?: boolean
    useArrow?: boolean
    preventHideOutside?: boolean
  }>(),
  {
    isShow: undefined,
    position: undefined,
    optionsClass: undefined,
    fitOptionsParent: true,
    useArrow: undefined,
    preventHideOutside: undefined,
  }
)

const reference = ref<HTMLDivElement>()
const floating = ref<HTMLDivElement>()
const arrowRef = ref<HTMLDivElement>()

const isShow = ref<boolean>(props.value ?? false)

const defaultPlacements: Placement[] = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
]

const placementTable: Record<
  Position["x"] | "undefined",
  Record<Position["y"] | "undefined", Placement[]>
> = {
  undefined: {
    undefined: defaultPlacements,
    TOP: ["top"],
    BOTTOM: ["bottom"],
  },
  LEFT: {
    undefined: ["top-end", "bottom-end"],
    TOP: ["top-end"],
    BOTTOM: ["bottom-end"],
  },
  RIGHT: {
    undefined: ["top-start", "bottom-start"],
    TOP: ["top-start"],
    BOTTOM: ["bottom-start"],
  },
}

const allowedPlacements = computed<Placement[]>(() => {
  const x = props.position?.x ?? "undefined"
  const y = props.position?.y ?? "undefined"
  return placementTable[x]?.[y] ?? defaultPlacements
})

const transitionName = computed<string>(() => {
  return placement.value.includes("top") ? "select-options-top" : "select-options-bottom"
})

const { floatingStyles, placement, middlewareData } = useFloating(reference, floating, {
  middleware: [
    shift(),
    offset(10),
    hide(),
    size({
      apply({ rects, elements }) {
        if (props.fitOptionsParent) elements.floating.style.width = `${rects.reference.width}px`
      },
    }),
    autoPlacement({
      allowedPlacements: allowedPlacements.value,
    }),
    ...(props.useArrow ? [arrowMw({ element: arrowRef, padding: 10 })] : []),
  ],
  whileElementsMounted: autoUpdate,
})

const arrowStyles = computed(() => {
  const { x, y } = middlewareData.value.arrow || { x: undefined, y: undefined }
  const side = placement.value.split("-")[0] // 'top' | 'bottom' | 'left' | 'right'

  const staticSide = { top: "bottom", bottom: "top", left: "right", right: "left" }[side]

  return {
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : "",
    [staticSide!]: "-4px", // 화살표 길이 절반만큼 빼내기
  }
})

const showOptions = (value?: boolean): void => {
  isShow.value = value != null ? value : !isShow.value
}

const scrollStops: Array<() => void> = []

watch(isShow, (open) => {
  scrollStops.splice(0).forEach((stop) => stop())

  if (!open || !reference.value) return
  getOverflowAncestors(reference.value).forEach((el) => {
    const fn = (): void => showOptions(false)
    el.addEventListener("scroll", fn, { passive: true })
    scrollStops.push(() => el.removeEventListener("scroll", fn))
  })
})

watch(
  () => props.value,
  (value) => {
    isShow.value = value
  }
)
</script>
<style lang="scss" scoped>
.ui-dropdown {
  .options {
    z-index: 10;
  }

  .arrow {
    position: absolute;
    width: 2cqw;
    height: 1.1cqw;
    clip-path: polygon(50% 100%, 0% 0, 100% 0);
    background: white;
  }
}
</style>
