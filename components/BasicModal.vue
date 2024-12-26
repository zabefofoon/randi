<template>
    <UIModal @close="emit('close')">
        <template #title>title</template>
        <template #content>content</template>
        <template #buttons>
            <button
                class="modal-button close"
                @click="emit('close')">
                close
            </button>
            <button
                class="modal-button done"
                @click="emit('close')">
                done
            </button>
        </template>
    </UIModal>
</template>

<script setup lang="ts">
    const emit = defineEmits<{
        (e: "close"): void
    }>()
</script>

<style lang="scss" scoped>
    .modal-button {
        width: 100%;
        padding: 8px 0;
        border-radius: 10px;

        &.close {
            border: 1px solid #ccc;
        }

        &.done {
            color: white;
            background: black;
        }
    }
</style>
