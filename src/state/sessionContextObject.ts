import { createContext } from 'react'
import type { SessionContextValue } from './sessionTypes'

export const SessionContext = createContext<SessionContextValue | undefined>(undefined)
