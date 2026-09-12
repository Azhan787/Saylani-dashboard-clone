import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import Card from '../../components/ui/Card'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { trainerAttendanceStudents } from '../../data/attendance'
import { cn } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

const STORAGE_KEY = 'ta_trainer_attendance'
const statusOptions = ['present', 'absent', 'leave']
const statusStyles = {
  present: 'bg-brand-green text-black',
  absent: 'bg-red-500 text-white',
  leave: 'bg-amber-400 text-black',
}

export default function TrainerAttendance() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [batch, setBatch] = useState('20')
  const [course, setCourse] = useState('Modern Web Application Development')
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // ignore
    }
    return trainerAttendanceStudents.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
  })
  const { showToast } = useToast()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }, [records])

  function setStatus(id, status) {
    setRecords((r) => ({ ...r, [id]: status }))
  }

  function handleSave() {
    showToast('Attendance saved successfully.', 'success')
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-ink-primary" htmlFor="att-date">Date</label>
            <input
              id="att-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-base-bg border border-base-border rounded-xl px-4 py-2.5 text-sm text-ink-primary focus:border-brand-blue transition-colors"
            />
          </div>
          <Select
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            options={['Modern Web Application Development', 'Mobile App Development']}
          />
          <Select label="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} options={['20', '21', '22']} />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Roll No</th>
                <th className="px-5 py-3 font-medium">Present</th>
                <th className="px-5 py-3 font-medium">Absent</th>
                <th className="px-5 py-3 font-medium">Leave</th>
              </tr>
            </thead>
            <tbody>
              {trainerAttendanceStudents.map((s) => (
                <tr key={s.id} className="border-b border-base-border last:border-0">
                  <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{s.name}</td>
                  <td className="px-5 py-4 text-ink-secondary">{s.roll}</td>
                  {statusOptions.map((opt) => (
                    <td key={opt} className="px-5 py-4">
                      <button
                        onClick={() => setStatus(s.id, opt)}
                        aria-pressed={records[s.id] === opt}
                        className={cn(
                          'w-8 h-8 rounded-lg border transition-colors',
                          records[s.id] === opt
                            ? `${statusStyles[opt]} border-transparent`
                            : 'border-base-border text-ink-muted hover:border-base-borderLight'
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button icon={Save} onClick={handleSave}>
          Save Attendance
        </Button>
      </div>
    </div>
  )
}
