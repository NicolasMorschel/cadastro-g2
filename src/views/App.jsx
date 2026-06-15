import React, { useEffect, useState } from 'react';
import { emptyCurriculo } from '../models/curriculoModel';
import {
  listCurriculos,
  saveCurriculo,
} from '../controllers/curriculoController';
import { getLoadErrorMessage, getSaveErrorMessage } from '../utils/errorMessages';
import { CurriculoDetails } from './CurriculoDetails.jsx';
import { CurriculoForm } from './CurriculoForm.jsx';
import { CurriculoList } from './CurriculoList.jsx';

export function App() {
  const [screen, setScreen] = useState('list');
  const [form, setForm] = useState(emptyCurriculo);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [curriculos, setCurriculos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurriculos();
  }, []);

  async function loadCurriculos() {
    setLoading(true);

    try {
      setCurriculos(await listCurriculos());
    } catch {
      setMessage(getLoadErrorMessage());
    }

    setLoading(false);
  }

  function goToList() {
    setScreen('list');
    setMessage('');
  }

  function goToForm() {
    setScreen('form');
    setMessage('');
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function openDetails(curriculo) {
    setSelected(curriculo);
    setMessage('');
    setScreen('details');
  }

  async function submitForm(event) {
    event.preventDefault();

    try {
      await saveCurriculo(form);
      setForm(emptyCurriculo);
      setMessage('Cadastro salvo com sucesso.');
      await loadCurriculos();
      setScreen('list');
    } catch (error) {
      setMessage(getSaveErrorMessage(error));
    }
  }

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">Cadastro de Curriculos</h1>
        <nav className="d-flex gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={goToList}>Listagem</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={goToForm}>Novo cadastro</button>
        </nav>
      </header>

      {message && <p className="text-danger">{message}</p>}

      {screen === 'list' && (
        <CurriculoList
          curriculos={curriculos}
          loading={loading}
          onDetails={openDetails}
        />
      )}

      {screen === 'form' && (
        <CurriculoForm
          form={form}
          onChange={updateField}
          onSubmit={submitForm}
        />
      )}

      {screen === 'details' && selected && (
        <CurriculoDetails curriculo={selected} />
      )}
    </main>
  );
}
