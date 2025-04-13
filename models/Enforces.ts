export interface EnforceItem {
  name: "physical" | "magical" | "cooldown"
  description: string
  length: number
  max?: number
}
export class Enforces {
  items: EnforceItem[]

  constructor() {
    this.items = [
      { name: "physical", description: "물리공격력 +1", length: 0, max: 50 },
      { name: "magical", description: "마법공격력 +1", length: 0, max: 50 },
      { name: "cooldown", description: "쿨타임 1%", length: 0, max: 30 },
    ]
  }
  checkGachable(name: EnforceItem["name"]) {
    const found = this.items.find((item) => item.name === name)
    if (!found) return false

    if (found.max === undefined) return true
    else return found.length < found.max
  }

  increase(name: EnforceItem["name"]) {
    const found = this.items.find((item) => item.name === name)
    if (!found) return
    if (!this.checkGachable(name)) return

    found.length += 1
    if (found.length >= 10)
      if (name === "physical") found.description = "물리공격력 +1%"
      else if (name === "magical") found.description = "마법공격력 +1%"
  }

  getExpense(enforce: EnforceItem) {
    return enforce.length * 10 + 10
  }

  getAditionnalPlus(type: "physical" | "magical") {
    const length = this.items.find(({ name }) => name === type)?.length ?? 0

    return length >= 10 ? 10 : length
  }

  getAditionnalPercent(type: "physical" | "magical") {
    const length = this.items.find(({ name }) => name === type)?.length ?? 0
    return length < 10 ? 0 : length
  }

  get aditionnalCooldown() {
    return this.items.find(({ name }) => name === "cooldown")?.length ?? 0
  }
}
