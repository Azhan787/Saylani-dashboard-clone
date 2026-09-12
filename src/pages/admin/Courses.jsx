import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, Trash2, Plus, BookOpen } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { adminCoursesList, courseStatusOptions, adminTrainersList } from '../../data/admin'
import { useToast } from '../../components/ui/Toast'

const emptyForm = { name: '', description: '', duration: '', trainer: 'Unassigned', totalTopics: '', status: 'Active' }

export default function AdminCourses() {
  const [courses, setCourses] = useState(adminCoursesList)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || c.status === status
      return matchesQuery && matchesStatus
    })
  }, [courses, query, status])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(c) {
    setForm({ name: c.name, description: c.description, duration: c.duration, trainer: c.trainer, totalTopics: String(c.totalTopics), status: c.status })
    setEditingId(c.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editingId) {
      setCourses((list) =>
        list.map((c) =>
          c.id === editingId
            ? { ...c, name: form.name, description: form.description, duration: form.duration, trainer: form.trainer, totalTopics: Number(form.totalTopics) || c.totalTopics, status: form.status }
            : c
        )
      )
      showToast('Course updated successfully.', 'success')
    } else {
      setCourses((list) => [
        { id: Math.max(0, ...list.map((c) => c.id)) + 1, name: form.name, description: form.description, duration: form.duration, trainer: form.trainer, totalTopics: Number(form.totalTopics) || 0, status: form.status },
        ...list,
      ])
      showToast('Course created successfully.', 'success')
    }
    setFormOpen(false)
  }

  function handleDelete() {
    setCourses((list) => list.filter((c) => c.id !== deleting.id))
    showToast('Course deleted.', 'success')
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
            placeholder="Search courses..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} options={courseStatusOptions} className="sm:w-44" />
        <Button icon={Plus} onClick={openCreate} className="sm:w-auto whitespace-nowrap">
          Add Course
        </Button>
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <Card key={c.id} className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <BookOpen size={20} className="text-brand-blueLight" />
                </div>
                <Badge tone={c.status}>{c.status}</Badge>
              </div>
              <div>
                <h3 className="font-semibold text-ink-primary mb-1">{c.name}</h3>
                <p className="text-xs text-ink-muted line-clamp-2">{c.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-ink-secondary">
                <div>
                  <p className="text-ink-muted">Duration</p>
                  <p className="text-ink-primary font-medium mt-0.5">{c.duration}</p>
                </div>
                <div>
                  <p className="text-ink-muted">Topics</p>
                  <p className="text-ink-primary font-medium mt-0.5">{c.totalTopics}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-ink-muted">Trainer</p>
                  <p className="text-ink-primary font-medium mt-0.5 truncate">{c.trainer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1 border-t border-base-border mt-1">
                <button onClick={() => setViewing(c)} className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink-primary pt-3">
                  <Eye size={14} /> View
                </button>
                <button onClick={() => openEdit(c)} className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink-primary pt-3">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => setDeleting(c)} className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-red-400 pt-3 ml-auto">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState icon={BookOpen} title="No courses found" description="Try adjusting your search or filters." />
        </Card>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Course' : 'Add Course'}
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
          <Input label="Course Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
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
            <Input label="Duration" placeholder="e.g. 4 months" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} />
            <Input label="Total Topics" type="number" value={form.totalTopics} onChange={(e) => setForm((f) => ({ ...f, totalTopics: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Trainer"
              value={form.trainer}
              onChange={(e) => setForm((f) => ({ ...f, trainer: e.target.value }))}
              options={['Unassigned', ...adminTrainersList.map((t) => t.name)]}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              options={['Active', 'Draft', 'Archived']}
            />
          </div>
        </form>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing?.name}>
        {viewing && (
          <div className="flex flex-col gap-4">
            <Badge tone={viewing.status}>{viewing.status}</Badge>
            <p className="text-sm text-ink-secondary leading-relaxed">{viewing.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-muted text-xs mb-1">Duration</p>
                <p className="text-ink-primary">{viewing.duration}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Total Topics</p>
                <p className="text-ink-primary">{viewing.totalTopics}</p>
              </div>
              <div className="col-span-2">
                <p className="text-ink-muted text-xs mb-1">Trainer</p>
                <p className="text-ink-primary">{viewing.trainer}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Course?"
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
