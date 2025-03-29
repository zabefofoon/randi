import { gsap } from "gsap"
import ScrollMagic from "scrollmagic"
// 아래를 추가!
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import "scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js"
ScrollMagicPluginGsap(ScrollMagic, gsap)

// defineNuxtPlugin으로 플러그인 정의
export default defineNuxtPlugin(() => {
  // 원한다면, nuxt 전역 주입
  return {
    provide: {
      gsap,
      scrollMagic: ScrollMagic,
    },
  }
})
