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
  speed: number
  range: number
  physicalDamage: number
  magicalDamage: number
  physicalPenetration: number
  magicalPenetration: number
  targetLength: number
  allTargetLength: number
  splash: number
  stun: number
  slow: number
  allCooltime: number
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
  allTargetLength = 0
  lastAttackTime = 0

  splash = 0
  stun = 0
  slow = 0

  nexts: NextInfo[] = []

  physicalDamage = 0
  magicalDamage = 0

  allCooltime = 0
  level = 0
  spritePosition = etcUtil.getWeaponSpritePosition(0, 0)
  index = 0

  criticalChance = 0 // 0.1이 10%
  criticalDamage = 0 // 2가 2배
  dotted = 0
  constructor(weapon: WeaponOptions) {
    Object.assign(this, weapon)
  }

  checkIsCooltime(time: number, cooldown: number) {
    return (
      time > this.lastAttackTime + (this.cooltime - (this.cooltime * cooldown) / 100) / window.speed
    )
  }

  /**
   * 호밍 탄환 발사
   */
  fireHomingWeapon(weaponIndex: number, currentTime: number, player: Player, enemy: Enemy) {
    this.lastAttackTime = currentTime

    // 플레이어 위치에서 탄환 생성
    const bullet = this.group?.create(
      player.x,
      player.y,
      "bullet"
    ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    if (!bullet) return

    bullet.setScale(0.1).setActive(true).setVisible(true).setData("target", enemy).setDepth(1)

    if (weaponIndex === 1) bullet.setAlpha(0)

    // 처음에 한 번 적 방향으로 설정
    const angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y)
    bullet.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)
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
