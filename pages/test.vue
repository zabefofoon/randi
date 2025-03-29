<template>
  <div>
    <section>
      <div class="h-[100dvh] | grid place-items-center | text-[80px] font-bold">Section1</div>
      <div
        ref="triggerEl"
        class="h-[300dvh] relative">
        <div class="h-0 sticky top-0 left-0 z-[2]">
          <div
            ref="animateEl"
            class="h-[100dvh] | grid place-items-center | text-[80px] font-bold bg-gray-300 text-white">
            Section2
          </div>
        </div>
        <div
          ref="triggerEl2"
          class="absolute top-[200dvh] z-10">
          trigger
        </div>
        <div class="h-0 sticky top-0 left-0 z-[1]">
          <div
            ref="animateEl2"
            class="w-full h-[100dvh] | grid place-items-center | text-[80px] font-bold | bg-gray-500 text-white">
            Section3
          </div>
        </div>

        <div
          ref="animateEl4"
          class="sticky top-0 left-0 | w-full h-[100dvh] | grid place-items-center | text-[80px] font-bold | bg-black text-white">
          Section4
        </div>
      </div>
    </section>
    <div
      ref="triggerEl4"
      class="absolute top-[600dvh]"></div>
    <section ref="triggerEl3">
      <div
        ref="pinEl"
        class="w-full h-[100dvh] | flex flex-col justify-center items-center | text-[80px] font-bold text-white | bg-blue-500">
        <span ref="animateEl3">Section5</span>
        <span
          ref="animateEl4"
          class="text-[40px]">
          Description
        </span>
      </div>
    </section>
    <section>
      <div class="h-[100dvh] | grid place-items-center | text-[80px] font-bold">Section6</div>
    </section>
  </div>
</template>

<script setup lang="ts">
const nuxt = useNuxtApp()

const animateEl = ref<HTMLDivElement>()
const animateEl2 = ref<HTMLDivElement>()
const animateEl3 = ref<HTMLDivElement>()
const animateEl4 = ref<HTMLDivElement>()
const triggerEl = ref<HTMLDivElement>()
const triggerEl2 = ref<HTMLDivElement>()
const triggerEl3 = ref<HTMLDivElement>()
const triggerEl4 = ref<HTMLDivElement>()
const pinEl = ref<HTMLDivElement>()
onMounted(() => {
  const controller = new nuxt.$scrollMagic.Controller()

  new nuxt.$scrollMagic.Scene({
    triggerElement: triggerEl.value,
    duration: `${window.innerHeight}px`,
    reverse: true,
    triggerHook: 0,
  })
    .setTween(
      nuxt.$gsap.to(animateEl.value, {
        "clip-path": "inset(0 0 100% 0)",
      })
    )
    .addTo(controller)

  new nuxt.$scrollMagic.Scene({
    triggerElement: triggerEl2.value,
    duration: `${window.innerHeight}px`,
    reverse: true,
    triggerHook: 1,
  })
    .setTween(
      nuxt.$gsap.to(animateEl2.value, {
        "clip-path": "inset(0 0 100% 0)",
      })
    )
    .addTo(controller)

  new nuxt.$scrollMagic.Scene({
    triggerElement: triggerEl3.value,
    duration: `${window.innerHeight}px`,
    reverse: true,
    triggerHook: 0,
  })
    .setTween(
      nuxt.$gsap.from(animateEl3.value, {
        transform: "scale(3) translate(0, 100px)",
        filter: "blur(10px)",
        opacity: 0,
      })
    )
    .setPin(pinEl.value)
    .addTo(controller)

  new nuxt.$scrollMagic.Scene({
    triggerElement: triggerEl4.value,
    duration: `${window.innerHeight}px`,
    reverse: true,
    triggerHook: 1,
  })
    .setTween(
      nuxt.$gsap.from(animateEl4.value, {
        opacity: 0,
        transform: "translate(0, 30px)",
      })
    )
    .setPin(pinEl.value)
    .addTo(controller)
})
</script>
