<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!w-fit !max-w-[unset] | !bg-blue-950"
    content-wrap-class="!overflow-visible"
    @close="emit('close')">
    <template #content>
      <div
        class="flex flex-col items-center justify-center | text-white | p-[1.5cqw] border-black border-[0.21cqw] rounded-lg">
        <div class="flex flex-col gap-[0.5cqw] | mb-[1.5cqw]">
          <div class="flex justify-between gap-[5cqw] mb-[0.5cqw]">
            <span class="text-outline text-[1.7cqw] font-bold">SOUND</span>
          </div>
          <div class="flex justify-between gap-[5cqw]">
            <span class="text-outline text-[1.7cqw] font-bold">BGM</span>
            <button
              class="grid place-items-center | relative | px-[2cqw] py-[0.5cqw] | border-black border-[0.21cqw] rounded-lg | leading-none"
              :class="{
                'bg-amber-500': soundStore.useBGMSound,
                'bg-blue-900': !soundStore.useBGMSound,
              }"
              @click="toggleBGM()">
              <span class="text-outline text-[1.7cqw] font-bold | min-w-[5cqw]">
                <template v-if="soundStore.useBGMSound">ON</template>
                <template v-else>OFF</template>
              </span>
            </button>
          </div>
          <div class="flex justify-between gap-[5cqw]">
            <span class="text-outline text-[1.7cqw] font-bold">EFFECT</span>
            <button
              class="grid place-items-center | relative | px-[2cqw] py-[0.5cqw] | border-black border-[0.21cqw] rounded-lg | leading-none"
              :class="{
                'bg-amber-500': soundStore.useEffectSound,
                'bg-blue-900': !soundStore.useEffectSound,
              }"
              @click="toggleEffect()">
              <span class="text-outline text-[1.7cqw] font-bold | min-w-[5cqw]">
                <template v-if="soundStore.useEffectSound">ON</template>
                <template v-else>OFF</template>
              </span>
            </button>
          </div>
        </div>

        <slot></slot>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close" | "exit"): void
}>()

const soundStore = useSoundStore()

const i18n = useI18n()

const toggleBGM = () => {
  soundStore.play("select")
  soundStore.toggleBGM()
}
const toggleEffect = () => {
  soundStore.play("select")
  soundStore.toggleEffect()
}

onMounted(() => {
  console.log(i18n)
})
</script>
