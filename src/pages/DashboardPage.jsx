import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import SummaryCard from '../components/ui/SummaryCard';
import BalanceChart from '../components/charts/BalanceChart';
import SpendingBreakdown from '../components/charts/SpendingBreakdown';
import TransactionTable from '../components/ui/TransactionTable';
import InsightsView from '../components/ui/InsightsView';
import SettingsView from '../components/ui/SettingsView';
import { Wallet, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import './DashboardPage.css';

const DashboardPage = () => {
  const { transactions, activeTab } = useFinance();

  const { totalIncome, totalExpense, balance, chartData, spendingData, highestCategory } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};
    
    // Process transactions assuming they are already chronological, or we sort them by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = 0;
    const chart = [];

    sorted.forEach(t => {
      const amount = Number(t.amount);
      if (t.type === 'Income') {
        income += amount;
        runningBalance += amount;
      } else {
        expense += amount;
        runningBalance -= amount;
        
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
      }
      
      chart.push({
        date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: runningBalance
      });
    });

    const categories = Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key]
    })).sort((a, b) => b.value - a.value);

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      chartData: chart,
      spendingData: categories.slice(0, 5), // top 5
      highestCategory: categories[0]
    };
  }, [transactions]);

  return (
    <div className="dashboard-page">
      {activeTab === 'Dashboard' && (
        <>
          <div className="summary-grid">
            <SummaryCard 
              title="Total Balance" 
              amount={balance} 
              icon={Wallet} 
              colorClass="primary" 
              trend={12.5}
            />
            <SummaryCard 
              title="Total Income" 
              amount={totalIncome} 
              icon={TrendingUp} 
              colorClass="success" 
              trend={8.2}
            />
            <SummaryCard 
              title="Total Expenses" 
              amount={totalExpense} 
              icon={TrendingDown} 
              colorClass="danger" 
              trend={-2.4}
            />
          </div>

          <div className="charts-grid">
            <div className="chart-wrapper">
              <BalanceChart data={chartData} />
            </div>
            <div className="side-panel">
              <SpendingBreakdown data={spendingData} />
              <div className="insights-panel glass-panel">
                <div className="insights-header">
                  <Lightbulb size={20} color="var(--warning)" />
                  <h3>Smart Insights</h3>
                </div>
                <ul className="insights-list">
                  <li>
                    Your highest spending category is <strong>{highestCategory?.name || 'N/A'}</strong> at <strong>${highestCategory?.value?.toLocaleString() || 0}</strong>.
                  </li>
                  <li>
                    {balance > 0 ? "Great job! You are maintaining a positive cash flow with your recent transactions." : "Warning: Your expenses exceed your income, consider adjusting your budget."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <TransactionTable />
        </>
      )}
      
      {activeTab === 'Transactions' && <TransactionTable />}
      {activeTab === 'Insights' && <InsightsView />}
      {activeTab === 'Settings' && <SettingsView />}
    </div>
  );
};

export default DashboardPage;
