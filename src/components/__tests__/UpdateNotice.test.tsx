import { act } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UpdateNotice } from '../UpdateNotice'

const { registerSWMock } = vi.hoisted(() => ({
  registerSWMock: vi.fn(),
}))

vi.mock('virtual:pwa-register', () => ({
  registerSW: registerSWMock,
}))

describe('UpdateNotice', () => {
  beforeEach(() => {
    registerSWMock.mockReset()
  })

  it('shows an update prompt when a new version is available and applies it on demand', async () => {
    const updateServiceWorker = vi.fn().mockResolvedValue(undefined)
    registerSWMock.mockReturnValue(updateServiceWorker)

    render(<UpdateNotice enabled />)

    const options = registerSWMock.mock.calls[0][0] as {
      onNeedRefresh?: () => void
      onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void
    }

    act(() => {
      options.onNeedRefresh?.()
    })

    expect(screen.getByText('Hay una nueva versión disponible')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Actualizar' }))

    await waitFor(() => {
      expect(updateServiceWorker).toHaveBeenCalledWith(true)
    })
  })

  it('rechecks for updates when the browser comes back online', () => {
    const updateServiceWorker = vi.fn().mockResolvedValue(undefined)
    const registrationUpdate = vi.fn().mockResolvedValue(undefined)
    registerSWMock.mockReturnValue(updateServiceWorker)

    render(<UpdateNotice enabled />)

    const options = registerSWMock.mock.calls[0][0] as {
      onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void
    }

    act(() => {
      options.onRegisteredSW?.('sw.js', { update: registrationUpdate } as unknown as ServiceWorkerRegistration)
      window.dispatchEvent(new Event('online'))
    })

    expect(registrationUpdate).toHaveBeenCalledTimes(1)
  })
})
