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
    name: "Payback",
    description: "PaybackDesc",
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
    name: "Sharper",
    description: "SharperDesc",
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
    name: "Joker",
    description: "JokerDesc",
    price: 1000,
    spriteIndex: 2,
  }
  constructor() {
    super(PayBack.meta)
  }
}

export const PURCHASE_ITEMS = [PayBack, Joker, Sharper]
