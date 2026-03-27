function InputForm({ values, onChange }) {
  return (
    <div className="form-card">
      <h2 className="card-title">Investment Parameters</h2>

      <div className="field">
        <label>Initial Investment ($)</label>
        <input
          type="number"
          min="0"
          value={values.initialInvestment}
          onChange={e => onChange('initialInvestment', Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Expected Monthly Revenue ($)</label>
        <input
          type="number"
          min="0"
          value={values.monthlyRevenue}
          onChange={e => onChange('monthlyRevenue', Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Monthly Operating Costs ($)</label>
        <input
          type="number"
          min="0"
          value={values.monthlyCosts}
          onChange={e => onChange('monthlyCosts', Number(e.target.value))}
        />
      </div>

      <div className="field">
        <label>Calculation Period (months)</label>
        <select
          value={values.period}
          onChange={e => onChange('period', Number(e.target.value))}
        >
          <option value={12}>12 months</option>
          <option value={24}>24 months</option>
          <option value={36}>36 months</option>
        </select>
      </div>
    </div>
  );
}

export default InputForm;
