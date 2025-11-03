import { useState } from 'react';
import { UploadCard } from './components/UploadCard';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { extractPdfPages } from './utils/pdfProcessor';
import { analyzePDF } from './utils/analyzePDF';
import { calculateRatios } from './utils/ratioCalculations';
import { FinancialRatios, BalanceSheetData } from './types';

type AppState = 'upload' | 'loading' | 'dashboard';

function App() {
  const [state, setState] = useState<AppState>('upload');
  const [ratios, setRatios] = useState<FinancialRatios | null>(null);
  const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheetData | null>(null);

  const handleSubmit = async (
    file: File,
    startPage: number,
    endPage: number
  ) => {
    setState('loading');

    try {
      const base64Data = await extractPdfPages(file, startPage, endPage);
      const extractedData = await analyzePDF(base64Data);
      const calculatedRatios = calculateRatios(extractedData);

      setBalanceSheetData(extractedData);
      setRatios(calculatedRatios);
      setState('dashboard');
    } catch (error) {
      console.error('Error processing PDF:', error);
      setState('upload');
    }
  };

  const handleReset = () => {
    setState('upload');
    setRatios(null);
    setBalanceSheetData(null);
  };

  return (
    <>
      {state === 'upload' && <UploadCard onSubmit={handleSubmit} />}
      {state === 'loading' && <LoadingScreen />}
      {state === 'dashboard' && ratios && balanceSheetData && (
        <Dashboard ratios={ratios} balanceSheetData={balanceSheetData} onReset={handleReset} />
      )}
    </>
  );
}

export default App;
