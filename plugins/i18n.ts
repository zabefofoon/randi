export default defineNuxtPlugin((nuxt) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const i18n = nuxt.$i18n as any

    i18n.te = (key: string, locale?: string): boolean => {
        const effectiveLocale = locale && locale.length ? locale : i18n.locale.value
        const messages = i18n.messages.value[effectiveLocale]

        return Object.hasOwn(messages, key)
    }

    i18n.tm = (key: string, locale: string): string[] => {
        const effectiveLocale = locale && locale.length ? locale : i18n.locale.value
        const messages = i18n.messages.value[effectiveLocale]

        if (!i18n.te(key)) return []

        if (typeof messages[key].loc === "object" && Object.hasOwn(messages[key].loc, "source")) {
            return [messages[key].loc.source] as string[]
        }

        if (messages[key] == null) return []
        if (!Object.hasOwn(messages[key], "map")) {
            if (Object.hasOwn(messages[key], "b") && Object.hasOwn(messages[key].b, "s"))
                return [messages[key].b.s]
        } else {
            return []
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (messages[key] as any[]).map((v) => {
            if (v == null) return ""
            if (v.loc == null) {
                if (Object.hasOwn(v, "b") && Object.hasOwn(v.b, "s")) return v.b.s
            }

            return v.loc.source as string
        })
    }
})
