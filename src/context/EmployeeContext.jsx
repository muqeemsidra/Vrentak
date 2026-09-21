import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const EmployeeContext = createContext(null)
const STORAGE_KEY = 'vrentak.employees'

export const DEPARTMENTS = [
  'Engineering',
  'Sales',
  'Marketing',
  'Design',
  'Human Resources',
  'Finance',
]

const SEED_EMPLOYEES = [
  { firstName: 'Susan', lastName: 'Jordon', email: 'susan@example.com', salary: 95000, hireDate: '2019-04-11', department: 'Engineering', status: 'Active' },
  { firstName: 'Adrienne', lastName: 'Doak', email: 'adrienne@example.com', salary: 80000, hireDate: '2019-04-17', department: 'Marketing', status: 'Active' },
  { firstName: 'Rolf', lastName: 'Hegdal', email: 'rolf@example.com', salary: 79000, hireDate: '2019-05-01', department: 'Sales', status: 'Active' },
  { firstName: 'Kent', lastName: 'Rosner', email: 'kent@example.com', salary: 56000, hireDate: '2019-05-03', department: 'Support', status: 'Inactive' },
  { firstName: 'Arsenio', lastName: 'Grant', email: 'arsenio@example.com', salary: 65000, hireDate: '2019-06-13', department: 'Design', status: 'Active' },
  { firstName: 'Laurina', lastName: 'Luria', email: 'laurina@example.com', salary: 120000, hireDate: '2019-07-30', department: 'Engineering', status: 'Active' },
  { firstName: 'George', lastName: 'Tallman', email: 'george@example.com', salary: 90000, hireDate: '2019-08-15', department: 'Finance', status: 'Active' },
  { firstName: 'Jesica', lastName: 'Wallington', email: 'jesica@example.com', salary: 60000, hireDate: '2019-10-10', department: 'Human Resources', status: 'Inactive' },
  { firstName: 'Matthew', lastName: 'Warren', email: 'matthew@example.com', salary: 71000, hireDate: '2019-10-15', department: 'Sales', status: 'Active' },
  { firstName: 'Lyndsey', lastName: 'Follette', email: 'lyndsey@example.com', salary: 110000, hireDate: '2020-01-15', department: 'Engineering', status: 'Active' },
].map((e, i) => ({ id: String(i + 1), ...e }))

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* fall through to seed */
  }
  return SEED_EMPLOYEES
}

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
    } catch {
      /* storage unavailable, ignore */
    }
  }, [employees])

  const value = useMemo(
    () => ({
      employees,
      addEmployee: (data) => {
        setEmployees((prev) => [
          ...prev,
          { id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()), status: 'Active', ...data },
        ])
      },
      updateEmployee: (id, data) => {
        setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp)))
      },
      deleteEmployee: (id) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id))
      },
    }),
    [employees],
  )

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext)
  if (!ctx) throw new Error('useEmployees must be used within EmployeeProvider')
  return ctx
}
