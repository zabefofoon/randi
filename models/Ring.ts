import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Ring extends Weapon {
  static readonly meta: WeaponOptions = {
    level: 1,
    name: "반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...Ring.meta,
      nexts: [
        {
          cls: CopperRing,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: FlowerRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 2,
    name: "구리반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...CopperRing.meta,
      nexts: [
        {
          cls: SilverRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: JadeRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 2,
    name: "꽃반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...FlowerRing.meta,
      nexts: [
        {
          cls: LeatherRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: CandyRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "은도금반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...SilverRing.meta,
      nexts: [
        {
          cls: GoldRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: KnuckleRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "옥반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...JadeRing.meta,
      nexts: [
        {
          cls: DigitalRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: CrystalRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "가죽반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...LeatherRing.meta,
      nexts: [
        {
          cls: RuneRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: SignetRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "사탕반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...CandyRing.meta,
      nexts: [
        {
          cls: SharpieRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: OnionRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "금반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...GoldRing.meta,
      nexts: [
        {
          cls: DiamondRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: RubyRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "호신용반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...KnuckleRing.meta,
      nexts: [
        {
          cls: OpalRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: ObsidianRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "호신용반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...DigitalRing.meta,
      nexts: [
        {
          cls: SapphireRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: RubyRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "수정반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...CrystalRing.meta,
      nexts: [
        {
          cls: DiamondRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: ObsidianRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "룬반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...RuneRing.meta,
      nexts: [
        {
          cls: SapphireRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "룬반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...SignetRing.meta,
      nexts: [
        {
          cls: RubyRing,
          materials: [{ name: "힘", length: 3 }],
        },
        {
          cls: Bugles,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "반지그림",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...SharpieRing.meta,
      nexts: [
        {
          cls: OpalRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "양파링",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...OnionRing.meta,
      nexts: [
        {
          cls: Bugles,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "다이아반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...DiamondRing.meta,
      nexts: [
        {
          cls: BornRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "오팔반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...OpalRing.meta,
      nexts: [
        {
          cls: VampireRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "흑요석반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...ObsidianRing.meta,
      nexts: [
        {
          cls: BornRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "사파이어반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...SapphireRing.meta,
      nexts: [
        {
          cls: Tattoo,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "루비반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...RubyRing.meta,
      nexts: [
        {
          cls: VampireRing,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "꼬깔과자",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...Bugles.meta,
      nexts: [
        {
          cls: FourLeafClover,
          materials: [{ name: "힘", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "해골반지",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "뱀파이어인장",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "타투",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "네잎클로버",
    description: "마법공격",
    cooltime: 1000,
    speed: 500,
    range: 300,
    physicalDamage: 0,
    magicalDamage: 8,
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
      ...FourLeafClover.meta,
      nexts: [],
    })
  }

  static of() {
    return new FourLeafClover()
  }
}
