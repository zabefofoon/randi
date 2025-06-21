<template>
  <div class="flex items-center">
    <button
      class="w-[4cqw] | inline-flex items-center py-[0.35cqw] | border-black border-[0.2cqw] rounded-full"
      :class="value ? 'bg-green-700' : 'bg-gray-300'"
      @click="value = !value">
      <span
        class="inline-block h-[1.5cqw] w-[1.5cqw] transform | border-black border-[0.15cqw] rounded-full | bg-white"
        :class="value ? 'translate-x-[2cqw]' : 'translate-x-[0.5cqw]'"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
const value = defineModel<boolean>()
</script>
