<template>
    <div
        ref="phaserContainer"
        class="phaser-container"></div>
</template>

<script lang="ts" setup>
    import Phaser from "phaser"
    import { Enemies, type Enemy } from "~/models/Enemies"
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
    import { Bullet, Knife, Ring, Wand, type Weapon } from "~/models/Weapon"
    const phaserContainer = ref<HTMLDivElement>()

    // Phaser.Game 인스턴스
    let game: Phaser.Game

    // 전역 참조 (씬 내부에서 할당)
    let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    let enemies: Enemies
    // 기타 상수
    const enemyCountDeadline = 30

    let cursors: Phaser.Types.Input.Keyboard.CursorKeys

    const weapons: (Weapon | undefined)[] = [undefined, undefined, undefined, undefined]
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

                    enemies = new Enemies(this)

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
                            if (enemies.remainnedEnemies >= enemyCountDeadline) {
                                player.setData("hp", playerHP - 1)
                            }

                            if (playerHP < 1) {
                                this.physics.pause()
                                showGameOverUI.call(this)
                            }

                            if (46 > remainnedTime && remainnedTime > 35) enemies.spawnEnemy()
                        },
                    })

                    // 애니메이션
                    createPlayerAnimation.call(this)

                    // ===== 탄환(bullet) 그룹 생성 =====
                    addWeapon.call(this, 0, Bullet.of())

                    this.add
                        .text(780, 580, "재료 뽑기", {
                            fontSize: "18px",
                            color: "#fff",
                            backgroundColor: "#000",
                            padding: { x: 10, y: 5 },
                        })
                        .setOrigin(1, 1)
                        .setInteractive()
                        .on("pointerdown", () => {
                            // 재료 선택 UI(컨테이너)를 생성하여 표시
                            showMaterialSelectionUI.call(this)
                        })

                    this.add
                        .text(660, 580, "무기 뽑기", {
                            fontSize: "18px",
                            color: "#fff",
                            backgroundColor: "#000",
                            padding: { x: 10, y: 5 },
                        })
                        .setOrigin(1, 1)
                        .setInteractive()
                        .on("pointerdown", () => {
                            showWeaponsSelectionUI.call(this)
                            // 게임을 일시 정지 (물리 및 타이머 등)
                            // 또는 씬 전체를 일시 정지: this.scene.pause()
                        })
                },
                update(this: Phaser.Scene, time: number) {
                    if (gameover) return
                    if (paused) return
                    // 플레이어 이동
                    handlePlayerMovement()
                    updatePlayerHpBar(player)
                    // 적 이동
                    enemies.children.forEach((enemy) => {
                        enemy.moveEnemyAlongPath(player, weapons)
                        enemy.updateEnemyHpBar()
                    })

                    // 플레이어가 정지상태 && 쿨다운 → 발사
                    const isPlayerIdle =
                        player.body.velocity.x === 0 && player.body.velocity.y === 0

                    if (isPlayerIdle) {
                        weapons.forEach((weapon) => {
                            if (!weapon) return

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
                        if (!weapon) return

                        weapon.followEnemy()
                        // 화면 밖으로 나가면 제거
                        weapon.destroyWhenOutOfMap()
                    })
                },
            },
        })
    })

    function showWeaponsSelectionUI(this: Phaser.Scene) {
        this.physics.pause()

        paused = true

        let selectedIndex = 0
        paused = true
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0).setInteractive()
        const panel = this.add.container(400, 300)
        const bg = this.add.rectangle(0, 0, 700, 500, 0x000000, 0.8)
        panel.add(bg)

        const title = this.add
            .text(0, -200, "무기 뽑기", { fontSize: "24px", color: "#fff" })
            .setOrigin(0.5)
        panel.add(title)

        // 하단에 무기 설명을 표시할 텍스트 생성 (패널 내부, 아래쪽에 위치)
        const descriptionText = this.add
            .text(0, -40, "", { fontSize: "14px", color: "#fff" })
            .setOrigin(0.5)
        panel.add(descriptionText)

        const attributeText = this.add
            .text(0, 20, "", { fontSize: "14px", color: "#fff", lineSpacing: 1 })
            .setOrigin(0.5)
        panel.add(attributeText)

        const mixesContainer = this.add.container(0, 80)
        panel.add(mixesContainer)

        const selectText = this.add
            .text(0, 100, "", { fontSize: "14px", color: "#fff" })
            .setOrigin(0.5)
            .setInteractive()
        panel.add(selectText)

        // 무기 이미지를 배열에 저장할 변수
        const weaponImages: Phaser.GameObjects.Image[] = []
        const weaponsPerRow = 4
        const spacingX = 150
        const spacingY = 150
        const startX = -((weaponsPerRow - 1) * spacingX) / 2
        const startY = -125

        weapons.forEach((weapon, index) => {
            const row = Math.floor(index / weaponsPerRow)
            const col = index % weaponsPerRow
            const x = startX + col * spacingX
            const y = startY + row * spacingY
            const weaponImage = this.add
                .image(x, y, weapon?.name ?? "")
                .setScale(0.5)
                .setInteractive()
            panel.add(weaponImage)
            weaponImages.push(weaponImage)

            const weaponText = this.add
                .text(x, y + 40, `${weapon?.name ?? `????`}`, {
                    fontSize: "14px",
                    color: "#fff",
                })
                .setOrigin(0.5)
            panel.add(weaponText)

            // 무기 이미지 클릭 시 처리: 선택된 무기에 border를 추가하고 설명 업데이트
            weaponImage.on("pointerdown", () => {
                if (selectedIndex === index) return
                selectedIndex = index
                updateWeaponSelectionBorder.call(this, weapon, index)
            })
        })
        updateWeaponSelectionBorder.call(this, weapons[selectedIndex], selectedIndex)

        // 오버레이에 클릭 이벤트: 패널 외부 클릭 시 UI 제거 및 게임 재개
        overlay.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
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

        // 함수: 선택된 무기에 border 추가, 미선택 무기의 border 제거
        function updateWeaponSelectionBorder(
            this: Phaser.Scene,
            weapon: Weapon | undefined,
            index: number
        ) {
            // 무기 설명 업데이트: weaponDescriptions 객체에서 해당 무기의 이름을 키로 사용
            const description = weapon?.description || "설명이 없습니다."
            descriptionText.setText(description)

            if (weapon) {
                let attributes = ``
                if (weapon.damage) attributes += `데미지: ${weapon.damage}\n`
                if (weapon.range) attributes += `공격거리: ${weapon.range}\n`
                if (weapon.splash) attributes += `스플래쉬: ${weapon.splash}\n`
                if (weapon.cooltime) attributes += `쿨타임: ${weapon.cooltime / 1000}초\n`
                if (weapon.targetLength) attributes += `공격갯수: ${weapon.targetLength}개\n`
                if (weapon.stun) attributes += `스턴: ${weapon.stun}초\n`
                if (weapon.slow) attributes += `슬로우: ${weapon.slow}%\n`

                attributeText.setVisible(true).setText(attributes)
                const gap = 150
                weapon.nexts.forEach((next, index) => {
                    const mixesText = this.add
                        .text(
                            gap * index - ((weapon.nexts.length - 1) * gap) / 2,
                            0,
                            `${next.name} 조합`,
                            {
                                fontSize: "11px",
                                color: "#fff",
                                lineSpacing: 1,
                            }
                        )
                        .setOrigin(0.5)
                    mixesContainer.add(mixesText)

                    let materialsText = ``
                    next.materials.forEach((material) => {
                        materialsText += `${material.name} ${material.length}개 \n`
                    })
                    const mixesText2 = this.add
                        .text(
                            gap * index - ((weapon.nexts.length - 1) * gap) / 2,
                            10,
                            materialsText,
                            {
                                fontSize: "11px",
                                color: "#fff",
                                lineSpacing: 1,
                            }
                        )
                        .setOrigin(0.5, 0)
                    mixesContainer.add(mixesText2)
                })
                selectText.setVisible(false)
                selectText.removeAllListeners("pointerdown")
            } else {
                mixesContainer.list.forEach((item) => item.destroy())
                mixesContainer.list.forEach((item) => item.destroy())
                mixesContainer.list.forEach((item) => item.destroy())
                attributeText.setVisible(false)
                const needLength = index * 4
                selectText
                    .setVisible(true)
                    .setText(`뽑기(재료 ${needLength}개 필요)`)
                    .on("pointerdown", () => {
                        const totalLength = Object.values(materials)
                            .map(({ length }) => length)
                            .reduce((acc, current) => acc + current, 0)

                        if (totalLength >= needLength) {
                            if (index === 1) addWeapon.call(this, index, Knife.of())
                            if (index === 2) addWeapon.call(this, index, Wand.of())
                            if (index === 3) addWeapon.call(this, index, Ring.of())

                            let doneCount = 0
                            while (doneCount < needLength) {
                                const randomIndex = Phaser.Math.Between(0, 7)
                                const selectedMaterialKey = Object.keys(materials)[
                                    randomIndex
                                ] as Material["name"]

                                if (materials[selectedMaterialKey].length > 0) {
                                    materials[selectedMaterialKey].length =
                                        materials[selectedMaterialKey].length - 1
                                    doneCount++
                                }
                            }
                        }
                    })
            }

            weaponImages.forEach((img, i) => {
                if (i === selectedIndex) {
                    if (!img.getData("border")) {
                        const border = this.add.graphics()
                        border.lineStyle(1, 0xffff00, 1) // 노란색 border, 4px 두께
                        border.strokeRect(
                            img.x - (img.displayWidth + 10) / 2,
                            img.y - (img.displayHeight + 10) / 2,
                            img.displayWidth + 10,
                            img.displayHeight + 10
                        )
                        img.setData("border", border)
                        panel.add(border)
                    }
                } else {
                    const existingBorder = img.getData("border") as Phaser.GameObjects.Graphics
                    if (existingBorder) {
                        existingBorder.destroy()
                        img.setData("border", null)
                    }
                }
            })
        }
    }

    function showMaterialSelectionUI(this: Phaser.Scene) {
        this.physics.pause()
        paused = true
        // 전체 화면을 덮는 투명 오버레이 생성 (클릭 이벤트를 잡기 위함)
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0).setInteractive()

        // 재료 선택 패널 컨테이너 생성 (화면 중앙에 배치)
        const panel = this.add.container(400, 300)

        // 패널 배경 (반투명 검정 사각형)
        const bg = this.add.rectangle(0, 0, 700, 500, 0x000000, 0.8)
        panel.add(bg)

        // 타이틀 텍스트
        const title = this.add
            .text(0, -200, "재료 선택", { fontSize: "24px", color: "#fff" })
            .setOrigin(0.5)
        panel.add(title)

        // 2행 4열 그리드에 재료 이미지 배치 (패널 내부)
        const materialsPerRow = 4
        const spacingX = 150
        const spacingY = 150
        // 컨테이너 로컬 좌표 기준: 중앙에서 왼쪽으로, 위로 오프셋
        const startX = -((materialsPerRow - 1) * spacingX) / 2
        const startY = -125 // 패널 중앙에서 약간 위쪽에 배치

        Object.entries(materials).forEach(([name, value], index) => {
            const row = Math.floor(index / materialsPerRow)
            const col = index % materialsPerRow
            const x = startX + col * spacingX
            const y = startY + row * spacingY
            const materialImage = this.add.image(x, y, name).setScale(0.5)
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
        const gachaButton = this.add.text(-50, 175, "재료 뽑기", {
            fontSize: "24px",
            color: "#fff",
        })
        gachaButton.setOrigin(0.5)
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
        })
        panel.add(gachaButton)

        const closeButton = this.add.text(50, 175, "닫기", { fontSize: "24px", color: "#fff" })
        closeButton.setOrigin(0.5)
        closeButton.setInteractive()
        closeButton.on("pointerdown", () => {
            panel.destroy()
            overlay.destroy()
            this.physics.resume()
            paused = false
        })
        panel.add(closeButton)

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
            enemies.remainnedEnemies = 0
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

    /**
     * 가장 가까운 Enemy 찾기 (옵션 구현)
     */
    function getClosestEnemies(
        source: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
        enemies: Enemies,
        length: number
    ): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] {
        const enemiesData: {
            enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            dist: number
        }[] = []

        enemies.children.forEach((obj) => {
            const enemy = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            if (!enemy.active) return

            const dist = Phaser.Math.Distance.Between(source.x, source.y, enemy.x, enemy.y)

            enemiesData.push({ enemy, dist })
        })
        enemiesData.sort((a, b) => a.dist - b.dist)

        return enemiesData.slice(0, length).map((e) => e.enemy)
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

    function addWeapon(this: Phaser.Scene, index: number, weapon: Weapon) {
        weapons[index] = weapon
        const w = weapons[index]
        if (!w) return

        w.group = this.physics.add.group({ collideWorldBounds: false })

        this.physics.add.overlap(
            w.group,
            enemies.group,
            (weaponObj, enemyObj) => weaponHitEnemy(weaponObj, enemyObj, weapon),
            undefined,
            this
        )

        /**
         * 탄환과 적 겹쳤을 때
         */
        function weaponHitEnemy(
            weaponObj:
                | Phaser.Physics.Arcade.Body
                | Phaser.Physics.Arcade.StaticBody
                | Phaser.Types.Physics.Arcade.GameObjectWithBody
                | Phaser.Tilemaps.Tile,
            enemyObj:
                | Phaser.Physics.Arcade.Body
                | Phaser.Physics.Arcade.StaticBody
                | Phaser.Types.Physics.Arcade.GameObjectWithBody
                | Phaser.Tilemaps.Tile,
            weaponData: Weapon
        ) {
            const weapon = weaponObj as Phaser.Physics.Arcade.Sprite
            const enemy = enemyObj as Enemy
            enemies.takeDamage(enemy, weaponData)
            enemies.applySplashDamage(weapon.x, weapon.y, weaponData.splash, weaponData.damage)

            // 탄환 제거
            weaponObj.destroy()
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
