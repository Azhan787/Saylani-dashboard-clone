import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-bg flex flex-col items-center justify-center gap-4 text-center px-6">
      <GraduationCap size={40} className="text-brand-blue" />
      <h1 className="text-2xl font-bold text-ink-primary">Page not found</h1>
      <p className="text-ink-muted max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/student/login">
        <Button>Back to Student Login</Button>
      </Link>
    </div>
  )
}
