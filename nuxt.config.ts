// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pwa: {
    strategies: "injectManifest",
    srcDir: "public",
    filename: "sw.js",

    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,json,woff2,webp,ico,xml,mp3,gif}"],
      // 👇 index.html을 강제로 포함 (해시가 없으므로 revision:null)
      additionalManifestEntries: [{ url: "/randi/index.html", revision: null }],
    },

    registerType: "autoUpdate",
  },
  runtimeConfig: {
    public: {
      adminId: import.meta.env.ADMIN_ID,
      adminPassword: import.meta.env.ADMIN_PASSWORD,
      cryptoKey: import.meta.env.CRYPTO_KEY,
    },
  },
  gtag: {
    tags: [
      {
        id: "G-E9262Y0SML",
        config: {
          cookie_flags: "SameSite=None;Secure",
        },
      },
    ],
    enabled: process.env.NODE_ENV === "production",

    initCommands: [
      // Setup up consent mode
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
  },
  ssr: false,
  // routeRules: {
  //   "/": { ssr: false },
  // },
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/stylelint-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "nuxt-gtag",
    "@vite-pwa/nuxt",
  ],
  i18n: {
    strategy: "prefix_and_default",
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "pt-BR", iso: "pt-BR", name: "Português (Brasil)" },
      { code: "es", iso: "es-ES", name: "Español" },
      { code: "de", iso: "de-DE", name: "Deutsch" },
      { code: "fr", iso: "fr-FR", name: "Français" },
      { code: "ru", iso: "ru-RU", name: "Русский" },
      { code: "id", iso: "id-ID", name: "Bahasa Indonesia" },
      { code: "th", iso: "th-TH", name: "ไทย" },
      { code: "vi", iso: "vi-VN", name: "Tiếng Việt" },
      { code: "zh-Hans", iso: "zh-CN", name: "简体中文" },
      { code: "zh-Hant", iso: "zh-TW", name: "繁體中文" },
      { code: "ja", iso: "ja-JP", name: "日本語" },
      { code: "ko", iso: "ko-KR", name: "한국어" },
    ],
    defaultLocale: "en",
    compilation: {
      strictMessage: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
    vueI18n: "~/i18n/i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true, // 사용자의 언어가 변경될 때마다 언어를 리다이렉트
      fallbackLocale: "en", // 감지된 언어가 지원되지 않을 경우 사용할 기본 언어
    },
  },
  eslint: {
    checker: true,
  },
  css: ["~/assets/styles/main.scss"],
  vite: {
    assetsInclude: ["**/*.md"],
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
  // nitro: {
  //   preset: "github-pages",
  //   output: {
  //     publicDir: path.join(__dirname, "/docs"),
  //   },
  // },

  nitro: {
    preset: "netlify",
    compressPublicAssets: true,
  },
  app: {
    baseURL: "/randi/",
    buildAssetsDir: "assets",
  },
})
