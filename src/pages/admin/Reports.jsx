import { useState } from 'react'
import { FileDown, FileSpreadsheet, Users, CalendarCheck, BookOpen, FileText, ClipboardCheck, Wallet } from 'lucide-react'
import Card from '../../components/ui/Card'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { reportTypes, adminBatchesList, adminCoursesList } from '../../data/admin'
import { useToast } from '../../components/ui/Toast'

const reportIcons = {
  student: Users,
  attendance: CalendarCheck,
  'course-progress': BookOpen,
  assignment: FileText,
  quiz: ClipboardCheck,
  payment: Wallet,
}

export default function AdminReports() {
  const [course, setCourse] = useState('All Courses')
  const [batch, setBatch] = useState('All Batches')
  const [dateRange, setDateRange] = useState('This Month')
  const { showToast } = useToast()

  function handleExport(type, format) {
    showToast(`${type} exported as ${format}. (Frontend demo — no backend yet.)`, 'success')
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            options={['All Courses', ...adminCoursesList.map((c) => c.name)]}
          />
          <Select
            label="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            options={['All Batches', ...adminBatchesList.map((b) => `Batch ${b.number}`)]}
          />
          <Select
            label="Date Range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            options={['This Week', 'This Month', 'This Quarter', 'This Year']}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {reportTypes.map((r) => {
          const Icon = reportIcons[r.id] || FileText
          return (
            <Card key={r.id} className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-brand-blueLight" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-ink-primary mb-1">{r.title}</h3>
                <p className="text-xs text-ink-muted">{r.description}</p>
              </div>
              <p className="text-sm font-semibold text-brand-green">{r.metric}</p>
              <div className="flex items-center gap-2 pt-3 border-t border-base-border mt-1">
                <Button size="sm" variant="secondary" icon={FileDown} onClick={() => handleExport(r.title, 'PDF')} className="flex-1">
                  Export PDF
                </Button>
                <Button size="sm" variant="secondary" icon={FileSpreadsheet} onClick={() => handleExport(r.title, 'CSV')} className="flex-1">
                  Export CSV
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
