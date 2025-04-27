import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class ButterKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "버터칼",
    description: "근접 무기. 데미지는 크지만 사정거리가 짧습니다.",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 3,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 0),
  }

  constructor() {
    super({
      ...ButterKnife.meta,
      nexts: [
        {
          cls: KitchenKnife,
          materials: [
            { key: "str", length: 1 },
            { key: "agi", length: 1 },
          ],
        },
        {
          cls: CutterKnife,
          materials: [{ key: "str", length: 3 }],
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
    name: "식칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 1),
  }

  constructor() {
    super({
      ...KitchenKnife.meta,
      nexts: [
        {
          cls: SushiKnife,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: Scissors,
          materials: [{ key: "str", length: 3 }],
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
    name: "커터칼",
    description: "근접 무기. 데미지는 작지만 연사가 빠릅니다.",
    cooltime: 500,
    speed: 500,
    range: 100,
    physicalDamage: 3,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 2),
  }

  constructor() {
    super({
      ...CutterKnife.meta,
      nexts: [
        {
          cls: Hammer,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: AX,
          materials: [{ key: "str", length: 3 }],
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
    name: "회칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 3),
  }

  constructor() {
    super({
      ...SushiKnife.meta,
      nexts: [
        {
          cls: ButcherKnife,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: LongNails,
          materials: [{ key: "str", length: 3 }],
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
    name: "가위",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 4),
  }

  constructor() {
    super({
      ...Scissors.meta,
      nexts: [
        {
          cls: SwissArmyKnife,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: Fist,
          materials: [{ key: "str", length: 3 }],
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
    name: "망치",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 5),
  }

  constructor() {
    super({
      ...Hammer.meta,
      nexts: [
        {
          cls: CrossCutSaw,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: CrowBar,
          materials: [{ key: "str", length: 3 }],
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
    name: "도끼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 6),
  }

  constructor() {
    super({
      ...AX.meta,
      nexts: [
        {
          cls: Machete,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: KoreanHandPlow,
          materials: [{ key: "str", length: 3 }],
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
    name: "정육칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 7),
  }

  constructor() {
    super({
      ...ButcherKnife.meta,
      nexts: [
        {
          cls: BornSword,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: DualBlade,
          materials: [{ key: "str", length: 3 }],
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
    name: "긴손톱",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 8),
  }

  constructor() {
    super({
      ...LongNails.meta,
      nexts: [
        {
          cls: SurgicalKnife,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: CursedSword,
          materials: [{ key: "str", length: 3 }],
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
    name: "맥가이버칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 9),
  }

  constructor() {
    super({
      ...SwissArmyKnife.meta,
      nexts: [
        {
          cls: BlessedSword,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: DualBlade,
          materials: [{ key: "str", length: 3 }],
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
    name: "주먹",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 10),
  }

  constructor() {
    super({
      ...Fist.meta,
      nexts: [
        {
          cls: BornSword,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: CursedSword,
          materials: [{ key: "str", length: 3 }],
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
    name: "톱",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 11),
  }

  constructor() {
    super({
      ...CrossCutSaw.meta,
      nexts: [
        {
          cls: BlessedSword,
          materials: [{ key: "str", length: 3 }],
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
    name: "빠루",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 12),
  }

  constructor() {
    super({
      ...CrowBar.meta,
      nexts: [
        {
          cls: DualBlade,
          materials: [{ key: "str", length: 3 }],
        },
        {
          cls: BigAX,
          materials: [{ key: "str", length: 3 }],
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
    name: "마체테",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 13),
  }

  constructor() {
    super({
      ...Machete.meta,
      nexts: [
        {
          cls: SurgicalKnife,
          materials: [{ key: "str", length: 3 }],
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
    name: "호미",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 14),
  }

  constructor() {
    super({
      ...KoreanHandPlow.meta,
      nexts: [
        {
          cls: BigAX,
          materials: [{ key: "str", length: 3 }],
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
    name: "뼈칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 15),
  }

  constructor() {
    super({
      ...BornSword.meta,
      nexts: [
        {
          cls: DragonSlayer,
          materials: [{ key: "str", length: 3 }],
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
    name: "메스",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 16),
  }

  constructor() {
    super({
      ...SurgicalKnife.meta,
      nexts: [
        {
          cls: SnotWhip,
          materials: [{ key: "str", length: 3 }],
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
    name: "축복받은칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 17),
  }

  constructor() {
    super({
      ...BlessedSword.meta,
      nexts: [
        {
          cls: LaserSword,
          materials: [{ key: "str", length: 3 }],
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
    name: "저주받은칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 18),
  }

  constructor() {
    super({
      ...CursedSword.meta,
      nexts: [
        {
          cls: DragonSlayer,
          materials: [{ key: "str", length: 3 }],
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
    name: "쌍칼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 19),
  }

  constructor() {
    super({
      ...DualBlade.meta,
      nexts: [
        {
          cls: SnotWhip,
          materials: [{ key: "str", length: 3 }],
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
    name: "대형도끼",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 20),
  }

  constructor() {
    super({
      ...BigAX.meta,
      nexts: [
        {
          cls: DeathScythe,
          materials: [{ key: "str", length: 3 }],
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
    name: "드래곤슬레이어",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 21),
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
    name: "콧물채찍",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 22),
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
    name: "레이저소드",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 23),
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
    name: "사신의낫",
    description: "근접 무기. 데미지가 강력합니다",
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 24),
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
