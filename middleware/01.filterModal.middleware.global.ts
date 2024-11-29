import type { RouteLocationNormalized } from "#vue-router"

let isInitialized = false

/**
 * 앱 첫 로드시, 모든 모달 제거.
 */
export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
    if (isInitialized) return

    isInitialized = true
    const modalList = ["basicModal"]
    const hasModalOn = modalList.find((modalKey) => to.query[modalKey])
    if (hasModalOn) {
        return navigateTo({
            path: to.path,
            replace: true,
        })
    }
})
