<template>
  <div
    v-if="weapon"
    class="mt-[0.5cqw] | text-[1.3cqw] | text-outline">
    <!-- 물리데미지 -->
    <div v-if="weapon.physicalDamage">
      {{ i18n.t("PhysicalDamage", { number: stringUtil.attachComma(weapon.physicalDamage) }) }}
      <span
        v-if="weapon.enforcedPhysicalDamage"
        class="text-amber-500">
        (+ {{ weapon.enforcedPhysicalDamage }})
      </span>
    </div>
    <!-- 물리데미지 -->

    <!-- 방관 -->
    <div v-if="weapon.physicalPenetration">
      {{
        i18n.t("PhysicalPenetration", {
          number: stringUtil.attachComma(weapon.physicalPenetration),
        })
      }}
      <span
        v-if="weapon.enforcedPhysicalPenetration"
        class="text-amber-500">
        (+ {{ weapon.enforcedPhysicalPenetration }})
      </span>
    </div>
    <!-- 방관 -->

    <!-- 물증 -->
    <div v-if="weapon.physicalAllPercent">
      {{
        i18n.t("PhysicalAllPercent", { number: stringUtil.attachComma(weapon.physicalAllPercent) })
      }}
      <span
        v-if="weapon.enforcedPhysicalAllPercent"
        class="text-amber-500">
        (+ {{ weapon.enforcedPhysicalAllPercent }}%)
      </span>
    </div>
    <!-- 물증 -->

    <!-- 물저 -->
    <div v-if="weapon.physicalDecrease">
      {{ i18n.t("PhysicalDecrease", { number: stringUtil.attachComma(weapon.physicalDecrease) }) }}
      <span
        v-if="weapon.enforcedPhysicalDecrease"
        class="text-amber-500">
        (+ {{ weapon.enforcedPhysicalDecrease }}%)
      </span>
    </div>
    <!-- 물저 -->

    <div
      v-if="
        weapon.magicalDamage ||
        weapon.magicalPenetration ||
        weapon.magicalAllPercent ||
        weapon.magicalDecrease
      "
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <!-- 마법데미지 -->
    <div v-if="weapon.magicalDamage">
      {{ i18n.t("MagicalDamage", { number: stringUtil.attachComma(weapon.magicalDamage) }) }}
      <span
        v-if="weapon.enforcedMagicalDamage"
        class="text-amber-500">
        (+ {{ weapon.enforcedMagicalDamage }})
      </span>
    </div>
    <!-- 마법데미지 -->

    <!-- 마관 -->
    <div v-if="weapon.magicalPenetration">
      {{
        i18n.t("MagicalPenetration", { number: stringUtil.attachComma(weapon.magicalPenetration) })
      }}
      <span
        v-if="weapon.enforcedMagicalPenetration"
        class="text-amber-500">
        (+ {{ weapon.enforcedMagicalPenetration }})
      </span>
    </div>
    <!-- 마관 -->

    <!-- 마증 -->
    <div v-if="weapon.magicalAllPercent">
      {{ i18n.t("MagicalAllPercent", { number: weapon.magicalAllPercent }) }}
      <span
        v-if="weapon.enforcedMagicalAllPercent"
        class="text-amber-500">
        (+ {{ weapon.enforcedMagicalAllPercent }}%)
      </span>
    </div>
    <!-- 마증 -->

    <!-- 마저 -->
    <div v-if="weapon.magicalDecrease">
      {{ i18n.t("MagicalDecrease", { number: weapon.magicalDecrease }) }}
      <span
        v-if="weapon.enforcedMagicalDecrease"
        class="text-amber-500">
        (+ {{ weapon.enforcedMagicalDecrease }}%)
      </span>
    </div>
    <!-- 마저 -->

    <div
      v-if="weapon.targetLength > 1 || weapon.splash"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <!-- 공격갯수 -->
    <div v-if="weapon.targetLength + weapon.enforcedTargetLength > 1">
      {{ i18n.t("TargetLength", { number: weapon.targetLength }) }}
      <span
        v-if="weapon.enforcedTargetLength"
        class="text-amber-500">
        (+ {{ weapon.enforcedTargetLength }})
      </span>
    </div>
    <!-- 공격갯수 -->

    <!-- 스플래쉬 -->
    <div v-if="weapon.splash">
      {{ i18n.t("Splash", { number: stringUtil.attachComma(weapon.splash) }) }}
      <span
        v-if="weapon.enforcedSplash"
        class="text-amber-500">
        (+ {{ weapon.enforcedSplash }})
      </span>
    </div>
    <!-- 스플래쉬 -->

    <div
      v-if="weapon.cooltime !== 1000 || weapon.allCooltime"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <div v-if="weapon.cooltime && weapon.cooltime !== 1000">
      {{ i18n.t("Cooldown", { number: weapon.cooltime / 1000 }) }}
    </div>

    <!-- 공속증가 -->
    <div v-if="weapon.allCooltime">
      {{ i18n.t("AllCooldown", { number: Math.round(weapon.allCooltime * 100) }) }}
      <span
        v-if="weapon.enforcedAllCooltime"
        class="text-amber-500">
        (+ {{ weapon.enforcedAllCooltime }}%)
      </span>
    </div>
    <!-- 공속증가 -->

    <div
      v-if="weapon.stun || weapon.stunMany"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <!-- 단일 스턴 -->
    <div v-if="weapon.stun">
      {{ i18n.t("Stun", { number: weapon.stun / 1000 }) }}
      <span
        v-if="weapon.enforcedStun"
        class="text-amber-500">
        (+ {{ weapon.enforcedStun }})
      </span>
    </div>
    <!-- 단일 스턴 -->

    <!-- 광역 스턴 -->
    <div v-if="weapon.stunMany">
      {{ i18n.t("StunMany", { number: weapon.stunMany / 1000 }) }}
      <span
        v-if="weapon.enforcedStunMany"
        class="text-amber-500">
        (+ {{ weapon.enforcedStunMany }})
      </span>
    </div>
    <!-- 광역 스턴 -->

    <div
      v-if="weapon.slowOne || weapon.slow"
      class="my-[0.2cqw] | border border-dotted border-gray-950"></div>

    <!-- 단일슬로우 -->
    <div v-if="weapon.slowOne">
      {{ i18n.t("SlowOne", { number: weapon.slowOne }) }}
      <span
        v-if="weapon.enforcedSlowOne"
        class="text-amber-500">
        (+ {{ weapon.enforcedSlowOne }}%)
      </span>
    </div>
    <!-- 단일슬로우 -->

    <!-- 전역슬로우 -->
    <div v-if="weapon.slow">
      {{ i18n.t("Slow", { number: weapon.slow }) }}
      <span
        v-if="weapon.enforcedSlow"
        class="text-amber-500">
        (+ {{ weapon.enforcedSlow }}%)
      </span>
    </div>
    <!-- 전역슬로우 -->

    <!-- 크리티컬 -->
    <template v-if="weapon.criticalChance">
      <div class="my-[0.2cqw] | border border-dotted border-gray-950"></div>
      {{
        i18n.t("Critical", {
          number1: weapon.criticalChance * 100,
          number2: weapon.criticalDamage,
        })
      }}
      <span
        v-if="weapon.enforcedCriticalChance"
        class="text-amber-500">
        (+ {{ weapon.enforcedCriticalChance }}%)
      </span>
    </template>
    <!-- 크리티컬 -->

    <!-- 도트 -->
    <template v-if="weapon.dotted">
      <div class="my-[0.2cqw] | border border-dotted border-gray-950"></div>
      {{ i18n.t("Dot", { number: weapon.dotted }) }}
      <span
        v-if="weapon.enforcedDotted"
        class="text-amber-500">
        (+ {{ weapon.enforcedDotted }})
      </span>
    </template>
    <!-- 도트 -->

    <!-- 아머브레이크 -->
    <template v-if="weapon.armerBreak">
      <div class="my-[0.2cqw] | border border-dotted border-gray-950"></div>
      {{ i18n.t("Armerbreak", { number: weapon.armerBreak }) }}
      <span
        v-if="weapon.enforcedArmerBreak"
        class="text-amber-500">
        (+ {{ weapon.enforcedArmerBreak }})
      </span>
    </template>
    <!-- 아머브레이크 -->
  </div>
</template>

<script setup lang="ts">
import type { WeaponOptions } from "~/models/Weapon"

defineProps<{
  weapon: WeaponOptions
}>()

const i18n = useI18n()
</script>
