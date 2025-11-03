export interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  debtToEquity: number;
  debtRatio: number;
  equityRatio: number;
  capitalizationRatio: number;
  solvencyRatio: number;
  workingCapital: number;
  fixedAssetToEquity: number;
  currentLiabilitiesToAssets: number;
  receivablePercentOfCA: number;
  inventoryPercentOfCA: number;
  netWorthRatio: number;
}

export interface BalanceSheetData {
  companyName: string;
  currentAssets: number;
  currentLiabilities: number;
  inventory: number;
  prepaidExpenses: number;
  cashAndEquivalents: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  totalAssets: number;
  longTermDebt: number;
  fixedAssets: number;
  accountsReceivable: number;
}
