import { Link } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { i18n } from '../i18n'

export function AboutPage() {
  return (
    <ScreenShell title={i18n.pages.about.title} subtitle={i18n.pages.about.subtitle}>
      <article className="about-content">
        <section className="about-section" aria-labelledby="about-therapeutic-principles">
          <h2 id="about-therapeutic-principles">{i18n.pages.about.therapeuticPrinciples.title}</h2>
          <p>{i18n.pages.about.therapeuticPrinciples.intro}</p>
          <ul>
            {i18n.pages.about.therapeuticPrinciples.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{i18n.pages.about.therapeuticPrinciples.supportNotice}</p>
        </section>

        <section className="about-section" aria-labelledby="about-privacy">
          <h2 id="about-privacy">{i18n.pages.about.privacy.title}</h2>
          <p>{i18n.pages.about.privacy.intro}</p>
          <ul>
            {i18n.pages.about.privacy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{i18n.pages.about.privacy.closing}</p>
        </section>

        <section className="about-section" aria-labelledby="about-open-source">
          <h2 id="about-open-source">{i18n.pages.about.openSource.title}</h2>
          <p>{i18n.pages.about.openSource.intro}</p>
          <ul>
            {i18n.pages.about.openSource.values.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <a href={i18n.pages.about.openSource.repositoryUrl} target="_blank" rel="noreferrer">
              {i18n.pages.about.openSource.repositoryLabel}
            </a>
          </p>
        </section>

        <section className="about-section" aria-labelledby="about-acknowledgements">
          <h2 id="about-acknowledgements">{i18n.pages.about.acknowledgements.title}</h2>
          <p>{i18n.pages.about.acknowledgements.copy}</p>
          <p>
            <a href={i18n.pages.about.acknowledgements.websiteUrl} target="_blank" rel="noreferrer">
              {i18n.pages.about.acknowledgements.websiteLabel}
            </a>
          </p>
        </section>
      </article>

      <div className="stack">
        <Link className="primary-button as-link" to="/">
          {i18n.common.backToStart}
        </Link>
      </div>
    </ScreenShell>
  )
}
