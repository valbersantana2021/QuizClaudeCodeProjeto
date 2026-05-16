import logo from '../assets/logo.png'

export default function Home({ onStart, onRanking, onHowItWorks }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <img src={logo} alt="Quiz Claude Code" className="mx-auto mb-6 h-24 w-auto object-contain rounded-xl" />
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-text mb-4 leading-tight">
          Quiz Verdadeiro<br />ou Falso
        </h1>
        <p className="text-brand-secondary text-lg mb-10">
          Teste seus conhecimentos sobre o Claude Code em três níveis de dificuldade.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onStart}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors min-h-[48px] w-full"
          >
            Começar Quiz
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRanking}
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
            >
              Ver Ranking
            </button>
            <button
              onClick={onHowItWorks}
              className="border-2 border-brand-border text-brand-secondary hover:border-brand-primary hover:text-brand-primary font-semibold py-3 rounded-xl transition-colors min-h-[48px]"
            >
              Como Funciona
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
