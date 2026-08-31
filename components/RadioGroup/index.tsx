import { useLayoutEffect, useState } from 'react'
import type { UIScale } from '@/constant'
import { DEFAULT_UI_SCALE, MAX_UI_SCALE, MIN_UI_SCALE, UI_SCALE_STEP, normalizeUIScale } from '@/constant'
import './index.less'

interface RadioGroupProps {
  onChange: (scale: UIScale) => void
}

export default function RadioGroup(props: RadioGroupProps) {
  const { onChange } = props
  const [scale, setScale] = useState<UIScale>(DEFAULT_UI_SCALE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextScale = normalizeUIScale(event.target.valueAsNumber)
    setScale(nextScale)
    onChange(nextScale)
  }

  useLayoutEffect(() => {
    void (async () => {
      const savedScale = await storage.getItem('local:UISize')
      setScale(normalizeUIScale(savedScale))
    })()
  }, [])

  return (
    <div className="scale-control">
      <div className="scale-value" aria-live="polite">
        <span>50%</span>
        <strong>{`${Math.round(scale * 100)}%`}</strong>
        <span>250%</span>
      </div>
      <input
        className="scale-slider"
        type="range"
        min={MIN_UI_SCALE}
        max={MAX_UI_SCALE}
        step={UI_SCALE_STEP}
        value={scale}
        aria-label="SC UI 缩放比例"
        aria-valuetext={`${Math.round(scale * 100)}%`}
        onChange={handleChange}
      />
      <div className="scale-presets">
        {[0.8, 1, 1.5, 2, 2.5].map(preset => (
          <button
            key={preset}
            type="button"
            className={scale === preset ? 'active' : ''}
            onClick={() => {
              setScale(preset)
              onChange(preset)
            }}
          >
            {`${Math.round(preset * 100)}%`}
          </button>
        ))}
      </div>
    </div>
  )
}
