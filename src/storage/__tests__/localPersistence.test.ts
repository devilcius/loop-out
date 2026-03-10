import { describe, expect, it } from 'vitest'
import {
  appendAttempt,
  createInitialSession,
  loadPersistedData,
  savePersistedData,
} from '../localPersistence'
import type { AttemptRecord } from '../../domain/types'

const STORAGE_KEY = 'bucle.app.v1'

function makeAttempt(index: number): AttemptRecord {
  return {
    id: `attempt-${index}`,
    initialIntensity: 4,
    finalIntensity: 2,
    temporalOrientation: 'future',
    primaryEmotion: 'Ansiedad',
    relatedFeelings: ['Inquietud'],
    selectedInterventions: ['breathe'],
    completedAt: new Date(2025, 0, index + 1).toISOString(),
  }
}

describe('localPersistence', () => {
  it('creates an initial session with default values', () => {
    const session = createInitialSession()

    expect(session.currentStep).toBe(1)
    expect(session.initialIntensity).toBeNull()
    expect(session.selectedInterventions).toEqual([])
    expect(session.createdAt).toBeTruthy()
    expect(session.updatedAt).toBeTruthy()
  })

  it('loads defaults when storage is empty or invalid', () => {
    expect(loadPersistedData().attemptsHistory).toEqual([])

    localStorage.setItem(STORAGE_KEY, '{')
    expect(loadPersistedData().attemptsHistory).toEqual([])
  })

  it('loads persisted data and merges with current session defaults', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentSession: {
          initialIntensity: 5,
          temporalOrientation: 'past',
          primaryEmotion: 'Miedo',
        },
        attemptsHistory: [makeAttempt(1)],
      }),
    )

    const loaded = loadPersistedData()

    expect(loaded.currentSession.initialIntensity).toBe(5)
    expect(loaded.currentSession.temporalOrientation).toBe('past')
    expect(loaded.currentSession.relatedFeelings).toEqual([])
    expect(loaded.attemptsHistory).toHaveLength(1)
  })

  it('saves persisted data in localStorage', () => {
    const data = {
      currentSession: createInitialSession(),
      attemptsHistory: [makeAttempt(1)],
    }

    savePersistedData(data)

    expect(localStorage.getItem(STORAGE_KEY)).toContain('attempt-1')
  })

  it('prepends attempts and keeps only the latest 30 items', () => {
    const attempts = Array.from({ length: 30 }, (_, index) => makeAttempt(index))
    const nextAttempt = makeAttempt(99)

    const next = appendAttempt(attempts, nextAttempt)

    expect(next).toHaveLength(30)
    expect(next[0].id).toBe('attempt-99')
    expect(next.at(-1)?.id).toBe('attempt-28')
  })
})
