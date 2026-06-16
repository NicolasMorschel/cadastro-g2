import React from 'react';
import { formatPhone } from '../utils/formatters';

export function CurriculoDetails({ curriculo }) {
  return (
    <section>
      <h2 className="mb-3">Consulta do curriculo</h2>

      <dl className="row">
        <dt className="col-sm-3">Nome</dt>
        <dd className="col-sm-9">{curriculo.nome}</dd>

        <dt className="col-sm-3">Telefone</dt>
        <dd className="col-sm-9">
          {curriculo.telefone ? formatPhone(curriculo.telefone) : 'Nao informado'}
        </dd>

        <dt className="col-sm-3">E-mail</dt>
        <dd className="col-sm-9">{curriculo.email}</dd>

        <dt className="col-sm-3">Endereco WEB</dt>
        <dd className="col-sm-9">
          {curriculo.endereco_web ? (
            <a href={curriculo.endereco_web} target="_blank" rel="noreferrer noopener">
              {curriculo.endereco_web}
            </a>
          ) : (
            'Nao informado'
          )}
        </dd>

        <dt className="col-sm-3">Experiencia profissional</dt>
        <dd className="col-sm-9">{curriculo.experiencia}</dd>
      </dl>
    </section>
  );
}
