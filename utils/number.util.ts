export default {
    clipDecimals(value: number, decimal = 1): number {
        const roundTo = Math.pow(10, decimal)
        return Math.floor(value * roundTo) / roundTo
    },
    clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(min, value), max)
    },
}
