import { useEffect, useState } from 'react'
import { fetchRanking } from '../services/rankingService.js'
import Header from './Header.jsx'

const NIVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

const NIVEL_COLORS = {
  iniciante: 'bg-green-100 text-green-800',
  intermediario: 'bg-yellow-100 text-yellow-800',
  avancado: 'bg-red-100 text-red-800',
}

const MEDALS = ['🥇', '🥈', '🥉']

function formatTime(seconds) {
  if (!seconds) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function Ranking({ onBack }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRanking().then(data => {
      setEntries(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center px-4 pb-12">
      <Header />

      <div className="w-full max-w-2xl mt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-text">Ranking Global</h2>
            <p className="text-brand-secondary text-sm">Top 50 jogadores por pontuação</p>
          </div>
          <button
            onClick={onBack}
            className="text-sm text-brand-secondary hover:text-brand-primary transition-colors"
          >
            ← Voltar
          </button>
        </div>

        {loading ? (
          <p className="text-center text-brand-secondary animate-pulse py-12">Carregando ranking…</p>
        ) : entries.length === 0 ? (
          <div className="bg-brand-card border border-brand-border rounded-2xl p-10 text-center">
            <p className="text-brand-secondary">Nenhum resultado salvo ainda.</p>
            <p className="text-brand-secondary text-sm mt-1">Seja o primeiro a aparecer aqui!</p>
          </div>
        ) : (
          <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
            {entries.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-5 py-4 ${i !== entries.length - 1 ? 'border-b border-brand-border' : ''} ${i < 3 ? 'bg-brand-bg/40' : ''}`}
              >
                {/* Posição */}
                <span className="w-8 text-center text-lg font-bold flex-shrink-0">
                  {i < 3 ? MEDALS[i] : <span className="text-brand-secondary text-sm">{i + 1}</span>}
                </span>

                {/* Nickname */}
                <span className="flex-1 font-semibold text-brand-text truncate">
                  {entry.nickname || 'Anônimo'}
                </span>

                {/* Nível */}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${NIVEL_COLORS[entry.nivel_entrada]}`}>
                  {NIVEL_LABELS[entry.nivel_entrada]}
                </span>

                {/* Score */}
                <span className="font-bold text-brand-text flex-shrink-0 w-12 text-right">
                  {entry.pontuacao}<span className="text-brand-secondary font-normal text-xs">/{entry.total_perguntas}</span>
                </span>

                {/* Tempo */}
                <span className="text-xs text-brand-secondary flex-shrink-0 w-14 text-right">
                  {formatTime(entry.tempo_total_segundos)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
