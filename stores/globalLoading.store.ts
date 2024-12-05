export const useGlobalLoadingStore = defineStore("globalLoading", () => {
    // globalLoadingSpinner를 보이기 위한 대기열
    const globalCoverLoadingMap = ref<Map<string, boolean>>(new Map())
    const globalDimLoadingMap = ref<Map<string, boolean>>(new Map())

    const isGlobalCoverLoading = computed<boolean>(() => {
        for (const isLoading of globalCoverLoadingMap.value.values()) {
            if (isLoading) return true
        }
        return false
    })
    const isGlobalDimLoading = computed<boolean>(() => {
        for (const isLoading of globalDimLoadingMap.value.values()) {
            if (isLoading) return true
        }
        return false
    })

    const setGlobalCoverLoading = (key: string): void => {
        globalCoverLoadingMap.value.set(key, true)
    }

    const setGlobalDimLoading = (key: string): void => {
        globalDimLoadingMap.value.set(key, true)
    }

    const deleteGlobalCoverLoading = (key: string): void => {
        globalCoverLoadingMap.value.delete(key)
    }
    const deleteGlobalDimLoading = (key: string): void => {
        globalDimLoadingMap.value.delete(key)
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

    return {
        globalCoverLoadingMap,
        setGlobalCoverLoading,
        deleteGlobalCoverLoading,
        isGlobalCoverLoading,
        withGlobalCoverLoading,

        globalDimLoadingMap,
        setGlobalDimLoading,
        deleteGlobalDimLoading,
        isGlobalDimLoading,
        withGlobalDimLoading,
    }
})
