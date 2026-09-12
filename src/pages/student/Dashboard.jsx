import { useState } from 'react'
import { Clock, GraduationCap, Copy, Check } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import ScheduleCard from '../../components/dashboard/ScheduleCard'
import CourseCard from '../../components/dashboard/CourseCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { activeCourse } from '../../data/courses'
import { currentStudent } from '../../data/students'
import { paymentHistory } from '../../data/payments'
import { assignmentsList } from '../../data/assignments'
import { quizzesList } from '../../data/quizzes'
import { copyToClipboard } from '../../utils/helpers'
import { useToast } from '../../components/ui/Toast'

const tabs = ['Assignments', 'Quizzes', 'Events']

export default function Dashboard() {
  const [tab, setTab] = useState('Quizzes')
  const [copiedId, setCopiedId] = useState(null)
  const { showToast } = useToast()

  const upcomingAssignments = assignmentsList.filter((a) => a.status === 'NOT SUBMITTED').slice(0, 3)
  const upcomingQuizzes = quizzesList.filter((q) => q.status === 'NOT ATTEMPTED')

  function handleCopy(voucherId) {
    copyToClipboard(voucherId)
    setCopiedId(voucherId)
    showToast('Voucher ID copied to clipboard.', 'success')
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <StatCard
          icon={Clock}
          iconColor="text-brand-green"
          iconBg="bg-brand-green/10"
          value={`${currentStudent.attendance.present}/${currentStudent.attendance.total}`}
          label="Attendance"
        />
        <StatCard
          icon={GraduationCap}
          iconColor="text-purple-300"
          iconBg="bg-purple-400/10"
          value={`${currentStudent.assignments.submitted}/${currentStudent.assignments.total}`}
          label="Assignment"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-semibold text-ink-secondary mb-3">Active Course</h2>
            <CourseCard course={activeCourse} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ScheduleCard />

          <Card className="p-6">
            <div className="flex bg-base-surface2 rounded-xl p-1 mb-4">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
                    tab === t ? 'bg-base-border text-ink-primary' : 'text-ink-muted hover:text-ink-secondary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 'Assignments' && (
              <div className="flex flex-col gap-3">
                {upcomingAssignments.length ? (
                  upcomingAssignments.map((a) => (
                    <div key={a.id} className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-ink-primary truncate">{a.title}</p>
                        <p className="text-xs text-ink-muted">{a.dueDate}</p>
                      </div>
                      <Badge tone={a.status}>{a.status}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-ink-muted py-6 text-center">No pending assignments</p>
                )}
              </div>
            )}

            {tab === 'Quizzes' && (
              <>
                {upcomingQuizzes.length ? (
                  <div className="flex flex-col gap-3">
                    {upcomingQuizzes.map((q) => (
                      <div key={q.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm text-ink-primary truncate">{q.title}</p>
                          <p className="text-xs text-ink-muted">{q.module}</p>
                        </div>
                        <Badge tone={q.status}>{q.status}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-muted py-6 text-center">No upcoming quizzes</p>
                )}
              </>
            )}

            {tab === 'Events' && (
              <p className="text-sm text-ink-muted py-6 text-center">No upcoming events</p>
            )}
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-ink-secondary mb-3">Fee</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-muted border-b border-base-border">
                  <th className="px-5 py-3 font-medium">Month</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Due date</th>
                  <th className="px-5 py-3 font-medium">Voucher ID</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.slice(0, 3).map((p) => (
                  <tr key={p.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4 text-ink-primary whitespace-nowrap">{p.month}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">Rs: {p.amount} /-</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{p.type}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{p.dueDate}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {p.voucherId}
                        <button
                          onClick={() => handleCopy(p.voucherId)}
                          aria-label="Copy voucher ID"
                          className="text-ink-muted hover:text-ink-primary p-1 rounded-md hover:bg-base-surface2"
                        >
                          {copiedId === p.voucherId ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge tone={p.status}>{p.status}</Badge>
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
