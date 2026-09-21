import { useState } from 'react'
import { Building2, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import FormField, { inputClasses } from '../components/ui/FormField.jsx'
import Button from '../components/ui/Button.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (!password) nextErrors.password = 'Password is required.'
    else if (password.length < 4) nextErrors.password = 'Password must be at least 4 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      login(email.trim())
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50 px-4">
      <div className="w-full max-w-md animate-fadeUp">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lift">
            <Building2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome to Vrentak</h1>
          <p className="mt-1.5 text-sm text-slate-500">Sign in to manage your employees</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-100 bg-white p-7 shadow-card"
        >
          <div className="space-y-5">
            <FormField label="Email address" htmlFor="email" error={errors.email}>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClasses(Boolean(errors.email))} pl-10`}
                  aria-invalid={Boolean(errors.email)}
                />
              </div>
            </FormField>

            <FormField label="Password" htmlFor="password" error={errors.password}>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClasses(Boolean(errors.password))} pl-10`}
                  aria-invalid={Boolean(errors.password)}
                />
              </div>
            </FormField>
          </div>

          <Button type="submit" className="mt-6 w-full">
            Sign in
          </Button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Demo access &mdash; enter any email and password to continue.
          </p>
        </form>
      </div>
    </div>
  )
}
