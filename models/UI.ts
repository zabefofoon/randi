export interface Snackbar {
    type: "success" | "info" | "warn" | "error"
    message?: string
}

export type Direction = "LEFT" | "TOP" | "RIGHT" | "BOTTOM" | "CENTER"
export interface Position {
    x: Direction
    y: Direction
}
