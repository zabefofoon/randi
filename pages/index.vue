<template>
  <div>
    <Lobby
      v-if="currentScene === 'lobby'"
      @next="currentScene = $event" />
    <InGame
      v-if="currentScene === 'inGame'"
      @next="currentScene = $event" />
    <Result
      v-if="currentScene === 'result'"
      @next="currentScene = $event" />
  </div>
</template>

<script lang="ts" setup>
const currentScene = ref<"lobby" | "inGame" | "collection" | "result" | "setting">("lobby")
</script>
