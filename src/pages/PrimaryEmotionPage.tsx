import { useNavigate } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { emotionOptions, stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function PrimaryEmotionPage() {
  const navigate = useNavigate()
  const { currentSession, setPrimaryEmotion, goToStep } = useSessionContext()

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
      <div className="option-grid" role="radiogroup" aria-label={i18n.pages.primaryEmotion.radioAriaLabel}>
        {emotionOptions.map((emotion) => {
          const isSelected = currentSession.primaryEmotion === emotion

          return (
            <button
              key={emotion}
              className={isSelected ? 'option-button is-selected' : 'option-button'}
              onClick={() => {
                setPrimaryEmotion(emotion)
                goToStep(5)
                navigate(stepPathByNumber[5])
              }}
            >
              {emotion}
            </button>
          )
        })}
      </div>
    </ScreenShell>
  )
}
