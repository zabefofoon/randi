import type { Rewords } from "~/models/Rewords"

export const useRewordsStore = defineStore("rewordsStore", () => {
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

  return { rewords, setRewords }
})
