import { useContext } from 'react'
import { getFirstMissingStep } from '../domain/flow'
import { SessionContext } from './sessionContextObject'
import type { SessionContextValue } from './sessionTypes'

export function useSessionContext(): SessionContextValue {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSessionContext must be used within SessionProvider')
  }

  return context
}

export function useFirstAvailableStep(): number {
  const { currentSession } = useSessionContext()
  return getFirstMissingStep(currentSession)
}
