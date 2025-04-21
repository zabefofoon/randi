import { SPRITE_LENGTH } from "~/const"

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

  getWeaponSpritePosition(row: number, column: number): string {
    return `calc(100% * ${column} / 24) calc(100% * ${row} / 3)`
  },
}
