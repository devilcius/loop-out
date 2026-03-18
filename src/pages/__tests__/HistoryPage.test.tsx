import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HistoryPage } from '../HistoryPage'
import { SessionContext } from '../../state/sessionContextObject'
import type { SessionContextValue } from '../../state/sessionTypes'
import type { AttemptRecord, CurrentSession } from '../../domain/types'

const baseCurrentSession: CurrentSession = {
  initialIntensity: null,
  temporalOrientation: null,
  primaryEmotion: null,
  relatedFeelings: [],
  notificationOpened: null,
  activeIntervention: null,
  interventionReady: false,
  selectedInterventions: [],
  finalIntensity: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  currentStep: 1,
}

function createAttemptRecord(overrides: Partial<AttemptRecord>): AttemptRecord {
  return {
    id: 'attempt-id',
    initialIntensity: 4,
    finalIntensity: 4,
    temporalOrientation: 'future',
    primaryEmotion: 'Ansiedad',
    relatedFeelings: ['Tensión'],
    selectedInterventions: ['breathe'],
    completedAt: '2026-03-18T10:00:00.000Z',
    ...overrides,
  }
}

function createSessionContextValue(attemptsHistory: AttemptRecord[]): SessionContextValue {
  return {
    currentSession: baseCurrentSession,
    attemptsHistory,
    setInitialIntensity: () => undefined,
    setTemporalOrientation: () => undefined,
    setPrimaryEmotion: () => undefined,
    setRelatedFeelings: () => undefined,
    setNotificationOpened: () => undefined,
    addIntervention: () => undefined,
    markInterventionReady: () => undefined,
    setFinalIntensity: () => undefined,
    goToStep: () => undefined,
    recordAttempt: () => undefined,
    restartSession: () => undefined,
  }
}

function renderHistoryPage(attemptsHistory: AttemptRecord[]) {
  const sessionContextValue = createSessionContextValue(attemptsHistory)

  render(
    <SessionContext.Provider value={sessionContextValue}>
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    </SessionContext.Provider>,
  )
}

describe('HistoryPage', () => {
  it('renders the empty state when there is no history', () => {
    renderHistoryPage([])

    expect(screen.getByText('Todavía no hay intentos guardados.')).toBeInTheDocument()
    expect(screen.queryByLabelText('Puntuación de tendencia reciente')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Gráfico de cambio de intensidad por intento')).not.toBeInTheDocument()
  })

  it('renders a positive trend score and summary metrics for improving attempts', () => {
    renderHistoryPage([
      createAttemptRecord({
        id: 'attempt-1',
        initialIntensity: 5,
        finalIntensity: 3,
      }),
      createAttemptRecord({
        id: 'attempt-2',
        initialIntensity: 4,
        finalIntensity: 2,
        temporalOrientation: 'past',
        primaryEmotion: 'Culpa',
        relatedFeelings: ['Peso'],
        selectedInterventions: ['body-grounding'],
      }),
    ])

    const metrics = screen.getByLabelText('Resumen del progreso')

    expect(screen.getByRole('heading', { name: 'Evolución reciente' })).toBeInTheDocument()
    expect(screen.getByLabelText('Puntuación de tendencia reciente')).toHaveTextContent('75')
    expect(screen.getByText('Tendencia positiva')).toBeInTheDocument()
    expect(screen.getByLabelText('Gráfico de cambio de intensidad por intento')).toBeInTheDocument()
    expect(metrics).toHaveTextContent('2')
    expect(metrics).toHaveTextContent('con menos intensidad')
    expect(metrics).toHaveTextContent('reducción media')
  })

  it('renders a stable trend score when attempts end without intensity changes', () => {
    renderHistoryPage([
      createAttemptRecord({
        id: 'attempt-stable',
        initialIntensity: 3,
        finalIntensity: 3,
      }),
    ])

    expect(screen.getByLabelText('Puntuación de tendencia reciente')).toHaveTextContent('50')
    expect(screen.getByText('Tendencia estable')).toBeInTheDocument()
  })

  it('renders a low trend score when recent attempts finish with more intensity', () => {
    renderHistoryPage([
      createAttemptRecord({
        id: 'attempt-worse-1',
        initialIntensity: 2,
        finalIntensity: 4,
      }),
      createAttemptRecord({
        id: 'attempt-worse-2',
        initialIntensity: 3,
        finalIntensity: 5,
      }),
    ])

    expect(screen.getByLabelText('Puntuación de tendencia reciente')).toHaveTextContent('25')
    expect(screen.getByText('Necesita más intentos')).toBeInTheDocument()
  })
})
