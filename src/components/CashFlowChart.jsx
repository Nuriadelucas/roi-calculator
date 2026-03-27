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

function mergeDatasets(datasets) {
  const maxLen = Math.max(...datasets.map(d => d.data.length));
  return Array.from({ length: maxLen }, (_, i) => {
    const point = { month: i + 1 };
    datasets.forEach((d, j) => {
      if (i < d.data.length) point[`cf${j}`] = d.data[i].cashFlow;
    });
    return point;
  });
}

function CustomTooltip({ active, payload, label, datasets }) {
  if (!active || !payload?.length) return null;
  const multiline = datasets.length > 1;
  return (
    <div className="chart-tooltip">
      <p className="tooltip-month">Month {label}</p>
      {payload.map((entry, i) => {
        const v = entry.value;
        return (
          <p key={i} style={{ color: entry.stroke, fontWeight: 600, marginTop: '2px' }}>
            {multiline && datasets[i]?.label ? `${datasets[i].label}: ` : ''}
            {v < 0 ? '-' : ''}${Math.abs(Math.round(v)).toLocaleString('en-US')}
          </p>
        );
      })}
    </div>
  );
}

function CashFlowChart({ datasets, isDark = true }) {
  const merged = mergeDatasets(datasets);
  const multiline = datasets.length > 1;

  const gridColor = isDark ? '#2a2a4a' : '#dde1ec';
  const axisColor = isDark ? '#8888aa' : '#666688';
  const refColor  = isDark ? '#666688' : '#aaaaaa';
  const dotStroke = isDark ? '#1a1a2e' : '#ffffff';

  return (
    <div className="chart-card">
      <h2 className="card-title">Cumulative Cash Flow</h2>
      {multiline && (
        <div className="chart-legend">
          {datasets.map((d, i) => (
            <span key={i} className="legend-item">
              <span className="legend-dot" style={{ background: d.color }} />
              {d.label}
            </span>
          ))}
        </div>
      )}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={merged} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            label={{ value: 'Month', position: 'insideBottom', offset: -2, fill: axisColor, fontSize: 12 }}
          />
          <YAxis
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
            tickFormatter={formatDollar}
            width={70}
          />
          <Tooltip content={<CustomTooltip datasets={datasets} />} />
          <ReferenceLine y={0} stroke={refColor} strokeDasharray="6 3" strokeWidth={1.5} />
          {datasets.map((d, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={`cf${i}`}
              stroke={d.color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: d.color, stroke: dotStroke, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CashFlowChart;
