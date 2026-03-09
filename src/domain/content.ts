import type { InterventionContentItem, InterventionOption } from './types'
import { i18n } from '../i18n'

export const stepPathByNumber: Record<number, string> = {
  1: '/',
  2: '/estimacion',
  3: '/temporalidad',
  4: '/emocion-principal',
  5: '/sentimientos',
  6: '/reconocimiento',
  7: '/atencion',
  8: '/pausa',
  9: '/intervencion',
  10: '/intervencion-pausa',
  11: '/evaluacion',
  12: '/evaluacion-feedback',
}

export const intensityLabelByLevel: Record<number, string> = {
  ...i18n.domain.intensityLabelByLevel,
}

export const emotionOptions = i18n.domain.emotionOptions

export const relatedFeelingsOptions = i18n.domain.relatedFeelingsOptions

export const interventionContent: Record<InterventionOption, InterventionContentItem> = i18n.domain.interventionContent
