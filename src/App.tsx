import { AppRouter } from './app/AppRouter'
import { SessionProvider } from './state/SessionContext'

export default function App() {
  return (
    <SessionProvider>
      <AppRouter />
    </SessionProvider>
  )
}
