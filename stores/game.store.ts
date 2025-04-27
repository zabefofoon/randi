import { NylonMask, TrunkKing, type Character } from "~/models/Character"
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

  const characters = ref<(typeof Character | undefined)[]>([
    NylonMask,
    TrunkKing,
    undefined,
    undefined,
  ])
  const selectedCharacter = ref<typeof Character>(NylonMask)
  const selectCharacter = (character: typeof Character) => {
    selectedCharacter.value = character
  }

  return { rewords, setRewords, characters, selectedCharacter, selectCharacter }
})
