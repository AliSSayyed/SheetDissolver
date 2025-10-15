import { getRatioStatus } from '../utils/ratioCalculations';
import { FinancialRatios } from '../types';

interface RatioCardProps {
  name: string;
  formula: string;
  value: number;
  interpretation: string;
  ratioKey: keyof FinancialRatios;
  isLarge?: boolean;
}

export function RatioCard({
  name,
  formula,
  value,
  interpretation,
  ratioKey,
  isLarge = false,
}: RatioCardProps) {
  const status = getRatioStatus(ratioKey, value);

  const statusColors = {
    healthy: '#00ff88',
    warning: '#ffd500',
    risk: '#FF3333',
  };

  const formatValue = (val: number) => {
    if (ratioKey === 'workingCapital') {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    if (val > 100) {
      return val.toFixed(0);
    }
    if (val < 0.01 && val > 0) {
      return val.toFixed(4);
    }
    return val.toFixed(2);
  };

  if (isLarge) {
    return (
      <div className="bg-transparent border border-[#1F1F1F] rounded-2xl p-12 relative hover:bg-white hover:bg-opacity-[0.03] transition-all">
        <div
          className="absolute top-6 right-6 w-2 h-2 rounded-full"
          style={{ backgroundColor: statusColors[status] }}
        ></div>
        <div className="flex flex-col items-center text-center">
          <div className="w-6 h-6 mb-4 text-[#666666]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <div className="text-[#0066FF] font-serif text-8xl font-semibold mb-2">
            {formatValue(value)}
          </div>
          <div className="text-white text-xl font-medium mb-4">{name}</div>
          <div className="text-[#999999] text-sm italic mb-2">{formula}</div>
          <div className="text-[#999999] text-xs leading-relaxed max-w-xs">
            {interpretation}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent border border-[#1F1F1F] rounded-2xl p-8 relative hover:bg-white hover:bg-opacity-[0.03] transition-all">
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{ backgroundColor: statusColors[status] }}
      ></div>
      <h3 className="text-white text-base font-medium mb-2">{name}</h3>
      <p className="text-[#999999] text-sm italic mb-4">{formula}</p>
      <div className="text-[#0066FF] text-3xl font-serif font-semibold mb-3">
        {formatValue(value)}
      </div>
      <p className="text-[#999999] text-xs leading-relaxed">
        {interpretation}
      </p>
    </div>
  );
}
