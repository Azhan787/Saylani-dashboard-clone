import { useState } from 'react'
import { User, ShieldCheck, Palette, Bell, Pencil } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { currentAdmin } from '../../data/admin'
import { initials, cn } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-base-border last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-ink-primary font-medium">{label}</p>
        {description && <p className="text-xs text-ink-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={cn(
          'w-11 h-6 rounded-full transition-colors relative shrink-0',
          checked ? 'bg-brand-green' : 'bg-base-surface2 border border-base-border'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )}
        />
      </button>
    </div>
  )
}

export default function AdminSettings() {
  const [tab, setTab] = useState('profile')
  const { showToast } = useToast()

  const [profileForm, setProfileForm] = useState({
    fullName: currentAdmin.fullName,
    email: currentAdmin.email,
    phone: currentAdmin.phone,
  })

  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const [twoFactor, setTwoFactor] = useState(false)
  const [theme, setTheme] = useState('dark')

  const [notifications, setNotifications] = useState({
    email: true,
    assignments: true,
    payments: true,
    system: false,
  })

  function saveProfile(e) {
    e.preventDefault()
    showToast('Profile updated successfully.', 'success')
  }

  function savePassword(e) {
    e.preventDefault()
    if (!passwordForm.next || passwordForm.next !== passwordForm.confirm) {
      showToast('New passwords do not match.', 'error')
      return
    }
    setPasswordForm({ current: '', next: '', confirm: '' })
    showToast('Password changed successfully.', 'success')
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
              tab === t.id
                ? 'bg-brand-blue/15 text-brand-blueLight'
                : 'text-ink-secondary hover:bg-base-surface2 hover:text-ink-primary'
            )}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <Card className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-brand-blue/20 text-brand-blueLight flex items-center justify-center text-2xl font-bold shrink-0">
              {initials(currentAdmin.fullName)}
            </div>
            <div>
              <p className="font-semibold text-ink-primary">{currentAdmin.fullName}</p>
              <p className="text-sm text-ink-muted">{currentAdmin.role}</p>
              <Button variant="secondary" size="sm" icon={Pencil} className="mt-2">
                Change Photo
              </Button>
            </div>
          </div>

          <form onSubmit={saveProfile} className="flex flex-col gap-4">
            <Input
              label="Admin Name"
              value={profileForm.fullName}
              onChange={(e) => setProfileForm((f) => ({ ...f, fullName: e.target.value }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
              />
              <Input
                label="Phone"
                value={profileForm.phone}
                onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      )}

      {tab === 'security' && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-ink-primary mb-4">Change Password</h3>
            <form onSubmit={savePassword} className="flex flex-col gap-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.next}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, next: e.target.value }))}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))}
                />
              </div>
              <div>
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-ink-primary mb-2">Two-Factor Authentication</h3>
            <Toggle
              checked={twoFactor}
              onChange={setTwoFactor}
              label="Enable two-factor authentication"
              description="Add an extra layer of security to your admin account."
            />
          </Card>
        </div>
      )}

      {tab === 'appearance' && (
        <Card className="p-6">
          <h3 className="font-semibold text-ink-primary mb-4">Theme Preference</h3>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {['dark', 'light'].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setTheme(opt)
                  showToast(
                    opt === 'light'
                      ? 'Light theme selected. (Preview coming soon — the portal stays dark for now.)'
                      : 'Dark theme selected.',
                    'success'
                  )
                }}
                className={cn(
                  'rounded-xl border p-4 text-left transition-colors',
                  theme === opt ? 'border-brand-blue bg-brand-blue/10' : 'border-base-border hover:border-base-borderLight'
                )}
              >
                <div className={cn('w-full h-14 rounded-lg mb-3', opt === 'dark' ? 'bg-base-bg border border-base-border' : 'bg-white')} />
                <p className="text-sm font-medium text-ink-primary capitalize">{opt}</p>
              </button>
            ))}
          </div>
        </Card>
      )}

      {tab === 'notifications' && (
        <Card className="p-6">
          <h3 className="font-semibold text-ink-primary mb-2">Notification Preferences</h3>
          <div>
            <Toggle
              checked={notifications.email}
              onChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
              label="Email Notifications"
              description="Receive important updates via email."
            />
            <Toggle
              checked={notifications.assignments}
              onChange={(v) => setNotifications((n) => ({ ...n, assignments: v }))}
              label="Assignment Notifications"
              description="Get notified about new submissions and due dates."
            />
            <Toggle
              checked={notifications.payments}
              onChange={(v) => setNotifications((n) => ({ ...n, payments: v }))}
              label="Payment Notifications"
              description="Get notified about payments and overdue dues."
            />
            <Toggle
              checked={notifications.system}
              onChange={(v) => setNotifications((n) => ({ ...n, system: v }))}
              label="System Notifications"
              description="Product updates and maintenance alerts."
            />
          </div>
        </Card>
      )}
    </div>
  )
}
