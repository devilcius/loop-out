import { useNavigate } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import type { TemporalOrientation } from '../domain/types'
import { useSessionContext } from '../state/useSessionContext'

export function TemporalOrientationPage() {
  const navigate = useNavigate()
  const { setTemporalOrientation, goToStep } = useSessionContext()

  const handleSelect = (value: TemporalOrientation) => {
    setTemporalOrientation(value)
    goToStep(4)
    navigate(stepPathByNumber[4])
  }

  return (
    <ScreenShell
      title={i18n.pages.temporalOrientation.title}
      headerTop={<img className="temporalidad-image" src="/img/temporalidad.png" alt={i18n.app.temporalityImageAlt} />}
    >
      <div className="stack">
        <button className="primary-button" onClick={() => handleSelect('past')}>
          {i18n.pages.temporalOrientation.past}
        </button>
        <button className="secondary-button" onClick={() => handleSelect('future')}>
          {i18n.pages.temporalOrientation.future}
        </button>
      </div>
    </ScreenShell>
  )
}
