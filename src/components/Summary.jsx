import React, { useMemo } from 'react';

function Summary({ tableData }) {
  const totalPenalties = useMemo(() => {
    return tableData.reduce((acc, row) => acc + (row.penalty * row.count), 0);
  }, [tableData]);

  const finalScore = 100 + totalPenalties;

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Resumo da Avaliação</h2>
      <p>Penalidades Totais: {totalPenalties}</p>
      <p>Pontuação Final: {finalScore}</p>
    </div>
  );
}

export default Summary;
