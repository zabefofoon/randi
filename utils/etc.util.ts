import { PROFILES_LENGTH, PURCHASE_LENGTH, SPRITE_LENGTH } from "~/const"

export default {
  sleep(ms = 100): Promise<false> {
    return new Promise((resolve) => setTimeout(() => resolve(false), ms))
  },

  deepClone<T>(data: unknown): T {
    return JSON.parse(JSON.stringify(data))
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectToFormData(object: Record<string, any>): FormData {
    const formData = new FormData()

    Object.entries(object).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    })
    return formData
  },

  getSpritePosition(index: number): string {
    return `calc(100% * ${index} / ${SPRITE_LENGTH}) 0`
  },

  getProfileSpritePosition(index: number): string {
    return `calc(100% * ${index} / ${PROFILES_LENGTH}) 0`
  },

  getWeaponSpritePosition(row: number, column: number): string {
    return `calc(100% * ${column} / 24) calc(100% * ${row} / 3)`
  },

  getPurchaseSpritePosition(index: number): string {
    return `calc(100% * ${index} / ${PURCHASE_LENGTH}) 0`
  },

  restartAnimation(el: HTMLElement, className = "pop-animate") {
    el.classList.remove(className)
    void el.offsetWidth
    el.classList.add(className)
  },

  getLevelColorHex(level: number) {
    switch (level) {
      case 1:
        return 0xffffff
      case 2:
        return 0x3b82f6
      case 3:
        return 0x9333ea
      case 4:
        return 0xfacc15
      case 5:
        return 0xe879f9
      case 6:
        return 0xf87171
      default:
        return 0xffffff
    }
  },

  softTint(hex: number, intensity = 0.4) {
    const src = Phaser.Display.Color.IntegerToRGB(hex) as unknown as Phaser.Display.Color
    const color = { r: 255, g: 255, b: 255 } as unknown as Phaser.Display.Color
    const mix = Phaser.Display.Color.Interpolate.ColorWithColor(color, src, 1, intensity)
    return Phaser.Display.Color.GetColor(mix.r, mix.g, mix.b)
  },
}
