import { useState } from 'react'
import { Plus, Pencil, Trash2, Megaphone, Radio } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { adminAnnouncementsList, announcementAudiences, announcementPriorities } from '../../data/admin'
import { useToast } from '../../components/ui/Toast'

const emptyForm = { title: '', description: '', audience: announcementAudiences[0], priority: 'Medium', status: 'Draft' }

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(adminAnnouncementsList)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(a) {
    setForm({ title: a.title, description: a.description, audience: a.audience, priority: a.priority, status: a.status })
    setEditingId(a.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    const today = new Date().toISOString().slice(0, 10)
    if (editingId) {
      setAnnouncements((list) =>
        list.map((a) =>
          a.id === editingId
            ? { ...a, title: form.title, description: form.description, audience: form.audience, priority: form.priority, status: form.status }
            : a
        )
      )
      showToast('Announcement updated successfully.', 'success')
    } else {
      setAnnouncements((list) => [
        { id: Math.max(0, ...list.map((a) => a.id)) + 1, title: form.title, description: form.description, audience: form.audience, priority: form.priority, date: today, status: form.status },
        ...list,
      ])
      showToast('Announcement created successfully.', 'success')
    }
    setFormOpen(false)
  }

  function togglePublish(a) {
    setAnnouncements((list) =>
      list.map((item) => (item.id === a.id ? { ...item, status: item.status === 'Published' ? 'Draft' : 'Published' } : item))
    )
    showToast(a.status === 'Published' ? `"${a.title}" moved to draft.` : `"${a.title}" published.`, 'success')
  }

  function handleDelete() {
    setAnnouncements((list) => list.filter((a) => a.id !== deleting.id))
    showToast('Announcement deleted.', 'success')
    setDeleting(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button icon={Plus} onClick={openCreate}>
          Create Announcement
        </Button>
      </div>

      {announcements.length ? (
        <div className="flex flex-col gap-4">
          {announcements.map((a) => (
            <Card key={a.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Megaphone size={16} className="text-brand-blueLight" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-ink-primary">{a.title}</h3>
                      <Badge tone={a.priority.toUpperCase()}>{a.priority}</Badge>
                      <Badge tone={a.status === 'Published' ? 'PUBLISHED' : 'DRAFT'}>{a.status}</Badge>
                    </div>
                    <p className="text-sm text-ink-secondary">{a.description}</p>
                    <p className="text-xs text-ink-muted mt-2">
                      {a.audience} · {a.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 sm:pt-1">
                  <button onClick={() => togglePublish(a)} aria-label={`Toggle publish for ${a.title}`} className="text-ink-muted hover:text-brand-blueLight">
                    <Radio size={16} />
                  </button>
                  <button onClick={() => openEdit(a)} aria-label={`Edit ${a.title}`} className="text-ink-muted hover:text-ink-primary">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleting(a)} aria-label={`Delete ${a.title}`} className="text-ink-muted hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState icon={Megaphone} title="No announcements yet" description="Create your first announcement to get started." />
        </Card>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Announcement' : 'Create Announcement'}
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
          <Input label="Title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
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
              label="Audience"
              value={form.audience}
              onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
              options={announcementAudiences}
            />
            <Select
              label="Priority"
              value={form.priority}
              onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
              options={announcementPriorities}
            />
          </div>
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            options={['Draft', 'Published']}
          />
        </form>
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Announcement?"
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
