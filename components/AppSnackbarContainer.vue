<template>
    <div class="snackbar-container">
        <TransitionGroup name="snackbar">
            <div
                v-for="snackbar in snackbarStore.snackbars"
                :key="snackbar.message"
                class="snackbar"
                :class="snackbar.type">
                <i
                    class="icon"
                    :class="`icon-${snackbar.type}`"></i>
                <span class="message">
                    {{ snackbar.message }}
                </span>
            </div>
        </TransitionGroup>
    </div>
</template>
<script lang="ts" setup>
    const snackbarStore = useSnackbarStore()
</script>
<style lang="scss" scoped>
    .snackbar-container {
        position: fixed;
        top: 20px;
        left: 50%;
        z-index: 50;
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
        width: 100%;
        pointer-events: none;
        transform: translate(-50%, 0);

        .snackbar {
            display: flex;
            gap: 4px;
            align-items: center;
            padding: 8px 20px 7px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 15px rgb(120 120 120 / 30%);

            .message {
                font-size: 14px;
            }

            &.success {
                color: rgb(74 222 128);
                background: rgb(240 253 244);
                border: 1px solid rgb(187 247 208);
            }

            &.info {
                color: rgb(96 165 250);
                background: rgb(239 246 255);
                border: 1px solid rgb(191 219 254);
            }

            &.warn {
                color: rgb(251 146 60);
                background: rgb(255 247 237);
                border: 1px solid rgb(254 215 170);
            }

            &.error {
                color: rgb(248 113 113);
                background: rgb(254 242 242);
                border: 1px solid rgb(254 202 202);
            }
        }
    }
</style>
