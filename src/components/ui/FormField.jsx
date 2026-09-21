export default function FormField({ label, error, children, htmlFor, hint }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClasses = (hasError) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand-500 ${
    hasError ? 'border-rose-300 bg-rose-50/40' : 'border-slate-200 bg-white hover:border-slate-300'
  }`
