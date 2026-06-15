import React from 'react';

export function CurriculoList({ curriculos, loading, onDetails }) {
  return (
    <section>
      <h2 className="mb-3">Curriculos cadastrados</h2>

      {loading && <p>Carregando...</p>}

      {!loading && curriculos.length === 0 && (
        <p>Nenhum curriculo cadastrado.</p>
      )}

      {!loading && curriculos.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Acao</th>
            </tr>
          </thead>
          <tbody>
            {curriculos.map((curriculo) => (
              <tr key={curriculo.id}>
                <td>{curriculo.nome}</td>
                <td>{curriculo.email}</td>
                <td>
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => onDetails(curriculo)}>
                    Consultar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
