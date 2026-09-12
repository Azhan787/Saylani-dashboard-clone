import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/helpers'

export default function Select({ label, options = [], className, value, onChange, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-ink-primary">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={cn(
            'appearance-none w-full bg-base-surface2 border border-base-border rounded-xl pl-4 pr-10 py-2.5 text-sm text-ink-primary focus:border-brand-blue transition-colors cursor-pointer',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
      </div>
    </div>
  )
}
