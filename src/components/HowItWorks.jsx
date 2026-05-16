import Header from './Header.jsx'

const SECTIONS = [
  {
    title: 'Por que este projeto existe?',
    content: 'Profissionais que precisam aprender ou capacitar equipes no uso do Claude Code não têm uma ferramenta de avaliação rápida e interativa. Este quiz nasceu para preencher essa lacuna — gamificando o aprendizado e tornando a validação de conhecimento objetiva e divertida.',
  },
  {
    title: 'Como funciona o quiz?',
    content: 'Cada partida tem 15 perguntas no formato Verdadeiro ou Falso sobre o Claude Code. As perguntas são distribuídas progressivamente conforme o nível escolhido — começando pelas mais básicas e avançando para as mais complexas.',
  },
  {
    title: 'Distribuição de perguntas por nível',
    table: [
      { nivel: 'Iniciante', iniciante: 7, intermediario: 5, avancado: 3 },
      { nivel: 'Intermediário', iniciante: 3, intermediario: 7, avancado: 5 },
      { nivel: 'Avançado', iniciante: 1, intermediario: 4, avancado: 10 },
    ],
  },
  {
    title: 'Timer e respostas',
    items: [
      'Cada pergunta tem 15 segundos para ser respondida.',
      'Se o tempo expirar sem resposta, conta como erro automático.',
      'Não é possível voltar para uma pergunta anterior.',
      'Após cada resposta, a explicação é sempre exibida — seja acerto ou erro.',
    ],
  },
  {
    title: 'Pontuação e classificação',
    items: [
      '1 ponto por acerto, 0 por erro ou timeout.',
      '0–40% → Iniciando a jornada',
      '41–70% → Em evolução',
      '71–90% → Avançado',
      '91–100% → Expert Claude Code',
    ],
  },
  {
    title: 'Salvar resultado',
    content: 'Ao final do quiz você pode informar um nickname e salvar seu resultado no ranking global. O salvamento é opcional — você pode jogar sem se identificar.',
  },
]

export default function HowItWorks({ onBack }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center px-4 pb-12">
      <Header />

      <div className="w-full max-w-2xl mt-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-text">Como Funciona</h2>
            <p className="text-brand-secondary text-sm">Regras, pontuação e o porquê do projeto</p>
          </div>
          <button
            onClick={onBack}
            className="text-sm text-brand-secondary hover:text-brand-primary transition-colors"
          >
            ← Voltar
          </button>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((section, i) => (
            <div key={i} className="bg-brand-card border border-brand-border rounded-2xl p-6">
              <h3 className="font-bold text-brand-text mb-3">{section.title}</h3>

              {section.content && (
                <p className="text-brand-secondary text-sm leading-relaxed">{section.content}</p>
              )}

              {section.items && (
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-brand-secondary">
                      <span className="text-brand-primary mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-brand-secondary">
                    <thead>
                      <tr className="border-b border-brand-border">
                        <th className="text-left py-2 font-semibold text-brand-text">Nível escolhido</th>
                        <th className="text-center py-2">Iniciante</th>
                        <th className="text-center py-2">Intermediário</th>
                        <th className="text-center py-2">Avançado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, j) => (
                        <tr key={j} className={j !== section.table.length - 1 ? 'border-b border-brand-border' : ''}>
                          <td className="py-2.5 font-medium text-brand-text">{row.nivel}</td>
                          <td className="text-center py-2.5">{row.iniciante}</td>
                          <td className="text-center py-2.5">{row.intermediario}</td>
                          <td className="text-center py-2.5">{row.avancado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onBack}
          className="mt-6 w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
        >
          Começar Quiz
        </button>
      </div>
    </div>
  )
}
