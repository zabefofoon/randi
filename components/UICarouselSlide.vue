<template>
    <div
        class="embla-slide"
        :style="{ flex, paddingLeft: gap }">
        <slot />
    </div>
</template>

<script setup lang="ts">
    const perview = inject<number | "auto">("perview") ?? 1
    const gap = inject<string>("gap")

    const flex = computed(() => (perview === "auto" ? "0 0 auto" : `0 0 ${100 / perview}%`))
</script>
