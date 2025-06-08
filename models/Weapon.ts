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
  physicalDecrease: number // 물리방어력 저하
  magicalDecrease: number // 마법방어력 저하
  physicalAllPercent: number // 물리피해상승 100이면 100퍼
  magicalAllPercent: number // 마법피해상승 100이면 100퍼
  targetLength: number // 몇마리 공격할건지
  splash: number // 스플래시 범위 50정도가 적당한듯
  stun: number // 스턴 1000가 1초
  stunMany: number // 범위스턴 1000가 1초
  slow: number // 1이 1%
  slowOne: number // 단일 슬로우 1이 1%
  allCooltime: number // 전체 쿨타임 0.1이 10%
  spritePosition: string
  criticalChance: number // 0.1이 10%
  criticalDamage: number // 2가 2배
  dotted: number // 3이면 3번
  armerBreak: number // 아머브레이크
  index?: number
  nexts?: NextInfo[]
}

export interface NextInfo {
  cls: typeof Weapon
  materials: MaterialReq[]
}

export class Weapons {
  weapons: (Weapon | undefined)[] = [undefined, undefined, undefined, undefined]
  bulletPool: Phaser.GameObjects.Group

  constructor(
    public scene: Phaser.Scene,
    public enemies: Enemies,
    public materials: Materials,
    public enforces: Enforces
  ) {
    this.bulletPool = this.scene.physics.add.group({
      classType: Phaser.GameObjects.Image,
      maxSize: 120,
      runChildUpdate: false,
    })
    for (let i = 0; i < 120; i++) {
      const bullet = scene.physics.add
        .image(0, 0, "bullet")
        .setScale(0.1)
        .setActive(false)
        .setVisible(false)
      this.bulletPool.add(bullet)
    }

    scene.physics.add.overlap(
      this.bulletPool,
      enemies.group,
      (bullet, enemy) => this.weaponHitEnemy(bullet as Phaser.Physics.Arcade.Image, enemy as Enemy),
      undefined,
      this
    )
  }

  get minLevel() {
    return this.weapons.map((weapon) => weapon?.level ?? 0).sort((a, b) => a - b)[0]
  }

  getHowManyLevels(level: number) {
    return this.weapons.filter((weapon) => weapon).filter((weapon) => weapon!.level >= level).length
  }

  addWeapon(index: number, weapon: Weapon) {
    this.weapons[index] = weapon
  }

  weaponHitEnemy(bullet: Phaser.Physics.Arcade.Image, enemy: Enemy) {
    const weaponData = bullet.weapon

    enemy.takeDamage(weaponData, this.materials, this.enforces)

    this.enemies.applyStunMany(enemy, bullet, this.materials)
    this.enemies.applySplashDamage(enemy, bullet, this.materials, this.enforces)
    enemy.applyStunOne(weaponData, this.materials)

    bullet.disableBody(true, true)
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
  armerBreak = 0

  physicalDecrease = 0
  magicalDecrease = 0

  constructor(weapon: WeaponOptions) {
    Object.assign(this, weapon)
  }

  checkIsCooltime(time: number, cooldown: number) {
    return (
      time >
      this.lastAttackTime +
        Math.max(200, this.cooltime - (this.cooltime * cooldown) / 100) / window.speed
    )
  }

  fireHomingWeapon(
    weapons: Weapons,
    weaponIndex: number,
    currentTime: number,
    player: Player,
    enemy: Enemy
  ) {
    this.lastAttackTime = currentTime

    const bullet1 = weapons.bulletPool.getFirstDead(false)
    if (!bullet1) return

    bullet1.enableBody(true, player.x, player.y, true, true)

    bullet1.weapon = weapons.weapons[weaponIndex]!
    bullet1.target = enemy

    if (!bullet1.body) return
    const dx = enemy.x - player.x
    const dy = enemy.y - player.y
    const len = Math.hypot(dx, dy) || 1
    const vx = (dx / len) * this.speed * window.speed
    const vy = (dy / len) * this.speed * window.speed
    bullet1.body.setVelocity(vx, vy)
  }

  followEnemy(weapons: Weapons) {
    const children = weapons.bulletPool.getChildren()
    for (const bullet of children) {
      const bulletObj = bullet as Phaser.Physics.Arcade.Image
      if (!bulletObj.active) return // false 대신 void

      const target = bulletObj.target as Enemy
      if (!target || !target.active) {
        bulletObj.disableBody(true, true)
        return
      }

      const ang = Phaser.Math.Angle.Between(bulletObj.x, bulletObj.y, target.x, target.y)
      const body = bulletObj.body as Phaser.Physics.Arcade.Body
      body.setVelocity(
        Math.cos(ang) * (this.speed * window.speed),
        Math.sin(ang) * (this.speed * window.speed)
      )

      // 화면 밖 검사
      if (bulletObj.x < 0 || bulletObj.x > 960 || bulletObj.y < 0 || bulletObj.y > 540)
        bulletObj.disableBody(true, true)
    }
  }

  setIndex(index: number) {
    this.index = index
    return this
  }
}
