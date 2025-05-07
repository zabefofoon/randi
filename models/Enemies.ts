import Phaser from "phaser"
import { Character, type PurchaseCharacter } from "./Character"
import type { Enforces } from "./Enforces"
import type { Materials } from "./Material"
import type { Player } from "./Player"
import type { Weapon } from "./Weapon"
export class Enemies {
  scene: Phaser.Scene
  group: Phaser.Physics.Arcade.Group
  pathes: { x: number; y: number }[]
  baseSpeed: number

  constructor(
    scene: Phaser.Scene,
    private selectedCharacter: typeof Character | PurchaseCharacter
  ) {
    this.scene = scene
    this.group = scene.physics.add.group({ collideWorldBounds: false })

    const gameWidth = scene.scale.width
    const gameHeight = scene.scale.height

    this.pathes = [
      { x: gameWidth * 0.15, y: gameHeight * 0.2 },
      { x: gameWidth * 0.15, y: gameHeight * 0.78 },
      { x: gameWidth * 0.87, y: gameHeight * 0.78 },
      { x: gameWidth * 0.87, y: gameHeight * 0.18 },
    ]
    this.baseSpeed = 160
  }
  get children() {
    return this.group.getChildren() as Enemy[]
  }

  spawnEnemy(round: number, coins: Ref<number>) {
    const { x, y } = this.pathes[0]

    this.group.add(
      new Enemy(this.scene, x, y, false, "enemy", this.pathes, round, coins, this.selectedCharacter)
    )
    this.scene.events.emit("enemy-spawn")
  }

  spawnBoss(round: number, coins: Ref<number>) {
    const { x, y } = this.pathes[0]

    this.group.add(
      new Enemy(this.scene, x, y, true, "enemy", this.pathes, round, coins, this.selectedCharacter)
    )
    this.scene.events.emit("enemy-spawn")
  }

  takeDamage(enemy: Enemy, weapon: Weapon, materials: Materials, enforces: Enforces) {
    enemy.takeDamage(weapon, materials, enforces)
  }

  applySplashDamage(
    enemy: Enemy,
    centerX: number,
    centerY: number,
    weaponData: Weapon,
    materials: Materials,
    enforces: Enforces
  ) {
    this.children
      .filter((child) => child != enemy)
      .forEach((enemy) => {
        if (!enemy.active) return

        const dist = Math.round(Phaser.Math.Distance.Between(centerX, centerY, enemy.x, enemy.y))
        if (dist <= weaponData.splash + materials.calculateStat("vit")) {
          enemy.takeDamage(weaponData, materials, enforces, dist)
        }
      })
  }

  applyStunMany(centerX: number, centerY: number, weaponData: Weapon, materials: Materials) {
    this.children.forEach((enemy) => {
      if (!enemy.active) return

      const dist = Math.round(Phaser.Math.Distance.Between(centerX, centerY, enemy.x, enemy.y))
      if (dist <= weaponData.splash + materials.calculateStat("vit")) {
        enemy.data.set("stunnedMany", true)
        enemy.stunManyTimer?.remove()
        enemy.stunManyTimer = this.scene.time.delayedCall(weaponData.stunMany, () => {
          if (!enemy?.active) return
          enemy.data.set("stunnedMany", false)
          enemy.stunManyTimer = undefined
        })
      }
    })
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  pathes: { x: number; y: number }[]
  physicalDefence = 0
  magicalDefence = 0
  private hitSlowTimer?: Phaser.Time.TimerEvent
  stunManyTimer?: Phaser.Time.TimerEvent

  private activeDots: Phaser.Time.TimerEvent[] = []

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public isBoss: boolean,
    key: string,
    paths: { x: number; y: number }[],
    private round: number,
    private coins: Ref<number>,
    private selectedCharacter: typeof Character | PurchaseCharacter
  ) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    const hp = this.isBoss ? this.increaseHP(this.round) * 3 : this.increaseHP(this.round)

    this.setData("hp", hp)
      .setData("pathIndex", 0)
      .setData("maxHp", hp)
      .setData("hpBar", this.scene.add.graphics())
      .setScale(0.75)

    if (this.isBoss) this.setTint(0xff0000)

    this.physicalDefence = this.isBoss
      ? numberUtil.addPercent(this.round + this.increaseDefence(this.round), 10)
      : this.round + this.increaseDefence(this.round)
    this.magicalDefence = this.isBoss
      ? numberUtil.addPercent(this.round + this.increaseDefence(this.round), 10)
      : this.round + this.increaseDefence(this.round)

    this.pathes = paths

    this.anims.play("enemy-walk")
  }

  private increaseHP(index: number): number {
    return (Math.pow(index * 2, 2) + 10) * (Math.floor(this.round / 10) + 1)
  }

  increaseDefence(round: number): number {
    const group = Math.ceil(round / 10)
    return [0, 0, 5, 10, 15, 30, 60, 100][group]
  }

  moveEnemyAlongPath(player: Player, weapons: (Weapon | undefined)[], materials: Materials) {
    if (this.getData("stunned")) return
    if (this.getData("stunnedMany")) return
    const pathIndex = this.getData("pathIndex") as number
    if (pathIndex == null) return

    const baseSpeed = numberUtil.addPercent(this.isBoss ? 80 : 120, this.round * 2) * window.speed
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y)
    const slowRange = 200

    const weaponSlows = weapons.reduce((acc, current) => acc + (current?.slow ?? 0), 0)

    const speed =
      distanceToPlayer < slowRange
        ? baseSpeed * (1 - Math.min(0.9, weaponSlows + materials.calculateStat("cul")))
        : baseSpeed

    const target = this.pathes[pathIndex]
    const dist = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.pathes[pathIndex].x,
      this.pathes[pathIndex].y
    )
    if (dist < 5) {
      this.x = target.x
      this.y = target.y
      let nextIndex = pathIndex + 1
      if (nextIndex >= this.pathes.length) nextIndex = 0
      this.setFlipX([0, 3].includes(nextIndex))
      this.setData("pathIndex", nextIndex)
    }
    const isSlowed = this.getData("slowed")
    const totalSpeed = isSlowed ? speed * (1 - Math.min(0.9, isSlowed)) : speed

    if (this.active) this.scene.physics.moveTo(this, target.x, target.y, totalSpeed)
  }

  updateEnemyHpBar() {
    const hp = this.getData("hp")
    const maxHp = this.getData("maxHp")
    const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
    if (!hpBar) return

    hpBar.clear()

    hpBar.fillStyle(0x000000)
    hpBar.fillRect(this.x - 16, this.y - 30, 32, 4) // width 32, height 4

    const hpPercent = hp / maxHp
    hpBar.fillStyle(0xff0000)
    hpBar.fillRect(this.x - 16, this.y - 30, 32 * hpPercent, 4)
  }

  showDamageText(damageValue: number, weapon: Weapon) {
    let color = "#ffffff"
    if (weapon.level === 2) color = "#2563eb"
    if (weapon.level === 3) color = "#9333ea"
    if (weapon.level === 4) color = "#eab308"
    if (weapon.level === 5) color = "#e879f9"
    if (weapon.level === 6) color = "#f87171"

    const dmgText = this.scene.add
      .text(this.x, this.y - weapon.index * 8, `-${damageValue}`, {
        fontSize: "18px",
        color,
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
        align: "center",
      })
      .setOrigin(0.5)

    this.scene.tweens.add({
      targets: dmgText,
      y: this.y - 20 - weapon.index * 8,
      alpha: 0,
      duration: 800,
      ease: "Sine.easeOut",
      onComplete: () => {
        dmgText.destroy()
      },
    })
  }

  takeDamage(weaponData: Weapon, materials: Materials, enforces: Enforces, distInSplash?: number) {
    const currentHP = this.getData("hp") as number

    const _physicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            numberUtil.addPercent(
              weaponData.physicalDamage +
                materials.calculateStat("str") +
                enforces.getAditionnalPlus("physical"),
              enforces.getAditionnalPercent("physical")
            ),
            this.physicalDefence,
            weaponData.physicalPenetration + materials.calculateStat("luk")
          )
        : this.calculateReducedDamage(
            numberUtil.addPercent(
              +(
                weaponData.physicalDamage *
                Math.min(1, 1 - distInSplash / (weaponData.splash + materials.calculateStat("vit")))
              ).toFixed(2) +
                materials.calculateStat("str") +
                enforces.getAditionnalPlus("physical"),
              enforces.getAditionnalPercent("physical")
            ),
            this.physicalDefence,
            weaponData.physicalPenetration + materials.calculateStat("luk")
          )

    const _magicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            numberUtil.addPercent(
              weaponData.magicalDamage +
                materials.calculateStat("int") +
                enforces.getAditionnalPlus("magical"),
              enforces.getAditionnalPercent("magical")
            ),
            this.magicalDefence,
            weaponData.magicalDamage + materials.calculateStat("wis")
          )
        : this.calculateReducedDamage(
            numberUtil.addPercent(
              +(
                weaponData.magicalDamage *
                Math.min(
                  1,
                  1 -
                    distInSplash /
                      (weaponData.splash + materials["vit"].length * materials["vit"].info.splash)
                )
              ).toFixed(2) +
                materials.calculateStat("int") +
                enforces.getAditionnalPlus("magical"),
              enforces.getAditionnalPercent("magical")
            ),
            this.magicalDefence,
            weaponData.magicalDamage + materials.calculateStat("wis")
          )

    const isTrunkKing =
      Character.checkCharacter(this.selectedCharacter) &&
      this.selectedCharacter.meta.id === "trunkKing"

    let damage =
      numberUtil.addPercent(_physicalDamage, weaponData.physicalAllPercent) +
      numberUtil.addPercent(_magicalDamage, weaponData.magicalAllPercent)

    if (isTrunkKing) {
      damage =
        Math.round(
          numberUtil.addPercent(
            numberUtil.addPercent(_physicalDamage, weaponData.physicalAllPercent),
            this.round
          )
        ) + numberUtil.addPercent(_magicalDamage, weaponData.magicalAllPercent)
    }

    if (weaponData.criticalChance > 0) {
      const random = Phaser.Math.FloatBetween(0, 1)
      damage =
        random < weaponData.criticalChance ? Math.ceil(damage * weaponData.criticalDamage) : damage
    }
    if (weaponData.dotted) this.applyDot(weaponData, damage, weaponData.dotted * 250, 250)
    if (weaponData.slowOne) {
      this.setData("slowed", weaponData.slowOne)

      this.hitSlowTimer?.remove()

      this.hitSlowTimer = this.scene.time.delayedCall(500, () => {
        this.setData("slowed", 0)
        this.hitSlowTimer = undefined
      })
    }
    this.setData("hp", currentHP - damage)

    this.setTintFill(0xff0000)
    this.scene.time.delayedCall(100, () => {
      this.clearTint()
      if (this.isBoss) this.setTint(0xff0000)
    })

    this.showDamageText(damage, weaponData)

    if (!this.getData("stunned")) {
      this.setData("stunned", true)

      this.body?.velocity.set(0, 0)

      this.scene.time.delayedCall(weaponData.stun + materials.calculateStat("cha"), () =>
        this.setData("stunned", false)
      )
    }

    if (this.getData("hp") <= 0) this.die()
  }
  applyDot(weaponData: Weapon, totalDamage: number, duration: number, tick = 500) {
    const ticks = Math.ceil(duration / tick)
    const dmgPerTick = Math.ceil(totalDamage / ticks)

    const timer = this.scene.time.addEvent({
      delay: tick,
      repeat: ticks - 1,
      callback: () => this.takeDotDamage(weaponData, dmgPerTick, timer),
      callbackScope: this,
    })

    this.activeDots.push(timer)
  }
  private takeDotDamage(weaponData: Weapon, amount: number, event: Phaser.Time.TimerEvent) {
    if (!this.active) return

    const hp = this.getData("hp") as number

    this.setData("hp", hp - amount)
    this.showDamageText(amount, weaponData)
    if (event.getRepeatCount() === 0)
      this.activeDots = this.activeDots.filter((t) => t.repeatCount !== 0)

    if (this.getData("hp") <= 0) this.die()
  }

  calculateReducedDamage(damage: number, defense: number, penetration = 0): number {
    const k = 100
    const maxReduction = 0.8

    const reducedDefense = Math.max(0, defense - penetration)

    const reductionRate = Math.min(reducedDefense / (reducedDefense + k), maxReduction)
    return damage ? Math.max(1, Math.floor(damage * (1 - reductionRate))) : damage
  }

  die() {
    if (this.isBoss) this.scene.events.emit("boss-die")
    else this.scene.events.emit("enemy-die")
    ;(this.coins as unknown as number) += this.round
    const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
    if (hpBar) hpBar.destroy()
    this.destroy()
    this.activeDots.forEach((t) => t.remove())
  }
}
