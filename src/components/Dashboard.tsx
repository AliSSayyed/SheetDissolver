import { FinancialRatios, BalanceSheetData } from "../types";
import { RatioCard } from "./RatioCard";

interface DashboardProps {
  ratios: FinancialRatios;
  balanceSheetData: BalanceSheetData;
  onReset: () => void;
}

export function Dashboard({
  ratios,
  balanceSheetData,
  onReset,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-serif text-white mb-16 text-center">
          {balanceSheetData.companyName
            ? `Financial Analysis- ${balanceSheetData.companyName}`
            : "Financial Analysis"}
        </h1>

        <div className="space-y-32">
          <section className="border border-[#1F1F1F] rounded-2xl p-12">
            <h2 className="text-5xl font-serif text-white mb-10">
              Liquidity Ratios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RatioCard
                name="Current Ratio"
                formula="Current Assets ÷ Current Liabilities"
                value={ratios.currentRatio}
                interpretation="Higher is better. Above 1.5 indicates strong short-term financial health."
                ratioKey="currentRatio"
              />
              <RatioCard
                name="Quick Ratio"
                formula="(CA – Inventory – Prepaid) ÷ CL"
                value={ratios.quickRatio}
                interpretation="Acid test. Above 1.0 shows ability to meet obligations without selling inventory."
                ratioKey="quickRatio"
              />
              <RatioCard
                name="Cash Ratio"
                formula="Cash & Equivalents ÷ Current Liabilities"
                value={ratios.cashRatio}
                interpretation="Most conservative liquidity measure. Shows immediate payment capability."
                ratioKey="cashRatio"
              />
            </div>
          </section>

          <section className="border border-[#1F1F1F] rounded-2xl p-12">
            <h2 className="text-5xl font-serif text-white mb-10">
              Leverage & Solvency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RatioCard
                name="Debt-to-Equity"
                formula="Total Liabilities ÷ Equity"
                value={ratios.debtToEquity}
                interpretation="Lower is safer. Below 1.0 means equity exceeds debt."
                ratioKey="debtToEquity"
              />
              <RatioCard
                name="Debt Ratio"
                formula="Total Liabilities ÷ Total Assets"
                value={ratios.debtRatio}
                interpretation="Percentage of assets financed by debt. Below 0.4 is conservative."
                ratioKey="debtRatio"
              />
              <RatioCard
                name="Equity Ratio"
                formula="Equity ÷ Total Assets"
                value={ratios.equityRatio}
                interpretation="Owner's stake. Above 0.5 indicates strong ownership position."
                ratioKey="equityRatio"
              />
              <RatioCard
                name="Capitalization Ratio"
                formula="LT Debt ÷ (LT Debt + Equity)"
                value={ratios.capitalizationRatio}
                interpretation="Long-term debt proportion. Below 0.4 is considered conservative."
                ratioKey="capitalizationRatio"
              />
              <RatioCard
                name="Solvency Ratio"
                formula="Total Assets ÷ Total Liabilities"
                value={ratios.solvencyRatio}
                interpretation="Ability to meet long-term obligations. Above 2.0 is healthy."
                ratioKey="solvencyRatio"
              />
            </div>
          </section>

          <section className="border border-[#1F1F1F] rounded-2xl p-12">
            <h2 className="text-5xl font-serif text-white mb-10">
              Efficiency Ratios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RatioCard
                name="Working Capital"
                formula="Current Assets – Current Liabilities"
                value={ratios.workingCapital}
                interpretation="Operational cushion. Positive values indicate available short-term resources."
                ratioKey="workingCapital"
              />
              <RatioCard
                name="Fixed Asset to Equity"
                formula="Fixed Assets ÷ Equity"
                value={ratios.fixedAssetToEquity}
                interpretation="Capital intensity. Below 0.75 suggests conservative asset investment."
                ratioKey="fixedAssetToEquity"
              />
              <RatioCard
                name="CL to Total Assets"
                formula="Current Liabilities ÷ Total Assets"
                value={ratios.currentLiabilitiesToAssets}
                interpretation="Short-term obligation burden. Lower percentages are preferable."
                ratioKey="currentLiabilitiesToAssets"
              />
              <RatioCard
                name="Receivable % of CA"
                formula="Accounts Receivable ÷ Current Assets"
                value={ratios.receivablePercentOfCA}
                interpretation="Proportion tied up in receivables. Balance needed for liquidity."
                ratioKey="receivablePercentOfCA"
              />
              <RatioCard
                name="Inventory % of CA"
                formula="Inventory ÷ Current Assets"
                value={ratios.inventoryPercentOfCA}
                interpretation="Working capital locked in inventory. Industry-dependent optimal range."
                ratioKey="inventoryPercentOfCA"
              />
            </div>
          </section>

          <section className="border border-[#1F1F1F] rounded-2xl p-12">
            <h2 className="text-5xl font-serif text-white mb-10">
              Stability Ratios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RatioCard
                name="Net Worth Ratio"
                formula="Shareholders' Equity ÷ Total Assets"
                value={ratios.netWorthRatio}
                interpretation="Financial cushion. Above 0.5 indicates majority equity ownership."
                ratioKey="netWorthRatio"
              />
              <RatioCard
                name="Solvency Ratio"
                formula="Total Assets ÷ Total Liabilities"
                value={ratios.solvencyRatio}
                interpretation="Long-term viability measure. Higher values show greater financial stability."
                ratioKey="solvencyRatio"
              />
            </div>
          </section>
        </div>

        <section className="border border-[#1F1F1F] rounded-2xl p-12 mt-32">
          <h2 className="text-3xl font-serif text-white mb-8">
            Extracted Balance Sheet Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Current Assets</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.currentAssets / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Current Liabilities</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.currentLiabilities / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Inventory</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.inventory / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Prepaid Expenses</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.prepaidExpenses / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Cash & Equivalents</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.cashAndEquivalents / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Total Liabilities</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.totalLiabilities / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">
                Shareholders' Equity
              </p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.shareholdersEquity / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Total Assets</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.totalAssets / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Long-Term Debt</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.longTermDebt / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Fixed Assets</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.fixedAssets / 1000000).toFixed(2)}M
              </p>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-[#999999] text-sm mb-1">Accounts Receivable</p>
              <p className="text-white text-lg font-semibold">
                ${(balanceSheetData.accountsReceivable / 1000000).toFixed(2)}M
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end mt-16">
          <button
            onClick={onReset}
            className="bg-[#FF5733] text-white font-semibold px-8 py-4 rounded-lg hover:brightness-110 transition-all"
          >
            Dissolve Another Sheet?
          </button>
        </div>
      </div>
    </div>
  );
}
