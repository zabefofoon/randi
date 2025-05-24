<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <Transition name="fade">
      <Tutorial
        v-if="isShowTutorial"
        :progress="progress"
        @close="startGame" />
    </Transition>

    <ModalGamble
      v-if="enforces && weapons && isShowGamblePopup"
      v-model:selected-index="selectedGambleIndex"
      v-model:coins="coins"
      v-model:gamblings="gamblings"
      :weapons="weapons"
      :materials="materials"
      :enforces="enforces"
      @close="showGamblePopup(false)" />
    <ModalWeapons
      v-if="weapons && isShowWeaponsPopup"
      v-model:selected-index="selectedWeaponIndex"
      v-model:is-all-weapon-effect="isAllWeaponEffect"
      :weapons="weapons"
      :materials="materials"
      @close="showWeaponsPopup(false)" />
    <ModalMaterials
      v-if="isShowMaterialsPopup"
      v-model:gacha-chance="gachaChance"
      v-model:select-chance="selectChance"
      :materials="materials"
      @close="showMaterialsPopup(false)" />
    <ModalTextEffect
      v-if="isShowTextEffect"
      :text="isShowTextEffect" />
    <ModalGameOver
      v-if="isShowGameOverPopup"
      @close="isShowGameOverPopup = false" />
    <ModalGameClear
      v-if="isShowGameClearPopup"
      @close="isShowGameClearPopup = false" />
    <ModalConfigs
      v-if="isShowConfigPopup"
      @close="showConfigPopup(false)">
      <div class="w-full | border-t border-gray-900 border-[1px] | my-[1cqw]"></div>
      <div class="w-full | flex flex-col gap-[0.5cqw]">
        <button
          class="grid place-items-center | relative bg-orange-700 | px-[2cqw] py-[0.5cqw] | border-black border-[0.21cqw] rounded-lg | leading-none"
          @click="exit()">
          <span
            v-t="'Quit'"
            class="text-outline text-[1.7cqw] font-bold"></span>
        </button>
        <button
          class="grid place-items-center | relative bg-blue-900 | px-[2cqw] py-[0.5cqw] | border-black border-[0.21cqw] rounded-lg | leading-none"
          @click="showConfigPopup(false)">
          <span
            v-t="'Resume'"
            class="text-outline text-[1.7cqw] font-bold"></span>
        </button>
      </div>
    </ModalConfigs>

    <div class="content | relative | aspect-video max-w-full max-h-full | bg-white">
      <main class="relative | w-full h-full | flex flex-col justify-center items-center">
        <div
          class="w-full | flex items-center gap-[0.5cqh] | px-[0.5cqw] | absolute top-[0.5cqw] | text-white font-bold">
          <div class="flex items-center gap-[1cqw] | bg-black w-fit | px-[0.5cqw] rounded-lg">
            <span class="text-[1.5cqw]">Lv. {{ round }}</span>
          </div>
          <div class="text-[1.2cqw] bg-black w-fit | px-[0.5cqw] rounded-lg">
            <span
              :class="{
                'text-red-500': remainnedEnemies > enemyCountDeadline,
              }"
              >{{ remainnedEnemies }}</span
            >
            / {{ enemyCountDeadline }}
          </div>
        </div>

        <div class="absolute top-[0.5cqw] left-1/2 -translate-x-1/2">
          <span class="text-white text-[1.5cqw]">00:{{ `${remainnedTime}`.padStart(2, "0") }}</span>
        </div>

        <div class="absolute top-[0.5cqw] right-[1cqw] | flex items-center gap-[0.5cqw]">
          <div
            v-for="(enforce, index) in enforces?.items"
            :key="enforce.name"
            class="flex items-center | bg-black rounded-lg | pr-[0.5cqw]">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(12 + index),
              }"></div>
            <span class="text-[1.3cqw] text-white">
              {{ stringUtil.attachComma(enforce.length) }}
            </span>
          </div>
          <!-- 킬 표시 -->
          <div
            class="bg-black mt-[0.2cqh] | flex items-center justify-between | pr-[0.5cqw] rounded-lg">
            <div
              class="stat-sprites | w-[2.5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(17),
              }"></div>
            <span class="text-[1.3cqw] text-white font-bold text-outline">
              {{ stringUtil.attachComma(killed) }}
            </span>
          </div>
          <!-- 킬 표시 -->

          <!-- 코인표시 -->
          <div
            class="bg-black mt-[0.2cqh] | flex items-center justify-between | pr-[0.5cqw] rounded-lg">
            <div
              class="stat-sprites | w-[2.5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(11),
              }"></div>
            <span class="text-[1.3cqw] text-white font-bold text-outline">
              {{ stringUtil.attachComma(coins) }}
            </span>
          </div>
          <!-- 코인표시 -->

          <!-- 설정버튼 -->
          <button
            class="bg-blue-950 | mt-[0.2cqh] pr-[0.5cqw] | flex items-center justify-between | rounded-lg border-black border-[0.25cqw]"
            @click="showConfigPopup(true)">
            <div
              class="stat-sprites | w-[2.5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(19),
              }"></div>
            <span
              v-t="'Config'"
              class="text-[1.3cqw] text-white font-bold text-outline"></span>
          </button>
          <!-- 설정버튼 -->
        </div>

        <div class="absolute top-1/2 left-[0.5cqw] -translate-y-1/2">
          <!-- 스텟표시 -->
          <div class="grid grid-cols-1 items-start | gap-[0.2cqh]">
            <div
              v-for="(key, index) in materials.keys"
              :key="key"
              class="flex items-center | bg-black rounded-lg | pr-[0.5cqw]">
              <div
                class="stat-sprites | w-[3cqw] aspect-square"
                :style="{
                  backgroundPosition: etcUtil.getSpritePosition(index),
                }"></div>
              <span class="text-[1.3cqw] text-white">
                {{ materials[key].length }}
              </span>
            </div>
          </div>
          <!-- 스텟표시 -->
        </div>

        <div class="absolute top-1/2 right-[1cqw] -translate-y-1/2 | flex flex-col gap-[0.5cqw]">
          <div
            v-for="(weapon, index) in weapons?.weapons.filter((weapon) => weapon)"
            :key="`${weapon?.name}_${index}`"
            class="rounded-lg | border-black border-[0.25cqw]"
            :class="{
              'bg-white': !weapon || weapon?.level === 1,
              'bg-blue-500': weapon?.level === 2,
              'bg-purple-600': weapon?.level === 3,
              'bg-yellow-400': weapon?.level === 4,
              'bg-fuchsia-400': weapon?.level === 5,
              'bg-red-400': weapon?.level === 6,
            }">
            <div
              class="weapon-sprites | w-[4cqw] aspect-square | rounded-lg"
              :style="{ 'background-position': weapon?.spritePosition }"></div>
          </div>
        </div>

        <div
          ref="phaserContainer"
          class="w-full h-full mx-auto"></div>

        <VirtualJoystick
          v-if="isTouchDevice"
          v-model="activeJoystick"
          class="absolute bottom-[3cqw] left-[3cqw]" />

        <div class="flex items-center gap-[1cqw] | absolute bottom-[2cqw] right-[1cqw]">
          <!-- 무기버튼 -->
          <button
            class="flex items-center gap-[0.5cqw] bg-orange-700 | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
            @click="showGamblePopup(true)">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(10),
              }"></div>
            <span
              v-t="'Gamble'"
              class="block text-white | text-[1.8cqw] font-bold text-outline leading-none">
            </span>
          </button>
          <!-- 무기버튼 -->

          <!-- 무기버튼 -->
          <button
            class="flex items-center gap-[0.5cqw] bg-blue-950 | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
            @click="showWeaponsPopup(true)">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(8),
              }"></div>
            <span
              v-t="'Weapon'"
              class="block text-white | text-[1.8cqw] font-bold text-outline leading-none">
            </span>
          </button>
          <!-- 무기버튼 -->

          <!-- 스텟버튼 -->
          <button
            class="flex items-center gap-[0.5cqw] | relative | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
            :class="{
              'bg-amber-500': selectChance > 0,
              'bg-blue-950': selectChance <= 0,
            }"
            @click="showMaterialsPopup(true)">
            <div
              class="stat-sprites | w-[3cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(9),
              }"></div>
            <span
              v-t="'Stat'"
              class="block | text-white text-[1.8cqw] font-bold text-outline leading-none">
            </span>
            <div
              v-if="gachaChance + selectChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="text-white | grid place-items-center | w-[2.2cqw] aspect-square | rounded-full | bg-red-500 | text-outline text-[1.2cqw] font-bold | border-black border-[0.14cqw]">
                {{ selectChance + gachaChance }}
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
import { Gun } from "~/models/Gun"
import { Materials } from "~/models/Material"
import { Player } from "~/models/Player"
import { PayBack, Sharper } from "~/models/PurchaseItem"
import { Weapons, type Weapon } from "~/models/Weapon"

const emit = defineEmits<{
  (e: "next", scene: "result"): void
}>()

const gameStore = useGameStore()
const soundStore = useSoundStore()

const isGameReady = ref(false)
const isShowTutorial = ref(true)
const progress = ref(0)

const phaserContainer = ref<HTMLDivElement>()

let game: Phaser.Game

let player: Player

let enemies: Enemies

let cursors: Phaser.Types.Input.Keyboard.CursorKeys
const enforces = ref<Enforces>()
const weapons = ref<Weapons>()
const materials = ref<Materials>(new Materials())

const initialRemainnedTime = 3
const roundTime = 40
const enemyCountDeadline = 29

const round = ref(0)
const remainnedTime = ref(initialRemainnedTime)
const remainnedEnemies = ref(0)
const activeJoystick = ref<number>()

const isShowMaterialsPopup = ref(false)
const showMaterialsPopup = (value: boolean) => {
  isShowMaterialsPopup.value = value
  if (value) soundStore.play("select")
}

const isShowWeaponsPopup = ref(false)
const showWeaponsPopup = (value: boolean) => {
  isShowWeaponsPopup.value = value
  if (value) soundStore.play("select")
}

const isShowGameOverPopup = ref(false)
const isShowGameClearPopup = ref(false)

const isShowGamblePopup = ref(false)
const showGamblePopup = (value: boolean) => {
  isShowGamblePopup.value = value
  if (value) soundStore.play("select")
}
const isShowConfigPopup = ref(false)
const showConfigPopup = (value: boolean) => {
  isShowConfigPopup.value = value
  if (value) soundStore.play("select")
}

const isShowTextEffect = ref("")

const gachaChance = ref(2)
const selectChance = ref(1)
const coins = ref(20)
const killed = ref(0)
const gamblings = ref(0)

const selectedWeaponIndex = ref(0)
const selectedGambleIndex = ref(0)

const isAllWeaponEffect = ref(false)

let scene: Phaser.Scene & { dmgPool: Phaser.GameObjects.Group }
let isBossRemained = false
let isClear = false

let layer1: Phaser.Tilemaps.TilemapLayer | undefined
let layer2: Phaser.Tilemaps.TilemapLayer | undefined
let layer3: Phaser.Tilemaps.TilemapLayer | undefined

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

let damageRect: Phaser.GameObjects.Rectangle

onMounted(() => {
  if (!phaserContainer.value) return
  window.speed = 1.1

  if (gameStore.checkSelectedPurchaseItem(PayBack)) gameStore.spendPurchaseItem(PayBack)
  if (gameStore.checkSelectedPurchaseItem(Sharper)) gameStore.spendPurchaseItem(Sharper)

  game = new Phaser.Game({
    pixelArt: true,
    antialias: false,
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: phaserContainer.value,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scene: {
      preload(this: Phaser.Scene) {
        const scene = this as Phaser.Scene
        this.load.bitmapFont(
          "damageFont",
          "assets/fonts/bit_map_text.png",
          "assets/fonts/bit_map_text.xml"
        )
        scene.load.image("bullet", "assets/images/bullet.png")

        scene.load.spritesheet("gun-sprite", "assets/images/gun_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })
        scene.load.spritesheet("knife-sprite", "assets/images/knife_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })
        scene.load.spritesheet("book-sprite", "assets/images/book_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })
        scene.load.spritesheet("ring-sprite", "assets/images/ring_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })

        scene.load.image("tiles", "assets/images/mainlevbuild2.png")
        scene.load.tilemapTiledJSON("map", "assets/jsons/map.json")

        if (gameStore.checkCharacter(gameStore.selectedCharacter)) {
          scene.load.spritesheet(
            "playerIdle",
            `assets/images/${gameStore.selectedCharacter.meta.id}_idle.png`,
            {
              frameWidth: 128,
              frameHeight: 128,
            }
          )
          scene.load.spritesheet(
            "playerWork",
            `assets/images/${gameStore.selectedCharacter.meta.id}_work.png`,
            {
              frameWidth: 128,
              frameHeight: 128,
            }
          )
        }

        scene.load.spritesheet("enemy", "assets/images/zombie_work.png", {
          frameWidth: 96,
          frameHeight: 96,
        })

        scene.load.spritesheet("weapons-animation", "assets/images/weapons_sprite1.png", {
          frameWidth: 100,
          frameHeight: 100,
        })

        scene.load.spritesheet("weapons-animation2", "assets/images/weapons_sprite2.png", {
          frameWidth: 100,
          frameHeight: 100,
        })

        scene.load.start()
        scene.load.on("progress", (value: number) => {
          progress.value = value
        })
        scene.load.once("complete", () => {
          isGameReady.value = true
        })
      },
      create(this: Phaser.Scene) {
        scene = this as Phaser.Scene & { dmgPool: Phaser.GameObjects.Group }
        scene.data.set("splashSeq", 0)
        // scene.physics.world.timeScale = 0.5
        damageRect = scene.add
          .rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xff0000)
          .setOrigin(0)
          .setAlpha(0)
          .setDepth(999)
          .setScrollFactor(0)

        scene.dmgPool = scene.add.group({
          classType: Phaser.GameObjects.BitmapText,
          maxSize: 200,
          runChildUpdate: false,
        })
        for (let i = 0; i < 200; i++) {
          const t = scene.add
            .bitmapText(0, 0, "damageFont", "", 24)
            .setAlpha(0)
            .setVisible(false)
            .setActive(false)
          scene.dmgPool.add(t)
        }

        const map = scene.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage("mainlevbuild2", "tiles")
        const tileset2 = map.addTilesetImage("mainlevbuild2", "tiles")
        const tileset3 = map.addTilesetImage("mainlevbuild2", "tiles")
        if (tileset) layer1 = map.createLayer("layer1", tileset, 0, 0) ?? undefined
        if (tileset2) layer2 = map.createLayer("layer2", tileset2, 0, 0) ?? undefined
        if (tileset3) layer3 = map.createLayer("layer3", tileset3, 0, 0) ?? undefined

        cursors = scene.input.keyboard!.createCursorKeys()

        player = new Player(scene, 400, 300, "playerIdle")
        player.createPlayerAnimation()
        player.weapons.setFrame(8)
        player.weaponsEffect.setFrame(8)

        enemies = new Enemies(scene, gameStore.selectedCharacter)
        scene.anims.create({
          key: "enemy-walk",
          frames: scene.anims.generateFrameNumbers("enemy", { start: 0, end: 7 }),
          frameRate: 7,
          repeat: -1,
        })

        enforces.value = new Enforces()
        weapons.value = new Weapons(scene, enemies, materials.value, enforces.value)

        const group = scene.add.group()
        weapons.value.weapons.forEach(() => group.add(scene.add.circle(0, 0, 0, 0xff0000, 0.1)))

        const walls = scene.physics.add.staticGroup()
        walls.create(160, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 90).refreshBody()
        walls.create(160, 310, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 90).refreshBody()
        walls.create(160, 390, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(270, 10).refreshBody()
        walls.create(525, 390, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(290, 10).refreshBody()
        walls.create(805, 315, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 90).refreshBody()
        walls.create(805, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 80).refreshBody()
        walls.create(160, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(275, 10).refreshBody()
        walls.create(530, 130, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(285, 10).refreshBody()

        walls.create(33, 30, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(895, 10).refreshBody()
        walls.create(33, 30, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 480).refreshBody()
        walls.create(918, 30, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(10, 480).refreshBody()
        walls.create(33, 499, "").setAlpha(0).setOrigin(0, 0).setDisplaySize(895, 10).refreshBody()

        scene.physics.add.collider(player, walls)

        // ===== 탄환(Gun) 그룹 생성 =====
        weapons.value.addWeapon(0, Gun.of())
        gameStore.addCollection(Gun.meta.name)

        scene.events.on("boss-die", () => {
          isBossRemained = false
          selectChance.value += 1
          gachaChance.value += 2
          coins.value += round.value * 10
        })
        scene.events.on("enemy-die", () => {
          killed.value++
          remainnedEnemies.value--
          coins.value += round.value
        })
        scene.events.on("enemy-spawn", () => {
          remainnedEnemies.value++
        })

        scene.time.addEvent({
          delay: 1000 / window.speed,
          repeat: -1,
          callback: () => {
            if (scene.data.get("paused")) return

            remainnedTime.value--

            if (remainnedTime.value % 5 === 0) {
              remainnedEnemies.value = enemies.group.children.size
            }

            if (remainnedTime.value < 0) {
              round.value++

              if (round.value % 10 === 0) {
                isShowTextEffect.value = `ROUND ${round.value}`
                soundStore.play("round")

                scene.time.delayedCall(1200, () => {
                  isShowTextEffect.value = "EMERGENCY"
                  soundStore.play("round")

                  scene.time.delayedCall(1200, () => (isShowTextEffect.value = ""))
                })
              } else {
                isShowTextEffect.value = `ROUND ${round.value}`
                scene.time.delayedCall(1200, () => (isShowTextEffect.value = ""))
                soundStore.play("round")
              }

              remainnedTime.value = roundTime

              if (round.value !== 1) {
                if (round.value < 20) {
                  if (round.value % 5 === 0) {
                    gachaChance.value = gachaChance.value + 2
                    selectChance.value = selectChance.value + 1
                  } else gachaChance.value = gachaChance.value + 3
                } else if (round.value < 40) {
                  if (round.value % 5 === 0) {
                    gachaChance.value = gachaChance.value + 2
                    selectChance.value = selectChance.value + 2
                  } else gachaChance.value = gachaChance.value + 4
                } else {
                  if (round.value % 5 === 0) {
                    gachaChance.value = gachaChance.value + 2
                    selectChance.value = selectChance.value + 3
                  } else gachaChance.value = gachaChance.value + 5
                }
              }
              if (isBossRemained) {
                scene.physics.pause()
                isShowTextEffect.value = ""
                isShowGameOverPopup.value = true
              }
            }

            const playerHP = player.getData("hp") as number
            if (remainnedEnemies.value > enemyCountDeadline) {
              player.setData("hp", playerHP - 1)
              scene.cameras.main.shake(100, 0.01)
              damageRect.setAlpha(1 - (playerHP - 1) / 10)
              soundStore.play("attacked")

              scene.tweens.add({
                targets: damageRect,
                alpha: 0,
                duration: 200,
                ease: "Sine.easeOut",
              })
            }

            if (playerHP < 1) {
              soundStore.play("attacked")

              scene.physics.pause()
              isShowGameOverPopup.value = true
            }

            if (round.value === 60 && remainnedTime.value === 0) {
              scene.physics.pause()
              isShowGameClearPopup.value = true
              isClear = true
            }

            const spawnCondition =
              round.value > 30
                ? 41 > remainnedTime.value && remainnedTime.value > 25
                : 41 > remainnedTime.value && remainnedTime.value > 30

            if (spawnCondition) enemies.spawnEnemy(round.value, coins)
            if (round.value >= 10 && round.value % 10 === 0 && remainnedTime.value === roundTime)
              setTimeout(() => {
                enemies.spawnBoss(round.value, coins)
                isBossRemained = true
              }, 500)
          },
        })

        pause()
      },
      update(this: Phaser.Scene, time: number) {
        const scene = this as Phaser.Scene
        if (scene.data.get("paused")) return
        player.handlePlayerMovement(cursors)
        player.updatePlayerHpBar()
        enemies.updateDistances(player.x, player.y)
        enemies.children.forEach((enemy) => {
          enemy.moveEnemyAlongPath(weapons.value!.weapons, materials.value)
          enemy.applyDecrease(weapons.value!.weapons)
          enemy.updateEnemyHpBar()
        })

        // 플레이어가 정지상태 && 쿨다운 → 발사
        if (player.isIdle) {
          const allCooltimes = weapons.value!.weapons.reduce(
            (acc, current) => acc + (current?.allCooltime ?? 0),
            0
          )
          weapons.value!.weapons.forEach((weapon, index) => {
            if (!weapon) return

            const isCooltime = weapon.checkIsCooltime(
              time,
              Math.min(
                99,
                (materials.value.calculateStat("agi") +
                  allCooltimes +
                  enforces.value!.aditionnalCooldown / 100) *
                  100
              )
            )

            if (isCooltime)
              player.getClosestEnemies(enemies, weapon.targetLength).forEach((enemy) => {
                if (enemy.distanceWithPlayer && enemy.distanceWithPlayer <= weapon.range) {
                  weapon.fireHomingWeapon(weapons.value!, index, time, player, enemy)

                  if (index === 0) {
                    if (!player.gun.anims.isPlaying) {
                      const angleRad = Phaser.Math.Angle.Between(
                        player.x,
                        player.y,
                        enemy.x,
                        enemy.y
                      )
                      const offsetDist = 20
                      const offsetX = Math.cos(angleRad) * offsetDist
                      const offsetY = Math.sin(angleRad) * offsetDist

                      player.gun
                        .setOrigin(0.1, 0.5)
                        .setTint(etcUtil.getLevelColorHex(weapon.level))
                        .setRotation(angleRad + Phaser.Math.DegToRad(0))
                        .setPosition(player.x + offsetX, player.y + offsetY)
                        .play("gun-animation")
                        .once("animationcomplete-gun-animation", () => {
                          player.gun.setFrame(0)
                        })

                      soundStore.play("gun")
                    }
                  }
                  if (index === 1) {
                    if (!player.knife.anims.isPlaying) {
                      const angleRad = Phaser.Math.Angle.Between(
                        player.x,
                        player.y,
                        enemy.x,
                        enemy.y
                      )
                      const offsetDist = -50
                      const offsetX = Math.cos(angleRad) * offsetDist
                      const offsetY = Math.sin(angleRad) * offsetDist

                      player.knife
                        .setOrigin(0.1, 0.5)
                        .setTint(etcUtil.getLevelColorHex(weapon.level))
                        .setRotation(angleRad + Phaser.Math.DegToRad(0))
                        .setPosition(player.x + offsetX, player.y + offsetY)
                        .play("knife-animation")
                        .once("animationcomplete-knife-animation", () => {
                          player.knife.setFrame(0)
                        })
                      soundStore.play("knife")
                    }
                  }

                  if (index === 2) {
                    if (!player.book.anims.isPlaying) {
                      player.book
                        .setTint(etcUtil.getLevelColorHex(weapon.level))
                        .play("book-animation")
                        .once("animationcomplete-book-animation", () => {
                          player.book.setFrame(0)
                        })
                    }

                    soundStore.play("book")
                  }

                  if (index === 3) {
                    if (!player.ring.anims.isPlaying) {
                      player.ring
                        .setTint(etcUtil.getLevelColorHex(weapon.level))
                        .play("ring-animation")
                        .once("animationcomplete-ring-animation", () => {
                          player.ring.setFrame(0)
                        })
                    }

                    soundStore.play("ring")
                  }
                }
              })
          })
        }

        weapons.value!.weapons.forEach((weapon) => {
          if (!weapon) return
          weapon.followEnemy(weapons.value!)
        })
      },
    },
  })
})

const allAttack = async () => {
  if (!weapons.value) return
  isAllWeaponEffect.value = false

  const ws = weapons.value.weapons.filter((w): w is Weapon => !!w)

  for (let i = 0; i < ws.length; i++) {
    const weapon = ws[i]

    const targets = [...enemies.children]

    for (const enemy of targets) enemy.takeDamage(weapon, materials.value, enforces.value!)

    if (targets.length) {
      if (i === 0) {
        soundStore.play("gun")

        player.gun
          .setPosition(player.x + 20, player.y)
          .play("gun-animation")
          .once("animationcomplete-gun-animation", () => {
            player.gun.setFrame(0)
          })
      }

      if (i === 1) {
        soundStore.play("knife")

        player.knife
          .setPosition(player.x + 20, player.y)
          .play("knife-animation")
          .once("animationcomplete-knife-animation", () => {
            player.knife.setFrame(0)
          })
      }
      if (i === 2) {
        soundStore.play("book")

        player.book
          .setPosition(player.x, player.y)
          .play("book-animation")
          .once("animationcomplete-book-animation", () => {
            player.book.setFrame(0)
          })
      }
      if (i === 3) {
        soundStore.play("ring")

        player.ring
          .setPosition(player.x, player.y)
          .play("ring-animation")
          .once("animationcomplete-ring-animation", () => {
            player.ring.setFrame(0)
          })
      }
    }

    await etcUtil.sleep(250)
  }
}

const allAttackAnimation = async () => {
  const cam = scene.cameras.main
  const centerX = cam.width / 2
  const centerY = cam.height / 2
  // 1) 카메라 플래시 + 쉐이크
  cam.flash(300, 255, 255, 255)
  cam.shake(300, 0.01)

  // 2) 풀스크린 반투명 오버레이
  const overlay = scene.add
    .rectangle(centerX, centerY, cam.width, cam.height, 0xffff00, 0.2)
    .setDepth(100)
  scene.tweens.add({
    targets: overlay,
    alpha: 0,
    duration: 500,
    ease: "Cubic.easeOut",
    onComplete: () => overlay.destroy(),
  })
  const weaponLevel = weapons.value?.minLevel ?? 0
  player.weaponsEffect.setTint(etcUtil.getLevelColorHex(weaponLevel)).setFrame(8)
  player.weapons.setTint(etcUtil.getLevelColorHex(weaponLevel)).setFrame(8)
  player.gun.setTint(etcUtil.getLevelColorHex(weaponLevel))
  player.knife.setTint(etcUtil.getLevelColorHex(weaponLevel))
  player.book.setTint(etcUtil.getLevelColorHex(weaponLevel))
  player.ring.setTint(etcUtil.getLevelColorHex(weaponLevel))
  scene.data.set("isAllWeaponActive", weaponLevel)
  pause()

  player.weaponsEffect.setPosition(player.x, player.y).setFrame(8).play("weapons-animation")
  soundStore.play("weapons")

  await etcUtil.sleep(1000)
  allAttack()
  await etcUtil.sleep(1000)
  resume()
  player.weapons.setPosition(player.x, player.y).play("weapons-animation2")
}

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

const rewords = computed(() => ({
  rounds: round.value ? round.value : 0,
  killed: round.value ? killed.value : 0,
  materials: round.value
    ? Object.values(materials.value).reduce((acc, current) => acc + current.length, 0)
    : 0,
  weapons: round.value
    ? weapons.value?.weapons
        .filter((weapon): weapon is Weapon => !!weapon)
        .reduce((acc, current) => acc + current.level * 15, 0) ?? 0
    : 0,
  coins: round.value ? coins.value : 0,
  enforces: round.value
    ? enforces.value?.items.reduce((acc, current) => acc + current.length, 0) ?? 0
    : 0,
  gamblings: round.value ? gamblings.value : 0,
  isClear: isClear ? 1 : 0,
}))

const startGame = () => {
  isShowTutorial.value = false
  resume()
}

const exit = () => {
  gameStore.setRewords(rewords.value)
  emit("next", "result")
}
const pause = () => {
  scene.data.set("paused", true)
  scene.physics.pause()
}
const resume = () => {
  scene.data.set("paused", false)
  scene.physics.resume()
}
watch(isShowConfigPopup, (value) => {
  if (value) pause()
  else resume()
})
// watch(isShowMaterialsPopup, (value) => {
//   if (value) pause()
//   else resume()
// })
watch(isShowWeaponsPopup, (value) => {
  if (!value && isAllWeaponEffect.value) allAttackAnimation()
  // if (value) pause()
  // else {
  //   resume()
  //   if (isAllWeaponEffect.value) allAttackAnimation()
  // }
})
// watch(isShowGamblePopup, (value) => {
//   if (value) pause()
//   else resume()
// })
watch(isShowGameOverPopup, (value) => {
  if (!value) exit()
  else pause()
})
watch(isShowGameClearPopup, (value) => {
  if (!value) exit()
  else pause()
})

watch(
  round,
  (round) => {
    const ceiled = Math.max(1, Math.ceil(round / 10))
    layer1?.setTint(etcUtil.softTint(etcUtil.getLevelColorHex(ceiled), 0.7))
    layer2?.setTint(etcUtil.softTint(etcUtil.getLevelColorHex(ceiled), 0.7))
    layer3?.setTint(etcUtil.softTint(etcUtil.getLevelColorHex(ceiled), 0.7))
  },
  { immediate: true }
)
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
