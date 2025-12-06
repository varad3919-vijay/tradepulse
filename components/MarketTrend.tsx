import React from 'react';
import { TrendGroup } from '../types';

interface Props {
  trends: TrendGroup[];
}

const MarketTrend: React.FC<Props> = ({ trends }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {trends.map((group) => (
        <div key={group.name} className="bg-trade-card rounded-lg border border-trade-border p-4 flex flex-col hover:border-slate-500 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <h4 className={`text-sm font-bold ${group.color}`}>{group.name}</h4>
            <span className="text-xs bg-trade-bg px-2 py-1 rounded text-white font-mono">{group.count}</span>
          </div>
          
          <div className="flex-1 space-y-2">
            {group.stocks.slice(0, 3).map((stock) => (
              <div key={stock.symbol} className="flex justify-between items-center text-xs border-b border-trade-border/50 pb-1 last:border-0">
                <div>
                  <div className="font-semibold text-gray-300">{stock.symbol}</div>
                  <div className="text-trade-muted text-[10px]">OI: {stock.oiChangePercent && stock.oiChangePercent > 0 ? '+' : ''}{stock.oiChangePercent}%</div>
                </div>
                <div className={`text-right ${stock.changePercent >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
                  <div>{stock.price.toFixed(1)}</div>
                  <div className="text-[10px]">{stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</div>
                </div>
              </div>
            ))}
          </div>
          
          {group.stocks.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-xs text-trade-muted italic">
              No stocks in this zone
            </div>
          )}

          <div className="mt-3 text-[10px] text-trade-muted text-right uppercase tracking-wider">
            Stock Position
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketTrend;