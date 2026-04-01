import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ title, amount, icon: Icon, trend, colorClass }) => {
  return (
    <div className={`summary-card glass-panel ${colorClass}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div className={`icon-wrapper ${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-amount">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        {trend !== undefined && (
          <p className={`card-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
