import React, { useEffect, useState } from 'react';
import { emptyCurriculo } from '../models/curriculoModel';
import {
  listCurriculos,
  saveCurriculo,
} from '../controllers/curriculoController';
import { getLoadErrorMessage, getSaveErrorMessage } from '../utils/errorMessages';
import { filterPhoneInput } from '../utils/validators';
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
    const nextValue = name === 'telefone' ? filterPhoneInput(value) : value;

    setForm((current) => ({ ...current, [name]: nextValue }));
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

  const messageClass = message === 'Cadastro salvo com sucesso.'
    ? 'alert alert-success'
    : 'alert alert-danger';

  return (
    <main className="min-vh-100 bg-body-tertiary">
      <div className="container-fluid container-lg py-4 py-md-5">
        <header className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3 bg-white border rounded-3 shadow-sm p-3 p-md-4 mb-4">
          <div className="min-w-0">
            <h1 className="display-6 fw-semibold mb-0">Cadastro de Curriculos</h1>
          </div>

          <nav className="d-grid d-sm-flex gap-2">
            <button
              type="button"
              className={`btn ${screen === 'list' ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={goToList}
            >
              Listagem
            </button>
            <button
              type="button"
              className={`btn ${screen === 'form' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={goToForm}
            >
              Novo cadastro
            </button>
          </nav>
        </header>

        {message && <div className={`${messageClass} mb-4`}>{message}</div>}

        <div className="bg-white border rounded-3 shadow p-3 p-sm-4 p-lg-5">
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
        </div>
      </div>
    </main>
  );
}
