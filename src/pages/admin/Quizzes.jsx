import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, Trash2, Plus, ClipboardCheck, Radio } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { adminQuizzesList, adminCoursesList } from '../../data/admin'
import { useToast } from '../../components/ui/Toast'

const publishOptions = ['All', 'Published', 'Unpublished']
const emptyForm = { title: '', course: adminCoursesList[0]?.name || '', batch: '', questions: '' }

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState(adminQuizzesList)
  const [query, setQuery] = useState('')
  const [publishFilter, setPublishFilter] = useState('All')

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      const matchesQuery = q.title.toLowerCase().includes(query.toLowerCase())
      const matchesPublish =
        publishFilter === 'All' || (publishFilter === 'Published' ? q.published : !q.published)
      return matchesQuery && matchesPublish
    })
  }, [quizzes, query, publishFilter])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(q) {
    setForm({ title: q.title, course: q.course, batch: String(q.batch), questions: String(q.questions) })
    setEditingId(q.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.questions) return
    if (editingId) {
      setQuizzes((list) =>
        list.map((q) =>
          q.id === editingId
            ? { ...q, title: form.title, course: form.course, batch: Number(form.batch) || q.batch, questions: Number(form.questions) }
            : q
        )
      )
      showToast('Quiz updated successfully.', 'success')
    } else {
      setQuizzes((list) => [
        {
          id: Math.max(0, ...list.map((q) => q.id)) + 1,
          title: form.title,
          course: form.course,
          batch: Number(form.batch) || 0,
          questions: Number(form.questions),
          attempts: 0,
          avgScore: 0,
          published: false,
        },
        ...list,
      ])
      showToast('Quiz created successfully.', 'success')
    }
    setFormOpen(false)
  }

  function togglePublish(q) {
    setQuizzes((list) => list.map((item) => (item.id === q.id ? { ...item, published: !item.published } : item)))
    showToast(q.published ? `"${q.title}" unpublished.` : `"${q.title}" published.`, 'success')
  }

  function handleDelete() {
    setQuizzes((list) => list.filter((q) => q.id !== deleting.id))
    showToast('Quiz deleted.', 'success')
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
            placeholder="Search quizzes..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select value={publishFilter} onChange={(e) => setPublishFilter(e.target.value)} options={publishOptions} className="sm:w-44" />
        <Button icon={Plus} onClick={openCreate} className="sm:w-auto whitespace-nowrap">
          Create Quiz
        </Button>
      </div>

      <Card className="overflow-hidden">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-muted border-b border-base-border">
                  <th className="px-5 py-3 font-medium">Quiz</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Batch</th>
                  <th className="px-5 py-3 font-medium">Questions</th>
                  <th className="px-5 py-3 font-medium">Attempts</th>
                  <th className="px-5 py-3 font-medium">Avg. Score</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{q.title}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[180px] truncate">{q.course}</td>
                    <td className="px-5 py-4 text-ink-secondary">{q.batch}</td>
                    <td className="px-5 py-4 text-ink-secondary">{q.questions}</td>
                    <td className="px-5 py-4 text-ink-secondary">{q.attempts}</td>
                    <td className="px-5 py-4 text-ink-secondary">{q.avgScore}%</td>
                    <td className="px-5 py-4">
                      <button onClick={() => togglePublish(q)}>
                        <Badge tone={q.published ? 'PUBLISHED' : 'DRAFT'}>
                          {q.published ? 'Published' : 'Unpublished'}
                        </Badge>
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setViewing(q)} aria-label={`View results for ${q.title}`} className="text-ink-muted hover:text-ink-primary">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => togglePublish(q)} aria-label={`Toggle publish for ${q.title}`} className="text-ink-muted hover:text-brand-blueLight">
                          <Radio size={16} />
                        </button>
                        <button onClick={() => openEdit(q)} aria-label={`Edit ${q.title}`} className="text-ink-muted hover:text-ink-primary">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setDeleting(q)} aria-label={`Delete ${q.title}`} className="text-ink-muted hover:text-red-400">
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
          <EmptyState icon={ClipboardCheck} title="No quizzes found" description="Try adjusting your search or filters." />
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Quiz' : 'Create Quiz'}
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
          <Input label="Quiz Title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Course"
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              options={adminCoursesList.map((c) => c.name)}
            />
            <Input label="Batch" type="number" value={form.batch} onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))} />
          </div>
          <Input label="Number of Questions" type="number" required value={form.questions} onChange={(e) => setForm((f) => ({ ...f, questions: e.target.value }))} />
        </form>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={`Results: ${viewing?.title || ''}`}>
        {viewing && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-ink-muted text-xs mb-1">Total Attempts</p>
              <p className="text-ink-primary text-lg font-semibold">{viewing.attempts}</p>
            </div>
            <div>
              <p className="text-ink-muted text-xs mb-1">Average Score</p>
              <p className="text-ink-primary text-lg font-semibold">{viewing.avgScore}%</p>
            </div>
            <div>
              <p className="text-ink-muted text-xs mb-1">Course</p>
              <p className="text-ink-primary">{viewing.course}</p>
            </div>
            <div>
              <p className="text-ink-muted text-xs mb-1">Status</p>
              <Badge tone={viewing.published ? 'PUBLISHED' : 'DRAFT'}>{viewing.published ? 'Published' : 'Unpublished'}</Badge>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Quiz?"
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
