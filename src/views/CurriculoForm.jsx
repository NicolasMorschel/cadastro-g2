import React, { useEffect, useRef, useState } from 'react';
import {
  hasNoHtmlTags,
  isSafeWebAddress,
  isValidEmail,
  isValidName,
  isValidPhone,
} from '../utils/validators';

export function CurriculoForm({ form, onChange, onSubmit, onClear, saving }) {
  const maxExperienceLength = 2000;
  const nameInputRef = useRef(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [focusedFields, setFocusedFields] = useState({});
  const isFormEmpty = Object.values(form).every((value) => !value.trim());
  const nameInvalid = touchedFields.nome && !focusedFields.nome && Boolean(form.nome) && !isValidName(form.nome);
  const phoneInvalid = touchedFields.telefone && !focusedFields.telefone && Boolean(form.telefone) && !isValidPhone(form.telefone);
  const emailInvalid = touchedFields.email && !focusedFields.email && Boolean(form.email) && !isValidEmail(form.email);
  const webAddressInvalid = touchedFields.endereco_web && !focusedFields.endereco_web && Boolean(form.endereco_web) && !isSafeWebAddress(form.endereco_web);
  const experienceInvalid = touchedFields.experiencia && !focusedFields.experiencia && Boolean(form.experiencia) && !hasNoHtmlTags(form.experiencia);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  function markFieldAsFocused(event) {
    const { name } = event.target;

    setFocusedFields((current) => ({ ...current, [name]: true }));
  }

  function markFieldAsTouched(event) {
    const { name } = event.target;

    setFocusedFields((current) => ({ ...current, [name]: false }));
    setTouchedFields((current) => ({ ...current, [name]: true }));
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="h4 mb-0">Novo curriculo</h2>
      </div>

      <form className="row g-3 g-md-4" onSubmit={onSubmit}>
        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="nome">Nome *</label>
          <input ref={nameInputRef} id="nome" className={`form-control form-control-lg ${nameInvalid ? 'is-invalid' : ''}`} name="nome" value={form.nome} onChange={onChange} onFocus={markFieldAsFocused} onBlur={markFieldAsTouched} maxLength="120" autoComplete="name" required />
          {nameInvalid && <div className="invalid-feedback">Informe um nome valido.</div>}
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="telefone">Telefone</label>
          <input id="telefone" className={`form-control form-control-lg ${phoneInvalid ? 'is-invalid' : ''}`} name="telefone" value={form.telefone} onChange={onChange} onFocus={markFieldAsFocused} onBlur={markFieldAsTouched} maxLength="15" inputMode="numeric" autoComplete="tel" />
          {phoneInvalid && <div className="invalid-feedback">Informe um telefone valido.</div>}
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="email">E-mail *</label>
          <input id="email" className={`form-control form-control-lg ${emailInvalid ? 'is-invalid' : ''}`} name="email" type="email" value={form.email} onChange={onChange} onFocus={markFieldAsFocused} onBlur={markFieldAsTouched} maxLength="160" inputMode="email" autoComplete="email" required />
          {emailInvalid && <div className="invalid-feedback">Informe um e-mail valido.</div>}
        </div>

        <div className="col-12 col-lg-6">
          <label className="form-label fw-semibold" htmlFor="endereco_web">Endereco WEB</label>
          <input id="endereco_web" className={`form-control form-control-lg ${webAddressInvalid ? 'is-invalid' : ''}`} name="endereco_web" value={form.endereco_web} onChange={onChange} onFocus={markFieldAsFocused} onBlur={markFieldAsTouched} maxLength="200" autoComplete="url" />
          {webAddressInvalid && <div className="invalid-feedback">Informe uma URL valida com http:// ou https://.</div>}
        </div>

        <div className="col-12">
          <div className="d-flex justify-content-between gap-3">
            <label className="form-label fw-semibold" htmlFor="experiencia">Experiencia profissional *</label>
            <span className="small text-secondary">
              {form.experiencia.length}/{maxExperienceLength}
            </span>
          </div>
          <textarea id="experiencia" className={`form-control ${experienceInvalid ? 'is-invalid' : ''}`} rows="6" name="experiencia" value={form.experiencia} onChange={onChange} onFocus={markFieldAsFocused} onBlur={markFieldAsTouched} maxLength={maxExperienceLength} required />
          {experienceInvalid && <div className="invalid-feedback">A experiencia profissional nao pode conter tags HTML.</div>}
        </div>

        <div className="col-12 d-grid d-sm-flex justify-content-sm-end gap-2 pt-2">
          <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={onClear} disabled={saving || isFormEmpty}>
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
