<template>
    <div
        ref="phaserContainer"
        class="phaser-container"></div>
</template>

<script lang="ts" setup>
    import Phaser from "phaser"

    // Vue에서 DOM 요소를 참조하기 위한 ref
    const phaserContainer = ref<HTMLDivElement>()

    // Phaser.Game 인스턴스 저장용
    let game: Phaser.Game
    let platforms: Phaser.Physics.Arcade.StaticGroup
    let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys
    let stars: Phaser.Physics.Arcade.Group
    let bombs: Phaser.Physics.Arcade.Group
    let score = 0
    let scoreText: Phaser.GameObjects.Text
    let gameOver = false

    onMounted(() => {
        if (!phaserContainer.value) return

        // Phaser 게임 객체 생성
        game = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: phaserContainer.value,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { x: 0, y: 300 },
                    debug: true,
                },
            },
            scene: {
                preload(this: Phaser.Scene) {
                    this.load.image("sky", "/assets/images/sky.png")
                    this.load.image("ground", "/assets/images/platform.png")
                    this.load.image("star", "/assets/images/star.png")
                    this.load.image("bomb", "/assets/images/bomb.png")
                    this.load.spritesheet("dude", "/assets/images/dude.png", {
                        frameWidth: 32,
                        frameHeight: 48,
                    })
                },
                create(this: Phaser.Scene) {
                    // 화면 중앙에 로고 표시
                    this.add.image(400, 300, "sky")

                    platforms = this.physics.add.staticGroup()

                    platforms.create(750, 220, "ground")
                    platforms.create(50, 250, "ground")
                    platforms.create(600, 400, "ground")
                    platforms.create(400, 568, "ground").setScale(2).refreshBody()

                    player = this.physics.add.sprite(100, 450, "dude")

                    player.setBounce(0.2)
                    player.setCollideWorldBounds(true)

                    this.anims.create({
                        key: "left",
                        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
                        frameRate: 10,
                        repeat: -1,
                    })

                    this.anims.create({
                        key: "turn",
                        frames: [{ key: "dude", frame: 4 }],
                        frameRate: 20,
                    })

                    this.anims.create({
                        key: "right",
                        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
                        frameRate: 10,
                        repeat: -1,
                    })

                    this.physics.add.collider(player, platforms)

                    cursors = this.input.keyboard!.createCursorKeys()

                    stars = this.physics.add.group({
                        key: "star",
                        repeat: 11,
                        setXY: { x: 12, y: 0, stepX: 70 },
                    })

                    stars.children.iterate((child) => {
                        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
                        return true
                    })

                    this.physics.add.collider(stars, platforms)
                    this.physics.add.overlap(
                        player,
                        stars,
                        (_, star) => {
                            star.disableBody(true, true)

                            score += 10
                            scoreText.setText("Score: " + score)

                            if (stars.countActive(true) === 0) {
                                stars.children.iterate((child) => {
                                    child.enableBody(true, child.x, 0, true, true)
                                    return true
                                })

                                var x =
                                    player.x < 400
                                        ? Phaser.Math.Between(400, 800)
                                        : Phaser.Math.Between(0, 400)

                                var bomb = bombs.create(x, 16, "bomb")
                                bomb.setBounce(1)
                                bomb.setCollideWorldBounds(true)
                                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
                            }
                        },
                        undefined,
                        this
                    )

                    scoreText = this.add.text(16, 16, "score: 0", {
                        fontSize: "32px",
                        color: "#fff",
                    })

                    bombs = this.physics.add.group()

                    this.physics.add.collider(bombs, platforms)

                    this.physics.add.collider(
                        player,
                        bombs,
                        (player) => {
                            this.physics.pause()

                            player.setTint(0xff0000)

                            player.anims.play("turn")

                            gameOver = true
                        },
                        undefined,
                        this
                    )
                },
                update(this: Phaser.Scene) {
                    if (cursors.left.isDown) {
                        player.setVelocityX(-160)

                        player.anims.play("left", true)
                    } else if (cursors.right.isDown) {
                        player.setVelocityX(160)

                        player.anims.play("right", true)
                    } else {
                        player.setVelocityX(0)

                        player.anims.play("turn")
                    }

                    if (cursors.up.isDown && player.body.touching.down) {
                        player.setVelocityY(-330)
                    }
                },
            },
        })
    })

    onBeforeUnmount(() => {
        // 컴포넌트가 언마운트될 때 게임 인스턴스 정리
        if (game) game.destroy(true)
    })
</script>

<style scoped>
    .phaser-container {
        width: 800px;
        height: 600px;
        margin: 0 auto;
        border: 1px solid #ccc;
    }
</style>
