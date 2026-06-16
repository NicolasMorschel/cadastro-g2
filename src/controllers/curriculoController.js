import { normalizeCurriculo } from '../models/curriculoModel';
import { getCurriculos, insertCurriculo } from '../services/curriculoService';
import {
  hasNoHtmlTags,
  isSafeWebAddress,
  isValidEmail,
  isValidName,
  isValidPhone,
} from '../utils/validators';

export async function listCurriculos() {
  return getCurriculos();
}

export function validateCurriculo(form) {
  const curriculo = normalizeCurriculo(form);

  if (!curriculo.nome) {
    return 'Informe o nome.';
  }

  if (!isValidName(curriculo.nome)) {
    return 'Informe um nome valido.';
  }

  if (!curriculo.email) {
    return 'Informe o e-mail.';
  }

  if (!isValidEmail(curriculo.email)) {
    return 'Informe um e-mail valido.';
  }

  if (!isValidPhone(curriculo.telefone)) {
    return 'Informe um telefone valido.';
  }

  if (!curriculo.experiencia) {
    return 'Informe a experiencia profissional.';
  }

  if (!hasNoHtmlTags(curriculo.experiencia)) {
    return 'A experiencia profissional nao pode conter tags HTML.';
  }

  if (!isSafeWebAddress(curriculo.endereco_web)) {
    return 'Informe um endereco WEB valido com http:// ou https://.';
  }

  return '';
}

export async function saveCurriculo(form) {
  const validationError = validateCurriculo(form);

  if (validationError) {
    throw new Error(validationError);
  }

  const curriculo = normalizeCurriculo(form);
  await insertCurriculo(curriculo);
}
