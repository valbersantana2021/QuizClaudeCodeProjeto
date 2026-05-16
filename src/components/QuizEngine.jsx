import { useTimer } from '../hooks/useTimer.js'
import Timer from './Timer.jsx'
import ProgressBar from './ProgressBar.jsx'
import QuestionCard from './QuestionCard.jsx'
import FeedbackOverlay from './FeedbackOverlay.jsx'
import Header from './Header.jsx'

const NIVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

const NIVEL_BLOCKS = ['iniciante', 'intermediario', 'avancado']

function getBlockBoundaries(questions) {
  const boundaries = { iniciante: 0, intermediario: 0, avancado: 0 }
  let last = null
  questions.forEach((q, i) => {
    if (q.nivel !== last) {
      boundaries[q.nivel] = i
      last = q.nivel
    }
  })
  return boundaries
}

function getCurrentBlock(questions, currentIndex) {
  const boundaries = getBlockBoundaries(questions)
  let block = 'iniciante'
  for (const nivel of NIVEL_BLOCKS) {
    if (currentIndex >= boundaries[nivel]) block = nivel
  }
  return block
}

export default function QuizEngine({ nivelEntrada, questions, currentIndex, feedback, timerSeconds, onAnswer, onNext }) {
  const question = questions[currentIndex]
  const answered = feedback !== null
  const currentBlock = getCurrentBlock(questions, currentIndex)

  const { timeLeft } = useTimer(timerSeconds, () => {
    if (!answered) onAnswer(null)
  })

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center py-8 px-4">
      <Header />
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-brand-secondary">
            Nível: <span className="text-brand-text font-semibold">{NIVEL_LABELS[nivelEntrada]}</span>
          </span>
          <span className="text-sm font-medium text-brand-secondary">
            Pergunta <span className="text-brand-text font-semibold">{currentIndex + 1}</span> de {questions.length}
          </span>
        </div>

        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* Block indicator */}
        <div className="flex items-center gap-2 mt-3 mb-6">
          {NIVEL_BLOCKS.map(nivel => (
            <span
              key={nivel}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                nivel === currentBlock
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-border text-brand-secondary'
              }`}
            >
              {NIVEL_LABELS[nivel]}
            </span>
          ))}
        </div>

        {/* Timer — hidden when feedback shown */}
        {!answered && (
          <div className="mb-4">
            <Timer timeLeft={timeLeft} total={timerSeconds} />
          </div>
        )}

        <QuestionCard question={question} feedback={feedback} onAnswer={onAnswer} />

        {answered && (
          <div className="mt-4">
            <FeedbackOverlay feedback={feedback} onNext={onNext} />
          </div>
        )}
      </div>
    </div>
  )
}
