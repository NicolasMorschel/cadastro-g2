import { isSupabaseConfigured, supabase } from '../supabaseClient';

function checkSupabaseConfig() {
  if (!isSupabaseConfigured) {
    throw new Error('Configure as variaveis do Supabase no arquivo .env.');
  }
}

function onlyNumbers(value) {
  return value.replace(/\D/g, '');
}

async function checkDuplicateEmail(email) {
  const { data, error } = await supabase
    .from('curriculos')
    .select('id, email');

  if (error) {
    throw error;
  }

  const hasDuplicate = data.some((curriculo) => (
    curriculo.email.toLowerCase() === email.toLowerCase()
  ));

  if (hasDuplicate) {
    throw new Error('Ja existe um curriculo com esse e-mail.');
  }
}

async function checkDuplicatePhone(phone) {
  if (!phone) {
    return;
  }

  const phoneNumbers = onlyNumbers(phone);
  const { data, error } = await supabase
    .from('curriculos')
    .select('id, telefone')
    .not('telefone', 'is', null);

  if (error) {
    throw error;
  }

  const hasDuplicate = data.some((curriculo) => (
    onlyNumbers(curriculo.telefone || '') === phoneNumbers
  ));

  if (hasDuplicate) {
    throw new Error('Ja existe um curriculo com esse telefone.');
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
  await checkDuplicateEmail(curriculo.email);
  await checkDuplicatePhone(curriculo.telefone);

  const { error } = await supabase.from('curriculos').insert({
    nome: curriculo.nome,
    telefone: curriculo.telefone ? onlyNumbers(curriculo.telefone) : null,
    email: curriculo.email,
    endereco_web: curriculo.endereco_web || null,
    experiencia: curriculo.experiencia,
  });

  if (error) {
    throw error;
  }
}
