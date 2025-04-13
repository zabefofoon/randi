import type { Enemies, Enemy } from "./Enemies"
import type { Enforces } from "./Enforces"
import type { Material, Materials } from "./Material"
import type { Player } from "./Player"

export interface WeaponNext {
  name: string
  materials: { name: Material["name"]; length: number }[]
  description: string
  level: number
}

export class Weapons {
  weapons: (Weapon | undefined)[] = [undefined, undefined, undefined, undefined]
  scene: Phaser.Scene
  enemies: Enemies
  materials: Materials
  enforces: Enforces

  constructor(scene: Phaser.Scene, enemies: Enemies, materials: Materials, enforces: Enforces) {
    this.scene = scene
    this.enemies = enemies
    this.materials = materials
    this.enforces = enforces
  }

  addWeapon(index: number, weapon: Weapon) {
    this.weapons[index] = weapon
    const w = this.weapons[index]
    if (!w) return

    w.group = this.scene.physics.add.group({ collideWorldBounds: false })

    this.scene.physics.add.overlap(
      w.group,
      this.enemies.group,
      (weaponObj, enemyObj) => this.weaponHitEnemy(weaponObj, enemyObj, weapon),
      undefined,
      this
    )
  }

  weaponHitEnemy(
    weaponObj:
      | Phaser.Physics.Arcade.Body
      | Phaser.Physics.Arcade.StaticBody
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    enemyObj:
      | Phaser.Physics.Arcade.Body
      | Phaser.Physics.Arcade.StaticBody
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Tilemaps.Tile,
    weaponData: Weapon
  ) {
    const weapon = weaponObj as Phaser.Physics.Arcade.Sprite
    const enemy = enemyObj as Enemy
    this.enemies.takeDamage(enemy, weaponData, this.materials, this.enforces)
    this.enemies.applySplashDamage(weapon.x, weapon.y, weaponData, this.materials, this.enforces)

    // 탄환 제거
    weaponObj.destroy()
  }
}

export abstract class Weapon {
  group?: Phaser.Physics.Arcade.Group
  name = ""
  description = ""
  cooltime = 0
  speed = 0
  range = 0

  physicalPenetration = 0
  magicalPenetration = 0
  targetLength = 0
  allTargetLength = 0
  lastAttackTime = 0

  splash = 0
  stun = 0
  slow = 0

  nexts: WeaponNext[] = []

  physicalDamage = 0
  magicalDamage = 0

  allCooltime = 0
  level = 0

  constructor(weapon: ClassToRaw<Weapon>) {
    Object.assign(this, weapon)
  }

  checkIsCooltime(time: number, cooldown: number) {
    return time > this.lastAttackTime + (this.cooltime - (this.cooltime * cooldown) / 100)
  }

  /**
   * 호밍 탄환 발사
   */
  fireHomingWeapon(currentTime: number, player: Player, enemy: Enemy) {
    this.lastAttackTime = currentTime

    // 플레이어 위치에서 탄환 생성
    const weapon = this.group?.create(
      player.x,
      player.y + 20,
      this.name
    ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    if (!weapon) return

    weapon.setActive(true)
    weapon.setVisible(true)

    weapon.setData("target", enemy)

    // 처음에 한 번 적 방향으로 설정
    const angle = Phaser.Math.Angle.Between(weapon.x, weapon.y, enemy.x, enemy.y)
    weapon.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)
  }

  followEnemy() {
    this.group?.getChildren().forEach((obj) => {
      const weaponObj = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      if (!weaponObj.active) return

      // bullet에 저장해둔 target(Enemy)을 따라가도록
      const target = weaponObj.getData(
        "target"
      ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      if (!target || !target.active) return

      const angle = Phaser.Math.Angle.Between(weaponObj.x, weaponObj.y, target.x, target.y)
      weaponObj.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)

      // 화면 밖으로 나가면 제거
      this.destroyWhenOutOfMap()
    })
  }

  destroyWhenOutOfMap() {
    this.group?.getChildren().forEach((obj) => {
      const weaponObj = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      if (!weaponObj.active) return

      // 화면 밖으로 나가면 제거
      if (weaponObj.x < 0 || weaponObj.x > 800 || weaponObj.y < 0 || weaponObj.y > 600) {
        weaponObj.destroy()
      }
    })
  }
}

export class Gun extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      group,
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
      lastAttackTime: 0,
      splash: 0,
      stun: 0, // 1000이어야 1초
      slow: 0, // 0.1이면 10%
      allCooltime: 0, // 0.01이 1%
      nexts: [
        {
          name: "일반쌍권총",
          level: 2,
          description: "빠른 연사와 적당한 데미지를 가지며, 동시에 두번 공격합니다.",
          materials: [
            {
              name: "힘",
              length: 1,
            },
            {
              name: "민첩",
              length: 1,
            },
          ],
        },
        {
          name: "마법권총",
          level: 2,
          description: "빠른 연사와 적당한 데미지를 가지며, 적을 느리게 합니다.",
          materials: [
            {
              name: "지식",
              length: 1,
            },
            {
              name: "카리스마",
              length: 1,
            },
          ],
        },
        {
          name: "산탄총",
          level: 3,
          description: "느린 연사를 가지지만 적당한 데미지를 가지며, 주변 적도 데미지를 받습니다.",
          materials: [
            {
              name: "건강",
              length: 3,
            },
          ],
        },
      ],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new Gun(group)
  }
}

export class DoubleGun extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      group,
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
      lastAttackTime: 0,
      splash: 0,
      stun: 0, // 1000이어야 1초
      slow: 0, // 0.1이면 10%
      allCooltime: 0, // 0.01이 1%
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new DoubleGun(group)
  }
}

export class MagicGun extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      group,
      level: 2,
      name: "마법권총",
      description: "빠른 연사와 적당한 데미지를 가지며, 적을 느리게 합니다.",
      cooltime: 1000,
      speed: 500,
      range: 150,
      physicalDamage: 0,
      magicalDamage: 4,
      physicalPenetration: 0,
      magicalPenetration: 1,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 100, // 1000이어야 1초
      slow: 0, // 0.1이면 10%
      allCooltime: 0, // 0.01이 1%
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new MagicGun(group)
  }
}

export class ShotGun extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      group,
      level: 3,
      name: "산탄총",
      description: "적당한 데미지를 가지며, 주변 적도 데미지를 받습니다.",
      cooltime: 1000,
      speed: 500,
      range: 100,
      physicalDamage: 8,
      magicalDamage: 0,
      physicalPenetration: 3,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 100,
      stun: 0, // 1000이어야 1초
      slow: 0, // 0.1이면 10%
      allCooltime: 0, // 0.01이 1%
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new ShotGun(group)
  }
}

export class Knife extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 1,
      name: "식도",
      description: "근접 무기. 데미지는 크지만 사정거리가 짧습니다.",
      cooltime: 1000,
      speed: 500,
      range: 75,
      physicalDamage: 3,
      magicalDamage: 0,
      physicalPenetration: 1,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [
        {
          name: "커터칼",
          level: 2,
          description: "근접 무기. 데미지는 작지만 연사가 빠릅니다.",
          materials: [
            {
              name: "민첩",
              length: 2,
            },
          ],
        },
        {
          name: "회칼",
          level: 2,
          description: "근접 무기. 근처 적도 데미지를 받습니다",
          materials: [
            {
              name: "힘",
              length: 1,
            },
            {
              name: "운",
              length: 1,
            },
          ],
        },
        {
          name: "망치",
          level: 3,
          description: "근접 무기. 데미지가 강력합니다",
          materials: [
            {
              name: "힘",
              length: 3,
            },
          ],
        },
      ],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new Knife(group)
  }
}

export class CutterKnife extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 2,
      name: "커터칼",
      description: "근접 무기. 데미지는 작지만 연사가 빠릅니다.",
      cooltime: 500,
      speed: 500,
      range: 75,
      physicalDamage: 3,
      magicalDamage: 0,
      physicalPenetration: 1,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new CutterKnife(group)
  }
}

export class SushiKnife extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 2,
      name: "회칼",
      description: "근접 무기. 근처 적도 데미지를 받습니다",
      cooltime: 1000,
      speed: 500,
      range: 75,
      physicalDamage: 5,
      magicalDamage: 0,
      physicalPenetration: 1,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 100,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new SushiKnife(group)
  }
}

export class Hammer extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "망치",
      description: "근접 무기. 데미지가 강력합니다",
      cooltime: 1000,
      speed: 500,
      range: 75,
      physicalDamage: 10,
      magicalDamage: 0,
      physicalPenetration: 1,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new Hammer(group)
  }
}

export class Book extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 2,
      name: "공책",
      description: "강력한 마법공격",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 6,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [
        {
          name: "두꺼운책",
          description: "적을 동시에 두명 공격. 가지고만 있어도 전체 연사속도가 빨라집니다.",
          level: 3,
          materials: [
            {
              name: "운",
              length: 1,
            },
            {
              name: "교양",
              length: 1,
            },
          ],
        },
        {
          name: "얇은책",
          level: 3,
          description: "적을 동시에 두명 공격. 가지고만 있어도 적의 이동속도가 느려집니다.",
          materials: [
            {
              name: "카리스마",
              length: 1,
            },
            {
              name: "민첩",
              length: 1,
            },
          ],
        },
        {
          name: "스프링책",
          level: 3,
          description: "적을 동시에 두명 공격. 공격당한 적은 스턴에 빠집니다.",
          materials: [
            {
              name: "지혜",
              length: 3,
            },
          ],
        },
      ],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new Book(group)
  }
}

export class ThickBook extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "두꺼운책",
      description: "적을 동시에 두명 공격. 가지고만 있어도 전체 연사속도가 빨라집니다.",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 2,
      magicalDamage: 8,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 2,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0.1, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new ThickBook(group)
  }
}

export class ThinBook extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "얇은책",
      description: "적을 동시에 두명 공격. 가지고만 있어도 적의 이동속도가 느려집니다.",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 10,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 2,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0.3,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new ThinBook(group)
  }
}

export class SpringBook extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "스프링책",
      description: "적을 동시에 두명 공격. 공격당한 적은 스턴에 빠집니다.",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 10,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 2,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 300,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new SpringBook(group)
  }
}

export class Ring extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 2,
      name: "반지",
      description: "마법공격",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 8,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [
        {
          name: "더블반지",
          level: 3,
          description: "마법공격. 가지고만 있어도 전체 쿨타임이 15% 감소합니다.",
          materials: [
            {
              name: "민첩",
              length: 3,
            },
          ],
        },
        {
          name: "은도금반지",
          level: 3,
          description: "마법공격. 주변 적들도 같이 공격합니다.",
          materials: [
            {
              name: "교양",
              length: 3,
            },
          ],
        },
        {
          name: "꽃반지",
          level: 3,
          description: "모든 무기의 공격 갯수를 한개씩 증가시킵니다.",
          materials: [
            {
              name: "운",
              length: 3,
            },
          ],
        },
      ],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new Ring(group)
  }
}

export class DoubleRing extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "더블반지",
      description: "마법공격. 가지고만 있어도 전체 쿨타임이 15% 감소합니다.",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 12,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 0,
      stun: 0,
      slow: 0,
      allCooltime: 0.15, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new DoubleRing(group)
  }
}

export class SilverPlateRing extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "은도금반지",
      description: "마법공격. 주변 적들도 같이 공격합니다.",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 12,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 0,
      lastAttackTime: 0,
      splash: 75,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new SilverPlateRing(group)
  }
}

export class FlowerRing extends Weapon {
  constructor(group?: Phaser.Physics.Arcade.Group) {
    super({
      level: 3,
      name: "꽃반지",
      description: "모든 무기의 공격 갯수를 한개씩 증가시킵니다.",
      cooltime: 2000,
      speed: 500,
      range: 300,
      physicalDamage: 0,
      magicalDamage: 12,
      physicalPenetration: 0,
      magicalPenetration: 0,
      targetLength: 1,
      allTargetLength: 1,
      lastAttackTime: 0,
      splash: 50,
      stun: 0,
      slow: 0,
      allCooltime: 0, // 0.01이 1%
      group,
      nexts: [],
    })
  }

  static of(group?: Phaser.Physics.Arcade.Group) {
    return new FlowerRing(group)
  }
}
