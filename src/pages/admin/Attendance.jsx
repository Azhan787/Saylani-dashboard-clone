import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, XCircle, MinusCircle, Percent } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import { adminStudentsList, adminBatchesList } from '../../data/admin'
import { attendanceRecords } from '../../data/attendance'

const batchOptions = ['All Batches', ...adminBatchesList.map((b) => `Batch ${b.number}`)]
const studentOptions = ['All Students', ...adminStudentsList.map((s) => s.name)]

export default function AdminAttendance() {
  const [batch, setBatch] = useState('All Batches')
  const [student, setStudent] = useState('All Students')
  const [date, setDate] = useState('')

  const filteredStudents = useMemo(() => {
    return adminStudentsList.filter((s) => {
      const matchesBatch = batch === 'All Batches' || `Batch ${s.batch}` === batch
      const matchesStudent = student === 'All Students' || s.name === student
      return matchesBatch && matchesStudent
    })
  }, [batch, student])

  const totalClasses = 148
  const present = Math.round(filteredStudents.reduce((s, st) => s + st.attendance, 0) / (filteredStudents.length || 1))
  const absentPct = Math.max(0, 100 - present - 2)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard icon={CalendarDays} iconColor="text-ink-secondary" iconBg="bg-base-surface2" value={totalClasses} label="Total Classes" />
        <StatCard icon={CheckCircle2} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={`${present}%`} label="Present" />
        <StatCard icon={XCircle} iconColor="text-red-400" iconBg="bg-red-400/10" value={`${absentPct}%`} label="Absent" />
        <StatCard icon={MinusCircle} iconColor="text-amber-400" iconBg="bg-amber-400/10" value="2%" label="Leave" />
        <StatCard icon={Percent} iconColor="text-brand-blueLight" iconBg="bg-brand-blue/10" value={`${present}%`} label="Attendance %" />
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select label="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} options={batchOptions} />
          <Select label="Student" value={student} onChange={(e) => setStudent(e.target.value)} options={studentOptions} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-ink-primary" htmlFor="admin-att-date">Date</label>
            <input
              id="admin-att-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-base-bg border border-base-border rounded-xl px-4 py-2.5 text-sm text-ink-primary focus:border-brand-blue transition-colors"
            />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Roll No</th>
                <th className="px-5 py-3 font-medium">Batch</th>
                <th className="px-5 py-3 font-medium">Attendance</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="border-b border-base-border last:border-0">
                  <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{s.name}</td>
                  <td className="px-5 py-4 text-ink-secondary">{s.roll}</td>
                  <td className="px-5 py-4 text-ink-secondary">Batch {s.batch}</td>
                  <td className="px-5 py-4 text-ink-secondary">{s.attendance}%</td>
                  <td className="px-5 py-4">
                    <Badge tone={s.attendance >= 70 ? 'PRESENT' : s.attendance >= 50 ? 'LEAVE' : 'ABSENT'}>
                      {s.attendance >= 70 ? 'Good Standing' : s.attendance >= 50 ? 'At Risk' : 'Low Attendance'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div>
        <h3 className="text-sm font-semibold text-ink-secondary mb-3">Recent Class Log</h3>
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
                {attendanceRecords.slice(0, 6).map((r) => (
                  <tr key={r.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4 text-ink-primary">{r.id}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{r.day}, {r.date}</td>
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
    </div>
  )
}
