import { Link } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { formatIntervention, formatOrientation } from '../domain/formatters'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

const CHART_WIDTH = 320
const CHART_HEIGHT = 180
const CHART_PADDING_X = 28
const CHART_PADDING_Y = 18
const DELTA_MIN = -4
const DELTA_MAX = 4

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getChartX(index: number, total: number) {
  if (total === 1) {
    return CHART_WIDTH / 2
  }

  const usableWidth = CHART_WIDTH - CHART_PADDING_X * 2
  return CHART_PADDING_X + (usableWidth * index) / (total - 1)
}

function getChartY(delta: number) {
  const usableHeight = CHART_HEIGHT - CHART_PADDING_Y * 2
  const normalized = (DELTA_MAX - delta) / (DELTA_MAX - DELTA_MIN)

  return CHART_PADDING_Y + normalized * usableHeight
}

function buildDeltaPath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
}

function formatAverage(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function getTrendScore(deltas: number[]) {
  if (deltas.length === 0) {
    return 50
  }

  const weightedTotal = deltas.reduce((sum, delta, index) => {
    return sum + delta * (index + 1)
  }, 0)
  const totalWeight = deltas.reduce((sum, _delta, index) => {
    return sum + index + 1
  }, 0)
  const weightedAverageDelta = weightedTotal / totalWeight

  return Math.round(clamp(50 - weightedAverageDelta * 12.5, 0, 100))
}

function getTrendLabel(score: number) {
  if (score >= 67) {
    return i18n.pages.history.scorePositiveLabel
  }

  if (score >= 45) {
    return i18n.pages.history.scoreStableLabel
  }

  return i18n.pages.history.scoreNeedsCareLabel
}

export function HistoryPage() {
  const { attemptsHistory } = useSessionContext()
  const hasAttempts = attemptsHistory.length > 0
  const totalReduction = attemptsHistory.reduce((sum, attempt) => {
    return sum + (attempt.initialIntensity - attempt.finalIntensity)
  }, 0)
  const averageReduction = hasAttempts ? totalReduction / attemptsHistory.length : 0
  const improvedAttempts = attemptsHistory.filter((attempt) => {
    return attempt.finalIntensity < attempt.initialIntensity
  }).length
  const deltas = attemptsHistory.map((attempt) => attempt.finalIntensity - attempt.initialIntensity)
  const trendScore = getTrendScore(deltas)
  const trendLabel = getTrendLabel(trendScore)
  const chartPoints = attemptsHistory.map((attempt, index) => {
    const delta = attempt.finalIntensity - attempt.initialIntensity

    return {
      id: attempt.id,
      delta,
      x: getChartX(index, attemptsHistory.length),
      y: getChartY(delta),
    }
  })
  const baselineY = getChartY(0)

  return (
    <ScreenShell title={i18n.pages.history.title} subtitle={i18n.pages.history.subtitle}>
      <div className="stack">
        {!hasAttempts ? (
          <RichText className="summary-text" html={i18n.pages.history.empty} />
        ) : (
          <>
            <section className="history-overview" aria-labelledby="history-progress-title">

              <section className="history-score-card" aria-label={i18n.pages.history.scoreCardLabel}>
                <div>
                  <p className="history-score-eyebrow">{i18n.pages.history.scoreEyebrow}</p>
                  <div className="history-score-main">
                    <strong className="history-score-value">{trendScore}</strong>
                    <span className="history-score-scale">{i18n.pages.history.scoreOutOfLabel}</span>
                  </div>
                  <p className="history-score-label">{trendLabel}</p>
                </div>
                <div className="history-score-meter" aria-hidden="true">
                  <div className="history-score-meter-track">
                    <div className="history-score-meter-fill" style={{ width: `${trendScore}%` }} />
                  </div>
                  <div className="history-score-meter-scale">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </section>

              <div className="history-metrics" aria-label={i18n.pages.history.metricsLabel}>
                <article className="history-metric-card">
                  <strong>{attemptsHistory.length}</strong>
                  <span>{i18n.pages.history.totalAttemptsLabel}</span>
                </article>
                <article className="history-metric-card">
                  <strong>{improvedAttempts}</strong>
                  <span>{i18n.pages.history.improvedAttemptsLabel}</span>
                </article>
                <article className="history-metric-card">
                  <strong>{formatAverage(averageReduction)}</strong>
                  <span>{i18n.pages.history.averageReductionLabel}</span>
                </article>
              </div>

              <div className="history-chart-card">
                <svg
                  className="history-chart"
                  viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                  role="img"
                  aria-label={i18n.pages.history.chartAriaLabel}
                >
                  <line
                    className="history-chart-baseline"
                    x1={CHART_PADDING_X}
                    y1={baselineY}
                    x2={CHART_WIDTH - CHART_PADDING_X}
                    y2={baselineY}
                  />
                  {[-4, -2, 0, 2, 4].map((level) => (
                    <g key={level}>
                      <line
                        className="history-chart-grid"
                        x1={CHART_PADDING_X}
                        y1={getChartY(level)}
                        x2={CHART_WIDTH - CHART_PADDING_X}
                        y2={getChartY(level)}
                      />
                      <text className="history-chart-label" x={10} y={getChartY(level) + 4}>
                        {level > 0 ? `+${level}` : level}
                      </text>
                    </g>
                  ))}

                  <path className="history-chart-line" d={buildDeltaPath(chartPoints)} />

                  {chartPoints.map((point, index) => {
                    return (
                      <g key={point.id}>
                        <line className="history-chart-guide" x1={point.x} y1={baselineY} x2={point.x} y2={point.y} />
                        <circle
                          className={
                            point.delta < 0
                              ? 'history-chart-point history-chart-point-improved'
                              : point.delta > 0
                                ? 'history-chart-point history-chart-point-worsened'
                                : 'history-chart-point history-chart-point-neutral'
                          }
                          cx={point.x}
                          cy={point.y}
                          r={4.5}
                        />
                        <text
                          className="history-chart-label history-chart-label-attempt"
                          x={point.x}
                          y={CHART_HEIGHT - 2}
                          textAnchor="middle"
                        >
                          {index + 1}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                <p className="history-chart-caption">
                  {i18n.pages.history.chartCaption}</p>
              </div>
            </section>

            {attemptsHistory.map((attempt) => (
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
            ))}
          </>
        )}

        <Link className="primary-button as-link" to="/">
          {i18n.common.backToStart}
        </Link>
      </div>
    </ScreenShell>
  )
}
