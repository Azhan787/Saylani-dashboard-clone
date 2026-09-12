import { useState } from 'react'
import { ClipboardList, CheckSquare, Clock3, Eye, Upload, Pencil, ChevronLeft, ChevronRight } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { assignmentStats, assignmentsList } from '../../data/assignments'
import { useToast } from '../../components/ui/Toast'

const PAGE_SIZE = 10

export default function Assignments() {
  const [page, setPage] = useState(1)
  const [viewing, setViewing] = useState(null)
  const [submitting, setSubmitting] = useState(null)
  const { showToast } = useToast()

  const totalPages = Math.ceil(assignmentsList.length / PAGE_SIZE)
  const pageItems = assignmentsList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSubmit() {
    showToast(`"${submitting.title}" submitted successfully.`, 'success')
    setSubmitting(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={ClipboardList} iconColor="text-brand-blueLight" iconBg="bg-brand-blue/10" value={assignmentStats.assigned} label="Assigned" />
        <StatCard icon={CheckSquare} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={assignmentStats.submitted} label="Submitted" />
        <StatCard icon={Clock3} iconColor="text-amber-400" iconBg="bg-amber-400/10" value={assignmentStats.pending} label="Pending" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-base-border">
                <th className="px-5 py-3 font-medium">Assignment</th>
                <th className="px-5 py-3 font-medium">Topics</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((a) => (
                <tr
                  key={a.id}
                  className={`border-b border-base-border last:border-0 ${a.hackathon ? 'bg-purple-500/5' : ''}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium ${a.hackathon ? 'text-purple-300' : 'text-ink-primary'}`}>
                        {a.title}
                      </span>
                      {a.hackathon && <Badge tone="HACKATHON">HACKATHON</Badge>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium bg-base-surface2 border border-base-border rounded-md px-2 py-1 text-ink-secondary whitespace-nowrap">
                      {a.topics}
                    </span>
                  </td>
                  <td className={`px-5 py-4 whitespace-nowrap ${a.status === 'NOT SUBMITTED' ? 'text-red-400' : 'text-ink-secondary'}`}>
                    {a.dueDate}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={a.status}>{a.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setViewing(a)}
                        aria-label={`View ${a.title}`}
                        className="text-ink-muted hover:text-ink-primary"
                      >
                        <Eye size={16} />
                      </button>
                      {a.closed ? (
                        <span className="text-xs italic text-red-400">Submissions closed</span>
                      ) : (
                        <>
                          <button
                            onClick={() => setSubmitting(a)}
                            aria-label={`Submit ${a.title}`}
                            className="text-ink-muted hover:text-brand-green"
                          >
                            <Upload size={16} />
                          </button>
                          <button
                            aria-label={`Edit ${a.title}`}
                            className="text-ink-muted hover:text-ink-primary"
                          >
                            <Pencil size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-base-border">
          <p className="text-xs text-ink-muted">
            Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, assignmentsList.length)} of{' '}
            {assignmentsList.length} records
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 text-xs text-ink-secondary hover:text-ink-primary disabled:opacity-40 disabled:hover:text-ink-secondary px-2 py-1"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-7 h-7 rounded-lg text-xs font-medium ${
                  n === page ? 'bg-brand-blue text-white' : 'text-ink-secondary hover:bg-base-surface2'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 text-xs text-ink-secondary hover:text-ink-primary disabled:opacity-40 disabled:hover:text-ink-secondary px-2 py-1"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </Card>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing?.title} size="lg">
        {viewing && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone={viewing.status}>{viewing.status}</Badge>
              {viewing.hackathon && <Badge tone="HACKATHON">HACKATHON</Badge>}
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{viewing.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink-muted text-xs mb-1">Topics</p>
                <p className="text-ink-primary">{viewing.topics}</p>
              </div>
              <div>
                <p className="text-ink-muted text-xs mb-1">Due Date</p>
                <p className="text-ink-primary">{viewing.dueDate}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!submitting}
        onClose={() => setSubmitting(null)}
        title={`Submit: ${submitting?.title || ''}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSubmitting(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit Assignment</Button>
          </>
        }
      >
        <div className="border-2 border-dashed border-base-border rounded-xl p-8 text-center">
          <Upload size={28} className="mx-auto text-ink-muted mb-3" />
          <p className="text-sm text-ink-secondary">Drag & drop your file here, or click to browse.</p>
          <p className="text-xs text-ink-muted mt-1">This is a frontend-only demo — no file is actually uploaded.</p>
        </div>
      </Modal>
    </div>
  )
}
