import { isSupabaseConfigured, supabase } from '../supabaseClient';
import { normalizeCurriculo } from '../models/curriculoModel';
import { isSafeWebAddress, isValidEmail } from '../utils/validators';

export async function listCurriculos() {
  if (!isSupabaseConfigured) {
    throw new Error('Configure as variaveis do Supabase no arquivo .env.');
  }

  const { data, error } = await supabase
    .from('curriculos')
    .select('id, nome, email, telefone, endereco_web, experiencia, criado_em')
    .order('criado_em', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export function validateCurriculo(form) {
  const curriculo = normalizeCurriculo(form);

  if (!curriculo.nome) {
    return 'Informe o nome.';
  }

  if (!curriculo.email) {
    return 'Informe o e-mail.';
  }

  if (!isValidEmail(curriculo.email)) {
    return 'Informe um e-mail valido.';
  }

  if (!curriculo.experiencia) {
    return 'Informe a experiencia profissional.';
  }

  if (!isSafeWebAddress(curriculo.endereco_web)) {
    return 'O endereco WEB precisa comecar com http:// ou https://.';
  }

  return '';
}

export async function saveCurriculo(form) {
  if (!isSupabaseConfigured) {
    throw new Error('Configure as variaveis do Supabase no arquivo .env.');
  }

  const validationError = validateCurriculo(form);

  if (validationError) {
    throw new Error(validationError);
  }

  const curriculo = normalizeCurriculo(form);
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
