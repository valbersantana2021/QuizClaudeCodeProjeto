import { supabase } from '../lib/supabase.js'

export async function saveSession({ nivelEntrada, pontuacao, tempoTotal, nickname, answers }) {
  try {
    const sessionToken = crypto.randomUUID()
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert({
        session_token: sessionToken,
        nickname: nickname?.trim() || 'Anônimo',
        nivel_entrada: nivelEntrada,
        pontuacao,
        total_perguntas: answers.length,
        tempo_total_segundos: tempoTotal,
      })
      .select('id')
      .single()

    if (sessionError) throw sessionError

    const answersPayload = answers.map(a => ({
      session_id: session.id,
      question_id: a.questionId,
      resposta_usuario: a.respostaUsuario,
      correto: a.correto,
      tempo_resposta_segundos: a.tempoResposta,
    }))

    const { error: answersError } = await supabase
      .from('quiz_answers')
      .insert(answersPayload)

    if (answersError) throw answersError
    return { success: true }
  } catch {
    // Falha silenciosa — não bloqueia o usuário
    return { success: false }
  }
}
