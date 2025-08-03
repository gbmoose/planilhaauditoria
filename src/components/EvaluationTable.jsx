import React from 'react';

function EvaluationTable({ tableData, setTableData }) {
  const handleChange = (index, value) => {
    const updated = [...tableData];
    updated[index].count = Number(value);
    setTableData(updated);
  };

  return (
    <section className="table-section">
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Critério</th>
            <th>Penalidade</th>
            <th>Ocorrências</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i}>
              <td>{row.category}</td>
              <td>{row.criteria}</td>
              <td>{row.penalty}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={row.count}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EvaluationTable;
