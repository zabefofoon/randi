<template>
  <main class="main">
    <Transition name="modal">
      <BasicModal
        v-if="isShowBasicModal"
        @close="showBasicModal(false)" />
    </Transition>

    <section class="area">
      <h2 class="title">I18n({{ i18n.locale.value }})</h2>
      <div class="buttons-container">
        <button
          class="button"
          @click="toggleLocale()">
          {{ i18n.t("change.lang") }}
        </button>
      </div>
    </section>

    <section class="area">
      <h2 class="title">Snackbars</h2>
      <div class="buttons-container">
        <button
          class="button"
          @click="snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'success' })">
          Success
        </button>
        <button
          class="button"
          @click="snackbarStore.showSnackbar({ message: 'showSnackbarInfo', type: 'info' })">
          Info
        </button>
        <button
          class="button"
          @click="snackbarStore.showSnackbar({ message: 'showSnackbarWarn', type: 'warn' })">
          Warn
        </button>
        <button
          class="button"
          @click="snackbarStore.showSnackbar({ message: 'showSnackbarError', type: 'error' })">
          Error
        </button>
      </div>
    </section>

    <section class="area">
      <h2 class="title">UIModal</h2>
      <div class="buttons-container">
        <button
          class="button"
          @click="showBasicModal(true)">
          Open Modal
        </button>
      </div>
    </section>

    <section class="area">
      <h2 class="title">UIDropdown</h2>
      <div class="buttons-container">
        <UIDropdown>
          <template #button="{ showOptions }">
            <button
              class="button"
              @click="showOptions()">
              button
            </button>
          </template>
          <template #options>
            <div class="dropdown-options">options</div>
          </template>
        </UIDropdown>
      </div>
    </section>

    <section class="area">
      <h2 class="title">UIFoldable</h2>
      <UIFolderable
        class="folderable"
        :model-value="true">
        <template #title="{ expand, isExpanded }">
          <button
            class="expand-button"
            @click="expand()">
            <span class="expand-button-title">
              <template v-if="!isExpanded">Expand more</template>
              <template v-else>Expand less</template>
            </span>
            <i
              class="icon icon-arrow-down | text-2xl"
              :style="{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }"></i>
          </button>
        </template>
        <template #content>
          <ul class="folderable-contents">
            <li class="folderable-contents-item">list1</li>
            <li class="folderable-contents-item">list2</li>
            <li class="folderable-contents-item">list3</li>
          </ul>
        </template>
      </UIFolderable>
    </section>

    <section class="area">
      <h2 class="title">Carousel</h2>
      <h2 class="sub-title">Gap</h2>
      <div class="carousel-row-gap-container">
        <UICarousel
          loop
          use-dots
          autoplay
          gap="24px">
          <UICarouselSlide
            v-for="index in 3"
            :key="index"
            class="carousel-slide">
            <p class="carousel-item">carousel-slide-area</p>
          </UICarouselSlide>
        </UICarousel>
      </div>
      <h2 class="sub-title">Slide</h2>
      <div class="carousel-row-container">
        <UICarousel
          loop
          use-dots
          autoplay>
          <UICarouselSlide
            v-for="index in 3"
            :key="index"
            class="carousel-slide">
            <p class="carousel-item">carousel-slide-area</p>
          </UICarouselSlide>
        </UICarousel>
      </div>
      <h2 class="sub-title">Direction</h2>
      <div class="carousel-column-container">
        <UICarousel
          class="vertical"
          use-dots
          vertical
          loop
          autoplay>
          <UICarouselSlide
            v-for="index in 3"
            :key="index"
            class="carousel-slide">
            <p class="carousel-item">carousel-slide-area</p>
          </UICarouselSlide>
        </UICarousel>
      </div>
    </section>

    <section class="area">
      <h2 class="title">UISpinner</h2>
      <UISpinner />
    </section>

    <section class="area">
      <h2 class="title">UISkeleton</h2>
      <UISkeleton
        width="100px"
        height="100px" />
    </section>

    <section class="area">
      <h2 class="title">Global Loading</h2>
      <div class="buttons-container">
        <button
          class="button"
          @click="showGlobalCoverLoading()">
          Cover Loading
        </button>
        <button
          class="button"
          @click="showGlobalLoading(1000)">
          Dim 1000
        </button>
        <button
          class="button"
          @click="showGlobalLoading(5000)">
          Dim 5000
        </button>
      </div>
    </section>

    <section class="area">
      <h2 class="title">Timer</h2>
      <div class="buttons-container">
        <button
          class="button"
          @click="startTimer(true)">
          <span v-if="!isStartedTimer">start</span>
          <UITimer
            v-else
            :seconds="5.5"
            @expired="expiredTimerHandler" />
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { I18N_COOKIE, I18N_COOKIE_MAX_AGE, LOADING_COVER } from "~/const"

const route = useRoute()
const snackbarStore = useSnackbarStore()
const i18n = useI18n()
const globalLoadingStore = useGlobalLoadingStore()

const isShowBasicModal = ref(false)
const showBasicModal = (value = false): void => {
  navigateTo({
    path: route.path,
    query: { ...route.query, basicModal: value ? `${value}` : undefined },
    replace: value === false,
  })
}

const showGlobalCoverLoading = (): void => {
  globalLoadingStore.withGlobalCoverLoading(LOADING_COVER, async () => {
    await etcUtil.sleep(100)
  })
}

const showGlobalLoading = (duration = 1000): void => {
  globalLoadingStore.withGlobalDimLoading(`DIM_${duration}`, async () => {
    await etcUtil.sleep(duration)
  })
}

const toggleLocale = (): void => {
  if (i18n.locale.value === "ko") {
    i18n.setLocale("en")
    useCookie(I18N_COOKIE, { maxAge: I18N_COOKIE_MAX_AGE }).value = "en"
  } else {
    i18n.setLocale("ko")
    useCookie(I18N_COOKIE, { maxAge: I18N_COOKIE_MAX_AGE }).value = "ko"
  }
}

const isStartedTimer = ref(false)
const startTimer = (value: boolean): void => {
  isStartedTimer.value = value
}
const expiredTimerHandler = (): void => {
  startTimer(false)
  snackbarStore.showSnackbar({
    message: "인증 시간이 만료되었습니다. 다시 시도 해 주세요.",
    type: "error",
  })
}

watch(
  () => route.query,
  (query) => {
    isShowBasicModal.value = query.basicModal === "true"
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;

  @include global.mobile {
    padding: 20px;
  }

  .area {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;

    .title {
      margin-bottom: 12px;
      font-size: 24px;
      font-weight: 700;
    }

    .sub-title {
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 500;
    }

    .buttons-container {
      display: flex;
      gap: 8px;

      .button {
        width: fit-content;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .dropdown-options {
        padding: 8px 12px;
      }
    }

    .folderable {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 10px;

      .expand-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .expand-button-title {
          font-size: 18px;
        }

        .icon-arrow-down {
          font-size: 20px;
        }
      }

      .folderable-contents {
        margin-top: 10px;
        list-style: disc;
        list-style-position: inside;
      }
    }

    .carousel-row-gap-container {
      .carousel-slide {
        .carousel-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 52px;
          background-color: #67a2e7;
        }
      }
    }

    .carousel-row-container {
      .carousel-slide {
        .carousel-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 52px;
          background-color: #67a2e7;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.carousel-column-container {
  height: 55px;

  .vertical {
    height: 100%;

    .embla-controls {
      position: absolute !important;
      top: 0;
      left: 0;
      height: 100%;

      .embla-dots {
        position: absolute;
        top: 50%;
        right: 5px;
        bottom: unset;
        left: unset;
        flex-direction: column;
        gap: 5px;
        margin-top: 0;
        transform: translate(0, -50%);

        .embla-dot-selected {
          width: 5px !important;
          background: #fc452d !important;
        }
      }
    }

    .carousel-slide {
      width: 100%;

      .carousel-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 55px;
        background-color: #67a2e7;
      }
    }
  }
}
</style>
