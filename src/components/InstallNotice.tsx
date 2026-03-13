import { useEffect, useMemo, useState } from 'react'

type InstallChoiceOutcome = 'accepted' | 'dismissed'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: InstallChoiceOutcome; platform: string }>
}

const DISMISSED_AT_KEY = 'loopout.install.dismissedAt'
const DONT_SHOW_KEY = 'loopout.install.dontShow'
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000
const SHOW_DELAY_MS = 2500

function isStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone)
  )
}

function isIosSafariBrowser() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const isIos = /iphone|ipad|ipod/.test(userAgent)
  const isWebkitSafari = /safari/.test(userAgent) && !/crios|fxios|edgios/.test(userAgent)
  return isIos && isWebkitSafari
}

function isDismissedRecently() {
  const dismissedAtRaw = window.localStorage.getItem(DISMISSED_AT_KEY)
  if (!dismissedAtRaw) {
    return false
  }

  const dismissedAt = Number.parseInt(dismissedAtRaw, 10)
  if (Number.isNaN(dismissedAt)) {
    return false
  }

  return Date.now() - dismissedAt < DISMISS_COOLDOWN_MS
}

function isPermanentlyDismissed() {
  return window.localStorage.getItem(DONT_SHOW_KEY) === 'true'
}

function markTemporarilyDismissed() {
  window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()))
}

function markPermanentlyDismissed() {
  window.localStorage.setItem(DONT_SHOW_KEY, 'true')
}

export function InstallNotice() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const iosManualInstall = useMemo(() => isIosSafariBrowser(), [])

  useEffect(() => {
    if (isStandaloneMode() || isPermanentlyDismissed() || isDismissedRecently()) {
      return
    }

    const onBeforeInstallPrompt = (event: Event) => {
      const promptEvent = event as BeforeInstallPromptEvent
      promptEvent.preventDefault()
      setDeferredPrompt(promptEvent)
      setVisible(true)
    }

    const onAppInstalled = () => {
      setVisible(false)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    const timeoutId = window.setTimeout(() => {
      if (iosManualInstall) {
        setVisible(true)
      }
    }, SHOW_DELAY_MS)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
      window.clearTimeout(timeoutId)
    }
  }, [iosManualInstall])

  if (!visible || isStandaloneMode() || isPermanentlyDismissed()) {
    return null
  }

  const handleNotNow = () => {
    markTemporarilyDismissed()
    setVisible(false)
  }

  const handleDontShow = () => {
    markPermanentlyDismissed()
    setVisible(false)
  }

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return
    }

    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    setDeferredPrompt(null)

    if (choice.outcome === 'dismissed') {
      markTemporarilyDismissed()
    }

    setVisible(false)
  }

  const showInstallButton = deferredPrompt !== null

  return (
    <aside className="install-notice" role="status" aria-live="polite">
      <p className="install-notice-title">Instala LOOP-OUT para usarla como app</p>
      {showInstallButton ? (
        <p className="install-notice-text">
          Accede más rápido y vuelve al flujo con un solo toque desde la pantalla de inicio.
        </p>
      ) : (
        <p className="install-notice-text">
          En iPhone abre Compartir y toca <strong>Añadir a pantalla de inicio</strong>.
        </p>
      )}
      <div className="install-notice-actions">
        {showInstallButton ? (
          <button type="button" className="primary-button install-notice-button" onClick={handleInstall}>
            Instalar
          </button>
        ) : null}
        <button type="button" className="secondary-button install-notice-button" onClick={handleNotNow}>
          Ahora no
        </button>
        <button type="button" className="text-button install-notice-button" onClick={handleDontShow}>
          No volver a mostrar
        </button>
      </div>
    </aside>
  )
}
