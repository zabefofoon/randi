import type { MusicStatus, PlayableMusic } from "~/models/UI"

export const useMusicStore = defineStore("musicPlayer", () => {
    const musicToPlay = ref<PlayableMusic>()
    const addMusicToPlay = (music: PlayableMusic): void => {
        musicToPlay.value = music
    }
    const deleteMusicToPlay = (): void => {
        musicToPlay.value = undefined
    }

    const musicStatus = ref<MusicStatus>("pause")
    const setMusicStatus = (value: MusicStatus): void => {
        musicStatus.value = value
    }

    const favoritedMusics = ref<PlayableMusic[]>([])
    const addFavoritedMusics = (music: PlayableMusic): void => {
        favoritedMusics.value.unshift(music)
    }

    return {
        musicToPlay,
        addMusicToPlay,
        deleteMusicToPlay,

        musicStatus,
        setMusicStatus,

        favoritedMusics,
        addFavoritedMusics,
    }
})
