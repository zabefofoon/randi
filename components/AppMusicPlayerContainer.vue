<template>
    <div
        v-click-outside="closeMusicPlayer"
        class="music-player">
        <div
            class="music-player-inner"
            @touchstart="musicPlayerTouchstartHandler($event)"
            @mousedown="musicPlayerTouchstartHandler($event)"
            @touchmove="musicPlayerTouchmoveHandler($event)"
            @mousemove="musicPlayerTouchmoveHandler($event)">
            <div
                ref="progressContainerEl"
                class="progress-container"
                @touchstart.stop="progressTouchstartHandler($event)"
                @mousedown.stop="progressMousedownHandler($event)">
                <div
                    ref="progressEl"
                    class="progress-active-track"
                    :style="{ width: progressWidth }"></div>
                <div class="progress-total-track"></div>
                <!-- 모바일 터치트랙의 hitbox -->
                <div class="progress-hitbox"></div>
                <!-- 모바일 터치트랙의 hitbox -->
            </div>
            <div class="info-container">
                <img
                    class="info-thumbnail"
                    :src="musicStore.musicToPlay?.thumbnail" />
                <div class="info-texts">
                    <h4 class="name">{{ musicStore.musicToPlay?.name }}</h4>
                    <p class="isrc">
                        {{ musicStore.musicToPlay?.isrc }}
                    </p>
                </div>
                <div
                    v-if="audioController"
                    class="info-times">
                    <template v-if="!isNaN(Number(audioController.duration))">
                        <span class="current">
                            {{ stringUtil.formatSeconds(audioController.currentTime) }}
                        </span>
                        <span class="indicator">/</span>
                        <span class="duration">
                            {{ stringUtil.formatSeconds(audioController.duration) }}
                        </span>
                    </template>
                    <UISpinner v-else />
                </div>
                <div
                    class="music-buttons"
                    @touchstart.stop.prevent
                    @mousedown.stop.prevent
                    @touchmove.stop.prevent
                    @mousemove.stop.prevent>
                    <button
                        v-if="['end', 'pause'].includes(musicStore.musicStatus)"
                        class="music-button"
                        @touchstart="audioController?.play()"
                        @mousedown="audioController?.play()">
                        <i class="icon icon-play"></i>
                    </button>
                    <button
                        v-else
                        class="music-button"
                        @touchstart="audioController?.pause()"
                        @mousedown="audioController?.pause()">
                        <i class="icon icon-pause"></i>
                    </button>
                </div>
            </div>
            <audio
                ref="audioController"
                :src="musicStore.musicToPlay?.music"
                hidden
                @timeupdate="timeUpdateHandler($event)"
                @play="musicStore.setMusicStatus('play')"
                @ended="musicEndedHandler()"
                @pause="musicStore.setMusicStatus('pause')">
                <source type="audio/mpeg" />
            </audio>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        MIN_MUSIC_ADJUSTING_PROGRESS,
        MIN_MUSIC_SWIPE_X,
        MIN_MUSIC_SWIPE_Y,
        SCREEN_SIZE_LAPTOP,
    } from "~/const"
    import type { Coordinates } from "~/models/UI"

    const musicStore = useMusicStore()

    const audioController = ref<HTMLAudioElement>()
    const progressEl = ref<HTMLDivElement>()
    const progressContainerEl = ref<HTMLDivElement>()

    const progress = ref(0)
    const isAdjustStart = ref(false)
    const isAdjusting = ref(false)
    const adjustedProgress = ref(0)
    const startProgressWidth = ref(0)
    const startTouchX = ref(0)
    const startTouchY = ref(0)

    let adjustTimer: NodeJS.Timeout

    const progressWidth = computed<string>(() => {
        return isAdjustStart.value
            ? stringUtil.convertToPercent(adjustedProgress.value)
            : stringUtil.convertToPercent(progress.value)
    })

    const timeUpdateHandler = (event: Event): void => {
        const audioEl = event.target as HTMLAudioElement
        progress.value = audioEl.currentTime / (audioEl.duration || 0)
    }

    const progressMousedownHandler = (event: MouseEvent): void => {
        if (progressContainerEl.value == null) return
        if (audioController.value == null) return

        audioController.value.pause()

        isAdjustStart.value = true
        startTouchX.value = event.clientX

        const ratio = event.offsetX / progressContainerEl.value.offsetWidth
        adjust(ratio)
    }

    const progressTouchstartHandler = (event: TouchEvent): void => {
        if (progressEl.value == null) return
        if (progressContainerEl.value == null) return
        if (audioController.value == null) return

        audioController.value.pause()

        isAdjustStart.value = true
        startTouchX.value = getClientCoordinates(event).x

        const ratio = startTouchX.value / progressContainerEl.value.offsetWidth
        adjust(ratio)
    }

    const musicPlayerTouchstartHandler = (event: MouseEvent | TouchEvent): void => {
        if (progressEl.value == null) return
        if (progressContainerEl.value == null) return
        if (audioController.value == null) return

        startTouchX.value = getClientCoordinates(event).x
        startTouchY.value = getClientCoordinates(event).y

        const offsetX = progressEl.value.offsetLeft + progressEl.value.offsetWidth
        const ratio = offsetX / progressContainerEl.value.offsetWidth
        adjust(ratio)
    }

    const musicPlayerTouchmoveHandler = (event: MouseEvent | TouchEvent): void => {
        if (isAdjusting.value) return
        if (event instanceof MouseEvent && event.buttons === 0) return
        if (audioController.value == null) return

        audioController.value.pause()

        const clientX = getClientCoordinates(event).x
        const clientY = getClientCoordinates(event).y

        const diffClientX = clientX - startTouchX.value
        const diffClientY = clientY - startTouchY.value

        if (Math.abs(diffClientX) >= MIN_MUSIC_SWIPE_X) isAdjustStart.value = true
        if (Math.abs(diffClientX) < MIN_MUSIC_SWIPE_X && diffClientY > MIN_MUSIC_SWIPE_Y) {
            musicStore.deleteMusicToPlay()
        }
    }

    const windowMousemoveHandler = (event: MouseEvent | TouchEvent): void => {
        if (!isAdjustStart.value) return
        if (progressContainerEl.value == null) return
        if (audioController.value == null) return

        const clientX = getClientCoordinates(event).x

        audioController.value.pause()

        const parentWidth = progressContainerEl.value.offsetWidth
        const calculated = startProgressWidth.value + clientX - startTouchX.value
        const clamped = numberUtil.clamp(calculated, 0, parentWidth)
        const ratio = clamped / parentWidth

        adjust(ratio, false)
    }

    const windowMouseupHandler = (event: MouseEvent | TouchEvent): void => {
        if (!isAdjustStart.value) return

        const clientX = getClientCoordinates(event).x

        if (adjustTimer != null) clearTimeout(adjustTimer)
        adjustTimer = setTimeout(() => {
            isAdjustStart.value = false
            isAdjusting.value = false
            if (clientX <= SCREEN_SIZE_LAPTOP) audioController.value?.play()
        })
    }

    const musicEndedHandler = (): void => {
        isAdjustStart.value = false
        isAdjusting.value = false
        musicStore.setMusicStatus("end")
    }

    const closeMusicPlayer = (): void => {
        if (isAdjustStart.value) return
        if (musicStore.musicStatus === "play") return

        musicStore.deleteMusicToPlay()
    }

    const adjust = (ratio: number, setStartProgressWidth = true): void => {
        if (progressContainerEl.value == null) return
        if (audioController.value == null) return

        adjustedProgress.value = ratio
        audioController.value.currentTime = audioController.value.duration * ratio

        if (setStartProgressWidth) {
            startProgressWidth.value = progressContainerEl.value.offsetWidth * ratio
        }
    }

    const getClientCoordinates = (event: MouseEvent | TouchEvent): Coordinates => {
        return event instanceof MouseEvent
            ? { x: event.clientX, y: event.clientY }
            : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
    }

    onMounted(() => {
        audioController.value?.play()
        musicStore.setMusicStatus("play")

        window.addEventListener("mousemove", windowMousemoveHandler)
        window.addEventListener("touchmove", windowMousemoveHandler)
        window.addEventListener("mouseup", windowMouseupHandler)
        window.addEventListener("touchend", windowMouseupHandler)
        document.body.classList.add("prevent-drag")
    })

    onBeforeUnmount(() => {
        window.removeEventListener("mousemove", windowMousemoveHandler)
        window.removeEventListener("touchmove", windowMousemoveHandler)
        window.removeEventListener("mouseup", windowMouseupHandler)
        window.removeEventListener("touchend", windowMouseupHandler)
        document.body.classList.remove("prevent-drag")
    })

    watch(
        () => musicStore.musicToPlay?.isrc,
        async () => {
            adjustedProgress.value = 0
            progress.value = 0
            audioController.value?.pause()
            await etcUtil.sleep(100)
            audioController.value?.play()
            isAdjusting.value = false
        }
    )

    watch(adjustedProgress, (newProgress, oldProgress) => {
        if (Math.abs(newProgress - oldProgress) > MIN_MUSIC_ADJUSTING_PROGRESS) {
            isAdjusting.value = true
        }
    })
</script>

<style lang="scss" scoped>
    .music-player {
        position: fixed;
        bottom: 0;
        width: 100%;
        touch-action: none;

        .music-player-inner {
            position: relative;
            bottom: 0;
            left: 50%;
            z-index: 30;
            width: 100%;
            max-width: 1100px;
            overflow: hidden;
            background: white;
            border-radius: 10px 10px 0 0;
            box-shadow: 0 5px 10px #ccc;
            transform: translate(-50%);

            .progress-container {
                position: relative;
                height: 2px;
                cursor: pointer;
                transition: all 300ms ease;

                &:hover {
                    height: 8px;
                }

                .progress-active-track {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: red;
                    will-change: width;
                }

                .progress-total-track {
                    height: 100%;
                    background: white;
                }

                .progress-hitbox {
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    height: 16px;
                    transform: translateY(-50%);
                }
            }

            .info-container {
                display: flex;
                align-items: center;
                padding-right: 16px;

                .info-thumbnail {
                    width: 58px;
                    aspect-ratio: 1;
                    object-fit: cover;
                }

                .info-texts {
                    padding: 0 11.5px;

                    .name {
                        font-size: 14px;
                    }

                    .isrc {
                        font-size: 13px;
                    }
                }

                .info-times {
                    margin-left: auto;
                    pointer-events: none;

                    .current {
                        font-size: 13px;
                    }

                    .indicator {
                        padding: 0 4px;
                        font-size: 13px;
                    }

                    .duration {
                        font-size: 13px;
                        color: gray;
                    }
                }

                .music-buttons {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    margin-left: auto;

                    .music-button {
                        font-size: 20px;
                        line-height: 0;
                        color: black;
                    }
                }
            }
        }
    }
</style>
