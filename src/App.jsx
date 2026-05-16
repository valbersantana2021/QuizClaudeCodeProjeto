import { useQuiz } from './hooks/useQuiz.js'
import Home from './components/Home.jsx'
import LevelSelect from './components/LevelSelect.jsx'
import QuizEngine from './components/QuizEngine.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import Ranking from './components/Ranking.jsx'
import HowItWorks from './components/HowItWorks.jsx'

export default function App() {
  const {
    screen,
    nivelEntrada,
    questions,
    currentIndex,
    answers,
    feedback,
    loading,
    saving,
    saved,
    totalTime,
    timerSeconds,
    startQuiz,
    submitAnswer,
    nextQuestion,
    saveResult,
    restartQuiz,
    goHome,
    goRanking,
    goHowItWorks,
  } = useQuiz()

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <p className="text-brand-secondary animate-pulse text-lg">Carregando perguntas…</p>
      </div>
    )
  }

  if (screen === 'home') return <Home onStart={restartQuiz} onRanking={goRanking} onHowItWorks={goHowItWorks} />
  if (screen === 'levelSelect') return <LevelSelect onSelect={startQuiz} />
  if (screen === 'ranking') return <Ranking onBack={goHome} />
  if (screen === 'howItWorks') return <HowItWorks onBack={restartQuiz} />
  if (screen === 'quiz' && questions.length > 0) {
    return (
      <QuizEngine
        key={currentIndex}
        nivelEntrada={nivelEntrada}
        questions={questions}
        currentIndex={currentIndex}
        feedback={feedback}
        timerSeconds={timerSeconds}
        onAnswer={submitAnswer}
        onNext={nextQuestion}
      />
    )
  }
  if (screen === 'result') {
    return (
      <ResultScreen
        answers={answers}
        nivelEntrada={nivelEntrada}
        totalTime={totalTime}
        saving={saving}
        saved={saved}
        onSave={saveResult}
        onRetry={restartQuiz}
        onChangeLevel={() => restartQuiz()}
      />
    )
  }

  return <Home onStart={restartQuiz} onRanking={goRanking} onHowItWorks={goHowItWorks} />
}
