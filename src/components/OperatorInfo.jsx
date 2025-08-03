import React from 'react';

function OperatorInfo({ operator, setOperator }) {
  return (
    <section className="info-section">
      <label>
        Nome do Operador:
        <input
          type="text"
          value={operator.name}
          onChange={(e) => setOperator({ ...operator, name: e.target.value })}
        />
      </label>

      <label>
        Data da Auditoria:
        <input
          type="date"
          value={operator.date}
          onChange={(e) => setOperator({ ...operator, date: e.target.value })}
        />
      </label>

      <label>
        Ligações Atendidas:
        <input
          type="number"
          min="0"
          value={operator.calls}
          onChange={(e) => setOperator({ ...operator, calls: e.target.value })}
        />
      </label>
    </section>
  );
}

export default OperatorInfo;
