<template>
    <main class="main">
        <ClientOnly>
            <Transition name="modal">
                <BasicModal
                    v-if="isShowBasicModal"
                    @close="showBasicModal(false)" />
            </Transition>
        </ClientOnly>

        <section class="area">
            <h2 class="title">Snackbars</h2>
            <div class="buttons-container">
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'success' })
                    ">
                    Success
                </button>
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarInfo', type: 'info' })
                    ">
                    Info
                </button>
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'warn' })
                    ">
                    Warn
                </button>
                <button
                    class="snackbar-button"
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
                    class="modal-button"
                    @click="showBasicModal(true)">
                    Open Modal
                </button>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    const route = useRoute()
    const snackbarStore = useSnackbarStore()

    const isShowBasicModal = ref(false)
    const showBasicModal = (value = false): void => {
        // INFO query[key] 추가시, filterModal.middleeware에 추가
        navigateTo({
            path: route.path,
            query: { ...route.query, basicModal: value ? `${value}` : undefined },
            replace: value === false,
        })
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

                .snackbar-button,
                .modal-button {
                    width: fit-content;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                }
            }
        }
    }
</style>
