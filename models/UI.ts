export interface Snackbar {
    type: "success" | "info" | "warn" | "error"
    message?: string
}

export type Direction = "LEFT" | "TOP" | "RIGHT" | "BOTTOM" | "CENTER"
export interface Position {
    x: Direction
    y: Direction
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
