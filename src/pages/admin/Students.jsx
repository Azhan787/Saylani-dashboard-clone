import { useMemo, useState } from 'react'
import { Search, Eye, Pencil, Trash2, Plus, ChevronLeft, ChevronRight, UserRound } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import ProgressBar from '../../components/ui/ProgressBar'
import { adminStudentsList, studentStatusOptions } from '../../data/admin'
import { adminCoursesList } from '../../data/admin'
import { initials } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

const PAGE_SIZE = 8

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  cnic: '',
  dob: '',
  course: adminCoursesList[0]?.name || '',
  batch: '',
  password: '',
  status: 'Active',
}

export default function AdminStudents() {
  const [students, setStudents] = useState(adminStudentsList)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { showToast } = useToast()

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.roll.includes(query) ||
        s.email.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'All' || s.status === status
      return matchesQuery && matchesStatus
    })
  }, [students, query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setFormOpen(true)
  }

  function openEdit(s) {
    setForm({
      fullName: s.name,
      email: s.email,
      phone: s.phone,
      cnic: s.cnic,
      dob: s.dob,
      course: s.course,
      batch: String(s.batch),
      password: '',
      status: s.status,
    })
    setEditingId(s.id)
    setFormOpen(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.fullName.trim() || !form.email.trim()) return

    if (editingId) {
      setStudents((list) =>
        list.map((s) =>
          s.id === editingId
            ? {
                ...s,
                name: form.fullName,
                email: form.email,
                phone: form.phone,
                cnic: form.cnic,
                dob: form.dob,
                course: form.course,
                batch: Number(form.batch) || s.batch,
                status: form.status,
              }
            : s
        )
      )
      showToast('Student updated successfully.', 'success')
    } else {
      const nextRoll = String(447900 + students.length + Math.floor(Math.random() * 90))
      setStudents((list) => [
        {
          id: Math.max(0, ...list.map((s) => s.id)) + 1,
          name: form.fullName,
          roll: nextRoll,
          email: form.email,
          phone: form.phone,
          cnic: form.cnic,
          dob: form.dob,
          course: form.course,
          batch: Number(form.batch) || 20,
          attendance: 0,
          status: form.status,
        },
        ...list,
      ])
      showToast('Student added successfully.', 'success')
    }
    setFormOpen(false)
  }

  function handleDelete() {
    setStudents((list) => list.filter((s) => s.id !== deleting.id))
    showToast('Student deleted.', 'success')
    setDeleting(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search by name, roll number, or email..."
            className="w-full bg-base-surface2 border border-base-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors"
          />
        </div>
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          options={studentStatusOptions}
          className="sm:w-44"
        />
        <Button icon={Plus} onClick={openCreate} className="sm:w-auto whitespace-nowrap">
          Add Student
        </Button>
      </div>

      <Card className="overflow-hidden">
        {pageItems.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink-muted border-b border-base-border">
                    <th className="px-5 py-3 font-medium">Student</th>
                    <th className="px-5 py-3 font-medium">Roll Number</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">Course</th>
                    <th className="px-5 py-3 font-medium">Batch</th>
                    <th className="px-5 py-3 font-medium">Attendance</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((s) => (
                    <tr key={s.id} className="border-b border-base-border last:border-0">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-xs font-bold shrink-0">
                            {initials(s.name)}
                          </div>
                          <span className="text-ink-primary font-medium whitespace-nowrap">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{s.roll}</td>
                      <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{s.email}</td>
                      <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{s.phone}</td>
                      <td className="px-5 py-4 text-ink-secondary whitespace-nowrap max-w-[200px] truncate">{s.course}</td>
                      <td className="px-5 py-4 text-ink-secondary">{s.batch}</td>
                      <td className="px-5 py-4 text-ink-secondary">{s.attendance}%</td>
                      <td className="px-5 py-4">
                        <Badge tone={s.status}>{s.status}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setViewing(s)} aria-label={`View ${s.name}`} className="text-ink-muted hover:text-ink-primary">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => openEdit(s)} aria-label={`Edit ${s.name}`} className="text-ink-muted hover:text-ink-primary">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleting(s)} aria-label={`Delete ${s.name}`} className="text-ink-muted hover:text-red-400">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-t border-base-border">
              <p className="text-xs text-ink-muted">
                Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length} records
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-1 text-xs text-ink-secondary hover:text-ink-primary disabled:opacity-40 px-2 py-1"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 rounded-lg text-xs font-medium ${
                      n === page ? 'bg-brand-blue text-white' : 'text-ink-secondary hover:bg-base-surface2'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="flex items-center gap-1 text-xs text-ink-secondary hover:text-ink-primary disabled:opacity-40 px-2 py-1"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <EmptyState icon={UserRound} title="No students found" description="Try adjusting your search or filters." />
        )}
      </Card>

      {/* Add / Edit modal */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? 'Edit Student' : 'Add Student'}
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
            <Input label="Full Name" required value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
            <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <Input label="CNIC" placeholder="42101-1234567-1" value={form.cnic} onChange={(e) => setForm((f) => ({ ...f, cnic: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Date of Birth" type="date" value={form.dob} onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))} />
            <Select
              label="Course"
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
              options={['Active', 'Probation', 'Inactive']}
            />
          </div>
          <Input
            label="Password"
            type="password"
            placeholder={editingId ? 'Leave blank to keep current password' : 'Set an initial password'}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </form>
      </Modal>

      {/* View modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Student Details">
        {viewing && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-lg font-bold">
                {initials(viewing.name)}
              </div>
              <div>
                <p className="font-semibold text-ink-primary">{viewing.name}</p>
                <p className="text-sm text-ink-muted">Roll No: {viewing.roll}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-ink-secondary">Attendance</span>
                <span className="text-ink-primary font-medium">{viewing.attendance}%</span>
              </div>
              <ProgressBar value={viewing.attendance} tone={viewing.attendance >= 70 ? 'green' : 'amber'} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-muted text-xs mb-1">Email</p>
                <p className="text-ink-primary truncate">{viewing.email}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Phone</p>
                <p className="text-ink-primary">{viewing.phone}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">CNIC</p>
                <p className="text-ink-primary">{viewing.cnic}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Date of Birth</p>
                <p className="text-ink-primary">{viewing.dob}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Course</p>
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

      {/* Delete confirmation */}
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Student?"
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
