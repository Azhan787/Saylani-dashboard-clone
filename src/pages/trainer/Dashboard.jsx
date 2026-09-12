import { Users, CheckCircle2, ClipboardList, ClipboardCheck } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import { studentsList } from '../../data/students'
import { trainerAssignments } from '../../data/assignments'
import { attendanceSummary } from '../../data/attendance'
import { currentTrainer } from '../../data/students'
import { classSchedule } from '../../data/courses'

const todaysClasses = [
  { time: '01:00 PM - 03:00 PM', course: 'Modern Web Application Development', batch: 20, room: 'Lab 3' },
  { time: '03:30 PM - 05:00 PM', course: 'Modern Web Application Development', batch: 21, room: 'Lab 1' },
]

const recentActivity = [
  { name: 'Fatima Zahra', action: 'submitted "E-Commerce Website (React JS)"', time: '2h ago' },
  { name: 'Ahmed Raza', action: 'marked absent for today', time: '3h ago' },
  { name: 'Sana Malik', action: 'passed "Javascript (Quiz-1)" with 92%', time: '5h ago' },
  { name: 'Bilal Hussain', action: 'submitted "Furniture E-Commerce Website" late', time: '1d ago' },
]

export default function TrainerDashboard() {
  const activeStudents = studentsList.length * 18.5 // scaled mock to reach 148
  const presentToday = Math.round(115)

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-gradient-to-br from-brand-blueDark/20 to-base-surface border-brand-blue/20">
        <p className="text-sm text-ink-secondary">Welcome back,</p>
        <h2 className="text-xl font-bold text-ink-primary mt-0.5">{currentTrainer.fullName}</h2>
        <p className="text-sm text-ink-muted mt-1">
          {currentTrainer.course} · Batch {currentTrainer.batch}
        </p>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Users} iconColor="text-brand-blueLight" iconBg="bg-brand-blue/10" value={148} label="Total Students" />
        <StatCard icon={CheckCircle2} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={115} label="Present Today" />
        <StatCard icon={ClipboardList} iconColor="text-amber-400" iconBg="bg-amber-400/10" value={16} label="Pending Assignments" />
        <StatCard icon={ClipboardCheck} iconColor="text-purple-300" iconBg="bg-purple-400/10" value={6} label="Active Quizzes" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <h3 className="font-semibold text-ink-primary mb-4">Today's Classes</h3>
          <div className="flex flex-col gap-3">
            {todaysClasses.map((c, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-base-surface2 border border-base-border">
                <p className="text-sm font-medium text-ink-primary">{c.time}</p>
                <p className="text-xs text-ink-muted mt-1">{c.course}</p>
                <p className="text-xs text-ink-muted">Batch {c.batch} · {c.room}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-1">
          <h3 className="font-semibold text-ink-primary mb-4">Upcoming Assignments</h3>
          <div className="flex flex-col gap-3">
            {trainerAssignments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-ink-primary truncate">{a.title}</p>
                  <p className="text-xs text-ink-muted">
                    {a.submissions}/{a.total} submitted
                  </p>
                </div>
                <Badge tone={a.status === 'Active' ? 'ACTIVE' : 'INACTIVE'}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-1">
          <h3 className="font-semibold text-ink-primary mb-4">Recent Student Activity</h3>
          <div className="flex flex-col gap-3">
            {recentActivity.map((r, i) => (
              <div key={i} className="text-sm">
                <p className="text-ink-primary">
                  <span className="font-medium">{r.name}</span>{' '}
                  <span className="text-ink-secondary">{r.action}</span>
                </p>
                <p className="text-xs text-ink-muted mt-0.5">{r.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-ink-primary">Attendance Overview</h3>
          <span className="text-2xl font-bold text-brand-green">{attendanceSummary.percentage}%</span>
        </div>
        <ProgressBar value={attendanceSummary.percentage} tone="green" />
        <div className="grid grid-cols-7 gap-2 mt-5">
          {classSchedule.map((d) => (
            <div
              key={d.label + d.date}
              className={`flex flex-col items-center justify-center rounded-xl py-2.5 text-xs font-medium ${
                d.active ? 'bg-brand-green text-black' : 'bg-base-surface2 text-ink-secondary'
              }`}
            >
              <span>{d.label}</span>
              <span className="font-bold text-sm mt-0.5">{d.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
