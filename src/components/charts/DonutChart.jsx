import { motion } from 'framer-motion'

const toneColors = {
  green: '#22c55e',
  blue: '#3b6bdb',
  amber: '#fbbf24',
  red: '#ef4444',
  muted: '#3f3f47',
}

export default function DonutChart({ data = [], size = 160, strokeWidth = 20 }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  let cumulative = 0
  const segments = data.map((d) => {
    const fraction = d.value / total
    const dash = fraction * circumference
    const offset = cumulative * circumference
    cumulative += fraction
    return { ...d, dash, offset }
  })

  return (
    <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#1a1a21" strokeWidth={strokeWidth} fill="none" />
          {segments.map((s, i) => (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={toneColors[s.tone] || toneColors.blue}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
              strokeLinecap="butt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-ink-primary">{total}%</span>
          <span className="text-[10px] text-ink-muted">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 min-w-[140px]">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: toneColors[d.tone] || toneColors.blue }}
            />
            <span className="text-ink-secondary flex-1">{d.label}</span>
            <span className="text-ink-primary font-semibold">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
