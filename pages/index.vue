<template>
    <main class="main">
        <section class="snackbar-area">
            <h2 class="title">Snackbars</h2>
            <div class="buttons-container">
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'success' })
                    ">
                    ShowSnackbar Success
                </button>
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarInfo', type: 'info' })
                    ">
                    ShowSnackbar Info
                </button>
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'warn' })
                    ">
                    ShowSnackbar Warn
                </button>
                <button
                    class="snackbar-button"
                    @click="
                        snackbarStore.showSnackbar({ message: 'showSnackbarError', type: 'error' })
                    ">
                    ShowSnackbar Error
                </button>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    const snackbarStore = useSnackbarStore()
</script>

<style lang="scss" scoped>
    .main {
        padding: 40px;

        @include global.mobile {
            padding: 20px;
        }

        .snackbar-area {
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
                gap: 4px;

                .snackbar-button {
                    width: fit-content;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                }
            }
        }
    }
</style>
