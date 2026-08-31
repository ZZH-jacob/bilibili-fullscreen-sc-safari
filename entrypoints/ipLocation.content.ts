import { injectScript } from 'wxt/utils/inject-script'

export default defineContentScript({
  matches: ['https://*.bilibili.com/*'],
  runAt: 'document_start',
  async main() {
    await injectScript('/bilibili-web-show-ip-location.user.js')
  },
})
