import debounce from "lodash.debounce"
import { SNACK_BAR_DURATION, SNACKBAR_DEBOUNCE } from "~/const"
import type { Snackbar } from "~/models/UI"

export const useSnackbarStore = defineStore("snackbar", () => {
    const snackbars = ref<Snackbar[]>([])

    const showSnackbar = debounce((snackbar: Snackbar): void => {
        snackbars.value.push(snackbar)
        setTimeout(() => snackbars.value.splice(0, 1), SNACK_BAR_DURATION)
    }, SNACKBAR_DEBOUNCE)

    return { snackbars, showSnackbar }
})
