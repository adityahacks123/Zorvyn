import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Edit2, Trash2, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import TransactionModal from './TransactionModal';
import './TransactionTable.css';

const TransactionTable = () => {
  const { transactions, role, addTransaction, editTransaction, deleteTransaction, filters, setFilters } = useFinance();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const itemsPerPage = 8;

  const filteredTransactions = transactions.filter(t => {
    const categoryMatch = filters.category === 'All' || t.category === filters.category;
    const typeMatch = filters.type === 'All' || t.type === filters.type;
    return categoryMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="transaction-section glass-panel">
      <div className="table-header">
        <div className="header-left">
          <h2>Recent Transactions</h2>
          <span className="transaction-count">{filteredTransactions.length} total</span>
        </div>
        <div className="header-actions">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select 
              value={filters.category} 
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="table-select"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select 
              value={filters.type} 
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="table-select"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          {role === 'Admin' && (
            <button className="add-btn" onClick={handleAdd}>
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              {role === 'Admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((t) => (
              <tr key={t.id} className="transaction-row">
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>
                  <span className="category-badge">{t.category}</span>
                </td>
                <td>{t.description}</td>
                <td>
                  <span className={`type-badge ${t.type.toLowerCase()}`}>{t.type}</span>
                </td>
                <td className={`amount-cell ${t.type.toLowerCase()}`}>
                  {t.type === 'Income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                </td>
                {role === 'Admin' && (
                  <td className="actions-cell">
                    <button 
                      className="action-btn edit" 
                      title="Edit"
                      onClick={() => handleEdit(t)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="pagination-info">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length}
        </div>
        <div className="pagination-controls">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="pagination-btn"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="page-number">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="pagination-btn"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default TransactionTable;
