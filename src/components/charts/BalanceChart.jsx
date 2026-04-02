import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const BalanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis 
           stroke="var(--color-text-muted)" 
           fontSize={12} 
           tickLine={false} 
           axisLine={false} 
           tickFormatter={(value) => `$${value/1000}k`} 
           domain={['dataMin - 1000', 'dataMax + 1000']}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
          itemStyle={{ color: 'var(--color-text-main)' }}
        />
        <Line type="monotone" dataKey="income" stroke="var(--color-success)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} strokeDasharray="5 5" name="Income" />
        <Line type="monotone" dataKey="balance" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} name="Balance" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
