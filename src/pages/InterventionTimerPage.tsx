import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { interventionContent, stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

type TimerStatus = 'idle' | 'running' | 'finished'

const endBellPath = '/audio/bell-end.mp3'

export function InterventionTimerPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentSession, markInterventionReady, goToStep } = useSessionContext()
  const selectedIntervention = currentSession.activeIntervention
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const isInfoModalOpen = searchParams.get('info') === '1'

  const [hasStarted, setHasStarted] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    if (!selectedIntervention) {
      return 0
    }

    return interventionContent[selectedIntervention].durationSeconds
  })

  const endBellRef = useRef<HTMLAudioElement | null>(null)
  const didPlayEndBellRef = useRef(false)

  const interventionData = useMemo(() => {
    if (!selectedIntervention) {
      return null
    }

    return interventionContent[selectedIntervention]
  }, [selectedIntervention])
  const status: TimerStatus = !hasStarted ? 'idle' : remainingSeconds === 0 ? 'finished' : 'running'

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

  if (!interventionData) {
    return <Navigate to={stepPathByNumber[9]} replace />
  }

  const completionPercent =
    status === 'idle'
      ? 0
      : Math.round(((interventionData.durationSeconds - remainingSeconds) / interventionData.durationSeconds) * 100)

  const openInfoModal = () => {
    const nextParams = new URLSearchParams(location.search)

    nextParams.set('info', '1')
    navigate({ pathname: location.pathname, search: `?${nextParams.toString()}` })
  }

  const closeInfoModal = () => {
    const nextParams = new URLSearchParams(location.search)

    nextParams.delete('info')
    navigate(
      {
        pathname: location.pathname,
        search: nextParams.size > 0 ? `?${nextParams.toString()}` : '',
      },
      { replace: true },
    )
  }

  return (
    <>
      <ScreenShell
        title={i18n.pages.interventionTimer.title}
        headerTop={<img className="temporalidad-image" src="/img/intervencion-pausa.png" alt={i18n.app.interventionPauseImageAlt} />}
      >
        <div className="stack">
          <audio ref={endBellRef} src={endBellPath} preload="auto" />

          <div className="intervention-title-row">
            <h2 className="intervention-title">{interventionData.title}</h2>
            <button
              type="button"
              className="lightbulb-button"
              onClick={openInfoModal}
              aria-label={i18n.pages.interventionTimer.extraInfoButtonAriaLabel}
            >
              💡
            </button>
          </div>

          <RichText
            className="summary-text"
            html={i18n.pages.interventionTimer.intro({
              title: interventionData.title,
              seconds: interventionData.durationSeconds,
            })}
          />

          <div className="stack">
            {interventionData.body.map((line, index) => (
              <RichText key={`${interventionData.title}-${index}`} className="summary-text" html={line} />
            ))}
          </div>

          <RichText className="summary-text" html={i18n.pages.interventionTimer.setup} />

          {status !== 'idle' ? <p className="soft-timer">{i18n.pages.interventionTimer.timer(remainingSeconds)}</p> : null}

          {status === 'idle' ? (
            <button
              className="primary-button"
              onClick={() => {
                didPlayEndBellRef.current = false
                setRemainingSeconds(interventionData.durationSeconds)
                setHasStarted(true)
              }}
            >
              {i18n.pages.interventionTimer.start}
            </button>
          ) : (
            <button
              className="primary-button progress-button"
              disabled={status !== 'finished'}
              style={{ '--button-progress': `${completionPercent}%` } as CSSProperties}
              onClick={() => {
                markInterventionReady()
                goToStep(11)
                navigate(stepPathByNumber[11])
              }}
            >
              <span className="progress-button-label">
                {status === 'finished' ? i18n.pages.interventionTimer.goToEvaluation : i18n.pages.interventionTimer.waitForEndBell}
              </span>
            </button>
          )}

          <button className="secondary-button" onClick={() => navigate(stepPathByNumber[9])}>
            {i18n.common.back}
          </button>
        </div>
      </ScreenShell>

      {isInfoModalOpen ? (
        <Modal
          title={i18n.pages.interventionTimer.extraInfoTitle}
          onClose={closeInfoModal}
          closeAriaLabel={i18n.pages.interventionTimer.extraInfoCloseAriaLabel}
        >
          <div className="stack">
            {interventionData.extraInfo.map((fact, index) => (
              <RichText key={`${interventionData.title}-extra-${index}`} className="summary-text" html={fact} />
            ))}
          </div>
        </Modal>
      ) : null}
    </>
  )
}
