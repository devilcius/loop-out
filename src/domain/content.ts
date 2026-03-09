import type { InterventionContentItem, InterventionOption } from './types'
import { i18n } from '../i18n'

export const stepPathByNumber: Record<number, string> = {
  1: '/',
  2: '/estimation',
  3: '/temporal-orientation',
  4: '/primary-emotion',
  5: '/related-feelings',
  6: '/recognition',
  7: '/attention',
  8: '/pause',
  9: '/intervention',
  10: '/intervention-pause',
  11: '/evaluation',
  12: '/evaluation-feedback',
}

export const intensityLabelByLevel: Record<number, string> = {
  ...i18n.domain.intensityLabelByLevel,
}

export const emotionOptions = i18n.domain.emotionOptions

export const relatedFeelingsOptions = i18n.domain.relatedFeelingsOptions

export const interventionContent: Record<InterventionOption, InterventionContentItem> = i18n.domain.interventionContent
