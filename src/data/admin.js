  // Admin-facing mock data. Structured so each collection can later be swapped
  // for a real API response (Node.js/Express/MongoDB) without touching the UI.

  export const currentAdmin = {
    id: 'adm-01',
    fullName: 'Ayesha Kamal',
    email: 'admin@tayyebahacademy.com',
    password: 'admin123',
    role: 'Administrator',
    phone: '0321-9988776',
    avatar: null,
  }

  export const dashboardStats = {
    totalStudents: 1248,
    totalTrainers: 32,
    activeCourses: 18,
    activeBatches: 24,
    totalAssignments: 156,
    pendingPayments: 125000,
  }

  export const enrollmentByMonth = [
    { label: 'Jan', value: 62 },
    { label: 'Feb', value: 74 },
    { label: 'Mar', value: 88 },
    { label: 'Apr', value: 70 },
    { label: 'May', value: 96 },
    { label: 'Jun', value: 110 },
    { label: 'Jul', value: 104 },
    { label: 'Aug', value: 132 },
    { label: 'Sep', value: 118 },
    { label: 'Oct', value: 90 },
    { label: 'Nov', value: 76 },
    { label: 'Dec', value: 58 },
  ]

  export const attendanceBreakdown = [
    { label: 'Present', value: 78, tone: 'green' },
    { label: 'Absent', value: 16, tone: 'red' },
    { label: 'Leave', value: 6, tone: 'amber' },
  ]

  export const courseProgressBreakdown = [
    { label: 'Completed', value: 42, tone: 'green' },
    { label: 'In Progress', value: 45, tone: 'blue' },
    { label: 'Not Started', value: 13, tone: 'muted' },
  ]

  export const paymentBreakdown = [
    { label: 'Paid', value: 68, tone: 'green' },
    { label: 'Pending', value: 22, tone: 'amber' },
    { label: 'Overdue', value: 10, tone: 'red' },
  ]

  export const recentActivity = [
    { id: 1, type: 'student', text: 'New student "Hamza Iqbal" registered for Modern Web Application Development', time: '10 minutes ago' },
    { id: 2, type: 'trainer', text: 'Trainer "Sarah Khalid" added to Front-End Development', time: '48 minutes ago' },
    { id: 3, type: 'assignment', text: '"Amazon Clone" assignment submitted by Sana Malik', time: '1 hour ago' },
    { id: 4, type: 'payment', text: 'Payment received from Fatima Zahra — Rs. 1,000', time: '2 hours ago' },
    { id: 5, type: 'batch', text: 'New batch "Batch 25" created for Back-End Development', time: '3 hours ago' },
    { id: 6, type: 'quiz', text: '"React Fundamentals Quiz" published to Batch 20', time: '5 hours ago' },
    { id: 7, type: 'student', text: 'Student "Bilal Hussain" marked inactive due to low attendance', time: '1 day ago' },
  ]

  // ---------------- Students ----------------
  export const adminStudentsList = [
    { id: 1, name: 'Muhammad Azhan', roll: '447877', email: 'muhammad.azhan@student.tayyebahacademy.com', phone: '0301-2345678', cnic: '42101-1234567-1', dob: '2002-04-12', course: 'Modern Web Application Development', batch: 20, attendance: 78, status: 'Active' },
    { id: 2, name: 'Fatima Zahra', roll: '447812', email: 'fatima.zahra@student.tayyebahacademy.com', phone: '0302-2233445', cnic: '42101-2234567-2', dob: '2001-11-03', course: 'Modern Web Application Development', batch: 20, attendance: 92, status: 'Active' },
    { id: 3, name: 'Ahmed Raza', roll: '447855', email: 'ahmed.raza@student.tayyebahacademy.com', phone: '0303-3344556', cnic: '42101-3234567-3', dob: '2002-01-22', course: 'Modern Web Application Development', batch: 20, attendance: 65, status: 'Active' },
    { id: 4, name: 'Ayesha Siddiqui', roll: '447890', email: 'ayesha.siddiqui@student.tayyebahacademy.com', phone: '0304-4455667', cnic: '42101-4234567-4', dob: '2002-07-09', course: 'Modern Web Application Development', batch: 20, attendance: 88, status: 'Active' },
    { id: 5, name: 'Bilal Hussain', roll: '447823', email: 'bilal.hussain@student.tayyebahacademy.com', phone: '0305-5566778', cnic: '42101-5234567-5', dob: '2001-09-17', course: 'Modern Web Application Development', batch: 20, attendance: 45, status: 'Probation' },
    { id: 6, name: 'Sana Malik', roll: '447867', email: 'sana.malik@student.tayyebahacademy.com', phone: '0306-6677889', cnic: '42101-6234567-6', dob: '2002-02-28', course: 'Modern Web Application Development', batch: 20, attendance: 96, status: 'Active' },
    { id: 7, name: 'Usman Tariq', roll: '447834', email: 'usman.tariq@student.tayyebahacademy.com', phone: '0307-7788990', cnic: '42101-7234567-7', dob: '2001-12-05', course: 'Modern Web Application Development', batch: 20, attendance: 72, status: 'Active' },
    { id: 8, name: 'Hira Farooq', roll: '447845', email: 'hira.farooq@student.tayyebahacademy.com', phone: '0308-8899001', cnic: '42101-8234567-8', dob: '2002-06-14', course: 'Modern Web Application Development', batch: 20, attendance: 30, status: 'Inactive' },
    { id: 9, name: 'Zainab Aslam', roll: '447901', email: 'zainab.aslam@student.tayyebahacademy.com', phone: '0309-9900112', cnic: '42101-9234567-9', dob: '2002-03-19', course: 'Front-End Development', batch: 21, attendance: 84, status: 'Active' },
    { id: 10, name: 'Hamza Iqbal', roll: '447912', email: 'hamza.iqbal@student.tayyebahacademy.com', phone: '0310-0011223', cnic: '42101-0234567-0', dob: '2001-10-30', course: 'Back-End Development', batch: 25, attendance: 58, status: 'Active' },
    { id: 11, name: 'Mahnoor Fatima', roll: '447923', email: 'mahnoor.fatima@student.tayyebahacademy.com', phone: '0311-1122334', cnic: '42101-1334567-1', dob: '2002-08-08', course: 'Web Designing', batch: 19, attendance: 91, status: 'Active' },
    { id: 12, name: 'Talha Mehmood', roll: '447934', email: 'talha.mehmood@student.tayyebahacademy.com', phone: '0312-2233445', cnic: '42101-2434567-2', dob: '2001-05-25', course: 'Full Stack Development', batch: 22, attendance: 40, status: 'Probation' },
  ]

  export const studentStatusOptions = ['All', 'Active', 'Probation', 'Inactive']

  // ---------------- Trainers ----------------
  export const adminTrainersList = [
    { id: 1, name: 'Muhammad Trainer', email: 'trainer@tayyebahacademy.com', phone: '0300-1122334', course: 'Modern Web Application Development', batch: 20, students: 24, status: 'Active' },
    { id: 2, name: 'Sarah Khalid', email: 'sarah.khalid@tayyebahacademy.com', phone: '0321-4455667', course: 'Front-End Development', batch: 21, students: 28, status: 'Active' },
    { id: 3, name: 'Imran Yousuf', email: 'imran.yousuf@tayyebahacademy.com', phone: '0333-7788990', course: 'Back-End Development', batch: 25, students: 22, status: 'Active' },
    { id: 4, name: 'Nadia Farooqui', email: 'nadia.farooqui@tayyebahacademy.com', phone: '0345-9900112', course: 'Web Designing', batch: 19, students: 30, status: 'Active' },
    { id: 5, name: 'Kamran Sheikh', email: 'kamran.sheikh@tayyebahacademy.com', phone: '0301-3344556', course: 'Full Stack Development', batch: 22, students: 26, status: 'On Leave' },
  ]

  export const trainerStatusOptions = ['All', 'Active', 'On Leave', 'Inactive']

  // ---------------- Courses ----------------
  export const adminCoursesList = [
    { id: 1, name: 'Web Designing', description: 'HTML, CSS, responsive layouts and design fundamentals.', duration: '3 months', trainer: 'Nadia Farooqui', totalTopics: 20, status: 'Active' },
    { id: 2, name: 'Front-End Development', description: 'JavaScript, DOM, and modern front-end tooling.', duration: '4 months', trainer: 'Sarah Khalid', totalTopics: 31, status: 'Active' },
    { id: 3, name: 'Modern Front-End Development', description: 'React, component architecture, and state management.', duration: '3 months', trainer: 'Muhammad Trainer', totalTopics: 14, status: 'Active' },
    { id: 4, name: 'Back-End Development', description: 'Node.js, Express, REST APIs and databases.', duration: '4 months', trainer: 'Imran Yousuf', totalTopics: 16, status: 'Active' },
    { id: 5, name: 'Full Stack Development', description: 'End-to-end web application development.', duration: '6 months', trainer: 'Kamran Sheikh', totalTopics: 48, status: 'Active' },
    { id: 6, name: 'Mobile App Development', description: 'Cross-platform mobile apps with React Native.', duration: '4 months', trainer: 'Unassigned', totalTopics: 26, status: 'Draft' },
  ]

  export const courseStatusOptions = ['All', 'Active', 'Draft', 'Archived']

  // ---------------- Batches ----------------
  export const adminBatchesList = [
    { id: 1, number: 20, course: 'Modern Web Application Development', trainer: 'Muhammad Trainer', students: 24, campus: 'Tayyebah Academy Campus', city: 'Karachi', schedule: 'Mon / Wed / Fri · 1:00 PM - 3:00 PM', status: 'Active' },
    { id: 2, number: 21, course: 'Front-End Development', trainer: 'Sarah Khalid', students: 28, campus: 'Tayyebah Academy Campus', city: 'Karachi', schedule: 'Tue / Thu · 3:00 PM - 5:30 PM', status: 'Active' },
    { id: 3, number: 19, course: 'Web Designing', trainer: 'Nadia Farooqui', students: 30, campus: 'Tayyebah Academy Campus', city: 'Karachi', schedule: 'Sat / Sun · 10:00 AM - 1:00 PM', status: 'Completed' },
    { id: 4, number: 22, course: 'Full Stack Development', trainer: 'Kamran Sheikh', students: 26, campus: 'Tayyebah Academy North Campus', city: 'Lahore', schedule: 'Mon / Wed / Fri · 5:00 PM - 7:30 PM', status: 'Active' },
    { id: 5, number: 25, course: 'Back-End Development', trainer: 'Imran Yousuf', students: 22, campus: 'Tayyebah Academy Campus', city: 'Karachi', schedule: 'Tue / Thu / Sat · 11:00 AM - 1:30 PM', status: 'Upcoming' },
  ]

  export const batchStatusOptions = ['All', 'Active', 'Upcoming', 'Completed']

  // ---------------- Assignments (admin-wide) ----------------
  export const adminAssignmentsList = [
    { id: 1, title: 'Admin Panel (E-Commerce Dashboard)', course: 'Modern Web Application Development', batch: 20, dueDate: '2026-09-10', submissions: 8, total: 24, pending: 16, approved: 6, rejected: 2, status: 'Active' },
    { id: 2, title: 'E-Commerce Website (React JS)', course: 'Modern Web Application Development', batch: 20, dueDate: '2026-08-17', submissions: 22, total: 24, pending: 2, approved: 19, rejected: 1, status: 'Closed' },
    { id: 3, title: 'Portfolio Website', course: 'Front-End Development', batch: 21, dueDate: '2026-08-28', submissions: 26, total: 28, pending: 2, approved: 24, rejected: 0, status: 'Active' },
    { id: 4, title: 'CSS Layout Challenges', course: 'Web Designing', batch: 19, dueDate: '2026-07-15', submissions: 30, total: 30, pending: 0, approved: 29, rejected: 1, status: 'Closed' },
    { id: 5, title: 'REST API with Express', course: 'Back-End Development', batch: 25, dueDate: '2026-09-20', submissions: 4, total: 22, pending: 18, approved: 4, rejected: 0, status: 'Active' },
  ]

  export const assignmentStatusOptions = ['All', 'Active', 'Closed']

  // ---------------- Quizzes (admin-wide) ----------------
  export const adminQuizzesList = [
    { id: 1, title: 'Javascript (Quiz-4)', course: 'Modern Web Application Development', batch: 20, questions: 40, attempts: 24, avgScore: 48, published: true },
    { id: 2, title: 'CSS Quiz', course: 'Web Designing', batch: 19, questions: 40, attempts: 30, avgScore: 61, published: true },
    { id: 3, title: 'React Fundamentals Quiz', course: 'Modern Front-End Development', batch: 20, questions: 10, attempts: 0, avgScore: 0, published: false },
    { id: 4, title: 'Node.js Basics Quiz', course: 'Back-End Development', batch: 25, questions: 20, attempts: 5, avgScore: 55, published: true },
    { id: 5, title: 'HTML Quiz', course: 'Web Designing', batch: 19, questions: 40, attempts: 30, avgScore: 70, published: true },
  ]

  // ---------------- Payments (admin-wide) ----------------
  export const adminPaymentStats = {
    totalRevenue: 1248000,
    paid: 980000,
    pending: 175000,
    overdue: 93000,
  }

  export const adminPaymentsList = [
    { id: 1, student: 'Muhammad Azhan', roll: '447877', month: 'Sep 2026', amount: 1000, type: 'Monthly', dueDate: '08-Sep-2026', voucherId: '202609447877', status: 'PAID' },
    { id: 2, student: 'Fatima Zahra', roll: '447812', month: 'Sep 2026', amount: 1000, type: 'Monthly', dueDate: '08-Sep-2026', voucherId: '202609447812', status: 'PAID' },
    { id: 3, student: 'Ahmed Raza', roll: '447855', month: 'Sep 2026', amount: 1000, type: 'Monthly', dueDate: '08-Sep-2026', voucherId: '202609447855', status: 'PENDING' },
    { id: 4, student: 'Ayesha Siddiqui', roll: '447890', month: 'Sep 2026', amount: 1000, type: 'Monthly', dueDate: '08-Sep-2026', voucherId: '202609447890', status: 'PAID' },
    { id: 5, student: 'Bilal Hussain', roll: '447823', month: 'Aug 2026', amount: 1000, type: 'Monthly', dueDate: '08-Aug-2026', voucherId: '202608447823', status: 'OVERDUE' },
    { id: 6, student: 'Sana Malik', roll: '447867', month: 'Sep 2026', amount: 1000, type: 'Monthly', dueDate: '08-Sep-2026', voucherId: '202609447867', status: 'PAID' },
    { id: 7, student: 'Usman Tariq', roll: '447834', month: 'Sep 2026', amount: 1000, type: 'Monthly', dueDate: '08-Sep-2026', voucherId: '202609447834', status: 'PENDING' },
    { id: 8, student: 'Hira Farooq', roll: '447845', month: 'Aug 2026', amount: 1000, type: 'Monthly', dueDate: '08-Aug-2026', voucherId: '202608447845', status: 'OVERDUE' },
  ]

  export const paymentStatusOptions = ['All', 'Paid', 'Pending', 'Overdue']

  // ---------------- Announcements ----------------
  export const adminAnnouncementsList = [
    { id: 1, title: 'Eid Holidays Notice', description: 'The academy will remain closed for Eid holidays from the 1st to the 5th. Classes resume on the 6th.', audience: 'All Students', priority: 'High', date: '2026-09-01', status: 'Published' },
    { id: 2, title: 'New Batch 25 Enrollment Open', description: 'Enrollment for Back-End Development Batch 25 is now open. Limited seats available.', audience: 'All Students', priority: 'Medium', date: '2026-08-28', status: 'Published' },
    { id: 3, title: 'Trainer Meeting — Curriculum Review', description: 'All trainers are requested to attend the curriculum review meeting on Friday.', audience: 'All Trainers', priority: 'High', date: '2026-09-05', status: 'Published' },
    { id: 4, title: 'Fee Deadline Reminder — Batch 20', description: 'Monthly fee for Batch 20 is due by the 8th of this month. Please clear pending dues to avoid late charges.', audience: 'Specific Batch', priority: 'Medium', date: '2026-09-03', status: 'Draft' },
    { id: 5, title: 'Hackathon Announcement', description: 'A 48-hour hackathon will be held for all Modern Web Application Development students next month.', audience: 'Specific Course', priority: 'Low', date: '2026-09-08', status: 'Published' },
  ]

  export const announcementAudiences = ['All Students', 'All Trainers', 'Specific Batch', 'Specific Course']
  export const announcementPriorities = ['Low', 'Medium', 'High']

  // ---------------- Reports ----------------
  export const reportTypes = [
    { id: 'student', title: 'Student Report', description: 'Enrollment, performance, and status breakdown across all students.', metric: '1,248 students' },
    { id: 'attendance', title: 'Attendance Report', description: 'Attendance percentages by batch, course, and date range.', metric: '78% avg. attendance' },
    { id: 'course-progress', title: 'Course Progress Report', description: 'Topic completion status across all active courses.', metric: '18 active courses' },
    { id: 'assignment', title: 'Assignment Report', description: 'Submission rates, approvals, and rejections by assignment.', metric: '156 assignments' },
    { id: 'quiz', title: 'Quiz Report', description: 'Attempts, pass rates, and average scores by quiz.', metric: '64% avg. pass rate' },
    { id: 'payment', title: 'Payment Report', description: 'Revenue, pending dues, and overdue payments by month.', metric: 'Rs. 1,248,000 revenue' },
  ]
