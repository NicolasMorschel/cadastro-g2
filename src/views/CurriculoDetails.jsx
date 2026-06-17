import React from 'react';
import { formatPhone } from '../utils/formatters';

export function CurriculoDetails({ curriculo }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="h4 mb-0">Consulta do curriculo</h2>
      </div>

      <dl className="row bg-body-tertiary border rounded-3 p-3 p-md-4 mb-0">
        <dt className="col-sm-4 col-lg-3 text-secondary mb-1 mb-sm-3">Nome</dt>
        <dd className="col-sm-8 col-lg-9 fw-semibold text-break mb-3">{curriculo.nome}</dd>

        <dt className="col-sm-4 col-lg-3 text-secondary mb-1 mb-sm-3">Telefone</dt>
        <dd className="col-sm-8 col-lg-9 text-break mb-3">
          {curriculo.telefone ? formatPhone(curriculo.telefone) : 'Nao informado'}
        </dd>

        <dt className="col-sm-4 col-lg-3 text-secondary mb-1 mb-sm-3">E-mail</dt>
        <dd className="col-sm-8 col-lg-9 text-break mb-3">{curriculo.email}</dd>

        <dt className="col-sm-4 col-lg-3 text-secondary mb-1 mb-sm-3">Endereco WEB</dt>
        <dd className="col-sm-8 col-lg-9 text-break mb-3">
          {curriculo.endereco_web ? (
            <a className="link-primary link-offset-2" href={curriculo.endereco_web} target="_blank" rel="noreferrer noopener">
              {curriculo.endereco_web}
            </a>
          ) : (
            'Nao informado'
          )}
        </dd>

        <dt className="col-sm-4 col-lg-3 text-secondary mb-1">Experiencia profissional</dt>
        <dd className="col-sm-8 col-lg-9 text-break mb-0">{curriculo.experiencia}</dd>
      </dl>
    </section>
  );
}
