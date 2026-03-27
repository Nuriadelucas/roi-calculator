import { useState } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';
import CashFlowChart from './components/CashFlowChart';
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

function App() {
  const [scenarios, setScenarios] = useState([{ ...DEFAULTS }]);

  const comparing = scenarios.length > 1;

  function handleChange(index, field, value) {
    setScenarios(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
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
          </div>
        </div>
      </header>

      <main className="app-main">
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
              datasets={results.map((r, i) => ({
                data: r.cashFlowData,
                color: SCENARIO_META[i].color,
                label: comparing ? SCENARIO_META[i].label : null,
              }))}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
