import de from "./locales/de.json"
import en from "./locales/en.json"
import es from "./locales/es.json"
import fr from "./locales/fr.json"
import id from "./locales/id.json"
import ja from "./locales/ja.json"
import ko from "./locales/ko.json"
import ptBR from "./locales/pt_BR.json"
import ru from "./locales/ru.json"
import th from "./locales/th.json"
import vi from "./locales/vi.json"
import zhHans from "./locales/zh_Hans.json"
import zhHant from "./locales/zh_Hant.json"

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en,
    ko,
    de,
    es,
    fr,
    id,
    "pt-BR": ptBR,
    ja,
    ru,
    th,
    vi,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant,
  },
}))
