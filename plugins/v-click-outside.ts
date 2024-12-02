import type { DirectiveBinding } from "vue"

interface ClickOutsideElement extends HTMLElement {
    clickOutsideEvent?: (event: Event) => void
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("click-outside", {
        beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
            el.clickOutsideEvent = (event: Event): void => {
                if (el !== event.target && !el.contains(<Node>event.target)) {
                    binding.value(event)
                }
            }
            document.addEventListener("click", el.clickOutsideEvent)
        },
        unmounted(el: ClickOutsideElement) {
            if (el.clickOutsideEvent) {
                document.removeEventListener("click", el.clickOutsideEvent)
            }
        },
    })
})
