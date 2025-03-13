import type { Enemies } from "./Enemies"
import type { Material, Materials } from "./Material"
import { Knife, Ring, Wand, Weapons, type Weapon } from "./Weapon"

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
            enemies.remainnedEnemies = 0
            this.scene.data.set("gameover", false)
            this.scene.time.removeAllEvents()
            this.scene.scene.restart()
            // or this.scene.start('GameScene');
        })

        // 게임 진행 멈추기(물리, 애니메이션 등)
        this.scene.physics.pause()
    }

    showMaterialSelectionUI(materials: Materials) {
        this.scene.physics.pause()
        this.scene.data.set("paused", true)
        // 전체 화면을 덮는 투명 오버레이 생성 (클릭 이벤트를 잡기 위함)
        const overlay = this.scene.add.rectangle(400, 300, 800, 600, 0x000000, 0).setInteractive()

        // 재료 선택 패널 컨테이너 생성 (화면 중앙에 배치)
        const panel = this.scene.add.container(400, 300)

        // 패널 배경 (반투명 검정 사각형)
        const bg = this.scene.add.rectangle(0, 0, 700, 500, 0x000000, 0.8)
        panel.add(bg)

        // 타이틀 텍스트
        const title = this.scene.add
            .text(0, -200, "재료 선택", { fontSize: "24px", color: "#fff" })
            .setOrigin(0.5)
        panel.add(title)

        // 2행 4열 그리드에 재료 이미지 배치 (패널 내부)
        const materialsPerRow = 4
        const spacingX = 150
        const spacingY = 150
        // 컨테이너 로컬 좌표 기준: 중앙에서 왼쪽으로, 위로 오프셋
        const startX = -((materialsPerRow - 1) * spacingX) / 2
        const startY = -125 // 패널 중앙에서 약간 위쪽에 배치

        Object.entries(materials).forEach(([name, value], index) => {
            const row = Math.floor(index / materialsPerRow)
            const col = index % materialsPerRow
            const x = startX + col * spacingX
            const y = startY + row * spacingY
            const materialImage = this.scene.add.image(x, y, name).setScale(0.5)
            panel.add(materialImage)

            const materialText = this.scene.add.text(x, y + 40, `${name}`, {
                fontSize: "14px",
                color: "#fff",
            })
            materialText.setOrigin(0.5)
            panel.add(materialText)

            const descriptionText = this.scene.add.text(x, y + 60, `${value.info.description}`, {
                fontSize: "12px",
                color: "#fff",
            })
            descriptionText.setOrigin(0.5)
            panel.add(descriptionText)

            const lengthText = this.scene.add.text(x, y + 80, `${value.length}개`, {
                fontSize: "14px",
                color: "#fff",
            })

            lengthText.setOrigin(0.5)
            panel.add(lengthText)
            value.textObj = lengthText
        })

        // 재료 뽑기 버튼 (기존 로직)
        const gachaButton = this.scene.add.text(-50, 175, "재료 뽑기", {
            fontSize: "24px",
            color: "#fff",
        })
        gachaButton.setOrigin(0.5)
        gachaButton.setInteractive()
        gachaButton.on("pointerdown", () => {
            this.scene.data.set("gachaChance", this.scene.data.get("gachaChance") - 1)
            console.log(this.scene.data.get("gachaChance"))
            if (this.scene.data.get("gachaChance") < 0) {
                this.scene.data.set("gachaChance", 0)
                return
            }

            // 재료 뽑기 로직(랜덤 재료 증가)
            const randomIndex = Phaser.Math.Between(0, 7)
            const selectedMaterialKey = Object.keys(materials)[randomIndex] as Material["name"]
            materials[selectedMaterialKey].length++
            materials[selectedMaterialKey].textObj?.setText(
                `${materials[selectedMaterialKey].length}개`
            )
        })
        panel.add(gachaButton)

        const closeButton = this.scene.add.text(50, 175, "닫기", {
            fontSize: "24px",
            color: "#fff",
        })
        closeButton.setOrigin(0.5)
        closeButton.setInteractive()
        closeButton.on("pointerdown", () => {
            panel.destroy()
            overlay.destroy()
            this.scene.physics.resume()
            this.scene.data.set("paused", false)
        })
        panel.add(closeButton)

        // 오버레이에 클릭 이벤트: 패널 외부를 클릭하면 UI 제거 후 게임 재개
        overlay.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // 패널의 경계 계산 (패널은 중앙(400,300)이고, 크기가 700x500)
            const panelLeft = 400 - 350
            const panelRight = 400 + 350
            const panelTop = 300 - 250
            const panelBottom = 300 + 250
            if (
                pointer.x < panelLeft ||
                pointer.x > panelRight ||
                pointer.y < panelTop ||
                pointer.y > panelBottom
            ) {
                panel.destroy()
                overlay.destroy()
                this.scene.physics.resume()
                this.scene.data.set("paused", false)
            }
        })
    }

    showWeaponsSelectionUI(materials: Materials, weapons: Weapons) {
        this.scene.physics.pause()
        this.scene.data.set("paused", true)

        let selectedIndex = 0
        const overlay = this.scene.add.rectangle(400, 300, 800, 600, 0x000000, 0).setInteractive()
        const panel = this.scene.add.container(400, 300)
        const bg = this.scene.add.rectangle(0, 0, 700, 500, 0x000000, 0.8)
        panel.add(bg)

        const title = this.scene.add
            .text(0, -200, "무기 뽑기", { fontSize: "24px", color: "#fff" })
            .setOrigin(0.5)
        panel.add(title)

        // 하단에 무기 설명을 표시할 텍스트 생성 (패널 내부, 아래쪽에 위치)
        const descriptionText = this.scene.add
            .text(0, -40, "", { fontSize: "14px", color: "#fff" })
            .setOrigin(0.5)
        panel.add(descriptionText)

        const attributeText = this.scene.add
            .text(0, 20, "", { fontSize: "14px", color: "#fff", lineSpacing: 1 })
            .setOrigin(0.5)
        panel.add(attributeText)

        const mixesContainer = this.scene.add.container(0, 80)
        panel.add(mixesContainer)

        const selectText = this.scene.add
            .text(0, 100, "", { fontSize: "14px", color: "#fff" })
            .setOrigin(0.5)
            .setInteractive()
        panel.add(selectText)

        // 무기 이미지를 배열에 저장할 변수
        const weaponImages: Phaser.GameObjects.Image[] = []
        const weaponsPerRow = 4
        const spacingX = 150
        const spacingY = 150
        const startX = -((weaponsPerRow - 1) * spacingX) / 2
        const startY = -125

        // 함수: 선택된 무기에 border 추가, 미선택 무기의 border 제거
        const updateWeaponSelectionBorder = (weapon: Weapon | undefined, index: number) => {
            // 무기 설명 업데이트: weaponDescriptions 객체에서 해당 무기의 이름을 키로 사용
            const description = weapon?.description || "설명이 없습니다."
            descriptionText.setText(description)

            if (weapon) {
                let attributes = ``
                if (weapon.damage) attributes += `데미지: ${weapon.damage}\n`
                if (weapon.range) attributes += `공격거리: ${weapon.range}\n`
                if (weapon.splash) attributes += `스플래쉬: ${weapon.splash}\n`
                if (weapon.cooltime) attributes += `쿨타임: ${weapon.cooltime / 1000}초\n`
                if (weapon.targetLength) attributes += `공격갯수: ${weapon.targetLength}개\n`
                if (weapon.stun) attributes += `스턴: ${weapon.stun}초\n`
                if (weapon.slow) attributes += `슬로우: ${weapon.slow}%\n`

                attributeText.setVisible(true).setText(attributes)
                const gap = 150
                weapon.nexts.forEach((next, index) => {
                    const mixesText = this.scene.add
                        .text(
                            gap * index - ((weapon.nexts.length - 1) * gap) / 2,
                            0,
                            `${next.name} 조합`,
                            {
                                fontSize: "11px",
                                color: "#fff",
                                lineSpacing: 1,
                            }
                        )
                        .setOrigin(0.5)
                    mixesContainer.add(mixesText)

                    let materialsText = ``
                    next.materials.forEach((material) => {
                        materialsText += `${material.name} ${material.length}개 \n`
                    })
                    const mixesText2 = this.scene.add
                        .text(
                            gap * index - ((weapon.nexts.length - 1) * gap) / 2,
                            10,
                            materialsText,
                            {
                                fontSize: "11px",
                                color: "#fff",
                                lineSpacing: 1,
                            }
                        )
                        .setOrigin(0.5, 0)
                    mixesContainer.add(mixesText2)
                })
                selectText.setVisible(false)
                selectText.removeAllListeners("pointerdown")
            } else {
                mixesContainer.list.forEach((item) => item.destroy())
                mixesContainer.list.forEach((item) => item.destroy())
                mixesContainer.list.forEach((item) => item.destroy())
                attributeText.setVisible(false)
                const needLength = index * 4
                selectText
                    .setVisible(true)
                    .setText(`뽑기(재료 ${needLength}개 필요)`)
                    .on("pointerdown", () => {
                        const totalLength = Object.values(materials)
                            .map(({ length }) => length)
                            .reduce((acc, current) => acc + current, 0)

                        if (totalLength >= needLength) {
                            if (index === 1) weapons.addWeapon(index, Knife.of())
                            if (index === 2) weapons.addWeapon(index, Wand.of())
                            if (index === 3) weapons.addWeapon(index, Ring.of())

                            let doneCount = 0
                            while (doneCount < needLength) {
                                const randomIndex = Phaser.Math.Between(0, 7)
                                const selectedMaterialKey = Object.keys(materials)[
                                    randomIndex
                                ] as Material["name"]

                                if (materials[selectedMaterialKey].length > 0) {
                                    materials[selectedMaterialKey].length =
                                        materials[selectedMaterialKey].length - 1
                                    doneCount++
                                }
                            }
                        }
                    })
            }

            weaponImages.forEach((img, i) => {
                if (i === selectedIndex) {
                    if (!img.getData("border")) {
                        const border = this.scene.add.graphics()
                        border.lineStyle(1, 0xffff00, 1) // 노란색 border, 4px 두께
                        border.strokeRect(
                            img.x - (img.displayWidth + 10) / 2,
                            img.y - (img.displayHeight + 10) / 2,
                            img.displayWidth + 10,
                            img.displayHeight + 10
                        )
                        img.setData("border", border)
                        panel.add(border)
                    }
                } else {
                    const existingBorder = img.getData("border") as Phaser.GameObjects.Graphics
                    if (existingBorder) {
                        existingBorder.destroy()
                        img.setData("border", null)
                    }
                }
            })
        }

        weapons.weapons.forEach((weapon, index) => {
            const row = Math.floor(index / weaponsPerRow)
            const col = index % weaponsPerRow
            const x = startX + col * spacingX
            const y = startY + row * spacingY
            const weaponImage = this.scene.add
                .image(x, y, weapon?.name ?? "")
                .setScale(0.5)
                .setInteractive()
            panel.add(weaponImage)
            weaponImages.push(weaponImage)

            const weaponText = this.scene.add
                .text(x, y + 40, `${weapon?.name ?? `????`}`, {
                    fontSize: "14px",
                    color: "#fff",
                })
                .setOrigin(0.5)
            panel.add(weaponText)

            // 무기 이미지 클릭 시 처리: 선택된 무기에 border를 추가하고 설명 업데이트
            weaponImage.on("pointerdown", () => {
                if (selectedIndex === index) return
                selectedIndex = index
                updateWeaponSelectionBorder(weapon, index)
            })
        })
        updateWeaponSelectionBorder(weapons.weapons[selectedIndex], selectedIndex)

        // 오버레이에 클릭 이벤트: 패널 외부 클릭 시 UI 제거 및 게임 재개
        overlay.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            const panelLeft = 400 - 350
            const panelRight = 400 + 350
            const panelTop = 300 - 250
            const panelBottom = 300 + 250
            if (
                pointer.x < panelLeft ||
                pointer.x > panelRight ||
                pointer.y < panelTop ||
                pointer.y > panelBottom
            ) {
                panel.destroy()
                overlay.destroy()
                this.scene.physics.resume()
                this.scene.data.set("paused", false)
            }
        })
    }
}
