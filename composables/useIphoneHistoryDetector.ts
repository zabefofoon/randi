export type IphoneHistoryDetector = ReturnType<typeof useIphoneHistoryDetector>

export const useIphoneHistoryDetector = () => {
    const TIMER_DELAY = 500

    let minClientX = 0
    let touchStarted = 0
    let timer: NodeJS.Timeout

    const detectStart = ({ changedTouches }: TouchEvent): void => {
        minClientX = Math.min(minClientX, changedTouches[0].clientX)
        touchStarted = new Date().getTime()
    }

    const detectEnd = ({ changedTouches }: TouchEvent): void => {
        if (changedTouches[0].clientX < 0) {
            const ratio = ((changedTouches[0].clientX - minClientX) / window.innerWidth) * 100

            if ((ratio > 3 && new Date().getTime() - touchStarted < 25) || ratio > 65) {
                window.dispatchEvent(new TouchEvent("iphoneHistoryBack"))
            }
        }
    }

    const historyBackHandler = (): void => {
        document.documentElement.classList.add("iphone-history-back")
        clearTimeout(timer)
        timer = setTimeout(
            () => document.documentElement.classList.remove("iphone-history-back"),
            TIMER_DELAY
        )
    }

    const historyForwardHandler = (): void => {
        document.documentElement.classList.add("iphone-history-forward")
        clearTimeout(timer)
        timer = setTimeout(
            () => document.documentElement.classList.remove("iphone-history-forward"),
            TIMER_DELAY
        )
    }

    return {
        detectStart,
        detectEnd,
        historyBackHandler,
        historyForwardHandler,
    }
}
