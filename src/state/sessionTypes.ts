import type {
  AttemptRecord,
  CurrentSession,
  InterventionOption,
  NotificationOpenedAnswer,
  TemporalOrientation,
} from '../domain/types'

export interface SessionContextValue {
  currentSession: CurrentSession
  attemptsHistory: AttemptRecord[]
  setInitialIntensity: (value: number) => void
  setTemporalOrientation: (value: TemporalOrientation) => void
  setPrimaryEmotion: (value: string) => void
  setRelatedFeelings: (value: string[]) => void
  setNotificationOpened: (value: NotificationOpenedAnswer) => void
  addIntervention: (value: InterventionOption) => void
  markInterventionReady: () => void
  setFinalIntensity: (value: number) => void
  goToStep: (step: number) => void
  recordAttempt: () => void
  restartSession: () => void
}
