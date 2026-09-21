import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Header from '../components/layout/Header.jsx'
import StatsOverview from '../components/dashboard/StatsOverview.jsx'
import EmployeeTable from '../components/employees/EmployeeTable.jsx'
import EmployeeFormModal from '../components/employees/EmployeeFormModal.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import Button from '../components/ui/Button.jsx'
import { useEmployees } from '../context/EmployeeContext.jsx'

export default function Dashboard() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [formState, setFormState] = useState({ open: false, employee: null })
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAddForm = () => setFormState({ open: true, employee: null })
  const openEditForm = (employee) => setFormState({ open: true, employee })
  const closeForm = () => setFormState((s) => ({ ...s, open: false }))

  const handleSubmit = (data) => {
    if (formState.employee) updateEmployee(formState.employee.id, data)
    else addEmployee(data)
    closeForm()
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) deleteEmployee(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Header
          title="Dashboard"
          subtitle="Overview of your team"
          search={search}
          onSearchChange={setSearch}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="animate-fadeUp">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Employee Management
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Track headcount, salaries and team status at a glance.
              </p>
            </div>
            <div className="flex gap-2 animate-fadeUp" style={{ animationDelay: '60ms' }}>
              <div className="w-full md:hidden">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employees..."
                  aria-label="Search employees"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-brand-500"
                />
              </div>
              <Button onClick={openAddForm} className="shrink-0">
                <Plus className="h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>

          <StatsOverview employees={employees} />

          <EmployeeTable
            employees={employees}
            search={search}
            onEdit={openEditForm}
            onDelete={setDeleteTarget}
          />
        </main>
      </div>

      <EmployeeFormModal
        open={formState.open}
        employee={formState.employee}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete this employee?"
        description={
          deleteTarget
            ? `This will permanently remove ${deleteTarget.firstName} ${deleteTarget.lastName} from your team. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete employee"
      />
    </div>
  )
}
