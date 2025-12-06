import React from 'react';
import { FIIDIIData } from '../types';

interface Props {
  data: FIIDIIData[];
}

const FIIDIIDashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-trade-card rounded-lg border border-trade-border p-4 h-full flex flex-col">
      <h3 className="text-white text-sm font-bold uppercase mb-4 tracking-wider flex items-center justify-between">
        <span>FII / DII Activity</span>
        <span className="text-[10px] bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">Provisional</span>
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-trade-muted border-b border-trade-border">
            <tr>
              <th className="text-left py-2 font-medium">Category</th>
              <th className="text-right py-2 font-medium">Buy (Cr)</th>
              <th className="text-right py-2 font-medium">Sell (Cr)</th>
              <th className="text-right py-2 font-medium">Net (Cr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-trade-border">
            {data.map((item) => (
              <tr key={item.category} className="group hover:bg-trade-cardHover transition-colors">
                <td className="py-2.5 font-bold text-gray-300">{item.category}</td>
                <td className="py-2.5 text-right text-gray-400">{item.buyValue.toFixed(2)}</td>
                <td className="py-2.5 text-right text-gray-400">{item.sellValue.toFixed(2)}</td>
                <td className={`py-2.5 text-right font-bold ${item.netValue >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
                  {item.netValue >= 0 ? '+' : ''}{item.netValue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto pt-4 flex gap-4 text-[10px] text-trade-muted">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-trade-up"></div> Net Buy
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-trade-down"></div> Net Sell
        </div>
      </div>
    </div>
  );
};

export default FIIDIIDashboard;