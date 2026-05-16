import { useState } from 'react'

const NIVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

function classify(pct) {
  if (pct <= 40) return { label: 'Iniciando a jornada', color: 'bg-gray-100 text-gray-700' }
  if (pct <= 70) return { label: 'Em evolução', color: 'bg-yellow-100 text-yellow-800' }
  if (pct <= 90) return { label: 'Avançado', color: 'bg-blue-100 text-blue-800' }
  return { label: 'Expert Claude Code', color: 'bg-brand-primary text-white' }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function ResultScreen({ answers, nivelEntrada, totalTime, saving, saved, onSave, onRetry, onChangeLevel }) {
  const [nickname, setNickname] = useState('')

  const correct = answers.filter(a => a.correto).length
  const total = answers.length
  const pct = Math.round((correct / total) * 100)
  const { label, color } = classify(pct)

  function handleShare() {
    const text = `Fiz o Quiz Claude Code (nível ${NIVEL_LABELS[nivelEntrada]}) e acertei ${correct}/${total}! Você consegue mais?`
    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      alert('Resultado copiado para a área de transferência!')
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Score */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-8 text-center mb-6">
          <p className="text-brand-secondary text-sm font-medium mb-2">Resultado final</p>
          <p className="text-6xl font-bold text-brand-text mb-1">
            {correct}<span className="text-brand-secondary text-4xl">/{total}</span>
          </p>
          <p className="text-brand-secondary text-lg mb-4">{pct}% de aproveitamento</p>
          <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full ${color}`}>
            {label}
          </span>
          <div className="w-full bg-brand-border rounded-full h-2.5 mt-6">
            <div
              className="bg-brand-primary h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-brand-secondary text-sm mt-3">
            Tempo total: <span className="font-semibold text-brand-text">{formatTime(totalTime)}</span>
          </p>
        </div>

        {/* Nickname + Save */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-brand-text mb-2">
            Seu nome ou apelido (opcional)
          </label>
          <input
            type="text"
            maxLength={30}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Ex: Valber"
            disabled={saved}
            className="w-full border border-brand-border rounded-lg px-4 py-2.5 text-brand-text placeholder-brand-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50 mb-3"
          />
          {saved ? (
            <p className="text-brand-success font-semibold text-center">Resultado salvo!</p>
          ) : (
            <button
              onClick={() => onSave(nickname)}
              disabled={saving}
              className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
            >
              {saving ? 'Salvando…' : 'Salvar resultado'}
            </button>
          )}
        </div>

        {/* Breakdown */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-brand-text mb-4">Detalhamento das respostas</h3>
          <div className="space-y-2">
            {answers.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-0.5 text-lg flex-shrink-0 ${a.correto ? 'text-brand-success' : 'text-brand-error'}`}>
                  {a.correto ? '✓' : '✗'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                  a.nivel === 'iniciante' ? 'bg-green-100 text-green-800' :
                  a.nivel === 'intermediario' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {NIVEL_LABELS[a.nivel]}
                </span>
                <p className="text-sm text-brand-secondary leading-snug">{a.afirmacao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
          >
            Tentar novamente
          </button>
          <button
            onClick={onChangeLevel}
            className="flex-1 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
          >
            Mudar nível
          </button>
          <button
            onClick={handleShare}
            className="flex-1 border-2 border-brand-border text-brand-secondary hover:border-brand-primary hover:text-brand-primary font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
          >
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  )
}
