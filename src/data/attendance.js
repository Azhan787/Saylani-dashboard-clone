export const attendanceSummary = {
  totalClasses: 148,
  present: 115,
  leave: 0,
  absent: 33,
  percentage: 78,
}

function buildRecords() {
  const dates = [
    ['Tue', 'Sep 1, 2026', 'PRESENT'],
    ['Thu', 'Sep 3, 2026', 'PRESENT'],
    ['Sun', 'Sep 6, 2026', 'PRESENT'],
    ['Tue', 'Sep 8, 2026', 'PRESENT'],
    ['Wed', 'Sep 9, 2026', 'ABSENT'],
    ['Fri', 'Sep 11, 2026', 'PRESENT'],
    ['Mon', 'Aug 25, 2026', 'PRESENT'],
    ['Wed', 'Aug 27, 2026', 'LEAVE'],
    ['Fri', 'Aug 29, 2026', 'PRESENT'],
    ['Mon', 'Aug 18, 2026', 'PRESENT'],
    ['Wed', 'Aug 20, 2026', 'ABSENT'],
    ['Fri', 'Aug 22, 2026', 'PRESENT'],
  ]
  return dates.map((d, i) => ({ id: i + 1, day: d[0], date: d[1], status: d[2] }))
}

export const attendanceRecords = buildRecords()

export const attendanceMonths = ['Sep 2026', 'Aug 2026', 'Jul 2026', 'Jun 2026']

export const trainerAttendanceStudents = [
  { id: 1, name: 'Muhammad Azhan', roll: '447877', status: 'present' },
  { id: 2, name: 'Fatima Zahra', roll: '447812', status: 'present' },
  { id: 3, name: 'Ahmed Raza', roll: '447855', status: 'absent' },
  { id: 4, name: 'Ayesha Siddiqui', roll: '447890', status: 'present' },
  { id: 5, name: 'Bilal Hussain', roll: '447823', status: 'leave' },
  { id: 6, name: 'Sana Malik', roll: '447867', status: 'present' },
  { id: 7, name: 'Usman Tariq', roll: '447834', status: 'present' },
  { id: 8, name: 'Hira Farooq', roll: '447845', status: 'absent' },
]
