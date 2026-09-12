import { cn } from '../../utils/helpers'

const variants = {
  primary: 'bg-brand-blue hover:bg-brand-blueDark text-white shadow-card',
  secondary: 'bg-base-surface2 hover:bg-base-borderLight text-ink-primary border border-base-border',
  ghost: 'bg-transparent hover:bg-base-surface2 text-ink-secondary hover:text-ink-primary',
  danger: 'bg-red-600/90 hover:bg-red-600 text-white',
  success: 'bg-brand-green hover:bg-brand-greenDark text-black font-semibold',
}

const sizes = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-6 py-3 rounded-xl gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconPosition = 'left',
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium tracking-wide transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 16} />}
    </button>
  )
}
