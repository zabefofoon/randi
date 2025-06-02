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
    name: "NylonMask",
    description: "NylonMaskDescription",
    specificity: "NylonMaskSpecificity",
    price: 0,
  }
  constructor() {
    super(NylonMask.meta)
  }
}

export class TrunkKing extends Character {
  static override readonly meta: CharacterOptions = {
    id: "trunkKing",
    name: "TrunkKing",
    description: "TrunkKingDescription",
    specificity: "TrunkKingSpecificity",
    price: 20000,
  }
  constructor() {
    super(TrunkKing.meta)
  }
}

export class ChimeraHayashiRice extends Character {
  static override readonly meta: CharacterOptions = {
    id: "chimeraHayashiRice",
    name: "ChimeraHayashiRice",
    description: "ChimeraHayashiRiceDescription",
    specificity: "ChimeraHayashiRiceSpecificity",
    price: 20000,
  }
  constructor() {
    super(ChimeraHayashiRice.meta)
  }
}

export class PurchaseCharacter {
  type = "purchase"
  constructor(public readonly character: typeof Character) {}

  static of(character: typeof Character) {
    return new PurchaseCharacter(character)
  }
}

export const RELEASED_CHARACTERS = [NylonMask, TrunkKing, ChimeraHayashiRice]
