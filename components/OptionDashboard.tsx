import React from 'react';
import { OptionChainData } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell, CartesianGrid,
  PieChart, Pie 
} from 'recharts';

interface Props {
  data: OptionChainData;
}

const getSentiment = (pcr: number) => {
  if (pcr >= 1.25) return { text: 'Strong Bullish', color: 'text-green-400 font-extrabold', bg: 'bg-green-500/20' };
  if (pcr >= 1.15) return { text: 'Bullish', color: 'text-green-400', bg: 'bg-green-500/10' };
  if (pcr <= 0.75) return { text: 'Strong Bearish', color: 'text-red-400 font-extrabold', bg: 'bg-red-500/20' };
  if (pcr <= 0.85) return { text: 'Bearish', color: 'text-red-400', bg: 'bg-red-500/10' };
  return { text: 'Neutral', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
}

const OptionDashboard: React.FC<Props> = ({ data }) => {
  const atmStrike = data.strikes[Math.floor(data.strikes.length / 2)].strikePrice;

  // Calculate Totals for Pie Chart
  const totalCallOI = data.strikes.reduce((acc, curr) => acc + curr.callOI, 0);
  const totalPutOI = data.strikes.reduce((acc, curr) => acc + curr.putOI, 0);

  const pieData = [
    { name: 'Total Call OI', value: totalCallOI },
    { name: 'Total Put OI', value: totalPutOI },
  ];

  const PIE_COLORS = ['#EF4444', '#10B981']; // Red for Calls, Green for Puts

  const sentiment = getSentiment(data.pcr);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Spot Price */}
        <div className="bg-trade-card rounded-lg border border-trade-border p-4 relative overflow-hidden shadow-lg">
          <div className="text-trade-muted text-xs font-bold uppercase tracking-wider mb-1">Spot Price</div>
          <div className="text-2xl font-bold font-mono text-white">{data.spotPrice.toFixed(2)}</div>
          <div className="text-xs text-trade-accent mt-1">ATM: {atmStrike}</div>
        </div>

        {/* PCR */}
        <div className={`bg-trade-card rounded-lg border border-trade-border p-4 shadow-lg ${sentiment.bg}`}>
          <div className="text-trade-muted text-xs font-bold uppercase tracking-wider mb-1">PCR (Put/Call Ratio)</div>
          <div className={`text-2xl font-bold font-mono ${sentiment.color}`}>
            {data.pcr}
          </div>
          <div className={`text-xs mt-1 font-bold ${sentiment.color}`}>
            {sentiment.text}
          </div>
        </div>

        {/* Resistance (Max Call OI) */}
        <div className="bg-trade-card rounded-lg border border-red-900/30 p-4 relative shadow-lg">
          <div className="absolute top-0 right-0 p-2 opacity-10">
             <div className="w-12 h-12 bg-red-500 rounded-full blur-xl"></div>
          </div>
          <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Resistance (Max Call OI)</div>
          <div className="text-2xl font-bold font-mono text-white">{data.maxCallOIStrike}</div>
          <div className="text-xs text-red-300/70 mt-1">
            OI: {(data.maxCallOI / 100000).toFixed(2)}L
          </div>
        </div>

        {/* Support (Max Put OI) */}
        <div className="bg-trade-card rounded-lg border border-green-900/30 p-4 relative shadow-lg">
          <div className="absolute top-0 right-0 p-2 opacity-10">
             <div className="w-12 h-12 bg-green-500 rounded-full blur-xl"></div>
          </div>
          <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Support (Max Put OI)</div>
          <div className="text-2xl font-bold font-mono text-white">{data.maxPutOIStrike}</div>
          <div className="text-xs text-green-300/70 mt-1">
            OI: {(data.maxPutOI / 100000).toFixed(2)}L
          </div>
        </div>
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Bar Chart (Distribution) */}
        <div className="lg:col-span-2 bg-trade-card rounded-lg border border-trade-border p-4 h-[400px] flex flex-col shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span className="w-1 h-5 bg-trade-accent rounded-full"></span>
              OI Distribution (10 Strikes)
            </h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Call OI</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Put OI</div>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.strikes} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3B55" vertical={false} />
                <XAxis 
                  dataKey="strikePrice" 
                  tick={{ fill: '#94A3B8', fontSize: 11 }} 
                  axisLine={{ stroke: '#2A3B55' }}
                />
                <YAxis 
                  tick={{ fill: '#94A3B8', fontSize: 11 }} 
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151E32', borderColor: '#2A3B55', color: '#E2E8F0' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="callOI" name="Call OI" fill="#EF4444" radius={[2, 2, 0, 0]} barSize={20} />
                <Bar dataKey="putOI" name="Put OI" fill="#10B981" radius={[2, 2, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pie Chart (Totals) */}
        <div className="lg:col-span-1 bg-trade-card rounded-lg border border-trade-border p-4 h-[400px] flex flex-col shadow-lg">
          <h3 className="text-white font-bold flex items-center gap-2 mb-2">
            <span className="w-1 h-5 bg-yellow-500 rounded-full"></span>
            Total OI Composition
          </h3>
          
          <div className="flex-1 w-full min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151E32', borderColor: '#2A3B55', color: '#E2E8F0' }}
                  formatter={(value: number) => `${(value / 1000000).toFixed(2)}M`}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} 
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center PCR Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-4 text-center pointer-events-none">
              <div className="text-[10px] text-trade-muted font-bold uppercase">PCR</div>
              <div className={`text-2xl font-bold ${sentiment.color}`}>
                {data.pcr}
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
             <div className="bg-red-500/10 p-3 rounded border border-red-500/20 flex flex-col items-center justify-center">
                <div className="text-red-400 font-bold mb-1">Total Calls</div>
                <div className="text-white text-sm font-mono">{(totalCallOI / 1000000).toFixed(2)}M</div>
             </div>
             <div className="bg-green-500/10 p-3 rounded border border-green-500/20 flex flex-col items-center justify-center">
                <div className="text-green-400 font-bold mb-1">Total Puts</div>
                <div className="text-white text-sm font-mono">{(totalPutOI / 1000000).toFixed(2)}M</div>
             </div>
          </div>
        </div>

      </div>

      {/* 3. Option Chain Table */}
      <div className="bg-trade-card rounded-lg border border-trade-border overflow-hidden shadow-xl">
        <div className="p-3 bg-slate-800/50 border-b border-trade-border flex justify-between items-center">
           <h3 className="text-sm font-bold text-trade-muted uppercase flex items-center gap-2">
             <span className="text-white">Option Chain (Live)</span>
           </h3>
           <span className="text-[10px] text-trade-accent bg-blue-900/30 px-2 py-0.5 rounded border border-blue-500/20">Expiry: 28 MAR</span>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-trade-bg text-trade-muted text-xs uppercase shadow-sm">
                <th className="py-3 px-2 text-center text-red-400 border-b-2 border-red-500/20 w-[15%]">Call OI</th>
                <th className="py-3 px-2 text-center text-red-400 border-b-2 border-red-500/20 w-[15%]">LTP</th>
                <th className="py-3 px-4 text-center text-white bg-slate-800 w-[10%]">Strike</th>
                <th className="py-3 px-2 text-center text-green-400 border-b-2 border-green-500/20 w-[15%]">LTP</th>
                <th className="py-3 px-2 text-center text-green-400 border-b-2 border-green-500/20 w-[15%]">Put OI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-trade-border/50">
              {data.strikes.map((strike) => {
                const isATM = strike.strikePrice === atmStrike;
                const isMaxCall = strike.strikePrice === data.maxCallOIStrike;
                const isMaxPut = strike.strikePrice === data.maxPutOIStrike;
                
                return (
                  <tr key={strike.strikePrice} className={`hover:bg-white/5 transition-colors group ${isATM ? 'bg-yellow-500/5' : ''}`}>
                    {/* Call Side */}
                    <td className={`py-2 px-2 text-center relative ${isMaxCall ? 'bg-red-500/10' : ''}`}>
                      <div className="font-mono text-gray-300 group-hover:text-white">{(strike.callOI / 100000).toFixed(2)}L</div>
                      {isMaxCall && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full"></span>}
                      {isMaxCall && <span className="absolute right-2 top-1 text-[9px] text-red-400 font-bold opacity-60">RES</span>}
                    </td>
                    <td className="py-2 px-2 text-center font-mono text-red-300 group-hover:text-red-200">
                      {strike.callLTP.toFixed(2)}
                    </td>

                    {/* Strike */}
                    <td className={`py-2 px-4 text-center font-bold font-mono text-base ${isATM ? 'text-yellow-400' : 'text-white'}`}>
                      <span className={`px-2 py-1 rounded ${isATM ? 'bg-yellow-500/10 border border-yellow-500/30' : ''}`}>
                        {strike.strikePrice}
                      </span>
                    </td>

                    {/* Put Side */}
                    <td className="py-2 px-2 text-center font-mono text-green-300 group-hover:text-green-200">
                      {strike.putLTP.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 text-center relative ${isMaxPut ? 'bg-green-500/10' : ''}`}>
                      <div className="font-mono text-gray-300 group-hover:text-white">{(strike.putOI / 100000).toFixed(2)}L</div>
                      {isMaxPut && <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-full"></span>}
                      {isMaxPut && <span className="absolute left-2 top-1 text-[9px] text-green-400 font-bold opacity-60">SUP</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OptionDashboard;
