import { useEffect, useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutGrid,
  Users,
  UserCog,
  BookOpen,
  Layers,
  CalendarCheck,
  FileText,
  ClipboardCheck,
  Wallet,
  Megaphone,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/trainers', label: 'Trainers', icon: UserCog },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/batches', label: 'Batches', icon: Layers },
  { to: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/admin/assignments', label: 'Assignments', icon: FileText },
  { to: '/admin/quizzes', label: 'Quizzes', icon: ClipboardCheck },
  { to: '/admin/payments', label: 'Payments', icon: Wallet },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
]

const crumbMap = {
  '/admin/dashboard': ['Home', 'Dashboard'],
  '/admin/students': ['Home', 'Students'],
  '/admin/trainers': ['Home', 'Trainers'],
  '/admin/courses': ['Home', 'Courses'],
  '/admin/batches': ['Home', 'Batches'],
  '/admin/attendance': ['Home', 'Attendance'],
  '/admin/assignments': ['Home', 'Assignments'],
  '/admin/quizzes': ['Home', 'Quizzes'],
  '/admin/payments': ['Home', 'Payments'],
  '/admin/announcements': ['Home', 'Announcements'],
  '/admin/reports': ['Home', 'Reports'],
  '/admin/settings': ['Home', 'Settings'],
}

export default function AdminLayout() {
  const { adminUser, logoutAdmin, ready } = useAuth()
  const location = useLocation()
  const breadcrumbs = crumbMap[location.pathname] || ['Home']
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.classList.add('admin-portal-active')
    return () => document.body.classList.remove('admin-portal-active')
  }, [])

  if (!ready) return null
  if (!adminUser) return <Navigate to="/admin/login" replace />

  return (
    <div className="admin-portal flex h-screen min-w-0 overflow-hidden bg-base-bg">
      <Sidebar
        navItems={navItems}
        user={adminUser}
        onLogout={logoutAdmin}
        desktopBreakpoint="xl"
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          breadcrumbs={breadcrumbs}
          onOpenMobile={() => setMobileOpen(true)}
          user={adminUser}
          onLogout={logoutAdmin}
          desktopBreakpoint="xl"
          profilePath="/admin/settings"
          settingsPath="/admin/settings"
        />
        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full min-w-0 p-5 lg:p-8 max-w-[1600px]"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
