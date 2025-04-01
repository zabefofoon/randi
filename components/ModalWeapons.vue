<template>
  <UIModal
    enable-dim-click-close
    @close="emit('close')">
    <template #content> Weapons </template>
  </UIModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void
}>()
</script>
