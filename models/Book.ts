import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Book extends Weapon {
  static readonly meta: WeaponOptions = {
    level: 1,
    name: "공책",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Book.meta,
      nexts: [
        {
          cls: ThickBook,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: ThinBook,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 2,
    name: "두꺼운책",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...ThickBook.meta,
      nexts: [
        {
          cls: SpringBook,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: TextBook,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
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
  static readonly meta: WeaponOptions = {
    level: 2,
    name: "얇은책",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...ThinBook.meta,
      nexts: [
        {
          cls: Map,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: PictureBook,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "스프링책",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...SpringBook.meta,
      nexts: [
        {
          cls: MagicBook,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: MobilePhone,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "교과서",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...TextBook.meta,
      nexts: [
        {
          cls: Regulations,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: WorkBook,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "지도",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Map.meta,
      nexts: [
        {
          cls: TreasureMap,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: EvacuationMap,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "지도",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...PictureBook.meta,
      nexts: [
        {
          cls: Diary,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: Menu,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "마법책",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...MagicBook.meta,
      nexts: [
        {
          cls: Revelation,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: HellMap,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "핸드폰",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...MobilePhone.meta,
      nexts: [
        {
          cls: Labtop,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: AnswerSheet,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "규칙서",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Regulations.meta,
      nexts: [
        {
          cls: LawBook,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: HellMap,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "문제집",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...WorkBook.meta,
      nexts: [
        {
          cls: Revelation,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: AnswerSheet,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "보물지도",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...TreasureMap.meta,
      nexts: [
        {
          cls: LawBook,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "피난안내도",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...EvacuationMap.meta,
      nexts: [
        {
          cls: HellMap,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: OrderForm,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "일기장",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Diary.meta,
      nexts: [
        {
          cls: Labtop,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "메뉴판",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Menu.meta,
      nexts: [
        {
          cls: OrderForm,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "계시록",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Revelation.meta,
      nexts: [
        {
          cls: Grimoire,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "노트북",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Labtop.meta,
      nexts: [
        {
          cls: TabletPC,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "답안지",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...AnswerSheet.meta,
      nexts: [
        {
          cls: TabletPC,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "법책",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...LawBook.meta,
      nexts: [
        {
          cls: Constitution,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "지옥안내도",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...HellMap.meta,
      nexts: [
        {
          cls: Grimoire,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "주문서",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...OrderForm.meta,
      nexts: [
        {
          cls: Counterfeit,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "마도서",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "타블릿피씨",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "헌법",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "위조지폐",
    description: "강력한 마법공격",
    cooltime: 1000,
    speed: 500,
    range: 75,
    physicalDamage: 0,
    magicalDamage: 6,
    physicalPenetration: 0,
    magicalPenetration: 1,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
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
