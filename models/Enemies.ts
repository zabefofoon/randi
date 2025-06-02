import Phaser from "phaser"
import { BLACKHOLE_ROUND, CANNON_ROUND, RAGE_ROUND, THUNDER_ROUND } from "~/const"
import { Character, type PurchaseCharacter } from "./Character"
import type { Enforces } from "./Enforces"
import type { Materials } from "./Material"
import { Blackhole } from "./Skill"
import type { Weapon } from "./Weapon"
let timeKey = 0
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

    this.createDamageTextPool(400)
  }
  get children() {
    return this.group.getChildren() as Enemy[]
  }

  applyBlackhole(materials: Materials, enforces: Enforces) {
    ;[...this.children].forEach((enemy) => {
      enemy.isBlackholed = true
      enemy.setData("pathIndex", 0)
      enemy.takeDamage(Blackhole.of(), materials, enforces)
    })
  }
  removeBlackhole() {
    this.children.forEach((enemy) => {
      enemy.isBlackholed = false
    })
  }
  updateDistances(px: number, py: number) {
    timeKey++
    if (timeKey > 5) timeKey = 0
    if (timeKey % 5 !== 0) return

    const list = this.group.getChildren() as Enemy[]

    for (let i = 0, n = list.length; i < n; i++) {
      const e = list[i]
      if (!e.active) continue

      e.setDistanceWithPlayer(Phaser.Math.Distance.Between(e.x, e.y, px, py))
    }
  }

  createDamageTextPool(size = 200) {
    const pool = this.scene.add.group({
      classType: Phaser.GameObjects.BitmapText,
      maxSize: size,
      runChildUpdate: false,
    })

    // 미리 생성해서 in‑active 상태
    for (let i = 0; i < size; i++) {
      const t = this.scene.add.bitmapText(0, 0, "damageFont", "", 18).setAlpha(0).setVisible(false)
      pool.add(t)
    }
    return pool
  }

  spawnEnemy(round: number, coins: Ref<number>, index: number) {
    const { x, y } = this.pathes[0]

    this.group.add(
      new Enemy(
        this.scene,
        x,
        y,
        false,
        "enemy",
        this.pathes,
        round,
        coins,
        this.selectedCharacter,
        index
      )
    )
    this.scene.events.emit("enemy-spawn")
  }

  spawnBoss(round: number, coins: Ref<number>) {
    const { x, y } = this.pathes[0]

    this.group.add(
      new Enemy(
        this.scene,
        x,
        y,
        true,
        "enemy",
        this.pathes,
        round,
        coins,
        this.selectedCharacter,
        0
      )
    )
    this.scene.events.emit("enemy-spawn")
  }

  applySplashDamage(
    source: Enemy,
    bullet: Phaser.Physics.Arcade.Image,
    materials: Materials,
    enforces: Enforces
  ) {
    const weapon = bullet.weapon as Weapon

    const r = weapon.splash + materials.calculateStat("vit")
    const rSq = r * r
    const splashId = ++this.scene.data.values.splashSeq

    for (const enemy of this.children) {
      if (!enemy.active || enemy === source) continue

      const dx = enemy.x - bullet.x
      const dy = enemy.y - bullet.y
      if (dx * dx + dy * dy > rSq) continue

      if (enemy.lastSplashId !== splashId) {
        enemy.lastSplashId = splashId
        enemy.takeDamage(weapon, materials, enforces, Math.sqrt(dx * dx + dy * dy))
      }
    }
  }

  applyStunMany(source: Enemy, bullet: Phaser.Physics.Arcade.Image, materials: Materials) {
    const weaponData = bullet.weapon

    const r = weaponData.splash + materials.calculateStat("vit")
    const rSq = r * r
    const splashId = ++this.scene.data.values.splashSeq

    source.remainedStuns[weaponData.index] = Math.min(
      weaponData.stunMany,
      source.remainedStuns[weaponData.index] + weaponData.stunMany
    )

    for (const enemy of this.children) {
      if (!enemy.active || enemy === source) continue

      const dx = enemy.x - bullet.x
      const dy = enemy.y - bullet.y
      if (dx * dx + dy * dy > rSq) continue

      if (enemy.lastSplashId !== splashId)
        enemy.remainedStuns[weaponData.index] = Math.min(
          weaponData.stunMany,
          source.remainedStuns[weaponData.index] + weaponData.stunMany
        )
    }
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  pathes: { x: number; y: number }[]
  physicalDefence = 0
  magicalDefence = 0
  private hitSlowTimer?: Phaser.Time.TimerEvent
  distanceWithPlayer = 0
  lastSplashId = 0
  private activeDots: Phaser.Time.TimerEvent[] = []
  remainedStuns = [0, 0, 0, 0]
  stunTimer?: Phaser.Time.TimerEvent
  isAppliedDcrease = false

  thunderEffect!: Phaser.GameObjects.Sprite
  isBlackholed = false

  private hpBarBg!: Phaser.GameObjects.Rectangle
  private hpBarFill!: Phaser.GameObjects.Rectangle
  private readonly hpBarOffset = { x: -16, y: -30 }

  constructor(
    scene: Phaser.Scene & { dmgPool: Phaser.GameObjects.Group },
    x: number,
    y: number,
    public isBoss: boolean,
    key: string,
    paths: { x: number; y: number }[],
    private round: number,
    private coins: Ref<number>,
    private selectedCharacter: typeof Character | PurchaseCharacter,
    private index: number
  ) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    let hp = 0
    if (this.isBoss) {
      hp = this.increaseHP(this.round) * 4
    } else if (this.isThunder || this.isRage || this.isBlackhole || this.isCannon) {
      hp = this.increaseHP(this.round) * 3
    } else {
      if (`${this.round}`.endsWith("9") && this.round !== 59) {
        hp = 1
        this.setTint(0xffff00)
      } else hp = this.increaseHP(this.round)
    }

    this.setData("hp", hp)
      .setData("pathIndex", 0)
      .setData("maxHp", hp)
      .setData("hpBar", this.scene.add.graphics())
      .setScale(0.75)

    if (this.isBoss) this.setTint(0xff0000)
    if (this.isThunder) this.setTint(0x0000ff)
    if (this.isRage) this.setTint(0x00ff00)
    if (this.isBlackhole) this.setTint(0x000000)
    if (this.isCannon) this.setTint(0xfc036b)

    this.physicalDefence = this.isBoss
      ? numberUtil.addPercent(this.increaseDefence(this.round), 130)
      : this.increaseDefence(this.round)

    this.magicalDefence = this.isBoss
      ? numberUtil.addPercent(this.increaseDefence(this.round), 130)
      : this.increaseDefence(this.round)

    this.pathes = paths

    this.anims.play("enemy-walk")

    this.stunTimer = this.scene.time.addEvent({
      delay: 100,
      repeat: -1,
      callback: () => this.clearStunStack(),
      callbackScope: this,
    })

    this.thunderEffect = this.scene.add
      .sprite(x, y, "thunder-sprite", 0)
      .setScale(0.9)
      .setDepth(this.depth + 1)
      .setFrame(9)

    this.hpBarBg = scene.add.rectangle(0, 0, 32, 4, 0x000000).setOrigin(0)
    this.hpBarFill = scene.add.rectangle(0, 0, 32, 4, 0xff0000).setOrigin(0)
    this.hpBarBg.setDepth(3)
    this.hpBarFill.setDepth(3)
    this.updateHpBarPos()
  }

  updateHpBarPos() {
    const { x, y } = this
    this.hpBarBg.setPosition(x + this.hpBarOffset.x, y + this.hpBarOffset.y)
    this.hpBarFill.setPosition(x + this.hpBarOffset.x, y + this.hpBarOffset.y)
  }

  private drawHp() {
    const hp = this.getData("hp") as number
    const maxHp = this.getData("maxHp") as number
    const ratio = Phaser.Math.Clamp(hp / maxHp, 0, 1)
    this.hpBarFill.displayWidth = 32 * ratio
  }

  get isThunder() {
    return this.round === THUNDER_ROUND && this.index === 0
  }

  get isRage() {
    return this.round === RAGE_ROUND && this.index === 0
  }

  get isBlackhole() {
    return this.round === BLACKHOLE_ROUND && this.index === 0
  }

  get isCannon() {
    return this.round === CANNON_ROUND && this.index === 0
  }

  applyStunOne(weapon: Weapon, materials: Materials) {
    const stunValue = weapon.stun + materials.calculateStat("cha")

    this.remainedStuns[weapon.index] = Math.min(
      stunValue,
      this.remainedStuns[weapon.index] + stunValue
    )
  }

  clearStunStack() {
    this.remainedStuns.forEach((item, index) => {
      if (item < 1) return
      this.remainedStuns[index] -= 100
    })
  }

  increaseHP(round: number): number {
    const _round = round - 1
    const roundGroup = Math.ceil(_round / 10)
    const roundBaseMultiplies = [1, 1.5, 2, 3.5, 4, 5, 6]
    const roundMultiplies = [1, 1, 1.1, 1.25, 1.5, 4, 8, 10]
    const result = (Math.pow(_round * 2, 2) + 10) * roundBaseMultiplies[Math.floor(_round / 10)]
    return Math.ceil(result * (roundMultiplies?.[roundGroup] ?? 1))
  }

  increaseDefence(round: number): number {
    const roundGroup = Math.ceil(round / 10)
    const value = [0, 0, 5, 15, 30, 60, 120, 200][roundGroup]
    return value + round
  }

  setDistanceWithPlayer(distance: number) {
    this.distanceWithPlayer = distance
  }

  applyDecrease(weapons: (Weapon | undefined)[]) {
    if (this.isAppliedDcrease) return
    this.isAppliedDcrease = true
    weapons
      .filter((weapon): weapon is Weapon => !!weapon)
      .forEach((weapon) => {
        this.physicalDefence = numberUtil.subtractPercent(
          this.physicalDefence,
          weapon.physicalDecrease
        )
        this.magicalDefence = numberUtil.subtractPercent(
          this.magicalDefence,
          weapon.magicalDecrease
        )
      })
  }

  moveEnemyAlongPath(weapons: (Weapon | undefined)[], materials: Materials) {
    // 스턴 상태라면 이동 중단
    if (this.remainedStuns.some((item) => item > 0)) {
      this.body?.velocity.set(0, 0)
      return
    }

    const pathIndex = this.getData("pathIndex")
    if (pathIndex == null) return

    const target = this.pathes[pathIndex]
    const dx = target.x - this.x
    const dy = target.y - this.y
    const distSq = dx * dx + dy * dy

    // 일정 거리 이내로 도달하면 다음 경로로 전환
    if (distSq < 25) {
      this.setPosition(target.x, target.y)
      const next = (pathIndex + 1) % this.pathes.length
      this.setData("pathIndex", next)

      this.setFlipX(next === 0 || next === 3)
      return // 위치 갱신 후 moveTo 생략
    }

    // 이동 속도 계산 후 실제 이동 처리
    const speed = this.calculateSpeed(weapons, materials) * window.speed
    if (!this.isBlackholed) this.scene.physics.moveTo(this, target.x, target.y, speed)
    else {
      const { x, y } = this.pathes[0]
      this.scene.physics.moveTo(this, x, y, 1500)
    }
  }

  calculateSpeed(weapons: (Weapon | undefined)[], materials: Materials): number {
    const isAllWeaponActiveLevel = this.scene.data.get("isAllWeaponActive") ?? 0
    const isClose = this.distanceWithPlayer < 150
    const baseSpeed = this.isBoss ? 80 : 120

    let speed = baseSpeed

    // 라운드 기반 속도 증가
    speed = numberUtil.addPercent(speed, this.round * 2)

    // 거리 내일 경우만 감소 계산
    if (isClose) {
      const culStat = materials.calculateStat("cul")
      const totalWeaponSlow = weapons.reduce((acc, w) => acc + (w?.slow ?? 0), 0)

      speed = numberUtil.subtractPercent(speed, culStat)
      speed = numberUtil.subtractPercent(speed, totalWeaponSlow)
    }

    // 무기 전체 활성화 효과
    speed = numberUtil.subtractPercent(speed, isAllWeaponActiveLevel * 5)

    // 개별 디버프(slowed)
    const slowedPercent = this.getData("slowed") ?? 0
    if (slowedPercent > 0) {
      speed = numberUtil.subtractPercent(speed, slowedPercent)
    }

    return Math.max(1, Math.floor(speed))
  }

  showDamageText(damageValue: number, weapon: Weapon, isCritical: boolean) {
    const tintColors = [0xffffff, 0x2563eb, 0x9333ea, 0xeab308, 0xe879f9, 0xf87171]

    const text = this.scene.dmgPool.getFirstDead(false) as Phaser.GameObjects.BitmapText
    if (!text) return

    const colorIndex = Math.min(weapon.level - 1, tintColors.length - 1)
    text
      .setActive(true)
      .setVisible(true)
      .setText(`-${damageValue}`)
      .setPosition(this.x, this.y - weapon.index * 8)
      .setAlpha(1)
      .setDepth(10)

    if (isCritical) text.setScale(1.5).setTint(0xff0000)
    else text.setScale(1).setTint(tintColors[colorIndex])

    this.scene.tweens.add({
      targets: text,
      y: this.y - 20 - weapon.index * 8,
      alpha: 0,
      duration: 800,
      ease: "Sine.easeOut",
      onComplete: () => {
        text.setVisible(false)
        text.setActive(false)
      },
    })
  }

  takeDamage(weaponData: Weapon, materials: Materials, enforces: Enforces, distInSplash?: number) {
    const currentHP = this.getData("hp") as number
    const { str, int, vit, luk, wis } = materials.getCachedStats()

    this.physicalDefence -= weaponData.armerBreak
    this.magicalDefence -= weaponData.armerBreak

    const _physicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            numberUtil.addPercent(
              weaponData.physicalDamage + str + enforces.additionalPhysicalPlus,
              enforces.additionalPhysicalPercent
            ),
            this.physicalDefence,
            weaponData.physicalPenetration + luk
          )
        : this.calculateReducedDamage(
            numberUtil.addPercent(
              +(
                weaponData.physicalDamage *
                Math.min(1, 1 - distInSplash / (weaponData.splash + vit))
              ).toFixed(2) +
                str +
                enforces.additionalPhysicalPlus,
              enforces.additionalPhysicalPercent
            ),
            this.physicalDefence,
            weaponData.physicalPenetration + luk
          )

    const _magicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            numberUtil.addPercent(
              weaponData.magicalDamage + int + enforces.additionalMasicalPlus,
              enforces.additionalMasicalPercent
            ),
            this.magicalDefence,
            weaponData.magicalDamage + wis
          )
        : this.calculateReducedDamage(
            numberUtil.addPercent(
              +(
                weaponData.magicalDamage * Math.min(1, 1 - distInSplash / (weaponData.splash + vit))
              ).toFixed(2) +
                int +
                enforces.additionalMasicalPlus,
              enforces.additionalMasicalPercent
            ),
            this.magicalDefence,
            weaponData.magicalDamage + wis
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

    let isCritical = false
    if (weaponData.criticalChance > 0) {
      if (Phaser.Math.FloatBetween(0, 1) >= weaponData.criticalChance) damage = Math.ceil(damage)
      else {
        damage = Math.ceil(damage * weaponData.criticalDamage)
        isCritical = true
      }
    }
    const isAllWeaponActiveLevel = this.scene.data.get("isAllWeaponActive") ?? 0

    damage = numberUtil.addPercent(damage, isAllWeaponActiveLevel * 20)

    let finalDamage = Math.ceil(damage)
    if (weaponData.name === "Thunder") finalDamage = Math.ceil((this.getData("maxHp") * 2) / 3)
    else if (weaponData.name === "Blackhole")
      finalDamage = Math.ceil((this.getData("maxHp") * 1) / 10)
    else if (weaponData.name === "LaserBeam")
      finalDamage = Math.ceil((this.getData("maxHp") * 1) / 10)

    if (weaponData.dotted) this.applyDot(weaponData, finalDamage, weaponData.dotted * 250, 250)

    if (weaponData.slowOne) {
      const slowed = this.getData("slowed")
      this.setData("slowed", slowed + weaponData.slowOne)

      this.hitSlowTimer?.remove()

      this.hitSlowTimer = this.scene.time.delayedCall(500, () => {
        this.setData("slowed", 0)
        this.hitSlowTimer = undefined
      })
    }
    this.setData("hp", currentHP - finalDamage)

    this.setTintFill(0xff0000)
    this.scene.time.delayedCall(100, () => {
      this.clearTint()
      if (this.isBoss) this.setTint(0xff0000)
      if (this.isThunder) this.setTint(0x0000ff)
      if (this.isRage) this.setTint(0x00ff00)
      if (this.isBlackhole) this.setTint(0x000000)
      if (this.isCannon) this.setTint(0xfc036b)
    })

    this.showDamageText(finalDamage, weaponData, isCritical)
    this.drawHp()
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

  takeDotDamage(weaponData: Weapon, amount: number, event: Phaser.Time.TimerEvent) {
    if (!this.active) return

    const hp = this.getData("hp") as number

    this.setData("hp", hp - amount)
    this.showDamageText(amount, weaponData)
    if (event.getRepeatCount() === 0)
      this.activeDots = this.activeDots.filter((t) => t.repeatCount !== 0)

    if (this.getData("hp") <= 0) this.die()
  }

  calculateReducedDamage(damage: number, defense: number, penetration = 0): number {
    const k = 100 // 완만하게 꺾이는 상수
    const cap = 0.8 // 감소·증폭 최대 80 %

    const adjusted = defense - penetration

    let multiplier: number

    if (adjusted >= 0) {
      const reduction = Math.min(adjusted / (adjusted + k), cap)
      multiplier = 1 - reduction
    } else {
      const amp = Math.min(Math.abs(adjusted) / (Math.abs(adjusted) + k), cap)
      multiplier = 1 + amp
    }

    return damage ? Math.max(1, Math.floor(damage * multiplier)) : damage
  }

  die() {
    if (this.isBoss) this.scene.events.emit("boss-die")
    else this.scene.events.emit("enemy-die")

    if (this.isThunder) this.scene.events.emit("thunder-die")
    if (this.isRage) this.scene.events.emit("rage-die")
    if (this.isBlackhole) this.scene.events.emit("blackhole-die")
    if (this.isCannon) this.scene.events.emit("cannon-die")
    ;(this.coins as unknown as number) += this.round
    const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
    if (hpBar) hpBar.destroy()
    this.destroy()
    this.activeDots.forEach((t) => t.remove())
    this.stunTimer?.destroy()
    this.hpBarBg.destroy()
    this.hpBarFill.destroy()
  }
}
