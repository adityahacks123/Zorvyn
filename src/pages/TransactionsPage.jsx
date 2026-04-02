import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { useFinance } from '../context/FinanceContext';
import { Plus } from 'lucide-react';
import TransactionModal from '../components/ui/TransactionModal';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const { transactions, role, setRole, addTransaction } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const filteredTransactions = transactions.filter(t => {
      if (filter === 'All') return true;
      return t.type === filter;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="transactions-content">
      <Header theme="dark" role={role} setRole={setRole} />
      
      <div className="transactions-header">
        <h2 style={{ color: 'var(--color-text-main)' }}>All Transactions</h2>
        <div className="actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown glass-panel">
            <option value="All">All Types</option>
            <option value="Income">Income Only</option>
            <option value="Expense">Expense Only</option>
          </select>

          {role === 'Admin' && (
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <div className="transactions-table-container glass-panel">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th className="align-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>
                   <div className="tx-cell-category">
                     <div className={`tx-dot ${tx.type === 'Income' ? 'success' : 'primary'}`}></div>
                     {tx.category}
                   </div>
                </td>
                <td>{tx.type}</td>
                <td className={`align-right tx-amount ${tx.type === 'Income' ? 'positive' : 'negative'}`}>
                  {tx.type === 'Income' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TransactionModal 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={(data) => {
                addTransaction(data);
                setIsModalOpen(false);
            }} 
        />
      )}
    </div>
  );
};

export default TransactionsPage;
