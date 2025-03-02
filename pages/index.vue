<template>
    <div
        ref="phaserContainer"
        class="phaser-container"></div>
</template>

<script lang="ts" setup>
    import Phaser from "phaser"

    const phaserContainer = ref<HTMLDivElement>()

    // Phaser.Game 인스턴스
    let game: Phaser.Game

    // 전역 참조 (씬 내부에서 할당)
    let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    let enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys
    let pathIndex = 0
    const path = [
        { x: 100, y: 50 }, // 좌측 상단
        { x: 100, y: 550 }, // 좌측 하단
        { x: 700, y: 550 }, // 우측 하단
        { x: 700, y: 50 }, // 우측 상단
    ]

    // 적 HP 및 이동
    let enemyHP = 100

    // 공격(탄환) 관련
    let bullets: Phaser.Physics.Arcade.Group
    let lastAttackTime = 0
    const attackCoolDown = 1000 // 1초 간격
    const bulletSpeed = 500 // 탄환 기본 이동 속도
    const attackRange = 200

    onMounted(() => {
        if (!phaserContainer.value) return

        game = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: phaserContainer.value,
            physics: {
                default: "arcade",
                arcade: {
                    debug: true,
                },
            },
            scene: {
                preload(this: Phaser.Scene) {
                    this.load.image("sky", "/assets/images/sky.png")
                    this.load.spritesheet("dude", "/assets/images/dude.png", {
                        frameWidth: 32,
                        frameHeight: 48,
                    })
                    this.load.spritesheet("enemy", "/assets/images/dude.png", {
                        frameWidth: 32,
                        frameHeight: 48,
                    })
                    // 탄환 이미지 (예: star.png)
                    this.load.image("bullet", "/assets/images/star.png")
                },
                create(this: Phaser.Scene) {
                    cursors = this.input.keyboard!.createCursorKeys()
                    this.add.image(400, 300, "sky")

                    // 플레이어
                    player = this.physics.add.sprite(100, 450, "dude").setCollideWorldBounds(true)

                    // 적(빨간 틴트)
                    enemy = this.physics.add.sprite(100, 50, "enemy").setTint(0xff0000)

                    // 애니메이션
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

                    this.physics.moveTo(enemy, path[pathIndex].x, path[pathIndex].y, 160)

                    // ===== 탄환(bullet) 그룹 생성 =====
                    bullets = this.physics.add.group({ collideWorldBounds: false })
                    // 탄환과 적 겹치면 데미지 주는 overlap
                    this.physics.add.overlap(bullets, enemy, bulletHitEnemy, undefined, this)
                },
                update(this: Phaser.Scene, time: number) {
                    // 플레이어 이동
                    handlePlayerMovement()
                    // 적 이동
                    handleEnemyMovement.call(this)

                    const distance = Phaser.Math.Distance.Between(
                        player.x,
                        player.y,
                        enemy.x,
                        enemy.y
                    )

                    // 플레이어가 정지상태 && 쿨다운 → 발사
                    const isPlayerIdle =
                        player.body.velocity.x === 0 && player.body.velocity.y === 0
                    const isCooltime = time > lastAttackTime + attackCoolDown
                    const isInRange = distance <= attackRange

                    if (isPlayerIdle && isCooltime && isInRange) fireHomingBullet.call(this, time)

                    // === 호밍 로직: 각 탄환이 적 좌표를 향하도록 매 프레임 속도 업데이트 ===
                    moveBulletToEnemy.call(this)

                    // 화면 밖 탄환 제거
                    bullets.children.each((bullet) => {
                        const b = bullet as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        if (b.x < 0 || b.x > 800 || b.y < 0 || b.y > 600) b.destroy()
                    })
                },
            },
        })
    })

    function moveBulletToEnemy() {
        bullets.children.each((obj) => {
            const bullet = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

            if (!bullet.active) return

            // 이미 파괴되었거나 적이 죽었다면 패스
            if (!enemy.active) return

            // 각도 계산
            const angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y)
            bullet.body.setVelocity(Math.cos(angle) * bulletSpeed, Math.sin(angle) * bulletSpeed)
        })
    }
    /**
     * 플레이어 이동 처리
     */
    function handlePlayerMovement() {
        const speed = 160
        let moving = false

        if (cursors.left.isDown) {
            player.setVelocityX(-speed)
            player.anims.play("left", true)
            moving = true
        } else if (cursors.right.isDown) {
            player.setVelocityX(speed)
            player.anims.play("right", true)
            moving = true
        } else {
            player.setVelocityX(0)
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-speed)
            moving = true
        } else if (cursors.down.isDown) {
            player.setVelocityY(speed)
            moving = true
        } else if (!cursors.up.isDown && !cursors.down.isDown) {
            player.setVelocityY(0)
        }

        if (!moving) {
            player.anims.play("turn")
        }
    }

    /**
     * 적 경로 이동 처리
     */
    function handleEnemyMovement(this: Phaser.Scene) {
        const dist = Phaser.Math.Distance.Between(
            enemy.x,
            enemy.y,
            path[pathIndex].x,
            path[pathIndex].y
        )

        if (dist < 5) {
            enemy.x = path[pathIndex].x
            enemy.y = path[pathIndex].y
            pathIndex++
            if (pathIndex >= path.length) pathIndex = 0
        }
        if (enemy.active) this.physics.moveTo(enemy, path[pathIndex].x, path[pathIndex].y, 160)
    }

    /**
     * 호밍 탄환 발사
     */
    function fireHomingBullet(this: Phaser.Scene, currentTime: number) {
        lastAttackTime = currentTime

        // 플레이어 위치에서 탄환 생성
        const bullet = bullets.create(
            player.x,
            player.y,
            "bullet"
        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        if (!bullet) return

        bullet.setActive(true)
        bullet.setVisible(true)

        // 처음에 한 번 적 방향으로 설정
        const angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y)
        bullet.body.setVelocity(Math.cos(angle) * bulletSpeed, Math.sin(angle) * bulletSpeed)
    }

    /**
     * 탄환과 적 겹쳤을 때
     */
    function bulletHitEnemy(
        enemyObj: Phaser.GameObjects.GameObject,
        bulletObj: Phaser.GameObjects.GameObject
    ) {
        const bullet = bulletObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        const enemySprite = enemyObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        // 적 HP 감소
        enemyHP--

        // 깜빡이는 효과
        enemySprite.setTintFill(0xff0000)
        setTimeout(() => enemySprite.setTint(0xff0000), 100)

        // 탄환 제거
        bullet.destroy()

        // 적 HP가 0 이하라면 제거
        if (enemyHP <= 0) enemySprite.destroy()
    }

    onBeforeUnmount(() => {
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
