import store from "store2"
import { LOCAL_CHARACTERS, LOCAL_ITEMS, LOCAL_MONEY } from "~/const"
import {
  NylonMask,
  PurchaseCharacter,
  RELEASED_CHARACTERS,
  type Character,
} from "~/models/Character"
import type { PurchaseItem, PurchasedItem } from "~/models/PurchaseItem"
import type { Rewords } from "~/models/Rewords"

export const useGameStore = defineStore("gameStore", () => {
  const rewords = ref<Rewords>({
    rounds: 0,
    killed: 0,
    materials: 0,
    weapons: 0,
    coins: 0,
    enforces: 0,
    gamblings: 0,
  })

  const setRewords = (data: Rewords) => {
    rewords.value = data
  }

  const characters = ref<(typeof Character | PurchaseCharacter | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ])
  const selectedCharacter = ref<typeof Character | PurchaseCharacter>(NylonMask)
  const selectedCharacterIndex = computed(() =>
    characters.value.findIndex((item) => item === selectedCharacter.value)
  )
  const selectCharacter = (character: typeof Character | PurchaseCharacter) => {
    selectedCharacter.value = character
  }
  const checkCharacter = (item?: typeof Character | PurchaseCharacter): item is typeof Character =>
    item?.type === "character"

  const initCharacters = () => {
    const savedCharacters = store.get(LOCAL_CHARACTERS) ?? ["nylonMask"]

    RELEASED_CHARACTERS.forEach((releasedCharacter, index) => {
      characters.value[index] = savedCharacters.includes(releasedCharacter.meta.id)
        ? releasedCharacter
        : PurchaseCharacter.of(releasedCharacter)
    })
  }
  const addCharacter = () => {
    if (checkCharacter(selectedCharacter.value)) return

    const savedCharacters = store.get(LOCAL_CHARACTERS) ?? ["nylonMask"]

    savedCharacters[selectedCharacterIndex.value] = selectedCharacter.value.character.meta.id
    store.set(LOCAL_CHARACTERS, savedCharacters)
    characters.value[selectedCharacterIndex.value] = selectedCharacter.value.character
  }

  const currentMoney = ref(0)
  const setCurrentMoney = (money: number) => {
    currentMoney.value = money
    store.set(LOCAL_MONEY, currentMoney.value)
  }
  const initMoney = () => {
    currentMoney.value = store.get(LOCAL_MONEY) ?? 0
  }

  const purchasedItems = ref<PurchasedItem>({})
  const initPurchasedItems = () => {
    purchasedItems.value = store.get(LOCAL_ITEMS) ?? {}
  }
  const addPurchaseItem = (item: typeof PurchaseItem) => {
    if (!purchasedItems.value[item.meta.id]) purchasedItems.value[item.meta.id] = 1
    else purchasedItems.value[item.meta.id]++

    store.set(LOCAL_ITEMS, purchasedItems.value)
  }
  const spendPurchaseItem = (item: typeof PurchaseItem) => {
    if (!purchasedItems.value[item.meta.id]) purchasedItems.value[item.meta.id] = 0
    else purchasedItems.value[item.meta.id]--

    store.set(LOCAL_ITEMS, purchasedItems.value)
  }

  const selectedPurchaseItems = ref<string[]>([])
  const togglePurchaseItem = (item: typeof PurchaseItem) => {
    const isHave = checkSelectedPurchaseItem(item)
    isHave ? deselectPurchaseItem(item) : selectPurchaseItem(item)
    return isHave
  }
  const selectPurchaseItem = (item: typeof PurchaseItem) => {
    selectedPurchaseItems.value.push(item.meta.id)
  }
  const deselectPurchaseItem = (item: typeof PurchaseItem) => {
    const found = selectedPurchaseItems.value.findIndex((id) => id === item.meta.id)
    selectedPurchaseItems.value.splice(found, 1)
  }
  const checkSelectedPurchaseItem = (item: typeof PurchaseItem) => {
    return selectedPurchaseItems.value.includes(item.meta.id)
  }

  return {
    rewords,
    setRewords,
    characters,
    selectedCharacter,
    selectedCharacterIndex,
    selectCharacter,
    addCharacter,
    checkCharacter,
    initCharacters,

    currentMoney,
    setCurrentMoney,
    initMoney,

    purchasedItems,
    initPurchasedItems,
    addPurchaseItem,

    selectedPurchaseItems,
    togglePurchaseItem,
    selectPurchaseItem,
    deselectPurchaseItem,
    checkSelectedPurchaseItem,
    spendPurchaseItem,
  }
})
