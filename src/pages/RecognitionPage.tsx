import { useNavigate } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { formatIntensityLabel, formatOrientation, formatRelatedFeelingsList } from '../domain/formatters'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function RecognitionPage() {
  const navigate = useNavigate()
  const { currentSession, goToStep } = useSessionContext()

  return (
    <ScreenShell
      title={i18n.pages.recognition.title}
      headerTop={
        <img
          className="temporalidad-image"
          src="/img/reconocimiento.png"
          alt={i18n.app.recognitionImageAlt}
          width="646"
          height="460"
          decoding="async"
        />
      }
    >
      <div className="stack">
        <RichText
          className="summary-text"
          html={i18n.pages.recognition.summary({
            orientation: formatOrientation(currentSession.temporalOrientation),
            intensity: formatIntensityLabel(currentSession.initialIntensity),
            primaryEmotionUpper: currentSession.primaryEmotion?.toUpperCase() ?? '',
            relatedFeelingsLower: formatRelatedFeelingsList(currentSession.relatedFeelings),
          })}
        />

        <RichText className="summary-question" html={i18n.pages.recognition.confirmationQuestion} />

        <button
          className="primary-button"
          onClick={() => {
            goToStep(7)
            navigate(stepPathByNumber[7])
          }}
        >
          {i18n.common.continue}
        </button>

        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[5])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
