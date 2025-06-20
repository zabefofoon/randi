<template>
  <div
    ref="modalEl"
    class="modal">
    <div
      class="dim"
      :class="dimClass"
      :style="{ pointerEvents: enableDimClickClose ? 'auto' : 'none' }"
      @click="dimClickClose()"></div>
    <div
      ref="innerEl"
      class="transition-inner inner"
      :class="[innerClass]">
      <div
        class="title"
        :class="[titleClass]">
        <slot name="title"></slot>
        <template v-if="!hideCloseButton">
          <slot name="close">
            <button
              class="close-button"
              @click="emit('close')">
              <i class="icon icon-close"></i>
            </button>
          </slot>
        </template>
      </div>
      <div
        class="content-wrap"
        :class="contentWrapClass">
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
    <div class="effect">
      <slot name="effect"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  innerClass?: string | string[]
  contentWrapClass?: string | string[]
  titleClass?: string | string[]
  enableDimClickClose?: boolean
  hideCloseButton?: boolean
  dimClass?: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const route = useRoute()

const modalEl = ref<HTMLDivElement>()
const innerEl = ref<HTMLDivElement>()

onMounted(() => {
  document.body.classList.add("scroll-lock")
})

onBeforeUnmount(() => {
  document.body.classList.remove("scroll-lock")
})

const dimClickClose = (): void => {
  if (props.enableDimClickClose) emit("close")
}

watch(
  () => route.path,
  () => emit("close")
)

defineExpose({
  innerEl,
  modalEl,
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  overflow: auto;

  @include global.mobile {
    overflow: unset;
  }

  .dim {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
  }

  .effect {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: calc(100% - 32px);
    max-width: 500px;
    background: white;
    border-radius: 10px;

    @include global.mobile {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
    }

    .title {
      position: relative;
      margin-bottom: 30px;
      font-size: 32px;
      font-weight: bold;

      &:empty {
        display: none;
      }

      @include global.mobile {
        padding: 0 16px;
      }

      .close-button {
        position: absolute;
        top: -6px;
        right: -6px;
        display: flex;
        height: fit-content;
        padding: 12px;
        color: black;

        @include global.mobile {
          right: 0;
        }

        .close-image {
          width: 12px;
          height: 12px;
        }
      }

      @include global.mobile {
        margin-bottom: 20px;
        font-size: 25px;
      }
    }

    .content-wrap {
      height: 100%;
      overflow: auto;

      .content {
        font-size: 14px;
      }
    }

    .buttons {
      display: flex;
      gap: 10px;
      width: 100%;

      &:empty {
        display: none;
      }
    }
  }
}
</style>
