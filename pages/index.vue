<template>
  <div>
    <Lobby
      v-if="currentSene === 'lobby'"
      @next="currentSene = $event" />
    <InGame
      v-if="currentSene === 'inGame'"
      @next="currentScene = $event" />
  </div>
</template>

<script lang="ts" setup>
const currentSene = ref<"lobby" | "inGame" | "collection" | "setting">("lobby")
</script>
