import React from 'react';

export function CurriculoDetails({ curriculo }) {
  return (
    <section>
      <h2>Consulta do curriculo</h2>

      <dl>
        <dt>Nome</dt>
        <dd>{curriculo.nome}</dd>

        <dt>Telefone</dt>
        <dd>{curriculo.telefone || 'Nao informado'}</dd>

        <dt>E-mail</dt>
        <dd>{curriculo.email}</dd>

        <dt>Endereco WEB</dt>
        <dd>
          {curriculo.endereco_web ? (
            <a href={curriculo.endereco_web} target="_blank" rel="noreferrer noopener">
              {curriculo.endereco_web}
            </a>
          ) : (
            'Nao informado'
          )}
        </dd>

        <dt>Experiencia profissional</dt>
        <dd>{curriculo.experiencia}</dd>
      </dl>
    </section>
  );
}
