import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BalanceChart = ({ data }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', height: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 600 }}>Balance Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value > 999 ? (value/1000).toFixed(0) + 'k' : value}`} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-sidebar)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)', 
              backdropFilter: 'blur(12px)',
              color: '#fff' 
            }}
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: 'var(--primary)', strokeWidth: 1 }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
          <Line 
            name="Balance"
            type="monotone" 
            dataKey="balance" 
            stroke="var(--primary)" 
            strokeWidth={3} 
            dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
