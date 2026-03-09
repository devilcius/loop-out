import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { relatedFeelingsOptions, stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function RelatedFeelingsPage() {
  const navigate = useNavigate()
  const { currentSession, setRelatedFeelings, goToStep } = useSessionContext()
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>(currentSession.relatedFeelings)

  const canContinue = useMemo(() => selectedFeelings.length > 0, [selectedFeelings])

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((previous) =>
      previous.includes(feeling)
        ? previous.filter((currentFeeling) => currentFeeling !== feeling)
        : [...previous, feeling],
    )
  }

  return (
    <ScreenShell title={i18n.pages.relatedFeelings.title} subtitle={i18n.pages.relatedFeelings.subtitle}>
      <div className="stack">
        <div className="option-grid" role="group" aria-label={i18n.pages.relatedFeelings.groupAriaLabel}>
          {relatedFeelingsOptions.map((feeling) => {
            const isSelected = selectedFeelings.includes(feeling)

            return (
              <button
                key={feeling}
                className={isSelected ? 'option-button is-selected' : 'option-button'}
                onClick={() => toggleFeeling(feeling)}
              >
                {feeling}
              </button>
            )
          })}
        </div>

        <button
          className="primary-button"
          disabled={!canContinue}
          onClick={() => {
            setRelatedFeelings(selectedFeelings)
            goToStep(6)
            navigate(stepPathByNumber[6])
          }}
        >
          {i18n.common.continue}
        </button>
        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[4])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
