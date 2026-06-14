const validationMessages = [
  'Informe o nome.',
  'Informe o e-mail.',
  'Informe um e-mail valido.',
  'Informe um telefone valido.',
  'Informe a experiencia profissional.',
  'O endereco WEB precisa comecar com http:// ou https://.',
];

export function getLoadErrorMessage() {
  return 'Nao foi possivel carregar os curriculos.';
}

export function getSaveErrorMessage(error) {
  if (validationMessages.includes(error?.message)) {
    return error.message;
  }

  return 'Nao foi possivel salvar o cadastro.';
}
