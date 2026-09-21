import { useEffect, useState } from 'react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import FormField, { inputClasses } from '../ui/FormField.jsx'
import { DEPARTMENTS } from '../../context/EmployeeContext.jsx'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  department: DEPARTMENTS[0],
  salary: '',
  hireDate: '',
  status: 'Active',
}

function validate(form) {
  const errors = {}
  if (!form.firstName.trim()) errors.firstName = 'First name is required.'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.salary || Number.isNaN(Number(form.salary))) errors.salary = 'Enter a valid salary amount.'
  else if (Number(form.salary) <= 0) errors.salary = 'Salary must be greater than zero.'
  if (!form.hireDate) errors.hireDate = 'Hire date is required.'
  return errors
}

export default function EmployeeFormModal({ open, onClose, onSubmit, employee }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const isEditing = Boolean(employee)

  useEffect(() => {
    if (open) {
      setForm(
        employee
          ? { ...EMPTY_FORM, ...employee, salary: String(employee.salary) }
          : EMPTY_FORM,
      )
      setErrors({})
    }
  }, [open, employee])

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit({ ...form, salary: Number(form.salary) })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Employee' : 'Add Employee'}
      description={
        isEditing ? 'Update this employee’s details.' : 'Fill in the details to add a new employee.'
      }
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Personal information
          </legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="First name" htmlFor="firstName" error={errors.firstName}>
              <input
                id="firstName"
                value={form.firstName}
                onChange={setField('firstName')}
                className={inputClasses(Boolean(errors.firstName))}
                aria-invalid={Boolean(errors.firstName)}
                placeholder="Jane"
              />
            </FormField>
            <FormField label="Last name" htmlFor="lastName" error={errors.lastName}>
              <input
                id="lastName"
                value={form.lastName}
                onChange={setField('lastName')}
                className={inputClasses(Boolean(errors.lastName))}
                aria-invalid={Boolean(errors.lastName)}
                placeholder="Doe"
              />
            </FormField>
          </div>
          <FormField label="Email address" htmlFor="email" error={errors.email}>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={setField('email')}
              className={inputClasses(Boolean(errors.email))}
              aria-invalid={Boolean(errors.email)}
              placeholder="jane@example.com"
            />
          </FormField>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Employment details
          </legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Department" htmlFor="department">
              <select
                id="department"
                value={form.department}
                onChange={setField('department')}
                className={inputClasses(false)}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Status" htmlFor="status">
              <select
                id="status"
                value={form.status}
                onChange={setField('status')}
                className={inputClasses(false)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </FormField>
            <FormField label="Salary (USD)" htmlFor="salary" error={errors.salary}>
              <input
                id="salary"
                type="number"
                min="0"
                step="1000"
                value={form.salary}
                onChange={setField('salary')}
                className={inputClasses(Boolean(errors.salary))}
                aria-invalid={Boolean(errors.salary)}
                placeholder="75000"
              />
            </FormField>
            <FormField label="Hire date" htmlFor="hireDate" error={errors.hireDate}>
              <input
                id="hireDate"
                type="date"
                value={form.hireDate}
                onChange={setField('hireDate')}
                className={inputClasses(Boolean(errors.hireDate))}
                aria-invalid={Boolean(errors.hireDate)}
              />
            </FormField>
          </div>
        </fieldset>

        <div className="flex gap-3 pt-1">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {isEditing ? 'Save changes' : 'Add employee'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
