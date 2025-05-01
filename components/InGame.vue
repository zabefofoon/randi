<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <ModalGameOver
      v-if="isShowGameOverPopup"
      @close="isShowGameOverPopup = false" />
    <ModalConfigs
      v-if="isShowConfigPopup"
      @close="isShowConfigPopup = false"
      @exit="exit" />
    <ModalGamble
      v-if="enforces && weapons && isShowGamblePopup"
      v-model:selected-index="selectedGambleIndex"
      v-model:coins="coins"
      v-model:gamblings="gamblings"
      :weapons="weapons"
      :materials="materials"
      :enforces="enforces"
      @close="isShowGamblePopup = false" />
    <ModalWeapons
      v-if="weapons && isShowWeaponsPopup"
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
            @click="isShowConfigPopup = true">
            <div
              class="stat-sprites | w-[2.5cqw] aspect-square"
              :style="{
                backgroundPosition: etcUtil.getSpritePosition(19),
              }"></div>
            <span class="text-[1.3cqw] text-white font-bold text-outline">설정</span>
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

          <!-- 강화표시 -->
          <div class="mt-[0.2cqh] | flex flex-col gap-[0.2cqh]">
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
          </div>
          <!-- 강화표시 -->
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
            class="flex items-center gap-[0.5cqw] bg-blue-950 | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
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
            class="flex items-center gap-[0.5cqw] | relative | h-fit pr-[1.5cqw] pl-[0.5cqw] py-[0.2cqw] | rounded-lg border-black border-[0.2cqw]"
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
import { Gun } from "~/models/Gun"
import { Materials } from "~/models/Material"
import { Player } from "~/models/Player"
import { PayBack, Sharper } from "~/models/PurchaseItem"
import { Weapons, type Weapon } from "~/models/Weapon"

const emit = defineEmits<{
  (e: "next", scene: "result"): void
}>()

const gameStore = useGameStore()

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
const materials = ref<Materials>(new Materials())

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
const isShowConfigPopup = ref(false)

const gachaChance = ref(2)
const selectChance = ref(1)
const coins = ref(20)
const killed = ref(0)
const gamblings = ref(0)

const selectedWeaponIndex = ref(0)
const selectedGambleIndex = ref(0)
let scene: Phaser.Scene
let isBossRemained = false

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

let damageRect: Phaser.GameObjects.Rectangle

onMounted(() => {
  if (!phaserContainer.value) return

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
        const scene = this as Phaser.Scene

        scene.load.image("bullet", "/assets/images/bullet.png")

        scene.load.spritesheet("gun-sprite", "/assets/images/gun_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })
        scene.load.spritesheet("knife-sprite", "/assets/images/knife_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })
        scene.load.spritesheet("book-sprite", "/assets/images/book_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })
        scene.load.spritesheet("ring-sprite", "/assets/images/ring_sprite.png", {
          frameWidth: 100,
          frameHeight: 100,
        })

        scene.load.image("tiles", "/assets/images/mainlevbuild2.png")
        scene.load.tilemapTiledJSON("map", "/assets/jsons/map.json")

        if (gameStore.checkCharacter(gameStore.selectedCharacter)) {
          scene.load.spritesheet(
            "playerIdle",
            `/assets/images/${gameStore.selectedCharacter.meta.id}_idle.png`,
            {
              frameWidth: 128,
              frameHeight: 128,
            }
          )
          scene.load.spritesheet(
            "playerWork",
            `/assets/images/${gameStore.selectedCharacter.meta.id}_work.png`,
            {
              frameWidth: 128,
              frameHeight: 128,
            }
          )
        }

        scene.load.spritesheet("enemy", "/assets/images/zombie_work.png", {
          frameWidth: 96,
          frameHeight: 96,
        })
      },
      create(this: Phaser.Scene) {
        scene = this as Phaser.Scene

        damageRect = scene.add
          .rectangle(
            0,
            0,
            this.cameras.main.width,
            this.cameras.main.height,
            0xff0000 // 빨강
          )
          .setOrigin(0)
          .setAlpha(0) // 처음엔 투명
          .setDepth(999) // UI 위에 표시
          .setScrollFactor(0) // 카메라에 붙어서 움직이지 않음

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

        scene.events.on("boss-die", () => {
          isBossRemained = false
          selectChance.value += 1
          gachaChance.value += 2
          coins.value += round.value * 10
        })
        scene.events.on("enemy-die", () => killed.value++)
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
            if (remainnedEnemies.value > enemyCountDeadline) {
              player.setData("hp", playerHP - 1)
              scene.cameras.main.shake(100, 0.01)
              damageRect.setAlpha(1 - (playerHP - 1) / 10)

              scene.tweens.add({
                targets: damageRect,
                alpha: 0,
                duration: 200,
                ease: "Sine.easeOut",
              })
            }

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
        const scene = this as Phaser.Scene
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
          weapons.value!.weapons.forEach((weapon, index) => {
            if (
              weapon?.checkIsCooltime(
                time,
                Math.min(
                  99,
                  (materials.value.calculateStat("agi") +
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

                if (distance <= weapon.range) {
                  weapon.fireHomingWeapon(index, time, player, enemy)
                  const angleRad = Phaser.Math.Angle.Between(player.x, player.y, enemy.x, enemy.y)

                  if (index === 0) {
                    if (!player.gun.anims.isPlaying) {
                      const offsetDist = 20
                      const offsetX = Math.cos(angleRad) * offsetDist
                      const offsetY = Math.sin(angleRad) * offsetDist

                      player.gun
                        .setOrigin(0.1, 0.5)
                        .setTint(0xffffff)
                        .setRotation(angleRad + Phaser.Math.DegToRad(0))
                        .setPosition(player.x + offsetX, player.y + offsetY)
                        .play("gun-animation")
                        .once("animationcomplete-gun-animation", () => {
                          player.gun.setFrame(0)
                        })
                    }
                  }
                  if (index === 1) {
                    if (!player.knife.anims.isPlaying) {
                      const offsetDist = -50
                      const offsetX = Math.cos(angleRad) * offsetDist
                      const offsetY = Math.sin(angleRad) * offsetDist

                      player.knife
                        .setOrigin(0.1, 0.5)
                        .setTint(0xffffff)
                        .setRotation(angleRad + Phaser.Math.DegToRad(0))
                        .setPosition(player.x + offsetX, player.y + offsetY)
                        .play("knife-animation")
                        .once("animationcomplete-knife-animation", () => {
                          player.knife.setFrame(0)
                        })
                    }
                  }

                  if (index === 2) {
                    if (!player.book.anims.isPlaying) {
                      player.book
                        .setTint(0xffffff)
                        .play("book-animation")
                        .once("animationcomplete-book-animation", () => {
                          player.book.setFrame(0)
                        })
                    }
                  }

                  if (index === 3) {
                    if (!player.ring.anims.isPlaying) {
                      player.ring
                        .setTint(0xffffff)
                        .play("ring-animation")
                        .once("animationcomplete-ring-animation", () => {
                          player.ring.setFrame(0)
                        })
                    }
                  }
                }
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

const rewords = computed(() => ({
  rounds: round.value ? round.value : 0,
  killed: round.value ? killed.value : 0,
  materials: round.value
    ? Object.values(materials.value).reduce((acc, current) => acc + current.length, 0)
    : 0,
  weapons: round.value
    ? weapons.value?.weapons
        .filter((weapon): weapon is Weapon => !!weapon)
        .reduce((acc, current) => acc + current.level, 0) ?? 0
    : 0,
  coins: round.value ? coins.value : 0,
  enforces: round.value
    ? enforces.value?.items.reduce((acc, current) => acc + current.length, 0) ?? 0
    : 0,
  gamblings: round.value ? gamblings.value : 0,
}))

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
watch(isShowMaterialsPopup, (value) => {
  if (value) pause()
  else resume()
})
watch(isShowWeaponsPopup, (value) => {
  if (value) pause()
  else resume()
})
watch(isShowGamblePopup, (value) => {
  if (value) pause()
  else resume()
})
watch(isShowGameOverPopup, (value) => {
  if (!value) exit()
  else pause()
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
