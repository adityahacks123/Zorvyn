import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const SpendingBreakdown = ({ data }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 600 }}>Spending Breakdown</h3>
      <div style={{ display: 'flex', flex: 1, gap: '1rem', alignItems: 'center' }}>
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value}`}
              contentStyle={{ backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.map((entry, index) => (
            <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span style={{ color: 'var(--text-muted)' }}>{entry.name}</span>
              </div>
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
