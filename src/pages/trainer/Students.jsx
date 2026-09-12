import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, TrendingUp } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import ProgressBar from '../../components/ui/ProgressBar'
import EmptyState from '../../components/ui/EmptyState'
import { studentsList } from '../../data/students'
import { initials } from '../../utils/helpers'

const statusOptions = ['All', 'Active', 'Probation', 'Inactive']

export default function Students() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return studentsList.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) || s.roll.includes(query)
      const matchesStatus = status === 'All' || s.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or roll number..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
          className="sm:w-44"
        />
      </div>

      <Card className="overflow-hidden">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-muted border-b border-base-border">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Roll No</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Attendance</th>
                  <th className="px-5 py-3 font-medium">Assignments</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-xs font-bold shrink-0">
                          {initials(s.name)}
                        </div>
                        <span className="text-ink-primary font-medium whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-secondary">{s.roll}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[220px] truncate">
                      {s.course}
                    </td>
                    <td className="px-5 py-4 text-ink-secondary">{s.attendance}%</td>
                    <td className="px-5 py-4 text-ink-secondary">{s.assignments}</td>
                    <td className="px-5 py-4">
                      <Badge tone={s.status}>{s.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelected(s)}
                          aria-label={`View ${s.name}`}
                          className="text-ink-muted hover:text-ink-primary"
                        >
                          <Eye size={16} />
                        </button>
                        <button aria-label={`Edit ${s.name}`} className="text-ink-muted hover:text-ink-primary">
                          <Pencil size={16} />
                        </button>
                        <button
                          aria-label={`View progress for ${s.name}`}
                          className="text-ink-muted hover:text-brand-blueLight"
                        >
                          <TrendingUp size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No students found" description="Try adjusting your search or filters." />
        )}
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Student Details">
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-lg font-bold">
                {initials(selected.name)}
              </div>
              <div>
                <p className="font-semibold text-ink-primary">{selected.name}</p>
                <p className="text-sm text-ink-muted">Roll No: {selected.roll}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-ink-secondary">Attendance</span>
                <span className="text-ink-primary font-medium">{selected.attendance}%</span>
              </div>
              <ProgressBar value={selected.attendance} tone={selected.attendance >= 70 ? 'green' : 'amber'} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-muted text-xs mb-1">Course</p>
                <p className="text-ink-primary">{selected.course}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Assignments</p>
                <p className="text-ink-primary">{selected.assignments}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Batch</p>
                <p className="text-ink-primary">{selected.batch}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Status</p>
                <Badge tone={selected.status}>{selected.status}</Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
