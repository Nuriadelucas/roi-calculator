function fmt(n) {
  const sign = n < 0 ? '-' : '';
  return sign + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
}

function Results({ roiPercent, paybackPeriod, totalNetProfit, monthlyNetProfit }) {
  return (
    <div className="results-card">
      <h2 className="card-title">Results</h2>
      <div className="metrics-grid">
        <div className="metric">
          <span className="metric-label">ROI</span>
          <span className={`metric-value ${roiPercent >= 0 ? 'positive' : 'negative'}`}>
            {roiPercent.toFixed(1)}%
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">Payback Period</span>
          <span className="metric-value">
            {paybackPeriod === null ? 'Never' : `${paybackPeriod} mo.`}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">Total Net Profit</span>
          <span className={`metric-value ${totalNetProfit >= 0 ? 'positive' : 'negative'}`}>
            {fmt(totalNetProfit)}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">Monthly Net Profit</span>
          <span className={`metric-value ${monthlyNetProfit >= 0 ? 'positive' : 'negative'}`}>
            {fmt(monthlyNetProfit)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Results;
