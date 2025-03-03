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
    const enemyCountDeadline = 30

    let cursors: Phaser.Types.Input.Keyboard.CursorKeys
    const path = [
        { x: 50, y: 50 }, // 좌측 상단
        { x: 50, y: 500 }, // 좌측 하단
        { x: 750, y: 500 }, // 우측 하단
        { x: 750, y: 50 }, // 우측 상단
    ]

    // 공격(탄환) 관련
    let bullets: Phaser.Physics.Arcade.Group
    let lastBulletAttackTime = 0
    const bulletCoolDown = 1000 // 1초 간격
    const bulletSpeed = 500 // 탄환 기본 이동 속도
    const bulletAttackRange = 150
    const bulletDamage = 1
    const maxBulletAttackLength = 2

    let weapon2s: Phaser.Physics.Arcade.Group
    let lastWeapon2AttackTime = 0
    const weapon2CoolDown = 1500 // 1초 간격
    const weapon2Speed = 450 // 탄환 기본 이동 속도
    const weapon2AttackRange = 150
    const weapon2Damage = 5
    const maxWeapon2AttackLength = 1

    const initialRemainnedTime = 3
    let remainnedTime = initialRemainnedTime
    const roundTime = 45
    let remainnedTimeText: Phaser.GameObjects.Text

    let round = 0
    let roundText: Phaser.GameObjects.Text

    const maxLife = 5
    let gameover = false
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
                    this.load.image("bullet", "/assets/images/star.png")
                    this.load.image("weapon2", "/assets/images/star.png")
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
                    player = this.physics.add.sprite(400, 300, "dude").setCollideWorldBounds(true)

                    player.setData("maxHp", maxLife)
                    player.setData("hp", maxLife)
                    player.setData("hpBar", this.add.graphics())

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

                            const playerHP = player.getData("hp") as number
                            if (remainnedEnemies >= enemyCountDeadline) {
                                player.setData("hp", playerHP - 1)
                            }

                            if (playerHP < 1) {
                                this.physics.pause()
                                showGameOverUI.call(this)
                            }
                        },
                    })

                    // 애니메이션
                    createPlayerAnimation.call(this)

                    // ===== 탄환(bullet) 그룹 생성 =====
                    bullets = this.physics.add.group({ collideWorldBounds: false })
                    weapon2s = this.physics.add.group({ collideWorldBounds: false })

                    this.physics.add.overlap(bullets, enemies, bulletHitEnemy, undefined, this)
                    this.physics.add.overlap(weapon2s, enemies, weapon2HitEnemy, undefined, this)

                    remainnedEnemiesCount = this.add.text(750, 0, `${0}/${enemyCountDeadline}`, {
                        color: "#fff",
                        fontSize: 16,
                        align: "end",
                    })
                },
                update(this: Phaser.Scene, time: number) {
                    if (gameover) return
                    // 플레이어 이동
                    handlePlayerMovement()
                    updatePlayerHpBar(player)
                    // 적 이동
                    enemies.children.each((obj) => {
                        const enemy = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        moveEnemyAlongPath.call(this, enemy)
                        updateEnemyHpBar.call(this, enemy)
                    })

                    // 플레이어가 정지상태 && 쿨다운 → 발사
                    const isPlayerIdle =
                        player.body.velocity.x === 0 && player.body.velocity.y === 0

                    if (isPlayerIdle) {
                        const isBulletCooltime = time > lastBulletAttackTime + bulletCoolDown
                        const isWeapon2Coolltime = time > lastWeapon2AttackTime + weapon2CoolDown

                        if (isBulletCooltime) {
                            const closestEnemies = getClosestEnemies(
                                player,
                                enemies,
                                maxBulletAttackLength
                            )

                            if (closestEnemies.length) {
                                closestEnemies.forEach((enemy) => {
                                    const distance = Phaser.Math.Distance.Between(
                                        player.x,
                                        player.y,
                                        enemy.x,
                                        enemy.y
                                    )
                                    const isInRange = distance <= bulletAttackRange

                                    if (isInRange) fireHomingBullet.call(this, time, enemy)
                                })
                            }
                        } else if (isWeapon2Coolltime) {
                            const closestEnemies = getClosestEnemies(
                                player,
                                enemies,
                                maxWeapon2AttackLength
                            )
                            if (closestEnemies.length) {
                                closestEnemies.forEach((enemy) => {
                                    const distance = Phaser.Math.Distance.Between(
                                        player.x,
                                        player.y,
                                        enemy.x,
                                        enemy.y
                                    )
                                    const isInRange = distance <= weapon2AttackRange

                                    if (isInRange) fireHomingWeapon2.call(this, time, enemy)
                                })
                            }
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

                    weapon2s.children.each((obj) => {
                        const weapon2 = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        if (!weapon2.active) return

                        // bullet에 저장해둔 target(Enemy)을 따라가도록
                        const target = weapon2.getData(
                            "target"
                        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
                        if (!target || !target.active) return

                        const angle = Phaser.Math.Angle.Between(
                            weapon2.x,
                            weapon2.y,
                            target.x,
                            target.y
                        )
                        weapon2.body.setVelocity(
                            Math.cos(angle) * weapon2Speed,
                            Math.sin(angle) * weapon2Speed
                        )

                        // 화면 밖으로 나가면 제거
                        if (weapon2.x < 0 || weapon2.x > 800 || weapon2.y < 0 || weapon2.y > 600) {
                            weapon2.destroy()
                        }
                    })
                },
            },
        })
    })
    function createPlayerAnimation(this: Phaser.Scene) {
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
    }
    function showGameOverUI(this: Phaser.Scene) {
        gameover = true
        // 화면 중앙에 "GAME OVER" 텍스트
        const gameOverText = this.add.text(400, 250, "GAME OVER", {
            fontSize: "40px",
            color: "#ff0000",
        })
        gameOverText.setOrigin(0.5)

        // 아래쪽에 "다시하기" 버튼 텍스트
        const retryButton = this.add.text(400, 350, "다시하기", {
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#000000",
        })
        retryButton.setOrigin(0.5)
        retryButton.setPadding(10, 10)
        retryButton.setInteractive()

        this.anims.remove("right") // "right" 라는 키 애니메이션 제거
        this.anims.remove("left")
        this.anims.remove("turn")
        this.time.removeAllEvents()

        // 버튼 클릭 이벤트
        retryButton.on("pointerdown", () => {
            // 씬을 재시작하거나, 새로 시작
            remainnedTime = initialRemainnedTime
            remainnedEnemies = 0
            gameover = false
            this.time.removeAllEvents()
            this.scene.restart()
            // or this.scene.start('GameScene');
        })

        // 게임 진행 멈추기(물리, 애니메이션 등)
        this.physics.pause()
    }

    function updatePlayerHpBar(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        const hp = player.getData("hp")
        const maxHp = player.getData("maxHp")
        const hpBar = player.getData("hpBar") as Phaser.GameObjects.Graphics
        if (!hpBar) return

        // 위치나 스타일 초기화
        hpBar.clear()

        // 예시: 체력바 배경
        hpBar.fillStyle(0x000000)
        hpBar.fillRect(player.x - 16, player.y - 30, 32, 4) // width 32, height 4

        // 남은 체력 비율만큼 색 채우기
        const hpPercent = hp / maxHp
        hpBar.fillStyle(0xff0000)
        hpBar.fillRect(player.x - 16, player.y - 30, 32 * hpPercent, 4)
    }

    function updateEnemyHpBar(enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        const hp = enemy.getData("hp")
        const maxHp = enemy.getData("maxHp")
        const hpBar = enemy.getData("hpBar") as Phaser.GameObjects.Graphics
        if (!hpBar) return

        // 위치나 스타일 초기화
        hpBar.clear()

        // 예시: 체력바 배경
        hpBar.fillStyle(0x000000)
        hpBar.fillRect(enemy.x - 16, enemy.y - 30, 32, 4) // width 32, height 4

        // 남은 체력 비율만큼 색 채우기
        const hpPercent = hp / maxHp
        hpBar.fillStyle(0xff0000)
        hpBar.fillRect(enemy.x - 16, enemy.y - 30, 32 * hpPercent, 4)
    }

    /**
     * 가장 가까운 Enemy 찾기 (옵션 구현)
     */
    function getClosestEnemies(
        source: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
        group: Phaser.Physics.Arcade.Group,
        length: number
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

        return enemies.slice(0, length).map((e) => e.enemy)
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
            path[0].x,
            path[0].y,
            "enemy"
        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        enemy.setTint(0xff0000)

        // 각 적마다 HP와 pathIndex를 개별 관리
        enemy.setData("hp", 10)
        enemy.setData("pathIndex", 0)
        enemy.setData("maxHp", 10)
        const hpBar = this.add.graphics()
        enemy.setData("hpBar", hpBar)

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
        const pathIndex = enemy.getData("pathIndex") as number
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
        lastBulletAttackTime = currentTime

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

    function fireHomingWeapon2(
        this: Phaser.Scene,
        currentTime: number,
        enemy: Phaser.GameObjects.GameObject
    ) {
        lastWeapon2AttackTime = currentTime

        // 플레이어 위치에서 탄환 생성
        const weapon2 = weapon2s.create(
            player.x,
            player.y,
            "weapon2"
        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        if (!weapon2) return

        weapon2.setActive(true)
        weapon2.setVisible(true)

        weapon2.setData("target", enemy)
        weapon2.setTint(0x00ff00)
        // 처음에 한 번 적 방향으로 설정
        const angle = Phaser.Math.Angle.Between(weapon2.x, weapon2.y, enemy.x, enemy.y)
        weapon2.body.setVelocity(Math.cos(angle) * weapon2Speed, Math.sin(angle) * weapon2Speed)
    }

    // 데미지 텍스트를 살짝 띄우는 함수
    function showDamageText(this: Phaser.Scene, x: number, y: number, damageValue: number) {
        // “-10” 처럼 표시
        const dmgText = this.add.text(x, y, `-${damageValue}`, {
            fontSize: "14px",
            color: "#ff4444",
            fontStyle: "bold",
        })
        dmgText.setOrigin(0.5)

        // 트윈으로 서서히 떠오르며 사라지는 연출
        this.tweens.add({
            targets: dmgText,
            y: y - 20, // 위로 30px 이동
            alpha: 0, // 투명도 0이 됨
            duration: 800, // 0.8초 동안
            ease: "Sine.easeOut",
            onComplete: () => {
                dmgText.destroy()
            },
        })
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

        showDamageText.call(this, enemySprite.x, enemySprite.y - 30, bulletDamage)

        // 적 HP 감소
        const currentHP = enemySprite.getData("hp") as number
        enemySprite.setData("hp", currentHP - bulletDamage)

        // 깜빡이는 효과
        enemySprite.setTintFill(0xff0000)
        setTimeout(() => enemySprite.setTint(0xff0000), 100)

        // 탄환 제거
        bullet.destroy()

        // 적 HP가 0 이하라면 제거
        if (enemySprite.getData("hp") <= 0) {
            const hpBar = enemySprite.getData("hpBar") as Phaser.GameObjects.Graphics
            if (hpBar) hpBar.destroy()
            enemySprite.destroy()
            remainnedEnemies--
            remainnedEnemiesCount.setText(`${remainnedEnemies}/${enemyCountDeadline}`)
        }
    }

    function weapon2HitEnemy(
        weapon2Obj: Phaser.GameObjects.GameObject,
        enemyObj: Phaser.GameObjects.GameObject
    ) {
        const bullet = weapon2Obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        const enemySprite = enemyObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

        showDamageText.call(this, enemySprite.x, enemySprite.y - 30, weapon2Damage)

        // 적 HP 감소
        const currentHP = enemySprite.getData("hp") as number
        enemySprite.setData("hp", currentHP - weapon2Damage)

        // 깜빡이는 효과
        enemySprite.setTintFill(0xff0000)
        setTimeout(() => enemySprite.setTint(0xff0000), 100)

        // 탄환 제거
        bullet.destroy()

        // 적 HP가 0 이하라면 제거
        if (enemySprite.getData("hp") <= 0) {
            const hpBar = enemySprite.getData("hpBar") as Phaser.GameObjects.Graphics
            if (hpBar) hpBar.destroy()
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
