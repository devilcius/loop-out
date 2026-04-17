import { en } from './en'
import { es } from './es'

export function resolveLanguageTag(language: string | undefined): 'en' | 'es' {
  if (!language) {
    return 'en'
  }

  return language.toLocaleLowerCase().startsWith('es') ? 'es' : 'en'
}

export function getBrowserLanguage(): 'en' | 'es' {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const preferredLanguage = navigator.languages?.[0] ?? navigator.language
  return resolveLanguageTag(preferredLanguage)
}

export const i18n = getBrowserLanguage() === 'es' ? es : en
