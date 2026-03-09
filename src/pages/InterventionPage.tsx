import { useNavigate } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { interventionContent, stepPathByNumber } from '../domain/content'
import { formatIntensityLabel, formatOrientation, formatRelatedFeelingsList } from '../domain/formatters'
import { i18n } from '../i18n'
import type { InterventionOption } from '../domain/types'
import { useSessionContext } from '../state/useSessionContext'

const options: InterventionOption[] = i18n.domain.interventionOrder

export function InterventionPage() {
  const navigate = useNavigate()
  const { currentSession, addIntervention, goToStep } = useSessionContext()

  const handleSelect = (option: InterventionOption) => {
    addIntervention(option)
    goToStep(10)
    navigate(stepPathByNumber[10])
  }

  return (
    <ScreenShell title={i18n.pages.intervention.title}>
      <div className="stack">
        <RichText
          className="summary-text"
          html={i18n.pages.intervention.summary({
            orientation: formatOrientation(currentSession.temporalOrientation),
            intensity: formatIntensityLabel(currentSession.initialIntensity),
            primaryEmotionUpper: currentSession.primaryEmotion?.toUpperCase() ?? '',
            relatedFeelingsLower: formatRelatedFeelingsList(currentSession.relatedFeelings),
          })}
        />

        <div className="stack">
          {options.map((option) => {
            const content = interventionContent[option]

            return (
              <button key={option} className="intervention-option-button" onClick={() => handleSelect(option)}>
                <strong>{content.title}</strong>
                <span className="intervention-option-cue" aria-hidden="true">
                  →
                </span>
              </button>
            )
          })}
        </div>

        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[8])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
