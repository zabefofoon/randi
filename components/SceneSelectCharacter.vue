<template>
  <BackgroundPattern>
    <div class="absolute right-[1cqw] top-[1cqw] | flex items-center gap-[1cqw]">
      <div class="flex items-center">
        <div
          class="stat-sprites | w-[2.5cqw] aspect-square"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(11),
          }"></div>
        <span class="text-outline font-bold text-[1.5cqw] -mt-[0.2cqw]">
          {{ stringUtil.attachComma(gameStore.currentMoney) }}
        </span>
      </div>
    </div>

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
            :key="`${character?.type}_${index}`"
            class="p-[1cqw]"
            style="width: calc(25% + 0.25cqw)">
            <button
              class="w-full aspect-square | relative"
              :disabled="!character"
              @click="selectCharacter(character)">
              <div
                class="w-full h-full | bg-blue-950 | grid place-items-center | rounded-lg border-black border-[0.2cqw]"
                :class="
                  gameStore.selectedCharacterIndex === index
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-black bg-gray-900'
                ">
                <div
                  class="profile-sprites | w-full h-full"
                  :style="{
                    backgroundPosition: etcUtil.getProfileSpritePosition(index),
                    filter: character?.type === 'purchase' ? 'brightness(0) blur(3px)' : '',
                  }"></div>
              </div>
              <p
                v-if="gameStore.clearCount?.[character?.meta?.id]"
                class="absolute bottom-[0.5cqw] left-[0.5cqw] |">
                <span class="font-bold text-[1.2cqw] text-outline">
                  *CLEAR {{ stringUtil.attachComma(gameStore.clearCount?.[character?.meta?.id]) }}
                </span>
              </p>
            </button>
          </UICarouselSlide>
        </UICarousel>
        <div
          class="w-full h-full | flex flex-col items-center justify-center gap-[1cqw] text-center">
          <template v-if="gameStore.checkCharacter(gameStore.selectedCharacter)">
            <span
              v-t="gameStore.selectedCharacter.meta.name"
              class="text-outline text-[2.8cqw] font-bold">
            </span>
            <span
              v-t="gameStore.selectedCharacter.meta.description"
              class="text-outline text-[1.5cqw] font-bold">
            </span>
            <span
              v-t="gameStore.selectedCharacter.meta.specificity"
              class="text-outline text-[1.5cqw] font-bold">
            </span>
          </template>
          <div
            v-else
            class="flex items-center">
            <div
              class="stat-sprites | w-[5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(11),
              }"></div>
            <span class="text-outline font-bold text-[2.4cqw] -mt-[0.2cqw]">
              {{ stringUtil.attachComma(gameStore.selectedCharacter.character.meta.price) }}
            </span>
          </div>
        </div>
        <div
          v-if="gameStore.checkCharacter(gameStore.selectedCharacter)"
          class="mt-auto | flex items-center gap-[0.5cqw]">
          <button
            class="flex flex-col gap-[0.5cqw]"
            @click="emit('next', 'lobby')">
            <span
              v-t="'Back'"
              class="bg-blue-900 | px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
            </span>
          </button>
          <button
            class="flex flex-col gap-[0.5cqw]"
            @click="emit('next', 'store')">
            <span
              v-t="'Start'"
              class="bg-orange-700 | px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
            </span>
          </button>
        </div>
        <div
          v-else
          class="mt-auto | flex items-center gap-[0.5cqw]">
          <button
            class="flex flex-col gap-[0.5cqw]"
            :disabled="gameStore.selectedCharacter.character.meta.price > gameStore.currentMoney"
            @click="purchase">
            <span
              v-t="'Buy'"
              class="px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline"
              :class="{
                'bg-gray-700':
                  gameStore.selectedCharacter.character.meta.price > gameStore.currentMoney,
                'bg-orange-700':
                  gameStore.selectedCharacter.character.meta.price <= gameStore.currentMoney,
              }">
            </span>
          </button>
        </div>
      </div>
    </div>
  </BackgroundPattern>
</template>

<script setup lang="ts">
import type { Character, PurchaseCharacter } from "~/models/Character"

const emit = defineEmits<{
  (e: "next", scene: "lobby" | "store"): void
}>()

const gameStore = useGameStore()
const soundStore = useSoundStore()

const selectCharacter = (character?: typeof Character | PurchaseCharacter) => {
  if (character) gameStore.selectCharacter(character)
  soundStore.play("select")
}

const purchase = () => {
  if (gameStore.checkCharacter(gameStore.selectedCharacter)) return

  gameStore.setCurrentMoney(
    gameStore.currentMoney - gameStore.selectedCharacter.character.meta.price
  )

  gameStore.addCharacter()
  gameStore.selectCharacter(gameStore.selectedCharacter.character)

  soundStore.play("coin")
}
</script>
