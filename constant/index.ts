const WS_SC_EVENT = 'ws_sc_change'
const SIZE_EVENT = 'sc-resize'

type UIScale = number

const MIN_UI_SCALE = 0.5
const MAX_UI_SCALE = 2.5
const UI_SCALE_STEP = 0.05
const DEFAULT_UI_SCALE = 1

const LEGACY_UI_SCALE: Record<string, UIScale> = {
  min: 0.8,
  medium: 1,
  max: 1.2,
}

function normalizeUIScale(value: unknown): UIScale {
  const scale = typeof value === 'string' ? LEGACY_UI_SCALE[value] : value
  if (typeof scale !== 'number' || !Number.isFinite(scale))
    return DEFAULT_UI_SCALE

  const clampedScale = Math.min(MAX_UI_SCALE, Math.max(MIN_UI_SCALE, scale))
  return Number((Math.round(clampedScale / UI_SCALE_STEP) * UI_SCALE_STEP).toFixed(2))
}

// 定义位置事件名称
const POSITION_EVENT = 'position-change'

// 定义位置枚举
enum PositionEnum {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export {
  WS_SC_EVENT,
  SIZE_EVENT,
  MIN_UI_SCALE,
  MAX_UI_SCALE,
  UI_SCALE_STEP,
  DEFAULT_UI_SCALE,
  normalizeUIScale,
  POSITION_EVENT,
  PositionEnum,
}
export type { UIScale }
