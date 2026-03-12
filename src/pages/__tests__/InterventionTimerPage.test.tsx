import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InterventionTimerPage } from '../InterventionTimerPage'
import { SessionContext } from '../../state/sessionContextObject'
import type { SessionContextValue } from '../../state/sessionTypes'
import { createInitialSession } from '../../storage/localPersistence'
import { i18n } from '../../i18n'

function makeContextValue(overrides: Partial<SessionContextValue> = {}): SessionContextValue {
  return {
    currentSession: {
      ...createInitialSession(),
      currentStep: 10,
      activeIntervention: 'breathe',
      selectedInterventions: ['breathe'],
    },
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

describe('InterventionTimerPage progress button', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve())
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('fills the waiting button progressively and enables it when complete', async () => {
    const contextValue = makeContextValue()

    render(
      <SessionContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/intervention-pause']}>
          <Routes>
            <Route path="/intervention-pause" element={<InterventionTimerPage />} />
          </Routes>
        </MemoryRouter>
      </SessionContext.Provider>,
    )

    fireEvent.click(screen.getByRole('button', { name: i18n.pages.interventionTimer.start }))

    const waitingButton = screen.getByRole('button', {
      name: i18n.pages.interventionTimer.waitForEndBell,
    })
    expect(waitingButton).toBeDisabled()
    expect(waitingButton).toHaveStyle('--button-progress: 0%')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    expect(waitingButton).toHaveStyle('--button-progress: 3%')

    for (let second = 0; second < 29; second += 1) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000)
      })
    }
    const finalButton = screen.getByRole('button', {
      name: i18n.pages.interventionTimer.goToEvaluation,
    })
    expect(finalButton).toBeEnabled()
    expect(finalButton).toHaveStyle('--button-progress: 100%')
  })
})
