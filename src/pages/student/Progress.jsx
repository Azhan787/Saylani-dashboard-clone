import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookMarked, GraduationCap, Clock3, CheckCircle2, ChevronDown, Circle } from 'lucide-react'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/ui/Card'
import CircularProgress from '../../components/ui/CircularProgress'
import { modules } from '../../data/courses'

const totalTopics = modules.reduce((s, m) => s + m.total, 0)
const completedTopics = modules.reduce((s, m) => s + m.completed, 0)
const pendingTopics = totalTopics - completedTopics

export default function Progress() {
  const [expanded, setExpanded] = useState(modules[1]?.id || null)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={BookMarked} iconColor="text-brand-green" iconBg="bg-brand-green/10" value={totalTopics} label="Total Topics" />
        <StatCard icon={GraduationCap} iconColor="text-purple-300" iconBg="bg-purple-400/10" value={completedTopics} label="Completed Topics" />
        <StatCard icon={Clock3} iconColor="text-red-400" iconBg="bg-red-400/10" value={pendingTopics} label="Pending Topics" />
      </div>

      <div className="flex flex-col gap-4">
        {modules.map((m) => {
          const isOpen = expanded === m.id
          return (
            <Card key={m.id} className="overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : m.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      m.status === 'complete' ? 'bg-brand-green/15 text-brand-green' : 'bg-amber-400/15 text-amber-400'
                    }`}
                  >
                    {m.status === 'complete' ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-primary truncate">{m.title}</p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Topics: {m.completed}/{m.total}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <CircularProgress value={m.percent} color={m.percent === 0 ? '#6b6d78' : '#3b6bdb'} />
                  <ChevronDown
                    size={18}
                    className={`text-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-base-border grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-brand-green mb-2 uppercase tracking-wide">
                          Completed ({m.completedTopics.length})
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {m.completedTopics.length ? (
                            m.completedTopics.map((t) => (
                              <li key={t} className="flex items-center gap-2 text-sm text-ink-secondary">
                                <CheckCircle2 size={14} className="text-brand-green shrink-0" />
                                {t}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-ink-muted">No completed topics yet</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wide">
                          Pending ({m.pendingTopics.length})
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {m.pendingTopics.length ? (
                            m.pendingTopics.map((t) => (
                              <li key={t} className="flex items-center gap-2 text-sm text-ink-secondary">
                                <Circle size={12} className="text-ink-muted shrink-0" />
                                {t}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-ink-muted">All topics completed</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
