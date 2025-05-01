<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <div
      class="content | relative | grid place-items-center | aspect-video max-w-full max-h-full | text-white overflow-hidden">
      <div class="pattern | absolute top-0 left-0 z-[0] | w-full h-full | opacity-40"></div>
      <div class="absolute right-[1cqw] top-[1cqw] | flex items-center">
        <div
          class="stat-sprites | w-[2.5cqw] aspect-square"
          :style="{
            backgroundPosition: etcUtil.getSpritePosition(11),
          }"></div>
        <span class="text-outline font-bold text-[1.5cqw] -mt-[0.2cqw]">
          {{ stringUtil.attachComma(gameStore.currentMoney) }}
        </span>
      </div>
      <div class="flex gap-[1cqw] | relative z-[1] | w-3/4 h-4/5 overflow-hidden">
        <div
          class="w-full h-full | flex flex-col items-center gap-[1cqw] | p-[1cqw] | bg-blue-950 | rounded-lg border-black border-[0.2cqw]">
          <div class="w-full | grid grid-cols-1 gap-[0.5cqw] | overflow-auto">
            <div
              v-for="purchaseItem in PURCHASE_ITEMS"
              :key="purchaseItem.meta.id"
              class="w-full | border-black border-[0.2cqw] rounded-lg | flex items-center gap-[1.5cqw] | pr-[1.2cqw]">
              <div class="h-[6cqw] | bg-purple-500 | border-black border-r-[0.2cqw] rounded-lg">
                <div
                  class="purchase-sprites | w-[6cqw] aspect-square shrink-0"
                  :style="{
                    backgroundPosition: etcUtil.getPurchaseSpritePosition(
                      purchaseItem.meta.spriteIndex
                    ),
                  }"></div>
              </div>

              <div class="w-full font-bold text-outline">
                <h4 class="text-[1.5cqw]">
                  {{ purchaseItem.meta.name }}
                </h4>
                <p class="text-[1.2cqw]">
                  {{ purchaseItem.meta.description }}
                  ({{ gameStore.purchasedItems[purchaseItem.meta.id] || 0 }}개 소지중)
                </p>
              </div>
              <div class="flex gap-[0.5cqw]">
                <button
                  class="shrink-0 w-[10cqw] | flex justify-center items-center | pr-[1cqw] py-[0.3cqw] | border-black border-[0.2cqw] rounded-lg"
                  :class="{
                    'bg-gray-700': purchaseItem.meta.price > gameStore.currentMoney,
                    'bg-orange-700': purchaseItem.meta.price <= gameStore.currentMoney,
                  }"
                  :disabled="purchaseItem.meta.price > gameStore.currentMoney"
                  @click="purchase(purchaseItem)">
                  <div
                    class="stat-sprites | w-[2.5cqw] aspect-square shrink-0"
                    :style="{
                      backgroundPosition: etcUtil.getSpritePosition(11),
                    }"></div>
                  <p class="text-outline text-[1.5cqw] font-bold">
                    {{ stringUtil.attachComma(purchaseItem.meta.price) }}
                  </p>
                </button>
                <button
                  class="shrink-0 w-[10cqw] | flex justify-center items-center | py-[0.3cqw] | border-black border-[0.2cqw] rounded-lg"
                  :class="{
                    'bg-gray-700': !gameStore.purchasedItems[purchaseItem.meta.id],
                    'bg-green-700':
                      !gameStore.checkSelectedPurchaseItem(purchaseItem) &&
                      gameStore.purchasedItems[purchaseItem.meta.id] > 0,
                    '!bg-blue-900': gameStore.checkSelectedPurchaseItem(purchaseItem),
                  }"
                  :disabled="
                    !gameStore.purchasedItems[purchaseItem.meta.id] &&
                    !gameStore.checkSelectedPurchaseItem(purchaseItem)
                  "
                  @click="togglePurchaseItem(purchaseItem)">
                  <p
                    v-if="gameStore.checkSelectedPurchaseItem(purchaseItem)"
                    class="text-outline text-[1.5cqw] font-bold">
                    해제하기
                  </p>
                  <p
                    v-else
                    class="text-outline text-[1.5cqw] font-bold">
                    사용하기
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-auto | flex items-center gap-[0.5cqw]">
            <button
              class="flex flex-col gap-[0.5cqw] | bg-blue-900 rounded-lg"
              @click="emit('next', 'select')">
              <span
                class="px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
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
import { PURCHASE_ITEMS, type PurchaseItem } from "~/models/PurchaseItem"

const emit = defineEmits<{
  (e: "next", scene: "select" | "inGame"): void
}>()
const nuxt = useNuxtApp()
const gameStore = useGameStore()

const purchase = (item: typeof PurchaseItem) => {
  gameStore.setCurrentMoney(gameStore.currentMoney - item.meta.price)
  gameStore.addPurchaseItem(item)

  nuxt.$sound.play("coin")
}

const togglePurchaseItem = (item: typeof PurchaseItem) => {
  const isUse = gameStore.togglePurchaseItem(item)
  if (isUse) gameStore.addPurchaseItem(item)
  else gameStore.spendPurchaseItem(item)
  nuxt.$sound.play("select")
}

onMounted(() => {
  gameStore.selectedPurchaseItems = []
})
</script>

<style lang="scss" scoped>
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
</style>
