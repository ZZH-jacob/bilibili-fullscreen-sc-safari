import { defineConfig } from 'wxt'
import { replacePublicAsset } from './replace-public-asset'

const BILIBILI_MATCHES = ['https://*.bilibili.com/*']

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ browser }) => ({
    name: 'B站助手，全屏显示SC，评论显示IP属地',
    permissions: ['storage', 'tabs'],
    host_permissions: ['*://*.bilibili.com/*'],
    web_accessible_resources: [
      {
        resources: ['bilibili-web-show-ip-location.user.js'],
        matches: BILIBILI_MATCHES,
      },
      {
        resources: ['content-scripts/fullScreen.css'],
        matches: ['https://live.bilibili.com/*'],
      },
    ],
    browser_specific_settings: browser === 'safari'
      ? {
        safari: {
          strict_min_version: '15.4',
        },
      }
      : undefined,
    icons: {
      16: 'icons/icon-16.png',
      32: 'icons/icon-32.png',
      48: 'icons/icon-48.png',
    },
  }),
  webExt: {
    startUrls: ['https://live.bilibili.com/7777'],
  },
  hooks: {
    build: {
      publicAssets(_, files) {
        replacePublicAsset(files, {
          filename: 'bilibili-web-show-ip-location.user.js',
          regex: /\bunsafeWindow\b/g,
          replacement: 'window',
        })
      },
    },
  },
})
