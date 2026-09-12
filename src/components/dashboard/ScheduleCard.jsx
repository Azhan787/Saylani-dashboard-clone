import { CalendarDays } from 'lucide-react'
import Card from '../ui/Card'
import { classSchedule } from '../../data/courses'
import { cn } from '../../utils/helpers'

export default function ScheduleCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <CalendarDays size={18} className="text-ink-secondary" />
        <h3 className="font-semibold text-ink-primary">Class Schedule</h3>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {classSchedule.map((d) => (
          <div
            key={d.label + d.date}
            className={cn(
              'flex flex-col items-center justify-center rounded-xl py-2.5 text-xs font-medium',
              d.active ? 'bg-brand-green text-black' : 'bg-base-surface2 text-ink-secondary'
            )}
          >
            <span>{d.label}</span>
            <span className="font-bold text-sm mt-0.5">{d.date}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
