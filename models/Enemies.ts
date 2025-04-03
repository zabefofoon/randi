import Phaser from "phaser"
import type { Materials } from "./Material"
import type { Player } from "./Player"
import type { Weapon } from "./Weapon"
export class Enemies {
  scene: Phaser.Scene
  group: Phaser.Physics.Arcade.Group
  // 경로, 기본 속도 등 전역 설정
  pathes: { x: number; y: number }[]
  baseSpeed: number

  constructor(scene: Phaser.Scene, private remainnedEnemies: Ref<number>) {
    this.scene = scene
    // 적 그룹 생성
    this.group = scene.physics.add.group({ collideWorldBounds: false })

    const gameWidth = scene.scale.width
    const gameHeight = scene.scale.height

    this.pathes = [
      { x: gameWidth * 0.15, y: gameHeight * 0.2 },
      { x: gameWidth * 0.15, y: gameHeight * 0.8 },
      { x: gameWidth * 0.85, y: gameHeight * 0.8 },
      { x: gameWidth * 0.85, y: gameHeight * 0.2 },
    ]
    this.baseSpeed = 160
  }
  get children() {
    return this.group.getChildren() as Enemy[]
  }
  spawnEnemy(round: number) {
    const { x, y } = this.pathes[0]

    // 새 적 생성
    this.group.add(new Enemy(this.scene, x, y, "enemy", this.pathes, round))

    this.remainnedEnemies.value++
  }

  takeDamage(enemy: Enemy, weapon: Weapon, materials: Materials) {
    enemy.takeDamage(weapon, materials)

    // 적 HP가 0 이하라면 제거
    if (!enemy.getData("hp")) (this.remainnedEnemies as unknown as number)--
  }

  applySplashDamage(centerX: number, centerY: number, weaponData: Weapon, materials: Materials) {
    // enemyGroup 내 모든 적 순회
    this.children.forEach((enemy) => {
      if (!enemy.active) return

      const dist = Phaser.Math.Distance.Between(centerX, centerY, enemy.x, enemy.y)
      if (dist <= weaponData.splash + materials["건강"].length * materials["건강"].info.splash) {
        // 만약 거리 비례 데미지를 적용하고 싶다면:

        enemy.takeDamage(weaponData, materials, dist)
      }

      // 적 HP가 0 이하라면 제거
      if (!enemy.getData("hp")) (this.remainnedEnemies as unknown as number)--
    })
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  pathes: { x: number; y: number }[]
  physicalDefence = 0
  magicalDefence = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    paths: { x: number; y: number }[],
    round: number
  ) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setTint(0xff0000)
      .setData("hp", this.fibonacci(round) * 10)
      .setData("pathIndex", 0)
      .setData("maxHp", this.fibonacci(round) * 10)
      .setData("hpBar", this.scene.add.graphics())

    this.physicalDefence = round
    this.magicalDefence = round

    this.pathes = paths
  }

  private fibonacci(index: number): number {
    if (index < 2) return index // index가 0이거나 1이면 그대로 반환

    let prev = 0 // 0번째 피보나치 수
    let current = 1 // 1번째 피보나치 수

    // 2번째부터 index번째까지 반복
    for (let i = 2; i <= index; i++) {
      const next = prev + current
      prev = current
      current = next
    }

    return current
  }

  moveEnemyAlongPath(player: Player, weapons: (Weapon | undefined)[]) {
    if (this.getData("stunned")) return

    const pathIndex = this.getData("pathIndex") as number
    if (pathIndex == null) return

    // 기본 이동 속도
    const baseSpeed = 160
    // 플레이어와 적 사이의 거리를 측정
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y)
    // 플레이어가 가까우면 느리게 이동: 예시로, 200픽셀 이내면 속도를 50%로 줄임
    const slowRange = 200
    const speed =
      distanceToPlayer < slowRange
        ? baseSpeed * (1 - weapons.reduce((acc, current) => acc + (current?.slow ?? 0), 0))
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
      this.setData("pathIndex", nextIndex)
    }
    if (this.active) this.scene.physics.moveTo(this, target.x, target.y, speed)
  }

  updateEnemyHpBar() {
    const hp = this.getData("hp")
    const maxHp = this.getData("maxHp")
    const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
    if (!hpBar) return

    // 위치나 스타일 초기화
    hpBar.clear()

    // 예시: 체력바 배경
    hpBar.fillStyle(0x000000)
    hpBar.fillRect(this.x - 16, this.y - 30, 32, 4) // width 32, height 4

    // 남은 체력 비율만큼 색 채우기
    const hpPercent = hp / maxHp
    hpBar.fillStyle(0xff0000)
    hpBar.fillRect(this.x - 16, this.y - 30, 32 * hpPercent, 4)
  }

  showDamageText(damageValue: number) {
    // “-10” 처럼 표시
    const dmgText = this.scene.add
      .text(this.x, this.y, `-${damageValue}`, {
        fontSize: "14px",
        color: "#ff4444",
        fontStyle: "bold",
      })
      .setOrigin(0.5)

    // 트윈으로 서서히 떠오르며 사라지는 연출
    this.scene.tweens.add({
      targets: dmgText,
      y: this.y - 20, // 위로 30px 이동
      alpha: 0, // 투명도 0이 됨
      duration: 800, // 0.8초 동안
      ease: "Sine.easeOut",
      onComplete: () => {
        dmgText.destroy()
      },
    })
  }

  takeDamage(weaponData: Weapon, materials: Materials, distInSplash?: number) {
    const currentHP = this.getData("hp") as number

    const _physicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            weaponData.physicalDamage +
              materials["힘"].info.physicalDamage * materials["힘"].length,
            this.physicalDefence,
            weaponData.physicalPenetration +
              materials["운"].info.armorPenetration * materials["운"].length
          )
        : this.calculateReducedDamage(
            +(weaponData.physicalDamage * (1 - distInSplash / weaponData.splash)).toFixed(2) +
              materials["힘"].info.physicalDamage * materials["힘"].length,
            this.physicalDefence,
            weaponData.physicalPenetration +
              materials["운"].info.armorPenetration * materials["운"].length
          )

    const _magicalDamage =
      distInSplash === undefined
        ? this.calculateReducedDamage(
            weaponData.magicalDamage +
              materials["지식"].info.physicalDamage * materials["지식"].length,
            this.magicalDefence,
            weaponData.magicalDamage +
              materials["지혜"].info.armorPenetration * materials["지혜"].length
          )
        : this.calculateReducedDamage(
            +(weaponData.magicalDamage * (1 - distInSplash / weaponData.splash)).toFixed(2) +
              materials["지식"].info.physicalDamage * materials["지식"].length,
            this.magicalDefence,
            weaponData.magicalDamage +
              materials["지혜"].info.armorPenetration * materials["지혜"].length
          )

    const damage = _physicalDamage + _magicalDamage

    this.setData("hp", currentHP - damage)

    // 깜빡이는 효과
    this.setTintFill(0xff0000)
    this.scene.time.delayedCall(100, () => this.setTint(0xff0000))

    this.showDamageText(damage)

    if (!this.getData("stunned")) {
      this.setData("stunned", true)
      // 즉시 적 이동을 멈춤
      this.body?.velocity.set(0, 0)

      // 300ms 후에 정지 상태 해제
      this.scene.time.delayedCall(
        weaponData.stun + materials["카리스마"].length * (materials["카리스마"].info.stun * 100),
        () => {
          this.setData("stunned", false)
        }
      )
    }

    // 적 HP가 0 이하라면 제거
    if (this.getData("hp") <= 0) {
      const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
      if (hpBar) hpBar.destroy()
      this.destroy()
    }
  }

  calculateReducedDamage(damage: number, defense: number, penetration = 0): number {
    const k = 100
    const maxReduction = 0.8

    // 관통 적용: 방어력 감소
    const reducedDefense = Math.max(0, defense - penetration)

    const reductionRate = Math.min(reducedDefense / (reducedDefense + k), maxReduction)
    return damage ? Math.max(1, Math.floor(damage * (1 - reductionRate))) : damage
  }
}
