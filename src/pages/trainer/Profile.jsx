import { useState } from 'react'
import { Mail, Phone, Building2, MapPin, GraduationCap, Pencil, Briefcase } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import { currentTrainer } from '../../data/students'
import { initials } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

const fields = [
  { key: 'fullName', label: 'Full Name', icon: null },
  { key: 'designation', label: 'Designation', icon: Briefcase },
  { key: 'course', label: 'Course', icon: GraduationCap },
  { key: 'batch', label: 'Batch', icon: GraduationCap },
  { key: 'campus', label: 'Campus', icon: Building2 },
  { key: 'city', label: 'City', icon: MapPin },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'phone', label: 'Phone', icon: Phone },
]

export default function TrainerProfile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ email: currentTrainer.email, phone: currentTrainer.phone })
  const { showToast } = useToast()

  function handleSave(e) {
    e.preventDefault()
    setEditing(false)
    showToast('Profile updated successfully.', 'success')
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Card className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-2xl font-bold shrink-0">
          {initials(currentTrainer.fullName)}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-ink-primary">{currentTrainer.fullName}</h2>
          <p className="text-sm text-ink-muted mt-0.5">{currentTrainer.designation}</p>
        </div>
        <Button variant="secondary" icon={Pencil} onClick={() => setEditing(true)}>
          Edit Profile
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-ink-secondary mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {fields.map((f) => (
            <div key={f.key} className="flex items-start gap-3">
              {f.icon && <f.icon size={16} className="text-ink-muted mt-0.5 shrink-0" />}
              <div className="min-w-0">
                <p className="text-xs text-ink-muted">{f.label}</p>
                <p className="text-sm text-ink-primary font-medium mt-0.5 truncate">
                  {currentTrainer[f.key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit Profile"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          <p className="text-xs text-ink-muted">
            This is a frontend-only demo — changes are not persisted to a server.
          </p>
        </form>
      </Modal>
    </div>
  )
}
