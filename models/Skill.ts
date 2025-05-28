import { Weapon, type WeaponOptions } from "./Weapon"

export class Thunder extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "Thunder",
    description: ``,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 99999,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Thunder.meta,
      nexts: [],
    })
  }

  static of() {
    return new Thunder()
  }
}

export class Blackhole extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "Blackhole",
    description: ``,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 99999,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Blackhole.meta,
      nexts: [],
    })
  }

  static of() {
    return new Blackhole()
  }
}

export class LaserBeam extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "LaserBeam",
    description: ``,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 99999,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...LaserBeam.meta,
      nexts: [],
    })
  }

  static of() {
    return new LaserBeam()
  }
}
