<template>
    <Transition name="fade">
        <div
            v-if="
                !route.name?.toString().startsWith('embedded-') &&
                globalLoadingStore.isShowGlobalCoverSpinner
            "
            class="loading-cover-container">
            <UISpinner class="loading" />
        </div>
    </Transition>

    <Transition name="fade">
        <div
            v-if="globalLoadingStore.isShowGlobalDimSpinner"
            class="loading-dim-container">
            <UISpinner class="loading" />
        </div>
    </Transition>
</template>

<script lang="ts" setup>
    const route = useRoute()
    const globalLoadingStore = useGlobalLoadingStore()
</script>

<style lang="scss" scoped>
    .loading-cover-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background: white;

        .loading {
            font-size: 24px;
        }
    }

    .loading-dim-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background: rgb(0 0 0 / 30%);

        .loading {
            font-size: 24px;
            color: white;
        }
    }
</style>
