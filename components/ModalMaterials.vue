<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!w-fit !max-w-[unset] | !bg-blue-950"
    @close="emit('close')">
    <template #content>
      <div
        class="flex flex-col items-center justify-center | text-white | p-[1.5cqw] border-black border-[0.14cqw] rounded-lg">
        <div class="grid grid-cols-4 | gap-[0.5cqw]">
          <figure
            v-for="(material, index) in materials"
            ref="materialRefs"
            :key="material.info.name"
            class="select-none transition-colors | flex flex-col items-center | bg-blue-900 | border-black border-[0.14cqw] rounded-lg p-[1cqw] | cursor-pointer"
            :class="{ selectable: selectChance > 0 }"
            @click="select(Object.keys(materials).findIndex((item) => item === index))">
            <div
              class="stat-sprites w-[5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(
                  Object.keys(materials).findIndex((item) => item === index)
                ),
              }"></div>
            <figcaption class="flex flex-col items-center">
              <span class="text-outline text-[1.5cqw] font-bold">{{ material.info.name }}</span>
              <span class="text-[1.1cqw]">{{ material.info.description }}</span>
              <span class="text-[1.1cqw]">{{ material.length }}개</span>
            </figcaption>
          </figure>
        </div>
        <div class="flex gap-[2cqw]">
          <button
            v-if="selectChance > 0"
            class="grid place-items-center | relative bg-amber-500 | mt-[2cqw] px-[2cqw] py-[0.5cqw] | border-black border-[0.14cqw] rounded-lg | leading-none">
            <span class="text-outline text-[1.7cqw] font-bold">선택가능</span>
            <div
              v-if="selectChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="grid place-items-center | w-[2.5cqw] aspect-square | rounded-full border-black border-[0.14cqw] | bg-red-500 | text-[1.5cqw] text-outline font-bold">
                {{ selectChance }}
              </span>
            </div>
          </button>
          <button
            v-else
            class="grid place-items-center | relative bg-orange-700 | mt-[2cqw] px-[2cqw] py-[0.5cqw] | border-black border-[0.14cqw] rounded-lg | leading-none"
            @click="gacha">
            <span class="text-outline text-[1.7cqw] font-bold">랜덤뽑기</span>
            <div
              v-if="gachaChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="grid place-items-center | w-[2.5cqw] aspect-square | rounded-full border-black border-[0.14cqw] | bg-red-500 | text-[1.5cqw] text-outline font-bold">
                {{ gachaChance }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Material, Materials } from "~/models/Material"

const props = defineProps<{
  materials: Materials
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const gachaChance = defineModel<number>("gachaChance", { default: 0 })
const selectChance = defineModel<number>("selectChance", { default: 0 })

const materialRefs = ref<HTMLElement[]>([])

const gacha = () => {
  if (gachaChance.value < 1) return
  const randomIndex = Phaser.Math.Between(0, 7)
  const selectedMaterialKey = Object.keys(props.materials)[randomIndex] as Material["name"]
  props.materials[selectedMaterialKey].length++
  gachaChance.value--

  const el = materialRefs.value[randomIndex]
  if (el) {
    el.classList.remove("pop-animate")
    el.classList.add("pop-animate")
    el.addEventListener("animationend", () => el?.classList.remove("pop-animate"))
  }
}

const select = (index: number) => {
  if (selectChance.value < 1) return
  const selectedMaterialKey = Object.keys(props.materials)[index] as Material["name"]
  props.materials[selectedMaterialKey].length++
  selectChance.value--

  const el = materialRefs.value[index]
  if (el) {
    el.classList.remove("pop-animate")
    el.classList.add("pop-animate")
    el.addEventListener("animationend", () => el?.classList.remove("pop-animate"))
  }
}
</script>
<style lang="scss" scoped>
.selectable {
  background: linear-gradient(49deg, #b87115, #f2ae37, #f84cd0);
  background-size: 180% 180%;
  animation: gradient-animation 3s ease infinite;
}

.pop-animate {
  animation: pop-rotate 400ms ease;
}

@keyframes pop-rotate {
  0% {
    transform: scale(1) rotate(0deg);
  }

  30% {
    transform: scale(1.1) rotate(12deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
