import React, { useState, useEffect } from 'react';

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

  // Autenticação anônima no Firebase
  useEffect(() => {
    signInAnonymously(auth).catch(error => {
      console.error('Erro ao autenticar:', error);
      setMessage('Erro na autenticação do Firebase.');
    });
  }, []);

  // Função para salvar avaliação
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

  // Função para buscar avaliações (aqui você pode criar botão ou usar useEffect para buscar ao carregar)
  async function loadEvaluations() {
    try {
      const querySnapshot = await getDocs(collection(db, 'evaluations'));
      querySnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
      setMessage('Avaliações carregadas no console.');
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      setMessage('Erro ao buscar avaliações.');
    }
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
      <button onClick={loadEvaluations}>Buscar Avaliações (Console)</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
