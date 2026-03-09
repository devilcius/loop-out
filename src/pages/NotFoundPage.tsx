import { Link } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { i18n } from '../i18n'

export function NotFoundPage() {
  return (
    <ScreenShell title={i18n.pages.notFound.title}>
      <div className="stack">
        <Link className="primary-button as-link" to="/">
          {i18n.common.backToStart}
        </Link>
      </div>
    </ScreenShell>
  )
}
