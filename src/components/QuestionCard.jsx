export default function QuestionCard({ question, feedback, onAnswer }) {
  const answered = feedback !== null

  const cardBg = answered
    ? feedback.correto
      ? 'bg-green-50 border-green-300'
      : 'bg-red-50 border-red-300'
    : 'bg-brand-card border-brand-border'

  return (
    <div className={`border-2 ${cardBg} rounded-2xl p-6 transition-colors duration-300`}>
      <p className="text-brand-text text-xl sm:text-2xl font-medium leading-snug mb-8 text-center">
        {question.afirmacao}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onAnswer(true)}
          disabled={answered}
          className="min-h-[56px] bg-brand-success hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-colors"
        >
          VERDADEIRO
        </button>
        <button
          onClick={() => onAnswer(false)}
          disabled={answered}
          className="min-h-[56px] bg-brand-error hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-colors"
        >
          FALSO
        </button>
      </div>
    </div>
  )
}
