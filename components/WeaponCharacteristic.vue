<template>
  <div
    v-if="weapon"
    class="mt-[0.5cqw] | grid grid-cols-3 gap-[0.5cqw] text-[1.2cqw]">
    <div v-if="weapon.physicalDamage">
      · 물리데미지: {{ stringUtil.attachComma(weapon.physicalDamage) }}
    </div>
    <div v-if="weapon.physicalPenetration">
      · 물리관통력: {{ stringUtil.attachComma(weapon.physicalPenetration) }}
    </div>
    <div v-if="weapon.physicalAllPercent">· 물리공격력 증가: {{ weapon.physicalAllPercent }}%</div>

    <div
      v-if="weapon.magicalDamage || weapon.magicalPenetration"
      class="col-span-3 | border border-dotted border-gray-950"></div>

    <div v-if="weapon.magicalDamage">
      · 마법데미지: {{ stringUtil.attachComma(weapon.magicalDamage) }}
    </div>
    <div v-if="weapon.magicalPenetration">
      · 마법관통력: {{ stringUtil.attachComma(weapon.magicalPenetration) }}
    </div>
    <div v-if="weapon.magicalAllPercent">· 마법공격력 증가: {{ weapon.magicalAllPercent }}%</div>

    <div
      v-if="weapon.range || weapon.targetLength > 1 || weapon.splash"
      class="col-span-3 | border border-dotted border-gray-950"></div>

    <div v-if="weapon.range">· 공격거리: {{ stringUtil.attachComma(weapon.range) }}</div>
    <div v-if="weapon.targetLength > 1">· 동시 {{ weapon.targetLength }}명 공격</div>
    <div v-if="weapon.splash">· 스플래쉬: {{ stringUtil.attachComma(weapon.splash) }}</div>

    <div
      v-if="weapon.cooltime || weapon.allCooltime"
      class="col-span-3 | border border-dotted border-gray-950"></div>

    <div v-if="weapon.cooltime">· 쿨타임: {{ weapon.cooltime / 1000 }}초</div>
    <div v-if="weapon.allCooltime">· 전체 쿨타임: {{ weapon.allCooltime }}%</div>

    <div
      v-if="weapon.stun || weapon.stunMany"
      class="col-span-3 | border border-dotted border-gray-950"></div>

    <div v-if="weapon.stun">· 스턴: {{ weapon.stun / 1000 }}초</div>
    <div v-if="weapon.stunMany">· 스플레시 스턴: {{ weapon.stunMany / 1000 }}초</div>

    <div
      v-if="weapon.slowOne || weapon.slow"
      class="col-span-3 | border border-dotted border-gray-950"></div>

    <div v-if="weapon.slowOne">· 단일 슬로우 : {{ weapon.slowOne * 100 }}%</div>
    <div v-if="weapon.slow">· 영역 슬로우 : {{ weapon.slow * 100 }}%</div>

    <template v-if="weapon.criticalChance">
      <div class="col-span-3 | border border-dotted border-gray-950"></div>
      <div class="col-span-3">
        · 크리티컬: {{ weapon.criticalChance * 100 }}% 확률의 {{ weapon.criticalDamage }}배 데미지
      </div>
    </template>

    <template v-if="weapon.dotted">
      <div class="col-span-3 | border border-dotted border-gray-950"></div>
      <div class="col-span-3">· 도트: {{ weapon.dotted }}번의 도트 데미지</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { WeaponOptions } from "~/models/Weapon"

defineProps<{
  weapon: WeaponOptions
}>()
</script>
