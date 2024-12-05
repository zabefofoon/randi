<template>
    <span>
        {{ leftMinutes + ":" + leftSeconds }}
    </span>
</template>

<script setup lang="ts">
    const timeLeft = ref(0)

    let stopwatchTimer: NodeJS.Timeout

    const props = defineProps<{
        seconds?: number
    }>()

    const emit = defineEmits<{
        (e: "expired"): void
        (e: "update", leftSeconds: number): void
    }>()

    onMounted(() => {
        if (props.seconds != null) {
            timeLeft.value = Math.floor(props.seconds)
        }

        stopwatchTimer = setInterval(() => stopwatchUpdateHandler(), 1000)
    })

    onBeforeUnmount(() => {
        clearInterval(stopwatchTimer)
    })

    const stopwatchUpdateHandler = (): void => {
        emit("update", timeLeft.value)
        timeLeft.value -= 1

        if (timeLeft.value == 0) {
            clearInterval(stopwatchTimer)
            emit("expired")
            return
        }
    }

    const leftMinutes = computed<string>(() => {
        return Math.floor(timeLeft.value / 60).toString()
    })

    const leftSeconds = computed<string>(() => {
        return stringUtil.toPaddedNumber(Math.floor(timeLeft.value % 60))
    })
</script>
