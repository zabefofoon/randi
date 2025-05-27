<template>
  <BackgroundPattern>
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
                {{ i18n.t(purchaseItem.meta.name) }}
                <span
                  v-if="gameStore.purchasedItems[purchaseItem.meta.id]"
                  class="text-[1.2cqw]">
                  {{
                    i18n.t("HavePurchaseItem", {
                      length: gameStore.purchasedItems[purchaseItem.meta.id] || 0,
                    })
                  }}
                </span>
              </h4>
              <p
                v-t="purchaseItem.meta.description"
                class="text-[1.2cqw]"></p>
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
                  v-t="'UnusePurchase'"
                  class="text-outline text-[1.5cqw] font-bold"></p>
                <p
                  v-else
                  v-t="'UsePurchase'"
                  class="text-outline text-[1.5cqw] font-bold"></p>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-auto | flex items-center gap-[0.5cqw]">
          <button
            class="flex flex-col gap-[0.5cqw] | bg-blue-900 rounded-lg"
            @click="goPrev()">
            <span
              v-t="'Back'"
              class="px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
            </span>
          </button>
          <button
            class="flex flex-col gap-[0.5cqw]"
            @click="emit('next', 'inGame')">
            <span
              v-t="'Start'"
              class="bg-orange-700 | px-[2cqw] py-[0.5cqw] | border-black border-[0.2cqw] rounded-lg | text-[1.5cqw] font-bold text-outline">
            </span>
          </button>
        </div>
      </div>
    </div>
  </BackgroundPattern>
</template>

<script setup lang="ts">
import { PURCHASE_ITEMS, type PurchaseItem } from "~/models/PurchaseItem"

const emit = defineEmits<{
  (e: "next", scene: "select" | "inGame"): void
}>()

const i18n = useI18n()
const gameStore = useGameStore()
const soundStore = useSoundStore()
const purchase = (item: typeof PurchaseItem) => {
  gameStore.setCurrentMoney(gameStore.currentMoney - item.meta.price)
  gameStore.addPurchaseItem(item)

  soundStore.play("coin")
}

const togglePurchaseItem = (item: typeof PurchaseItem) => {
  gameStore.togglePurchaseItem(item)
  soundStore.play("select")
}

const goPrev = () => {
  PURCHASE_ITEMS.forEach((item) => {
    if (gameStore.checkSelectedPurchaseItem(item)) gameStore.addPurchaseItem(item)
  })
  emit("next", "select")
}

onMounted(() => {
  gameStore.selectedPurchaseItems = []
})
</script>
