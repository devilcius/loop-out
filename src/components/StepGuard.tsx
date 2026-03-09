import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { stepPathByNumber } from '../domain/content'
import { canAccessStep, getHighestAccessibleStep } from '../domain/flow'
import { useSessionContext } from '../state/useSessionContext'

export function StepGuard({ step, children }: { step: number; children: ReactNode }) {
  const { currentSession } = useSessionContext()

  if (canAccessStep(currentSession, step)) {
    return <>{children}</>
  }

  const highestAccessibleStep = getHighestAccessibleStep(currentSession)
  return <Navigate to={stepPathByNumber[highestAccessibleStep]} replace />
}
