<template>
    <div
        ref="phaserContainer"
        class="phaser-container"></div>
</template>

<script lang="ts" setup>
    import Phaser from "phaser"
    import { Enemies } from "~/models/Enemies"
    import {
        Material1,
        Material2,
        Material3,
        Material4,
        Material5,
        Material6,
        Material7,
        Material8,
        type Materials,
    } from "~/models/Material"
    import { Player } from "~/models/Player"
    import { UIManager } from "~/models/UIManager"
    import { Bullet, Weapons } from "~/models/Weapon"
    const phaserContainer = ref<HTMLDivElement>()

    // Phaser.Game 인스턴스
    let game: Phaser.Game

    // 전역 참조 (씬 내부에서 할당)
    let player: Player

    let enemies: Enemies
    // 기타 상수

    let cursors: Phaser.Types.Input.Keyboard.CursorKeys
    let weapons: Weapons
    const materials: Materials = {
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
    const roundTime = 45
    const enemyCountDeadline = 30

    let remainnedTimeText: Phaser.GameObjects.Text
    let roundText: Phaser.GameObjects.Text

    let uiManager: UIManager
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
                    this.data.set("round", 0)
                    this.data.set("gachaChance", 3)
                    this.data.set("remainnedTime", initialRemainnedTime)
                    uiManager = new UIManager(this)
                    cursors = this.input.keyboard!.createCursorKeys()
                    this.add.image(400, 300, "sky")
                    remainnedTimeText = this.add.text(
                        400,
                        0,
                        `00:${String(this.data.get("remainnedTime")).padStart(2, "0")}`,
                        {
                            color: "#fff",
                            fontSize: 16,
                        }
                    )

                    roundText = this.add.text(0, 0, `round ${this.data.get("round")}`, {
                        color: "#fff",
                        fontSize: 16,
                    })

                    // 플레이어
                    player = new Player(this, 400, 300, "dude")
                    player.createPlayerAnimation()
                    enemies = new Enemies(this)
                    weapons = new Weapons(this, enemies)
                    // 애니메이션

                    // ===== 탄환(bullet) 그룹 생성 =====
                    weapons.addWeapon(0, Bullet.of())

                    this.add
                        .text(780, 580, "재료 뽑기", {
                            fontSize: "18px",
                            color: "#fff",
                            backgroundColor: "#000",
                            padding: { x: 10, y: 5 },
                        })
                        .setOrigin(1, 1)
                        .setInteractive()
                        .on("pointerdown", () => uiManager.showMaterialSelectionUI(materials))

                    this.add
                        .text(660, 580, "무기 뽑기", {
                            fontSize: "18px",
                            color: "#fff",
                            backgroundColor: "#000",
                            padding: { x: 10, y: 5 },
                        })
                        .setOrigin(1, 1)
                        .setInteractive()
                        .on("pointerdown", () =>
                            uiManager.showWeaponsSelectionUI(materials, weapons)
                        )

                    this.time.addEvent({
                        delay: 1000,
                        repeat: -1,
                        callback: () => {
                            if (this.data.get("paused")) return

                            this.data.set("remainnedTime", this.data.get("remainnedTime") - 1)
                            if (this.data.get("remainnedTime") < 1) {
                                this.data.set("remainnedTime", roundTime)
                                this.data.set("round", this.data.get("round") + 1)
                                if (this.data.get("round") !== 1) {
                                    this.data.set("gachaChance", this.data.get("gachaChance") + 3)
                                }
                                roundText.setText(`round ${this.data.get("round")}`)
                            }

                            remainnedTimeText.setText(
                                `00:${String(this.data.get("remainnedTime")).padStart(2, "0")}`
                            )

                            const playerHP = player.getData("hp") as number
                            if (enemies.remainnedEnemies >= enemyCountDeadline) {
                                player.setData("hp", playerHP - 1)
                            }

                            if (playerHP < 1) {
                                this.physics.pause()
                                this.data.set("gameover", true)
                                uiManager.showGameOverUI(enemies, initialRemainnedTime)
                            }

                            if (
                                46 > this.data.get("remainnedTime") &&
                                this.data.get("remainnedTime") > 35
                            )
                                enemies.spawnEnemy()
                        },
                    })
                },
                update(this: Phaser.Scene, time: number) {
                    if (this.data.get("gameover")) return
                    if (this.data.get("paused")) return

                    // 플레이어 이동
                    player.handlePlayerMovement(cursors)
                    player.updatePlayerHpBar()

                    // 적 이동
                    enemies.children.forEach((enemy) => {
                        enemy.moveEnemyAlongPath(player, weapons.weapons)
                        enemy.updateEnemyHpBar()
                    })

                    // 플레이어가 정지상태 && 쿨다운 → 발사
                    if (player.isIdle) {
                        weapons.weapons.forEach((weapon) => {
                            if (weapon?.checkIsCooltime(time))
                                player
                                    .getClosestEnemies(enemies, weapon.targetLength)
                                    .forEach((enemy) => {
                                        const distance = Phaser.Math.Distance.Between(
                                            player.x,
                                            player.y,
                                            enemy.x,
                                            enemy.y
                                        )

                                        if (distance <= weapon.range)
                                            weapon.fireHomingWeapon(time, player, enemy)
                                    })
                        })
                    }

                    weapons.weapons.forEach((weapon) => {
                        if (!weapon) return
                        weapon.followEnemy()
                        weapon.destroyWhenOutOfMap()
                    })
                },
            },
        })
    })

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
