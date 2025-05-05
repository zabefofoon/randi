import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Ring extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "반지",
    description: `“작은 원에 담긴 큰 약속.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Ring.meta,
      nexts: [
        {
          cls: CopperRing,
          materials: [
            { key: "vit", length: 2 },
            { key: "agi", length: 1 },
          ],
        },
        {
          cls: FlowerRing,
          materials: [
            { key: "luk", length: 2 },
            { key: "wis", length: 1 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Ring()
  }
}

// level 2
export class CopperRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "구리반지",
    description: `“손가락이 초록으로 물들 수 있다.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 12,
    magicalDamage: 0,
    physicalPenetration: 4,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 1),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CopperRing.meta,
      nexts: [
        {
          cls: SilverRing,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 2 },
          ],
        },
        {
          cls: JadeRing,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CopperRing()
  }
}

// level 2
export class FlowerRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "꽃반지",
    description: `“은은한 향기로 치유.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 13,
    physicalPenetration: 0,
    magicalPenetration: 4,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 2),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...FlowerRing.meta,
      nexts: [
        {
          cls: LeatherRing,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: CandyRing,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new FlowerRing()
  }
}

// level 3
export class SilverRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "은도금반지",
    description: `“가짜라도 반짝이면 충분해.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 45,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.15,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...SilverRing.meta,
      nexts: [
        {
          cls: GoldRing,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "cul", length: 3 },
          ],
        },
        {
          cls: KnuckleRing,
          materials: [
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SilverRing()
  }
}

// level 3
export class JadeRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "옥반지",
    description: `“맑은 영혼의 돌.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 45,
    magicalDamage: 0,
    physicalPenetration: 40,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 4),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...JadeRing.meta,
      nexts: [
        {
          cls: DigitalRing,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: CrystalRing,
          materials: [
            { key: "int", length: 3 },
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new JadeRing()
  }
}

// level 3
export class LeatherRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "가죽반지",
    description: `“가볍고 부드러운 손맛.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 50,
    magicalDamage: 0,
    physicalPenetration: 15,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 5),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...LeatherRing.meta,
      nexts: [
        {
          cls: RuneRing,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
            { key: "luk", length: 3 },
          ],
        },
        {
          cls: SignetRing,
          materials: [
            { key: "wis", length: 3 },
            { key: "str", length: 3 },
            { key: "int", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new LeatherRing()
  }
}

// level 3
export class CandyRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "사탕반지",
    description: "“단맛은 잠깐, 충치는 영원.”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 40,
    physicalPenetration: 0,
    magicalPenetration: 10,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0.15,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 6),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CandyRing.meta,
      nexts: [
        {
          cls: SharpieRing,
          materials: [
            { key: "wis", length: 3 },
            { key: "str", length: 3 },
            { key: "int", length: 3 },
          ],
        },
        {
          cls: OnionRing,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CandyRing()
  }
}

// level 4
export class GoldRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "금반지",
    description: `“빛나는 부와 탐욕.”`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 550,
    magicalDamage: 0,
    physicalPenetration: 50,
    magicalPenetration: 0,
    physicalAllPercent: 50,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 7),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...GoldRing.meta,
      nexts: [
        {
          cls: DiamondRing,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: RubyRing,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "vit", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new GoldRing()
  }
}

// level 4
export class KnuckleRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "호신용반지",
    description: "“주먹보다 단단한 주먹.”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 550,
    magicalDamage: 0,
    physicalPenetration: 75,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 8),
    criticalChance: 0.1,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...KnuckleRing.meta,
      nexts: [
        {
          cls: OpalRing,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: ObsidianRing,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "vit", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new KnuckleRing()
  }
}

// level 4
export class DigitalRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "디지털링",
    description: "“역시 실용주의”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 480,
    physicalPenetration: 0,
    magicalPenetration: 40,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.2,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 9),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...DigitalRing.meta,
      nexts: [
        {
          cls: SapphireRing,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: RubyRing,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "vit", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new DigitalRing()
  }
}

// level 4
export class CrystalRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "수정반지",
    description: "“투명한 충전석.”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 50,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0.25,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 10),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CrystalRing.meta,
      nexts: [
        {
          cls: DiamondRing,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: ObsidianRing,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "vit", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new CrystalRing()
  }
}

// level 4
export class RuneRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "룬반지",
    description: "“새겨진 문양이 빛난다.”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 50,
    physicalAllPercent: 0,
    magicalAllPercent: 50,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 11),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...RuneRing.meta,
      nexts: [
        {
          cls: SapphireRing,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new RuneRing()
  }
}

// level 4
export class SignetRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "도장반지",
    description: "“이것은 우리의 약속”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 50,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 12),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 3,
  }

  constructor() {
    super({
      ...SignetRing.meta,
      nexts: [
        {
          cls: RubyRing,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "vit", length: 3 },
          ],
        },
        {
          cls: Bugles,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SignetRing()
  }
}

// level 4
export class SharpieRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "반지그림",
    description: "“반지의 꿈을 그리다.”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 800,
    magicalDamage: 0,
    physicalPenetration: 100,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 13),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...SharpieRing.meta,
      nexts: [
        {
          cls: OpalRing,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "vit", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SharpieRing()
  }
}

// level 4
export class OnionRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "양파링",
    description: "“냄새는 강하지만 맛은 굿.”",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 50,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 300,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...OnionRing.meta,
      nexts: [
        {
          cls: Bugles,
          materials: [
            { key: "agi", length: 5 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
          ],
        },
      ],
    })
  }

  static of() {
    return new OnionRing()
  }
}

// level 5
export class DiamondRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "다이아반지",
    description: "“부를 넘어선 위신.” - 치명타 확률 +5%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 15),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...DiamondRing.meta,
      nexts: [
        {
          cls: BornRing,
          materials: [
            { key: "int", length: 7 },
            { key: "cul", length: 6 },
            { key: "cha", length: 5 },
            { key: "vit", length: 4 },
          ],
        },
      ],
    })
  }

  static of() {
    return new DiamondRing()
  }
}

// level 5
export class OpalRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "오팔반지",
    description: "“무지갯빛 보호.” - 모든 속성 저항 +4%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 16),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...OpalRing.meta,
      nexts: [
        {
          cls: VampireRing,
          materials: [
            { key: "agi", length: 7 },
            { key: "luk", length: 6 },
            { key: "wis", length: 5 },
            { key: "str", length: 4 },
          ],
        },
      ],
    })
  }

  static of() {
    return new OpalRing()
  }
}

// level 5
export class ObsidianRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "흑요석반지",
    description: "“어둠이 빛을 삼킨다.” - 암흑 공격력 +8%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 17),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...ObsidianRing.meta,
      nexts: [
        {
          cls: BornRing,
          materials: [
            { key: "int", length: 7 },
            { key: "cul", length: 6 },
            { key: "cha", length: 5 },
            { key: "vit", length: 4 },
          ],
        },
      ],
    })
  }

  static of() {
    return new ObsidianRing()
  }
}

// level 5
export class SapphireRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "사파이어반지",
    description: "	“차가운 물빛.” - 빙결 공격력 +8%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 18),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...SapphireRing.meta,
      nexts: [
        {
          cls: Tattoo,
          materials: [
            { key: "agi", length: 7 },
            { key: "luk", length: 6 },
            { key: "wis", length: 5 },
            { key: "str", length: 4 },
          ],
        },
      ],
    })
  }

  static of() {
    return new SapphireRing()
  }
}

// level 5
export class RubyRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "루비반지",
    description: "“붉은 불꽃을 머금은 보석.” - 화염 공격력 +8%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 19),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...RubyRing.meta,
      nexts: [
        {
          cls: VampireRing,
          materials: [
            { key: "int", length: 7 },
            { key: "cul", length: 6 },
            { key: "cha", length: 5 },
            { key: "vit", length: 4 },
          ],
        },
      ],
    })
  }

  static of() {
    return new RubyRing()
  }
}

// level 5
export class Bugles extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "꼬깔과자",
    description: "“어릴 적 추억의 맛.” - 사용 시 랜덤 버프(공·방·속 +5%, 30초).",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 20),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Bugles.meta,
      nexts: [
        {
          cls: FourLeafClover,
          materials: [
            { key: "agi", length: 7 },
            { key: "luk", length: 6 },
            { key: "wis", length: 5 },
            { key: "str", length: 4 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Bugles()
  }
}

// level 6
export class BornRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "해골반지",
    description: "“죽음과 동행하는 장식.” - 언데드 피해 +10%, 착용자도 체력 재생 -2%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 21),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...BornRing.meta,
      nexts: [],
    })
  }

  static of() {
    return new BornRing()
  }
}

// level 6
export class VampireRing extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "뱀파이어인장",
    description: "“피의 계약.” - 공격 시 흡혈 4%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 22),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...VampireRing.meta,
      nexts: [],
    })
  }

  static of() {
    return new VampireRing()
  }
}

// level 6
export class Tattoo extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "타투",
    description: `“살에 새긴 영원한 약속.” - 방어 +3, 스킬 시전 중 경직 면역.`,
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 23),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Tattoo.meta,
      nexts: [],
    })
  }

  static of() {
    return new Tattoo()
  }
}

// level 6
export class FourLeafClover extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "네잎클로버",
    description: "“찾기 힘든 행운.” - 아이템 드롭률 +7%.",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
    physicalPenetration: 0,
    magicalPenetration: 1,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 3,
    spritePosition: etcUtil.getWeaponSpritePosition(3, 24),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...FourLeafClover.meta,
      nexts: [],
    })
  }

  static of() {
    return new FourLeafClover()
  }
}
