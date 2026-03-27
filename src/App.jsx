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

function App() {
  const [values, setValues] = useState(DEFAULTS);

  function handleChange(field, value) {
    setValues(prev => ({ ...prev, [field]: value }));
  }

  const { monthlyNetProfit, totalNetProfit, roiPercent, paybackPeriod, cashFlowData } =
    calculateROI(values);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="header-logo">EPAM</span>
          <h1 className="header-title">Business ROI Calculator</h1>
        </div>
      </header>

      <main className="app-main">
        <div className="layout">
          <aside className="layout-left">
            <InputForm values={values} onChange={handleChange} />
          </aside>

          <section className="layout-right">
            <Results
              roiPercent={roiPercent}
              paybackPeriod={paybackPeriod}
              totalNetProfit={totalNetProfit}
              monthlyNetProfit={monthlyNetProfit}
            />
            <CashFlowChart data={cashFlowData} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
