import type { Enemies } from "./Enemies"

export class UIManager {
  scene: Phaser.Scene
  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  showGameOverUI(enemies: Enemies, initialRemainnedTime: number) {
    // 화면 중앙에 "GAME OVER" 텍스트
    const gameOverText = this.scene.add.text(400, 250, "GAME OVER", {
      fontSize: "40px",
      color: "#ff0000",
    })
    gameOverText.setOrigin(0.5)

    // 아래쪽에 "다시하기" 버튼 텍스트
    const retryButton = this.scene.add.text(400, 350, "다시하기", {
      fontSize: "24px",
      color: "#ffffff",
      backgroundColor: "#000000",
    })
    retryButton.setOrigin(0.5)
    retryButton.setPadding(10, 10)
    retryButton.setInteractive()

    this.scene.anims.remove("right") // "right" 라는 키 애니메이션 제거
    this.scene.anims.remove("left")
    this.scene.anims.remove("turn")
    this.scene.time.removeAllEvents()

    // 버튼 클릭 이벤트
    retryButton.on("pointerdown", () => {
      // 씬을 재시작하거나, 새로 시작
      this.scene.data.set("remainnedTime", initialRemainnedTime)
      enemies.remainnedEnemies.value = 0
      this.scene.data.set("gameover", false)
      this.scene.time.removeAllEvents()
      this.scene.scene.restart()
      // or this.scene.start('GameScene');
    })

    // 게임 진행 멈추기(물리, 애니메이션 등)
    this.scene.physics.pause()
  }
}
