const LEVELS = [
  {
    id: 'iniciante',
    label: 'Iniciante',
    description: 'Conceitos básicos, instalação, casos de uso e modelos disponíveis.',
    dist: '7 básicas · 5 médias · 3 avançadas',
    color: 'border-green-300 hover:border-green-500',
    badge: 'bg-green-100 text-green-800',
  },
  {
    id: 'intermediario',
    label: 'Intermediário',
    description: 'Comandos slash, CLAUDE.md, permissões, Git e uso diário de dev.',
    dist: '3 básicas · 7 médias · 5 avançadas',
    color: 'border-yellow-300 hover:border-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 'avancado',
    label: 'Avançado',
    description: 'MCP Servers, Hooks, Agent SDK, worktrees e API Anthropic.',
    dist: '1 básica · 4 médias · 10 avançadas',
    color: 'border-red-300 hover:border-red-500',
    badge: 'bg-red-100 text-red-800',
  },
]

import Header from './Header.jsx'

export default function LevelSelect({ onSelect }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-4 py-12">
      <Header />
      <h2 className="text-3xl font-bold text-brand-text mb-2 text-center">Escolha o Nível</h2>
      <p className="text-brand-secondary mb-10 text-center">15 perguntas · 15s por pergunta</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {LEVELS.map(level => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className={`bg-brand-card border-2 ${level.color} rounded-2xl p-6 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[48px]`}
          >
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${level.badge}`}>
              {level.label}
            </span>
            <p className="text-brand-secondary text-sm mb-4">{level.description}</p>
            <p className="text-xs text-brand-secondary/70 font-mono">{level.dist}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
