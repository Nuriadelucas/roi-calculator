function fmt(n) {
  const sign = n < 0 ? '-' : '';
  return sign + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
}

function MonthlyTable({ data, paybackPeriod, label, color }) {
  return (
    <div className="table-card" style={color ? { borderTop: `3px solid ${color}` } : {}}>
      {label && <div className="scenario-badge" style={{ color }}>{label}</div>}
      <h2 className="card-title">Monthly Breakdown</h2>
      <div className="table-scroll">
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Costs</th>
              <th>Net Profit</th>
              <th>Cumulative Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const isBreakEven = paybackPeriod !== null && row.month === paybackPeriod;
              return (
                <tr
                  key={row.month}
                  className={
                    isBreakEven ? 'row-breakeven' : i % 2 === 0 ? 'row-even' : 'row-odd'
                  }
                >
                  <td>{row.month}</td>
                  <td>{fmt(row.revenue)}</td>
                  <td>{fmt(row.costs)}</td>
                  <td className={row.netProfit >= 0 ? 'positive' : 'negative'}>
                    {fmt(row.netProfit)}
                  </td>
                  <td className={row.cashFlow >= 0 ? 'positive' : 'negative'}>
                    {fmt(row.cashFlow)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyTable;
