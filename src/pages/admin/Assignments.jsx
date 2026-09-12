import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, Trash2, Plus, FileText } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import ProgressBar from '../../components/ui/ProgressBar'
import { adminAssignmentsList, assignmentStatusOptions, adminCoursesList } from '../../data/admin'
import { useToast } from '../../components/ui/Toast'

const emptyForm = { title: '', course: adminCoursesList[0]?.name || '', batch: '', dueDate: '', status: 'Active' }

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState(adminAssignmentsList)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return assignments.filter((a) => {
      const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || a.status === status
      return matchesQuery && matchesStatus
    })
  }, [assignments, query, status])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(a) {
    setForm({ title: a.title, course: a.course, batch: String(a.batch), dueDate: a.dueDate, status: a.status })
    setEditingId(a.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.dueDate) return
    if (editingId) {
      setAssignments((list) =>
        list.map((a) =>
          a.id === editingId
            ? { ...a, title: form.title, course: form.course, batch: Number(form.batch) || a.batch, dueDate: form.dueDate, status: form.status }
            : a
        )
      )
      showToast('Assignment updated successfully.', 'success')
    } else {
      setAssignments((list) => [
        {
          id: Math.max(0, ...list.map((a) => a.id)) + 1,
          title: form.title,
          course: form.course,
          batch: Number(form.batch) || 0,
          dueDate: form.dueDate,
          submissions: 0,
          total: 24,
          pending: 24,
          approved: 0,
          rejected: 0,
          status: form.status,
        },
        ...list,
      ])
      showToast('Assignment created successfully.', 'success')
    }
    setFormOpen(false)
  }

  function handleDelete() {
    setAssignments((list) => list.filter((a) => a.id !== deleting.id))
    showToast('Assignment deleted.', 'success')
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
            placeholder="Search assignments..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} options={assignmentStatusOptions} className="sm:w-44" />
        <Button icon={Plus} onClick={openCreate} className="sm:w-auto whitespace-nowrap">
          Create Assignment
        </Button>
      </div>

      <Card className="overflow-hidden">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-muted border-b border-base-border">
                  <th className="px-5 py-3 font-medium">Assignment</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Batch</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium">Submissions</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{a.title}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[200px] truncate">{a.course}</td>
                    <td className="px-5 py-4 text-ink-secondary">{a.batch}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{a.dueDate}</td>
                    <td className="px-5 py-4 text-ink-secondary">{a.submissions}/{a.total}</td>
                    <td className="px-5 py-4">
                      <Badge tone={a.status}>{a.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setViewing(a)} aria-label={`View submissions for ${a.title}`} className="text-ink-muted hover:text-ink-primary">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => openEdit(a)} aria-label={`Edit ${a.title}`} className="text-ink-muted hover:text-ink-primary">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setDeleting(a)} aria-label={`Delete ${a.title}`} className="text-ink-muted hover:text-red-400">
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
          <EmptyState icon={FileText} title="No assignments found" description="Try adjusting your search or filters." />
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Assignment' : 'Create Assignment'}
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
          <Input label="Assignment Title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course"
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              options={adminCoursesList.map((c) => c.name)}
            />
            <Input label="Batch" type="number" value={form.batch} onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" required value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              options={['Active', 'Closed']}
            />
          </div>
        </form>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={`Submissions: ${viewing?.title || ''}`}>
        {viewing && (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-ink-secondary">Submitted</span>
                <span className="text-ink-primary font-medium">{viewing.submissions}/{viewing.total}</span>
              </div>
              <ProgressBar value={(viewing.submissions / viewing.total) * 100} tone="blue" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-base-surface2 rounded-xl py-3">
                <p className="text-lg font-bold text-amber-400">{viewing.pending}</p>
                <p className="text-xs text-ink-muted mt-0.5">Pending</p>
              </div>
              <div className="bg-base-surface2 rounded-xl py-3">
                <p className="text-lg font-bold text-brand-green">{viewing.approved}</p>
                <p className="text-xs text-ink-muted mt-0.5">Approved</p>
              </div>
              <div className="bg-base-surface2 rounded-xl py-3">
                <p className="text-lg font-bold text-red-400">{viewing.rejected}</p>
                <p className="text-xs text-ink-muted mt-0.5">Rejected</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Assignment?"
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
          Are you sure you want to delete "{deleting?.title}"? This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
