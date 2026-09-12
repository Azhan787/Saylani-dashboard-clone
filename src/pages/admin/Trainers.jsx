import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, Trash2, Plus, UserCog2 } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { adminTrainersList, trainerStatusOptions, adminCoursesList } from '../../data/admin'
import { initials } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

const emptyForm = { name: '', email: '', phone: '', course: adminCoursesList[0]?.name || '', batch: '', status: 'Active' }

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState(adminTrainersList)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return trainers.filter((t) => {
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase()) || t.email.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || t.status === status
      return matchesQuery && matchesStatus
    })
  }, [trainers, query, status])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(t) {
    setForm({ name: t.name, email: t.email, phone: t.phone, course: t.course, batch: String(t.batch), status: t.status })
    setEditingId(t.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    if (editingId) {
      setTrainers((list) =>
        list.map((t) =>
          t.id === editingId
            ? { ...t, name: form.name, email: form.email, phone: form.phone, course: form.course, batch: Number(form.batch) || t.batch, status: form.status }
            : t
        )
      )
      showToast('Trainer updated successfully.', 'success')
    } else {
      setTrainers((list) => [
        { id: Math.max(0, ...list.map((t) => t.id)) + 1, name: form.name, email: form.email, phone: form.phone, course: form.course, batch: Number(form.batch) || 0, students: 0, status: form.status },
        ...list,
      ])
      showToast('Trainer added successfully.', 'success')
    }
    setFormOpen(false)
  }

  function handleDelete() {
    setTrainers((list) => list.filter((t) => t.id !== deleting.id))
    showToast('Trainer deleted.', 'success')
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
            placeholder="Search by name or email..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} options={trainerStatusOptions} className="sm:w-44" />
        <Button icon={Plus} onClick={openCreate} className="sm:w-auto whitespace-nowrap">
          Add Trainer
        </Button>
      </div>

      <Card className="overflow-hidden">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-muted border-b border-base-border">
                  <th className="px-5 py-3 font-medium">Trainer</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Assigned Course</th>
                  <th className="px-5 py-3 font-medium">Batch</th>
                  <th className="px-5 py-3 font-medium">Students</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-400/20 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0">
                          {initials(t.name)}
                        </div>
                        <span className="text-ink-primary font-medium whitespace-nowrap">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{t.email}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{t.phone}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[200px] truncate">{t.course}</td>
                    <td className="px-5 py-4 text-ink-secondary">{t.batch}</td>
                    <td className="px-5 py-4 text-ink-secondary">{t.students}</td>
                    <td className="px-5 py-4">
                      <Badge tone={t.status}>{t.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setViewing(t)} aria-label={`View ${t.name}`} className="text-ink-muted hover:text-ink-primary">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => openEdit(t)} aria-label={`Edit ${t.name}`} className="text-ink-muted hover:text-ink-primary">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setDeleting(t)} aria-label={`Delete ${t.name}`} className="text-ink-muted hover:text-red-400">
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
          <EmptyState icon={UserCog2} title="No trainers found" description="Try adjusting your search or filters." />
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Trainer' : 'Add Trainer'}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <Select
              label="Assigned Course"
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              options={adminCoursesList.map((c) => c.name)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Batch" type="number" value={form.batch} onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))} />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              options={['Active', 'On Leave', 'Inactive']}
            />
          </div>
        </form>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Trainer Details">
        {viewing && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-400/20 text-purple-300 flex items-center justify-center text-lg font-bold">
                {initials(viewing.name)}
              </div>
              <div>
                <p className="font-semibold text-ink-primary">{viewing.name}</p>
                <p className="text-sm text-ink-muted">{viewing.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-muted text-xs mb-1">Phone</p>
                <p className="text-ink-primary">{viewing.phone}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Students</p>
                <p className="text-ink-primary">{viewing.students}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Assigned Course</p>
                <p className="text-ink-primary">{viewing.course}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Batch</p>
                <p className="text-ink-primary">{viewing.batch}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Status</p>
                <Badge tone={viewing.status}>{viewing.status}</Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Trainer?"
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
          Are you sure you want to delete "{deleting?.name}"? This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
