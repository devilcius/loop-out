import { useEffect, useRef, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { i18n } from '../i18n'

interface UpdateNoticeProps {
  enabled?: boolean
}

export function UpdateNotice({ enabled = import.meta.env.PROD }: UpdateNoticeProps) {
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null)
  const updateServiceWorkerRef = useRef<((reloadPage?: boolean) => Promise<void>) | null>(null)
  const [visible, setVisible] = useState(false)
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false)

  useEffect(() => {
    if (!enabled) {
      return
    }

    updateServiceWorkerRef.current = registerSW({
      immediate: true,
      onNeedRefresh() {
        setVisible(true)
      },
      onRegisteredSW(_swScriptUrl, registration) {
        registrationRef.current = registration ?? null
      },
      onRegisterError() {
        setVisible(false)
      },
    })

    const checkForUpdate = () => {
      if (!window.navigator.onLine) {
        return
      }

      void registrationRef.current?.update()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForUpdate()
      }
    }

    window.addEventListener('online', checkForUpdate)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('online', checkForUpdate)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [enabled])

  if (!visible) {
    return null
  }

  const handleUpdate = async () => {
    const updateServiceWorker = updateServiceWorkerRef.current
    if (!updateServiceWorker) {
      return
    }

    setIsApplyingUpdate(true)

    try {
      await updateServiceWorker(true)
    } catch {
      setIsApplyingUpdate(false)
    }
  }

  return (
    <aside className="install-notice" role="status" aria-live="polite">
      <p className="install-notice-title">{i18n.components.updateNotice.title}</p>
      <p className="install-notice-text">{i18n.components.updateNotice.text}</p>
      <div className="install-notice-actions">
        <button
          type="button"
          className="primary-button install-notice-button"
          onClick={() => void handleUpdate()}
          disabled={isApplyingUpdate}
        >
          {isApplyingUpdate ? i18n.components.updateNotice.updating : i18n.components.updateNotice.updateAction}
        </button>
        <button
          type="button"
          className="secondary-button install-notice-button"
          onClick={() => setVisible(false)}
          disabled={isApplyingUpdate}
        >
          {i18n.components.updateNotice.dismissAction}
        </button>
      </div>
    </aside>
  )
}
