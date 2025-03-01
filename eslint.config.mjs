// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    rules: {
        "no-console": "off", // allow console.log in TypeScript files
        "vue/html-self-closing": "off",
        "vue/no-v-html": "off",
        "vue/no-multiple-template-root": "off",
        "vue/multi-word-component-names": "off",
    },
})
