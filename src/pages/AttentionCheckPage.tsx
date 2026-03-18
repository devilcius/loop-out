import { useNavigate } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { stepPathByNumber } from '../domain/content'
import { i18n } from '../i18n'
import type { NotificationOpenedAnswer } from '../domain/types'
import { useSessionContext } from '../state/useSessionContext'

export function AttentionCheckPage() {
  const navigate = useNavigate()
  const { setNotificationOpened, goToStep } = useSessionContext()

  const handleSelect = (value: NotificationOpenedAnswer) => {
    setNotificationOpened(value)
    goToStep(8)
    navigate(stepPathByNumber[8])
  }

  return (
    <ScreenShell
      title={i18n.pages.attentionCheck.title}
      headerTop={
        <img
          className="temporalidad-image"
          src="/img/atencion.png"
          alt={i18n.app.attentionImageAlt}
          width="953"
          height="572"
          decoding="async"
        />
      }
    >
      <div className="stack">
        <button className="primary-button" onClick={() => handleSelect('yes')}>
          {i18n.common.yes}
        </button>
        <button className="secondary-button" onClick={() => handleSelect('no')}>
          {i18n.common.no}
        </button>
      </div>
    </ScreenShell>
  )
}
