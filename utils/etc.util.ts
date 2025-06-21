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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collectNearest<T extends Record<string, any>>(
    iterable: Iterable<T>,
    k: number,
    getDist: (item: T) => number,
    characterId: string
  ): T[] {
    if (characterId === "dogeTower") {
      const high: (T & { dist: number })[] = [] // isBoss
      const mid: (T & { dist: number })[] = [] // Skill enemy
      const low: (T & { dist: number })[] = [] // 일반 적

      for (const item of iterable) {
        const dist = getDist(item)
        const enriched = Object.assign(item, { dist })

        if (item.isBoss) {
          this.insertSorted(high, enriched)
        } else if (item.isThunder || item.isRage || item.isBlackhole || item.isCannon) {
          this.insertSorted(mid, enriched)
        } else {
          this.insertSorted(low, enriched)
        }
      }

      // 우선순위대로 최대 k개까지 추출
      return [...high, ...mid, ...low].slice(0, k)
    } else {
      // 버퍼(길이 k)와 사용된 칸 수
      const buf: (T & { dist: number })[] = Array(k)
      let used = 0

      for (const item of iterable) {
        const d = getDist(item)

        // 아직 k개 미만이면 위치 찾아 삽입
        if (used < k) {
          let i = used++
          while (i > 0 && buf[i - 1].dist > d) {
            buf[i] = buf[i - 1]
            --i
          }
          buf[i] = Object.assign(item, { dist: d })
          continue
        }

        // 버퍼가 꽉 찼으면, 가장 먼 녀석(buf[k-1])보다 가까울 때만 교체
        if (d < buf[k - 1].dist) {
          let i = k - 1
          while (i > 0 && buf[i - 1].dist > d) {
            buf[i] = buf[i - 1]
            --i
          }
          buf[i] = Object.assign(item, { dist: d })
        }
      }
      return buf.slice(0, used)
    }
  },

  insertSorted<T extends { dist: number }>(arr: T[], item: T) {
    let i = arr.length
    while (i > 0 && arr[i - 1].dist > item.dist) i--
    arr.splice(i, 0, item)
  },
}
