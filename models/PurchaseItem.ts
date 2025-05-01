export type PurchasedItem = Record<string, number>

export interface PurchaseItemOptions {
  id: string
  name: string
  description: string
  price: number
  spriteIndex: number
}

export abstract class PurchaseItem {
  id = ""
  name = ""
  description = ""
  price = 0
  static type = "character"
  static meta: PurchaseItemOptions
  constructor(options: PurchaseItemOptions) {
    Object.assign(options)
  }
}

export class PayBack extends PurchaseItem {
  static override readonly meta: PurchaseItemOptions = {
    id: "payBack",
    name: "페이백",
    description: "한 게임동안, 돈 도박 실패시, 일정 금액을 돌려받는다.",
    price: 1000,
    spriteIndex: 0,
  }
  constructor() {
    super(PayBack.meta)
  }
}

export class Sharper extends PurchaseItem {
  static override readonly meta: PurchaseItemOptions = {
    id: "sharper",
    name: "타짜",
    description: "한 게임 동안, 강화 성공률을 2배 높인다.",
    price: 2000,
    spriteIndex: 1,
  }
  constructor() {
    super(PayBack.meta)
  }
}

export class Joker extends PurchaseItem {
  static override readonly meta: PurchaseItemOptions = {
    id: "joker",
    name: "조커",
    description: "랜덤 뽑기를 선택 뽑기로 1회 바꾼다.",
    price: 1000,
    spriteIndex: 2,
  }
  constructor() {
    super(PayBack.meta)
  }
}

export const PURCHASE_ITEMS = [PayBack, Joker, Sharper]
