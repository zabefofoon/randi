export interface Snackbar {
  type: "success" | "info" | "warn" | "error"
  message?: string
}

export type Direction = "LEFT" | "TOP" | "RIGHT" | "BOTTOM"
export interface Position {
  x: "LEFT" | "RIGHT"
  y: "TOP" | "BOTTOM"
}

export interface Coordinates {
  x: number
  y: number
}

export type MusicStatus = "play" | "pause" | "end"

export interface PlayableMusic {
  isrc: string
  music: string
  thumbnail?: string
  name?: string
}

export type StepTutorial = "move" | "gacha" | "weapon" | "stat" | "skill" | "start"
