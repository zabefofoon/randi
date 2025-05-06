import type { Enemies, Enemy } from "./Enemies"
import type { Enforces } from "./Enforces"
import type { Material, Materials } from "./Material"
import type { Player } from "./Player"

export interface MaterialReq {
  key: Material["key"]
  length: number
}
export interface WeaponOptions {
  level: number
  name: string
  description: string
  cooltime: number
  speed: number // 무기 날라가는 속도
  range: number // 범위
  physicalDamage: number // 물리데미지
  magicalDamage: number // 마법데미지
  physicalPenetration: number // 물리관통력
  magicalPenetration: number // 마법관통력
  physicalAllPercent: number // 물리피해상승 100이면 100퍼
  magicalAllPercent: number // 마법피해상승 100이면 100퍼
  targetLength: number // 몇마리 공격할건지
  splash: number // 스플래시 범위 50정도가 적당한듯
  stun: number // 스턴 1000가 1초
  stunMany: number // 범위스턴 1000가 1초
  slow: number // 전체 0.1이 10%
  slowOne: number // 단일 슬로우 0.1이 10%
  allCooltime: number // 전체 쿨타임 0.1이 10%
  spritePosition: string
  criticalChance: number // 0.1이 10%
  criticalDamage: number // 2가 2배
  dotted: number // 3이면 3번
  index?: number
  nexts?: NextInfo[]
}

export interface NextInfo {
  cls: typeof Weapon
  materials: MaterialReq[]
}

export class Weapons {
  weapons: (Weapon | undefined)[] = [undefined, undefined, undefined, undefined]
  weaponDistDiscs: Phaser.GameObjects.Group

  constructor(
    public scene: Phaser.Scene,
    public enemies: Enemies,
    public materials: Materials,
    public enforces: Enforces
  ) {
    this.weaponDistDiscs = this.scene.physics.add.group({ collideWorldBounds: false })

    this.weapons.forEach((_, index) => {
      let color
      switch (index) {
        case 0:
          color = 0xff0000
          break
        case 1:
          color = 0x0ff000
          break
        case 2:
          color = 0x00ff00
          break
        case 3:
          color = 0x000ff0
          break
      }
      const circle = this.scene.add.circle(0, 0, 0, color, 0.1)
      this.scene.physics.add.existing(circle)
      const body = circle.body as Phaser.Physics.Arcade.Body
      body.setCircle(1).setOffset(0).setAllowGravity(false).setImmovable(true)

      this.weaponDistDiscs.add(circle)
    })
  }
  updateDistDiscs(x: number, y: number) {
    this.weaponDistDiscs.getChildren().forEach((disc) => {
      const arc = disc as Phaser.GameObjects.Arc
      arc.setPosition(x, y)
    })

    this.enemies.children.forEach((enemy) => enemy.clearTint())
    this.scene.physics.overlap(this.weaponDistDiscs, this.enemies.group, (disc, enemy) => {
      enemy.setTint(0xff0000)
    })
  }

  getHowManyLevels(level: number) {
    return this.weapons.filter((weapon) => weapon).filter((weapon) => weapon!.level >= level).length
  }

  addWeapon(index: number, weapon: Weapon) {
    this.weapons[index] = weapon
    const w = this.weapons[index]
    if (!w) return

    w.group = this.scene.physics.add.group({ collideWorldBounds: false })

    this.scene.physics.add.overlap(w.group, this.enemies.group, (weaponObj, enemyObj) =>
      this.weaponHitEnemy(weaponObj, enemyObj, weapon)
    )

    this.weaponDistDiscs.getChildren().forEach((disc, discIndex) => {
      if (discIndex !== index) return

      const arc = disc as Phaser.GameObjects.Arc
      const body = arc.body as Phaser.Physics.Arcade.Body

      // arc.setRadius(weapon.range)
      // body.setCircle(weapon.range)
    })
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
    this.enemies.applySplashDamage(
      enemy,
      weapon.x,
      weapon.y,
      weaponData,
      this.materials,
      this.enforces
    )
    this.enemies.applyStunMany(weapon.x, weapon.y, weaponData, this.materials)
    weaponObj.destroy()
  }
}

export abstract class Weapon implements WeaponOptions {
  static meta: WeaponOptions
  group?: Phaser.Physics.Arcade.Group
  name = ""
  description = ""
  cooltime = 0
  speed = 0
  range = 0

  physicalPenetration = 0
  magicalPenetration = 0
  targetLength = 0
  lastAttackTime = 0

  splash = 0
  stun = 0
  stunMany = 0
  slow = 0
  slowOne = 0
  nexts: NextInfo[] = []

  physicalDamage = 0
  magicalDamage = 0
  physicalAllPercent = 0
  magicalAllPercent = 0
  allCooltime = 0
  level = 0
  spritePosition = etcUtil.getWeaponSpritePosition(0, 0)
  index = 0

  criticalChance = 0
  criticalDamage = 0
  dotted = 0
  constructor(weapon: WeaponOptions) {
    Object.assign(this, weapon)
  }

  checkIsCooltime(time: number, cooldown: number) {
    return (
      time > this.lastAttackTime + (this.cooltime - (this.cooltime * cooldown) / 100) / window.speed
    )
  }

  fireHomingWeapon(weaponIndex: number, currentTime: number, player: Player, enemy: Enemy) {
    this.lastAttackTime = currentTime

    const bullet = this.group?.create(
      player.x,
      player.y,
      "bullet"
    ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    if (!bullet) return

    bullet.setScale(0.1).setActive(true).setVisible(true).setData("target", enemy).setDepth(1)

    if (weaponIndex === 1) bullet.setAlpha(0)

    const angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y)
    bullet.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)
  }

  followEnemy() {
    this.group?.getChildren().forEach((obj) => {
      const weaponObj = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      if (!weaponObj.active) return

      const target = weaponObj.getData(
        "target"
      ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      if (!target || !target.active) return

      const angle = Phaser.Math.Angle.Between(weaponObj.x, weaponObj.y, target.x, target.y)
      weaponObj.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)

      this.destroyWhenOutOfMap()
    })
  }

  destroyWhenOutOfMap() {
    this.group?.getChildren().forEach((obj) => {
      const weaponObj = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      if (!weaponObj.active) return

      if (weaponObj.x < 0 || weaponObj.x > 960 || weaponObj.y < 0 || weaponObj.y > 540) {
        weaponObj.destroy()
      }
    })
  }

  setIndex(index: number) {
    this.index = index
    return this
  }
}
