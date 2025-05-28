import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class ButterKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "ButterKnife",
    description: `ButterKnifeDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 3,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...ButterKnife.meta,
      nexts: [
        {
          cls: KitchenKnife,
          materials: [
            { key: "str", length: 2 },
            { key: "vit", length: 1 },
            { key: "agi", length: 1 },
          ],
        },
        {
          cls: CutterKnife,
          materials: [
            { key: "luk", length: 2 },
            { key: "wis", length: 1 },
            { key: "int", length: 1 },
          ],
        },
      ],
    })
  }

  static of() {
    return new ButterKnife()
  }
}

// level 2
export class KitchenKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "KitchenKnife",
    description: `KitchenKnifeDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 26,
    magicalDamage: 0,
    physicalPenetration: 4,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 1),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 1,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...KitchenKnife.meta,
      nexts: [
        {
          cls: SushiKnife,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "luk", length: 2 },
          ],
        },
        {
          cls: Scissors,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new KitchenKnife()
  }
}

// level 2
export class CutterKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "CutterKnife",
    description: `CutterKnifeDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 22,
    magicalDamage: 0,
    physicalPenetration: 5,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 2),
    criticalChance: 0.15, // 0.1이 10%
    criticalDamage: 2, // 3배
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...CutterKnife.meta,
      nexts: [
        {
          cls: Hammer,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
            { key: "str", length: 2 },
          ],
        },
        {
          cls: AX,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "str", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CutterKnife()
  }
}

// level 3
export class SushiKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "SushiKnife",
    description: `SushiKnifeDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 120,
    magicalDamage: 0,
    physicalPenetration: 4,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 1,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...SushiKnife.meta,
      nexts: [
        {
          cls: ButcherKnife,
          materials: [
            { key: "str", length: 5 },
            { key: "vit", length: 3 },
            { key: "agi", length: 2 },
            { key: "cha", length: 2 },
          ],
        },
        {
          cls: LongNails,
          materials: [
            { key: "agi", length: 5 },
            { key: "cha", length: 3 },
            { key: "luk", length: 2 },
            { key: "cul", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SushiKnife()
  }
}

// level 3
export class Scissors extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "Scissors",
    description: `ScissorsDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 0,
    magicalDamage: 115,
    physicalPenetration: 0,
    magicalPenetration: 4,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 4),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Scissors.meta,
      nexts: [
        {
          cls: SwissArmyKnife,
          materials: [
            { key: "wis", length: 4 },
            { key: "luk", length: 3 },
            { key: "int", length: 3 },
            { key: "str", length: 2 },
          ],
        },
        {
          cls: Fist,
          materials: [
            { key: "str", length: 5 },
            { key: "cha", length: 3 },
            { key: "cul", length: 2 },
            { key: "vit", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Scissors()
  }
}

// level 3
export class Hammer extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "Hammer",
    description: `HammerDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 130,
    magicalDamage: 0,
    physicalPenetration: 5,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 200,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 5),
    criticalChance: 0.2,
    criticalDamage: 2,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Hammer.meta,
      nexts: [
        {
          cls: CrossCutSaw,
          materials: [
            { key: "str", length: 4 },
            { key: "vit", length: 4 },
            { key: "agi", length: 2 },
            { key: "luk", length: 2 },
          ],
        },
        {
          cls: CrowBar,
          materials: [
            { key: "str", length: 5 },
            { key: "agi", length: 3 },
            { key: "wis", length: 2 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Hammer()
  }
}

// level 3
export class AX extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "AX",
    description: `AXDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 130,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 6),
    criticalChance: 0.15,
    criticalDamage: 2,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...AX.meta,
      nexts: [
        {
          cls: Machete,
          materials: [
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: KoreanHandPlow,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 3 },
            { key: "str", length: 2 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new AX()
  }
}

// level 4
export class ButcherKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "ButcherKnife",
    description: `ButcherKnifeKnife`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 750,
    magicalDamage: 0,
    physicalPenetration: 18,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 7),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 2,
    armerBreak: 10,
  }

  constructor() {
    super({
      ...ButcherKnife.meta,
      nexts: [
        {
          cls: BornSword,
          materials: [
            { key: "str", length: 7 },
            { key: "vit", length: 4 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
        {
          cls: DualBlade,
          materials: [
            { key: "agi", length: 7 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
            { key: "vit", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new ButcherKnife()
  }
}

// level 4
export class LongNails extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "LongNails",
    description: `LongNailsDesc`,
    cooltime: 300,
    speed: 500,
    range: 140,
    physicalDamage: 100,
    magicalDamage: 0,
    physicalPenetration: 10,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 8),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 1,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...LongNails.meta,
      nexts: [
        {
          cls: SurgicalKnife,
          materials: [
            { key: "int", length: 6 },
            { key: "wis", length: 4 },
            { key: "str", length: 4 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: CursedSword,
          materials: [
            { key: "cul", length: 7 },
            { key: "wis", length: 4 },
            { key: "int", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new LongNails()
  }
}

// level 4
export class SwissArmyKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "SwissArmyKnife",
    description: `SwissArmyKnifeDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 13,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 9),
    criticalChance: 0.1,
    criticalDamage: 2,
    dotted: 1,
    armerBreak: 5,
  }

  constructor() {
    super({
      ...SwissArmyKnife.meta,
      nexts: [
        {
          cls: BlessedSword,
          materials: [
            { key: "str", length: 6 },
            { key: "int", length: 4 },
            { key: "wis", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
        {
          cls: DualBlade,
          materials: [
            { key: "agi", length: 7 },
            { key: "luk", length: 4 },
            { key: "vit", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SwissArmyKnife()
  }
}

// level 4
export class Fist extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "Fist",
    description: `FistDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 450,
    magicalDamage: 0,
    physicalPenetration: 10,
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
    slowOne: 30,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 10),
    criticalChance: 0.15,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Fist.meta,
      nexts: [
        {
          cls: BornSword,
          materials: [
            { key: "str", length: 7 },
            { key: "vit", length: 4 },
            { key: "cha", length: 3 },
            { key: "cul", length: 2 },
          ],
        },
        {
          cls: CursedSword,
          materials: [
            { key: "cul", length: 7 },
            { key: "wis", length: 4 },
            { key: "int", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Fist()
  }
}

// level 4
export class CrossCutSaw extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "CrossCutSaw",
    description: `CrossCutSawDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 400,
    magicalDamage: 0,
    physicalPenetration: 400,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 11),
    criticalChance: 0.2,
    criticalDamage: 2,
    dotted: 0,
    armerBreak: 5,
  }

  constructor() {
    super({
      ...CrossCutSaw.meta,
      nexts: [
        {
          cls: BlessedSword,
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
    return new CrossCutSaw()
  }
}

// level 4
export class CrowBar extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "CsowBar",
    description: `CrowBarDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 800,
    magicalDamage: 0,
    physicalPenetration: 100,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 12),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...CrowBar.meta,
      nexts: [
        {
          cls: DualBlade,
          materials: [
            { key: "agi", length: 7 },
            { key: "luk", length: 4 },
            { key: "str", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: BigAX,
          materials: [
            { key: "str", length: 7 },
            { key: "vit", length: 4 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CrowBar()
  }
}

// level 4
export class Machete extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "Machete",
    description: `MacheteDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 450,
    magicalDamage: 0,
    physicalPenetration: 12,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 13),
    criticalChance: 0.15,
    criticalDamage: 2,
    dotted: 0,
    armerBreak: 5,
  }

  constructor() {
    super({
      ...Machete.meta,
      nexts: [
        {
          cls: SurgicalKnife,
          materials: [
            { key: "int", length: 6 },
            { key: "wis", length: 4 },
            { key: "str", length: 4 },
            { key: "agi", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Machete()
  }
}

// level 4
export class KoreanHandPlow extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "KoreanHandPlow",
    description: `KoreanHandPlowDesc`,
    cooltime: 1000,
    speed: 1000,
    range: 90,
    physicalDamage: 400,
    magicalDamage: 0,
    physicalPenetration: 13,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 200,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...KoreanHandPlow.meta,
      nexts: [
        {
          cls: BigAX,
          materials: [
            { key: "str", length: 7 },
            { key: "vit", length: 4 },
            { key: "cha", length: 3 },
            { key: "cul", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new KoreanHandPlow()
  }
}

// level 5
export class BornSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "BornSword",
    description: `BornSwordDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 2400,
    magicalDamage: 0,
    physicalPenetration: 34,
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
    slowOne: 30,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 15),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 3,
    armerBreak: 15,
  }

  constructor() {
    super({
      ...BornSword.meta,
      nexts: [
        {
          cls: DragonSlayer,
          materials: [
            { key: "str", length: 9 },
            { key: "vit", length: 5 },
            { key: "agi", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new BornSword()
  }
}

// level 5
export class SurgicalKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "SurgicalKnife",
    description: `SurgicalKnifeDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 0,
    magicalDamage: 1700,
    physicalPenetration: 0,
    magicalPenetration: 50,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 50,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 16),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 3,
    armerBreak: 10,
  }

  constructor() {
    super({
      ...SurgicalKnife.meta,
      nexts: [
        {
          cls: SnotWhip,
          materials: [
            { key: "int", length: 9 },
            { key: "wis", length: 5 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SurgicalKnife()
  }
}

// level 5
export class BlessedSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "BlessedSword",
    description: `BlessedSwordDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 32,
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
    allCooltime: 0.2,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 18),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 10,
  }

  constructor() {
    super({
      ...BlessedSword.meta,
      nexts: [
        {
          cls: LaserSword,
          materials: [
            { key: "agi", length: 9 },
            { key: "int", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new BlessedSword()
  }
}

// level 5
export class CursedSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "CursedSword",
    description: `CursedSwordDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 0,
    magicalDamage: 1844,
    physicalPenetration: 0,
    magicalPenetration: 44,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 44,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 17),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 4,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...CursedSword.meta,
      nexts: [
        {
          cls: DeathScythe,
          materials: [
            { key: "int", length: 9 },
            { key: "luk", length: 5 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CursedSword()
  }
}

// level 5
export class DualBlade extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "DualBlade",
    description: `DualBladeDesc`,
    cooltime: 250,
    speed: 500,
    range: 140,
    physicalDamage: 0,
    magicalDamage: 800,
    physicalPenetration: 0,
    magicalPenetration: 29,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 19),
    criticalChance: 0.1,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...DualBlade.meta,
      nexts: [
        {
          cls: SnotWhip,
          materials: [
            { key: "int", length: 9 },
            { key: "cul", length: 5 },
            { key: "wis", length: 4 },
            { key: "luk", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new DualBlade()
  }
}

// level 5
export class BigAX extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "BigAX",
    description: `BigAXDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 2400,
    magicalDamage: 0,
    physicalPenetration: 32,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 100,
    stun: 0,
    stunMany: 300,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 20),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...BigAX.meta,
      nexts: [
        {
          cls: DragonSlayer,
          materials: [
            { key: "str", length: 9 },
            { key: "vit", length: 5 },
            { key: "agi", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new BigAX()
  }
}

// level 6
export class DragonSlayer extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "DragonSlayer",
    description: `DragonSlayerDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
    physicalDamage: 4800,
    magicalDamage: 0,
    physicalPenetration: 89,
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
    slowOne: 30,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 21),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 4,
    armerBreak: 15,
  }

  constructor() {
    super({
      ...DragonSlayer.meta,
      nexts: [],
    })
  }

  static of() {
    return new DragonSlayer()
  }
}

// level 6
export class SnotWhip extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "SnotWhip",
    description: `SnotWhipDesc`,
    cooltime: 1000,
    speed: 500,
    range: 140,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 22),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 3,
  }

  constructor() {
    super({
      ...SnotWhip.meta,
      nexts: [],
    })
  }

  static of() {
    return new SnotWhip()
  }
}

// level 6
export class LaserSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "LaserSword",
    description: `LaserSwordDesc`,
    cooltime: 200,
    speed: 500,
    range: 90,
    physicalDamage: 1500,
    magicalDamage: 0,
    physicalPenetration: 84,
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
    allCooltime: 0.3,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 23),
    criticalChance: 0.3,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 15,
  }

  constructor() {
    super({
      ...LaserSword.meta,
      nexts: [],
    })
  }

  static of() {
    return new LaserSword()
  }
}

// level 6
export class DeathScythe extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "DeathScythe",
    description: `DeathScytheDesc`,
    cooltime: 1000,
    speed: 500,
    range: 90,
    physicalDamage: 0,
    magicalDamage: 444,
    physicalPenetration: 0,
    magicalPenetration: 444,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 24),
    criticalChance: 0.44,
    criticalDamage: 44,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...DeathScythe.meta,
      nexts: [],
    })
  }

  static of() {
    return new DeathScythe()
  }
}
