import { createContext, useContext, useEffect, useState } from 'react'
import { currentStudent, currentTrainer } from '../data/students'
import { currentAdmin } from '../data/admin'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [studentUser, setStudentUser] = useState(null)
  const [trainerUser, setTrainerUser] = useState(null)
  const [adminUser, setAdminUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const s = localStorage.getItem('ta_studentUser')
      const t = localStorage.getItem('ta_trainerUser')
      const a = localStorage.getItem('ta_adminUser')
      if (s) setStudentUser(JSON.parse(s))
      if (t) setTrainerUser(JSON.parse(t))
      if (a) setAdminUser(JSON.parse(a))
    } catch (e) {
      // ignore corrupt storage
    }
    setReady(true)
  }, [])

  function loginStudent(cnic, password) {
    if (cnic?.trim() === currentStudent.cnic && password === currentStudent.password) {
      setStudentUser(currentStudent)
      localStorage.setItem('ta_studentUser', JSON.stringify(currentStudent))
      return { success: true }
    }
    return { success: false, message: 'Invalid CNIC or password. Please try again.' }
  }

  function loginTrainer(email, password) {
    if (email?.trim().toLowerCase() === currentTrainer.email && password === currentTrainer.password) {
      setTrainerUser(currentTrainer)
      localStorage.setItem('ta_trainerUser', JSON.stringify(currentTrainer))
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password. Please try again.' }
  }

  function loginAdmin(email, password) {
    if (email?.trim().toLowerCase() === currentAdmin.email && password === currentAdmin.password) {
      setAdminUser(currentAdmin)
      localStorage.setItem('ta_adminUser', JSON.stringify(currentAdmin))
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password. Please try again.' }
  }

  function logoutStudent() {
    setStudentUser(null)
    localStorage.removeItem('ta_studentUser')
  }

  function logoutTrainer() {
    setTrainerUser(null)
    localStorage.removeItem('ta_trainerUser')
  }

  function logoutAdmin() {
    setAdminUser(null)
    localStorage.removeItem('ta_adminUser')
  }

  return (
    <AuthContext.Provider
      value={{
        studentUser,
        trainerUser,
        adminUser,
        ready,
        loginStudent,
        loginTrainer,
        loginAdmin,
        logoutStudent,
        logoutTrainer,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
