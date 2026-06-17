import React from 'react';

export function CurriculoForm({ form, onChange, onSubmit, onClear, saving }) {
  const maxExperienceLength = 2000;

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
          <input id="endereco_web" className="form-control form-control-lg" name="endereco_web" value={form.endereco_web} onChange={onChange} maxLength="200" />
        </div>

        <div className="col-12">
          <div className="d-flex justify-content-between gap-3">
            <label className="form-label fw-semibold" htmlFor="experiencia">Experiencia profissional *</label>
            <span className="small text-secondary">
              {form.experiencia.length}/{maxExperienceLength}
            </span>
          </div>
          <textarea id="experiencia" className="form-control" rows="6" name="experiencia" value={form.experiencia} onChange={onChange} maxLength={maxExperienceLength} required />
        </div>

        <div className="col-12 d-grid d-sm-flex justify-content-sm-end gap-2 pt-2">
          <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={onClear} disabled={saving}>
            Limpar
          </button>
          <button type="submit" className="btn btn-primary btn-lg px-4" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </section>
  );
}
