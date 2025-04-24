export interface CharacterOptions {
  name: string
  description: string
}

export abstract class Character {
  name = ""
  description = ""
  static meta: CharacterOptions
  constructor(options: CharacterOptions) {
    Object.assign(options)
  }
}

export class NylonMask extends Character {
  static override readonly meta: CharacterOptions = {
    name: "Nylon Mask",
    description: "복면을 쓴 의문의 사내<br />소문으로는 돈이 많다던데...",
  }
  constructor() {
    super(NylonMask.meta)
  }
}

export class TrunkKing extends Character {
  static override readonly meta: CharacterOptions = {
    name: "Trunk King",
    description: "빨간 목을 가진 백인 중년.<br />강력한 힘을 자랑한다.",
  }
  constructor() {
    super(NylonMask.meta)
  }
}
