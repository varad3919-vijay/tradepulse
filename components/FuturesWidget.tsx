import React from 'react';
import { FutureStock } from '../types';

interface Props {
  futures: FutureStock[];
}

const FuturesWidget: React.FC<Props> = ({ futures }) => {
  // Sort by Delivery Volume descending to show "Highest Delivery Volume"
  const sortedFutures = [...futures].sort((a, b) => b.deliveryVolume - a.deliveryVolume);

  return (
    <div className="bg-trade-card rounded-lg border border-trade-border overflow-hidden h-full flex flex-col shadow-lg">
      <div className="p-3 bg-gradient-to-r from-trade-card to-trade-bg border-b border-trade-border flex justify-between items-center">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
          Stock Futures
        </h3>
        <div className="flex gap-2">
           <span className="text-[10px] text-gray-400">High Del Vol</span>
        </div>
      </div>
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-trade-bg text-trade-muted sticky top-0 z-10">
            <tr>
              <th className="p-3 font-semibold text-xs text-gray-400">Symbol</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Expiry</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">LTP</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Del Vol</th>
              <th className="p-3 font-semibold text-xs text-right text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-trade-border">
            {sortedFutures.map((fut, idx) => {
              // Add separator between different stock groups if sorted by symbol, 
              // but here we sort by volume, so just standard list.
              return (
                <tr key={`${fut.symbol}-${fut.type}-${idx}`} className="hover:bg-trade-cardHover transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-gray-200 text-xs">{fut.symbol}</div>
                    <div className="text-[9px] text-trade-muted uppercase">{fut.type} Month</div>
                  </td>
                  <td className="p-3 text-right">
                     <span className="text-[10px] text-trade-accent bg-blue-900/20 px-1.5 py-0.5 rounded border border-blue-500/20 whitespace-nowrap">
                       {fut.expiryDate}
                     </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className={`font-mono text-xs ${fut.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {fut.price.toFixed(1)}
                    </div>
                    <div className="text-[9px] text-trade-muted">
                      {fut.changePercent >= 0 ? '+' : ''}{fut.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-3 text-right">
                     <div className="text-xs font-mono text-gray-300">
                       {(fut.deliveryVolume / 100000).toFixed(2)}L
                     </div>
                  </td>
                  <td className="p-3 text-right">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                       fut.action === 'Buying' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                        : fut.action === 'Selling'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                     }`}>
                       {fut.action}
                     </span>
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

export default FuturesWidget;