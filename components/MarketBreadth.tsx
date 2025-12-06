import React from 'react';
import { Stock } from '../types';

interface MarketBreadthProps {
  stocks: Stock[];
}

const MarketBreadth: React.FC<MarketBreadthProps> = ({ stocks }) => {
  const advances = stocks.filter(s => s.change >= 0).length;
  const declines = stocks.filter(s => s.change < 0).length;
  const total = stocks.length;
  const advPercent = (advances / total) * 100;
  
  return (
    <div className="bg-trade-card rounded-lg p-4 border border-trade-border h-full">
      <h3 className="text-trade-muted text-xs font-bold uppercase mb-4 tracking-wider">Market Breadth</h3>
      <div className="flex justify-between items-end mb-2">
        <div className="text-center">
          <span className="block text-2xl font-bold text-trade-up">{advances}</span>
          <span className="text-xs text-trade-muted">Advances</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-trade-down">{declines}</span>
          <span className="text-xs text-trade-muted">Declines</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-3 bg-trade-bg rounded-full overflow-hidden flex">
        <div 
          style={{ width: `${advPercent}%` }} 
          className="h-full bg-trade-up transition-all duration-500 ease-out"
        />
        <div 
          style={{ width: `${100 - advPercent}%` }} 
          className="h-full bg-trade-down transition-all duration-500 ease-out"
        />
      </div>
      
      <div className="mt-4 text-xs text-trade-muted flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-trade-up"></div> Bullish
        <div className="w-2 h-2 rounded-full bg-trade-down"></div> Bearish
      </div>
    </div>
  );
};

export default MarketBreadth;
