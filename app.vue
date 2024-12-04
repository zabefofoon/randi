<template>
    <AppGlobalLoadingContainer />
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ClientOnly>
        <AppSnackbarContainer />
        <Transition name="music-container">
            <AppMusicPlayerContainer v-if="musicStore.musicToPlay" />
        </Transition>
    </ClientOnly>
</template>
<script lang="ts" setup>
    import { I18N_COOKIE, LOADING_SSR } from "./const"

    const musicStore = useMusicStore()
    const globalLoadingStore = useGlobalLoadingStore()

    const i18n = useI18n()
    const headers = useRequestHeaders()

    onMounted(() => {
        globalLoadingStore.deleteGlobalCoverLoading(LOADING_SSR)
    })

    const initLocale = async (): Promise<void> => {
        const preferLang = import.meta.client
            ? window.navigator.language
            : headers["accept-language"]?.split(",")?.[0] ?? "ko"

        const savedLocaleInCookie = useCookie(I18N_COOKIE).value ?? preferLang
        await i18n.setLocale(savedLocaleInCookie)
    }

    await initLocale()
</script>
