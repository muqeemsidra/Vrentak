import { useMemo } from 'react'
import { Banknote, Building2, UserCheck, Users } from 'lucide-react'
import StatCard from './StatCard.jsx'
import { formatCurrency } from '../../utils/format.js'

export default function StatsOverview({ employees }) {
  const stats = useMemo(() => {
    const total = employees.length
    const active = employees.filter((e) => e.status === 'Active').length
    const departments = new Set(employees.map((e) => e.department).filter(Boolean)).size
    const avgSalary = total ? employees.reduce((sum, e) => sum + Number(e.salary || 0), 0) / total : 0
    return { total, active, departments, avgSalary }
  }, [employees])

  const cards = [
    {
      label: 'Total Employees',
      value: stats.total,
      icon: Users,
      tone: { iconBg: 'bg-brand-50', iconText: 'text-brand-600', glow: 'bg-brand-200' },
    },
    {
      label: 'Active Employees',
      value: stats.active,
      icon: UserCheck,
      tone: { iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', glow: 'bg-emerald-200' },
    },
    {
      label: 'Departments',
      value: stats.departments,
      icon: Building2,
      tone: { iconBg: 'bg-amber-50', iconText: 'text-amber-600', glow: 'bg-amber-200' },
    },
    {
      label: 'Average Salary',
      value: stats.avgSalary,
      format: formatCurrency,
      icon: Banknote,
      tone: { iconBg: 'bg-violet-50', iconText: 'text-violet-600', glow: 'bg-violet-200' },
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <StatCard key={card.label} {...card} delay={i * 60} />
      ))}
    </div>
  )
}
