<template>
  <UIModal
    enable-dim-click-close
    hide-close-button
    inner-class="!w-fit !max-w-[unset] | !bg-blue-950"
    content-wrap-class="!overflow-hidden"
    @close="emit('close')">
    <template #content>
      <div
        class="flex flex-col items-center justify-center | text-white | p-[1.5cqw] border-black border-[0.21cqw] rounded-lg">
        <div class="flex flex-col gap-[0.5cqw]">
          <button
            class="grid place-items-center | relative bg-blue-900 | px-[2cqw] py-[0.5cqw] | border-black border-[0.21cqw] rounded-lg | leading-none"
            @click="emit('close')">
            <span class="text-outline text-[1.7cqw] font-bold">계속하기</span>
          </button>
          <button
            class="grid place-items-center | relative bg-orange-700 | px-[2cqw] py-[0.5cqw] | border-black border-[0.21cqw] rounded-lg | leading-none"
            @click="emit('exit')">
            <span class="text-outline text-[1.7cqw] font-bold"> 종료하기 </span>
          </button>
        </div>
      </div>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close" | "exit"): void
}>()
</script>
