import type { Enemies } from "./Enemies"

export class Player extends Phaser.Physics.Arcade.Sprite {
  maxLife = 5
  knife!: Phaser.GameObjects.Sprite
  gun!: Phaser.GameObjects.Sprite
  book!: Phaser.GameObjects.Sprite
  ring!: Phaser.GameObjects.Sprite

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
      .setData("maxHp", this.maxLife)
      .setData("hp", this.maxLife)
      .setData("hpBar", scene.add.graphics())
      .setScale(0.6)
      .setDepth(2)

    this.body?.setSize(50, 120).setOffset(40, 0)

    this.gun = scene.add
      .sprite(x, y, "gun-sprite", 0)
      .setScale(0.75)
      .setDepth(this.depth + 1)

    this.knife = scene.add
      .sprite(x, y, "knife-sprite", 0)
      .setScale(1.5)
      .setDepth(this.depth + 1)

    this.book = scene.add
      .sprite(x, y, "book-sprite", 0)
      .setScale(0.75)
      .setDepth(this.depth + 1)

    this.ring = scene.add
      .sprite(x, y, "ring-sprite", 0)
      .setScale(0.5)
      .setDepth(this.depth + 1)
  }

  get isIdle() {
    return this.body?.velocity.x === 0 && this.body.velocity.y === 0
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    this.book.setPosition(this.x, this.y)
    this.ring.setPosition(this.x, this.y)
  }

  updatePlayerHpBar() {
    const hp = this.getData("hp")
    const maxHp = this.getData("maxHp")
    const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
    if (!hpBar) return

    hpBar.clear()

    hpBar.fillStyle(0x000000)
    hpBar.fillRect(this.x - 16, this.y - 45, 32, 4) // width 32, height 4

    const hpPercent = hp / maxHp
    hpBar.fillStyle(0xff0000)
    hpBar.fillRect(this.x - 16, this.y - 45, 32 * hpPercent, 4)
  }

  handlePlayerMovement(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    const speed = 120 * window.speed
    let moving = false

    if (cursors.left.isDown) {
      this.setVelocityX(-speed)
      this.anims.play("work", true)
      this.setFlipX(false)
      moving = true
    } else if (cursors.right.isDown) {
      this.setVelocityX(speed)
      this.anims.play("work", true)
      this.setFlipX(true)
      moving = true
    } else if (!cursors.left.isDown && !cursors.right.isDown) {
      this.setVelocityX(0)
    }

    if (cursors.up.isDown) {
      this.setVelocityY(-speed)
      this.anims.play("work", true)
      moving = true
    } else if (cursors.down.isDown) {
      this.setVelocityY(speed)
      this.anims.play("work", true)
      moving = true
    } else if (!cursors.up.isDown && !cursors.down.isDown) {
      this.setVelocityY(0)
    }

    if (!moving) this.anims.play("turn", true)
  }

  getClosestEnemies(enemies: Enemies, length: number) {
    return enemies.children
      .filter((enemy) => enemy.active)
      .map((enemy) => ({
        enemy,
        dist: enemy.distanceWithPlayer,
        isBoss: enemy.isBoss ? 0 : 1,
        hp: enemy.getData("hp") as number,
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, length)
      .map((e) => e.enemy)
  }

  createPlayerAnimation() {
    this.scene.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("playerIdle", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1,
    })
    this.scene.anims.create({
      key: "work",
      frames: this.anims.generateFrameNumbers("playerWork", { start: 0, end: 7 }),
      frameRate: 7,
      repeat: -1,
    })

    this.scene.anims.create({
      key: "gun-animation",
      frames: this.anims.generateFrameNumbers("gun-sprite", { start: 0, end: 5 }),
      frameRate: 25,
      repeat: 0,
    })

    this.scene.anims.create({
      key: "knife-animation",
      frames: this.anims.generateFrameNumbers("knife-sprite", { start: 0, end: 8 }),
      frameRate: 14,
      repeat: 0,
    })

    this.scene.anims.create({
      key: "book-animation",
      frames: this.anims.generateFrameNumbers("book-sprite", { start: 0, end: 6 }),
      frameRate: 14,
      repeat: 0,
    })

    this.scene.anims.create({
      key: "ring-animation",
      frames: this.anims.generateFrameNumbers("ring-sprite", { start: 0, end: 6 }),
      frameRate: 14,
      repeat: 0,
    })

    return this
  }
}
