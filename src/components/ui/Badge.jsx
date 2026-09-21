import { CheckCircle2, CircleSlash } from 'lucide-react'

const STYLES = {
  Active: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  Inactive: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
}

const ICONS = {
  Active: CheckCircle2,
  Inactive: CircleSlash,
}

export default function StatusBadge({ status }) {
  const Icon = ICONS[status] ?? CheckCircle2
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status] ?? STYLES.Inactive}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </span>
  )
}
