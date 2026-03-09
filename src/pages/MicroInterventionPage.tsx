import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

const PAUSE_SECONDS = 12
const endBellPath = '/audio/bell-end.mp3'
type PauseStatus = 'idle' | 'running' | 'finished'

export function MicroInterventionPage() {
  const navigate = useNavigate()
  const { currentSession, goToStep } = useSessionContext()
  const [remainingSeconds, setRemainingSeconds] = useState(PAUSE_SECONDS)
  const [hasStarted, setHasStarted] = useState(false)
  const endBellRef = useRef<HTMLAudioElement | null>(null)
  const didPlayEndBellRef = useRef(false)
  const status: PauseStatus = !hasStarted ? 'idle' : remainingSeconds === 0 ? 'finished' : 'running'

  useEffect(() => {
    if (!hasStarted || remainingSeconds === 0) {
      return
    }

    const timer = setTimeout(() => {
      setRemainingSeconds((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => clearTimeout(timer)
  }, [hasStarted, remainingSeconds])

  useEffect(() => {
    if (hasStarted && remainingSeconds === 0 && !didPlayEndBellRef.current) {
      didPlayEndBellRef.current = true
      void endBellRef.current?.play()
    }
  }, [hasStarted, remainingSeconds])

  const instruction = useMemo(() => {
    if (currentSession.notificationOpened === 'yes') {
      return i18n.pages.microIntervention.instructionByNotificationAnswer.yes
    }

    return i18n.pages.microIntervention.instructionByNotificationAnswer.no
  }, [currentSession.notificationOpened])

  return (
    <ScreenShell
      title={i18n.pages.microIntervention.title}
      headerTop={<img className="temporalidad-image" src="/img/pausa.png" alt={i18n.app.pauseImageAlt} />}
    >
      <div className="stack">
        <audio ref={endBellRef} src={endBellPath} preload="auto" />
        <RichText className="summary-text" html={instruction} />
        <RichText className="summary-text" html={i18n.pages.microIntervention.pauseSetup} />
        {status !== 'idle' ? <p className="soft-timer">{i18n.pages.microIntervention.timer(remainingSeconds)}</p> : null}

        {status === 'idle' ? (
          <button
            className="secondary-button"
            onClick={() => {
              didPlayEndBellRef.current = false
              setRemainingSeconds(PAUSE_SECONDS)
              setHasStarted(true)
            }}
          >
            {i18n.pages.microIntervention.startPause}
          </button>
        ) : null}

        <button
          className="primary-button"
          disabled={status !== 'finished'}
          onClick={() => {
            goToStep(9)
            navigate(stepPathByNumber[9])
          }}
        >
          {status === 'finished' ? i18n.common.continue : i18n.pages.microIntervention.waitForEndBell}
        </button>
        <button className="secondary-button" onClick={() => navigate(stepPathByNumber[7])}>
          {i18n.common.back}
        </button>
      </div>
    </ScreenShell>
  )
}
