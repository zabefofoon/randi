import { I18N_COOKIE, I18N_COOKIE_MAX_AGE } from "~/const"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useI18nUtil = () => {
    const i18n = useI18n()

    // locale에 저장 하면서, 쿠키에도 값을 저장한다.
    const changeLocale = (locale: string): void => {
        i18n.setLocale(locale)
        useCookie(I18N_COOKIE, { maxAge: I18N_COOKIE_MAX_AGE }).value = locale
    }

    return { changeLocale }
}
