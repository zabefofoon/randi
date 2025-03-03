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

    let enemies: Phaser.Physics.Arcade.Group
    // 기타 상수
    const maxEnemies = 10 // 최대 2마리 생성
    let remainnedEnemies = 0
    let remainnedEnemiesCount: Phaser.GameObjects.Text
    const enemyCountDeadline = 40

    let cursors: Phaser.Types.Input.Keyboard.CursorKeys
    const path = [
        { x: 100, y: 50 }, // 좌측 상단
        { x: 100, y: 550 }, // 좌측 하단
        { x: 700, y: 550 }, // 우측 하단
        { x: 700, y: 50 }, // 우측 상단
    ]

    // 공격(탄환) 관련
    let bullets: Phaser.Physics.Arcade.Group
    let lastAttackTime = 0
    const attackCoolDown = 1000 // 1초 간격
    const bulletSpeed = 500 // 탄환 기본 이동 속도
    const attackRange = 200

    let remainnedTime = 3
    const roundTime = 45
    let remainnedTimeText: Phaser.GameObjects.Text

    let life = 10
    let gameover = false

    let round = 0
    let roundText: Phaser.GameObjects.Text

    const maxAttackLength = 3

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
                    remainnedTimeText = this.add.text(
                        400,
                        0,
                        `00:${String(remainnedTime).padStart(2, "0")}`,
                        {
                            color: "#fff",
                            fontSize: 16,
                        }
                    )

                    roundText = this.add.text(0, 0, `round ${round}`, {
                        color: "#fff",
                        fontSize: 16,
                    })

                    // 플레이어
                    player = this.physics.add.sprite(100, 450, "dude").setCollideWorldBounds(true)

                    enemies = this.physics.add.group({ collideWorldBounds: false })

                    this.time.addEvent({
                        delay: 1000,
                        repeat: -1,
                        callback: () => {
                            remainnedTime--
                            if (remainnedTime === 1) spawnEnemies.call(this)

                            if (remainnedTime < 1) {
                                remainnedTime = roundTime
                                round++
                                roundText.setText(`round ${round}`)
                            }

                            remainnedTimeText.setText(
                                `00:${String(remainnedTime).padStart(2, "0")}`
                            )

                            if (remainnedEnemies >= enemyCountDeadline) life--

                            if (life < 1) {
                                gameover = true
                                console.log("gameover")
                                this.physics.pause()
                            }
                        },
                    })

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

                    // ===== 탄환(bullet) 그룹 생성 =====
                    bullets = this.physics.add.group({ collideWorldBounds: false })
                    this.physics.add.overlap(bullets, enemies, bulletHitEnemy, undefined, this)

                    remainnedEnemiesCount = this.add.text(750, 0, `${0}/${enemyCountDeadline}`, {
                        color: "#fff",
                        fontSize: 16,
                        align: "end",
                    })
                },
                update(this: Phaser.Scene, time: number) {
                    // 플레이어 이동
                    handlePlayerMovement()

                    // 적 이동

                    enemies.children.each((obj) => {
                        const enemy = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        moveEnemyAlongPath.call(this, enemy)
                    })

                    // 플레이어가 정지상태 && 쿨다운 → 발사
                    const isPlayerIdle =
                        player.body.velocity.x === 0 && player.body.velocity.y === 0
                    const isCooltime = time > lastAttackTime + attackCoolDown
                    const closestEnemies = getClosestEnemies(player, enemies)
                    if (isPlayerIdle && isCooltime) {
                        if (closestEnemies.length) {
                            closestEnemies.forEach((enemy) => {
                                const distance = Phaser.Math.Distance.Between(
                                    player.x,
                                    player.y,
                                    enemy.x,
                                    enemy.y
                                )
                                const isInRange = distance <= attackRange

                                if (isInRange) fireHomingBullet.call(this, time, enemy)
                            })
                        }
                    }

                    // 화면 밖 탄환 제거
                    bullets.children.each((obj) => {
                        const bullet = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        if (!bullet.active) return

                        // bullet에 저장해둔 target(Enemy)을 따라가도록
                        const target = bullet.getData(
                            "target"
                        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        if (!target || !target.active) return

                        const angle = Phaser.Math.Angle.Between(
                            bullet.x,
                            bullet.y,
                            target.x,
                            target.y
                        )
                        bullet.body.setVelocity(
                            Math.cos(angle) * bulletSpeed,
                            Math.sin(angle) * bulletSpeed
                        )

                        // 화면 밖으로 나가면 제거
                        if (bullet.x < 0 || bullet.x > 800 || bullet.y < 0 || bullet.y > 600) {
                            bullet.destroy()
                        }
                    })
                },
            },
        })
    })

    /**
     * 가장 가까운 Enemy 찾기 (옵션 구현)
     */
    function getClosestEnemies(
        source: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
        group: Phaser.Physics.Arcade.Group
    ): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] {
        const enemies: {
            enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            dist: number
        }[] = []

        group.children.each((obj) => {
            const enemy = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            if (!enemy.active) return

            const dist = Phaser.Math.Distance.Between(source.x, source.y, enemy.x, enemy.y)

            enemies.push({ enemy, dist })
        })
        enemies.sort((a, b) => a.dist - b.dist)

        return enemies.slice(0, maxAttackLength).map((e) => e.enemy)
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

    function spawnEnemies(this: Phaser.Scene) {
        // Phaser의 타이머 이벤트
        // delay: 1000ms (1초), repeat: 19 → 총 20회(처음 + 19번 반복)
        this.time.addEvent({
            delay: 1000,
            repeat: maxEnemies - 1,
            callback: () => {
                spawnEnemy.call(this)
            },
        })
    }

    /**
     * 적 하나를 스폰하는 함수
     */
    function spawnEnemy(this: Phaser.Scene) {
        // 새 적 생성
        const enemy = enemies.create(
            100,
            50,
            "enemy"
        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        enemy.setTint(0xff0000)

        // 각 적마다 HP와 pathIndex를 개별 관리
        enemy.setData("hp", 10)
        enemy.setData("pathIndex", 0)
        remainnedEnemies++
        remainnedEnemiesCount.setText(`${remainnedEnemies}/${enemyCountDeadline}`)
    }

    /**
     * 적 경로 이동 처리
     */
    function moveEnemyAlongPath(
        this: Phaser.Scene,
        enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    ) {
        let pathIndex = enemy.getData("pathIndex") as number
        if (pathIndex == null) return

        const dist = Phaser.Math.Distance.Between(
            enemy.x,
            enemy.y,
            path[pathIndex].x,
            path[pathIndex].y
        )
        if (dist < 5) {
            enemy.x = path[pathIndex].x
            enemy.y = path[pathIndex].y
            let nextIndex = pathIndex + 1
            if (nextIndex >= path.length) nextIndex = 0
            enemy.setData("pathIndex", nextIndex)
        }
        if (enemy.active) this.physics.moveTo(enemy, path[pathIndex].x, path[pathIndex].y, 160)
    }

    /**
     * 호밍 탄환 발사
     */
    function fireHomingBullet(
        this: Phaser.Scene,
        currentTime: number,
        enemy: Phaser.GameObjects.GameObject
    ) {
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

        bullet.setData("target", enemy)

        // 처음에 한 번 적 방향으로 설정
        const angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, enemy.x, enemy.y)
        bullet.body.setVelocity(Math.cos(angle) * bulletSpeed, Math.sin(angle) * bulletSpeed)
    }

    /**
     * 탄환과 적 겹쳤을 때
     */
    function bulletHitEnemy(
        bulletObj: Phaser.GameObjects.GameObject,
        enemyObj: Phaser.GameObjects.GameObject
    ) {
        const bullet = bulletObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        const enemySprite = enemyObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

        // 적 HP 감소
        const currentHP = enemySprite.getData("hp") as number
        enemySprite.setData("hp", currentHP - 1)

        // 깜빡이는 효과
        enemySprite.setTintFill(0xff0000)
        setTimeout(() => enemySprite.setTint(0xff0000), 100)

        // 탄환 제거
        bullet.destroy()

        // 적 HP가 0 이하라면 제거
        if (enemySprite.getData("hp") <= 0) {
            enemySprite.destroy()
            remainnedEnemies--
            remainnedEnemiesCount.setText(`${remainnedEnemies}/${enemyCountDeadline}`)
        }
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
