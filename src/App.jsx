import React, { useState, useEffect } from 'react';

import './App.css';

import OperatorInfo from './components/OperatorInfo';
import EvaluationTable from './components/EvaluationTable';
import Summary from './components/Summary';

import { auth, db, signInAnonymously } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';


function App() {
  const [operator, setOperator] = useState({
    name: '',
    date: '',
    calls: '',
  });

  const [tableData, setTableData] = useState([
    { category: '1 - Condução', criteria: 'Falta de atenção', penalty: -3, count: 0 },
    { category: '2 - Voz', criteria: 'Dicção', penalty: -2, count: 0 },
    { category: '3 - Técnica', criteria: 'Dados incompletos', penalty: -4, count: 0 },
  ]);

  const [message, setMessage] = useState('');
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    signInAnonymously(auth).catch(error => {
      console.error('Erro ao autenticar:', error);
      setMessage('Erro na autenticação do Firebase.');
    });
  }, []);

  async function saveEvaluation() {
    if (!operator.name || !operator.date) {
      setMessage('Preencha nome do operador e data da auditoria.');
      return;
    }

    try {
      await addDoc(collection(db, 'evaluations'), {
        operator,
        tableData,
        timestamp: new Date(),
      });
      setMessage('Avaliação salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      setMessage('Erro ao salvar avaliação.');
    }
  }

  async function loadEvaluations() {
    try {
      const querySnapshot = await getDocs(collection(db, 'evaluations'));
      const results = [];
      querySnapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setEvaluations(results);
      setMessage('Avaliações carregadas com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      setMessage('Erro ao buscar avaliações.');
    }
  }

  function handlePrint() {
    window.print();
  }

  // Função para adicionar novo critério na tabela
  function addCriteria() {
    const newCriteria = {
      category: '4 - Atendimento',
      criteria: 'Empatia',
      penalty: -1,
      count: 0,
    };
    setTableData(prevData => [...prevData, newCriteria]);
    setMessage('Novo critério adicionado!');
  }

  return (
    <div className="container">
      <header>
        <h1>📊 Auditoria de Desempenho com Firebase</h1>
      </header>

      <OperatorInfo operator={operator} setOperator={setOperator} />
      <EvaluationTable tableData={tableData} setTableData={setTableData} />
      <Summary tableData={tableData} />

      <button onClick={saveEvaluation}>Salvar Avaliação</button>
      <button onClick={loadEvaluations}>Buscar Avaliações</button>
      <button onClick={handlePrint}>🖨️ Imprimir Relatório</button>
      <button onClick={addCriteria}>Adicionar Novo Critério</button>

      {message && <p>{message}</p>}

      {evaluations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Avaliações Carregadas:</h2>
          {evaluations.map(ev => (
            <div
              key={ev.id}
              style={{
                marginBottom: '15px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Operador:</strong> {ev.operator?.name || '—'}</p>
              <p><strong>Data:</strong> {ev.operator?.date || '—'}</p>
              <p><strong>Total de chamadas:</strong> {ev.operator?.calls || '—'}</p>
              <p><strong>Detalhes da avaliação:</strong></p>
              <ul>
                {ev.tableData && ev.tableData.map((item, idx) => (
                  <li key={idx}>
                    Categoria: {item.category} — Critério: {item.criteria} — Penalidade: {item.penalty} — Contagem: {item.count}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
