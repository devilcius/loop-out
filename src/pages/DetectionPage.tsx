import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RichText } from '../components/RichText'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import { useSessionContext } from '../state/useSessionContext'

export function DetectionPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentSession, restartSession } = useSessionContext()

  const hasProgress = currentSession.currentStep > 1

  useEffect(() => {
    const locationState = location.state as { resetSession?: boolean } | null

    if (!locationState?.resetSession) {
      return
    }

    restartSession()
    navigate('/', { replace: true })
  }, [location.state, navigate, restartSession])

  return (
    <ScreenShell
      showHomeLogoLink={false}
      title={i18n.pages.detection.title}
      subtitle={i18n.pages.detection.subtitle}
      showHistoryLink
      showAboutLink
      headerTop={
        <div className="app-hero">
          <h2 className="app-title">{i18n.app.name}</h2>
          <img className="app-logo" src="/img/logo.png" alt={i18n.app.logoAlt} />
          <RichText className="app-tagline" html={i18n.app.tagline} />
        </div>
      }
    >
      <div className="stack">
        <button
          className="primary-button"
          onClick={() => {
            restartSession()
            navigate(stepPathByNumber[2])
          }}
        >
          {i18n.common.start}
        </button>

        {hasProgress ? (
          <>
            <button className="secondary-button" onClick={() => navigate(stepPathByNumber[currentSession.currentStep])}>
              {i18n.pages.detection.continueWhereLeft}
            </button>
          </>
        ) : null}
      </div>
    </ScreenShell>
  )
}
