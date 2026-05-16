import { supabase } from '../lib/supabase.js'

export async function fetchRanking() {
  const { data, error } = await supabase
    .from('quiz_sessions')
    .select('nickname, nivel_entrada, pontuacao, total_perguntas, tempo_total_segundos, created_at')
    .order('pontuacao', { ascending: false })
    .order('tempo_total_segundos', { ascending: true })
    .limit(50)

  if (error) return []
  return data
}
