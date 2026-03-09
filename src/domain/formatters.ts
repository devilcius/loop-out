import { intensityLabelByLevel } from './content'
import type { CurrentSession, InterventionOption } from './types'
import { i18n } from '../i18n'

export function formatOrientation(orientation: CurrentSession['temporalOrientation']): string {
  if (!orientation) {
    return ''
  }

  return i18n.domain.orientationLabelByValue[orientation]
}

export function formatIntervention(intervention: InterventionOption): string {
  return i18n.domain.interventionLabelByValue[intervention]
}

export function formatIntensityLabel(level: number | null): string {
  if (!level) {
    return ''
  }

  return intensityLabelByLevel[level] ?? String(level)
}

function normalizeFeeling(feeling: string): string {
  return feeling
    .trim()
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export function formatRelatedFeelingsList(feelings: string[]): string {
  const seen = new Set<string>()
  const uniqueFeelings: string[] = []

  feelings.forEach((feeling) => {
    const normalized = normalizeFeeling(feeling)

    if (!normalized || seen.has(normalized)) {
      return
    }

    seen.add(normalized)
    uniqueFeelings.push(feeling.trim().toLocaleLowerCase())
  })

  return uniqueFeelings.join(', ')
}

export function getEvaluationFeedback(intensity: number): { imageSrc: string; text: string } {
  if (intensity <= 2) {
    return {
      imageSrc: '/img/feedback-low.png',
      text: i18n.pages.evaluation.feedbackLow,
    }
  }

  if (intensity <= 4) {
    return {
      imageSrc: '/img/feedback-medium.png',
      text: i18n.pages.evaluation.feedbackMedium,
    }
  }

  return {
    imageSrc: '/img/feedback-high.png',
    text: i18n.pages.evaluation.feedbackHigh,
  }
}
