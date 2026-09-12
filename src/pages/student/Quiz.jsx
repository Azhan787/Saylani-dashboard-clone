import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { quizzesList } from '../../data/quizzes'

export default function Quiz() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-brand-blueDark/10 border-brand-blue/25">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-brand-blueLight shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-ink-primary mb-2">Important Information</h3>
            <ul className="text-sm text-ink-secondary space-y-1.5 list-disc list-inside">
              <li>Once started, quizzes must be completed in one session</li>
              <li>Switching tabs or leaving the window will be recorded</li>
              <li>Ensure you have a stable internet connection</li>
              <li>The quiz will open in fullscreen mode</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Module</th>
                <th className="px-5 py-3 font-medium">Questions</th>
                <th className="px-5 py-3 font-medium">Attempts</th>
                <th className="px-5 py-3 font-medium">Percentage</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Note</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {quizzesList.map((q) => {
                const canAttempt = q.status === 'NOT ATTEMPTED'
                return (
                  <tr key={q.id} className="border-b border-base-border last:border-0">
                    <td className="px-5 py-4 text-ink-primary font-medium whitespace-nowrap">{q.title}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{q.module}</td>
                    <td className="px-5 py-4 text-ink-secondary">{q.questions}</td>
                    <td className="px-5 py-4 text-ink-secondary whitespace-nowrap">{q.attempts}</td>
                    <td className="px-5 py-4 text-ink-secondary">{q.percentage !== null ? `${q.percentage}%` : '—'}</td>
                    <td className="px-5 py-4">
                      <Badge tone={q.status}>{q.status}</Badge>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">—</td>
                    <td className="px-5 py-4">
                      {canAttempt ? (
                        <button
                          onClick={() => navigate(`/student/quiz/${q.id}/attempt`)}
                          className="text-xs font-semibold bg-brand-blue hover:bg-brand-blueDark text-white rounded-lg px-3 py-1.5 transition-colors"
                        >
                          Start
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-ink-muted bg-base-surface2 border border-base-border rounded-lg px-3 py-1.5">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
