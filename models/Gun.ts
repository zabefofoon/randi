import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Gun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "Gun",
    description: `GunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 2,
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
      ...Gun.meta,
      nexts: [
        {
          cls: DoubleGun,
          materials: [
            { key: "vit", length: 2 },
            { key: "agi", length: 1 },
            { key: "int", length: 1 },
          ],
        },
        {
          cls: ShotGun,
          materials: [
            { key: "cul", length: 2 },
            { key: "cha", length: 1 },
            { key: "luk", length: 1 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Gun()
  }
}

// level 2
export class ShotGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "ShotGun",
    description: `ShotGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 22,
    magicalDamage: 0,
    physicalPenetration: 4,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 1),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...ShotGun.meta,
      nexts: [
        {
          cls: MagicGun,
          materials: [
            { key: "int", length: 3 },
            { key: "cul", length: 3 },
            { key: "vit", length: 2 },
          ],
        },
        {
          cls: AirGun,
          materials: [
            { key: "luk", length: 3 },
            { key: "agi", length: 3 },
            { key: "str", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new ShotGun()
  }
}

// level 2
export class DoubleGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "DoubleGun",
    description: `DoubleGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 18,
    magicalDamage: 0,
    physicalPenetration: 5,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 2),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...DoubleGun.meta,
      nexts: [
        {
          cls: MachineGun,
          materials: [
            { key: "agi", length: 4 },
            { key: "str", length: 3 },
            { key: "cul", length: 1 },
          ],
        },
        {
          cls: FingerGun,
          materials: [
            { key: "cha", length: 4 },
            { key: "wis", length: 2 },
            { key: "int", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new DoubleGun()
  }
}

// level 3
export class MagicGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "MagicGun",
    description: "MagicGunDesc",
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 115,
    physicalPenetration: 0,
    magicalPenetration: 6,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...MagicGun.meta,
      nexts: [
        {
          cls: BubbleGun,
          materials: [
            { key: "int", length: 5 },
            { key: "cul", length: 3 },
            { key: "vit", length: 2 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: TazerGun,
          materials: [
            { key: "cha", length: 5 },
            { key: "wis", length: 3 },
            { key: "int", length: 2 },
            { key: "agi", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new MagicGun()
  }
}

// level 3
export class AirGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "AirGun",
    description: `AirGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 120,
    magicalDamage: 0,
    physicalPenetration: 5,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 4),
    criticalChance: 0.2,
    criticalDamage: 2,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...AirGun.meta,
      nexts: [
        {
          cls: PulseGun,
          materials: [
            { key: "cul", length: 4 },
            { key: "int", length: 3 },
            { key: "luk", length: 3 },
            { key: "vit", length: 2 },
          ],
        },
        {
          cls: Firework,
          materials: [
            { key: "vit", length: 5 },
            { key: "str", length: 3 },
            { key: "agi", length: 2 },
            { key: "luk", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new AirGun()
  }
}

// level 3
export class MachineGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "MachineGun",
    description: `MachineGunDesc`,
    cooltime: 200,
    speed: 500,
    range: 160,
    physicalDamage: 30,
    magicalDamage: 0,
    physicalPenetration: 5,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 5),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...MachineGun.meta,
      nexts: [
        {
          cls: SilentKiller,
          materials: [
            { key: "agi", length: 5 },
            { key: "str", length: 3 },
            { key: "luk", length: 2 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: DrillGun,
          materials: [
            { key: "str", length: 4 },
            { key: "agi", length: 4 },
            { key: "vit", length: 2 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new MachineGun()
  }
}

// level 3
export class FingerGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "FingerGun",
    description: `FingerGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 120,
    physicalPenetration: 0,
    magicalPenetration: 6,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 200,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 6),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...FingerGun.meta,
      nexts: [
        {
          cls: PepperSpray,
          materials: [
            { key: "cul", length: 4 },
            { key: "int", length: 3 },
            { key: "cha", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: EyeGun,
          materials: [
            { key: "wis", length: 5 },
            { key: "int", length: 3 },
            { key: "cha", length: 2 },
            { key: "luk", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new FingerGun()
  }
}

// level 4
export class BubbleGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "BubbleGun",
    description: `BubbleGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 400,
    physicalPenetration: 0,
    magicalPenetration: 20,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 7),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...BubbleGun.meta,
      nexts: [
        {
          cls: GrenadeLauncher,
          materials: [
            { key: "vit", length: 7 },
            { key: "agi", length: 4 },
            { key: "luk", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: BlessedRevolver,
          materials: [
            { key: "str", length: 6 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new BubbleGun()
  }
}

// level 4
export class TazerGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "TazerGun",
    description: `TazerGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 350,
    magicalDamage: 0,
    physicalPenetration: 14,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 80,
    stun: 0,
    stunMany: 300,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 8),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...TazerGun.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [
            { key: "vit", length: 6 },
            { key: "agi", length: 4 },
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: Cannon,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 3 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new TazerGun()
  }
}

// level 4
export class PulseGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "PulseGun",
    description: `PulseGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 500,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 9),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...PulseGun.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [
            { key: "vit", length: 6 },
            { key: "agi", length: 4 },
            { key: "luk", length: 2 },
            { key: "wis", length: 4 },
          ],
        },
        {
          cls: BlessedRevolver,
          materials: [
            { key: "str", length: 6 },
            { key: "int", length: 5 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new PulseGun()
  }
}

// level 4
export class Firework extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "Firework",
    description: `FireworkDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 500,
    magicalDamage: 0,
    physicalPenetration: 11,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 10),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Firework.meta,
      nexts: [
        {
          cls: GrenadeLauncher,
          materials: [
            { key: "vit", length: 8 },
            { key: "agi", length: 4 },
            { key: "luk", length: 2 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: Cannon,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 4 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Firework()
  }
}

// level 4
export class SilentKiller extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "SilentKiller",
    description: `SilentKillerDesc`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 450,
    magicalDamage: 0,
    physicalPenetration: 10,
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
    spritePosition: etcUtil.getWeaponSpritePosition(0, 11),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...SilentKiller.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [
            { key: "vit", length: 6 },
            { key: "agi", length: 3 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: CursedRevolver,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 3 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SilentKiller()
  }
}

// level 4
export class DrillGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "DrillGun",
    description: `DrillGunDesc`,
    cooltime: 200,
    speed: 500,
    range: 160,
    physicalDamage: 80,
    magicalDamage: 0,
    physicalPenetration: 12,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 12),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 5,
  }

  constructor() {
    super({
      ...DrillGun.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [
            { key: "vit", length: 6 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: CursedRevolver,
          materials: [
            { key: "str", length: 6 },
            { key: "int", length: 5 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new DrillGun()
  }
}

// level 4
export class PepperSpray extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "PepperSpray",
    description: `PepperSprayDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 13),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 2,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...PepperSpray.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [
            { key: "vit", length: 6 },
            { key: "agi", length: 5 },
            { key: "luk", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new PepperSpray()
  }
}

// level 4
export class EyeGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "EyeGun",
    description: `EyeGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 550,
    physicalPenetration: 0,
    magicalPenetration: 12,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 300,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 5,
  }

  constructor() {
    super({
      ...EyeGun.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [
            { key: "str", length: 6 },
            { key: "int", length: 5 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new EyeGun()
  }
}

// level 5
export class GrenadeLauncher extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "GrenadeLauncher",
    description: `GrenadeLauncherDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 27,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 15),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...GrenadeLauncher.meta,
      nexts: [
        {
          cls: Missile,
          materials: [
            { key: "vit", length: 9 },
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new GrenadeLauncher()
  }
}

// level 5
export class SilverBulletGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "SilverBulletGun",
    description: `SilverBulletGunDesc`,
    cooltime: 800,
    speed: 500,
    range: 160,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 31,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 16),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 10,
  }

  constructor() {
    super({
      ...SilverBulletGun.meta,
      nexts: [
        {
          cls: HeartBreaker,
          materials: [
            { key: "str", length: 8 },
            { key: "agi", length: 5 },
            { key: "luk", length: 5 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SilverBulletGun()
  }
}

// level 5
export class PlasmaGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "PlasmaGun",
    description: `PlasmaGunDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 1800,
    physicalPenetration: 0,
    magicalPenetration: 29,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 17),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 3,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...PlasmaGun.meta,
      nexts: [
        {
          cls: RadiationBeam,
          materials: [
            { key: "int", length: 8 },
            { key: "wis", length: 6 },
            { key: "cul", length: 4 },
            { key: "agi", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new PlasmaGun()
  }
}

// level 5
export class Cannon extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "Cannon",
    description: "CannonDesc",
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 32,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 300,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 18),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Cannon.meta,
      nexts: [
        {
          cls: Missile,
          materials: [
            { key: "str", length: 9 },
            { key: "int", length: 5 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Cannon()
  }
}

// level 5
export class BlessedRevolver extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "BlessedRevolver",
    description: `BlessedRevolverDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 2200,
    magicalDamage: 0,
    physicalPenetration: 28,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.3,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 19),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...BlessedRevolver.meta,
      nexts: [
        {
          cls: HeartBreaker,
          materials: [
            { key: "str", length: 8 },
            { key: "int", length: 6 },
            { key: "wis", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new BlessedRevolver()
  }
}

// level 5
export class CursedRevolver extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "CursedRevolver",
    description: `CursedRevolverDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 2200,
    physicalPenetration: 0,
    magicalPenetration: 31,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 44,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 20),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 4,
  }

  constructor() {
    super({
      ...CursedRevolver.meta,
      nexts: [
        {
          cls: Booger,
          materials: [
            { key: "cul", length: 8 },
            { key: "wis", length: 6 },
            { key: "int", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CursedRevolver()
  }
}

// level 6
export class HeartBreaker extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "HeartBreaker",
    description: `HeartBreakerDesc`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 7777,
    magicalDamage: 0,
    physicalPenetration: 77,
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
    spritePosition: etcUtil.getWeaponSpritePosition(0, 21),
    criticalChance: 0.1,
    criticalDamage: 10,
    dotted: 0,
    armerBreak: 20,
  }

  constructor() {
    super({
      ...HeartBreaker.meta,
      nexts: [],
    })
  }

  static of() {
    return new HeartBreaker()
  }
}

// level 6
export class RadiationBeam extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "RadiationBeam",
    description: `RadiationBeamDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 4600,
    physicalPenetration: 0,
    magicalPenetration: 82,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 22),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 5,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...RadiationBeam.meta,
      nexts: [],
    })
  }

  static of() {
    return new RadiationBeam()
  }
}

// level 6
export class Missile extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "Missile",
    description: `MissileDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 4000,
    magicalDamage: 0,
    physicalPenetration: 60,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 500,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 23),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Missile.meta,
      nexts: [],
    })
  }

  static of() {
    return new Missile()
  }
}

// level 6
export class Booger extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "Booger",
    description: `BoogerDesc`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 3500,
    physicalPenetration: 0,
    magicalPenetration: 4000,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 30,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 24),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 15,
  }

  constructor() {
    super({
      ...Booger.meta,
      nexts: [],
    })
  }

  static of() {
    return new Booger()
  }
}
