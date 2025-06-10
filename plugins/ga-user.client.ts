export default defineNuxtPlugin(() => {
  if (import.meta.dev) return

  const route = useRoute()
  const { gtag } = useGtag()

  if (route.query.uid) gtag("config", "G-E9262Y0SML", { user_id: route.query.uid })
})
