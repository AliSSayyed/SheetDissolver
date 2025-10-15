import { BalanceSheetData, FinancialRatios } from '../types';

export function calculateRatios(data: BalanceSheetData): FinancialRatios {
  return {
    currentRatio: data.currentAssets / data.currentLiabilities,
    quickRatio:
      (data.currentAssets - data.inventory - data.prepaidExpenses) /
      data.currentLiabilities,
    cashRatio: data.cashAndEquivalents / data.currentLiabilities,
    debtToEquity: data.totalLiabilities / data.shareholdersEquity,
    debtRatio: data.totalLiabilities / data.totalAssets,
    equityRatio: data.shareholdersEquity / data.totalAssets,
    capitalizationRatio:
      data.longTermDebt / (data.longTermDebt + data.shareholdersEquity),
    solvencyRatio: data.totalAssets / data.totalLiabilities,
    workingCapital: data.currentAssets - data.currentLiabilities,
    fixedAssetToEquity: data.fixedAssets / data.shareholdersEquity,
    currentLiabilitiesToAssets: data.currentLiabilities / data.totalAssets,
    receivablePercentOfCA: data.accountsReceivable / data.currentAssets,
    inventoryPercentOfCA: data.inventory / data.currentAssets,
    netWorthRatio: data.shareholdersEquity / data.totalAssets,
  };
}

export function getRatioStatus(
  ratioName: keyof FinancialRatios,
  value: number
): 'healthy' | 'warning' | 'risk' {
  const thresholds: Record<
    keyof FinancialRatios,
    { healthy: number; warning: number }
  > = {
    currentRatio: { healthy: 1.5, warning: 1.0 },
    quickRatio: { healthy: 1.0, warning: 0.7 },
    cashRatio: { healthy: 0.5, warning: 0.2 },
    debtToEquity: { healthy: 1.0, warning: 2.0 },
    debtRatio: { healthy: 0.4, warning: 0.6 },
    equityRatio: { healthy: 0.5, warning: 0.3 },
    capitalizationRatio: { healthy: 0.4, warning: 0.6 },
    solvencyRatio: { healthy: 2.0, warning: 1.2 },
    workingCapital: { healthy: 0, warning: 0 },
    fixedAssetToEquity: { healthy: 0.75, warning: 1.0 },
    currentLiabilitiesToAssets: { healthy: 0.3, warning: 0.5 },
    receivablePercentOfCA: { healthy: 0.3, warning: 0.5 },
    inventoryPercentOfCA: { healthy: 0.3, warning: 0.5 },
    netWorthRatio: { healthy: 0.5, warning: 0.3 },
  };

  const threshold = thresholds[ratioName];

  if (ratioName === 'debtToEquity' || ratioName === 'debtRatio' ||
      ratioName === 'capitalizationRatio' || ratioName === 'currentLiabilitiesToAssets') {
    if (value <= threshold.healthy) return 'healthy';
    if (value <= threshold.warning) return 'warning';
    return 'risk';
  }

  if (value >= threshold.healthy) return 'healthy';
  if (value >= threshold.warning) return 'warning';
  return 'risk';
}
