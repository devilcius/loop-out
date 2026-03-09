import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IntensitySlider } from '../components/IntensitySlider'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function EstimationPage() {
  const navigate = useNavigate()
  const { currentSession, setInitialIntensity, goToStep } = useSessionContext()
  const [intensity, setIntensity] = useState<number>(currentSession.initialIntensity ?? 3)

  return (
    <ScreenShell title={i18n.pages.estimation.title}>
      <div className="stack">
        <IntensitySlider value={intensity} onChange={setIntensity} />
        <button
          className="primary-button"
          onClick={() => {
            setInitialIntensity(intensity)
            goToStep(3)
            navigate(stepPathByNumber[3])
          }}
        >
          {i18n.common.continue}
        </button>
        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[1])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
