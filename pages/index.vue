<template>
    <div>
        <LazyLobby
            v-if="currentSene === 'lobby'"
            @next="currentSene = 'ingame'" />
        <LazyInGame v-if="currentSene === 'ingame'" />
    </div>
</template>

<script lang="ts" setup>
    const currentSene = ref<"lobby" | "ingame">("lobby")
</script>
