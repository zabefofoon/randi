type StatKey = "str" | "int" | "cul" | "cha" | "vit" | "agi" | "luk" | "wis"

interface MaterialItems<T extends { length: number; info: any } = any> {
  length: number
  info: T["info"]
}

export class Materials {
  str: MaterialItems = { length: 0, info: new Material1() }
  int: MaterialItems = { length: 0, info: new Material2() }
  cul: MaterialItems = { length: 0, info: new Material3() }
  cha: MaterialItems = { length: 0, info: new Material4() }
  vit: MaterialItems = { length: 0, info: new Material5() }
  agi: MaterialItems = { length: 0, info: new Material6() }
  luk: MaterialItems = { length: 0, info: new Material7() }
  wis: MaterialItems = { length: 0, info: new Material8() }

  get keys(): Material["key"][] {
    return ["str", "int", "cul", "cha", "vit", "agi", "luk", "wis"] as unknown as Material["key"][]
  }

  /** 캐시된 스탯 값 */
  private _cache: Record<StatKey, number> = {
    str: 0,
    int: 0,
    cul: 0,
    cha: 0,
    vit: 0,
    agi: 0,
    luk: 0,
    wis: 0,
  }

  private _dirty: Record<StatKey, boolean> = {
    str: true,
    int: true,
    cul: true,
    cha: true,
    vit: true,
    agi: true,
    luk: true,
    wis: true,
  }
  private _anyDirty = true

  private readonly _coef: Record<StatKey, number> = {
    str: 1, // 힘 → 물리공격력
    int: 1, // 지식 → 마법공격력
    cul: 1, // 교양 → 슬로우 %
    cha: 10, // 카리스마 → 스턴 0.1s *
    vit: 5, // 건강 → 스플래시
    agi: 0.01, // 민첩 → 쿨타임 감소
    luk: 1, // 운 → 물리관통력
    wis: 1, // 지혜 → 마법관통력
  }
  get totalLength() {
    return (
      this.str.length +
      this.int.length +
      this.cul.length +
      this.cha.length +
      this.vit.length +
      this.agi.length +
      this.luk.length +
      this.wis.length
    )
  }
  calculateStat(stat: StatKey): number {
    if (!this._dirty[stat]) return this._cache[stat]

    let len = 0
    switch (stat) {
      case "str":
        len = this.str.length
        break
      case "int":
        len = this.int.length
        break
      case "cul":
        len = this.cul.length
        break
      case "cha":
        len = this.cha.length
        break
      case "vit":
        len = this.vit.length
        break
      case "agi":
        len = this.agi.length
        break
      case "luk":
        len = this.luk.length
        break
      case "wis":
        len = this.wis.length
        break
    }

    this._cache[stat] = len * this._coef[stat]
    this._dirty[stat] = false
    return this._cache[stat]
  }

  increase(stat: StatKey, n = 1) {
    this[stat].length += n
    this._dirty[stat] = true
    this._anyDirty = true
  }
  decrease(stat: StatKey, n = 1) {
    this[stat].length -= n
    this._dirty[stat] = true
    this._anyDirty = true
  }

  getCachedStats() {
    // ② _anyDirty 가 false면 곧장 캐시 반환 → 루프·함수 호출 0
    if (!this._anyDirty)
      return this._cache

      // ③ 더티한 키만 재계산
    ;(Object.keys(this._dirty) as StatKey[]).forEach((k) => {
      if (this._dirty[k]) {
        this._cache[k] = this[k].length * this._coef[k]
        this._dirty[k] = false
      }
    })
    this._anyDirty = false // 모두 처리됐으니 초기화
    return this._cache
  }
}
export abstract class Material {
  key: keyof ClassToRaw<Materials>

  description: string
  physicalDamage: number // 물리 데미지
  magicalDamage: number // 마법 데미지
  range: number // 공격 범위
  stun: number // 공격 성공시 적의 스턴 시간
  splash: number // 스플래쉬 범위
  cooltime: number // 쿨타임
  armorPenetration: number // 물리관통력 적의 물리 방어력 무시
  magicPenetration: number // 마법관통력 적의 마법 방어력 무시
  slow: number

  constructor(material: ClassToRaw<Material>) {
    this.key = material.key
    this.physicalDamage = material.physicalDamage
    this.magicalDamage = material.magicalDamage
    this.range = material.range
    this.stun = material.stun
    this.splash = material.splash
    this.cooltime = material.cooltime
    this.armorPenetration = material.armorPenetration
    this.magicPenetration = material.magicPenetration
    this.description = material.description
    this.slow = material.slow
  }
}

export class Material1 extends Material {
  constructor() {
    super({
      key: "str",
      physicalDamage: 1,
      magicalDamage: 0,
      range: 0,
      stun: 0,
      splash: 0,
      cooltime: 0,
      armorPenetration: 0,
      magicPenetration: 0,
      description: "StrDesc",
      slow: 0,
    })
  }
}

export class Material2 extends Material {
  constructor() {
    super({
      key: "int",
      physicalDamage: 0,
      magicalDamage: 1,
      range: 0,
      stun: 0,
      splash: 0,
      cooltime: 0,
      armorPenetration: 0,
      magicPenetration: 0,
      description: "IntDesc",
      slow: 0,
    })
  }
}

export class Material3 extends Material {
  constructor() {
    super({
      key: "cul",
      physicalDamage: 0,
      magicalDamage: 0,
      range: 1,
      stun: 0,
      splash: 0,
      cooltime: 0,
      armorPenetration: 0,
      magicPenetration: 0,
      description: "CulDesc",
      slow: 0,
    })
  }
}

export class Material4 extends Material {
  constructor() {
    super({
      key: "cha",
      physicalDamage: 0,
      magicalDamage: 0,
      range: 0,
      stun: 0.1,
      splash: 0,
      cooltime: 0,
      armorPenetration: 0,
      magicPenetration: 0,
      description: "ChaDesc",
      slow: 0,
    })
  }
}

export class Material5 extends Material {
  constructor() {
    super({
      key: "vit",
      physicalDamage: 0,
      magicalDamage: 0,
      range: 0,
      stun: 0,
      splash: 5,
      cooltime: 0,
      armorPenetration: 0,
      magicPenetration: 0,
      description: "VitDesc",
      slow: 0,
    })
  }
}

export class Material6 extends Material {
  constructor() {
    super({
      key: "agi",
      physicalDamage: 0,
      magicalDamage: 0,
      range: 0,
      stun: 0,
      splash: 0,
      cooltime: 0.01,
      armorPenetration: 0,
      magicPenetration: 0,
      description: "AgiDesc",
      slow: 0,
    })
  }
}

export class Material7 extends Material {
  constructor() {
    super({
      key: "luk",
      physicalDamage: 0,
      magicalDamage: 0,
      range: 0,
      stun: 0,
      splash: 0,
      cooltime: 0,
      armorPenetration: 1,
      magicPenetration: 0,
      description: "LukDesc",
      slow: 0,
    })
  }
}

export class Material8 extends Material {
  constructor() {
    super({
      key: "wis",
      physicalDamage: 0,
      magicalDamage: 0,
      range: 0,
      stun: 0,
      splash: 0,
      cooltime: 0,
      armorPenetration: 0,
      magicPenetration: 1,
      description: "WisDesc",
      slow: 0,
    })
  }
}
