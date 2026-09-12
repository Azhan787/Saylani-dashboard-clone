import { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutGrid, BookOpen, CalendarCheck, Wallet, FileText, ClipboardCheck } from 'lucide-react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAuth } from '../../context/AuthContext'
import { activeCourse } from '../../data/courses'

const navItems = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/student/progress', label: 'Progress', icon: BookOpen },
  { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/student/payment', label: 'Payment', icon: Wallet },
  { to: '/student/assignments', label: 'Assignment', icon: FileText },
  { to: '/student/quiz', label: 'Quiz', icon: ClipboardCheck },
]

const crumbMap = {
  '/student/dashboard': ['Home', activeCourse.title],
  '/student/progress': ['Home', activeCourse.title, 'Progress'],
  '/student/attendance': ['Home', activeCourse.title, 'Attendance'],
  '/student/payment': ['Home', activeCourse.title, 'Payment'],
  '/student/assignments': ['Home', activeCourse.title, 'Assignment'],
  '/student/quiz': ['Home', activeCourse.title, 'Quiz'],
  '/student/profile': ['Home', 'Profile'],
}

export default function StudentLayout() {
  const { studentUser, logoutStudent, ready } = useAuth()
  const location = useLocation()
  const breadcrumbs = crumbMap[location.pathname] || ['Home']
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!ready) return null
  if (!studentUser) return <Navigate to="/student/login" replace />

  return (
    <div className="flex h-screen overflow-hidden bg-base-bg">
      <Sidebar
        navItems={navItems}
        user={studentUser}
        onLogout={logoutStudent}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          breadcrumbs={breadcrumbs}
          onOpenMobile={() => setMobileOpen(true)}
          user={studentUser}
          onLogout={logoutStudent}
          profilePath="/student/profile"
        />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-5 lg:p-8 max-w-[1600px]"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
