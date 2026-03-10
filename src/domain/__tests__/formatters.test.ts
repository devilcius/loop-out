import { describe, expect, it } from 'vitest'
import {
  formatIntensityLabel,
  formatIntervention,
  formatOrientation,
  formatRelatedFeelingsList,
  getEvaluationFeedback,
} from '../formatters'

describe('formatters', () => {
  it('formats orientation labels', () => {
    expect(formatOrientation(null)).toBe('')
    expect(formatOrientation('past')).toBe('pasado')
    expect(formatOrientation('future')).toBe('futuro')
  })

  it('formats intervention labels', () => {
    expect(formatIntervention('feel-present')).toBe('Sentir el presente')
  })

  it('formats intensity labels', () => {
    expect(formatIntensityLabel(null)).toBe('')
    expect(formatIntensityLabel(0)).toBe('')
    expect(formatIntensityLabel(5)).toBe('Muy alta')
    expect(formatIntensityLabel(9)).toBe('9')
  })

  it('deduplicates related feelings case/diacritic-insensitively while preserving order', () => {
    const list = formatRelatedFeelingsList([' Tensión ', 'tension', 'Inquietud', 'inquietud', 'Ánimo', 'animo'])

    expect(list).toBe('tensión, inquietud, ánimo')
  })

  it('returns evaluation feedback by intensity range', () => {
    expect(getEvaluationFeedback(2).imageSrc).toBe('/img/feedback-low.png')
    expect(getEvaluationFeedback(3).imageSrc).toBe('/img/feedback-medium.png')
    expect(getEvaluationFeedback(4).imageSrc).toBe('/img/feedback-medium.png')
    expect(getEvaluationFeedback(5).imageSrc).toBe('/img/feedback-high.png')
  })
})
