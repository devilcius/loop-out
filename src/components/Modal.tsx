import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
  closeAriaLabel?: string
}

export function Modal({ title, onClose, children, closeAriaLabel = 'Cerrar' }: ModalProps) {
  return (
    <div className="modal-overlay" role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
        <button className="modal-close-button" type="button" onClick={onClose} aria-label={closeAriaLabel}>
          ×
        </button>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
