import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IntensitySlider } from '../components/IntensitySlider'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function EvaluationPage() {
  const navigate = useNavigate()
  const { currentSession, setFinalIntensity, goToStep } = useSessionContext()
  const [intensity, setIntensity] = useState<number>(currentSession.finalIntensity ?? 3)

  return (
    <ScreenShell title={i18n.pages.evaluation.title}>
      <div className="stack">
        <IntensitySlider value={intensity} onChange={setIntensity} />
        <button
          className="primary-button"
          onClick={() => {
            setFinalIntensity(intensity)
            goToStep(12)
            navigate(stepPathByNumber[12])
          }}
        >
          {i18n.common.continue}
        </button>
        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[10])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
