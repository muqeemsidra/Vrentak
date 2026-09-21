import { useCountUp } from '../../hooks/useCountUp.js'

export default function StatCard({ icon: Icon, label, value, format, tone, delay = 0 }) {
  const animated = useCountUp(value)
  const display = format ? format(animated) : Math.round(animated).toLocaleString()

  return (
    <div
      className="tilt-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-card animate-fadeUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${tone.glow}`}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{display}</p>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.iconBg} ${tone.iconText} shadow-soft`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
