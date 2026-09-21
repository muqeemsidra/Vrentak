import { useEffect, useRef, useState } from 'react'
import { Bell, LogOut, Menu, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Header({ title, subtitle, search, onSearchChange, onMenuClick }) {
  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const profileRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initial = (user?.name?.[0] || 'A').toUpperCase()

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-100 bg-white/80 px-4 glass-surface sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {title}
        </h1>
        {subtitle && <p className="hidden truncate text-xs text-slate-400 sm:block">{subtitle}</p>}
      </div>

      <div className="relative hidden w-full max-w-xs md:block">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search employees..."
          aria-label="Search employees"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 transition-colors focus:border-brand-500 focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="View notifications"
            aria-expanded={notifOpen}
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 origin-top-right animate-scaleIn rounded-xl border border-slate-100 bg-white p-2 shadow-lift">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Notifications
              </p>
              <div className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                Welcome back! Your dashboard has been updated.
              </div>
              <div className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                2 employees are pending review.
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
              {initial}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {user?.name || 'Admin'}
            </span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right animate-scaleIn rounded-xl border border-slate-100 bg-white p-2 shadow-lift">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-medium text-slate-800">{user?.name}</p>
                <p className="truncate text-xs text-slate-400">{user?.email}</p>
              </div>
              <hr className="my-1 border-slate-100" />
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
