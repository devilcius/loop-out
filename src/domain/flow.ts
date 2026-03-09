import { stepPathByNumber } from './content'
import type { CurrentSession } from './types'

const requiredByStep: Record<number, (keyof CurrentSession)[]> = {
  1: [],
  2: [],
  3: ['initialIntensity'],
  4: ['temporalOrientation'],
  5: ['primaryEmotion'],
  6: ['relatedFeelings'],
  7: ['relatedFeelings'],
  8: ['notificationOpened'],
  9: ['notificationOpened'],
  10: ['selectedInterventions', 'activeIntervention'],
  11: ['interventionReady'],
}

export function getFirstMissingStep(session: CurrentSession): number {
  const orderedSteps = Object.keys(stepPathByNumber).map(Number).sort((a, b) => a - b)

  for (const step of orderedSteps) {
    const requiredFields = requiredByStep[step] ?? []

    const hasMissingField = requiredFields.some((field) => {
      const value = session[field]

      if (Array.isArray(value)) {
        return value.length === 0
      }

      if (typeof value === 'boolean') {
        return value === false
      }

      return value === null
    })

    if (hasMissingField) {
      return step
    }
  }

  return orderedSteps[orderedSteps.length - 1] + 1
}

export function canAccessStep(session: CurrentSession, step: number): boolean {
  return getFirstMissingStep(session) > step
}

export function getHighestAccessibleStep(session: CurrentSession): number {
  return Math.max(1, getFirstMissingStep(session) - 1)
}
