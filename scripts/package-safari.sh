#!/bin/sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
EXTENSION_DIR="$ROOT_DIR/.output/safari-mv3"
PROJECT_DIR="${SAFARI_PROJECT_DIR:-$ROOT_DIR/.output/safari-app}"

if [ ! -f "$EXTENSION_DIR/manifest.json" ]; then
  echo "未找到 Safari 构建产物：$EXTENSION_DIR" >&2
  echo "请先运行 pnpm build:safari。" >&2
  exit 1
fi

if xcrun --find safari-web-extension-packager >/dev/null 2>&1; then
  PACKAGER=safari-web-extension-packager
elif xcrun --find safari-web-extension-converter >/dev/null 2>&1; then
  PACKAGER=safari-web-extension-converter
else
  echo "未找到 Safari Web Extension 打包工具，请先安装完整的 Xcode。" >&2
  exit 1
fi

rm -rf "$PROJECT_DIR/BilibiliFullscreenSC"

xcrun "$PACKAGER" "$EXTENSION_DIR" \
  --project-location "$PROJECT_DIR" \
  --app-name "BilibiliFullscreenSC" \
  --bundle-identifier "com.local.BilibiliFullscreenSC" \
  --swift \
  --macos-only \
  --copy-resources \
  --no-open \
  --no-prompt \
  --force

PROJECT_FILE="$PROJECT_DIR/BilibiliFullscreenSC/BilibiliFullscreenSC.xcodeproj"
if [ -d "$PROJECT_FILE" ]; then
  echo "Safari Xcode 工程已生成：$PROJECT_FILE"

  SCHEME=$(basename "$PROJECT_FILE" .xcodeproj)
  xcodebuild \
    -quiet \
    -project "$PROJECT_FILE" \
    -scheme "$SCHEME" \
    -configuration Debug \
    -derivedDataPath "$ROOT_DIR/.output/safari-derived-data" \
    CODE_SIGNING_ALLOWED=NO \
    build
  echo "Safari macOS App 已通过无签名编译验证。"
else
  echo "Safari 打包工具未生成预期的 Xcode 工程：$PROJECT_FILE" >&2
  exit 1
fi