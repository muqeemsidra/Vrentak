import { Building2, LayoutDashboard, Settings, Users, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Employees', icon: Users, active: false },
  { label: 'Settings', icon: Settings, active: false },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden animate-fadeIn"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">Vrentak</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
                active
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 p-4">
            <p className="text-xs font-semibold text-brand-700">Need help?</p>
            <p className="mt-1 text-xs text-slate-500">
              Manage your team efficiently with Vrentak's dashboard tools.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
