import { cn } from '../../utils/helpers'

const statusStyles = {
  PAID: 'text-brand-green border-brand-green/40 bg-brand-green/10',
  APPROVED: 'text-brand-green border-brand-green/40 bg-brand-green/10',
  PASSED: 'text-brand-green border-brand-green/40 bg-brand-green/10',
  PRESENT: 'text-brand-green border-brand-green/40 bg-brand-green/10',
  ACTIVE: 'text-brand-green border-brand-green/40 bg-brand-green/10',
  SUBMITTED: 'text-brand-blueLight border-brand-blueLight/40 bg-brand-blueLight/10',
  ENROLLED: 'text-brand-blueLight border-brand-blueLight/40 bg-brand-blueLight/10',
  'LATE SUBMITTED': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  PENDING: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  LEAVE: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  PROBATION: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  'NOT SUBMITTED': 'text-ink-secondary border-base-borderLight bg-base-surface2',
  'NOT ATTEMPTED': 'text-ink-secondary border-base-borderLight bg-base-surface2',
  REJECTED: 'text-red-400 border-red-400/40 bg-red-400/10',
  FAILED: 'text-red-400 border-red-400/40 bg-red-400/10',
  ABSENT: 'text-red-400 border-red-400/40 bg-red-400/10',
  OVERDUE: 'text-red-400 border-red-400/40 bg-red-400/10',
  INACTIVE: 'text-red-400 border-red-400/40 bg-red-400/10',
  HACKATHON: 'text-purple-300 border-purple-400/40 bg-purple-400/10',
  PUBLISHED: 'text-brand-green border-brand-green/40 bg-brand-green/10',
  DRAFT: 'text-ink-secondary border-base-borderLight bg-base-surface2',
  ARCHIVED: 'text-ink-secondary border-base-borderLight bg-base-surface2',
  UPCOMING: 'text-brand-blueLight border-brand-blueLight/40 bg-brand-blueLight/10',
  COMPLETED: 'text-brand-blueLight border-brand-blueLight/40 bg-brand-blueLight/10',
  CLOSED: 'text-ink-secondary border-base-borderLight bg-base-surface2',
  'ON LEAVE': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  HIGH: 'text-red-400 border-red-400/40 bg-red-400/10',
  MEDIUM: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  LOW: 'text-brand-blueLight border-brand-blueLight/40 bg-brand-blueLight/10',
}

export default function Badge({ children, tone, className }) {
  const key = (tone || children || '').toString().toUpperCase()
  const style = statusStyles[key] || 'text-ink-secondary border-base-borderLight bg-base-surface2'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold tracking-wide',
        style,
        className
      )}
    >
      {children}
    </span>
  )
}
