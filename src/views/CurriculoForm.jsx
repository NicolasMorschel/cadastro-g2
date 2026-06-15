import React from 'react';

export function CurriculoForm({ form, onChange, onSubmit }) {
  return (
    <section>
      <h2 className="mb-3">Novo curriculo</h2>

      <form className="col-12 col-md-6" onSubmit={onSubmit}>
        <label className="form-label w-100">
          Nome *
          <input className="form-control" name="nome" value={form.nome} onChange={onChange} maxLength="120" required />
        </label>

        <label className="form-label w-100">
          Telefone
          <input className="form-control" name="telefone" value={form.telefone} onChange={onChange} maxLength="30" />
        </label>

        <label className="form-label w-100">
          E-mail *
          <input className="form-control" name="email" type="email" value={form.email} onChange={onChange} maxLength="160" required />
        </label>

        <label className="form-label w-100">
          Endereco WEB
          <input className="form-control" name="endereco_web" value={form.endereco_web} onChange={onChange} maxLength="200" placeholder="https://exemplo.com" />
        </label>

        <label className="form-label w-100">
          Experiencia profissional *
          <textarea className="form-control" rows="5" name="experiencia" value={form.experiencia} onChange={onChange} maxLength="2000" required />
        </label>

        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </section>
  );
}
