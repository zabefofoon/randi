import en from "./locales/en.json"
import ko from "./locales/ko.json"

export default defineI18nConfig(() => ({
    legacy: false,
    messages: {
        ko,
        en,
    },
}))
