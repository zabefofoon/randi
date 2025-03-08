export abstract class Material {
    name:
        | "Material1"
        | "Material2"
        | "Material3"
        | "Material4"
        | "Material5"
        | "Material6"
        | "Material7"
        | "Material8"

    description: string
    physicalDamage: number // 물리 데미지
    magicalDamage: number // 마법 데미지
    range: number // 공격 범위
    stun: number // 공격 성공시 적의 스턴 시간
    splash: number // 스플래쉬 범위
    cooltime: number // 쿨타임
    armorPenetration: number // 물리관통력 적의 물리 방어력 무시
    magicPenetration: number // 마법관통력 적의 마법 방어력 무시

    constructor(material: ClassToRaw<Material>) {
        this.name = material.name
        this.physicalDamage = material.physicalDamage
        this.magicalDamage = material.magicalDamage
        this.range = material.range
        this.stun = material.stun
        this.splash = material.splash
        this.cooltime = material.cooltime
        this.armorPenetration = material.armorPenetration
        this.magicPenetration = material.magicPenetration
        this.description = material.description
    }
}

export class Material1 extends Material {
    constructor() {
        super({
            name: "Material1",
            physicalDamage: 1,
            magicalDamage: 0,
            range: 0,
            stun: 0,
            splash: 0,
            cooltime: 0,
            armorPenetration: 0,
            magicPenetration: 0,
            description: "물리공격력 + 1",
        })
    }
}

export class Material2 extends Material {
    constructor() {
        super({
            name: "Material2",
            physicalDamage: 0,
            magicalDamage: 1,
            range: 0,
            stun: 0,
            splash: 0,
            cooltime: 0,
            armorPenetration: 0,
            magicPenetration: 0,
            description: "마법공격력 + 1",
        })
    }
}

export class Material3 extends Material {
    constructor() {
        super({
            name: "Material3",
            physicalDamage: 0,
            magicalDamage: 0,
            range: 1,
            stun: 0,
            splash: 0,
            cooltime: 0,
            armorPenetration: 0,
            magicPenetration: 0,
            description: "범위 + 1",
        })
    }
}

export class Material4 extends Material {
    constructor() {
        super({
            name: "Material4",
            physicalDamage: 0,
            magicalDamage: 0,
            range: 0,
            stun: 0.1,
            splash: 0,
            cooltime: 0,
            armorPenetration: 0,
            magicPenetration: 0,
            description: "스턴 지속시간 + 0.1",
        })
    }
}

export class Material5 extends Material {
    constructor() {
        super({
            name: "Material5",
            physicalDamage: 0,
            magicalDamage: 0,
            range: 0,
            stun: 0,
            splash: 1,
            cooltime: 0,
            armorPenetration: 0,
            magicPenetration: 0,
            description: "스플래시 범위 + 1",
        })
    }
}

export class Material6 extends Material {
    constructor() {
        super({
            name: "Material6",
            physicalDamage: 0,
            magicalDamage: 0,
            range: 0,
            stun: 0,
            splash: 0,
            cooltime: 0.01,
            armorPenetration: 0,
            magicPenetration: 0,
            description: "쿨타임 1%",
        })
    }
}

export class Material7 extends Material {
    constructor() {
        super({
            name: "Material7",
            physicalDamage: 0,
            magicalDamage: 0,
            range: 0,
            stun: 0,
            splash: 0,
            cooltime: 0,
            armorPenetration: 1,
            magicPenetration: 0,
            description: "방어관통력 + 1",
        })
    }
}

export class Material8 extends Material {
    constructor() {
        super({
            name: "Material8",
            physicalDamage: 0,
            magicalDamage: 0,
            range: 0,
            stun: 0,
            splash: 0,
            cooltime: 0,
            armorPenetration: 0,
            magicPenetration: 1,
            description: "마법관통력 + 1",
        })
    }
}
