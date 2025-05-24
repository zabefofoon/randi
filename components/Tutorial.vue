<template>
  <div
    class="absolute z-[40] top-0 left-0 | w-screen h-screen | flex items-center justify-center | bg-black | text-white">
    <div
      class="content | relative | grid place-items-center | aspect-video max-w-full max-h-full | overflow-hidden">
      <div class="pattern | absolute top-0 left-0 z-[0] | w-full h-full | opacity-40"></div>

      <div
        class="flex flex-col items-center justify-center gap-[1cqw] | relative z-[1] | w-[50cqw] pointer-events-none">
        <img
          class="block max-w-[20cqw] rounded-xl"
          src="/assets/images/tutorial.gif" />
        <UICarousel
          class="w-full h-[4cqw]"
          vertical
          autoplay
          loop>
          <UICarouselSlide
            v-for="(description, index) in descriptions"
            :key="index">
            <p class="p-[1cqw] w-full h-full | text-[1.5cqw] text-center">
              {{ i18n.t(description) }}
            </p>
          </UICarouselSlide>
        </UICarousel>
        <div class="absolute bottom-0 translate-y-[200%]">
          <p
            v-if="progress <= 0.99"
            class="text-[1cqw]">
            {{ parseInt((progress * 100).toFixed(2)) }}%
          </p>
          <UISpinner
            v-else
            class="text-[2cqw]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CAROUSEL_AUTOPLAY_DELAY } from "~/const"

const props = defineProps<{ progress: number }>()
const emit = defineEmits<{ (e: "close"): void }>()

const i18n = useI18n()

const descriptions = ref(["TutorialDesc1", "TutorialDesc2", "TutorialDesc3"])

const timeElapsed = ref(false)
let timer: ReturnType<typeof setTimeout>

const loadComplete = computed(() => props.progress >= 1)

const closeOverlay = () => {
  if (timeElapsed.value && loadComplete.value) emit("close")
}

onMounted(() => {
  timer = setTimeout(() => {
    timeElapsed.value = true
    closeOverlay()
  }, descriptions.value.length * CAROUSEL_AUTOPLAY_DELAY)
})
onBeforeUnmount(() => clearTimeout(timer))
watch(
  () => props.progress,
  (v) => {
    if (v >= 1) closeOverlay()
  }
)
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

  .pattern {
    background: url("/assets/images/pattern.svg");
    background-color: black;
    background-repeat: repeat;
    background-position: center;
    background-size: 0.5cqw;
  }
}
</style>
