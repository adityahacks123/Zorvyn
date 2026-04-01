import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TrendingUp, TrendingDown, Target, Zap, AlertCircle } from 'lucide-react';
import './InsightsView.css';

const InsightsView = () => {
  const { transactions } = useFinance();

  const metrics = useMemo(() => {
    const income = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
    
    const categories = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

    return { income, expenses, savingsRate, topCategory };
  }, [transactions]);

  return (
    <div className="insights-view">
      <h2 className="view-title">Financial Insights</h2>
      
      <div className="insights-grid">
        <div className="insight-card glass-panel">
          <div className="insight-icon income">
            <TrendingUp size={24} />
          </div>
          <div className="insight-info">
            <h3>Savings Rate</h3>
            <p className="insight-value">{metrics.savingsRate.toFixed(1)}%</p>
            <p className="insight-desc">Percentage of income saved this month.</p>
          </div>
        </div>

        <div className="insight-card glass-panel">
          <div className="insight-icon warning">
            <Zap size={24} />
          </div>
          <div className="insight-info">
            <h3>Top Spending</h3>
            <p className="insight-value">{metrics.topCategory?.[0] || 'None'}</p>
            <p className="insight-desc">${metrics.topCategory?.[1]?.toLocaleString()} spent in this category.</p>
          </div>
        </div>
      </div>

      <div className="recommendations-section glass-panel">
        <h3>Smart Recommendations</h3>
        <div className="recommendation-item">
          <Target className="rec-icon" />
          <div>
            <h4>Budget Goal</h4>
            <p>You've spent {((metrics.expenses / metrics.income) * 100).toFixed(0)}% of your income. Aim to keep this below 70% for healthy savings.</p>
          </div>
        </div>
        <div className="recommendation-item">
          <AlertCircle className="rec-icon info" />
          <div>
            <h4>Optimization Tip</h4>
            <p>Reducing your <strong>{metrics.topCategory?.[0]}</strong> expenses by 10% could save you ${ (metrics.topCategory?.[1] * 0.1).toFixed(2) } monthly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsView;
