const validationMessages = [
  'Informe o nome.',
  'Informe um nome valido.',
  'Informe o e-mail.',
  'Informe um e-mail valido.',
  'Informe um telefone valido.',
  'Informe a experiencia profissional.',
  'Informe um endereco WEB valido com http:// ou https://.',
  'Ja existe um curriculo com esse e-mail.',
  'Ja existe um curriculo com esse telefone.',
];

export function getLoadErrorMessage() {
  return 'Nao foi possivel carregar os curriculos.';
}

export function getSaveErrorMessage(error) {
  if (validationMessages.includes(error?.message)) {
    return error.message;
  }

  if (error?.code === '23505') {
    const errorText = `${error.message || ''} ${error.details || ''}`.toLowerCase();

    if (errorText.includes('curriculos_email_unico_idx')) {
      return 'Ja existe um curriculo com esse e-mail.';
    }

    if (errorText.includes('curriculos_telefone_unico_idx')) {
      return 'Ja existe um curriculo com esse telefone.';
    }

    return 'Ja existe um curriculo com esses dados.';
  }

  return 'Nao foi possivel salvar o cadastro.';
}
