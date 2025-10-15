import { useState } from 'react';
import { UploadCard } from './components/UploadCard';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { extractPdfPages } from './utils/pdfProcessor';
import { calculateRatios } from './utils/ratioCalculations';
import { FinancialRatios, BalanceSheetData } from './types';

type AppState = 'upload' | 'loading' | 'dashboard';

function App() {
  const [state, setState] = useState<AppState>('upload');
  const [ratios, setRatios] = useState<FinancialRatios | null>(null);

  const handleSubmit = async (
    file: File,
    startPage: number,
    endPage: number
  ) => {
    setState('loading');

    try {
      const base64Data = await extractPdfPages(file, startPage, endPage);

      // Placeholder for LLM API call
      // const balanceSheetData = await analyzePDF(base64Data);

      // Mock data for demonstration
      const mockData: BalanceSheetData = {
        currentAssets: 5000000,
        currentLiabilities: 2500000,
        inventory: 1000000,
        prepaidExpenses: 200000,
        cashAndEquivalents: 1500000,
        totalLiabilities: 8000000,
        shareholdersEquity: 12000000,
        totalAssets: 20000000,
        longTermDebt: 5500000,
        fixedAssets: 15000000,
        accountsReceivable: 1800000,
      };

      const calculatedRatios = calculateRatios(mockData);

      setTimeout(() => {
        setRatios(calculatedRatios);
        setState('dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error processing PDF:', error);
      setState('upload');
    }
  };

  const handleReset = () => {
    setState('upload');
    setRatios(null);
  };

  return (
    <>
      {state === 'upload' && <UploadCard onSubmit={handleSubmit} />}
      {state === 'loading' && <LoadingScreen />}
      {state === 'dashboard' && ratios && (
        <Dashboard ratios={ratios} onReset={handleReset} />
      )}
    </>
  );
}

export default App;
