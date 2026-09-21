import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { EmployeeProvider } from './context/EmployeeContext.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

function AppShell() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Login />

  return (
    <EmployeeProvider>
      <Dashboard />
    </EmployeeProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
