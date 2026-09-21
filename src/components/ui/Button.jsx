const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-soft hover:bg-brand-700 active:bg-brand-800 active:scale-[0.98]',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:scale-[0.98]',
  danger:
    'bg-rose-600 text-white shadow-soft hover:bg-rose-700 active:bg-rose-800 active:scale-[0.98]',
  ghost: 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98]',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
