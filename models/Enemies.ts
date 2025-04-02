import Phaser from "phaser"
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
  spawnEnemy() {
    const { x, y } = this.pathes[0]

    // 새 적 생성
    this.group.add(new Enemy(this.scene, x, y, "enemy", this.pathes))

    this.remainnedEnemies.value++
  }

  takeDamage(enemy: Enemy, weapon: Weapon) {
    enemy.takeDamage(weapon.damage, weapon.stun)

    // 적 HP가 0 이하라면 제거
    if (!enemy.getData("hp")) this.remainnedEnemies--
  }

  applySplashDamage(centerX: number, centerY: number, splashRadius: number, damage: number) {
    // enemyGroup 내 모든 적 순회
    this.children.forEach((enemy) => {
      if (!enemy.active) return

      const dist = Phaser.Math.Distance.Between(centerX, centerY, enemy.x, enemy.y)
      if (dist <= splashRadius) {
        // 만약 거리 비례 데미지를 적용하고 싶다면:
        const effectiveDamage = +(damage * (1 - dist / splashRadius)).toFixed(2)
        enemy.takeDamage(effectiveDamage)
      }

      // 적 HP가 0 이하라면 제거
      if (!enemy.getData("hp")) this.remainnedEnemies--
    })
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  pathes: { x: number; y: number }[]

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    paths: { x: number; y: number }[]
  ) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setTint(0xff0000)
      .setData("hp", 10)
      .setData("pathIndex", 0)
      .setData("maxHp", 10)
      .setData("hpBar", this.scene.add.graphics())

    this.pathes = paths
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

  takeDamage(damage: number, stun = 0) {
    const currentHP = this.getData("hp") as number
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
      this.scene.time.delayedCall(stun, () => {
        this.setData("stunned", false)
      })
    }

    // 적 HP가 0 이하라면 제거
    if (this.getData("hp") <= 0) {
      const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
      if (hpBar) hpBar.destroy()
      this.destroy()
    }
  }
}
