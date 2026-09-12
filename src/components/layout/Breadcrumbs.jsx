import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-2">
            <span className={isLast ? 'text-ink-primary font-semibold' : 'text-ink-muted'}>{item}</span>
            {!isLast && <ChevronRight size={14} className="text-ink-muted" />}
          </span>
        )
      })}
    </nav>
  )
}
