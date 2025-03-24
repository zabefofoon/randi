import type { Enemies, Enemy } from "./Enemies"

export class Player extends Phaser.Physics.Arcade.Sprite {
    maxLife = 5

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        // 기존 코드 삭제: scene.physics.add.sprite(400, 300, "dude")...
        // 대신 자기 자신에 대해 설정:
        this.setCollideWorldBounds(true)
            .setData("maxHp", this.maxLife)
            .setData("hp", this.maxLife)
            .setData("hpBar", scene.add.graphics())
    }

    get isIdle() {
        return this.body?.velocity.x === 0 && this.body.velocity.y === 0
    }

    updatePlayerHpBar() {
        const hp = this.getData("hp")
        const maxHp = this.getData("maxHp")
        const hpBar = this.getData("hpBar") as Phaser.GameObjects.Graphics
        if (!hpBar) return

        // 위치나 스타일 초기화
        hpBar.clear()

        // 예시: 체력바 배경
        hpBar.fillStyle(0x000000)
        hpBar.fillRect(this.x - 16, this.y - 30, 32, 4) // width 32, height 4

        // 남은 체력 비율만큼 색 채우기
        const hpPercent = hp / maxHp
        hpBar.fillStyle(0xff0000)
        hpBar.fillRect(this.x - 16, this.y - 30, 32 * hpPercent, 4)
    }

    handlePlayerMovement(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const speed = 160
        let moving = false

        if (cursors.left.isDown) {
            this.setVelocityX(-speed)
            this.anims.play("left", true)
            moving = true
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed)
            this.anims.play("right", true)
            moving = true
        } else {
            this.setVelocityX(0)
        }

        if (cursors.up.isDown) {
            this.setVelocityY(-speed)
            moving = true
        } else if (cursors.down.isDown) {
            this.setVelocityY(speed)
            moving = true
        } else if (!cursors.up.isDown && !cursors.down.isDown) {
            this.setVelocityY(0)
        }

        if (!moving) {
            this.anims.play("turn")
        }
    }

    /**
     * 가장 가까운 Enemy 찾기 (옵션 구현)
     */
    getClosestEnemies(enemies: Enemies, length: number) {
        const enemiesData: {
            enemy: Enemy
            dist: number
        }[] = []

        enemies.children.forEach((enemy) => {
            if (!enemy.active) return

            const dist = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y)

            enemiesData.push({ enemy, dist })
        })
        enemiesData.sort((a, b) => a.dist - b.dist)

        return enemiesData.slice(0, length).map((e) => e.enemy)
    }

    createPlayerAnimation() {
        // 애니메이션
        this.scene.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.scene.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        })
        this.scene.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        })

        return this
    }
}
