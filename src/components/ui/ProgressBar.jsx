import { motion } from 'framer-motion'
import { cn } from '../../utils/helpers'

const toneMap = {
  green: 'bg-brand-green',
  blue: 'bg-brand-blue',
  amber: 'bg-amber-400',
  red: 'bg-red-500',
}

export default function ProgressBar({ value = 0, tone = 'green', className, height = 'h-2' }) {
  return (
    <div
      className={cn('w-full bg-base-surface2 rounded-full overflow-hidden', height, className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={cn('h-full rounded-full', toneMap[tone])}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </div>
  )
}
