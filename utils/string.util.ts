export default {
    attachComma(number?: number): string {
        return (number ?? 0).toLocaleString()
    },
    convertToPercent(number = 0): string {
        return this.attachComma(Math.round(number * 100 * 100) / 100) + "%"
    },

    formatSeconds(seconds: number): string {
        const val = Math.floor(seconds)

        const minutes = Math.floor(val / 60)
        const secondsRemainder = val % 60

        const minutesStr = minutes.toString().padStart(2, "0")
        const secondsStr = secondsRemainder.toString().padStart(2, "0")

        return minutesStr + ":" + secondsStr
    },

    toPaddedNumber(value: number): string {
        if (value < 0 || !Number.isInteger(value)) return ""

        const stringValue: string = value.toString()
        return value < 10 ? stringValue.padStart(2, "0") : stringValue
    },
}
