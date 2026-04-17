import { describe, expect, it } from 'vitest'
import { getBrowserLanguage, resolveLanguageTag } from '../index'

describe('i18n locale detection', () => {
  it('defaults to English for non-Spanish browser languages', () => {
    expect(resolveLanguageTag('en-US')).toBe('en')
    expect(resolveLanguageTag('fr-FR')).toBe('en')
    expect(resolveLanguageTag(undefined)).toBe('en')
  })

  it('selects Spanish only for Spanish browser languages', () => {
    expect(resolveLanguageTag('es')).toBe('es')
    expect(resolveLanguageTag('es-ES')).toBe('es')
    expect(resolveLanguageTag('es-MX')).toBe('es')
  })

  it('uses navigator preferred language', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    })

    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      value: ['en-US'],
    })

    expect(getBrowserLanguage()).toBe('en')
  })
})
