import '@testing-library/jest-dom/vitest'
import { beforeEach } from 'vitest'

beforeEach(() => {
  localStorage.clear()
})

Object.defineProperty(window.navigator, 'language', {
  configurable: true,
  value: 'es-ES',
})

Object.defineProperty(window.navigator, 'languages', {
  configurable: true,
  value: ['es-ES'],
})
