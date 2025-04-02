<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!max-w-[50cqw] | !bg-[rgba(0_0_0_/_50%)]"
    @close="emit('close')">
    <template #content>
      <div class="flex flex-col items-center justify-center | text-white">
        GAME OVER
        <button
          class="bg-[rgba(0_0_0_/_50%)] | mt-[2cqw] px-[2cqw] py-[0.5cqw] | rounded-full | leading-none text-[1.2cqw]"
          @click="emit('close')">
          나가기
        </button>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void
}>()
</script>
