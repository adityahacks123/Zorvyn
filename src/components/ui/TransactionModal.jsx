import React, { useState } from 'react';
import { X } from 'lucide-react';
import './TransactionModal.css';

const TransactionModal = ({ isOpen, onClose, onSave, transaction = null }) => {
  const [formData, setFormData] = useState(transaction || {
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    description: '',
    type: 'Expense'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: Number(formData.amount)
    });
    onClose();
  };

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Other'];

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Type</label>
            <div className="type-toggle">
              <button 
                type="button" 
                className={formData.type === 'Income' ? 'active income' : ''} 
                onClick={() => setFormData({...formData, type: 'Income'})}
              >
                Income
              </button>
              <button 
                type="button" 
                className={formData.type === 'Expense' ? 'active expense' : ''} 
                onClick={() => setFormData({...formData, type: 'Expense'})}
              >
                Expense
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Amount</label>
              <input 
                type="number" 
                required 
                value={formData.amount} 
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                required 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select 
              required 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input 
              type="text" 
              required 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What was this for?"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
