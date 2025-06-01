import store from "store2"
import { LOCAL_SOUND_BGM, LOCAL_SOUND_EFFECT } from "~/const"

interface SoundInstanceMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const useSoundStore = defineStore("sound", () => {
  const nuxt = useNuxtApp()

  const useBGMSound = ref(true)
  const useEffectSound = ref(true)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bgmInstance = ref<any>()

  const instances: SoundInstanceMap = {}

  const preloadSounds = () => {
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/game_bgm.mp3`, "bgm")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/door.mp3`, "door")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/coin.mp3`, "coin")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/select.mp3`, "select")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/equip.mp3`, "equip")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/stat.mp3`, "stat")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/gun.mp3`, "gun")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/knife.mp3`, "knife")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/book.mp3`, "book")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/ring.mp3`, "ring")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/attacked.mp3`, "attacked")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/weapons.mp3`, "weapons")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/round.mp3`, "round")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/thunder.mp3`, "thunder")
    nuxt.$sound.registerSound(`${useAssetBase()}assets/sounds/beam.mp3`, "beam")

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
    prepareInstances("thunder", 3)
    prepareInstances("beam", 3)
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
    if (!useEffectSound.value) return

    // 풀 초기화
    if (!instances[id]) instances[id] = []

    // 사용 가능한 인스턴스 찾기
    let instance = instances[id].find((ins) => !ins.playState || ins.playState === "finished")

    // 없으면 새로 만들어서 풀에 push
    if (!instance) {
      instance = nuxt.$sound.createInstance(id)
      instances[id].push(instance)
    }

    // 현재 음효 설정에 맞춰 볼륨
    instance.volume = 1
    instance.play()
  }

  const playBGM = (id: string, volume = 0.5) => {
    if (bgmInstance.value) bgmInstance.value.stop()
    bgmInstance.value = nuxt.$sound.play(id, { loop: -1, volume })
  }

  const stopBGM = () => {
    bgmInstance.value?.stop()
    bgmInstance.value = undefined
  }

  const toggleBGM = () => {
    useBGMSound.value = !useBGMSound.value
    store.set(LOCAL_SOUND_BGM, useBGMSound.value)
    if (bgmInstance.value?.volume == null) return

    if (useBGMSound.value) bgmInstance.value.volume = 0.1
    else bgmInstance.value.volume = 0.001
  }

  const toggleEffect = () => {
    useEffectSound.value = !useEffectSound.value
    store.set(LOCAL_SOUND_EFFECT, useEffectSound.value)
    Object.values(instances)
      .flat()
      .forEach((instance) => {
        if (useEffectSound.value) instance.volume = 1
        else instance.volume = 0
      })
  }

  const initSounds = () => {
    useBGMSound.value = store.get(LOCAL_SOUND_BGM) ?? true
    useEffectSound.value = store.get(LOCAL_SOUND_EFFECT) ?? true
  }

  return {
    instances,
    preloadSounds,
    prepareInstances,
    play,
    stop,

    playBGM,
    stopBGM,

    useBGMSound,
    useEffectSound,

    toggleBGM,
    toggleEffect,

    initSounds,
  }
})
