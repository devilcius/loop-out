import type { AttemptRecord, CurrentSession, PersistedData } from '../domain/types'
import { emotionOptions, getRelatedFeelingsOptions } from '../domain/content'

const STORAGE_KEY = 'bucle.app.v1'
const legacyEmotionMap: Record<string, string> = {
  Ansiedad: 'Miedo',
  Miedo: 'Miedo',
  Tristeza: 'Tristeza',
  Rabia: 'Rabia',
  Culpa: 'Culpa',
  'Vergüenza': 'Vergüenza',
  Frustración: 'Rabia',
  Agobio: 'Miedo',
  Asco: 'Asco',
}

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

function normalizePrimaryEmotion(primaryEmotion: string | null | undefined): string | null {
  if (!primaryEmotion) {
    return null
  }

  const normalizedEmotion = legacyEmotionMap[primaryEmotion] ?? primaryEmotion

  return emotionOptions.includes(normalizedEmotion) ? normalizedEmotion : null
}

function normalizeRelatedFeelings(primaryEmotion: string | null, relatedFeelings: unknown): string[] {
  if (!Array.isArray(relatedFeelings) || !primaryEmotion) {
    return []
  }

  const allowedFeelings = new Set(getRelatedFeelingsOptions(primaryEmotion))

  return relatedFeelings.filter(
    (feeling): feeling is string => typeof feeling === 'string' && allowedFeelings.has(feeling),
  )
}

export function loadPersistedData(): PersistedData {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY)

    if (!rawData) {
      return defaultData
    }

    const parsed = JSON.parse(rawData) as PersistedData
    const primaryEmotion = normalizePrimaryEmotion(parsed.currentSession?.primaryEmotion)
    const relatedFeelings = normalizeRelatedFeelings(primaryEmotion, parsed.currentSession?.relatedFeelings)

    return {
      currentSession: {
        ...createInitialSession(),
        ...parsed.currentSession,
        primaryEmotion,
        relatedFeelings,
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
