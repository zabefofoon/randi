interface SoundInstanceMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useSoundStore = defineStore("sound", () => {
  const nuxt = useNuxtApp()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bgmInstance = ref<any>()

  const instances: SoundInstanceMap = {}

  const preloadSounds = () => {
    nuxt.$sound.registerSound("assets/sounds/game_bgm.mp3", "bgm")
    nuxt.$sound.registerSound("assets/sounds/door.mp3", "door")
    nuxt.$sound.registerSound("assets/sounds/coin.mp3", "coin")
    nuxt.$sound.registerSound("assets/sounds/select.mp3", "select")
    nuxt.$sound.registerSound("assets/sounds/equip.mp3", "equip")
    nuxt.$sound.registerSound("assets/sounds/stat.mp3", "stat")
    nuxt.$sound.registerSound("assets/sounds/gun.mp3", "gun")
    nuxt.$sound.registerSound("assets/sounds/knife.mp3", "knife")
    nuxt.$sound.registerSound("assets/sounds/book.mp3", "book")
    nuxt.$sound.registerSound("assets/sounds/ring.mp3", "ring")
    nuxt.$sound.registerSound("assets/sounds/attacked.mp3", "attacked")
    nuxt.$sound.registerSound("assets/sounds/weapons.mp3", "weapons")
    nuxt.$sound.registerSound("assets/sounds/round.mp3", "round")

    prepareInstances("bgm", 5)
    prepareInstances("door", 3)
    prepareInstances("coin", 8)
    prepareInstances("select", 3)
    prepareInstances("equip", 3)
    prepareInstances("stat", 3)
    prepareInstances("gun", 8)
    prepareInstances("knife", 8)
    prepareInstances("book", 8)
    prepareInstances("ring", 8)
    prepareInstances("attacked", 3)
    prepareInstances("weapons", 3)
    prepareInstances("round", 3)
  }

  const prepareInstances = (id: string, count = 5) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handle = (event: any) => {
      if (event.id === id) {
        instances[id] = Array.from({ length: count }).map(() => nuxt.$sound.createInstance(id))
        nuxt.$sound.off("fileload", handle)
      }
    }

    nuxt.$sound.on("fileload", handle)
  }

  const play = (id: string) => {
    if (!instances[id]?.length) prepareInstances(id)

    const instance = instances[id].find((ins) => !ins.playState || ins.playState === "finished")

    if (instance) instance.play()
    else nuxt.$sound.play(id)
  }

  const playBGM = (id: string, volume = 0.5) => {
    if (bgmInstance.value) bgmInstance.value.stop()
    bgmInstance.value = nuxt.$sound.play(id, { loop: -1, volume })
  }

  const stopBGM = () => {
    bgmInstance.value?.stop()
    bgmInstance.value = undefined
  }

  return {
    preloadSounds,
    prepareInstances,
    play,
    stop,

    playBGM,
    stopBGM,
  }
})
