<template>
  <div>
    <Lobby
      v-if="currentSene === 'lobby'"
      @next="currentSene = $event" />
    <InGame v-if="currentSene === 'inGame'" />
  </div>
</template>

<script lang="ts" setup>
const currentSene = ref<"lobby" | "inGame" | "collection" | "setting">("lobby")
</script>
