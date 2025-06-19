export class Player extends Phaser.Physics.Arcade.Sprite {
  maxLife = 5
  knife!: Phaser.GameObjects.Sprite
  gun!: Phaser.GameObjects.Sprite
  book!: Phaser.GameObjects.Sprite
  ring!: Phaser.GameObjects.Sprite
  weapons!: Phaser.GameObjects.Sprite
  weaponsEffect!: Phaser.GameObjects.Sprite
  isRage = false

  private hpBarBg!: Phaser.GameObjects.Rectangle
  private hpBarFill!: Phaser.GameObjects.Rectangle
  private readonly hpBarOffset = { x: -16, y: -45 }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // === HP bar ===
    this.hpBarBg = scene.add.rectangle(0, 0, 32, 4, 0x000000).setOrigin(0)
    this.hpBarFill = scene.add.rectangle(0, 0, 32, 4, 0xff0000).setOrigin(0)
    this.hpBarBg.setDepth(3)
    this.hpBarFill.setDepth(3)

    // 처음 위치 한 번만 계산
    this.updateHpBarPos()

    this.setCollideWorldBounds(true)
      .setData("maxHp", this.maxLife)
      .setData("hp", this.maxLife)
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

    this.weapons = scene.add
      .sprite(x, y, "weapons-animation2", 0)
      .setScale(1)
      .setDepth(this.depth + 1)

    this.weaponsEffect = scene.add
      .sprite(x, y, "weapons-animation", 0)
      .setScale(1)
      .setDepth(this.depth + 1)
  }

  get isIdle() {
    return this.body?.velocity.x === 0 && this.body.velocity.y === 0
  }

  override preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)
    this.book.setPosition(this.x, this.y)
    this.ring.setPosition(this.x, this.y)
    this.weapons.setPosition(this.x, this.y + 20)
    this.weaponsEffect.setPosition(this.x, this.y)
    this.updateHpBarPos()
  }

  private updateHpBarPos() {
    const { x, y } = this
    this.hpBarBg.setPosition(x + this.hpBarOffset.x, y + this.hpBarOffset.y)
    this.hpBarFill.setPosition(x + this.hpBarOffset.x, y + this.hpBarOffset.y)
  }

  private drawHp() {
    const hp = this.getData("hp") as number
    const ratio = Phaser.Math.Clamp(hp / this.maxLife, 0, 1)
    this.hpBarFill.displayWidth = 32 * ratio
  }

  takeDamage(dmg = 1) {
    const hp = (this.getData("hp") as number) - dmg
    this.setData("hp", hp)
    this.drawHp()
  }

  handlePlayerMovement(
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    wasd: {
      up: Phaser.Input.Keyboard.Key
      down: Phaser.Input.Keyboard.Key
      left: Phaser.Input.Keyboard.Key
      right: Phaser.Input.Keyboard.Key
    }
  ) {
    const speed = this.isRage ? 170 * window.speed : 120 * window.speed
    let moving = false

    const left = cursors.left.isDown || wasd.left.isDown
    const right = cursors.right.isDown || wasd.right.isDown
    const up = cursors.up.isDown || wasd.up.isDown
    const down = cursors.down.isDown || wasd.down.isDown

    if (left) {
      this.setVelocityX(-speed)
      this.anims.play("work", true)
      this.setFlipX(false)
      moving = true
      if (this.scene.data.get("stepTutorial") === "move") this.scene.events.emit("player-move")
    } else if (right) {
      this.setVelocityX(speed)
      this.anims.play("work", true)
      this.setFlipX(true)
      moving = true
      if (this.scene.data.get("stepTutorial") === "move") this.scene.events.emit("player-move")
    } else {
      this.setVelocityX(0)
    }

    if (up) {
      this.setVelocityY(-speed)
      this.anims.play("work", true)
      moving = true
      if (this.scene.data.get("stepTutorial") === "move") this.scene.events.emit("player-move")
    } else if (down) {
      this.setVelocityY(speed)
      this.anims.play("work", true)
      moving = true
      if (this.scene.data.get("stepTutorial") === "move") this.scene.events.emit("player-move")
    } else {
      this.setVelocityY(0)
    }

    if (!moving) this.anims.play("turn", true)
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

    this.scene.anims.create({
      key: "weapons-animation",
      frames: this.anims.generateFrameNumbers("weapons-animation", { start: 0, end: 8 }),
      frameRate: 8,
      repeat: 0,
    })
    this.scene.anims.create({
      key: "weapons-animation2",
      frames: this.anims.generateFrameNumbers("weapons-animation2", { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    })

    return this
  }
}
