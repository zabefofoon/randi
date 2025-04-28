import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(async () => {
  if (!(window as any).createjs) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script")
      s.src = "https://code.createjs.com/1.0.0/soundjs.min.js"
      s.onload = () => resolve()
      s.onerror = () => reject(new Error("SoundJS failed to load"))
      document.head.appendChild(s)
    })
  }

  // 2) 타입 캐스팅
  const createjs = (window as any).createjs as any

  // 3) 오디오 플러그인 준비
  if (!createjs.Sound.initializeDefaultPlugins()) {
    console.warn("SoundJS: no audio plugin available")
  }

  // 4) Nuxt 전역 주입 → 모든 컴포넌트에서 useNuxtApp().$sound 로 접근
  return { provide: { sound: createjs.Sound } }
})
