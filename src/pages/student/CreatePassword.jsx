import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/tayyebah-logo.png'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

export default function CreatePassword() {
  const [form, setForm] = useState({ cnic: '', dob: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const navigate = useNavigate()

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.cnic.trim()) next.cnic = 'CNIC is required.'
    if (!form.dob) next.dob = 'Date of birth is required.'
    if (!form.password || form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('Password created successfully. You can now log in.', 'success')
      navigate('/student/login')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Tayyebah Academy logo" className="w-16 h-16 rounded-2xl object-contain mb-3" />
          <h1 className="text-lg font-display font-bold text-ink-primary">Student Portal</h1>
        </div>

        <div className="grid grid-cols-2 bg-base-surface border border-base-border rounded-xl overflow-hidden mb-5">
          <Link
            to="/student/login"
            className="text-center py-2.5 text-sm font-medium text-ink-muted hover:text-ink-primary transition-colors"
          >
            Login
          </Link>
          <div className="text-center py-2.5 text-sm font-semibold bg-base-surface2 text-ink-primary">
            Create Password
          </div>
        </div>

        <div className="bg-base-surface border border-base-border rounded-2xl p-6 shadow-card">
          <h2 className="text-lg font-bold text-ink-primary mb-1.5">Create a Password</h2>
          <p className="text-sm text-ink-secondary mb-5">
            Kindly provide the CNIC number and DOB used during Tayyebah Academy course
            registration.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="CNIC"
              required
              placeholder="42101-1234567-1"
              value={form.cnic}
              onChange={(e) => update('cnic', e.target.value)}
              error={errors.cnic}
            />
            <Input
              label="Date of Birth"
              type="date"
              required
              value={form.dob}
              onChange={(e) => update('dob', e.target.value)}
              error={errors.dob}
            />
            <Input
              label="Password"
              type="password"
              required
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              error={errors.password}
            />

            <Button type="submit" className="w-full mt-1" disabled={loading}>
              {loading ? 'Submitting...' : 'SUBMIT'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
