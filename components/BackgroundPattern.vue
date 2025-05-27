<template>
  <div
    class="content | relative | grid place-items-center | aspect-video max-w-full max-h-full | text-white overflow-hidden"
    :style="{
      background: `${
        backgroundColor ??
        'linear-gradient(to bottom right, rgb(20 20 20) 0%, #540454 25%, rgb(20 20 20) 100%)'
      } !important`,
    }">
    <div class="pattern | absolute top-0 left-0 z-[0] | w-full h-full | opacity-40"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  backgroundColor?: string
}>()
</script>

<style lang="scss" scoped>
.pattern {
  background: url("/assets/images/pattern.svg");
  background-color: black;
  background-repeat: repeat;
  background-position: center;
  background-size: 0.5cqw;
}
</style>
