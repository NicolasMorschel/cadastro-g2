import React from 'react';

export function CurriculoList({ curriculos, loading, onDetails }) {
  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
        <div className="min-w-0">
          <h2 className="h4 mb-0">Curriculos cadastrados</h2>
        </div>

        <span className="badge rounded-pill text-bg-primary align-self-start align-self-md-center px-3 py-2">
          {curriculos.length} registro(s)
        </span>
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-secondary">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Carregando...</span>
        </div>
      )}

      {!loading && curriculos.length === 0 && (
        <div className="text-center bg-body-tertiary border rounded-3 p-4 p-md-5">
          <p className="fs-5 fw-semibold mb-1">Nenhum curriculo cadastrado.</p>
          <p className="text-secondary mb-0">Use o botao "Novo cadastro" para adicionar o primeiro registro.</p>
        </div>
      )}

      {!loading && curriculos.length > 0 && (
        <div className="table-responsive border rounded-3 shadow-sm">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th className="text-end">Acao</th>
              </tr>
            </thead>
            <tbody>
              {curriculos.map((curriculo) => (
                <tr key={curriculo.id}>
                  <td className="fw-semibold text-break">{curriculo.nome}</td>
                  <td className="text-break">{curriculo.email}</td>
                  <td className="text-end">
                    <button type="button" className="btn btn-outline-primary btn-sm text-nowrap" onClick={() => onDetails(curriculo)}>
                      Consultar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
