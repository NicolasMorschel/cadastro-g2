import React from 'react';

export function CurriculoForm({ form, onChange, onSubmit }) {
  return (
    <section>
      <h2>Novo curriculo</h2>

      <form onSubmit={onSubmit}>
        <label>
          Nome *
          <input name="nome" value={form.nome} onChange={onChange} maxLength="120" required />
        </label>

        <label>
          Telefone
          <input name="telefone" value={form.telefone} onChange={onChange} maxLength="30" />
        </label>

        <label>
          E-mail *
          <input name="email" type="email" value={form.email} onChange={onChange} maxLength="160" required />
        </label>

        <label>
          Endereco WEB
          <input name="endereco_web" value={form.endereco_web} onChange={onChange} maxLength="200" placeholder="https://exemplo.com" />
        </label>

        <label>
          Experiencia profissional *
          <textarea name="experiencia" value={form.experiencia} onChange={onChange} maxLength="2000" required />
        </label>

        <button type="submit">Salvar</button>
      </form>
    </section>
  );
}
