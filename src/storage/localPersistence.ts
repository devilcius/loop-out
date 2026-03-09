import type { AttemptRecord, CurrentSession, PersistedData } from '../domain/types'

const STORAGE_KEY = 'bucle.app.v1'

function nowIso(): string {
  return new Date().toISOString()
}

export function createInitialSession(): CurrentSession {
  const timestamp = nowIso()

  return {
    initialIntensity: null,
    temporalOrientation: null,
    primaryEmotion: null,
    relatedFeelings: [],
    notificationOpened: null,
    activeIntervention: null,
    interventionReady: false,
    selectedInterventions: [],
    finalIntensity: null,
    createdAt: timestamp,
    updatedAt: timestamp,
    currentStep: 1,
  }
}

const defaultData: PersistedData = {
  currentSession: createInitialSession(),
  attemptsHistory: [],
}

export function loadPersistedData(): PersistedData {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY)

    if (!rawData) {
      return defaultData
    }

    const parsed = JSON.parse(rawData) as PersistedData

    return {
      currentSession: {
        ...createInitialSession(),
        ...parsed.currentSession,
      },
      attemptsHistory: Array.isArray(parsed.attemptsHistory) ? parsed.attemptsHistory : [],
    }
  } catch {
    return defaultData
  }
}

export function savePersistedData(data: PersistedData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function appendAttempt(attempts: AttemptRecord[], attempt: AttemptRecord): AttemptRecord[] {
  return [attempt, ...attempts].slice(0, 30)
}
