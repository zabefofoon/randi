// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRules: {
        "/": { ssr: false },
    },
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: [
        "@nuxt/eslint",
        "@nuxtjs/stylelint-module",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxtjs/i18n",
    ],
    i18n: {
        strategy: "no_prefix",
        defaultLocale: "ko",
        detectBrowserLanguage: false,
        skipSettingLocaleOnNavigate: false,

        compilation: {
            strictMessage: false,
        },
        vueI18n: "./i18n/i18n.config.ts",
    },
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
