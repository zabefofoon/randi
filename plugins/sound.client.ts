import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(async () => {
  if (!window.createjs) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script")
      s.src = "https://code.createjs.com/1.0.0/soundjs.min.js"
      s.onload = () => resolve()
      s.onerror = () => reject(new Error("SoundJS failed to load"))
      document.head.appendChild(s)
    })
  }

  if (!window.createjs.Sound.initializeDefaultPlugins()) {
    console.warn("SoundJS: no audio plugin available")
  }

  return { provide: { sound: window.createjs.Sound } }
})
