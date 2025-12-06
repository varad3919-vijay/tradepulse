import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SectorPerformance as ISectorPerformance } from '../types';

interface Props {
  data: ISectorPerformance[];
}

const SectorPerformance: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-trade-card rounded-lg border border-trade-border p-4 h-[300px] flex flex-col">
      <h3 className="text-trade-muted text-xs font-bold uppercase mb-4 tracking-wider">Sector Performance</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={80} 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              itemStyle={{ color: '#f1f5f9' }}
              formatter={(value: number) => [`${value}%`, 'Change']}
              cursor={{fill: 'transparent'}}
            />
            <Bar dataKey="changePercent" radius={[0, 4, 4, 0]} barSize={15}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.changePercent >= 0 ? '#22c55e' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorPerformance;
