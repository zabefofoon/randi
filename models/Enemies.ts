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

  private splashZone!: Phaser.GameObjects.Zone
  private currentSplashId = 0

  constructor(
    scene: Phaser.Scene,
    private selectedCharacter: typeof Character | PurchaseCharacter
  ) {
    this.scene = scene
    this.group = scene.physics.add.group({ collideWorldBounds: false })

    const gameWidth = scene.scale.width
    const gameHeight = scene.scale.height

    this.pathes = [
      { x: gameWidth * 0.15, y: gameHeight * 0.18 },
      { x: gameWidth * 0.15, y: gameHeight * 0.78 },
      { x: gameWidth * 0.87, y: gameHeight * 0.78 },
      { x: gameWidth * 0.87, y: gameHeight * 0.18 },
    ]
    this.baseSpeed = 160

    this.createDamageTextPool(400)

    this.initSplashSystem()
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

  private initSplashSystem() {
    // Zone 본체
    this.splashZone = this.scene.add.zone(-9999, -9999, 1, 1)
    this.scene.physics.add.existing(this.splashZone, false)
    ;(this.splashZone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setEnable(false)

    // 고정 overlap
    this.scene.physics.add.overlap(
      this.splashZone,
      this.group,
      this.handleSplashHit, // ↓ 콜백
      undefined,
      this
    )
  }

  private startSplash(source: Enemy, weapon: Weapon, materials: Materials, enforces: Enforces) {
    const vit = materials.calculateStat("vit")
    const radius = ((weapon.splash + weapon.enforcedSplash + vit) / 2) * window.scale
    const splashId = ++this.currentSplashId // 고유 ID

    this.splashZone._src = source
    this.splashZone._weapon = weapon
    this.splashZone._materials = materials
    this.splashZone._enforces = enforces
    this.splashZone._sid = splashId

    // 위치·사이즈·활성화
    this.splashZone
      .setPosition(source.x, source.y)
      .setSize(radius * 2, radius * 2)
      .setActive(true)

    const body = this.splashZone.body as Phaser.Physics.Arcade.Body
    body.setEnable(true).setCircle(radius)

    // 30 ms 뒤 비활성화
    this.scene.time.delayedCall(30, () => {
      body.setEnable(false)
      this.splashZone.setActive(false).setPosition(-9999, -9999)
    })
  }

  applySplashDamage(
    source: Enemy,
    bullet: Phaser.Physics.Arcade.Image,
    materials: Materials,
    enforces: Enforces
  ) {
    const weapon = bullet.weapon as Weapon
    this.startSplash(source, weapon, materials, enforces)
  }

  /* ----------------------------------- */
  /* 4) 고정 overlap 콜백                */
  /* ----------------------------------- */
  private handleSplashHit = (
    zoneObj: Phaser.GameObjects.Zone,
    enemyObj: Phaser.GameObjects.GameObject
  ) => {
    const e = enemyObj as Enemy
    if (!e.active) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const z: any = zoneObj
    const source = z._src as Enemy
    const weapon = z._weapon as Weapon
    const materials = z._materials as Materials
    const enforces = z._enforces as Enforces
    const splashId = z._sid as number

    /* 같은 Splash 중복 차단 */
    if (e.lastSplashId === splashId) return
    e.lastSplashId = splashId

    /* 직격(source) 본인은 제외 */
    if (e === source) return

    /* 스턴 처리 */
    if (weapon.stunMany) e.applyStunOne(weapon, materials)

    /* 데미지 */
    const dist = Phaser.Math.Distance.Between(e.x, e.y, source.x, source.y)
    e.takeDamage(weapon, materials, enforces, Math.floor(dist))
  }
}

interface Dot {
  weapon: Weapon // 어떤 무기 효과인지
  dmgPerTick: number // 한 번에 입힐 데미지
  ticksRemaining: number // 남은 타격 횟수
  interval: number // 타격 간격(ms)
  elapsed: number // 지난 시간 누적(ms)
}

interface Stun {
  sourceWeapon: Weapon // 어떤 무기인가
  stacks: number // 남은 스턴 스택
  interval: number // 스택 소모 간격(ms)
  elapsed: number // 누적 시간(ms)
}

interface Slow {
  sourceWeapon: Weapon
  slowPercent: number // 한 스택당 얼마 % 느려질지
  ticksRemaining: number // 남은 스택 수
  interval: number // 스택 소모 간격(ms)
  elapsed: number // 누적 시간(ms)
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  pathes: { x: number; y: number }[]
  physicalDefence = 0
  magicalDefence = 0
  distanceWithPlayer = 0
  lastSplashId = 0
  isAppliedDcrease = false

  thunderEffect!: Phaser.GameObjects.Sprite
  isBlackholed = false

  dots: Dot[] = []
  stuns: Stun[] = []
  slows: Slow[] = []

  private hpBarBg!: Phaser.GameObjects.Rectangle
  private hpBarFill!: Phaser.GameObjects.Rectangle
  private readonly hpBarOffset = { x: -16 * window.scale, y: -26 * window.scale }

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
      const additional = [1, 1, 3, 5, 10, 15][this.round / 10 - 1]
      hp = this.increaseHP(this.round) * 4 * additional
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
      .setScale(0.75 * window.scale)

    if (this.isBoss) this.setTint(0xff0000).setScale(0.9 * window.scale)
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

    this.thunderEffect = this.scene.add
      .sprite(x, y, "thunder-sprite", 0)
      .setScale(0.9 * window.scale)
      .setDepth(this.depth + 1)
      .setFrame(9)

    this.hpBarBg = scene.add
      .rectangle(0, 0, 32 * window.scale, 4 * window.scale, 0x000000)
      .setOrigin(0)
    this.hpBarFill = scene.add
      .rectangle(0, 0, 32 * window.scale, 4 * window.scale, 0xff0000)
      .setOrigin(0)
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
    this.hpBarFill.displayWidth = 32 * ratio * window.scale
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

  increaseHP(round: number): number {
    const _round = round - 1
    const roundGroup = Math.ceil(_round / 10)
    const roundBaseMultiplies = [1, 1.5, 2, 3.5, 4, 5, 6]
    const roundMultiplies = [1, 1, 1.1, 1.25, 1.5, 4, 15, 30]
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
          weapon.physicalDecrease + weapon.enforcedPhysicalDecrease
        )
        this.magicalDefence = numberUtil.subtractPercent(
          this.magicalDefence,
          weapon.magicalDecrease + weapon.enforcedMagicalDecrease
        )
      })
  }

  moveEnemyAlongPath(weapons: (Weapon | undefined)[], materials: Materials) {
    // 스턴 상태라면 이동 중단
    if (this.stuns.some((s) => s.stacks > 0)) {
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
    const speed = this.calculateSpeed(weapons, materials) * window.speed * window.scale
    if (!this.isBlackholed) this.scene.physics.moveTo(this, target.x, target.y, speed)
    else {
      const { x, y } = this.pathes[0]
      this.scene.physics.moveTo(this, x, y, 1500)
    }
  }

  calculateSpeed(weapons: (Weapon | undefined)[], materials: Materials): number {
    const isAllWeaponActiveLevel = this.scene?.data?.get?.("isAllWeaponActive") ?? 0
    const isClose = this.distanceWithPlayer < 150
    const baseSpeed = this.isBoss ? 80 : 120

    let speed = baseSpeed

    // 라운드 기반 속도 증가
    speed = numberUtil.addPercent(speed, this.round * 2)

    // 거리 내일 경우만 감소 계산
    if (isClose) {
      const culStat = materials.calculateStat("cul")
      const totalWeaponSlow = weapons.reduce((acc, w) => {
        const slow = w?.slow ?? 0
        const enforcedSlow = w?.enforcedSlow ?? 0
        return acc + slow + enforcedSlow
      }, 0)

      speed = numberUtil.subtractPercent(speed, culStat)
      speed = numberUtil.subtractPercent(speed, totalWeaponSlow)
    }

    // 무기 전체 활성화 효과
    speed = numberUtil.subtractPercent(speed, isAllWeaponActiveLevel * 5)

    const totalSlow = this.slows.reduce((sum, s) => sum + s.slowPercent, 0)
    if (totalSlow > 0) speed = numberUtil.subtractPercent(speed, totalSlow)

    return Math.max(1, Math.floor(speed))
  }

  showDamageText(damageValue: number, weapon: Weapon, isCritical: boolean) {
    if (window.showDamage === false) return

    const tintColors = [0xffffff, 0x2563eb, 0x9333ea, 0xeab308, 0xe879f9, 0xf87171]

    const text = this.scene?.dmgPool.getFirstDead(false) as Phaser.GameObjects.BitmapText
    if (!text) return

    const colorIndex = Math.min(weapon.level - 1, tintColors.length - 1)
    text
      .setActive(true)
      .setVisible(true)
      .setText(`-${damageValue}`)
      .setPosition(this.x, this.y - weapon.index * 8)
      .setAlpha(1)
      .setDepth(10)

    if (isCritical) text.setScale(1.5 * window.scale).setTint(0xff0000)
    else text.setScale(window.scale).setTint(tintColors[colorIndex])

    this.scene?.tweens.add({
      targets: text,
      y: this.y - 20 * window.scale - weapon.index * 8,
      alpha: 0,
      duration: 800,
      ease: "Sine.easeOut",
      onComplete: () => {
        text.setVisible(false)
        text.setActive(false)
      },
    })
  }

  takeDamage(
    weaponData: Weapon,
    materials: Materials,
    enforces: Enforces,
    distInSplash?: number,
    isDot?: boolean
  ) {
    const currentHP = this.getData("hp") as number
    const { str, int, vit, luk, wis } = materials.getCachedStats()

    this.physicalDefence -= weaponData.armerBreak + weaponData.enforcedArmerBreak
    this.magicalDefence -= weaponData.armerBreak + weaponData.enforcedArmerBreak

    const _physicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            numberUtil.addPercent(
              weaponData.physicalDamage +
                weaponData.enforcedPhysicalDamage +
                str +
                enforces.additionalPhysicalPlus,
              enforces.additionalPhysicalPercent
            ),
            this.physicalDefence,
            weaponData.physicalPenetration + weaponData.enforcedPhysicalPenetration + luk
          )
        : this.calculateReducedDamage(
            numberUtil.addPercent(
              +(
                (weaponData.physicalDamage + weaponData.enforcedPhysicalDamage) *
                Math.min(
                  1,
                  1 -
                    distInSplash / Math.max(1, weaponData.splash + weaponData.enforcedSplash + vit)
                )
              ).toFixed(2) +
                str +
                enforces.additionalPhysicalPlus,
              enforces.additionalPhysicalPercent
            ),
            this.physicalDefence,
            weaponData.physicalPenetration + weaponData.enforcedPhysicalPenetration + luk
          )

    const _magicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            numberUtil.addPercent(
              weaponData.magicalDamage +
                weaponData.enforcedMagicalDamage +
                int +
                enforces.additionalMasicalPlus,
              enforces.additionalMasicalPercent
            ),
            this.magicalDefence,
            weaponData.magicalPenetration + weaponData.enforcedMagicalPenetration + wis
          )
        : this.calculateReducedDamage(
            numberUtil.addPercent(
              +(
                (weaponData.magicalDamage + weaponData.enforcedMagicalDamage) *
                Math.min(
                  1,
                  1 -
                    distInSplash / Math.max(1, weaponData.splash + weaponData.enforcedSplash + vit)
                )
              ).toFixed(2) +
                int +
                enforces.additionalMasicalPlus,
              enforces.additionalMasicalPercent
            ),
            this.magicalDefence,
            weaponData.magicalPenetration + weaponData.enforcedMagicalPenetration + wis
          )

    const isTrunkKing =
      Character.checkCharacter(this.selectedCharacter) &&
      this.selectedCharacter.meta.id === "trunkKing"

    const isChimeraHayashiRice =
      Character.checkCharacter(this.selectedCharacter) &&
      this.selectedCharacter.meta.id === "chimeraHayashiRice"

    let damage =
      numberUtil.addPercent(
        _physicalDamage,
        weaponData.physicalAllPercent + weaponData.enforcedPhysicalAllPercent
      ) +
      numberUtil.addPercent(
        _magicalDamage,
        weaponData.magicalAllPercent + weaponData.enforcedMagicalAllPercent
      )

    if (isTrunkKing) {
      damage =
        3 +
        Math.round(
          numberUtil.addPercent(
            numberUtil.addPercent(
              _physicalDamage,
              weaponData.physicalAllPercent + weaponData.enforcedPhysicalAllPercent
            ),
            this.round
          )
        ) +
        numberUtil.addPercent(
          _magicalDamage,
          weaponData.magicalAllPercent + weaponData.enforcedMagicalAllPercent
        )
    }

    if (isChimeraHayashiRice) {
      damage =
        3 +
        numberUtil.addPercent(
          _physicalDamage,
          weaponData.physicalAllPercent + weaponData.enforcedPhysicalAllPercent
        ) +
        Math.round(
          numberUtil.addPercent(
            numberUtil.addPercent(
              _magicalDamage,
              weaponData.magicalAllPercent + weaponData.enforcedMagicalAllPercent
            ),
            this.round
          )
        )
    }

    let isCritical = false
    if (weaponData.criticalChance > 0) {
      if (
        Phaser.Math.FloatBetween(0, 1) >=
        weaponData.criticalChance + weaponData.enforcedCriticalChance
      )
        damage = Math.ceil(damage)
      else {
        damage = Math.ceil(damage * weaponData.criticalDamage)
        isCritical = true
      }
    }
    const isAllWeaponActiveLevel = this.scene?.data?.get?.("isAllWeaponActive") ?? 0

    damage = numberUtil.addPercent(damage, isAllWeaponActiveLevel * 20)

    let finalDamage = Math.ceil(damage)
    if (weaponData.name === "Thunder") finalDamage = Math.ceil((this.getData("maxHp") * 2) / 3)
    else if (weaponData.name === "Blackhole")
      finalDamage = Math.ceil((this.getData("maxHp") * 1) / 10)
    else if (weaponData.name === "LaserBeam")
      finalDamage = Math.ceil((this.getData("maxHp") * 1) / 10)

    if (!isDot && weaponData.dotted && finalDamage > 0) {
      this.applyDot(weaponData, finalDamage, weaponData.dotted + weaponData.enforcedDotted, 250)
    }

    if (weaponData.slowOne) this.applySlowOne(weaponData, materials)

    this.setData("hp", currentHP - finalDamage)

    this.setTintFill(0xff0000)
    this.scene?.time.delayedCall(100, () => {
      this.clearTint()
      if (this.isBoss) this.setTint(0xff0000)
      if (this.isThunder) this.setTint(0x0000ff)
      if (this.isRage) this.setTint(0x00ff00)
      if (this.isBlackhole) this.setTint(0x000000)
      if (this.isCannon) this.setTint(0xfc036b)
    })
    if (finalDamage > 0) this.showDamageText(finalDamage, weaponData, isCritical)
    this.drawHp()
    if (this.getData("hp") <= 0) this.die()
  }

  applyDot(weapon: Weapon, totalDamage: number, tickCount: number, tickInterval = 250) {
    const dmgPerTick = Math.ceil(totalDamage / tickCount)
    const existing = this.dots.find((d) => d.weapon === weapon)

    if (existing) {
      // 이미 걸려 있으면 횟수·피해·누적 시간 초기화
      existing.ticksRemaining = tickCount
      existing.dmgPerTick = dmgPerTick
      existing.elapsed = 0
    } else {
      // 새로 추가
      this.dots.push({
        weapon,
        dmgPerTick,
        ticksRemaining: tickCount,
        interval: tickInterval,
        elapsed: 0,
      })
    }
  }

  applyStunOne(weapon: Weapon, materials: Materials) {
    const stunValue =
      ((weapon.stun || weapon.stunMany) + weapon.enforcedStun + materials.calculateStat("cha")) /
      window.speed

    if (!stunValue) return

    const tickInterval = 100
    const stacks = Math.ceil(stunValue / tickInterval)
    const existing = this.stuns.find((s) => s.sourceWeapon === weapon)
    if (existing) {
      existing.stacks += stacks
      existing.elapsed = 0
    } else {
      this.stuns.push({
        sourceWeapon: weapon,
        stacks,
        interval: tickInterval, // 100ms 당 1스택 소모
        elapsed: 0,
      })
    }
  }

  applySlowOne(weapon: Weapon, materials: Materials) {
    // 무기 + 캐릭터 스텟으로 최종 slow 퍼센트 계산
    const slowPercent = weapon.slowOne + weapon.enforcedSlowOne + materials.calculateStat("cul")
    if (slowPercent <= 0) return

    const duration = 500 / window.speed
    const interval = 100
    const ticks = Math.ceil(duration / interval)

    const existing = this.slows.find((s) => s.sourceWeapon === weapon)
    if (existing) {
      existing.ticksRemaining = ticks
      existing.slowPercent = slowPercent
      existing.elapsed = 0
    } else {
      this.slows.push({
        sourceWeapon: weapon,
        slowPercent,
        ticksRemaining: ticks,
        interval,
        elapsed: 0,
      })
    }
  }

  updateDots(delta: number, materials: Materials, enforces: Enforces) {
    for (let i = this.dots.length - 1; i >= 0; i--) {
      const d = this.dots[i]

      d.elapsed += delta

      // interval(ms) 만큼 누적될 때마다 한 번씩 데미지 적용
      while (d.elapsed >= d.interval && d.ticksRemaining > 0) {
        d.elapsed -= d.interval
        d.ticksRemaining--

        // 실제 데미지 함수 호출 (Splash 거리 인자 없이)
        this.takeDamage(d.weapon, materials, enforces, undefined, true)

        // 남은 횟수 0이 되면 배열에서 제거
        if (d.ticksRemaining === 0) {
          this.dots.splice(i, 1)
        }
      }
    }
  }

  updateStuns(delta: number) {
    for (let i = this.stuns.length - 1; i >= 0; i--) {
      const s = this.stuns[i]
      s.elapsed += delta
      while (s.elapsed >= s.interval && s.stacks > 0) {
        s.elapsed -= s.interval
        s.stacks--
      }
      if (s.stacks <= 0) {
        this.stuns.splice(i, 1)
      }
    }
  }

  updateSlows(delta: number) {
    for (let i = this.slows.length - 1; i >= 0; i--) {
      const s = this.slows[i]
      s.elapsed += delta
      while (s.elapsed >= s.interval && s.ticksRemaining > 0) {
        s.elapsed -= s.interval
        s.ticksRemaining--
      }
      if (s.ticksRemaining <= 0) {
        this.slows.splice(i, 1)
      }
    }
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
    this.hpBarBg.destroy()
    this.hpBarFill.destroy()
  }
}
