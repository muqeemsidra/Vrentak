import { useMemo, useState } from 'react'
import { Pencil, Trash2, UserRoundX } from 'lucide-react'
import StatusBadge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { avatarColor, formatCurrency, formatDate, initials } from '../../utils/format.js'
import { DEPARTMENTS } from '../../context/EmployeeContext.jsx'

function Avatar({ employee }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
        employee.email,
      )}`}
      aria-hidden="true"
    >
      {initials(employee.firstName, employee.lastName)}
    </div>
  )
}

function RowActions({ employee, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        onClick={() => onEdit(employee)}
        aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
        title="Edit employee"
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(employee)}
        aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
        title="Delete employee"
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function EmployeeTable({ employees, search, onEdit, onDelete }) {
  const [department, setDepartment] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return employees.filter((emp) => {
      const matchesSearch =
        !term ||
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
      const matchesDept = department === 'All' || emp.department === department
      const matchesStatus = status === 'All' || emp.status === status
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [employees, search, department, status])

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-card animate-fadeUp" style={{ animationDelay: '180ms' }}>
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Employees</h2>
          <p className="text-xs text-slate-400">
            {filtered.length} of {employees.length} shown
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filter by department"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 focus:border-brand-500"
          >
            <option value="All">All departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 focus:border-brand-500"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
            <UserRoundX className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-slate-600">No employees found</p>
          <p className="text-xs text-slate-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-semibold">Employee</th>
                  <th className="px-5 py-3 font-semibold">Department</th>
                  <th className="px-5 py-3 font-semibold">Salary</th>
                  <th className="px-5 py-3 font-semibold">Hire Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar employee={emp} />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-800">
                            {emp.firstName} {emp.lastName}
                          </p>
                          <p className="truncate text-xs text-slate-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{emp.department}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">
                      {formatCurrency(emp.salary)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDate(emp.hireDate)}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <RowActions employee={emp} onEdit={onEdit} onDelete={onDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-slate-50 md:hidden">
            {filtered.map((emp) => (
              <li key={emp.id} className="p-4 transition-colors active:bg-slate-50">
                <div className="flex items-start gap-3">
                  <Avatar employee={emp} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800">
                          {emp.firstName} {emp.lastName}
                        </p>
                        <p className="truncate text-xs text-slate-400">{emp.email}</p>
                      </div>
                      <StatusBadge status={emp.status} />
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>{emp.department}</span>
                      <span className="font-medium text-slate-700">{formatCurrency(emp.salary)}</span>
                      <span>{formatDate(emp.hireDate)}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(emp)}>
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button variant="secondary" size="sm" className="flex-1 !text-rose-600" onClick={() => onDelete(emp)}>
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
