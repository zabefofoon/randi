export const useAssetBase = () => {
  const { app } = useRuntimeConfig()
  return app.baseURL.replace(/\/$/, "/")
}
