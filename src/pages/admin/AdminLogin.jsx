import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/tayyebah-logo.png'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/ui/Toast'
import { currentAdmin } from '../../data/admin'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginAdmin } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const result = loginAdmin(email, password)
      setLoading(false)
      if (result.success) {
        showToast('Welcome back! Login successful.', 'success')
        navigate('/admin/dashboard')
      } else {
        setError(result.message)
      }
    }, 500)
  }

  return (
    <div className="admin-portal min-h-screen bg-base-bg flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Tayyebah Academy logo" className="w-16 h-16 rounded-2xl object-contain mb-3" />
          <h1 className="text-lg font-display font-bold text-ink-primary">Admin Portal</h1>
        </div>

        <div className="bg-base-surface border border-base-border rounded-2xl p-6 shadow-card">
          <h2 className="text-lg font-bold text-ink-primary mb-1.5">Login</h2>
          <p className="text-sm text-ink-secondary mb-5">
            Kindly provide your email and password to access the admin portal.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              required
              placeholder="admin@tayyebahacademy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <Input
              label="Password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" className="w-full mt-1" disabled={loading}>
              {loading ? 'Logging in...' : 'LOGIN'}
            </Button>
            <button type="button" className="text-sm text-brand-blueLight hover:underline text-center">
              Forgot Password?
            </button>
          </form>

          <p className="text-xs text-ink-muted mt-5 text-center">
            Demo credentials — Email: <span className="text-ink-secondary">{currentAdmin.email}</span> ·
            Password: <span className="text-ink-secondary">{currentAdmin.password}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link to="/student/login">
            <button className="w-full bg-base-surface2 border border-base-border rounded-xl py-3 text-sm font-medium text-ink-secondary hover:text-ink-primary hover:border-base-borderLight transition-colors">
              Login as student
            </button>
          </Link>
          <Link to="/trainer/login">
            <button className="w-full bg-base-surface2 border border-base-border rounded-xl py-3 text-sm font-medium text-ink-secondary hover:text-ink-primary hover:border-base-borderLight transition-colors">
              Login as trainer
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
