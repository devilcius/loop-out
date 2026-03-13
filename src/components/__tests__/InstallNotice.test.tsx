import { act } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InstallNotice } from '../InstallNotice'

const originalUserAgent = window.navigator.userAgent
const originalMatchMedia = window.matchMedia

function setUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  })
}

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
    configurable: true,
  })
})

afterEach(() => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: originalUserAgent,
    configurable: true,
  })
  Object.defineProperty(window, 'matchMedia', {
    value: originalMatchMedia,
    configurable: true,
  })
  vi.useRealTimers()
})

describe('InstallNotice', () => {
  it('shows iOS manual install guidance after delay', async () => {
    vi.useFakeTimers()
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1')

    render(<InstallNotice />)

    expect(screen.queryByText(/Añadir a pantalla de inicio/i)).not.toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(2500)
    })

    expect(screen.getByText(/Añadir a pantalla de inicio/i)).toBeInTheDocument()
  })

  it('shows install action when beforeinstallprompt is fired', async () => {
    setUserAgent(
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/123.0.0.0 Mobile Safari/537.36',
    )

    const promptMock = vi.fn().mockResolvedValue(undefined)
    const event = new Event('beforeinstallprompt') as Event & {
      prompt: () => Promise<void>
      userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
      preventDefault: () => void
    }
    event.prompt = promptMock
    event.userChoice = Promise.resolve({ outcome: 'accepted', platform: 'web' })

    render(<InstallNotice />)

    act(() => {
      window.dispatchEvent(event)
    })

    const installButton = screen.getByRole('button', { name: 'Instalar' })
    fireEvent.click(installButton)

    await waitFor(() => {
      expect(promptMock).toHaveBeenCalledTimes(1)
    })
  })
})
