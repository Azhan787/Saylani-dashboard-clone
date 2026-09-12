import { cn } from '../../utils/helpers'

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-base-surface border border-base-border rounded-2xl shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
