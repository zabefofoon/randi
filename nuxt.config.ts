// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxt/eslint",
        "@nuxtjs/stylelint-module",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    eslint: {
        checker: true,
    },
    css: ["~/assets/styles/main.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler", // or "modern",
                    additionalData: (source: string): string => {
                        return "@use '~/assets/styles/mixins.scss' as global;" + source
                    },
                },
            },
        },
    },
})
