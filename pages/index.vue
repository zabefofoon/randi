<template>
    <main class="main">
        <Transition name="modal">
            <BasicModal
                v-if="isShowBasicModal"
                @close="showBasicModal(false)" />
        </Transition>

        <section class="area">
            <h2 class="title">I18n({{ i18n.locale.value }})</h2>
            <div class="buttons-container">
                <button
                    class="button"
                    @click="toggleLocale()">
                    {{ i18n.t("change.lang") }}
                </button>
            </div>
        </section>

        <section class="area">
            <h2 class="title">Snackbars</h2>
            <div class="buttons-container">
                <button
                    class="button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'success' })
                    ">
                    Success
                </button>
                <button
                    class="button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarInfo', type: 'info' })
                    ">
                    Info
                </button>
                <button
                    class="button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'warn' })
                    ">
                    Warn
                </button>
                <button
                    class="button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarError', type: 'error' })
                    ">
                    Error
                </button>
            </div>
        </section>

        <section class="area">
            <h2 class="title">UIPopup</h2>
            <div class="buttons-container">
                <button
                    class="button"
                    @click="showBasicModal(true)">
                    Open Modal
                </button>
            </div>
        </section>

        <section class="area">
            <h2 class="title">UIDropdown</h2>
            <div class="buttons-container">
                <UIDropdown>
                    <template #button="{ showOptions }">
                        <button
                            class="button"
                            @click="showOptions()">
                            button
                        </button>
                    </template>
                    <template #options>
                        <div class="dropdown-options">options</div>
                    </template>
                </UIDropdown>
            </div>
        </section>

        <section class="area">
            <h2 class="title">UIFoldable</h2>
            <UIFolderable
                class="folderable"
                :model-value="true">
                <template #title="{ expand, isExpanded }">
                    <button
                        class="expand-button"
                        @click="expand()">
                        <span class="expand-button-title">
                            <template v-if="!isExpanded">Expand more</template>
                            <template v-else>Expand less</template>
                        </span>
                        <i
                            class="icon icon-arrow-down | text-2xl"
                            :style="{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            }"></i>
                    </button>
                </template>
                <template #content>
                    <ul class="folderable-contents">
                        <li class="folderable-contents-item">list1</li>
                        <li class="folderable-contents-item">list2</li>
                        <li class="folderable-contents-item">list3</li>
                    </ul>
                </template>
            </UIFolderable>
        </section>

        <section class="area">
            <h2 class="title">MusicPlayer</h2>
            <div class="buttons-container">
                <button
                    class="button"
                    @click="
                        musicStore.addMusicToPlay({
                            isrc: 'isrc1',
                            music: 'https://cdn.zzal.studio/studioassets/musics/aicompany/KRMIM2472434.mp3',
                            thumbnail: '',
                            name: 'music1',
                        })
                    ">
                    Music1
                    <template v-if="musicStore.musicToPlay?.isrc === 'isrc1'">
                        {{ musicStore.musicStatus }}
                    </template>
                </button>
                <button
                    class="button"
                    @click="
                        musicStore.addMusicToPlay({
                            isrc: 'isrc2',
                            music: 'https://cdn.zzal.studio/studioassets/musics/aicompany/KRMIM2472435.mp3',
                            thumbnail: '',
                            name: 'music2',
                        })
                    ">
                    Music2
                    <template v-if="musicStore.musicToPlay?.isrc === 'isrc2'">
                        {{ musicStore.musicStatus }}
                    </template>
                </button>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { I18N_COOKIE, I18N_COOKIE_MAX_AGE } from "~/const"

    const route = useRoute()
    const snackbarStore = useSnackbarStore()
    const musicStore = useMusicStore()
    const i18n = useI18n()

    const isShowBasicModal = ref(false)
    const showBasicModal = (value = false): void => {
        // INFO query[key] 추가시, filterModal.middleware에 추가
        navigateTo({
            path: route.path,
            query: { ...route.query, basicModal: value ? `${value}` : undefined },
            replace: value === false,
        })
    }

    const toggleLocale = (): void => {
        if (i18n.locale.value === "ko") {
            i18n.setLocale("en")
            useCookie(I18N_COOKIE, { maxAge: I18N_COOKIE_MAX_AGE }).value = "en"
        } else {
            i18n.setLocale("ko")
            useCookie(I18N_COOKIE, { maxAge: I18N_COOKIE_MAX_AGE }).value = "ko"
        }
    }

    watch(
        () => route.query,
        (query) => {
            isShowBasicModal.value = query.basicModal === "true"
        },
        { deep: true }
    )
</script>

<style lang="scss" scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 40px;

        @include global.mobile {
            padding: 20px;
        }

        .area {
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;

            .title {
                margin-bottom: 12px;
                font-size: 24px;
                font-weight: 700;
            }

            .buttons-container {
                display: flex;
                gap: 8px;

                .button {
                    width: fit-content;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                }

                .dropdown-options {
                    padding: 8px 12px;
                }
            }

            .folderable {
                padding: 12px;
                border: 1px solid #ccc;
                border-radius: 10px;

                .expand-button {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;

                    .expand-button-title {
                        font-size: 18px;
                    }

                    .icon-arrow-down {
                        font-size: 20px;
                    }
                }

                .folderable-contents {
                    margin-top: 10px;
                    list-style: disc;
                    list-style-position: inside;
                }
            }
        }
    }
</style>
