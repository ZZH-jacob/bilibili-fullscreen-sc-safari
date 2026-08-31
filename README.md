# B站助手（Chrome / Safari）

> 本项目 fork 自 [eeelester/bilibili-fullscreen-sc](https://github.com/eeelester/bilibili-fullscreen-sc)，原作者为 [elester](https://github.com/eeelester)，遵循 MIT 协议。
>
> 本 fork 由 ZZH 维护，在原项目基础上新增了 macOS Safari 浏览器适配，并把 SC 面板的 UI 大小改为无级调节。

功能如下：

- 在bilibili网页上看全屏/网页全屏时直播时能够控制是否显示醒目留言（SC）
- 评论区显示IP属地（来源于[Web-Show-IP-Location](https://github.com/maxchang3/Bilibili-Web-Show-IP-Location) ）

## 安装

### Safari（macOS）

Safari 版本要求：15.4 或更高版本。评论区 IP 属地脚本会由隔离的内容脚本注入页面主世界，不依赖 Safari 不支持的 `content_scripts.world` 字段。

先安装依赖并生成 Safari 构建产物：

```bash
pnpm install
pnpm build:safari
```

构建目录为 `.output/safari-mv3`。

#### 临时安装（调试最快）

1. 打开 Safari → 设置 → 高级，启用“显示网页开发者功能”。
2. 打开 Safari → 设置 → 开发者，启用“允许未签名的扩展”。
3. 在同一页面点击“添加临时扩展…”，选择 `.output/safari-mv3` 文件夹。
4. 在 Safari → 设置 → 扩展中启用“B站助手”，并允许访问 bilibili.com。
5. 刷新已经打开的 B 站页面。

Safari 会在退出浏览器或 24 小时后移除临时扩展，需要重新添加。

#### 生成可长期运行的 Xcode 工程

需要安装完整的 Xcode，然后运行：

```bash
pnpm package:safari
```

命令会在 `.output/safari-app` 下生成 macOS App 与 Safari Web Extension 工程，并执行一次无签名编译检查。用 Xcode 打开生成的 `.xcodeproj`，选择 `BilibiliFullscreenSC` Scheme 并运行一次；随后前往 Safari → 设置 → 扩展启用插件，并允许访问 bilibili.com。

如果没有 Apple Developer 证书，还需要在 Safari → 设置 → 开发者中重新启用“允许未签名的扩展”。该选项会在退出 Safari 后重置。

### Chrome 应用商店

打开 Chrome 浏览器

- 输入 https://chromewebstore.google.com/ ，搜索：B站助手，全屏显示SC，评论显示IP属地
- 添加到 Chrome 即可

---

### Chrome 本地安装

```bash
git clone
cd bilibili-fullscreen-sc
pnpm install
pnpm build
```

打开 Chrome 浏览器，输入

- chrome://extensions

点击左上角“加载已解压的扩展程序”按钮，选择 `.output/chrome-*` 文件夹即可（使用页面需要刷新才能生效）。

---

### 本 fork 的改动

- 新增 macOS Safari 适配：`pnpm build:safari` / `pnpm package:safari`，以及 `browser_specific_settings.safari` 的最低版本声明。
- IP 属地脚本改为由隔离内容脚本（`entrypoints/ipLocation.content.ts`）注入主世界，替代 Safari 不支持的 `content_scripts.world: 'MAIN'`。
- SC 面板的 UI 大小从「大/中/小」三档改为 50%–250% 无级滑杆调节，并兼容旧的三档存档值。

---

### 感谢

#### 原项目： [eeelester/bilibili-fullscreen-sc](https://github.com/eeelester/bilibili-fullscreen-sc)

#### 评论显示IP属地使用的是： [Web-Show-IP-Location](https://github.com/maxchang3/Bilibili-Web-Show-IP-Location)
