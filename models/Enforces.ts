export interface EnforceItem {
  name: "physical" | "magical" | "cooldown"
  description: string
  length: number
  max?: number
}
export class Enforces {
  items: EnforceItem[]

  additionalPhysicalPlus = 0
  additionalPhysicalPercent = 0
  additionalMasicalPlus = 0
  additionalMasicalPercent = 0
  additionalCooldown = 0

  constructor() {
    this.items = [
      { name: "physical", description: "EnforcePhysical", length: 0, max: 50 },
      { name: "magical", description: "EnforceMagical", length: 0, max: 50 },
      { name: "cooldown", description: "EnforceCooldown", length: 0, max: 30 },
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
    if (found.name === "physical") {
      if (found.length >= 10) this.additionalPhysicalPercent++
      else this.additionalPhysicalPlus++
    } else if (found.name === "magical") {
      if (found.length >= 10) this.additionalMasicalPercent++
      else this.additionalMasicalPlus++
    } else if (found.name === "cooldown") {
      this.additionalCooldown++
    }

    if (found.length >= 10) {
      if (name === "physical") found.description = "EnforcePhysicalPercent"
      if (name === "magical") found.description = "EnforceMagicalPercent"
    }
  }

  getExpense(enforce: EnforceItem) {
    return enforce.length * 10 + 10
  }
}
