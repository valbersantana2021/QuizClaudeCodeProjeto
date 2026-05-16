import { useEffect, useState } from 'react'

export default function FeedbackOverlay({ feedback, onNext }) {
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    setCanNext(false)
    const t = setTimeout(() => setCanNext(true), 1000)
    return () => clearTimeout(t)
  }, [feedback])

  if (!feedback) return null

  const { correto, respostaCorreta, explicacao } = feedback

  return (
    <div className={`rounded-xl p-4 border-2 ${correto ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{correto ? '✓' : '✗'}</span>
        <span className={`font-bold text-lg ${correto ? 'text-brand-success' : 'text-brand-error'}`}>
          {correto ? 'Correto!' : 'Incorreto'}
        </span>
        <span className={`ml-auto text-sm font-semibold px-2.5 py-1 rounded-full ${respostaCorreta ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {respostaCorreta ? 'VERDADEIRO' : 'FALSO'}
        </span>
      </div>
      <p className="text-brand-secondary text-sm leading-relaxed">{explicacao}</p>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="mt-4 w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
      >
        Próxima Pergunta →
      </button>
    </div>
  )
}
