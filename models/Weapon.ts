export abstract class Weapon {
    group?: Phaser.Physics.Arcade.Group
    name = ""
    cooldown = 0
    speed = 0
    range = 0
    damage = 0
    targetLength = 0
    lastAttackTime = 0

    constructor(weapon: ClassToRaw<Weapon>) {
        Object.assign(this, weapon)
    }

    checkIsCooltime(time: number) {
        return time > this.lastAttackTime + this.cooldown
    }

    /**
     * 호밍 탄환 발사
     */
    fireHomingWeapon(
        currentTime: number,
        player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
        enemy: Phaser.GameObjects.GameObject
    ) {
        this.lastAttackTime = currentTime

        // 플레이어 위치에서 탄환 생성
        const weapon = this.group?.create(
            player.x,
            player.y,
            this.name
        ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        if (!weapon) return

        weapon.setActive(true)
        weapon.setVisible(true)

        weapon.setData("target", enemy)

        // 처음에 한 번 적 방향으로 설정
        const angle = Phaser.Math.Angle.Between(weapon.x, weapon.y, enemy.x, enemy.y)
        weapon.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)
    }

    followEnemy() {
        this.group?.children.each((obj) => {
            const weaponObj = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            if (!weaponObj.active) return

            // bullet에 저장해둔 target(Enemy)을 따라가도록
            const target = weaponObj.getData(
                "target"
            ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            if (!target || !target.active) return

            const angle = Phaser.Math.Angle.Between(weaponObj.x, weaponObj.y, target.x, target.y)
            weaponObj.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed)

            // 화면 밖으로 나가면 제거
            this.destroyWhenOutOfMap()
        })
    }

    destroyWhenOutOfMap() {
        this.group?.children.each((obj) => {
            const weaponObj = obj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
            if (!weaponObj.active) return

            // 화면 밖으로 나가면 제거
            if (weaponObj.x < 0 || weaponObj.x > 800 || weaponObj.y < 0 || weaponObj.y > 600) {
                weaponObj.destroy()
            }
        })
    }
}

export class Bullet extends Weapon {
    constructor(group?: Phaser.Physics.Arcade.Group) {
        super({
            name: "Bullet",
            cooldown: 1000,
            speed: 500,
            range: 150,
            damage: 1,
            targetLength: 1,
            lastAttackTime: 0,
            group,
        })
    }

    static of(group?: Phaser.Physics.Arcade.Group) {
        return new Bullet(group)
    }
}

export class Knife extends Weapon {
    constructor(group?: Phaser.Physics.Arcade.Group) {
        super({
            name: "Knife",
            cooldown: 1000,
            speed: 500,
            range: 50,
            damage: 5,
            targetLength: 1,
            lastAttackTime: 0,
            group,
        })
    }

    static of(group?: Phaser.Physics.Arcade.Group) {
        return new Knife(group)
    }
}
