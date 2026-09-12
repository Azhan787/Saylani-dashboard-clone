import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-2xl bg-base-surface2 border border-base-border flex items-center justify-center mb-4">
        <Icon size={24} className="text-ink-muted" />
      </div>
      <p className="text-ink-primary font-medium">{title}</p>
      {description && <p className="text-sm text-ink-muted mt-1 max-w-xs">{description}</p>}
    </div>
  )
}
