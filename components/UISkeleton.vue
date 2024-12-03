<template>
    <div
        :class="[$style.skeleton, { [$style.stop]: stopAnimation }]"
        :style="{ width, height }"></div>
</template>

<script setup lang="ts">
    defineProps<{
        width?: string
        height?: string
        stopAnimation?: boolean
    }>()
</script>

<style lang="scss" module>
    .skeleton {
        position: relative;
        display: inline-block;
        overflow: hidden;
        background-color: rgb(240 240 240 / 100%);
        border-radius: 10px;

        &.stop {
            &::after {
                animation: none !important;
            }
        }

        &::after {
            position: absolute;
            inset: 0;
            content: "";
            background-image: linear-gradient(
                90deg,
                rgba(#fff, 0) 0,
                rgba(#fff, 0.2) 20%,
                rgba(#fff, 0.5) 60%,
                rgba(#fff, 0)
            );
            transform: translateX(-100%);
            animation: skeleton 3000ms infinite;
        }
    }
</style>
