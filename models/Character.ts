export interface CharacterOptions {
  id: string
  name: string
  description: string
  specificity: string
  price: number
}

export abstract class Character {
  id = ""
  name = ""
  description = ""
  specificity = ""
  price = 0
  static type = "character"
  static meta: CharacterOptions
  constructor(options: CharacterOptions) {
    Object.assign(options)
  }

  static checkCharacter(item?: typeof Character | PurchaseCharacter): item is typeof Character {
    return item?.type === "character"
  }
}

export class NylonMask extends Character {
  static override readonly meta: CharacterOptions = {
    id: "nylonMask",
    name: "Nylon Mask",
    description: "복면을 쓴 의문의 사내. 소문으로는 돈이 많다던데...",
    specificity: "* 보상 보너스 30% 추가 획득",
    price: 0,
  }
  constructor() {
    super(NylonMask.meta)
  }
}

export class TrunkKing extends Character {
  static override readonly meta: CharacterOptions = {
    id: "trunkKing",
    name: "Trunk King",
    description: "빨간 목을 가진 백인 중년. 강력한 힘을 자랑한다.",
    specificity: "* 매 라운드마다, 물리 공격력 1%씩 증가",
    price: 2000,
  }
  constructor() {
    super(TrunkKing.meta)
  }
}

export class PurchaseCharacter {
  type = "purchase"
  constructor(public readonly character: typeof Character) {}

  static of(character: typeof Character) {
    return new PurchaseCharacter(character)
  }
}

export const RELEASED_CHARACTERS = [NylonMask, TrunkKing]
