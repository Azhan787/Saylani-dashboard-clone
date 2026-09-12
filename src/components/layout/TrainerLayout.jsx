import { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutGrid, Users, CalendarCheck, FileText, ClipboardCheck, UserCircle } from 'lucide-react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/trainer/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/trainer/students', label: 'Students', icon: Users },
  { to: '/trainer/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/trainer/assignments', label: 'Assignments', icon: FileText },
  { to: '/trainer/quizzes', label: 'Quizzes', icon: ClipboardCheck },
  { to: '/trainer/profile', label: 'Profile', icon: UserCircle },
]

const crumbMap = {
  '/trainer/dashboard': ['Home', 'Dashboard'],
  '/trainer/students': ['Home', 'Students'],
  '/trainer/attendance': ['Home', 'Attendance'],
  '/trainer/assignments': ['Home', 'Assignments'],
  '/trainer/quizzes': ['Home', 'Quizzes'],
  '/trainer/profile': ['Home', 'Profile'],
}

export default function TrainerLayout() {
  const { trainerUser, logoutTrainer, ready } = useAuth()
  const location = useLocation()
  const breadcrumbs = crumbMap[location.pathname] || ['Home']
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!ready) return null
  if (!trainerUser) return <Navigate to="/trainer/login" replace />

  return (
    <div className="flex h-screen overflow-hidden bg-base-bg">
      <Sidebar
        navItems={navItems}
        user={trainerUser}
        onLogout={logoutTrainer}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          breadcrumbs={breadcrumbs}
          onOpenMobile={() => setMobileOpen(true)}
          user={trainerUser}
          onLogout={logoutTrainer}
          profilePath="/trainer/profile"
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
