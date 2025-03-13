import type { Enemies, Enemy } from "./Enemies"
import type { Material } from "./Material"
import type { Player } from "./Player"

export class Weapons {
    weapons: (Weapon | undefined)[] = [undefined, undefined, undefined, undefined]
    scene: Phaser.Scene
    enemies: Enemies

    constructor(scene: Phaser.Scene, enemies: Enemies) {
        this.scene = scene
        this.enemies = enemies
    }

    addWeapon(index: number, weapon: Weapon) {
        this.weapons[index] = weapon
        const w = this.weapons[index]
        if (!w) return

        w.group = this.scene.physics.add.group({ collideWorldBounds: false })

        this.scene.physics.add.overlap(
            w.group,
            this.enemies.group,
            (weaponObj, enemyObj) => this.weaponHitEnemy(weaponObj, enemyObj, weapon),
            undefined,
            this
        )
    }

    weaponHitEnemy(
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
        this.enemies.takeDamage(enemy, weaponData)
        this.enemies.applySplashDamage(weapon.x, weapon.y, weaponData.splash, weaponData.damage)

        // 탄환 제거
        weaponObj.destroy()
    }
}

export abstract class Weapon {
    group?: Phaser.Physics.Arcade.Group
    name = ""
    description = ""
    speed = 0
    lastAttackTime = 0

    nexts: { name: string; materials: { name: Material["name"]; length: number }[] }[] = []

    damage = 0
    range = 0
    stun = 0
    splash = 0
    cooltime = 0
    targetLength = 0
    slow = 0

    constructor(weapon: ClassToRaw<Weapon>) {
        Object.assign(this, weapon)
    }

    checkIsCooltime(time: number) {
        return time > this.lastAttackTime + this.cooltime
    }

    /**
     * 호밍 탄환 발사
     */
    fireHomingWeapon(currentTime: number, player: Player, enemy: Enemy) {
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
        this.group?.getChildren().forEach((obj) => {
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
        this.group?.getChildren().forEach((obj) => {
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
            description: "일반 탄환 무기. 빠른 연사와 적당한 데미지를 가집니다.",
            cooltime: 1000,
            speed: 500,
            range: 150,
            damage: 1,
            targetLength: 1,
            lastAttackTime: 0,
            splash: 0,
            stun: 0, // 1000이어야 1초
            slow: 0, // 0.1이면 10%
            group,
            nexts: [
                {
                    name: "Bullet2-1",
                    materials: [
                        {
                            name: "Material1",
                            length: 2,
                        },
                        {
                            name: "Material2",
                            length: 2,
                        },
                        {
                            name: "Material3",
                            length: 2,
                        },
                    ],
                },
                {
                    name: "Bullet2-2",
                    materials: [
                        {
                            name: "Material1",
                            length: 2,
                        },
                    ],
                },
                {
                    name: "Bullet2-3",
                    materials: [
                        {
                            name: "Material1",
                            length: 2,
                        },
                    ],
                },
            ],
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
            description: "근접 무기. 데미지는 크지만 사정거리가 짧습니다.",
            cooltime: 1000,
            speed: 500,
            range: 50,
            damage: 3,
            targetLength: 1,
            lastAttackTime: 0,
            splash: 0,
            stun: 0,
            slow: 0,
            group,
            nexts: [],
        })
    }

    static of(group?: Phaser.Physics.Arcade.Group) {
        return new Knife(group)
    }
}

export class Wand extends Weapon {
    constructor(group?: Phaser.Physics.Arcade.Group) {
        super({
            name: "Wand",
            description: "동시에 두마리 공격",
            cooltime: 2000,
            speed: 500,
            range: 300,
            damage: 1,
            targetLength: 2,
            lastAttackTime: 0,
            splash: 0,
            stun: 0,
            slow: 0,
            group,
            nexts: [],
        })
    }

    static of(group?: Phaser.Physics.Arcade.Group) {
        return new Wand(group)
    }
}

export class Ring extends Weapon {
    constructor(group?: Phaser.Physics.Arcade.Group) {
        super({
            name: "Ring",
            description: "동시에 두마리 공격",
            cooltime: 2000,
            speed: 500,
            range: 300,
            damage: 1,
            targetLength: 2,
            lastAttackTime: 0,
            splash: 0,
            stun: 0,
            slow: 0,
            group,
            nexts: [],
        })
    }

    static of(group?: Phaser.Physics.Arcade.Group) {
        return new Ring(group)
    }
}
