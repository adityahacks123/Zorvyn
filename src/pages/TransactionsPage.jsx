import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { useFinance } from '../context/FinanceContext';
import { Plus, Download } from 'lucide-react';
import TransactionModal from '../components/ui/TransactionModal';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const { transactions, role, setRole, addTransaction, deleteTransaction, currencySymbol } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t => {
      // Type Filter
      if (filter !== 'All' && t.type !== filter) return false;
      
      // Search Filter
      if (searchTerm && !t.category.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  // CSV Export logic
  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount'];
    const rows = filteredTransactions.map(tx => [
      new Date(tx.date).toLocaleDateString(),
      tx.type,
      tx.category,
      tx.amount
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'zorvyn_transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="transactions-content">
      <Header />
      
      <div className="transactions-header">
        <h2 style={{ color: 'var(--color-text-main)' }}>All Transactions</h2>
        <div className="actions">
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="filter-dropdown glass-panel"
            style={{ width: '180px' }}
          />
          <button className="btn-outline-export" onClick={exportToCSV}>
            <Download size={18} />
            <span className="hide-mobile">Export CSV</span>
          </button>

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
              {role === 'Admin' && <th style={{ width: '50px' }}></th>}
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
                  {tx.type === 'Income' ? '+' : '-'}{currencySymbol}{Number(tx.amount).toLocaleString()}
                </td>
                {role === 'Admin' && (
                  <td style={{ textAlign: 'center' }}>
                     <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="btn-delete"
                        title="Delete Transaction"
                     >
                       <span style={{ fontSize: '18px', color: 'var(--color-text-muted)' }}>&times;</span>
                     </button>
                  </td>
                )}
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
