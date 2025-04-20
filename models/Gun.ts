import { Weapon, type WeaponOptions } from "./Weapon"

// level 1
export class Gun extends Weapon {
  static readonly meta: WeaponOptions = {
    level: 1,
    name: "일반권총",
    description: "빠른 연사와 적당한 데미지를 가집니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 1,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 1,
    allTargetLength: 0,
    splash: 0,
    stun: 0,
    slow: 0,
    allCooltime: 0,
  }

  constructor() {
    super({
      ...Gun.meta,
      nexts: [
        {
          cls: DoubleGun,
          materials: [
            { name: "힘", length: 1 },
            { name: "민첩", length: 1 },
          ],
        },
        {
          cls: ShotGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 2,
    name: "산탄총",
    description: "적당한 데미지를 가지며, 주변 적도 데미지를 받습니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 8,
    magicalDamage: 0,
    physicalPenetration: 3,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 100,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...ShotGun.meta,
      nexts: [
        {
          cls: MagicGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: AirGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 2,
    name: "일반쌍권총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...DoubleGun.meta,
      nexts: [
        {
          cls: MachineGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: FingerGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "마법권총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...MagicGun.meta,
      nexts: [
        {
          cls: BubbleGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: TazerGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "공기총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...AirGun.meta,
      nexts: [
        {
          cls: PulseGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: Firework,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "기관총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...MachineGun.meta,
      nexts: [
        {
          cls: SilentKiller,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: DrillGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 3,
    name: "삿대질",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...FingerGun.meta,
      nexts: [
        {
          cls: PepperSpray,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: EyeGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "거품발사기",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...BubbleGun.meta,
      nexts: [
        {
          cls: GrenadeLauncher,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: BlessedRevolver,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "전긴충격기",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...TazerGun.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: Cannon,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "펄스건",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...PulseGun.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: BlessedRevolver,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "폭죽",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...Firework.meta,
      nexts: [
        {
          cls: GrenadeLauncher,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: Cannon,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "소음기권총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...SilentKiller.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: CursedRevolver,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "드릴",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...DrillGun.meta,
      nexts: [
        {
          cls: PlasmaGun,
          materials: [{ name: "건강", length: 3 }],
        },
        {
          cls: CursedRevolver,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "후추스프레이",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...PepperSpray.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 4,
    name: "눈총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...EyeGun.meta,
      nexts: [
        {
          cls: SilverBulletGun,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "유탄발사기",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...GrenadeLauncher.meta,
      nexts: [
        {
          cls: Missile,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "은탄총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...SilverBulletGun.meta,
      nexts: [
        {
          cls: HeartBreaker,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "은탄총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...PlasmaGun.meta,
      nexts: [
        {
          cls: RadiationBeam,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "대포",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...Cannon.meta,
      nexts: [
        {
          cls: Missile,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "축복받은총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...BlessedRevolver.meta,
      nexts: [
        {
          cls: HeartBreaker,
          materials: [{ name: "건강", length: 3 }],
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
  static readonly meta: WeaponOptions = {
    level: 5,
    name: "저주받은총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
  }

  constructor() {
    super({
      ...CursedRevolver.meta,
      nexts: [
        {
          cls: Booger,
          materials: [{ name: "건강", length: 3 }],
        },
      ],
    })
  }

  static of() {
    return new CursedRevolver()
  }
}

// level 6
export class Missile extends Weapon {
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "미사일",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
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
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "코딱지",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
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

// level 6
export class RadiationBeam extends Weapon {
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "방사능총",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
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
export class HeartBreaker extends Weapon {
  static readonly meta: WeaponOptions = {
    level: 6,
    name: "하트브레이커",
    description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
    cooltime: 1000,
    speed: 500,
    range: 150,
    physicalDamage: 4,
    magicalDamage: 0,
    physicalPenetration: 1,
    magicalPenetration: 0,
    targetLength: 2,
    allTargetLength: 0,
    splash: 0,
    stun: 0, // 1000이어야 1초
    slow: 0, // 0.1이면 10%
    allCooltime: 0, // 0.01이 1%
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
