import { useState } from 'react'
import { Plus, Pencil, Trash2, BarChart3 } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import StatCard from '../../components/dashboard/StatCard'
import { trainerQuizzes as initialQuizzes } from '../../data/quizzes'
import { useToast } from '../../components/ui/Toast'
import { ClipboardCheck, Users, Percent } from 'lucide-react'

const emptyForm = { title: '', module: 'Modern Front-End Development', questions: '', passPercentage: '', timeLimit: '' }

export default function TrainerQuizzes() {
  const [quizzes, setQuizzes] = useState(initialQuizzes)
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

  function openEdit(q) {
    setForm({
      title: q.title,
      module: q.module,
      questions: String(q.questions),
      passPercentage: String(q.passPercentage),
      timeLimit: String(q.timeLimit),
    })
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
            ? {
                ...q,
                title: form.title,
                module: form.module,
                questions: Number(form.questions),
                passPercentage: Number(form.passPercentage),
                timeLimit: Number(form.timeLimit),
              }
            : q
        )
      )
      showToast('Quiz updated successfully.', 'success')
    } else {
      setQuizzes((list) => [
        ...list,
        {
          id: Math.max(0, ...list.map((q) => q.id)) + 1,
          title: form.title,
          module: form.module,
          questions: Number(form.questions),
          passPercentage: Number(form.passPercentage),
          timeLimit: Number(form.timeLimit),
          attempts: 0,
          avgScore: 0,
        },
      ])
      showToast('Quiz created successfully.', 'success')
    }
    setFormOpen(false)
  }

  function handleDelete() {
    setQuizzes((list) => list.filter((q) => q.id !== deleting.id))
    showToast('Quiz deleted.', 'success')
    setDeleting(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={ClipboardCheck} iconColor="text-brand-blueLight" iconBg="bg-brand-blue/10" value={quizzes.length} label="Total Quizzes" />
        <StatCard icon={Users} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={quizzes.reduce((s, q) => s + q.attempts, 0)} label="Total Attempts" />
        <StatCard
          icon={Percent}
          iconColor="text-amber-400"
          iconBg="bg-amber-400/10"
          value={`${Math.round(quizzes.reduce((s, q) => s + q.avgScore, 0) / (quizzes.length || 1))}%`}
          label="Avg. Score"
        />
      </div>

      <div className="flex justify-end">
        <Button icon={Plus} onClick={openCreate}>
          Create Quiz
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Module</th>
                <th className="px-5 py-3 font-medium">Questions</th>
                <th className="px-5 py-3 font-medium">Pass %</th>
                <th className="px-5 py-3 font-medium">Time Limit</th>
                <th className="px-5 py-3 font-medium">Attempts</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => (
                <tr key={q.id} className="border-b border-base-border last:border-0">
                  <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{q.title}</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{q.module}</td>
                  <td className="px-5 py-4 text-ink-secondary">{q.questions}</td>
                  <td className="px-5 py-4 text-ink-secondary">{q.passPercentage}%</td>
                  <td className="px-5 py-4 text-ink-secondary">{q.timeLimit} min</td>
                  <td className="px-5 py-4 text-ink-secondary">{q.attempts}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setViewing(q)} aria-label={`View stats for ${q.title}`} className="text-ink-muted hover:text-ink-primary">
                        <BarChart3 size={16} />
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
          <Input
            label="Quiz Title"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Select
            label="Module"
            value={form.module}
            onChange={(e) => setForm((f) => ({ ...f, module: e.target.value }))}
            options={['Web Designing', 'Front-End Development', 'Modern Front-End Development', 'Back-End Development']}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Questions"
              type="number"
              required
              value={form.questions}
              onChange={(e) => setForm((f) => ({ ...f, questions: e.target.value }))}
            />
            <Input
              label="Pass %"
              type="number"
              value={form.passPercentage}
              onChange={(e) => setForm((f) => ({ ...f, passPercentage: e.target.value }))}
            />
            <Input
              label="Time Limit (min)"
              type="number"
              value={form.timeLimit}
              onChange={(e) => setForm((f) => ({ ...f, timeLimit: e.target.value }))}
            />
          </div>
        </form>
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

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={`Stats: ${viewing?.title || ''}`}>
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
          </div>
        )}
      </Modal>
    </div>
  )
}
