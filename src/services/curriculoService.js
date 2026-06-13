import { isSupabaseConfigured, supabase } from '../supabaseClient';

function checkSupabaseConfig() {
  if (!isSupabaseConfigured) {
    throw new Error('Configure as variaveis do Supabase no arquivo .env.');
  }
}

export async function getCurriculos() {
  checkSupabaseConfig();

  const { data, error } = await supabase
    .from('curriculos')
    .select('id, nome, email, telefone, endereco_web, experiencia, criado_em')
    .order('criado_em', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function insertCurriculo(curriculo) {
  checkSupabaseConfig();

  const { error } = await supabase.from('curriculos').insert({
    nome: curriculo.nome,
    telefone: curriculo.telefone || null,
    email: curriculo.email,
    endereco_web: curriculo.endereco_web || null,
    experiencia: curriculo.experiencia,
  });

  if (error) {
    throw error;
  }
}
