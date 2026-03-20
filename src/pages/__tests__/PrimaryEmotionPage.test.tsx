import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { PrimaryEmotionPage } from '../PrimaryEmotionPage'
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

describe('PrimaryEmotionPage', () => {
  it('waits for the user to continue after selecting an emotion', async () => {
    const user = userEvent.setup()
    const setPrimaryEmotion = vi.fn()
    const goToStep = vi.fn()

    render(
      <SessionContext.Provider value={makeContextValue({ setPrimaryEmotion, goToStep })}>
        <MemoryRouter initialEntries={['/primary-emotion']}>
          <Routes>
            <Route path="/primary-emotion" element={<PrimaryEmotionPage />} />
            <Route path="/related-feelings" element={<div>Related feelings page</div>} />
          </Routes>
        </MemoryRouter>
      </SessionContext.Provider>,
    )

    const continueButton = screen.getByRole('button', { name: 'Continuar' })
    expect(continueButton).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Ansiedad' }))

    expect(continueButton).toBeEnabled()
    expect(setPrimaryEmotion).not.toHaveBeenCalled()
    expect(goToStep).not.toHaveBeenCalled()
    expect(screen.queryByText('Related feelings page')).not.toBeInTheDocument()

    await user.click(continueButton)

    expect(setPrimaryEmotion).toHaveBeenCalledWith('Ansiedad')
    expect(goToStep).toHaveBeenCalledWith(5)
    expect(screen.getByText('Related feelings page')).toBeInTheDocument()
  })
})
