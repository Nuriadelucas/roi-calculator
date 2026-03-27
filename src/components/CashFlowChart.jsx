import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

function formatDollar(value) {
  if (Math.abs(value) >= 1000) {
    return '$' + (value / 1000).toFixed(1) + 'k';
  }
  return '$' + value.toLocaleString('en-US');
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="chart-tooltip">
        <p className="tooltip-month">Month {label}</p>
        <p className={value >= 0 ? 'tooltip-positive' : 'tooltip-negative'}>
          {value < 0 ? '-' : ''}${Math.abs(Math.round(value)).toLocaleString('en-US')}
        </p>
      </div>
    );
  }
  return null;
}

function CashFlowChart({ data }) {
  return (
    <div className="chart-card">
      <h2 className="card-title">Cumulative Cash Flow</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
          <XAxis
            dataKey="month"
            stroke="#8888aa"
            tick={{ fill: '#8888aa', fontSize: 12 }}
            label={{ value: 'Month', position: 'insideBottom', offset: -2, fill: '#8888aa', fontSize: 12 }}
          />
          <YAxis
            stroke="#8888aa"
            tick={{ fill: '#8888aa', fontSize: 12 }}
            tickFormatter={formatDollar}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#666688" strokeDasharray="6 3" strokeWidth={1.5} />
          <Line
            type="monotone"
            dataKey="cashFlow"
            stroke="#3399ff"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#3399ff', stroke: '#1a1a2e', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CashFlowChart;
