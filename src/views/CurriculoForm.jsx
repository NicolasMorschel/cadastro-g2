import React from 'react';

export function CurriculoForm({ form, onChange, onSubmit }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="h4 mb-0">Novo curriculo</h2>
      </div>

      <form className="row g-3 g-md-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="nome">Nome *</label>
          <input id="nome" className="form-control form-control-lg" name="nome" value={form.nome} onChange={onChange} maxLength="120" required />
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="telefone">Telefone</label>
          <input id="telefone" className="form-control form-control-lg" name="telefone" value={form.telefone} onChange={onChange} maxLength="30" placeholder="(51) 99999-9999" inputMode="tel" />
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="email">E-mail *</label>
          <input id="email" className="form-control form-control-lg" name="email" type="email" value={form.email} onChange={onChange} maxLength="160" inputMode="email" required />
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="endereco_web">Endereco WEB</label>
          <input id="endereco_web" className="form-control form-control-lg" name="endereco_web" value={form.endereco_web} onChange={onChange} maxLength="200" placeholder="https://exemplo.com" />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold" htmlFor="experiencia">Experiencia profissional *</label>
          <textarea id="experiencia" className="form-control" rows="6" name="experiencia" value={form.experiencia} onChange={onChange} maxLength="2000" required />
        </div>

        <div className="col-12 d-grid d-sm-flex justify-content-sm-end pt-2">
          <button type="submit" className="btn btn-primary btn-lg px-4">Salvar</button>
        </div>
      </form>
    </section>
  );
}
