import { NylonMask, type Character, type PurchaseCharacter } from "~/models/Character"
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
  const selectedCharacterIndex = computed(() => {
    return characters.value.findIndex((item) => item === selectedCharacter.value)
  })
  const selectCharacter = (character: typeof Character | PurchaseCharacter) => {
    selectedCharacter.value = character
  }

  const checkCharacter = (
    item?: typeof Character | PurchaseCharacter
  ): item is typeof Character => {
    return item?.type === "character"
  }

  return {
    rewords,
    setRewords,
    characters,
    selectedCharacter,
    selectedCharacterIndex,
    selectCharacter,
    checkCharacter,
  }
})
