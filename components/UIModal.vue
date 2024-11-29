<template>
    <div
        ref="popupEl"
        class="popup">
        <div
            class="dim"
            :style="{ pointerEvents: enableDimClickClose ? 'auto' : 'none' }"
            @click="dimClickClose()"></div>
        <div
            ref="innerEl"
            class="transition-inner inner"
            :class="[innerClass]">
            <div
                class="title"
                :class="[titleClass]">
                <slot name="title"></slot>
                <template v-if="!hideCloseButton">
                    <slot name="close">
                        <button
                            class="close-button"
                            @click="emit('close')">
                            <i class="icon icon-close"></i>
                        </button>
                    </slot>
                </template>
            </div>
            <div
                class="content-wrap"
                :class="contentWrapClass">
                <div class="content">
                    <slot name="content" />
                </div>
            </div>
            <div class="buttons">
                <slot name="buttons" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        innerClass?: string | string[]
        contentWrapClass?: string | string[]
        titleClass?: string | string[]
        enableDimClickClose?: boolean
        hideCloseButton?: boolean
    }>()

    const emit = defineEmits<{
        (e: "close"): void
    }>()

    const route = useRoute()

    const popupEl = ref<HTMLDivElement>()
    const innerEl = ref<HTMLDivElement>()

    onMounted(() => {
        document.body.classList.add("scroll-lock")
    })

    onBeforeUnmount(() => {
        document.body.classList.remove("scroll-lock")
    })

    const dimClickClose = (): void => {
        if (props.enableDimClickClose) emit("close")
    }

    watch(
        () => route.path,
        () => emit("close")
    )

    defineExpose({
        innerEl,
        popupEl,
    })
</script>

<style lang="scss" scoped>
    .popup {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 15000;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        height: 100dvh;
        overflow: auto;

        @include global.mobile {
            overflow: unset;
        }

        .dim {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(0 0 0 / 50%);
        }

        .inner {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            width: calc(100% - 32px);
            max-width: 500px;
            padding: 40px;
            margin: 100px auto;
            background: white;
            border-radius: 10px;

            @include global.mobile {
                position: absolute;
                top: 50%;
                left: 50%;
                padding: 16px;
                margin: 0;
                transform: translate(-50%, -50%);
            }

            .title {
                position: relative;
                margin-bottom: 30px;
                font-size: 32px;
                font-weight: bold;

                @include global.mobile {
                    padding: 0 16px;
                }

                .close-button {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    height: fit-content;
                    padding: 12px;
                    color: black;
                    border-radius: 9999px;
                    @include global.mobile {
                        right: 0;
                    }

                    .close-image {
                        width: 12px;
                        height: 12px;
                    }
                }

                @include global.mobile {
                    margin-bottom: 20px;
                    font-size: 25px;
                }
            }

            .content-wrap {
                height: 100%;
                overflow: auto;

                @include global.mobile {
                    padding: 0 16px 40px;
                }

                .content {
                    margin-bottom: 20px;
                    font-size: 14px;
                }
            }

            .buttons {
                display: flex;
                gap: 10px;
                width: 100%;
            }
        }
    }
</style>
