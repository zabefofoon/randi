// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "@nuxtjs/stylelint-module"],
    eslint: {
        checker: true,
    },
    css: ["~/assets/styles/main.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler", // or "modern"
                },
            },
        },
    },
})
