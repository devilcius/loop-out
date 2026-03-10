import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { i18n } from '../i18n'
import { RichText } from './RichText'

interface ScreenShellProps {
  title?: string
  subtitle?: string
  headerTop?: ReactNode
  showHomeLogoLink?: boolean
  showHistoryLink?: boolean
  showAboutLink?: boolean
  children: ReactNode
}

export function ScreenShell({
  title,
  subtitle,
  headerTop,
  showHomeLogoLink = true,
  showHistoryLink = false,
  showAboutLink = false,
  children,
}: ScreenShellProps) {
  const shouldShowFooter = showHistoryLink || showAboutLink

  return (
    <main className="screen">
      <div className="screen-card">
        <header className="screen-header">
          {showHomeLogoLink ? (
            <Link className="screen-home-logo-link" to="/" aria-label={i18n.common.backToStart}>
              <img className="screen-home-logo" src="/img/logo.png" alt={i18n.app.logoAlt} />
            </Link>
          ) : null}
          {headerTop}
          {title ? <h1>{title}</h1> : null}
          {subtitle ? <RichText html={subtitle} /> : null}
        </header>
        <section className="screen-content">{children}</section>
      </div>

      {shouldShowFooter ? (
        <footer className="screen-footer">
          <nav className="screen-footer-links" aria-label={i18n.components.screenShell.footerNavAriaLabel}>
            {showHistoryLink ? (
              <Link to="/history" className="text-link">
                {i18n.components.screenShell.historyLink}
              </Link>
            ) : null}
            {showAboutLink ? (
              <Link to="/about" className="text-link">
                {i18n.components.screenShell.aboutLink}
              </Link>
            ) : null}
          </nav>
        </footer>
      ) : null}
    </main>
  )
}
