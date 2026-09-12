import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/ui/Toast'

import StudentLayout from './components/layout/StudentLayout'
import TrainerLayout from './components/layout/TrainerLayout'

import StudentLogin from './pages/student/StudentLogin'
import CreatePassword from './pages/student/CreatePassword'
import Dashboard from './pages/student/Dashboard'
import Progress from './pages/student/Progress'
import Attendance from './pages/student/Attendance'
import Payment from './pages/student/Payment'
import Assignments from './pages/student/Assignments'
import Quiz from './pages/student/Quiz'
import QuizAttempt from './pages/student/QuizAttempt'
import Profile from './pages/student/Profile'

import TrainerLogin from './pages/trainer/TrainerLogin'
import TrainerDashboard from './pages/trainer/Dashboard'
import TrainerStudents from './pages/trainer/Students'
import TrainerAttendance from './pages/trainer/Attendance'
import TrainerAssignments from './pages/trainer/Assignments'
import TrainerQuizzes from './pages/trainer/Quizzes'
import TrainerProfile from './pages/trainer/Profile'

import AdminLayout from './components/layout/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import AdminStudents from './pages/admin/Students'
import AdminTrainers from './pages/admin/Trainers'
import AdminCourses from './pages/admin/Courses'
import AdminBatches from './pages/admin/Batches'
import AdminAttendance from './pages/admin/Attendance'
import AdminAssignments from './pages/admin/Assignments'
import AdminQuizzes from './pages/admin/Quizzes'
import AdminPayments from './pages/admin/Payments'
import AdminAnnouncements from './pages/admin/Announcements'
import AdminReports from './pages/admin/Reports'
import AdminSettings from './pages/admin/Settings'

import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/student/login" replace />} />

          {/* Student auth */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/create-password" element={<CreatePassword />} />

          {/* Student portal */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="progress" element={<Progress />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="payment" element={<Payment />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/student/quiz/:id/attempt" element={<QuizAttempt />} />

          {/* Trainer auth */}
          <Route path="/trainer/login" element={<TrainerLogin />} />

          {/* Trainer portal */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route path="dashboard" element={<TrainerDashboard />} />
            <Route path="students" element={<TrainerStudents />} />
            <Route path="attendance" element={<TrainerAttendance />} />
            <Route path="assignments" element={<TrainerAssignments />} />
            <Route path="quizzes" element={<TrainerQuizzes />} />
            <Route path="profile" element={<TrainerProfile />} />
          </Route>

          {/* Admin auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="trainers" element={<AdminTrainers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="batches" element={<AdminBatches />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="assignments" element={<AdminAssignments />} />
            <Route path="quizzes" element={<AdminQuizzes />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
