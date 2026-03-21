import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SessionProvider } from '../SessionContext'
import { useSessionContext } from '../useSessionContext'

const STORAGE_KEY = 'bucle.app.v1'

function wrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

describe('SessionProvider', () => {
  it('loads initial state from persisted storage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentSession: {
          initialIntensity: 4,
          temporalOrientation: 'past',
          primaryEmotion: 'Ansiedad',
          relatedFeelings: ['Inquietud'],
        },
        attemptsHistory: [
          {
            id: 'attempt-1',
            initialIntensity: 4,
            finalIntensity: 2,
            temporalOrientation: 'past',
            primaryEmotion: 'Ansiedad',
            relatedFeelings: ['Inquietud'],
            selectedInterventions: ['breathe'],
            completedAt: new Date().toISOString(),
          },
        ],
      }),
    )

    const { result } = renderHook(() => useSessionContext(), { wrapper })

    expect(result.current.currentSession.initialIntensity).toBe(4)
    expect(result.current.currentSession.temporalOrientation).toBe('past')
    expect(result.current.currentSession.primaryEmotion).toBe('Miedo')
    expect(result.current.currentSession.relatedFeelings).toEqual(['Inquietud'])
    expect(result.current.attemptsHistory).toHaveLength(1)
  })

  it('updates session fields and persists them', async () => {
    const { result } = renderHook(() => useSessionContext(), { wrapper })

    act(() => {
      result.current.setFinalIntensity(5)
      result.current.setInitialIntensity(3)
      result.current.addIntervention('breathe')
      result.current.addIntervention('breathe')
    })

    expect(result.current.currentSession.initialIntensity).toBe(3)
    expect(result.current.currentSession.finalIntensity).toBeNull()
    expect(result.current.currentSession.selectedInterventions).toEqual(['breathe'])
    expect(result.current.currentSession.activeIntervention).toBe('breathe')

    await waitFor(() => {
      const persisted = localStorage.getItem(STORAGE_KEY)
      expect(persisted).toContain('"initialIntensity":3')
      expect(persisted).toContain('"selectedInterventions":["breathe"]')
    })
  })

  it('records an attempt only when required fields are complete', () => {
    const { result } = renderHook(() => useSessionContext(), { wrapper })

    act(() => {
      result.current.recordAttempt()
    })
    expect(result.current.attemptsHistory).toHaveLength(0)

    act(() => {
      result.current.setInitialIntensity(4)
      result.current.setTemporalOrientation('future')
      result.current.setPrimaryEmotion('Miedo')
      result.current.setRelatedFeelings(['Inquietud'])
      result.current.setNotificationOpened('no')
      result.current.addIntervention('breathe')
      result.current.markInterventionReady()
      result.current.setFinalIntensity(2)
      result.current.recordAttempt()
    })

    expect(result.current.attemptsHistory).toHaveLength(1)
    expect(result.current.attemptsHistory[0].initialIntensity).toBe(4)
    expect(result.current.attemptsHistory[0].finalIntensity).toBe(2)
  })

  it('clears related feelings when the primary emotion changes', () => {
    const { result } = renderHook(() => useSessionContext(), { wrapper })

    act(() => {
      result.current.setPrimaryEmotion('Miedo')
      result.current.setRelatedFeelings(['Inquietud'])
    })

    expect(result.current.currentSession.relatedFeelings).toEqual(['Inquietud'])

    act(() => {
      result.current.setPrimaryEmotion('Rabia')
    })

    expect(result.current.currentSession.primaryEmotion).toBe('Rabia')
    expect(result.current.currentSession.relatedFeelings).toEqual([])
  })
})
