<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[50cqw] | !bg-[rgba(0_0_0_/_50%)]"
    @close="emit('close')">
    <template #content>
      <div class="flex flex-col items-center justify-center | text-white">
        <div class="grid grid-cols-4 | gap-[1cqw]">
          <figure
            v-for="(material, index) in materials"
            :key="material.info.name"
            class="flex flex-col items-center | py-[1cqw]">
            <img :src="`https://picsum.photos/32?id=${index}`" />
            <figcaption class="flex flex-col items-center">
              <span>{{ material.info.name }}</span>
              <span>{{ material.info.description }}</span>
              <span>{{ material.length }}개</span>
            </figcaption>
            <!-- {{ material }} -->
          </figure>
        </div>
        <button
          class="bg-[rgba(0_0_0_/_50%)] | mt-[2cqw] px-[2cqw] py-[0.5cqw] | rounded-full | leading-none text-[1.2cqw]"
          @click="gacha">
          뽑기
        </button>
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

const gacha = () => {
  if (gachaChance.value < 1) return
  const randomIndex = Phaser.Math.Between(0, 7)
  const selectedMaterialKey = Object.keys(props.materials)[randomIndex] as Material["name"]
  props.materials[selectedMaterialKey].length++
  gachaChance.value--
}
</script>
