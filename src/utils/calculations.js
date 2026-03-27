export function calculateROI({ initialInvestment, monthlyRevenue, monthlyCosts, period }) {
  const monthlyNetProfit = monthlyRevenue - monthlyCosts;
  const totalNetProfit = monthlyNetProfit * period - initialInvestment;
  const roiPercent = initialInvestment > 0 ? (totalNetProfit / initialInvestment) * 100 : 0;
  const paybackPeriod = monthlyNetProfit <= 0 ? null : Math.ceil(initialInvestment / monthlyNetProfit);

  const cashFlowData = Array.from({ length: period }, (_, i) => ({
    month: i + 1,
    revenue: monthlyRevenue,
    costs: monthlyCosts,
    netProfit: monthlyNetProfit,
    cashFlow: monthlyNetProfit * (i + 1) - initialInvestment,
  }));

  return { monthlyNetProfit, totalNetProfit, roiPercent, paybackPeriod, cashFlowData };
}
