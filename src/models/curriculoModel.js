export const emptyCurriculo = {
  nome: '',
  telefone: '',
  email: '',
  endereco_web: '',
  experiencia: '',
};

export function normalizeCurriculo(form) {
  return {
    nome: form.nome.trim(),
    telefone: form.telefone.trim(),
    email: form.email.trim().toLowerCase(),
    endereco_web: form.endereco_web.trim(),
    experiencia: form.experiencia.trim(),
  };
}
