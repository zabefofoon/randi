<template>
    <div
        ref="phaserContainer"
        class="phaser-container"></div>
</template>

<script lang="ts" setup>
    import Phaser from "phaser"
    import {
        Material1,
        Material2,
        Material3,
        Material4,
        Material5,
        Material6,
        Material7,
        Material8,
        type Material,
    } from "~/models/Material"
    import { Bullet, type Weapon } from "~/models/Weapon"

    const phaserContainer = ref<HTMLDivElement>()

    // Phaser.Game 인스턴스
    let game: Phaser.Game

    // 전역 참조 (씬 내부에서 할당)
    let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    let enemies: Phaser.Physics.Arcade.Group
    // 기타 상수
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

    const weapons: Weapon[] = [Bullet.of()]
    const materials: Record<
        Material["name"],
        { length: number; textObj?: Phaser.GameObjects.Text; info: Material }
    > = {
        Material1: { length: 0, textObj: undefined, info: new Material1() },
        Material2: { length: 0, textObj: undefined, info: new Material2() },
        Material3: { length: 0, textObj: undefined, info: new Material3() },
        Material4: { length: 0, textObj: undefined, info: new Material4() },
        Material5: { length: 0, textObj: undefined, info: new Material5() },
        Material6: { length: 0, textObj: undefined, info: new Material6() },
        Material7: { length: 0, textObj: undefined, info: new Material7() },
        Material8: { length: 0, textObj: undefined, info: new Material8() },
    }

    const initialRemainnedTime = 3
    let remainnedTime = initialRemainnedTime
    const roundTime = 45
    let remainnedTimeText: Phaser.GameObjects.Text

    let round = 0
    let roundText: Phaser.GameObjects.Text

    const maxLife = 5
    let gameover = false
    let paused = false

    let gachaChance = 3

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
                    this.load.image("star", "/assets/images/star.png")
                    this.load.image("Bullet", "/assets/images/star.png")
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
                            if (paused) return

                            remainnedTime--

                            if (remainnedTime < 1) {
                                remainnedTime = roundTime
                                round++

                                if (round !== 1) gachaChance += 3
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

                            if (46 > remainnedTime && remainnedTime > 35) spawnEnemy.call(this)
                        },
                    })

                    // 애니메이션
                    createPlayerAnimation.call(this)

                    // ===== 탄환(bullet) 그룹 생성 =====
                    weapons.forEach((weapon) => {
                        weapon.group = this.physics.add.group({ collideWorldBounds: false })
                        this.physics.add.overlap(
                            weapon.group,
                            enemies,
                            (weaponObj, enemyObj) =>
                                weaponHitEnemy.call(this, weaponObj, enemyObj, weapon),
                            undefined,
                            this
                        )
                    })

                    remainnedEnemiesCount = this.add.text(750, 0, `${0}/${enemyCountDeadline}`, {
                        color: "#fff",
                        fontSize: 16,
                        align: "end",
                    })

                    const weaponSelectButton = this.add.text(780, 580, "재료 선택", {
                        fontSize: "18px",
                        color: "#fff",
                        backgroundColor: "#000",
                        padding: { x: 10, y: 5 },
                    })
                    weaponSelectButton.setOrigin(1, 1)
                    weaponSelectButton.setInteractive()

                    weaponSelectButton.on("pointerdown", () => {
                        // 게임을 일시 정지 (물리 및 타이머 등)
                        this.physics.pause()
                        // 또는 씬 전체를 일시 정지: this.scene.pause()

                        // 재료 선택 UI(컨테이너)를 생성하여 표시
                        showMaterialSelectionUI.call(this)
                    })
                },
                update(this: Phaser.Scene, time: number) {
                    if (gameover) return
                    if (paused) return
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
                        weapons.forEach((weapon) => {
                            if (weapon.checkIsCooltime(time)) {
                                const closestEnemies = getClosestEnemies(
                                    player,
                                    enemies,
                                    weapon.targetLength
                                )

                                if (closestEnemies.length) {
                                    closestEnemies.forEach((enemy) => {
                                        const distance = Phaser.Math.Distance.Between(
                                            player.x,
                                            player.y,
                                            enemy.x,
                                            enemy.y
                                        )

                                        if (distance <= weapon.range)
                                            weapon.fireHomingWeapon(time, player, enemy)
                                    })
                                }
                            }
                        })
                    }

                    weapons.forEach((weapon) => {
                        weapon.followEnemy()
                        // 화면 밖으로 나가면 제거
                        weapon.destroyWhenOutOfMap()
                    })
                },
            },
        })
    })

    function showMaterialSelectionUI(this: Phaser.Scene) {
        paused = true
        // 전체 화면을 덮는 투명 오버레이 생성 (클릭 이벤트를 잡기 위함)
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0).setInteractive()

        // 재료 선택 패널 컨테이너 생성 (화면 중앙에 배치)
        const panel = this.add.container(400, 300)

        // 패널 배경 (반투명 검정 사각형)
        const bg = this.add.rectangle(0, 0, 700, 500, 0x000000, 0.8)
        panel.add(bg)

        // 타이틀 텍스트
        const title = this.add.text(-130, -200, "재료 선택", { fontSize: "24px", color: "#fff" })
        panel.add(title)

        // 2행 4열 그리드에 재료 이미지 배치 (패널 내부)
        const materialsPerRow = 4
        const spacingX = 150
        const spacingY = 150
        // 컨테이너 로컬 좌표 기준: 중앙에서 왼쪽으로, 위로 오프셋
        const startX = -((materialsPerRow - 1) * spacingX) / 2
        const startY = -50 // 패널 중앙에서 약간 위쪽에 배치

        Object.entries(materials).forEach(([name, value], index) => {
            const row = Math.floor(index / materialsPerRow)
            const col = index % materialsPerRow
            const x = startX + col * spacingX
            const y = startY + row * spacingY
            const materialImage = this.add.image(x, y, name).setScale(0.5).setInteractive()
            panel.add(materialImage)

            const materialText = this.add.text(x, y + 40, `${name}`, {
                fontSize: "14px",
                color: "#fff",
            })
            materialText.setOrigin(0.5)
            panel.add(materialText)

            const descriptionText = this.add.text(x, y + 60, `${value.info.description}`, {
                fontSize: "12px",
                color: "#fff",
            })
            descriptionText.setOrigin(0.5)
            panel.add(descriptionText)

            const lengthText = this.add.text(x, y + 80, `${value.length}개`, {
                fontSize: "14px",
                color: "#fff",
            })

            lengthText.setOrigin(0.5)
            panel.add(lengthText)
            value.textObj = lengthText
        })

        // 재료 뽑기 버튼 (기존 로직)
        const gachaButton = this.add.text(0, -150, "재료 뽑기", { fontSize: "24px", color: "#fff" })
        gachaButton.setInteractive()
        gachaButton.on("pointerdown", () => {
            gachaChance--
            if (gachaChance < 0) {
                gachaChance = 0
                return
            }
            // 재료 뽑기 로직(랜덤 재료 증가)
            const randomIndex = Phaser.Math.Between(0, 7)
            const selectedMaterialKey = Object.keys(materials)[randomIndex] as Material["name"]
            materials[selectedMaterialKey].length++
            materials[selectedMaterialKey].textObj?.setText(
                `${materials[selectedMaterialKey].length}개`
            )
            console.log("랜덤 뽑기: ", randomIndex)
        })
        panel.add(gachaButton)

        // 오버레이에 클릭 이벤트: 패널 외부를 클릭하면 UI 제거 후 게임 재개
        overlay.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // 패널의 경계 계산 (패널은 중앙(400,300)이고, 크기가 700x500)
            const panelLeft = 400 - 350
            const panelRight = 400 + 350
            const panelTop = 300 - 250
            const panelBottom = 300 + 250
            if (
                pointer.x < panelLeft ||
                pointer.x > panelRight ||
                pointer.y < panelTop ||
                pointer.y > panelBottom
            ) {
                panel.destroy()
                overlay.destroy()
                this.physics.resume()
                paused = false
            }
        })
    }

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
        if (enemy.getData("stunned")) return

        const pathIndex = enemy.getData("pathIndex") as number
        if (pathIndex == null) return

        // 기본 이동 속도
        const baseSpeed = 160
        // 플레이어와 적 사이의 거리를 측정
        const distanceToPlayer = Phaser.Math.Distance.Between(enemy.x, enemy.y, player.x, player.y)
        // 플레이어가 가까우면 느리게 이동: 예시로, 200픽셀 이내면 속도를 50%로 줄임
        const slowRange = 200
        const speed =
            distanceToPlayer < slowRange
                ? baseSpeed * (1 - weapons.reduce((acc, current) => acc + current.slow, 0))
                : baseSpeed

        const target = path[pathIndex]
        const dist = Phaser.Math.Distance.Between(
            enemy.x,
            enemy.y,
            path[pathIndex].x,
            path[pathIndex].y
        )
        if (dist < 5) {
            enemy.x = target.x
            enemy.y = target.y
            let nextIndex = pathIndex + 1
            if (nextIndex >= path.length) nextIndex = 0
            enemy.setData("pathIndex", nextIndex)
        }
        if (enemy.active) this.physics.moveTo(enemy, target.x, target.y, speed)
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
    function weaponHitEnemy(
        weaponObj: Phaser.GameObjects.GameObject,
        enemyObj: Phaser.GameObjects.GameObject,
        weaponData: Weapon
    ) {
        const weapon = weaponObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        const enemySprite = enemyObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

        showDamageText.call(this, enemySprite.x, enemySprite.y - 30, weaponData.damage)

        // 적 HP 감소
        const currentHP = enemySprite.getData("hp") as number
        enemySprite.setData("hp", currentHP - weaponData.damage)

        // 깜빡이는 효과
        enemySprite.setTintFill(0xff0000)
        setTimeout(() => enemySprite.setTint(0xff0000), 100)

        applySplashDamage(
            this,
            weapon.x,
            weapon.y,
            weaponData.splashRange,
            weaponData.damage,
            enemies
        )

        if (!enemySprite.getData("stunned")) {
            enemySprite.setData("stunned", true)
            // 즉시 적 이동을 멈춤
            enemySprite.body.setVelocity(0, 0)
            // 300ms 후에 정지 상태 해제
            this.time.delayedCall(weaponData.stun, () => {
                enemySprite.setData("stunned", false)
            })
        }

        // 탄환 제거
        weapon.destroy()

        // 적 HP가 0 이하라면 제거
        if (enemySprite.getData("hp") <= 0) {
            const hpBar = enemySprite.getData("hpBar") as Phaser.GameObjects.Graphics
            if (hpBar) hpBar.destroy()
            enemySprite.destroy()
            remainnedEnemies--
            remainnedEnemiesCount.setText(`${remainnedEnemies}/${enemyCountDeadline}`)
        }
    }

    function applySplashDamage(
        scene: Phaser.Scene,
        centerX: number,
        centerY: number,
        splashRadius: number,
        damage: number,
        enemyGroup: Phaser.Physics.Arcade.Group
    ) {
        // enemyGroup 내 모든 적 순회
        enemyGroup.children.each((obj) => {
            const enemy = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            if (!enemy.active) return

            const dist = Phaser.Math.Distance.Between(centerX, centerY, enemy.x, enemy.y)
            if (dist <= splashRadius) {
                // 만약 거리 비례 데미지를 적용하고 싶다면:
                const effectiveDamage = +(damage * (1 - dist / splashRadius)).toFixed(2)
                // enemy.takeDamage(effectiveDamage);

                // 단순히 데미지 적용:
                const currentHP = enemy.getData("hp") as number
                enemy.setData("hp", currentHP - effectiveDamage)

                // 피격 이펙트 및 데미지 텍스트 표시 (예: showDamageText 함수 사용)
                showDamageText.call(scene, enemy.x, enemy.y - 30, effectiveDamage)

                // 깜빡임 효과
                enemy.setTintFill(0xff0000)
                setTimeout(() => enemy.clearTint(), 100)

                // HP가 0 이하이면 제거
                if (enemy.getData("hp") <= 0) {
                    const hpBar = enemy.getData("hpBar") as Phaser.GameObjects.Graphics
                    if (hpBar) hpBar.destroy()
                    enemy.destroy()
                }
            }
        })
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
