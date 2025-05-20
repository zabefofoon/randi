<template>
  <div
    v-if="weapon"
    class="mt-[0.5cqw] | text-[1.3cqw] | text-outline">
    <div v-if="weapon.physicalDamage">
      {{ i18n.t("PhysicalDamage", { number: stringUtil.attachComma(weapon.physicalDamage) }) }}
    </div>
    <div v-if="weapon.physicalPenetration">
      {{
        i18n.t("PhysicalPenetration", {
          number: stringUtil.attachComma(weapon.physicalPenetration),
        })
      }}
    </div>
    <div v-if="weapon.physicalAllPercent">
      {{
        i18n.t("PhysicalAllPercent", { number: stringUtil.attachComma(weapon.physicalAllPercent) })
      }}
    </div>
    <div v-if="weapon.physicalDecrease">
      {{ i18n.t("PhysicalDecrease", { number: stringUtil.attachComma(weapon.physicalDecrease) }) }}
    </div>
    <div
      v-if="
        weapon.magicalDamage ||
        weapon.magicalPenetration ||
        weapon.magicalAllPercent ||
        weapon.magicalDecrease
      "
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <div v-if="weapon.magicalDamage">
      {{ i18n.t("MagicalDamage", { number: stringUtil.attachComma(weapon.magicalDamage) }) }}
    </div>
    <div v-if="weapon.magicalPenetration">
      {{
        i18n.t("MagicalPenetration", { number: stringUtil.attachComma(weapon.magicalPenetration) })
      }}
    </div>
    <div v-if="weapon.magicalAllPercent">
      {{ i18n.t("MagicalAllPercent", { number: weapon.magicalAllPercent }) }}
    </div>
    <div v-if="weapon.magicalDecrease">
      {{ i18n.t("MagicalDecrease", { number: weapon.magicalDecrease }) }}
    </div>

    <div
      v-if="weapon.targetLength > 1 || weapon.splash"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <div v-if="weapon.targetLength > 1">
      {{ i18n.t("TargetLength", { number: weapon.targetLength }) }}
    </div>
    <div v-if="weapon.splash">
      {{ i18n.t("Splash", { number: stringUtil.attachComma(weapon.splash) }) }}
    </div>

    <div
      v-if="weapon.cooltime !== 1000 || weapon.allCooltime"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <div v-if="weapon.cooltime && weapon.cooltime !== 1000">
      {{ i18n.t("Cooldown", { number: weapon.cooltime / 1000 }) }}
    </div>
    <div v-if="weapon.allCooltime">
      {{ i18n.t("AllCooldown", { number: Math.round(weapon.allCooltime * 100) }) }}
    </div>
    <div
      v-if="weapon.stun || weapon.stunMany"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <div v-if="weapon.stun">
      {{ i18n.t("Stun", { number: weapon.stun / 1000 }) }}
    </div>
    <div v-if="weapon.stunMany">
      {{ i18n.t("StunMany", { number: weapon.stunMany / 1000 }) }}
    </div>

    <div
      v-if="weapon.slowOne || weapon.slow"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <div v-if="weapon.slowOne">
      {{ i18n.t("SlowOne", { number: weapon.slowOne }) }}
    </div>
    <div v-if="weapon.slow">
      {{ i18n.t("Slow", { number: weapon.slow }) }}
    </div>

    <template v-if="weapon.criticalChance">
      <div class="my-[0.2cqw] | border border-dotted border-gray-950"></div>
      {{
        i18n.t("Critical", {
          number1: weapon.criticalChance * 100,
          number2: weapon.criticalDamage,
        })
      }}
    </template>

    <template v-if="weapon.dotted">
      <div class="my-[0.2cqw] | border border-dotted border-gray-950"></div>
      {{ i18n.t("Dot", { number: weapon.dotted }) }}
    </template>

    <template v-if="weapon.armerBreak">
      <div class="my-[0.2cqw] | border border-dotted border-gray-950"></div>
      {{ i18n.t("Armerbreak", { number: weapon.armerBreak }) }}
    </template>
  </div>
</template>

<script setup lang="ts">
import type { WeaponOptions } from "~/models/Weapon"

defineProps<{
  weapon: WeaponOptions
}>()

const i18n = useI18n()
</script>
