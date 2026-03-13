import { AppRouter } from './app/AppRouter'
import { InstallNotice } from './components/InstallNotice'
import { SessionProvider } from './state/SessionContext'

export default function App() {
  return (
    <SessionProvider>
      <AppRouter />
      <InstallNotice />
    </SessionProvider>
  )
}
