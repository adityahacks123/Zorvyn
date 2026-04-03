import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import SummaryCard from '../components/ui/SummaryCard';
import BalanceChart from '../components/charts/BalanceChart';
import SpendingBreakdown from '../components/charts/SpendingBreakdown';
import Header from '../components/layout/Header';
import { Wallet, TrendingUp, TrendingDown, AlertCircle, Activity, FileText } from 'lucide-react';
import './DashboardPage.css';

const DashboardPage = () => {
  const { transactions, role, setRole, currencySymbol } = useFinance();

  const { totalIncome, totalExpense, balance, chartData, spendingData, highestCategory, recentTransactions } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryTotals = {};
    
    // Process transactions
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = Math.floor(Math.random() * 5000) + 4000;
    const chart = [];

    // Mock 6 months data for the line chart (Nov to Apr)
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    let runningIncome = 8000;
    months.forEach((m, idx) => {
        runningBalance += 1000 + (Math.random() * 500);
        runningIncome += 800 + (Math.random() * 400);
        chart.push({
            date: m,
            balance: runningBalance,
            income: runningIncome
        });
    });

    sorted.forEach(t => {
      const amount = Number(t.amount);
      if (t.type === 'Income') {
        income += amount;
      } else {
        expense += amount;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
      }
    });

    const categories = Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key]
    })).sort((a, b) => b.value - a.value);

    // Get recent transactions for the list mapping
    const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      chartData: chart,
      spendingData: categories.slice(0, 5),
      highestCategory: categories[0] || { name: 'None', value: 0 },
      recentTransactions: recent
    };
  }, [transactions]);

  return (
    <div className="dashboard-content">
      <Header theme="dark" role={role} setRole={setRole} />

      <div className="summary-grid">
        <SummaryCard 
          title="Total balance" 
          amount={balance} 
          icon={Wallet} 
          colorClass="primary" 
          trend={12.5}
        />
        <SummaryCard 
          title="Total income" 
          amount={totalIncome} 
          icon={TrendingUp} 
          colorClass="success" 
          trend={8.2}
        />
        <SummaryCard 
          title="Total expenses" 
          amount={totalExpense} 
          icon={TrendingDown} 
          colorClass="danger" 
          trend={-2.4}
        />
      </div>

      <div className="charts-grid style-2col">
        <div className="chart-panel glass-panel">
          <div className="panel-header">
            <h3>Balance trend</h3>
            <span className="badge">6 months</span>
          </div>
          <div className="panel-body">
            <BalanceChart data={chartData} />
          </div>
        </div>

        <div className="chart-panel glass-panel">
          <div className="panel-header">
            <h3>Spending breakdown</h3>
          </div>
          <div className="panel-body">
             <SpendingBreakdown data={spendingData} />
          </div>
        </div>
      </div>

      <div className="bottom-grid style-2col">
        <div className="smart-insights glass-panel">
          <h3 className="panel-title">Smart insights</h3>
          <div className="insights-list">
             <div className="insight-item">
                <div className="insight-icon warn-bg"><AlertCircle size={18} /></div>
                <div className="insight-text">
                  <h4>Top spending category</h4>
                  <p>{highestCategory.name} is your highest expense at {currencySymbol}{highestCategory.value.toLocaleString()} — 64% of total spending this month.</p>
                </div>
             </div>
             <div className="insight-item">
                <div className="insight-icon success-bg"><Activity size={18} /></div>
                <div className="insight-text">
                  <h4>Positive cash flow</h4>
                  <p>You saved {currencySymbol}{balance.toLocaleString()} this month. Savings rate is 85% — excellent!</p>
                </div>
             </div>
             <div className="insight-item">
                <div className="insight-icon primary-bg"><FileText size={18} /></div>
                <div className="insight-text">
                  <h4>Monthly comparison</h4>
                  <p>Expenses dropped 2.4% vs last month. Food spend increased by {currencySymbol}45.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="recent-transactions glass-panel">
           <h3 className="panel-title">Recent transactions</h3>
           <div className="transactions-list">
              {recentTransactions.map((tx, idx) => (
                <div className="tx-item" key={idx}>
                  <div className="tx-info">
                    <div className={`tx-dot ${tx.type === 'Income' ? 'success' : 'primary'}`}></div>
                    <div>
                      <div className="tx-title">{tx.category} {tx.type === 'Income' ? 'deposit' : 'payment'}</div>
                      <div className="tx-subtitle">{tx.category}</div>
                    </div>
                  </div>
                  <div className={`tx-amount ${tx.type === 'Income' ? 'positive' : 'negative'}`}>
                    {tx.type === 'Income' ? '+' : '-'}{currencySymbol}{Number(tx.amount).toLocaleString()}
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
