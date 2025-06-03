import store from "store2"
import {
  LOCAL_CHARACTERS,
  LOCAL_COLLECTION,
  LOCAL_ITEMS,
  LOCAL_MONEY,
  STEP_TUTORIAL,
} from "~/const"
import {
  NylonMask,
  PurchaseCharacter,
  RELEASED_CHARACTERS,
  type Character,
} from "~/models/Character"
import type { PurchaseItem, PurchasedItem } from "~/models/PurchaseItem"
import type { Rewords } from "~/models/Rewords"

export const useGameStore = defineStore("gameStore", () => {
  const route = useRoute()
  const { encrypted, decrypted } = useCrypto()

  const mode = ref<"demo" | "ios" | "android" | "dev">("dev")
  const setMode = (value: "demo" | "ios" | "android" | "dev") => {
    mode.value = value
  }

  const rewords = ref<Rewords>({
    rounds: 0,
    killed: 0,
    materials: 0,
    weapons: 0,
    coins: 0,
    enforces: 0,
    gamblings: 0,
    isClear: 0,
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
    const savedCharacters = store.get(LOCAL_CHARACTERS)
      ? JSON.parse(decrypted(store.get(LOCAL_CHARACTERS)) || '["nylonMask"]')
      : ["nylonMask"]

    const savedCharactersArr =
      typeof savedCharacters === "object" ? Object.values(savedCharacters) : savedCharacters

    if (savedCharactersArr[0] !== "nylonMask") savedCharactersArr.unshift("nylonMask")

    RELEASED_CHARACTERS.forEach((releasedCharacter, index) => {
      characters.value[index] = savedCharactersArr.includes(releasedCharacter.meta.id)
        ? releasedCharacter
        : PurchaseCharacter.of(releasedCharacter)
    })
  }
  const addCharacter = () => {
    if (checkCharacter(selectedCharacter.value)) return

    const savedCharacters = store.get(LOCAL_CHARACTERS)
      ? JSON.parse(decrypted(store.get(LOCAL_CHARACTERS)) || "{}")
      : ["nylonMask"]

    savedCharacters[selectedCharacterIndex.value] = selectedCharacter.value.character.meta.id
    store.set(LOCAL_CHARACTERS, encrypted(JSON.stringify(savedCharacters)))
    characters.value[selectedCharacterIndex.value] = selectedCharacter.value.character
  }

  const currentMoney = ref(0)
  const setCurrentMoney = (money: number) => {
    currentMoney.value = money
    store.set(LOCAL_MONEY, encrypted(`${currentMoney.value}`))
  }
  const initMoney = () => {
    currentMoney.value = store.get(LOCAL_MONEY) ? +decrypted(store.get(LOCAL_MONEY)) || 0 : 0
  }

  const purchasedItems = ref<PurchasedItem>({})
  const initPurchasedItems = () => {
    purchasedItems.value = store.get(LOCAL_ITEMS)
      ? JSON.parse(decrypted(store.get(LOCAL_ITEMS)) || "{}")
      : {}
  }
  const addPurchaseItem = (item: typeof PurchaseItem) => {
    if (!purchasedItems.value[item.meta.id]) purchasedItems.value[item.meta.id] = 1
    else purchasedItems.value[item.meta.id]++

    store.set(LOCAL_ITEMS, encrypted(JSON.stringify(purchasedItems.value)))
  }
  const spendPurchaseItem = (item: typeof PurchaseItem) => {
    if (!purchasedItems.value[item.meta.id]) purchasedItems.value[item.meta.id] = 0
    else purchasedItems.value[item.meta.id]--

    store.set(LOCAL_ITEMS, encrypted(JSON.stringify(purchasedItems.value)))
  }

  const selectedPurchaseItems = ref<string[]>([])
  const togglePurchaseItem = (item: typeof PurchaseItem) => {
    const isHave = checkSelectedPurchaseItem(item)
    if (isHave) deselectPurchaseItem(item)
    else selectPurchaseItem(item)
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

  const collection = ref<string[]>([])
  const initCollection = () => {
    collection.value = store.get(LOCAL_COLLECTION)
      ? JSON.parse(decrypted(store.get(LOCAL_COLLECTION)) || "[]") || []
      : []
  }
  const addCollection = (weaponName: string) => {
    if (checkHasCollection(weaponName)) return

    collection.value.push(weaponName)
    store.set(LOCAL_COLLECTION, encrypted(JSON.stringify(collection.value)))
  }

  const checkHasCollection = (weaponName: string) => {
    if (route.query.d === "1") return true
    return collection.value.includes(weaponName)
  }

  const isShowStepTutorial = ref(false)
  const initShowStepTutorial = () => {
    isShowStepTutorial.value = store.get(STEP_TUTORIAL) ?? true
  }
  const setShowStepTutorial = (value: boolean) => {
    isShowStepTutorial.value = value

    store.set(STEP_TUTORIAL, value)
  }

  return {
    mode,
    setMode,

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

    collection,
    initCollection,
    addCollection,
    checkHasCollection,

    isShowStepTutorial,
    initShowStepTutorial,
    setShowStepTutorial,
  }
})
