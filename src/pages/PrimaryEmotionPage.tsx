import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { emotionOptions, stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function PrimaryEmotionPage() {
  const navigate = useNavigate()
  const { currentSession, setPrimaryEmotion, goToStep } = useSessionContext()
  const [selectedEmotion, setSelectedEmotion] = useState(currentSession.primaryEmotion)
  const canContinue = useMemo(() => selectedEmotion !== null, [selectedEmotion])

  return (
    <ScreenShell
      title={i18n.pages.primaryEmotion.title}
      headerTop={
        <img
          className="temporalidad-image"
          src="/img/emocion-principal.png"
          alt={i18n.app.primaryEmotionImageAlt}
          width="994"
          height="728"
          decoding="async"
        />
      }
    >
      <div className="stack">
        <div className="option-grid" role="radiogroup" aria-label={i18n.pages.primaryEmotion.radioAriaLabel}>
          {emotionOptions.map((emotion) => {
            const isSelected = selectedEmotion === emotion

            return (
              <button
                key={emotion}
                className={isSelected ? 'option-button is-selected' : 'option-button'}
                onClick={() => setSelectedEmotion(emotion)}
              >
                {emotion}
              </button>
            )
          })}
        </div>

        <button
          className="primary-button"
          disabled={!canContinue}
          onClick={() => {
            if (selectedEmotion === null) {
              return
            }

            setPrimaryEmotion(selectedEmotion)
            goToStep(5)
            navigate(stepPathByNumber[5])
          }}
        >
          {i18n.common.continue}
        </button>
        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[3])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
