import { hasMountElement, mount, unmount } from './utils'
import ObservePageFullScreen from './observePageFullScreen'
import { processPosition, processSize } from '@/utils'
import type { PositionEnum, UIScale } from '@/constant'

interface BrowserMessage {
  size?: UIScale
  position?: PositionEnum
}

const fullScreenContentScript = defineContentScript({
  matches: ['https://live.bilibili.com/*'],
  main() {
    // 监听全屏模式
    document.addEventListener(
      'fullscreenchange',
      () => {
        // 从全屏变为非全屏
        if (!document.fullscreenElement && hasMountElement()) {
          unmount('------全屏退出，清除完毕------')
          return
        }

        mount('------进入全屏，bilibili-fullscreen-sc启动------')
      },
      true,
    )

    // 监听网页全屏模式
    ObservePageFullScreen()

    browser.runtime.onMessage.addListener((message: unknown) => {
      const msg = message as BrowserMessage
      if (typeof msg.size === 'number')
        processSize(msg.size)

      if (msg.position)
        processPosition(msg.position)
    })
  },
})

export default fullScreenContentScript
