import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, X } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { sampleQuizQuestions, quizzesList } from '../../data/quizzes'
import { cn } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'

const QUIZ_SECONDS = 20 * 60

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function QuizAttempt() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studentUser, ready } = useAuth()
  const quizMeta = quizzesList.find((q) => String(q.id) === id) || quizzesList[0]

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [result, setResult] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (result) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          finishQuiz()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  function selectAnswer(qIndex, optionIndex) {
    setAnswers((a) => ({ ...a, [qIndex]: optionIndex }))
  }

  function finishQuiz() {
    let correct = 0
    sampleQuizQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1
    })
    const score = Math.round((correct / sampleQuizQuestions.length) * 100)
    setResult({ correct, score, passed: score >= 60 })
    setConfirmSubmit(false)
  }

  const question = sampleQuizQuestions[current]
  const answeredCount = Object.keys(answers).length

  if (!ready) return null
  if (!studentUser) return <Navigate to="/student/login" replace />

  if (result) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center">
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
                result.passed ? 'bg-brand-green/15 text-brand-green' : 'bg-red-400/15 text-red-400'
              )}
            >
              {result.passed ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
            </div>
            <h2 className="text-xl font-bold text-ink-primary mb-1">Quiz Completed</h2>
            <p className="text-sm text-ink-muted mb-5">{quizMeta.title}</p>
            <p className="text-5xl font-extrabold text-ink-primary mb-2">{result.score}%</p>
            <p
              className={cn(
                'text-sm font-semibold mb-6',
                result.passed ? 'text-brand-green' : 'text-red-400'
              )}
            >
              {result.passed ? 'Passed' : 'Failed'}
            </p>
            <p className="text-sm text-ink-secondary mb-6">
              You answered {result.correct} out of {sampleQuizQuestions.length} questions correctly.
            </p>
            <Button className="w-full" onClick={() => navigate('/student/quiz')}>
              Back to Quizzes
            </Button>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 bg-base-bg flex flex-col">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4 border-b border-base-border">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-primary truncate">{quizMeta.title}</p>
          <p className="text-xs text-ink-muted">{quizMeta.module}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div
            className={cn(
              'flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border',
              timeLeft < 60
                ? 'text-red-400 border-red-400/40 bg-red-400/10'
                : 'text-ink-primary border-base-border bg-base-surface2'
            )}
          >
            <Clock size={15} />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => navigate('/student/quiz')}
            aria-label="Exit quiz"
            className="text-ink-muted hover:text-red-400 p-1.5"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 py-8 w-full">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-ink-muted">
              Question {current + 1} of {sampleQuizQuestions.length}
            </p>
            <p className="text-sm text-ink-muted">{answeredCount} answered</p>
          </div>
          <div className="w-full h-1.5 bg-base-surface2 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-brand-blue rounded-full"
              animate={{ width: `${((current + 1) / sampleQuizQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div key={current} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            <h2 className="text-lg font-semibold text-ink-primary mb-6">{question.question}</h2>
            <div className="flex flex-col gap-3">
              {question.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i)
                const isSelected = answers[current] === i
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(current, i)}
                    className={cn(
                      'flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-colors',
                      isSelected
                        ? 'border-brand-blue bg-brand-blue/10 text-ink-primary'
                        : 'border-base-border bg-base-surface hover:border-base-borderLight text-ink-secondary'
                    )}
                  >
                    <span
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                        isSelected ? 'bg-brand-blue text-white' : 'bg-base-surface2 text-ink-muted'
                      )}
                    >
                      {letter}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-base-border px-5 lg:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            icon={ChevronLeft}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
          >
            Previous
          </Button>

          <div className="hidden sm:flex items-center gap-1.5 flex-wrap max-w-md justify-center">
            {sampleQuizQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to question ${i + 1}`}
                className={cn(
                  'w-7 h-7 rounded-lg text-xs font-medium transition-colors',
                  i === current
                    ? 'bg-brand-blue text-white'
                    : answers[i] !== undefined
                    ? 'bg-brand-green/20 text-brand-green'
                    : 'bg-base-surface2 text-ink-muted'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {current === sampleQuizQuestions.length - 1 ? (
            <Button variant="success" onClick={() => setConfirmSubmit(true)}>
              Submit Quiz
            </Button>
          ) : (
            <Button
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => setCurrent((c) => Math.min(sampleQuizQuestions.length - 1, c + 1))}
            >
              Next
            </Button>
          )}
        </div>
      </div>

      <Modal
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        title="Submit Quiz?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmSubmit(false)}>
              Keep Reviewing
            </Button>
            <Button variant="success" onClick={finishQuiz}>
              Confirm Submit
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-secondary">
          You've answered {answeredCount} of {sampleQuizQuestions.length} questions. Once submitted, you
          won't be able to change your answers.
        </p>
      </Modal>
    </div>
  )
}
