import {
  Users,
  UserCog,
  BookOpen,
  Layers,
  Wallet,
  UserPlus,
  ClipboardCheck,
  CreditCard,
  Megaphone,
  FilePlus,
} from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import BarChart from '../../components/charts/BarChart'
import DonutChart from '../../components/charts/DonutChart'
import {
  dashboardStats,
  enrollmentByMonth,
  attendanceBreakdown,
  courseProgressBreakdown,
  paymentBreakdown,
  recentActivity,
} from '../../data/admin'
import { formatCurrency } from '../../utils/helpers'

const activityIcons = {
  student: { icon: UserPlus, color: 'text-brand-blueLight', bg: 'bg-brand-blue/10' },
  trainer: { icon: UserCog, color: 'text-purple-300', bg: 'bg-purple-400/10' },
  assignment: { icon: ClipboardCheck, color: 'text-brand-green', bg: 'bg-brand-green/10' },
  payment: { icon: CreditCard, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  batch: { icon: Layers, color: 'text-brand-blueLight', bg: 'bg-brand-blue/10' },
  quiz: { icon: FilePlus, color: 'text-purple-300', bg: 'bg-purple-400/10' },
}

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <StatCard responsive compact icon={Users} iconColor="text-brand-blueLight" iconBg="bg-brand-blue/10" value={dashboardStats.totalStudents.toLocaleString()} label="Total Students" />
        <StatCard responsive compact icon={UserCog} iconColor="text-purple-300" iconBg="bg-purple-400/10" value={dashboardStats.totalTrainers} label="Total Trainers" />
        <StatCard responsive compact icon={BookOpen} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={dashboardStats.activeCourses} label="Active Courses" />
        <StatCard responsive compact icon={Wallet} iconColor="text-red-400" iconBg="bg-red-400/10" value={formatCurrency(dashboardStats.pendingPayments)} label="Pending Payments" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2">
          <h3 className="font-semibold text-ink-primary mb-1">Student Enrollment Overview</h3>
          <p className="text-xs text-ink-muted mb-5">New enrollments per month (Jan – Dec)</p>
          <BarChart data={enrollmentByMonth} tone="#3b6bdb" />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-ink-primary mb-5">Attendance Overview</h3>
          <DonutChart data={attendanceBreakdown} size={140} strokeWidth={16} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-ink-primary mb-5">Course Progress</h3>
          <DonutChart data={courseProgressBreakdown} size={140} strokeWidth={16} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-ink-primary mb-5">Payment Overview</h3>
          <DonutChart data={paymentBreakdown} size={140} strokeWidth={16} />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Megaphone size={18} className="text-ink-secondary" />
          <h3 className="font-semibold text-ink-primary">Recent Activity</h3>
        </div>
        <div className="flex flex-col divide-y divide-base-border">
          {recentActivity.map((a) => {
            const meta = activityIcons[a.type] || activityIcons.student
            const Icon = meta.icon
            return (
              <div key={a.id} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${meta.bg}`}>
                  <Icon size={16} className={meta.color} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-ink-primary">{a.text}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{a.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
