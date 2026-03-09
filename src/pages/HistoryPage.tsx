import { Link } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { formatIntervention, formatOrientation } from '../domain/formatters'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function HistoryPage() {
  const { attemptsHistory } = useSessionContext()

  return (
    <ScreenShell title={i18n.pages.history.title} subtitle={i18n.pages.history.subtitle}>
      <div className="stack">
        {attemptsHistory.length === 0 ? (
          <RichText className="summary-text" html={i18n.pages.history.empty} />
        ) : (
          attemptsHistory.map((attempt) => (
            <article key={attempt.id} className="history-card">
              <p>
                {i18n.pages.history.orientationLabel} <strong>{formatOrientation(attempt.temporalOrientation)}</strong>
              </p>
              <p>
                {i18n.pages.history.intensityLabel} <strong>{attempt.initialIntensity}</strong> →{' '}
                <strong>{attempt.finalIntensity}</strong>
              </p>
              <p>
                {i18n.pages.history.primaryEmotionLabel} <strong>{attempt.primaryEmotion}</strong>
              </p>
              <p>{i18n.pages.history.relatedFeelingsLabel} {attempt.relatedFeelings.join(', ')}</p>
              <p>{i18n.pages.history.interventionsLabel} {attempt.selectedInterventions.map(formatIntervention).join(' · ')}</p>
            </article>
          ))
        )}

        <Link className="primary-button as-link" to="/">
          {i18n.common.backToStart}
        </Link>
      </div>
    </ScreenShell>
  )
}
