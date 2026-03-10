import { describe, expect, it } from 'vitest'
import { getFirstMissingStep, canAccessStep, getHighestAccessibleStep } from '../flow'
import { createInitialSession } from '../../storage/localPersistence'

function buildSession() {
  return createInitialSession()
}

describe('flow', () => {
  it('finds first missing step on a fresh session', () => {
    const session = buildSession()

    expect(getFirstMissingStep(session)).toBe(3)
    expect(canAccessStep(session, 1)).toBe(true)
    expect(canAccessStep(session, 2)).toBe(true)
    expect(canAccessStep(session, 3)).toBe(false)
    expect(getHighestAccessibleStep(session)).toBe(2)
  })

  it('moves first missing step to 13 when all required fields are complete', () => {
    const session = {
      ...buildSession(),
      initialIntensity: 3,
      temporalOrientation: 'future' as const,
      primaryEmotion: 'Ansiedad',
      relatedFeelings: ['Inquietud'],
      notificationOpened: 'no' as const,
      selectedInterventions: ['breathe' as const],
      activeIntervention: 'breathe' as const,
      interventionReady: true,
    }

    expect(getFirstMissingStep(session)).toBe(13)
    expect(canAccessStep(session, 12)).toBe(true)
    expect(getHighestAccessibleStep(session)).toBe(12)
  })

  it('treats empty arrays and false booleans as missing', () => {
    const session = {
      ...buildSession(),
      initialIntensity: 3,
      temporalOrientation: 'past' as const,
      primaryEmotion: 'Miedo',
      relatedFeelings: ['Tensión'],
      notificationOpened: 'yes' as const,
      selectedInterventions: ['feel-present' as const],
      activeIntervention: 'feel-present' as const,
      interventionReady: false,
    }

    expect(getFirstMissingStep(session)).toBe(11)

    const withoutInterventions = {
      ...session,
      selectedInterventions: [],
      interventionReady: true,
    }

    expect(getFirstMissingStep(withoutInterventions)).toBe(10)
  })
})
