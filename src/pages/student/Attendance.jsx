import { useState } from 'react'
import { CalendarDays, CheckCircle2, XCircle, MinusCircle } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import Select from '../../components/ui/Select'
import { attendanceSummary, attendanceRecords, attendanceMonths } from '../../data/attendance'

export default function Attendance() {
  const [month, setMonth] = useState(attendanceMonths[0])

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={CalendarDays} iconColor="text-ink-secondary" iconBg="bg-base-surface2" value={attendanceSummary.totalClasses} label="Total Classes" />
        <StatCard icon={CheckCircle2} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={attendanceSummary.present} label="Present" />
        <StatCard icon={MinusCircle} iconColor="text-amber-400" iconBg="bg-amber-400/10" value={attendanceSummary.leave} label="Leave" />
        <StatCard icon={XCircle} iconColor="text-red-400" iconBg="bg-red-400/10" value={attendanceSummary.absent} label="Absent" />
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-ink-primary mb-1">Attendance Overview</h3>
            <p className="text-sm text-ink-secondary">Your attendance is good. Keep it up!</p>
          </div>
          <span className="text-3xl font-bold text-brand-green">{attendanceSummary.percentage}%</span>
        </div>
        <ProgressBar value={attendanceSummary.percentage} tone="green" className="mt-4" />
      </Card>

      <div className="flex justify-end">
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          options={attendanceMonths}
          className="w-40"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Class</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((r) => (
                <tr key={r.id} className="border-b border-base-border last:border-0">
                  <td className="px-5 py-4 text-ink-primary">{r.id}</td>
                  <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">
                    {r.day}, {r.date}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={r.status}>{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
