import { useEffect } from 'react'
import { AppRouter } from './app/AppRouter'
import { InstallNotice } from './components/InstallNotice'
import { UpdateNotice } from './components/UpdateNotice'
import { SessionProvider } from './state/SessionContext'

const PRELOADED_IMAGE_SOURCES = [
  '/img/logo.png',
  '/img/temporalidad.png',
  '/img/emocion-principal.png',
  '/img/reconocimiento.png',
  '/img/atencion.png',
  '/img/pausa.png',
  '/img/intervencion-pausa.png',
  '/img/feedback-low.png',
  '/img/feedback-medium.png',
  '/img/feedback-high.png',
]

export default function App() {
  useEffect(() => {
    const images = PRELOADED_IMAGE_SOURCES.map((src) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = src
      return image
    })

    return () => {
      images.forEach((image) => {
        image.src = ''
      })
    }
  }, [])

  return (
    <SessionProvider>
      <AppRouter />
      <InstallNotice />
      <UpdateNotice />
    </SessionProvider>
  )
}
