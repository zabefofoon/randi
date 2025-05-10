import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Book extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "공책",
    description: `“여백뿐인 가능성.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 6,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Book.meta,
      nexts: [
        {
          cls: ThickBook,
          materials: [
            { key: "vit", length: 2 },
            { key: "agi", length: 1 },
          ],
        },
        {
          cls: ThinBook,
          materials: [
            { key: "luk", length: 2 },
            { key: "wis", length: 1 },
          ],
        },
      ],
    })
  }

  static of() {
    return new Book()
  }
}

// level 2
export class ThickBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "두꺼운책",
    description: `“잡으면 팔 아픈 지식.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 10,
    magicalDamage: 0,
    physicalPenetration: 3,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 1),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...ThickBook.meta,
      nexts: [
        {
          cls: SpringBook,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 2 },
          ],
        },
        {
          cls: TextBook,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new ThickBook()
  }
}

// level 2
export class ThinBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "얇은책",
    description: `“휴대성 만점.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 10,
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
    allCooltime: 0.1,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 2),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...ThinBook.meta,
      nexts: [
        {
          cls: Map,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: PictureBook,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
      ],
    })
  }

  static of() {
    return new ThickBook()
  }
}

// level 3
export class SpringBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "스프링책",
    description: `“펼치기 쉽고 던지기도 쉽다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 45,
    magicalDamage: 0,
    physicalPenetration: 6,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 100,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...SpringBook.meta,
      nexts: [
        {
          cls: MagicBook,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "cul", length: 3 },
          ],
        },
        {
          cls: MobilePhone,
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
    return new SpringBook()
  }
}

// level 3
export class TextBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "교과서",
    description: `“정석의 힘.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 45,
    physicalPenetration: 0,
    magicalPenetration: 5,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.15,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 4),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...TextBook.meta,
      nexts: [
        {
          cls: Regulations,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "str", length: 3 },
          ],
        },
        {
          cls: WorkBook,
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
    return new TextBook()
  }
}

// level 3
export class Map extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "지도",
    description: `“길만 알면 살아남는다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 42,
    physicalPenetration: 0,
    magicalPenetration: 5,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 5),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Map.meta,
      nexts: [
        {
          cls: TreasureMap,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
            { key: "luk", length: 3 },
          ],
        },
        {
          cls: EvacuationMap,
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
    return new Map()
  }
}

// level 3
export class PictureBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 3,
    name: "그림책",
    description: `“그림은 힘이 세다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 55,
    physicalPenetration: 0,
    magicalPenetration: 6,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 6),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...PictureBook.meta,
      nexts: [
        {
          cls: Diary,
          materials: [
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
          ],
        },
        {
          cls: Menu,
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
    return new PictureBook()
  }
}

// level 4
export class MagicBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "마법책",
    description: `“주문 한 줄에 화살 한 다발.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 250,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 12,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 7),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...MagicBook.meta,
      nexts: [
        {
          cls: Revelation,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: HellMap,
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
    return new MagicBook()
  }
}

// level 4
export class MobilePhone extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "핸드폰",
    description: `“전화는 덤, 게임은 본업.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 250,
    magicalDamage: 0,
    physicalPenetration: 12,
    magicalPenetration: 0,
    physicalAllPercent: 12,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 8),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...MobilePhone.meta,
      nexts: [
        {
          cls: Labtop,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: AnswerSheet,
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
    return new MobilePhone()
  }
}

// level 4
export class Regulations extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "규칙서",
    description: `“규칙이 곧 힘이다.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 300,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 9),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Regulations.meta,
      nexts: [
        {
          cls: LawBook,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: HellMap,
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
    return new Regulations()
  }
}

// level 4
export class WorkBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "문제집",
    description: `“풀지 않으면 계속 따라온다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 250,
    magicalDamage: 0,
    physicalPenetration: 0,
    magicalPenetration: 16,
    physicalAllPercent: 15,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 10),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 4,
  }

  constructor() {
    super({
      ...WorkBook.meta,
      nexts: [
        {
          cls: Revelation,
          materials: [
            { key: "str", length: 5 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
          ],
        },
        {
          cls: AnswerSheet,
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
    return new WorkBook()
  }
}

// level 4
export class TreasureMap extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "보물지도",
    description: `“X표시에 눈이 간다.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 250,
    physicalPenetration: 0,
    magicalPenetration: 12,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 11),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...TreasureMap.meta,
      nexts: [
        {
          cls: LawBook,
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
    return new TreasureMap()
  }
}

// level 4
export class EvacuationMap extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "피난안내도",
    description: `“비상구는 저쪽.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 280,
    magicalDamage: 0,
    physicalPenetration: 14,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 12),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...EvacuationMap.meta,
      nexts: [
        {
          cls: HellMap,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: OrderForm,
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
    return new EvacuationMap()
  }
}

// level 4
export class Diary extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "일기장",
    description: `“감정이 적힌 종이.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 280,
    physicalPenetration: 0,
    magicalPenetration: 13,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 100,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 13),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Diary.meta,
      nexts: [
        {
          cls: Labtop,
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
    return new Diary()
  }
}

// level 4
export class Menu extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "메뉴판",
    description: `“배고플 땐 공격보다 밥.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 320,
    magicalDamage: 0,
    physicalPenetration: 13,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0.3,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Menu.meta,
      nexts: [
        {
          cls: OrderForm,
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
    return new Menu()
  }
}

// level 5
export class Revelation extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "계시록",
    description: `“끝과 시작의 비밀.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 1500,
    physicalPenetration: 0,
    magicalPenetration: 26,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 15),
    criticalChance: 0.3,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...Revelation.meta,
      nexts: [
        {
          cls: Grimoire,
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
    return new Revelation()
  }
}

// level 5
export class Labtop extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "노트북",
    description: `“모든 지식을 담는다.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 1700,
    magicalDamage: 0,
    physicalPenetration: 28,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.4,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 16),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Labtop.meta,
      nexts: [
        {
          cls: TabletPC,
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
    return new Labtop()
  }
}

// level 5
export class AnswerSheet extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "답안지",
    description: `“정답은 알려주지만 대가는 혹독.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 0,
    magicalPenetration: 0,
    physicalAllPercent: 27,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 17),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...AnswerSheet.meta,
      nexts: [
        {
          cls: TabletPC,
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
    return new AnswerSheet()
  }
}

// level 5
export class LawBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "법책",
    description: `“법은 만인을 굴복시킨다.”`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 1800,
    physicalPenetration: 0,
    magicalPenetration: 29,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 300,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 18),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...LawBook.meta,
      nexts: [
        {
          cls: Constitution,
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
    return new LawBook()
  }
}

// level 5
export class HellMap extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "지옥안내도",
    description: `“환영합니다, 단편도표.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 2650,
    physicalPenetration: 0,
    magicalPenetration: 44,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0.5,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 19),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 5,
  }

  constructor() {
    super({
      ...HellMap.meta,
      nexts: [
        {
          cls: Grimoire,
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
    return new HellMap()
  }
}

// level 5
export class OrderForm extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "주문서",
    description: `“계약서에 사인은 피.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 2500,
    magicalDamage: 0,
    physicalPenetration: 28,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 3,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 20),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
  }

  constructor() {
    super({
      ...OrderForm.meta,
      nexts: [
        {
          cls: Counterfeit,
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
    return new OrderForm()
  }
}

// level 6
export class Grimoire extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "마도서",
    description: `“살아있는 글귀.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 4200,
    physicalPenetration: 0,
    magicalPenetration: 540,
    physicalAllPercent: 0,
    magicalAllPercent: 80,
    targetLength: 3,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 21),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Grimoire.meta,
      nexts: [],
    })
  }

  static of() {
    return new Grimoire()
  }
}

// level 6
export class TabletPC extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "타블릿피씨",
    description: `“휴대용 다차원 포털.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4500,
    magicalDamage: 0,
    physicalPenetration: 84,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 4,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.5,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 22),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...TabletPC.meta,
      nexts: [],
    })
  }

  static of() {
    return new TabletPC()
  }
}

// level 6
export class Constitution extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "지옥의법",
    description: `	“불경과 율법, 그리고 고문.”`,
    cooltime: 444,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 4444,
    physicalPenetration: 0,
    magicalPenetration: 444,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 4,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0.44,
    slowOne: 4.44,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 23),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
  }

  constructor() {
    super({
      ...Constitution.meta,
      nexts: [],
    })
  }

  static of() {
    return new Constitution()
  }
}

// level 6
export class Counterfeit extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "장부",
    description: `“끝까지 기억할것이다.”`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4000,
    magicalDamage: 0,
    physicalPenetration: 92,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    targetLength: 4,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 24),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 8,
  }

  constructor() {
    super({
      ...Counterfeit.meta,
      nexts: [],
    })
  }

  static of() {
    return new Counterfeit()
  }
}
