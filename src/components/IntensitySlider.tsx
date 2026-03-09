import { formatIntensityLabel } from '../domain/formatters'
import { i18n } from '../i18n'

interface IntensitySliderProps {
  value: number
  onChange: (value: number) => void
}

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const imageSource = `/img/intensity-face-${value}.png`
  const intensityLabel = formatIntensityLabel(value)

  return (
    <div className="intensity-slider-wrap">
      <img className="intensity-face-image" src={imageSource} alt={intensityLabel} />
      <input
        className="intensity-slider"
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value))
        }}
        aria-label={i18n.components.intensitySlider.ariaLabel}
      />
      <div className="slider-values" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((level) => (
          <span key={level}>{level}</span>
        ))}
      </div>
      <p className="value-emphasis">{intensityLabel}</p>
    </div>
  )
}
