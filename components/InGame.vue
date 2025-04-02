<template>
  <div class="w-screen h-screen | flex items-center justify-center | bg-black">
    <ModalGameOver
      v-if="isShowGameOverPopup"
      @close="isShowGameOverPopup = false" />
    <ModalWeapons
      v-if="isShowWeaponsPopup"
      :weapons="weapons"
      :materials="materials"
      @close="isShowWeaponsPopup = false" />
    <ModalMaterials
      v-if="isShowMaterialsPopup"
      v-model:gacha-chance="gachaChance"
      :materials="materials"
      @close="isShowMaterialsPopup = false" />
    <div class="content | relative | aspect-video max-w-full max-h-full | bg-white">
      <main class="relative | w-full h-full | flex flex-col justify-center items-center">
        <div
          class="w-full | flex items-center justify-between | px-[0.5cqw] | absolute top-[0.5cqw] | text-[1.5cqw] text-white">
          <div>ROUND {{ round }}</div>
          <div>00:{{ `${remainnedTime}`.padStart(2, "0") }}</div>
          <div>{{ remainnedEnemies }} / {{ enemyCountDeadline }}</div>
        </div>

        <div
          ref="phaserContainer"
          class="w-full h-full mx-auto"></div>

        <VirtualJoystick
          v-model="activeJoystick"
          class="absolute bottom-[12px] left-[12px]" />

        <div
          class="flex justify-end gap-[1cqw] | w-full | px-[0.5cqw] | absolute bottom-[0.5cqw] | text-white text-[1.5cqw]">
          <button
            class="bg-black | px-[1.5cqw] py-[0.5cqw] | rounded-full | leading-none"
            @click="isShowWeaponsPopup = true">
            무기뽑기
          </button>
          <button
            class="relative | bg-black | px-[1.5cqw] py-[0.5cqw] | rounded-full | leading-none"
            @click="isShowMaterialsPopup = true">
            재료뽑기
            <div
              v-if="gachaChance > 0"
              class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
              <span
                class="grid place-items-center | w-[2cqw] aspect-square | rounded-full | bg-red-500 | text-[1cqw]">
                {{ gachaChance }}
              </span>
            </div>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Enemies } from "~/models/Enemies"
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
import { Bullet, Weapons } from "~/models/Weapon"

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

const weapons = ref<Weapons>()
const materials = ref<Materials>({
  Material1: { length: 0, textObj: undefined, info: new Material1() },
  Material2: { length: 0, textObj: undefined, info: new Material2() },
  Material3: { length: 0, textObj: undefined, info: new Material3() },
  Material4: { length: 0, textObj: undefined, info: new Material4() },
  Material5: { length: 0, textObj: undefined, info: new Material5() },
  Material6: { length: 0, textObj: undefined, info: new Material6() },
  Material7: { length: 0, textObj: undefined, info: new Material7() },
  Material8: { length: 0, textObj: undefined, info: new Material8() },
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

const gachaChance = ref(3)

let scene: Phaser.Scene
onMounted(() => {
  if (!phaserContainer.value) return

  game = new Phaser.Game({
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
        debug: true,
      },
    },
    scene: {
      preload(this: Phaser.Scene) {
        this.load.image("sky", "/assets/images/sky.png")
        this.load.spritesheet("dude", "/assets/images/dude.png", {
          frameWidth: 32,
          frameHeight: 48,
        })
        this.load.spritesheet("enemy", "/assets/images/dude.png", {
          frameWidth: 32,
          frameHeight: 48,
        })
        this.load.image("star", "/assets/images/star.png")
        this.load.image("Bullet", "/assets/images/star.png")
      },
      create(this: Phaser.Scene) {
        scene = this
        resizeBackground(this)
        this.scale.on("resize", () => resizeBackground(this))

        this.data.set("gachaChance", 3)
        cursors = this.input.keyboard!.createCursorKeys()

        // 플레이어
        player = new Player(this, 400, 300, "dude")
        player.createPlayerAnimation()
        enemies = new Enemies(this, remainnedEnemies)
        weapons.value = new Weapons(this, enemies)
        // 애니메이션

        // ===== 탄환(bullet) 그룹 생성 =====
        weapons.value.addWeapon(0, Bullet.of())

        this.time.addEvent({
          delay: 1000,
          repeat: -1,
          callback: () => {
            if (this.data.get("paused")) return

            remainnedTime.value--
            if (remainnedTime.value < 0) {
              round.value++
              remainnedTime.value = roundTime

              if (round.value !== 1) {
                this.data.set("gachaChance", this.data.get("gachaChance") + 3)
                gachaChance.value = gachaChance.value + 3
              }
            }

            const playerHP = player.getData("hp") as number
            if (remainnedEnemies.value >= enemyCountDeadline) player.setData("hp", playerHP - 1)

            if (playerHP < 1) {
              this.physics.pause()
              this.data.set("gameover", true)
              isShowGameOverPopup.value = true
            }

            if (46 > remainnedTime.value && remainnedTime.value > 35) enemies.spawnEnemy()
          },
        })
      },
      update(this: Phaser.Scene, time: number) {
        if (this.data.get("gameover")) return
        if (this.data.get("paused")) return

        // 플레이어 이동
        player.handlePlayerMovement(cursors)
        player.updatePlayerHpBar()

        // 적 이동
        enemies.children.forEach((enemy) => {
          enemy.moveEnemyAlongPath(player, weapons.value.weapons)
          enemy.updateEnemyHpBar()
        })

        // 플레이어가 정지상태 && 쿨다운 → 발사
        if (player.isIdle) {
          weapons.value.weapons.forEach((weapon) => {
            if (weapon?.checkIsCooltime(time))
              player.getClosestEnemies(enemies, weapon.targetLength).forEach((enemy) => {
                const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y)

                if (distance <= weapon.range) weapon.fireHomingWeapon(time, player, enemy)
              })
          })
        }

        weapons.value.weapons.forEach((weapon) => {
          if (!weapon) return
          weapon.followEnemy()
          weapon.destroyWhenOutOfMap()
        })
      },
    },
  })
})

const resizeBackground = (scene: Phaser.Scene) => {
  const gameWidth = scene.scale.width
  const gameHeight = scene.scale.height

  // bg가 이미 만들어져 있다고 가정
  // 없으면 한번만 생성하거나, 전역에 두고 관리
  if (!scene.bg) {
    scene.bg = scene.add.image(0, 0, "sky").setOrigin(0, 0)
  }

  // 다시 화면 크기에 맞춰 사이즈 조정
  scene.bg.setDisplaySize(gameWidth, gameHeight)
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
watch(isShowGameOverPopup, (value) => {
  if (value) {
    scene.data.set("paused", true)
    scene.physics.pause()
  } else {
    emit("next", "result")
  }
})
</script>

<style scoped>
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
