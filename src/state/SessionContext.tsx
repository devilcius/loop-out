import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type {
  AttemptRecord,
  CurrentSession,
  InterventionOption,
  NotificationOpenedAnswer,
  TemporalOrientation,
} from '../domain/types'
import { SessionContext } from './sessionContextObject'
import type { SessionContextValue } from './sessionTypes'
import {
  appendAttempt,
  createInitialSession,
  loadPersistedData,
  savePersistedData,
} from '../storage/localPersistence'

interface SessionState {
  currentSession: CurrentSession
  attemptsHistory: AttemptRecord[]
}

type SessionAction =
  | { type: 'set-initial-intensity'; payload: number }
  | { type: 'set-temporal-orientation'; payload: TemporalOrientation }
  | { type: 'set-primary-emotion'; payload: string }
  | { type: 'set-related-feelings'; payload: string[] }
  | { type: 'set-notification-opened'; payload: NotificationOpenedAnswer }
  | { type: 'add-intervention'; payload: InterventionOption }
  | { type: 'mark-intervention-ready' }
  | { type: 'set-final-intensity'; payload: number }
  | { type: 'go-to-step'; payload: number }
  | { type: 'record-attempt' }
  | { type: 'restart-session' }

function updateSession(
  currentSession: CurrentSession,
  patch: Partial<CurrentSession>,
  targetStep: number,
): CurrentSession {
  return {
    ...currentSession,
    ...patch,
    updatedAt: new Date().toISOString(),
    currentStep: Math.max(currentSession.currentStep, targetStep),
  }
}

function createAttemptRecord(session: CurrentSession): AttemptRecord | null {
  if (
    session.initialIntensity === null ||
    session.finalIntensity === null ||
    session.temporalOrientation === null ||
    session.primaryEmotion === null
  ) {
    return null
  }

  return {
    id: crypto.randomUUID(),
    initialIntensity: session.initialIntensity,
    finalIntensity: session.finalIntensity,
    temporalOrientation: session.temporalOrientation,
    primaryEmotion: session.primaryEmotion,
    relatedFeelings: session.relatedFeelings,
    selectedInterventions: session.selectedInterventions,
    completedAt: new Date().toISOString(),
  }
}

function reducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'set-initial-intensity':
      return {
        ...state,
        currentSession: updateSession(
          state.currentSession,
          { initialIntensity: action.payload, finalIntensity: null },
          2,
        ),
      }
    case 'set-temporal-orientation':
      return {
        ...state,
        currentSession: updateSession(state.currentSession, { temporalOrientation: action.payload }, 3),
      }
    case 'set-primary-emotion':
      return {
        ...state,
        currentSession: updateSession(state.currentSession, { primaryEmotion: action.payload }, 4),
      }
    case 'set-related-feelings':
      return {
        ...state,
        currentSession: updateSession(state.currentSession, { relatedFeelings: action.payload }, 5),
      }
    case 'set-notification-opened':
      return {
        ...state,
        currentSession: updateSession(state.currentSession, { notificationOpened: action.payload }, 7),
      }
    case 'add-intervention': {
      const selectedInterventions = state.currentSession.selectedInterventions.includes(action.payload)
        ? state.currentSession.selectedInterventions
        : [...state.currentSession.selectedInterventions, action.payload]

      return {
        ...state,
        currentSession: updateSession(
          state.currentSession,
          {
            selectedInterventions,
            activeIntervention: action.payload,
            interventionReady: false,
          },
          9,
        ),
      }
    }
    case 'mark-intervention-ready':
      return {
        ...state,
        currentSession: updateSession(state.currentSession, { interventionReady: true }, 10),
      }
    case 'set-final-intensity':
      return {
        ...state,
        currentSession: updateSession(state.currentSession, { finalIntensity: action.payload }, 11),
      }
    case 'go-to-step':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          currentStep: action.payload,
        },
      }
    case 'record-attempt': {
      const attemptRecord = createAttemptRecord(state.currentSession)

      if (!attemptRecord) {
        return state
      }

      return {
        ...state,
        attemptsHistory: appendAttempt(state.attemptsHistory, attemptRecord),
      }
    }
    case 'restart-session':
      return {
        ...state,
        currentSession: createInitialSession(),
      }
    default:
      return state
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    if (typeof window === 'undefined') {
      return {
        currentSession: createInitialSession(),
        attemptsHistory: [],
      }
    }

    return loadPersistedData()
  })

  useEffect(() => {
    savePersistedData(state)
  }, [state])

  const setInitialIntensity = useCallback((value: number) => {
    dispatch({ type: 'set-initial-intensity', payload: value })
  }, [])

  const setTemporalOrientation = useCallback((value: TemporalOrientation) => {
    dispatch({ type: 'set-temporal-orientation', payload: value })
  }, [])

  const setPrimaryEmotion = useCallback((value: string) => {
    dispatch({ type: 'set-primary-emotion', payload: value })
  }, [])

  const setRelatedFeelings = useCallback((value: string[]) => {
    dispatch({ type: 'set-related-feelings', payload: value })
  }, [])

  const setNotificationOpened = useCallback((value: NotificationOpenedAnswer) => {
    dispatch({ type: 'set-notification-opened', payload: value })
  }, [])

  const addIntervention = useCallback((value: InterventionOption) => {
    dispatch({ type: 'add-intervention', payload: value })
  }, [])

  const markInterventionReady = useCallback(() => {
    dispatch({ type: 'mark-intervention-ready' })
  }, [])

  const setFinalIntensity = useCallback((value: number) => {
    dispatch({ type: 'set-final-intensity', payload: value })
  }, [])

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'go-to-step', payload: step })
  }, [])

  const recordAttempt = useCallback(() => {
    dispatch({ type: 'record-attempt' })
  }, [])

  const restartSession = useCallback(() => {
    dispatch({ type: 'restart-session' })
  }, [])

  const value = useMemo<SessionContextValue>(() => {
    return {
      currentSession: state.currentSession,
      attemptsHistory: state.attemptsHistory,
      setInitialIntensity,
      setTemporalOrientation,
      setPrimaryEmotion,
      setRelatedFeelings,
      setNotificationOpened,
      addIntervention,
      markInterventionReady,
      setFinalIntensity,
      goToStep,
      recordAttempt,
      restartSession,
    }
  }, [
    state,
    setInitialIntensity,
    setTemporalOrientation,
    setPrimaryEmotion,
    setRelatedFeelings,
    setNotificationOpened,
    addIntervention,
    markInterventionReady,
    setFinalIntensity,
    goToStep,
    recordAttempt,
    restartSession,
  ])

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
