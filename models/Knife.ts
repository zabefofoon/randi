import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class ButterKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "버터칼",
    description: `“따뜻한 식빵용이지만 찌르면 아프다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 3,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...ButterKnife.meta,
      nexts: [
        {
          cls: KitchenKnife,
          materials: [
            { key: "str", length: 1 },
            { key: "vit", length: 1 },
            { key: "agi", length: 1 },
          ],
        },
        {
          cls: CutterKnife,
          materials: [
            { key: "luk", length: 2 },
            { key: "wis", length: 1 },
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
    name: "식칼",
    description: `“주방 장인의 친구.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 1),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...KitchenKnife.meta,
      nexts: [
        {
          cls: SushiKnife,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 2 },
          ],
        },
        {
          cls: Scissors,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
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
    name: "커터칼",
    description: `“칼날이 잘 드러나는 만큼 위험도 높다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 8,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 2),
    criticalChance: 0.3, // 0.1이 10%
    criticalDamage: 2, // 3배
    dotted: 0,
  }

  constructor() {
    super({
      ...CutterKnife.meta,
      nexts: [
        {
          cls: Hammer,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: AX,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 2 },
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
    name: "회칼",
    description: `“살점이 매끄럽게 잘린다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 45,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 2,
  }

  constructor() {
    super({
      ...SushiKnife.meta,
      nexts: [
        {
          cls: ButcherKnife,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "cul", length: 3 },
          ],
        },
        {
          cls: LongNails,
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
    return new SushiKnife()
  }
}

// level 3
export class Scissors extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "가위",
    description: `“잘라낸다는 건 곧 구속이라는 뜻.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 55,
    physicalPenetration: 0,
    magicalPenetration: 15,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 500,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 4),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Scissors.meta,
      nexts: [
        {
          cls: SwissArmyKnife,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: Fist,
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
    return new Scissors()
  }
}

// level 3
export class Hammer extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "망치",
    description: `“못 박기용? 아니, 두개골 깨기용.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 45,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 300,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 5),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Hammer.meta,
      nexts: [
        {
          cls: CrossCutSaw,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
            { key: "luk", length: 3 },
          ],
        },
        {
          cls: CrowBar,
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
    return new Hammer()
  }
}

// level 3
export class AX extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "도끼",
    description: `“손맛이 묵직하다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 45,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 150,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 6),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...AX.meta,
      nexts: [
        {
          cls: Machete,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
          ],
        },
        {
          cls: KoreanHandPlow,
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
    return new AX()
  }
}

// level 4
export class ButcherKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "정육칼",
    description: `	“힘줄도 뼈도 꾸욱.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 450,
    magicalDamage: 0,
    physicalPenetration: 50,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0.2,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 7),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 3,
  }

  constructor() {
    super({
      ...ButcherKnife.meta,
      nexts: [
        {
          cls: BornSword,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: DualBlade,
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
    return new ButcherKnife()
  }
}

// level 4
export class LongNails extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "긴손톱",
    description: `“짐승의 본능.” - 빠른 연타, 치명 피해 낮음.`,
    cooltime: 200,
    speed: 500,
    range: 100,
    physicalDamage: 100,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 8),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...LongNails.meta,
      nexts: [
        {
          cls: SurgicalKnife,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: CursedSword,
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
    return new LongNails()
  }
}

// level 4
export class SwissArmyKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "맥가이버칼",
    description: `어디든지 요긴하게 쓰이는 만능칼”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 370,
    physicalPenetration: 1,
    magicalPenetration: 50,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.2,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 9),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...SwissArmyKnife.meta,
      nexts: [
        {
          cls: BlessedSword,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: DualBlade,
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
    return new SwissArmyKnife()
  }
}

// level 4
export class Fist extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "주먹",
    description: `믿을건 역시 주먹”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 370,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 10),
    criticalChance: 0.15,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...Fist.meta,
      nexts: [
        {
          cls: BornSword,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: CursedSword,
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
    return new Fist()
  }
}

// level 4
export class CrossCutSaw extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "톱",
    description: `“도려내듯 파고든다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 450,
    magicalDamage: 0,
    physicalPenetration: 150,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 11),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CrossCutSaw.meta,
      nexts: [
        {
          cls: BlessedSword,
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
    return new CrossCutSaw()
  }
}

// level 4
export class CrowBar extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "빠루",
    description: `건축 현장의 다크호스.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 700,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 12),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CrowBar.meta,
      nexts: [
        {
          cls: DualBlade,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: BigAX,
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
    return new CrowBar()
  }
}

// level 4
export class Machete extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "마체테",
    description: `“정글 개척자의 칼.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 400,
    magicalDamage: 0,
    physicalPenetration: 50,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 13),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Machete.meta,
      nexts: [
        {
          cls: SurgicalKnife,
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
    return new Machete()
  }
}

// level 4
export class KoreanHandPlow extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "호미",
    description: `“흙도 사람도 뒤집는다.”`,
    cooltime: 500,
    speed: 500,
    range: 100,
    physicalDamage: 350,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 50,
    stun: 0,
    stunMany: 0,
    slow: 0.2,
    slowOne: 0,
    allCooltime: 0,
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...KoreanHandPlow.meta,
      nexts: [
        {
          cls: BigAX,
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
    return new KoreanHandPlow()
  }
}

// level 5
export class BornSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "뼈칼",
    description: `“뼈를 깎아 만든 뼈 파괴자.” - 해골형 몬스터 추가 피해.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 15),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...BornSword.meta,
      nexts: [
        {
          cls: DragonSlayer,
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
    return new BornSword()
  }
}

// level 5
export class SurgicalKnife extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "메스",
    description: `“외과용 정밀 베기.” - 크리티컬 시 내부 출혈, DOT 높음.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 16),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...SurgicalKnife.meta,
      nexts: [
        {
          cls: SnotWhip,
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
    return new SurgicalKnife()
  }
}

// level 5
export class BlessedSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "축복받은칼",
    description: `“성수에 담가낸 깨끗한 날.” - 언데드·악마에게 성속 추가.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 17),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...BlessedSword.meta,
      nexts: [
        {
          cls: LaserSword,
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
    return new BlessedSword()
  }
}

// level 5
export class CursedSword extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "저주받은칼",
    description: `“들면 들수록 속삭임이 들려온다.” - 흡혈과 자신의 방어력 감소 동시.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 18),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...CursedSword.meta,
      nexts: [
        {
          cls: DragonSlayer,
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
    return new CursedSword()
  }
}

// level 5
export class DualBlade extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "쌍칼",
    description: `“두 손엔 두 개, 춤추는 칼날.” - 공격 속도 대폭 상승.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 19),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...DualBlade.meta,
      nexts: [
        {
          cls: SnotWhip,
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
    return new DualBlade()
  }
}

// level 5
export class BigAX extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "대형도끼",
    description: `“도끼는 컸고, 문제도 컸다.” - 느리지만 한 방 대미지 극대.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 20),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...BigAX.meta,
      nexts: [
        {
          cls: DeathScythe,
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
    return new BigAX()
  }
}

// level 6
export class DragonSlayer extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "드래곤슬레이어",
    description: `“용을 잡기 위해 태어난 거대 철검.” - 거대형·비행형 몬스터 추가 피해.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 21),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
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
    description: `“질겅질겅 끈적!” - 타격 시 슬로우+지속 피해.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 22),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
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
    description: `“미래에서 왔다.” - 타격 시 절단 판정, 실드 무시.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 23),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
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
    description: `“삶과 죽음의 경계를 베어낸다.” - 체력이 낮은 적 즉사 라인 보너스.`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 1,
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
    index: 1,
    spritePosition: etcUtil.getWeaponSpritePosition(1, 24),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
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
