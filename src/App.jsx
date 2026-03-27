import { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import CashFlowChart from './components/CashFlowChart';
import MonthlyTable from './components/MonthlyTable';
import { calculateROI } from './utils/calculations';

const DEFAULTS = {
  initialInvestment: 100000,
  monthlyRevenue: 15000,
  monthlyCosts: 5000,
  period: 12,
};

const SCENARIO_META = [
  { label: 'Scenario A', color: '#3399ff' },
  { label: 'Scenario B', color: '#ff7733' },
];

function fmt(n) {
  const sign = n < 0 ? '-' : '';
  return sign + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
}

function App() {
  const [scenarios, setScenarios] = useState([{ ...DEFAULTS }]);
  const [showTable, setShowTable] = useState(false);
  const [exportDate, setExportDate] = useState('');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.className = isDark ? '' : 'light';
  }, [isDark]);

  const comparing = scenarios.length > 1;

  function handleChange(index, field, value) {
    setScenarios(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  }

  function handleExport() {
    setExportDate(
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    );
    setTimeout(() => window.print(), 50);
  }

  const results = scenarios.map(s => calculateROI(s));

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="header-logo">EPAM</span>
          <h1 className="header-title">Business ROI Calculator</h1>
          <div className="header-actions">
            {!comparing ? (
              <button
                className="btn-scenario btn-add"
                onClick={() => setScenarios(prev => [...prev, { ...DEFAULTS }])}
              >
                + Add Scenario
              </button>
            ) : (
              <button
                className="btn-scenario btn-remove"
                onClick={() => setScenarios(prev => [prev[0]])}
              >
                ✕ Remove Scenario B
              </button>
            )}
            <button className="btn-theme" onClick={() => setIsDark(prev => !prev)}>
              {isDark ? '☀ Light' : '☾ Dark'}
            </button>
            <button className="btn-export" onClick={handleExport}>
              ↓ Export PDF
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="print-only">
          <div className="print-report-header">
            <h1 className="print-report-title">ROI Analysis Report</h1>
            <p className="print-report-date">{exportDate}</p>
          </div>
          {results.map((r, i) => (
            <div key={i} className="print-scenario-summary">
              {comparing && (
                <h2 className="print-scenario-label" style={{ color: SCENARIO_META[i].color }}>
                  {SCENARIO_META[i].label}
                </h2>
              )}
              <div className="print-metrics">
                <div className="print-metric">
                  <span>ROI</span>
                  <strong>{r.roiPercent.toFixed(1)}%</strong>
                </div>
                <div className="print-metric">
                  <span>Payback Period</span>
                  <strong>{r.paybackPeriod === null ? 'Never' : `${r.paybackPeriod} months`}</strong>
                </div>
                <div className="print-metric">
                  <span>Total Net Profit</span>
                  <strong>{fmt(r.totalNetProfit)}</strong>
                </div>
                <div className="print-metric">
                  <span>Monthly Net Profit</span>
                  <strong>{fmt(r.monthlyNetProfit)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`layout${comparing ? ' layout-compare' : ''}`}>
          <div className="layout-left">
            {scenarios.map((s, i) => (
              <InputForm
                key={i}
                values={s}
                onChange={(field, val) => handleChange(i, field, val)}
                label={comparing ? SCENARIO_META[i].label : null}
                color={comparing ? SCENARIO_META[i].color : null}
              />
            ))}
          </div>

          <div className="layout-right">
            <div className={comparing ? 'results-compare' : ''}>
              {results.map((r, i) => (
                <Results
                  key={i}
                  {...r}
                  label={comparing ? SCENARIO_META[i].label : null}
                  color={comparing ? SCENARIO_META[i].color : null}
                />
              ))}
            </div>
            <CashFlowChart
              isDark={isDark}
              datasets={results.map((r, i) => ({
                data: r.cashFlowData,
                color: SCENARIO_META[i].color,
                label: comparing ? SCENARIO_META[i].label : null,
              }))}
            />
            <button
              className="btn-toggle-table"
              onClick={() => setShowTable(prev => !prev)}
            >
              {showTable ? 'Hide Table' : 'Show Monthly Breakdown'}
            </button>
            {showTable && results.map((r, i) => (
              <MonthlyTable
                key={i}
                data={r.cashFlowData}
                paybackPeriod={r.paybackPeriod}
                label={comparing ? SCENARIO_META[i].label : null}
                color={comparing ? SCENARIO_META[i].color : null}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
