import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Gun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "일반권총",
    description: `“누구에게나 익숙한 9mm 한‑발.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 2,
    magicalDamage: 0,
    physicalPenetration: 0,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Gun.meta,
      nexts: [
        {
          cls: DoubleGun,
          materials: [
            { key: "agi", length: 2 },
            { key: "vit", length: 1 },
          ],
        },
        {
          cls: ShotGun,
          materials: [
            { key: "cul", length: 2 },
            { key: "cha", length: 1 },
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
    name: "산탄총",
    description: `“펑! 하고 퍼지는 쇠구슬의 벽.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 7,
    magicalDamage: 0,
    physicalPenetration: 3,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
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
  }

  constructor() {
    super({
      ...ShotGun.meta,
      nexts: [
        {
          cls: MagicGun,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: AirGun,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 2 },
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
    name: "일반쌍권총",
    description: `“두 손, 두 방아쇠, 두 배의 불꽃.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 8,
    magicalDamage: 0,
    physicalPenetration: 2,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 2),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...DoubleGun.meta,
      nexts: [
        {
          cls: MachineGun,
          materials: [
            { key: "str", length: 3 },
            { key: "agi", length: 2 },
            { key: "wis", length: 1 },
          ],
        },
        {
          cls: FingerGun,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
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
    name: "마법권총",
    description: `“총열에 기도를 담아 쏘아 올린다.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 60,
    physicalPenetration: 0,
    magicalPenetration: 6,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...MagicGun.meta,
      nexts: [
        {
          cls: BubbleGun,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
            { key: "luk", length: 3 },
          ],
        },
        {
          cls: TazerGun,
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
    return new MagicGun()
  }
}

// level 3
export class AirGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "공기총",
    description: `“바람을 모아 쏘는 조용한 한 방.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 45,
    magicalDamage: 0,
    physicalPenetration: 5,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 4),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...AirGun.meta,
      nexts: [
        {
          cls: PulseGun,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
          ],
        },
        {
          cls: Firework,
          materials: [
            { key: "agi", length: 3 },
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
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
    name: "기관총",
    description: "`“이제부터는 ‘분’ 단위가 아니라 ‘초’ 단위로 탄약을 쓴다.”`",
    cooltime: 200,
    speed: 500,
    range: 110,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 5,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 5),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...MachineGun.meta,
      nexts: [
        {
          cls: SilentKiller,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "cul", length: 3 },
          ],
        },
        {
          cls: DrillGun,
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
    return new MachineGun()
  }
}

// level 3
export class FingerGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "삿대질",
    description: `“말 안 듣는 놈한테는 손가락이 총.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 60,
    physicalPenetration: 0,
    magicalPenetration: 6,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
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
  }

  constructor() {
    super({
      ...FingerGun.meta,
      nexts: [
        {
          cls: PepperSpray,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: EyeGun,
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
    return new FingerGun()
  }
}

// level 4
export class BubbleGun extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "거품발사기",
    description: `“상냥한 듯 보이지만 질식사 주의.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 250,
    physicalPenetration: 0,
    magicalPenetration: 20,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0.3,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 7),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...BubbleGun.meta,
      nexts: [
        {
          cls: GrenadeLauncher,
          materials: [
            { key: "vit", length: 5 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: BlessedRevolver,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "전기충격기",
    description: `“찌릿! - 정전기는 덤.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 200,
    magicalDamage: 0,
    physicalPenetration: 14,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
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
  }

  constructor() {
    super({
      ...TazerGun.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
          ],
        },
        {
          cls: Cannon,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "펄스건",
    description: `“초록빛 파동이 관통한다.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 350,
    magicalDamage: 0,
    physicalPenetration: 14,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0.3,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 9),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...PulseGun.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
          ],
        },
        {
          cls: BlessedRevolver,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "폭죽",
    description: `“축제용? 아니 전장용.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 330,
    magicalDamage: 0,
    physicalPenetration: 11,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

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
  }

  constructor() {
    super({
      ...Firework.meta,
      nexts: [
        {
          cls: GrenadeLauncher,
          materials: [
            { key: "vit", length: 5 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: Cannon,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "소음기권총",
    description: `“조용히, 하지만 확실히.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 250,
    magicalDamage: 0,
    physicalPenetration: 10,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 11),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...SilentKiller.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
          ],
        },
        {
          cls: CursedRevolver,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "드릴",
    description: `“회전하는 총열, 회전하는 악몽.”`,
    cooltime: 200,
    speed: 500,
    range: 110,
    physicalDamage: 77,
    magicalDamage: 0,
    physicalPenetration: 12,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 12),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...DrillGun.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 4 },
          ],
        },
        {
          cls: CursedRevolver,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "후추스프레이",
    description: `“눈물 쏙!”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 0,
    magicalDamage: 250,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0.3,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 13),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 3,
  }

  constructor() {
    super({
      ...PepperSpray.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
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
    name: "눈총",
    description: `“말보다 빠른 눈빛.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 300,
    physicalPenetration: 0,
    magicalPenetration: 12,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...EyeGun.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [
            { key: "str", length: 4 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
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
    name: "유탄발사기",
    description: `“아크 궤적, 폭발하는 정의.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 27,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 100,
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
  }

  constructor() {
    super({
      ...GrenadeLauncher.meta,
      nexts: [
        {
          cls: Missile,
          materials: [
            { key: "vit", length: 7 },
            { key: "agi", length: 6 },
            { key: "luk", length: 5 },
            { key: "wis", length: 4 },
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
    name: "은탄총",
    description: `“달빛을 품은 은의 재앙.”`,
    cooltime: 800,
    speed: 500,
    range: 160,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 31,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 16),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...SilverBulletGun.meta,
      nexts: [
        {
          cls: HeartBreaker,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 6 },
            { key: "cul", length: 5 },
            { key: "cha", length: 4 },
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
    name: "플라즈마총",
    description: `	“빛과 열로 적을 태운다.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 1800,
    physicalPenetration: 0,
    magicalPenetration: 29,
    physicalAllPercent: 0,
    magicalAllPercent: 50,
    targetLength: 3,

    splash: 0,
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
  }

  constructor() {
    super({
      ...PlasmaGun.meta,
      nexts: [
        {
          cls: RadiationBeam,
          materials: [
            { key: "vit", length: 7 },
            { key: "agi", length: 6 },
            { key: "luk", length: 5 },
            { key: "wis", length: 4 },
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
    name: "대포",
    description: "“작지만 성능은 진짜.”",
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 32,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
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
  }

  constructor() {
    super({
      ...Cannon.meta,
      nexts: [
        {
          cls: Missile,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 6 },
            { key: "cul", length: 5 },
            { key: "cha", length: 4 },
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
    name: "축복받은총",
    description: `“성스러운 빛이 총열 끝에서 피어난다.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 2200,
    magicalDamage: 0,
    physicalPenetration: 28,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
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
  }

  constructor() {
    super({
      ...BlessedRevolver.meta,
      nexts: [
        {
          cls: HeartBreaker,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 6 },
            { key: "cul", length: 5 },
            { key: "cha", length: 4 },
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
    name: "저주받은총",
    description: `“총열에서 검은 한기가 뿜어져 나온다.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 2200,
    physicalPenetration: 0,
    magicalPenetration: 31,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0.44,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 20),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CursedRevolver.meta,
      nexts: [
        {
          cls: Booger,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 6 },
            { key: "cul", length: 5 },
            { key: "cha", length: 4 },
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
    name: "하트브레이커",
    description: `“심장을 두드리는 한 방.”`,
    cooltime: 1000,
    speed: 500,
    range: 110,
    physicalDamage: 7777,
    magicalDamage: 0,
    physicalPenetration: 77,
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
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 21),
    criticalChance: 0.1,
    criticalDamage: 10,
    dotted: 0,
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
    name: "방사능총",
    description: `“보이지 않는 후폭풍.”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 5600,
    physicalPenetration: 0,
    magicalPenetration: 82,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 4,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 22),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 5,
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
    name: "미사일",
    description: `“잠깐, 이건 반칙 아닌가?”`,
    cooltime: 800,
    speed: 500,
    range: 160,
    physicalDamage: 5000,
    magicalDamage: 0,
    physicalPenetration: 60,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 4,

    splash: 120,
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
    name: "코딱지",
    description: `“더럽다고 무시하지 마!”`,
    cooltime: 1000,
    speed: 500,
    range: 160,
    physicalDamage: 0,
    magicalDamage: 4000,
    physicalPenetration: 0,
    magicalPenetration: 4000,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 1,
    slowOne: 0,
    allCooltime: 0,
    index: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(0, 24),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
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
