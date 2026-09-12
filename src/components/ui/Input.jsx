import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../utils/helpers'

const Input = forwardRef(function Input(
  { label, required, error, type = 'text', className, id, hint, ...props },
  ref
) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputId = id || label?.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm text-ink-primary">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={isPassword ? (show ? 'text' : 'password') : type}
          className={cn(
            'w-full bg-base-bg border border-base-border rounded-xl px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-blue transition-colors',
            isPassword && 'pr-11',
            error && 'border-red-400 focus:border-red-400',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary transition-colors"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {hint && !error && <p className="text-xs text-ink-muted">{hint}</p>}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
