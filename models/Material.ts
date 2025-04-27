// export type Materials = Record<Material["key"], { length: number; info: Material }>

interface MaterialItems {
  length: number
  info: Material
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

  calculateStat(stat: keyof ClassToRaw<Materials>) {
    switch (stat) {
      case "str":
        return this["str"].info.physicalDamage * this["str"].length
      case "int":
        return this["int"].info.magicalDamage * this["int"].length
      case "cul":
        return this["cul"].length / 100
      case "cha":
        return this["cha"].length * (this["cha"].info.stun * 100)
      case "vit":
        return this["vit"].length * this["vit"].info.splash
      case "agi":
        return this["agi"].info.cooltime * this["agi"].length
      case "luk":
        return this["luk"].info.armorPenetration * this["luk"].length
      default:
        return this["wis"].info.armorPenetration * this["wis"].length
    }
  }

  increase(stat: keyof ClassToRaw<Materials>, length: number) {
    this[stat].length += length
  }
  decrease(stat: keyof ClassToRaw<Materials>, length: number) {
    this[stat].length -= length
  }
}

export abstract class Material {
  key: "str" | "int" | "cul" | "cha" | "vit" | "agi" | "luk" | "wis"

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
      description: "물리공격력 + 1",
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
      description: "마법공격력 + 1",
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
      description: "슬로우 1%",
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
      description: "스턴  0.1초",
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
      description: "스플래시 + 5",
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
      description: "쿨타임 1%",
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
      description: "방어관통력 + 1",
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
      description: "마법관통력 + 1",
      slow: 0,
    })
  }
}
