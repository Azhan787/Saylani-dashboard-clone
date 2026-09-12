import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, Trash2, Plus, Layers } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { adminBatchesList, batchStatusOptions, adminCoursesList, adminTrainersList } from '../../data/admin'
import { useToast } from '../../components/ui/Toast'

const emptyForm = {
  number: '',
  course: adminCoursesList[0]?.name || '',
  trainer: adminTrainersList[0]?.name || '',
  students: '',
  campus: 'Tayyebah Academy Campus',
  city: 'Karachi',
  schedule: '',
  status: 'Upcoming',
}

export default function AdminBatches() {
  const [batches, setBatches] = useState(adminBatchesList)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return batches.filter((b) => {
      const matchesQuery =
        String(b.number).includes(query) || b.course.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || b.status === status
      return matchesQuery && matchesStatus
    })
  }, [batches, query, status])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(b) {
    setForm({
      number: String(b.number),
      course: b.course,
      trainer: b.trainer,
      students: String(b.students),
      campus: b.campus,
      city: b.city,
      schedule: b.schedule,
      status: b.status,
    })
    setEditingId(b.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.number || !form.course) return
    if (editingId) {
      setBatches((list) =>
        list.map((b) =>
          b.id === editingId
            ? {
                ...b,
                number: Number(form.number),
                course: form.course,
                trainer: form.trainer,
                students: Number(form.students) || b.students,
                campus: form.campus,
                city: form.city,
                schedule: form.schedule,
                status: form.status,
              }
            : b
        )
      )
      showToast('Batch updated successfully.', 'success')
    } else {
      setBatches((list) => [
        {
          id: Math.max(0, ...list.map((b) => b.id)) + 1,
          number: Number(form.number),
          course: form.course,
          trainer: form.trainer,
          students: Number(form.students) || 0,
          campus: form.campus,
          city: form.city,
          schedule: form.schedule,
          status: form.status,
        },
        ...list,
      ])
      showToast('Batch created successfully.', 'success')
    }
    setFormOpen(false)
  }

  function handleDelete() {
    setBatches((list) => list.filter((b) => b.id !== deleting.id))
    showToast('Batch deleted.', 'success')
    setDeleting(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by batch number or course..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} options={batchStatusOptions} className="sm:w-44" />
        <Button icon={Plus} onClick={openCreate} className="sm:w-auto whitespace-nowrap">
          Create Batch
        </Button>
      </div>

      <Card className="overflow-hidden">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-muted border-b border-base-border">
                  <th className="px-5 py-3 font-medium">Batch</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Trainer</th>
                  <th className="px-5 py-3 font-medium">Students</th>
                  <th className="px-5 py-3 font-medium">Campus / City</th>
                  <th className="px-5 py-3 font-medium">Schedule</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">Batch {b.number}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[180px] truncate">{b.course}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{b.trainer}</td>
                    <td className="px-5 py-4 text-ink-secondary">{b.students}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{b.city}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[220px] truncate">{b.schedule}</td>
                    <td className="px-5 py-4">
                      <Badge tone={b.status}>{b.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setViewing(b)} aria-label={`View Batch ${b.number}`} className="text-ink-muted hover:text-ink-primary">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => openEdit(b)} aria-label={`Edit Batch ${b.number}`} className="text-ink-muted hover:text-ink-primary">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setDeleting(b)} aria-label={`Delete Batch ${b.number}`} className="text-ink-muted hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState icon={Layers} title="No batches found" description="Try adjusting your search or filters." />
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Batch' : 'Create Batch'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Batch Number" type="number" required value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))} />
            <Input label="Students" type="number" value={form.students} onChange={(e) => setForm((f) => ({ ...f, students: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course"
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              options={adminCoursesList.map((c) => c.name)}
            />
            <Select
              label="Assign Trainer"
              value={form.trainer}
              onChange={(e) => setForm((f) => ({ ...f, trainer: e.target.value }))}
              options={adminTrainersList.map((t) => t.name)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Campus" value={form.campus} onChange={(e) => setForm((f) => ({ ...f, campus: e.target.value }))} />
            <Input label="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
          </div>
          <Input
            label="Schedule"
            placeholder="e.g. Mon / Wed / Fri · 1:00 PM - 3:00 PM"
            value={form.schedule}
            onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            options={['Active', 'Upcoming', 'Completed']}
          />
        </form>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing ? `Batch ${viewing.number}` : ''}>
        {viewing && (
          <div className="flex flex-col gap-4">
            <Badge tone={viewing.status}>{viewing.status}</Badge>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-muted text-xs mb-1">Course</p>
                <p className="text-ink-primary">{viewing.course}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Trainer</p>
                <p className="text-ink-primary">{viewing.trainer}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Students</p>
                <p className="text-ink-primary">{viewing.students}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Campus</p>
                <p className="text-ink-primary">{viewing.campus}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">City</p>
                <p className="text-ink-primary">{viewing.city}</p>
              </div>
              <div className="col-span-2">
                <p className="text-ink-muted text-xs mb-1">Schedule</p>
                <p className="text-ink-primary">{viewing.schedule}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Batch?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-secondary">
          Are you sure you want to delete Batch {deleting?.number}? This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
