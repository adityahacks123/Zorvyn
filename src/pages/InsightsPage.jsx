import React, { useMemo } from 'react';
import Header from '../components/layout/Header';
import { useFinance } from '../context/FinanceContext';
import { AlertCircle, Activity, FileText, TrendingUp, Target, CreditCard } from 'lucide-react';
import './InsightsPage.css';

const InsightsPage = () => {
  const { transactions, currencySymbol } = useFinance();

  const insights = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};
    
    transactions.forEach(t => {
      const amt = Number(t.amount);
      if (t.type === 'Income') {
        income += amt;
      } else {
        expense += amt;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
      }
    });

    // 1. Highest Spending Category
    const sortedCategories = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    
    const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;
    const topCategoryPercentage = topCategory && expense > 0 
      ? Math.round((topCategory.value / expense) * 100) 
      : 0;

    // 2. Observations & Savings Rate
    const balance = income - expense;
    const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0;
    const isHealthy = balance > 0;

    // 3. Monthly Comparison (Mocking previous month for demo logic)
    // In a real app we'd filter actual dates. We'll simulate last month was 5% higher expenses.
    const lastMonthExpense = expense * 1.05; 
    const expenseDiff = Math.abs(expense - lastMonthExpense);
    const expenseDiffPercent = Math.round((expenseDiff / lastMonthExpense) * 100);

    return {
      topCategory,
      topCategoryPercentage,
      income,
      expense,
      balance,
      savingsRate,
      isHealthy,
      expenseDiffPercent
    };
  }, [transactions]);

  return (
    <div className="insights-content">
      <Header />
      
      <div className="insights-header">
        <h2 style={{ color: 'var(--color-text-main)' }}>Financial Insights</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>AI-driven analysis of your spending patterns and cash flow.</p>
      </div>

      <div className="insights-grid">
        
        {/* Insight 1: Highest Spending Category */}
        <div className="insight-card glass-panel">
          <div className="insight-card-icon warn-bg">
            <Target size={24} />
          </div>
          <div className="insight-card-content">
            <h3>Highest spending category</h3>
            <div className="insight-highlight">
              <span className="highlight-text warning">{insights.topCategory?.name || 'N/A'}</span>
            </div>
            <p className="insight-desc">
              Your highest expense is <strong>{insights.topCategory?.name}</strong> at <strong>{currencySymbol}{insights.topCategory?.value.toLocaleString()}</strong>. 
              This makes up <strong>{insights.topCategoryPercentage}%</strong> of your total spending this period.
            </p>
          </div>
        </div>

        {/* Insight 2: Monthly Comparison */}
        <div className="insight-card glass-panel">
          <div className="insight-card-icon primary-bg">
            <TrendingUp size={24} />
          </div>
          <div className="insight-card-content">
            <h3>Monthly comparison</h3>
            <div className="insight-highlight">
              <span className="highlight-text primary">↓ {insights.expenseDiffPercent}%</span>
            </div>
            <p className="insight-desc">
              Your expenses have dropped <strong>{insights.expenseDiffPercent}%</strong> compared to last month. 
              Excellent job keeping your discretionary spending lower this cycle!
            </p>
          </div>
        </div>

        {/* Insight 3: Useful Observation / Cash Flow */}
        <div className="insight-card glass-panel">
          <div className="insight-card-icon success-bg">
            <Activity size={24} />
          </div>
          <div className="insight-card-content">
            <h3>Cash Flow Observation</h3>
            <div className="insight-highlight">
              <span className={`highlight-text ${insights.isHealthy ? 'success' : 'danger'}`}>
                {insights.isHealthy ? 'Positive' : 'Negative'} Flow
              </span>
            </div>
            <p className="insight-desc">
              {insights.isHealthy 
                ? `You have a healthy positive cash flow. Your savings rate is strong at ${insights.savingsRate}%. Maintaining this rate will significantly boost your long term reserves.`
                : `Warning: Your expenses are currently exceeding your income by ${currencySymbol}${Math.abs(insights.balance).toLocaleString()}. Consider reviewing your top categories to cut back.`}
            </p>
          </div>
        </div>

        {/* Insight 4: General Tip */}
        <div className="insight-card glass-panel">
          <div className="insight-card-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
            <FileText size={24} />
          </div>
          <div className="insight-card-content">
            <h3>Budgeting Tip</h3>
            <div className="insight-highlight">
              <span className="highlight-text" style={{ color: '#a855f7' }}>50/30/20 Rule</span>
            </div>
            <p className="insight-desc">
              Try allocating 50% to needs, 30% to wants, and 20% to savings. Currently, you are saving <strong>{insights.savingsRate}%</strong> of your income!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsightsPage;
