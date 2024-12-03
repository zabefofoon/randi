<template>
    <div class="embla">
        <slot
            :index="currentIndex"
            name="cover"></slot>
        <div
            ref="emblaRef"
            class="embla-viewport"
            :style="{
                height: vertical ? '100%' : 'auto',
            }"
            @mousedown.stop
            @touchstart.stop.passive>
            <div
                ref="emblaContainer"
                class="embla-container"
                :style="{
                    flexDirection: vertical ? 'column' : 'row',
                    height: vertical ? `100%` : 'auto',
                    marginLeft: `-${gap}`,
                }">
                <slot :perview="perview" />
            </div>
        </div>
        <div class="embla-controls">
            <div
                v-if="useDots"
                ref="dotsNode"
                class="embla-dots"></div>
            <div
                v-if="useCounter"
                ref="counterNode"
                class="embla-selected-snap-display"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Autoplay, { type AutoplayType } from "embla-carousel-autoplay"
    import emblaCarouselVue from "embla-carousel-vue"
    import { CAROUSEL_AUTOPLAY_DELAY } from "~/const"

    const props = withDefaults(
        defineProps<{
            gap?: string
            perview?: number | "auto"
            loop?: boolean
            dragFree?: boolean
            startIndex?: number
            autoplay?: boolean
            useDots?: boolean
            useCounter?: boolean
            vertical?: boolean
        }>(),
        {
            gap: "0px",
            perview: 1,
            startIndex: 0,
        }
    )

    const emit = defineEmits<{
        (e: "change", index: number): void
    }>()

    // CarouselSlide 내부에서 스타일을 조정하기 위한 provide
    provide("perview", props.perview)
    provide("startIndex", props.startIndex)
    provide("gap", props.gap)

    const dotsNode = ref<HTMLDivElement>()
    const counterNode = ref<HTMLDivElement>()
    const currentIndex = ref(0)

    const getPlugins = (): AutoplayType[] => {
        const result: AutoplayType[] = []

        if (props.autoplay)
            result.push(
                Autoplay({
                    stopOnInteraction: false,
                    delay: CAROUSEL_AUTOPLAY_DELAY,
                })
            )

        return result
    }
    const [emblaRef, emblaApi] = emblaCarouselVue(
        {
            loop: props.loop,
            dragFree: props.dragFree,
            startIndex: props.startIndex,
            axis: props.vertical ? "y" : "x",
        },
        getPlugins()
    )

    const setCurrentIndex = (value = 0): void => {
        currentIndex.value = value
    }

    const addDotBtnsAndClickHandlers = (dotsNode: HTMLElement): (() => string) => {
        let dotNodes: HTMLElement[] = []

        const addDotBtnsWithClickHandlers = (): void => {
            dotsNode.innerHTML = emblaApi
                .value!.scrollSnapList()
                .map(() => '<button class="embla-dot" type="button"></button>')
                .join("")

            const scrollTo = (index: number): void => emblaApi.value?.scrollTo(index)

            dotNodes = Array.from(dotsNode.querySelectorAll(".embla-dot"))
            dotNodes.forEach((dotNode, index) =>
                dotNode.addEventListener("click", () => scrollTo(index), false)
            )
        }

        const toggleDotBtnsActive = (): void => {
            const previous = emblaApi.value!.previousScrollSnap()
            const selected = emblaApi.value!.selectedScrollSnap()
            if (dotNodes[previous] && dotNodes[selected]) {
                dotNodes[previous].classList.remove("embla-dot-selected")
                dotNodes[selected].classList.add("embla-dot-selected")
            }
        }

        emblaApi.value
            ?.on("init", addDotBtnsWithClickHandlers)
            .on("reInit", addDotBtnsWithClickHandlers)
            .on("init", toggleDotBtnsActive)
            .on("reInit", toggleDotBtnsActive)
            .on("select", toggleDotBtnsActive)

        return () => (dotsNode.innerHTML = "")
    }

    const updateSelectedSnapDisplay = (snapDisplay: HTMLElement) => {
        const updateSnapDisplay = (): void => {
            const selectedSnap = emblaApi.value!.selectedScrollSnap()
            const snapCount = emblaApi.value!.scrollSnapList().length
            snapDisplay.innerHTML = `${selectedSnap + 1} / ${snapCount}`
        }

        emblaApi.value!.on("select", updateSnapDisplay).on("reInit", updateSnapDisplay)
        updateSnapDisplay()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (): any =>
            emblaApi.value!.off("select", updateSnapDisplay).off("reInit", updateSnapDisplay)
    }

    const trackPos = ref<string>("")

    onMounted(() => {
        if (props.useDots) addDotBtnsAndClickHandlers(dotsNode.value!)
        if (props.useCounter) updateSelectedSnapDisplay(counterNode.value!)

        toValue(emblaApi)?.on("select", (event) => {
            const index = event.selectedScrollSnap() || 0
            emit("change", index)
            setCurrentIndex(index)
        })

        toValue(emblaApi)?.on("scroll", () => {
            const el = emblaRef.value?.getElementsByClassName(
                "embla-container"
            )[0] as HTMLDivElement

            if (el) trackPos.value = el.style.transform
        })
    })

    onBeforeUnmount(() => {
        const el = emblaRef.value?.getElementsByClassName("embla-container")[0] as HTMLDivElement
        if (el) el.style.transform = trackPos.value
    })

    defineExpose({
        emblaApi,
        emblaRef,
    })

    watch(
        () => props.startIndex,
        (index) => emblaApi.value?.scrollTo(index || 0)
    )

    watch(
        () => [props.useDots, dotsNode.value],
        () => {
            if (props.useDots && dotsNode.value) {
                addDotBtnsAndClickHandlers(dotsNode.value)
            }
        }
    )
</script>
