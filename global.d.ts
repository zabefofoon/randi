declare global {
  interface Window {
    speed: number
    createjs: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Sound: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebAudioPlugin: any
    }
  }
  interface HTMLElement {
    mozCancelFullScreen?: () => Promise<void>
    mozRequestFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
    webkitFullscreenElement?: Element
  }

  interface ScreenOrientation {
    lock?: (...args: unknown[]) => Promise<void>
  }

  interface Navigator {
    msMaxTouchPoints: number
  }
}

export interface Document extends HTMLDocument {
  mozCancelFullScreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
  webkitExitFullscreen?: () => Promise<void>
  webkitRequestFullscreen?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
}

declare module "*.md"
