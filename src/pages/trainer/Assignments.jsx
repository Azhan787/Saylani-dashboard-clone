import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { trainerAssignments as initialAssignments } from '../../data/assignments'
import { useToast } from '../../components/ui/Toast'

const emptyForm = { title: '', description: '', course: 'Modern Web Application Development', batch: '20', topics: '', dueDate: '' }

export default function TrainerAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleting, setDeleting] = useState(null)
  const [viewing, setViewing] = useState(null)
  const { showToast } = useToast()

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(a) {
    setForm({
      title: a.title,
      description: a.description || '',
      course: a.course,
      batch: String(a.batch),
      topics: a.topics || '',
      dueDate: a.dueDate,
    })
    setEditingId(a.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.dueDate) return
    if (editingId) {
      setAssignments((list) =>
        list.map((a) => (a.id === editingId ? { ...a, ...form, batch: Number(form.batch) } : a))
      )
      showToast('Assignment updated successfully.', 'success')
    } else {
      setAssignments((list) => [
        ...list,
        {
          id: Math.max(0, ...list.map((a) => a.id)) + 1,
          ...form,
          batch: Number(form.batch),
          submissions: 0,
          total: 24,
          status: 'Active',
        },
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
      <div className="flex justify-end">
        <Button icon={Plus} onClick={openCreate}>
          Create Assignment
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Assignment</th>
                <th className="px-5 py-3 font-medium">Course / Batch</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Submissions</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id} className="border-b border-base-border last:border-0">
                  <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{a.title}</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">
                    {a.course} · Batch {a.batch}
                  </td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{a.dueDate}</td>
                  <td className="px-5 py-4 text-ink-secondary">
                    {a.submissions}/{a.total}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={a.status === 'Active' ? 'ACTIVE' : 'INACTIVE'}>{a.status}</Badge>
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
          <Input
            label="Assignment Title"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-ink-primary">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full bg-base-bg border border-base-border rounded-xl px-4 py-2.5 text-sm text-ink-primary focus:border-brand-blue transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course"
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              options={['Modern Web Application Development', 'Mobile App Development']}
            />
            <Select
              label="Batch"
              value={form.batch}
              onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))}
              options={['20', '21', '22']}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Topics"
              placeholder="e.g. 5 Topics"
              value={form.topics}
              onChange={(e) => setForm((f) => ({ ...f, topics: e.target.value }))}
            />
            <Input
              label="Due Date"
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </div>
        </form>
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

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={`Submissions: ${viewing?.title || ''}`}>
        {viewing && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-ink-secondary">
              {viewing.submissions} of {viewing.total} students have submitted this assignment.
            </p>
            <div className="w-full h-2 bg-base-surface2 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green rounded-full"
                style={{ width: `${(viewing.submissions / viewing.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
