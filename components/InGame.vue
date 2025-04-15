<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <ModalGameOver
      v-if="isShowGameOverPopup"
      @close="isShowGameOverPopup = false" />
    <ModalGamble
      v-if="isShowGamblePopup"
      v-model:selected-index="selectedGambleIndex"
      v-model:coins="coins"
      :weapons="weapons"
      :materials="materials"
      :enforces="enforces"
      @close="isShowGamblePopup = false" />
    <ModalWeapons
      v-if="isShowWeaponsPopup"
      v-model:selected-index="selectedWeaponIndex"
      :weapons="weapons"
      :materials="materials"
      @close="isShowWeaponsPopup = false" />
    <ModalMaterials
      v-if="isShowMaterialsPopup"
      v-model:gacha-chance="gachaChance"
      v-model:select-chance="selectChance"
      :materials="materials"
      @close="isShowMaterialsPopup = false" />
    <div class="content | relative | aspect-video max-w-full max-h-full | bg-white">
      <main class="relative | w-full h-full | flex flex-col justify-center items-center">
        <div
          class="w-full | flex flex-col gap-[0.5cqh] | px-[0.5cqw] | absolute top-[0.5cqw] | text-white font-bold">
          <div class="flex items-center gap-[1cqw] | bg-black w-fit | px-[0.5cqw] rounded-lg">
            <span class="text-[1.5cqw]">ROUND {{ round }}</span>
            <span class="text-[1.2cqw]">00:{{ `${remainnedTime}`.padStart(2, "0") }}</span>
          </div>
          <div class="text-[1.5cqw] bg-black w-fit | px-[0.5cqw] rounded-lg">
            <span
              :class="{
                'text-red-500': remainnedEnemies > enemyCountDeadline,
              }"
              >{{ remainnedEnemies }}</span
            >
            / {{ enemyCountDeadline }}
          </div>
        </div>

        <div class="absolute top-[0.5cqw] right-[0.5cqw]">
          <!-- 스텟표시 -->
          <div class="grid grid-cols-2 items-start | gap-[0.2cqh]">
            <div
              v-for="(material, index) in materials"
              :key="material.info.name"
              class="flex items-center | bg-black rounded-lg | pr-[0.5cqw]">
              <div
                class="stat-sprites | w-[2.5cqw] aspect-square"
                :style="{
                  backgroundPosition: etcUtil.getSpritePosition(
                    Object.keys(materials).findIndex((item) => item === index)
                  ),
                }"></div>
              <span class="text-[1.5cqw] text-white">
                {{ material.length }}
              </span>
            </div>
          </div>
          <!-- 스텟표시 -->

          <!-- 강화표시 -->
          <div class="mt-[0.2cqh] | flex flex-col gap-[0.2cqh]">
            <div
              v-for="(enforce, index) in enforces?.items"
              :key="enforce.name"
              class="bg-black | flex items-center justify-between | pr-[0.5cqw]">
              <div
                class="stat-sprites coin | w-[2.5cqw] aspect-square"
                :style="{
                  backgroundPosition: etcUtil.getSpritePosition(12 + index),
                }"></div>
              <span class="text-[1.3cqw] text-white">
                {{ stringUtil.attachComma(enforce.length) }}
              </span>
            </div>
          </div>
          <!-- 강화표시 -->

          <!-- 코인표시 -->
          <div
            class="bg-black mt-[0.2cqh] | flex items-center justify-between | pr-[0.5cqw] rounded-lg">
            <div
              class="stat-sprites coin | w-[2.5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(11),
              }"></div>
            <span class="text-[1.3cqw] text-white"> {{ stringUtil.attachComma(coins) }} </span>
          </div>
          <!-- 코인표시 -->
        </div>

        <div
          ref="phaserContainer"
          class="w-full h-full mx-auto"></div>

        <VirtualJoystick
          v-if="isTouchDevice"
          v-model="activeJoystick"
          class="absolute bottom-[3cqw] left-[3cqw]" />

        <div class="flex items-center gap-[1cqw] | absolute bottom-[2cqw] right-[2cqw]">
          <!-- 무기버튼 -->
          <button
            class="flex items-center gap-[0.5cqw] bg-orange-700 | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.14cqw]"
            @click="isShowGamblePopup = true">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(10),
              }"></div>
            <span class="block text-white | text-[1.8cqw] font-bold text-outline leading-none">
              도박
            </span>
          </button>
          <!-- 무기버튼 -->

          <!-- 무기버튼 -->
          <button
            class="flex items-center gap-[0.5cqw] bg-blue-950 | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.14cqw]"
            @click="isShowWeaponsPopup = true">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(8),
              }"></div>
            <span class="block text-white | text-[1.8cqw] font-bold text-outline leading-none">
              무기
            </span>
          </button>
          <!-- 무기버튼 -->

          <!-- 스텟버튼 -->
          <button
            class="flex items-center gap-[0.5cqw] | relative | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.14cqw]"
            :class="{
              'bg-amber-500': selectChance > 0,
              'bg-blue-950': selectChance <= 0,
            }"
            @click="isShowMaterialsPopup = true">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(9),
              }"></div>
            <span class="block | text-white text-[1.8cqw] font-bold text-outline leading-none">
              스텟
            </span>
            <div
              v-if="gachaChance + selectChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="text-white | grid place-items-center | w-[2.2cqw] aspect-square | rounded-full | bg-red-500 | text-outline text-[1.2cqw] font-bold | border-black border-[0.14cqw]">
                {{ selectChance ? selectChance : gachaChance }}
              </span>
            </div>
          </button>
          <!-- 스텟버튼 -->
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Enemies } from "~/models/Enemies"
import { Enforces } from "~/models/Enforces"
import {
  Material1,
  Material2,
  Material3,
  Material4,
  Material5,
  Material6,
  Material7,
  Material8,
  type Materials,
} from "~/models/Material"
import { Player } from "~/models/Player"
import { Gun, Weapons } from "~/models/Weapon"

const emit = defineEmits<{
  (e: "next", scene: "result"): void
}>()

const phaserContainer = ref<HTMLDivElement>()

// Phaser.Game 인스턴스
let game: Phaser.Game

// 전역 참조 (씬 내부에서 할당)
let player: Player

let enemies: Enemies
// 기타 상수

let cursors: Phaser.Types.Input.Keyboard.CursorKeys
const enforces = ref<Enforces>()
const weapons = ref<Weapons>()
const materials = ref<Materials>({
  힘: { length: 0, info: new Material1() },
  지식: { length: 0, info: new Material2() },
  교양: { length: 0, info: new Material3() },
  카리스마: { length: 0, info: new Material4() },
  건강: { length: 0, info: new Material5() },
  민첩: { length: 0, info: new Material6() },
  운: { length: 0, info: new Material7() },
  지혜: { length: 0, info: new Material8() },
})

const initialRemainnedTime = 3
const roundTime = 45
const enemyCountDeadline = 29

const round = ref(0)
const remainnedTime = ref(initialRemainnedTime)
const remainnedEnemies = ref(0)
const activeJoystick = ref<number>()

const isShowMaterialsPopup = ref(false)
const isShowWeaponsPopup = ref(false)
const isShowGameOverPopup = ref(false)
const isShowGamblePopup = ref(false)

const gachaChance = ref(2)
const selectChance = ref(1)
const coins = ref(20)

const selectedWeaponIndex = ref(0)
const selectedGambleIndex = ref(0)
let scene: Phaser.Scene
let isBossRemained = false

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

onMounted(() => {
  if (!phaserContainer.value) return

  game = new Phaser.Game({
    pixelArt: true,
    antialias: false,
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: phaserContainer.value,
    scale: {
      mode: Phaser.Scale.FIT, // 내부 캔버스를 "비율 유지"하면서 컨테이너에 맞춤
      autoCenter: Phaser.Scale.CENTER_BOTH, // 화면 중앙 정렬
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scene: {
      preload(this: Phaser.Scene) {
        const scene = this
        scene.load.image("tiles", "/assets/images/mainlevbuild2.png")
        scene.load.tilemapTiledJSON("map", "/assets/jsons/map.json")

        scene.load.image("sky", "/assets/images/sky.png")
        scene.load.spritesheet("playerIdle", "/assets/images/player_idle.png", {
          frameWidth: 128,
          frameHeight: 128,
        })
        scene.load.spritesheet("playerWork", "/assets/images/player_work.png", {
          frameWidth: 128,
          frameHeight: 128,
        })
        scene.load.spritesheet("enemy", "/assets/images/zombie_work.png", {
          frameWidth: 96,
          frameHeight: 96,
        })
        scene.load.image("star", "/assets/images/star.png")
        scene.load.image("Gun", "/assets/images/star.png")
      },
      create(this: Phaser.Scene) {
        scene = this

        const map = scene.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage("mainlevbuild2", "tiles")
        const tileset2 = map.addTilesetImage("mainlevbuild2", "tiles")
        const tileset3 = map.addTilesetImage("mainlevbuild2", "tiles")
        if (tileset) map.createLayer("layer1", tileset, 0, 0)
        if (tileset2) map.createLayer("layer2", tileset2, 0, 0)
        if (tileset3) map.createLayer("layer3", tileset3, 0, 0)

        cursors = scene.input.keyboard!.createCursorKeys()

        // 플레이어
        player = new Player(scene, 400, 300, "playerIdle")
        player.createPlayerAnimation()
        enemies = new Enemies(scene, remainnedEnemies)
        enforces.value = new Enforces()
        weapons.value = new Weapons(scene, enemies, materials.value, enforces.value)

        // 애니메이션
        scene.anims.create({
          key: "enemy-walk",
          frames: scene.anims.generateFrameNumbers("enemy", { start: 0, end: 7 }), // 프레임 범위는 이미지에 맞게
          frameRate: 7, // 초당 몇 프레임
          repeat: -1, // 반복
        })

        const walls = scene.physics.add.staticGroup()
        walls.create(160, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 90).refreshBody()
        walls.create(160, 310, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 90).refreshBody()
        walls.create(160, 390, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(270, 10).refreshBody()
        walls.create(525, 390, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(290, 10).refreshBody()
        walls.create(805, 300, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 100).refreshBody()
        walls.create(805, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 120).refreshBody()
        walls.create(160, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(275, 10).refreshBody()
        walls.create(530, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(285, 10).refreshBody()

        walls.create(33, 30, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(895, 10).refreshBody()
        walls.create(33, 30, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 480).refreshBody()
        walls.create(918, 30, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 480).refreshBody()
        walls.create(33, 499, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(895, 10).refreshBody()

        scene.physics.add.collider(player, walls)

        // ===== 탄환(Gun) 그룹 생성 =====
        weapons.value.addWeapon(0, Gun.of())
        scene.events.on("boss-die", () => {
          isBossRemained = false
          selectChance.value += 1
          gachaChance.value += 2
          coins.value += round.value * 10
        })
        scene.time.addEvent({
          delay: 1000,
          repeat: -1,
          callback: () => {
            if (scene.data.get("paused")) return

            remainnedTime.value--
            if (remainnedTime.value < 0) {
              round.value++
              remainnedTime.value = roundTime

              if (round.value !== 1) gachaChance.value = gachaChance.value + 3
              if (isBossRemained) {
                scene.physics.pause()
                isShowGameOverPopup.value = true
              }
            }

            const playerHP = player.getData("hp") as number
            if (remainnedEnemies.value > enemyCountDeadline) player.setData("hp", playerHP - 1)

            if (playerHP < 1) {
              scene.physics.pause()
              isShowGameOverPopup.value = true
            }

            if (46 > remainnedTime.value && remainnedTime.value > 35)
              enemies.spawnEnemy(round.value, coins)
            if (round.value >= 10 && round.value % 10 === 0 && remainnedTime.value === 45)
              setTimeout(() => {
                enemies.spawnBoss(round.value, coins)
                isBossRemained = true
              }, 500)
          },
        })
      },
      update(this: Phaser.Scene, time: number) {
        const scene = this
        if (scene.data.get("paused")) return

        // 플레이어 이동
        player.handlePlayerMovement(cursors)
        player.updatePlayerHpBar()

        // 적 이동
        enemies.children.forEach((enemy) => {
          enemy.moveEnemyAlongPath(player, weapons.value!.weapons, materials.value)
          enemy.updateEnemyHpBar()
        })

        // 플레이어가 정지상태 && 쿨다운 → 발사
        if (player.isIdle) {
          const allCooltimes = weapons.value!.weapons.reduce(
            (acc, current) => acc + (current?.allCooltime ?? 0),
            0
          )
          weapons.value!.weapons.forEach((weapon) => {
            if (
              weapon?.checkIsCooltime(
                time,
                Math.min(
                  99,
                  (materials.value["민첩"].info.cooltime * materials.value["민첩"].length +
                    allCooltimes +
                    enforces.value!.aditionnalCooldown / 100) *
                    100
                )
              )
            )
              player.getClosestEnemies(enemies, weapon.targetLength).forEach((enemy) => {
                const distance = Phaser.Math.Distance.Between(
                  player.x,
                  player.y + 20,
                  enemy.x,
                  enemy.y
                )

                if (distance <= weapon.range) weapon.fireHomingWeapon(time, player, enemy)
              })
          })
        }

        weapons.value!.weapons.forEach((weapon) => {
          if (!weapon) return
          weapon.followEnemy()
          weapon.destroyWhenOutOfMap()
        })
      },
    },
  })
})

onBeforeUnmount(() => {
  if (game) game.destroy(true)
})

watch(activeJoystick, (value) => {
  cursors.up.isDown = false
  cursors.left.isDown = false
  cursors.down.isDown = false
  cursors.right.isDown = false

  switch (value) {
    case 1:
      cursors.up.isDown = true
      break
    case 2:
      cursors.up.isDown = true
      cursors.left.isDown = true
      break
    case 3:
      cursors.left.isDown = true
      break
    case 4:
      cursors.left.isDown = true
      cursors.down.isDown = true
      break
    case 5:
      cursors.down.isDown = true
      break
    case 6:
      cursors.down.isDown = true
      cursors.right.isDown = true
      break
    case 7:
      cursors.right.isDown = true
      break
    case 8:
      cursors.right.isDown = true
      cursors.up.isDown = true
      break
  }
})

watch(isShowMaterialsPopup, (value) => {
  if (value) {
    scene.data.set("paused", true)
    scene.physics.pause()
  } else {
    scene.data.set("paused", false)
    scene.physics.resume()
  }
})
watch(isShowWeaponsPopup, (value) => {
  if (value) {
    scene.data.set("paused", true)
    scene.physics.pause()
  } else {
    scene.data.set("paused", false)
    scene.physics.resume()
  }
})
watch(isShowGamblePopup, (value) => {
  if (value) {
    scene.data.set("paused", true)
    scene.physics.pause()
  } else {
    scene.data.set("paused", false)
    scene.physics.resume()
  }
})
watch(isShowGameOverPopup, (value) => {
  if (value) {
    scene.data.set("paused", true)
    scene.physics.pause()
  } else {
    emit("next", "result")
  }
})
</script>

<style lang="scss" scoped>
.content {
  @media (aspect-ratio >= 16 / 9) {
    width: auto;
    height: 100%;
  }

  @media (aspect-ratio <= 16 / 9) {
    width: 100%;
    height: auto;
  }
}
</style>
