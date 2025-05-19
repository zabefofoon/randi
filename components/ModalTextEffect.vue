<template>
  <UIModal
    class="pointer-events-none"
    hide-close-button
    content-wrap-class="!overflow-hidden"
    dim-class="top-1/2 -translate-y-1/2 | !h-1/3"
    inner-class="!max-w-none | !bg-transparent | !h-1/3">
    <template #content>
      <div class="flex flex-col items-center justify-center | relative | text-white | h-[33.3dvh]">
        <h2
          ref="topEl"
          class="top | gasoek-one-regular text-outline | absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | text-[8cqw] | whitespace-nowrap">
          {{ text }}
        </h2>
        <h2
          ref="bottomEl"
          class="bottom | gasoek-one-regular text-outline | absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | text-[8cqw] | whitespace-nowrap">
          {{ text }}
        </h2>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

defineEmits<{
  (e: "close"): void
}>()

const topEl = ref<HTMLElement>()
const bottomEl = ref<HTMLElement>()

watch(
  () => props.text,
  () => {
    if (!topEl.value || !bottomEl.value) return

    etcUtil.restartAnimation(topEl.value, "top")
    etcUtil.restartAnimation(bottomEl.value, "bottom")
  }
)
</script>
<style lang="scss" scoped>
.top {
  clip-path: inset(50% 0 0 0);
  animation: top-animation 1200ms ease forwards;
}

.bottom {
  clip-path: inset(0 0 50% 0);
  animation: bottom-animation 1200ms ease forwards;
}

@keyframes bottom-animation {
  0% {
    clip-path: inset(100% 0 0 0);
  }

  33% {
    clip-path: inset(0 0 0 0);
  }

  66% {
    clip-path: inset(0 0 0 0);
  }

  100% {
    clip-path: inset(0 0 0 100%);
  }
}

@keyframes top-animation {
  0% {
    clip-path: inset(0 0 100% 0);
  }

  25% {
    clip-path: inset(0 0 0 0);
  }

  75% {
    clip-path: inset(0 0 0 0);
  }

  100% {
    clip-path: inset(0 100% 0 0);
  }
}
</style>
