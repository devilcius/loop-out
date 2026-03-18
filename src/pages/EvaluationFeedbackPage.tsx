import { Navigate, useNavigate } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { getEvaluationFeedback } from '../domain/formatters'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

function getFeedbackImageDimensions(src: string) {
  switch (src) {
    case '/img/feedback-low.png':
      return { width: 421, height: 425 }
    case '/img/feedback-medium.png':
      return { width: 425, height: 405 }
    default:
      return { width: 393, height: 385 }
  }
}

export function EvaluationFeedbackPage() {
  const navigate = useNavigate()
  const { currentSession, recordAttempt } = useSessionContext()

  if (currentSession.finalIntensity === null) {
    return <Navigate to={stepPathByNumber[11]} replace />
  }

  const feedback = getEvaluationFeedback(currentSession.finalIntensity)
  const feedbackImageDimensions = getFeedbackImageDimensions(feedback.imageSrc)

  return (
    <ScreenShell
      headerTop={
        <img
          className="temporalidad-image"
          src={feedback.imageSrc}
          alt={i18n.pages.evaluation.feedbackImageAlt}
          width={feedbackImageDimensions.width}
          height={feedbackImageDimensions.height}
          decoding="async"
        />
      }
    >
      <div className="stack">
        <RichText className="summary-text" html={feedback.text} />
        <button
          className="primary-button"
          onClick={() => {
            recordAttempt()
            navigate(stepPathByNumber[9])
          }}
        >
          {i18n.pages.evaluation.tryAnotherTask}
        </button>
        <button
          className="secondary-button"
          onClick={() => {
            recordAttempt()
            navigate('/', { replace: true, state: { resetSession: true } })
          }}
        >
          {i18n.common.finish}
        </button>
      </div>
    </ScreenShell>
  )
}
