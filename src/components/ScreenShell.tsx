import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { i18n } from '../i18n'
import { RichText } from './RichText'

interface ScreenShellProps {
  title?: string
  subtitle?: string
  headerTop?: ReactNode
  showHistoryLink?: boolean
  children: ReactNode
}

export function ScreenShell({ title, subtitle, headerTop, showHistoryLink = false, children }: ScreenShellProps) {
  return (
    <main className="screen">
      <div className="screen-card">
        <header className="screen-header">
          {headerTop}
          {title ? <h1>{title}</h1> : null}
          {subtitle ? <RichText html={subtitle} /> : null}
        </header>
        <section className="screen-content">{children}</section>
      </div>

      {showHistoryLink ? (
        <footer className="screen-footer">
          <Link to="/historial" className="text-link">
            {i18n.components.screenShell.historyLink}
          </Link>
        </footer>
      ) : null}
    </main>
  )
}
