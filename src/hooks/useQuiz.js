import { useState, useCallback, useRef } from 'react'
import { fetchQuestions, selectQuestions } from '../services/questionsService.js'
import { saveSession } from '../services/sessionsService.js'

const TIMER_SECONDS = 15

export function useQuiz() {
  const [screen, setScreen] = useState('home')        // home | levelSelect | quiz | result
  const [nivelEntrada, setNivelEntrada] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [feedback, setFeedback] = useState(null)       // { correto, respostaCorreta, explicacao } | null
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const startTimeRef = useRef(null)
  const questionStartRef = useRef(null)
  const answeredRef = useRef(false)   // prevents timer+click race condition

  const startQuiz = useCallback(async (nivel) => {
    setLoading(true)
    setNivelEntrada(nivel)
    const all = await fetchQuestions()
    const selected = selectQuestions(all, nivel)
    setQuestions(selected)
    setCurrentIndex(0)
    setAnswers([])
    setFeedback(null)
    setSaved(false)
    answeredRef.current = false
    startTimeRef.current = Date.now()
    questionStartRef.current = Date.now()
    setLoading(false)
    setScreen('quiz')
  }, [])

  const submitAnswer = useCallback((resposta) => {
    if (answeredRef.current) return
    answeredRef.current = true

    const question = questions[currentIndex]
    const correto = resposta === question.resposta
    const tempoResposta = Math.round((Date.now() - questionStartRef.current) / 1000)

    setFeedback({
      correto,
      respostaCorreta: question.resposta,
      explicacao: question.explicacao,
    })

    setAnswers(prev => [
      ...prev,
      {
        questionId: question.id,
        nivel: question.nivel,
        afirmacao: question.afirmacao,
        respostaUsuario: resposta,
        respostaCorreta: question.resposta,
        correto,
        tempoResposta,
      },
    ])
  }, [questions, currentIndex])

  const nextQuestion = useCallback(() => {
    const next = currentIndex + 1
    answeredRef.current = false
    setFeedback(null)
    if (next >= questions.length) {
      setScreen('result')
    } else {
      setCurrentIndex(next)
      questionStartRef.current = Date.now()
    }
  }, [currentIndex, questions.length])

  const saveResult = useCallback(async (nickname) => {
    setSaving(true)
    const tempoTotal = Math.round((Date.now() - startTimeRef.current) / 1000)
    const pontuacao = answers.filter(a => a.correto).length
    await saveSession({ nivelEntrada, pontuacao, tempoTotal, nickname, answers })
    setSaving(false)
    setSaved(true)
  }, [answers, nivelEntrada])

  const restartQuiz = useCallback(() => {
    setScreen('levelSelect')
    setFeedback(null)
    setSaved(false)
  }, [])

  const goHome = useCallback(() => {
    setScreen('home')
    setFeedback(null)
    setSaved(false)
  }, [])

  const goRanking = useCallback(() => setScreen('ranking'), [])
  const goHowItWorks = useCallback(() => setScreen('howItWorks'), [])

  const totalTime = startTimeRef.current
    ? Math.round((Date.now() - startTimeRef.current) / 1000)
    : 0

  return {
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
    timerSeconds: TIMER_SECONDS,
    startQuiz,
    submitAnswer,
    nextQuestion,
    saveResult,
    restartQuiz,
    goHome,
    goRanking,
    goHowItWorks,
  }
}
