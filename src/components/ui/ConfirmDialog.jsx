import { AlertTriangle } from 'lucide-react'
import Modal from './Modal.jsx'
import Button from './Button.jsx'

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Delete',
  isDestructive = true,
}) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-sm" title="">
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
            isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-brand-50 text-brand-600'
          }`}
        >
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
        <div className="mt-6 flex w-full gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
