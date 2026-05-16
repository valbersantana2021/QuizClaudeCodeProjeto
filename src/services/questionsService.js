import { supabase } from '../lib/supabase.js'
import { questions as localQuestions } from '../data/questions.js'

const DISTRIBUTION = {
  iniciante:    { iniciante: 7, intermediario: 5, avancado: 3 },
  intermediario: { iniciante: 3, intermediario: 7, avancado: 5 },
  avancado:     { iniciante: 1, intermediario: 4, avancado: 10 },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickN(pool, n) {
  return shuffle(pool).slice(0, n)
}

export function selectQuestions(allQuestions, nivelEntrada) {
  const dist = DISTRIBUTION[nivelEntrada]
  const byLevel = {
    iniciante:    allQuestions.filter(q => q.nivel === 'iniciante'),
    intermediario: allQuestions.filter(q => q.nivel === 'intermediario'),
    avancado:     allQuestions.filter(q => q.nivel === 'avancado'),
  }
  return [
    ...pickN(byLevel.iniciante,    dist.iniciante),
    ...pickN(byLevel.intermediario, dist.intermediario),
    ...pickN(byLevel.avancado,     dist.avancado),
  ]
}

export async function fetchQuestions() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('id, nivel, afirmacao, resposta, explicacao, tags')
      .eq('ativo', true)

    if (error || !data || data.length < 15) throw new Error('fallback')
    return data
  } catch {
    return localQuestions
  }
}
