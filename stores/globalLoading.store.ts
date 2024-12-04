import { GLOBAL_SPINNER_DELAY, LOADING_SSR } from "~/const"

export const useGlobalLoadingStore = defineStore("globalLoading", () => {
    let globalCoverLoadingTimer: NodeJS.Timeout
    let globalDimLoadingTimer: NodeJS.Timeout

    // globalLoadingSpinner를 보이기 위한 대기열
    const globalCoverLoadingMap = ref<Record<string, boolean>>({
        [LOADING_SSR]: true,
    })

    const globalDimLoadingMap = ref<Record<string, boolean>>({})

    const isShowGlobalCoverSpinner = ref(true)
    const isShowGlobalDimSpinner = ref(false)

    const isGlobalCoverLoading = computed<boolean>(() =>
        Object.values(globalCoverLoadingMap.value).some((isLoading) => isLoading)
    )
    const isGlobalDimLoading = computed<boolean>(() =>
        Object.values(globalDimLoadingMap.value).some((isLoading) => isLoading)
    )

    const setShowGlobalCoverSpinner = (value: boolean): void => {
        isShowGlobalCoverSpinner.value = value
    }
    const setShowGlobalDimSpinner = (value: boolean): void => {
        isShowGlobalDimSpinner.value = value
    }

    const setGlobalCoverLoading = (key: string): void => {
        globalCoverLoadingMap.value[key] = true
    }
    const setGlobalDimLoading = (key: string): void => {
        globalDimLoadingMap.value[key] = true
    }

    const deleteGlobalCoverLoading = (key: string): void => {
        globalCoverLoadingMap.value[key] = false
    }
    const deleteGlobalDimLoading = (key: string): void => {
        globalDimLoadingMap.value[key] = false
    }

    const withGlobalCoverLoading = async <T>(
        loadingKey: string,
        cb: () => Promise<T>
    ): Promise<T> => {
        setGlobalCoverLoading(loadingKey)
        const result = await cb()
        deleteGlobalCoverLoading(loadingKey)
        return result
    }

    const withGlobalDimLoading = async <T>(
        loadingKey: string,
        cb: () => Promise<T>
    ): Promise<T> => {
        setGlobalDimLoading(loadingKey)
        const result = await cb()
        deleteGlobalDimLoading(loadingKey)
        return result
    }

    // globalLoading이 끝난 후, 스피너가 사라질 때 깜빡임이 있을 수 있으므로,
    // 최소한의 delay를 가진 상태값으로 GlobalSpinner의 노출여부를 결정한다.
    watch(isGlobalCoverLoading, (isLoading) => {
        clearTimeout(globalCoverLoadingTimer)
        if (isLoading) setShowGlobalCoverSpinner(isLoading)
        else {
            globalCoverLoadingTimer = setTimeout(
                () => setShowGlobalCoverSpinner(isLoading),
                GLOBAL_SPINNER_DELAY
            )
        }
    })

    watch(isGlobalDimLoading, (isLoading) => {
        clearTimeout(globalDimLoadingTimer)
        if (isLoading) setShowGlobalDimSpinner(isLoading)
        else {
            globalDimLoadingTimer = setTimeout(
                () => setShowGlobalDimSpinner(isLoading),
                GLOBAL_SPINNER_DELAY
            )
        }
    })

    return {
        globalCoverLoadingMap,
        setGlobalCoverLoading,
        deleteGlobalCoverLoading,
        isGlobalCoverLoading,
        isShowGlobalCoverSpinner,
        withGlobalCoverLoading,

        globalDimLoadingMap,
        setGlobalDimLoading,
        deleteGlobalDimLoading,
        isGlobalDimLoading,
        isShowGlobalDimSpinner,
        withGlobalDimLoading,
    }
})
