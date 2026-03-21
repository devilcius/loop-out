import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { RelatedFeelingsPage } from '../RelatedFeelingsPage'
import { SessionContext } from '../../state/sessionContextObject'
import type { SessionContextValue } from '../../state/sessionTypes'
import { createInitialSession } from '../../storage/localPersistence'

function makeContextValue(overrides: Partial<SessionContextValue> = {}): SessionContextValue {
  return {
    currentSession: {
      ...createInitialSession(),
      primaryEmotion: 'Miedo',
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

describe('RelatedFeelingsPage', () => {
  it('shows only the feelings for the selected primary emotion', async () => {
    const user = userEvent.setup()
    const setRelatedFeelings = vi.fn()
    const goToStep = vi.fn()

    render(
      <SessionContext.Provider value={makeContextValue({ setRelatedFeelings, goToStep })}>
        <MemoryRouter initialEntries={['/related-feelings']}>
          <Routes>
            <Route path="/related-feelings" element={<RelatedFeelingsPage />} />
            <Route path="/recognition" element={<div>Recognition page</div>} />
          </Routes>
        </MemoryRouter>
      </SessionContext.Provider>,
    )

    expect(screen.getByRole('button', { name: 'Ansiedad' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Inquietud' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Furia' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Bochorno' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ansiedad' }))
    await user.click(screen.getByRole('button', { name: 'Continuar' }))

    expect(setRelatedFeelings).toHaveBeenCalledWith(['Ansiedad'])
    expect(goToStep).toHaveBeenCalledWith(6)
    expect(screen.getByText('Recognition page')).toBeInTheDocument()
  })
})
