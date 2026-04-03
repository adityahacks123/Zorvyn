import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import './SummaryCard.css';

const SummaryCard = ({ title, amount, trend, icon: Icon, colorClass }) => {
  const { currencySymbol } = useFinance();
  return (
    <div className="summary-card glass-panel">
      <div className="card-top">
        <span className="card-title">{title}</span>
        {Icon && (
          <div className="card-icon-box">
            <Icon size={16} className={`icon-${colorClass}`} />
          </div>
        )}
      </div>
      <div className="card-bottom">
        <h2 className="card-amount">
          {currencySymbol}{amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </h2>
        {trend !== undefined && (
          <div className={`card-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            <span className="trend-arrow">{trend >= 0 ? '↑' : '↓'}</span>
            <span className="trend-value">{trend > 0 ? '+' : ''}{trend}% from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
