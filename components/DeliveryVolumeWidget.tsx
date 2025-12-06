import React from 'react';
import { DeliveryStock } from '../types';

interface Props {
  stocks: DeliveryStock[];
}

const DeliveryVolumeWidget: React.FC<Props> = ({ stocks }) => {
  return (
    <div className="bg-trade-card rounded-lg border border-trade-border overflow-hidden h-full flex flex-col shadow-lg">
      <div className="p-3 bg-gradient-to-r from-trade-card to-trade-bg border-b border-trade-border flex justify-between items-center">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
          High Delivery Vol (Yesterday)
        </h3>
        <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded border border-orange-500/30">
          Top 5 FNO
        </span>
      </div>
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-trade-bg text-trade-muted sticky top-0 z-10">
            <tr>
              <th className="p-3 font-semibold text-xs text-gray-400">Symbol</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Price</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Del %</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400 hidden sm:table-cell">Del Vol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-trade-border">
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-trade-cardHover transition-colors cursor-pointer">
                <td className="p-3 font-bold text-gray-200 text-xs">{stock.symbol}</td>
                <td className="p-3 text-right">
                  <div className="text-gray-300 font-mono text-xs">{stock.price.toFixed(1)}</div>
                  <div className={`text-[10px] ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </td>
                <td className="p-3 text-right">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    stock.deliveryPercent > 60 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
                      : 'bg-slate-700/50 text-gray-300'
                  }`}>
                    {stock.deliveryPercent}%
                  </span>
                </td>
                <td className="p-3 text-right text-trade-muted text-xs hidden sm:table-cell font-mono">
                  {(stock.deliveryQuantity / 100000).toFixed(2)}L
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryVolumeWidget;
