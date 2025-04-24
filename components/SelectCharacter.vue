<template>
  <div class="main | w-screen h-screen | flex items-center justify-center | bg-black">
    <div
      class="content | relative | grid place-items-center | aspect-video max-w-full max-h-full | text-white overflow-hidden">
      <div class="pattern | absolute top-0 left-0 z-[0] | w-full h-full | opacity-40"></div>
      <div class="flex gap-[1cqw] | relative z-[1] | w-3/4 h-4/5 overflow-hidden">
        <div
          class="w-full h-full | flex flex-col items-center gap-[1cqw] | p-[1cqw] | bg-blue-950 | rounded-lg border-black border-[0.2cqw]">
          <UICarousel
            class="w-full"
            perview="auto"
            :active="gameStore.characters.length > 4"
            drag-free>
            <UICarouselSlide
              v-for="(character, index) in gameStore.characters"
              :key="`${character?.name}_${index}`"
              class="p-[1cqw]"
              style="width: calc(25% + 0.25cqw)">
              <button
                class="w-full aspect-square"
                :disabled="!character"
                @click="character && (gameStore.selectedCharacter = character)">
                <div
                  class="w-full h-full | bg-blue-950 | grid place-items-center | rounded-lg border-black border-[0.2cqw]"
                  :class="{
                    'border-orange-500 bg-orange-500':
                      gameStore.selectedCharacter?.name === character?.name,
                    'border-black bg-gray-950':
                      gameStore.selectedCharacter?.name !== character?.name,
                    '!bg-blue-950': !character,
                  }">
                  <div
                    v-if="character"
                    class="profile-sprites | w-full h-full"
                    :style="{
                      backgroundPosition: etcUtil.getProfileSpritePosition(index),
                    }"></div>
                  <div
                    v-else
                    class="text-outline gasoek-one-regular | text-[8cqw]">
                    ?
                  </div>
                </div>
              </button>
            </UICarouselSlide>
          </UICarousel>
          <div
            class="rounded-lg border-black border-[0.2cqw] | w-full h-full | flex flex-col items-center justify-center gap-[1cqw] text-center">
            <span
              class="text-outline text-[2.8cqw] font-bold"
              v-html="gameStore.selectedCharacter?.meta?.name ?? '????'">
            </span>
            <span
              class="text-outline text-[1.5cqw] font-bold"
              v-html="gameStore.selectedCharacter?.meta?.description ?? '????'">
            </span>
          </div>
          <div class="mt-auto | flex items-center gap-[0.5cqw]">
            <button
              class="flex flex-col gap-[0.5cqw]"
              @click="emit('next', 'lobby')">
              <span
                class="bg-blue-900 | px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
                돌아가기
              </span>
            </button>
            <button
              class="flex flex-col gap-[0.5cqw]"
              @click="emit('next', 'inGame')">
              <span
                class="bg-orange-700 | px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
                시작하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "next", scene: "inGame" | "lobby"): void
}>()
const gameStore = useGameStore()
</script>

<style lang="scss" scoped>
.main {
  .content {
    background: linear-gradient(to bottom right, rgb(20 20 20) 0%, #540454 25%, rgb(20 20 20) 100%);

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
}
</style>
