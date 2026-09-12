import { motion } from 'framer-motion'

export default function BarChart({ data = [], height = 200, tone = '#3b6bdb' }) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="w-full">
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => {
          const pct = (d.value / max) * 100
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
              <span className="text-[10px] text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity">
                {d.value}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ duration: 0.6, delay: i * 0.03, ease: 'easeOut' }}
                className="w-full rounded-t-md min-h-[3px]"
                style={{ backgroundColor: tone }}
              />
              <span className="text-[10px] text-ink-muted">{d.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
