import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepGuard } from '../StepGuard'
import { SessionContext } from '../../state/sessionContextObject'
import type { SessionContextValue } from '../../state/sessionTypes'
import { createInitialSession } from '../../storage/localPersistence'

function makeContextValue(overrides: Partial<SessionContextValue> = {}): SessionContextValue {
  return {
    currentSession: createInitialSession(),
    attemptsHistory: [],
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
    ...overrides,
  }
}

describe('StepGuard', () => {
  it('redirects to highest accessible step when current step is blocked', () => {
    const contextValue = makeContextValue()

    render(
      <SessionContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/evaluation']}>
          <Routes>
            <Route
              path="/evaluation"
              element={
                <StepGuard step={11}>
                  <div>Evaluation page</div>
                </StepGuard>
              }
            />
            <Route path="/estimation" element={<div>Estimation page</div>} />
          </Routes>
        </MemoryRouter>
      </SessionContext.Provider>,
    )

    expect(screen.getByText('Estimation page')).toBeInTheDocument()
    expect(screen.queryByText('Evaluation page')).not.toBeInTheDocument()
  })

  it('renders protected content when the step is accessible', () => {
    const contextValue = makeContextValue({
      currentSession: {
        ...createInitialSession(),
        initialIntensity: 4,
        temporalOrientation: 'future',
        primaryEmotion: 'Ansiedad',
        relatedFeelings: ['Inquietud'],
        notificationOpened: 'no',
        selectedInterventions: ['breathe'],
        activeIntervention: 'breathe',
        interventionReady: true,
      },
    })

    render(
      <SessionContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/evaluation']}>
          <Routes>
            <Route
              path="/evaluation"
              element={
                <StepGuard step={11}>
                  <div>Evaluation page</div>
                </StepGuard>
              }
            />
            <Route path="/estimation" element={<div>Estimation page</div>} />
          </Routes>
        </MemoryRouter>
      </SessionContext.Provider>,
    )

    expect(screen.getByText('Evaluation page')).toBeInTheDocument()
    expect(screen.queryByText('Estimation page')).not.toBeInTheDocument()
  })
})
