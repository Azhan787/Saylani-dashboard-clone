import { Hash, Award, MapPin, Building2 } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'

export default function CourseCard({ course }) {
  return (
    <Card className="p-6 bg-gradient-to-br from-brand-blueDark/25 to-base-surface border-brand-blue/20">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold text-ink-primary">{course.title}</h3>
        <Badge tone={course.status}>{course.status}</Badge>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {course.schedule.map((s) => (
          <span
            key={s.day}
            className="text-xs font-medium bg-base-surface2 border border-base-border rounded-lg px-3 py-1.5 text-ink-secondary"
          >
            {s.day} {s.time}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-ink-secondary">Progress</span>
        <span className="text-ink-primary font-semibold">{course.progress}% Completed</span>
      </div>
      <ProgressBar value={course.progress} tone="green" className="mb-5" />
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
        <div className="flex items-center gap-2 text-ink-secondary">
          <Hash size={15} /> Batch: <span className="text-ink-primary font-medium">{course.batch}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-secondary">
          <Award size={15} /> Roll: <span className="text-ink-primary font-medium">{course.roll}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-secondary">
          <Building2 size={15} /> Campus:{' '}
          <span className="text-brand-blueLight font-medium">{course.campus}</span>
        </div>
        <div className="flex items-center gap-2 text-ink-secondary">
          <MapPin size={15} /> City: <span className="text-brand-blueLight font-medium">{course.city}</span>
        </div>
      </div>
    </Card>
  )
}
