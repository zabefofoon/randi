import type { Enemies, Enemy } from "./Enemies"
import type { Enforces } from "./Enforces"
import type { Materials } from "./Material"
import type { Player } from "./Player"
import { LaserBeam } from "./Skill"

interface BeamContext {
  scene: Phaser.Scene & {
    dmgPool: Phaser.GameObjects.Group
  }
  player: Player
  enemies: Enemies
  materials: Materials
  enforces: Enforces
}

export class BeforeBeam {
  totalFrames = 30
  maxLength = 0
  frame = 0
  phase: "extend" | "retract" = "extend"
  event: Phaser.Time.TimerEvent

  lineGraphic: Phaser.GameObjects.Graphics

  callback?: (context: BeamContext, offsetX: number, offsetY: number, maxLength: number) => void

  static create(context: BeamContext) {
    return new BeforeBeam(context)
  }

  constructor(private context: BeamContext) {
    this.lineGraphic = this.context.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000 } })
    this.maxLength = this.context.player.flipX
      ? 960 * window.scale - this.context.player.x
      : this.context.player.x
    this.event = this.context.scene.time.addEvent({
      delay: 16,
      loop: true,
      callback: () => this.update(),
    })
  }

  private getOffset() {
    const angleRad = Phaser.Math.DegToRad(this.context.player.flipX ? 0 : 180)
    const offsetX = Math.cos(angleRad)
    const offsetY = Math.sin(angleRad)

    return [offsetX, offsetY]
  }

  private drawExtendLine(offsetX: number, offsetY: number, progress: number) {
    const x1 = this.context.player.x
    const y1 = this.context.player.y
    const x2 = x1 + offsetX * progress
    const y2 = y1 + offsetY * progress

    this.lineGraphic.strokeLineShape(new Phaser.Geom.Line(x1, y1, x2, y2))
  }

  private drawRetractLine(offsetX: number, offsetY: number, progress: number) {
    const x2 = this.context.player.x + offsetX * this.maxLength
    const y2 = this.context.player.y + offsetY * this.maxLength
    const x1 = x2 - offsetX * progress
    const y1 = y2 - offsetY * progress

    this.lineGraphic.strokeLineShape(new Phaser.Geom.Line(x1, y1, x2, y2))
  }

  update() {
    this.frame++

    const [offsetX, offsetY] = this.getOffset()
    const progressRatio = Phaser.Math.Easing.Quadratic.Out(
      Math.min(this.frame / this.totalFrames, 1)
    )

    this.lineGraphic.clear()
    if (this.phase === "extend")
      this.drawExtendLine(offsetX, offsetY, progressRatio * this.maxLength)
    else this.drawRetractLine(offsetX, offsetY, (1 - progressRatio) * this.maxLength)

    if (this.frame >= this.totalFrames) {
      if (this.phase === "extend") {
        this.frame = 0
        this.phase = "retract"
      } else {
        this.destroy()
        this.callback?.(this.context, offsetX, offsetY, this.maxLength)
      }
    }
  }

  destroy() {
    this.lineGraphic.destroy()
    this.event.remove()
  }
  onComplete(callback: BeforeBeam["callback"]) {
    this.callback = callback
    return this
  }
}

export class DogeBeam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastHitMap = new Map<any, number>()
  beamImage: Phaser.GameObjects.Image
  laserLine: Phaser.Geom.Line
  event: Phaser.Time.TimerEvent
  duration = 2500
  private static instance = LaserBeam.of()

  constructor(
    private context: BeamContext,
    offsetX: number,
    offsetY: number,
    private maxLength: number
  ) {
    const angleDeg = this.context.player.flipX ? 0 : 180

    this.laserLine = this.createLaserLine(offsetX, offsetY)

    this.beamImage = this.createLaserImage()
      .setRotation(Phaser.Math.DegToRad(angleDeg))
      .setOrigin(0, 0.5)
      .setScale(window.scale)
      .setBlendMode(Phaser.BlendModes.ADD)

    this.event = this.context.scene.time.addEvent({
      delay: 16,
      loop: true,
      callback: () => this.update(),
    })

    this.context.scene.time.delayedCall(this.duration, () => this.destroy())
  }

  private createLaserImage() {
    return this.context.scene.add.image(this.context.player.x, this.context.player.y, "laser-beam")
  }

  private createLaserLine(offsetX: number, offsetY: number) {
    const { x, y } = this.context.player
    return new Phaser.Geom.Line(x, y, x + offsetX * this.maxLength, y + offsetY * this.maxLength)
  }

  private hitEnemy(enemy: Enemy, now: number) {
    const lastHit = this.lastHitMap.get(enemy) ?? 0
    if (now - lastHit >= 100) {
      enemy.takeDamage(DogeBeam.instance, this.context.materials, this.context.enforces)
      this.lastHitMap.set(enemy, now)
    }
  }

  private update() {
    const { x, y, flipX } = this.context.player

    const endX = !flipX ? x - this.maxLength : x + this.maxLength
    this.laserLine.setTo(x, y, endX, y)

    this.beamImage.setRotation(Phaser.Math.DegToRad(flipX ? 0 : 180)).setPosition(x, y)

    const now = this.context.scene.time.now
    for (const enemy of this.context.enemies.children) {
      const { x, y, width, height } = enemy.body as Phaser.Physics.Arcade.Body
      const rect = new Phaser.Geom.Rectangle(x, y, width, height)
      const isOverlaped = Phaser.Geom.Intersects.LineToRectangle(this.laserLine, rect)
      if (isOverlaped) this.hitEnemy(enemy, now)
    }
  }

  private destroy() {
    this.beamImage.destroy()
    this.event.remove()
  }

  static of(context: BeamContext, offsetX: number, offsetY: number, maxLength: number) {
    return new DogeBeam(context, offsetX, offsetY, maxLength)
  }
}
