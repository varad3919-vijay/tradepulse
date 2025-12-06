import React from 'react';
import { Stock } from '../types';
import { TrendingUpIcon, TrendingDownIcon } from './Icons';

interface StockTableProps {
  title: string;
  stocks: Stock[];
  filter?: 'GAINERS' | 'LOSERS' | 'VOLUME' | 'ALL';
  showOI?: boolean;
}

const StockTable: React.FC<StockTableProps> = ({ title, stocks, filter = 'ALL', showOI = false }) => {
  const sortedStocks = [...stocks].sort((a, b) => {
    if (filter === 'GAINERS') return b.changePercent - a.changePercent;
    if (filter === 'LOSERS') return a.changePercent - b.changePercent;
    if (filter === 'VOLUME') return b.volume - a.volume;
    return 0;
  });

  const displayStocks = filter === 'ALL' ? sortedStocks : sortedStocks.slice(0, 8);

  return (
    <div className="bg-trade-card rounded-lg border border-trade-border overflow-hidden flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-trade-border flex justify-between items-center bg-gradient-to-r from-trade-card to-trade-bg">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          {filter === 'GAINERS' && <TrendingUpIcon className="w-4 h-4 text-trade-up" />}
          {filter === 'LOSERS' && <TrendingDownIcon className="w-4 h-4 text-trade-down" />}
          {title}
        </h3>
        <span className="text-[10px] text-trade-accent bg-blue-900/30 border border-blue-500/30 px-2 py-1 rounded">
          NSE Live
        </span>
      </div>
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-trade-bg text-trade-muted sticky top-0 z-10">
            <tr>
              <th className="p-3 font-semibold text-xs text-gray-400">Symbol</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Price</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Chg%</th>
              {showOI && <th className="p-3 font-semibold text-xs text-right text-gray-400 hidden sm:table-cell">OI Chg%</th>}
              <th className="p-3 font-semibold text-xs text-right text-gray-400 hidden md:table-cell">Vol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-trade-border">
            {displayStocks.map((stock) => {
              const isPositive = stock.change >= 0;
              return (
                <tr key={stock.symbol} className="hover:bg-trade-cardHover transition-colors cursor-pointer group">
                  <td className="p-3">
                    <div className="font-bold text-gray-200 group-hover:text-trade-accent transition-colors">
                      {stock.symbol}
                    </div>
                    <div className="text-[10px] text-trade-muted truncate max-w-[100px]">
                      {stock.name}
                    </div>
                  </td>
                  <td className={`p-3 text-right font-mono ${isPositive ? 'text-trade-up' : 'text-trade-down'}`}>
                    {stock.price.toFixed(2)}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      isPositive 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  {showOI && (
                    <td className="p-3 text-right text-xs hidden sm:table-cell">
                      <span className={`${(stock.oiChangePercent || 0) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(stock.oiChangePercent || 0) > 0 ? '+' : ''}{stock.oiChangePercent}%
                      </span>
                    </td>
                  )}
                  <td className="p-3 text-right text-trade-muted text-xs hidden md:table-cell font-mono">
                    {(stock.volume / 100000).toFixed(1)}L
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;