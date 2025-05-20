import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Book extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 1,
    name: "Book",
    description: `BookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 0),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Book.meta,
      nexts: [
        {
          cls: ThickBook,
          materials: [
            { key: "vit", length: 2 },
            { key: "agi", length: 2 },
          ],
        },
        {
          cls: ThinBook,
          materials: [
            { key: "luk", length: 2 },
            { key: "wis", length: 2 },
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
    name: "ThickBook",
    description: `ThickBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 26,
    magicalDamage: 0,
    physicalPenetration: 3,
    magicalPenetration: 0,
    physicalAllPercent: 5,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 1),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...ThickBook.meta,
      nexts: [
        {
          cls: SpringBook,
          materials: [
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "cul", length: 2 },
          ],
        },
        {
          cls: TextBook,
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
    return new ThickBook()
  }
}

// level 2
export class ThinBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 2,
    name: "ThinBook",
    description: `ThinBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 26,
    physicalPenetration: 0,
    magicalPenetration: 4,
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
    allCooltime: 0.03,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 2),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...ThinBook.meta,
      nexts: [
        {
          cls: Map,
          materials: [
            { key: "vit", length: 3 },
            { key: "agi", length: 3 },
            { key: "luk", length: 2 },
          ],
        },
        {
          cls: PictureBook,
          materials: [
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "int", length: 2 },
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
    name: "SpringBook",
    description: `SpringBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 60,
    magicalDamage: 60,
    physicalPenetration: 3,
    magicalPenetration: 3,
    physicalAllPercent: 7,
    magicalAllPercent: 7,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 3),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...SpringBook.meta,
      nexts: [
        {
          cls: MagicBook,
          materials: [
            { key: "int", length: 5 },
            { key: "cul", length: 3 },
            { key: "str", length: 2 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: MobilePhone,
          materials: [
            { key: "agi", length: 5 },
            { key: "cha", length: 3 },
            { key: "vit", length: 2 },
            { key: "luk", length: 2 },
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
    name: "TextBook",
    description: `TextBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 60,
    magicalDamage: 60,
    physicalPenetration: 3,
    magicalPenetration: 3,
    physicalAllPercent: 7,
    magicalAllPercent: 7,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 4),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...TextBook.meta,
      nexts: [
        {
          cls: Regulations,
          materials: [
            { key: "wis", length: 4 },
            { key: "luk", length: 3 },
            { key: "int", length: 3 },
            { key: "str", length: 2 },
          ],
        },
        {
          cls: WorkBook,
          materials: [
            { key: "int", length: 4 },
            { key: "cul", length: 3 },
            { key: "cha", length: 3 },
            { key: "agi", length: 2 },
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
    name: "Map",
    description: `MapDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 124,
    physicalPenetration: 0,
    magicalPenetration: 5,
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
    allCooltime: 0.07,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 5),
    criticalChance: 0.2,
    criticalDamage: 2,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Map.meta,
      nexts: [
        {
          cls: TreasureMap,
          materials: [
            { key: "vit", length: 4 },
            { key: "agi", length: 3 },
            { key: "luk", length: 3 },
            { key: "cul", length: 2 },
          ],
        },
        {
          cls: EvacuationMap,
          materials: [
            { key: "wis", length: 4 },
            { key: "str", length: 3 },
            { key: "int", length: 3 },
            { key: "agi", length: 2 },
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
    name: "PictureBook",
    description: `PictureBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 113,
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
    slowOne: 0,
    allCooltime: 0.05,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 6),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...PictureBook.meta,
      nexts: [
        {
          cls: Diary,
          materials: [
            { key: "cul", length: 4 },
            { key: "cha", length: 3 },
            { key: "vit", length: 3 },
            { key: "wis", length: 2 },
          ],
        },
        {
          cls: Menu,
          materials: [
            { key: "agi", length: 4 },
            { key: "luk", length: 3 },
            { key: "wis", length: 3 },
            { key: "cul", length: 2 },
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
    name: "MagicBook",
    description: `MagicBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 350,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 12,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

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
    armerBreak: 0,
  }

  constructor() {
    super({
      ...MagicBook.meta,
      nexts: [
        {
          cls: Revelation,
          materials: [
            { key: "int", length: 6 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "str", length: 2 },
          ],
        },
        {
          cls: HellMap,
          materials: [
            { key: "vit", length: 5 },
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
    name: "MobilePhone",
    description: `MobilePhoneDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 350,
    magicalDamage: 0,
    physicalPenetration: 12,
    magicalPenetration: 0,
    physicalAllPercent: 12,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 8),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...MobilePhone.meta,
      nexts: [
        {
          cls: Labtop,
          materials: [
            { key: "str", length: 7 },
            { key: "int", length: 4 },
            { key: "cul", length: 3 },
            { key: "cha", length: 2 },
          ],
        },
        {
          cls: AnswerSheet,
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
    return new MobilePhone()
  }
}

// level 4
export class Regulations extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "Regulations",
    description: `RegulationsDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 14,
    physicalAllPercent: 0,
    magicalAllPercent: 12,
    physicalDecrease: 0,
    magicalDecrease: 0,
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
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Regulations.meta,
      nexts: [
        {
          cls: LawBook,
          materials: [
            { key: "str", length: 6 },
            { key: "int", length: 4 },
            { key: "cul", length: 4 },
            { key: "cha", length: 2 },
          ],
        },
        {
          cls: HellMap,
          materials: [
            { key: "vit", length: 5 },
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
    name: "WorkBook",
    description: `WorkBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 340,
    magicalDamage: 0,
    physicalPenetration: 16,
    magicalPenetration: 0,
    physicalAllPercent: 15,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 10),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 2,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...WorkBook.meta,
      nexts: [
        {
          cls: Revelation,
          materials: [
            { key: "int", length: 6 },
            { key: "cul", length: 4 },
            { key: "cha", length: 4 },
            { key: "str", length: 2 },
          ],
        },
        {
          cls: AnswerSheet,
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
    return new WorkBook()
  }
}

// level 4
export class TreasureMap extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "TreasureMap",
    description: `TreasureMapDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 350,
    physicalPenetration: 0,
    magicalPenetration: 12,
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
    allCooltime: 0.1,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 11),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...TreasureMap.meta,
      nexts: [
        {
          cls: LawBook,
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
    return new TreasureMap()
  }
}

// level 4
export class EvacuationMap extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "EvacuationMap",
    description: `EvacuationMapDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 450,
    magicalDamage: 0,
    physicalPenetration: 14,
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
    allCooltime: 0.1,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 12),
    criticalChance: 0.2,
    criticalDamage: 2,
    dotted: 1,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...EvacuationMap.meta,
      nexts: [
        {
          cls: HellMap,
          materials: [
            { key: "vit", length: 5 },
            { key: "agi", length: 4 },
            { key: "luk", length: 4 },
            { key: "wis", length: 3 },
          ],
        },
        {
          cls: OrderForm,
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
    return new EvacuationMap()
  }
}

// level 4
export class Diary extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 4,
    name: "Diary",
    description: `DiaryDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 0,
    magicalDamage: 450,
    physicalPenetration: 0,
    magicalPenetration: 13,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 1,

    splash: 80,
    stun: 0,
    stunMany: 100,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.07,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 13),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Diary.meta,
      nexts: [
        {
          cls: Labtop,
          materials: [
            { key: "vit", length: 5 },
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
    name: "Menu",
    description: `MenuDesc`,
    cooltime: 1000,
    speed: 500,
    range: 100,
    physicalDamage: 500,
    magicalDamage: 0,
    physicalPenetration: 13,
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
    slowOne: 30,
    allCooltime: 0.07,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 14),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Menu.meta,
      nexts: [
        {
          cls: OrderForm,
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
    return new Menu()
  }
}

// level 5
export class Revelation extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "Revelation",
    description: `RevelationDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 1500,
    physicalPenetration: 0,
    magicalPenetration: 26,
    physicalAllPercent: 0,
    magicalAllPercent: 20,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 15),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Revelation.meta,
      nexts: [
        {
          cls: Grimoire,
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
    return new Revelation()
  }
}

// level 5
export class Labtop extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "Labtop",
    description: `LabtopDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 1700,
    magicalDamage: 0,
    physicalPenetration: 28,
    magicalPenetration: 0,
    physicalAllPercent: 20,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 0,
    allCooltime: 0.15,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 16),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...Labtop.meta,
      nexts: [
        {
          cls: TabletPC,
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
    return new Labtop()
  }
}

// level 5
export class AnswerSheet extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "AnswerSheet",
    description: `AnswerSheetDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 1800,
    magicalDamage: 0,
    physicalPenetration: 26,
    magicalPenetration: 0,
    physicalAllPercent: 27,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 17),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 10,
  }

  constructor() {
    super({
      ...AnswerSheet.meta,
      nexts: [
        {
          cls: TabletPC,
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
    return new AnswerSheet()
  }
}

// level 5
export class LawBook extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "LawBook",
    description: `LawBookDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 1800,
    physicalPenetration: 0,
    magicalPenetration: 29,
    physicalAllPercent: 0,
    magicalAllPercent: 25,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0.15,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 18),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...LawBook.meta,
      nexts: [
        {
          cls: Constitution,
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
    return new LawBook()
  }
}

// level 5
export class HellMap extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "HellMap",
    description: `HellMapDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 2650,
    physicalPenetration: 0,
    magicalPenetration: 44,
    physicalAllPercent: 0,
    magicalAllPercent: 30,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 30,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 19),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 2,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...HellMap.meta,
      nexts: [
        {
          cls: Grimoire,
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
    return new HellMap()
  }
}

// level 5
export class OrderForm extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 5,
    name: "OrderForm",
    description: `OrderFormDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 2500,
    magicalDamage: 0,
    physicalPenetration: 28,
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
    slowOne: 30,
    allCooltime: 0.1,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 20),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 0,
  }

  constructor() {
    super({
      ...OrderForm.meta,
      nexts: [
        {
          cls: Counterfeit,
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
    return new OrderForm()
  }
}

// level 6
export class Grimoire extends Weapon {
  static override readonly meta: WeaponOptions = {
    level: 6,
    name: "Grimoire",
    description: `GrimoireDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 4200,
    physicalPenetration: 0,
    magicalPenetration: 540,
    physicalAllPercent: 0,
    magicalAllPercent: 50,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 2,

    splash: 80,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 50,
    allCooltime: 0,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 21),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 3,
    armerBreak: 0,
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
    name: "TabletPC",
    description: `TabletPCDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4500,
    magicalDamage: 0,
    physicalPenetration: 84,
    magicalPenetration: 0,
    physicalAllPercent: 50,
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
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 22),
    criticalChance: 0.2,
    criticalDamage: 3,
    dotted: 0,
    armerBreak: 15,
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
    name: "Constitution",
    description: `ConstitutionDesc`,
    cooltime: 444,
    speed: 500,
    range: 150,
    physicalDamage: 0,
    magicalDamage: 4444,
    physicalPenetration: 0,
    magicalPenetration: 444,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 4,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 44,
    slowOne: 44,
    allCooltime: 0.2,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 23),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 0,
    armerBreak: 0,
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
    name: "Counterfeit",
    description: `CounterfeitDesc`,
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4000,
    magicalDamage: 0,
    physicalPenetration: 92,
    magicalPenetration: 0,
    physicalAllPercent: 0,
    magicalAllPercent: 0,
    physicalDecrease: 0,
    magicalDecrease: 0,
    targetLength: 4,

    splash: 0,
    stun: 0,
    stunMany: 0,
    slow: 0,
    slowOne: 50,
    allCooltime: 0.2,
    index: 2,
    spritePosition: etcUtil.getWeaponSpritePosition(2, 24),
    criticalChance: 0,
    criticalDamage: 0,
    dotted: 8,
    armerBreak: 0,
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
