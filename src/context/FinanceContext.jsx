import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  // Load from local storage, fallback to mockData
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) return JSON.parse(saved);
    
    // If no saved data, ensure initial transactions are formatted correctly
    return initialTransactions.map(t => ({
      ...t,
      id: t.id || Math.random().toString(36).substr(2, 9),
      amount: Number(t.amount)
    }));
  });

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [role, setRole] = useState('Viewer');
  const [theme, setTheme] = useState(() => localStorage.getItem('finance_theme') || 'dark');
  const [filters, setFilters] = useState({ category: 'All', type: 'All' });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // CRUD Actions for Admin Role
  const addTransaction = (transaction) => {
    setTransactions(prev => [{ ...transaction, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    transactions,
    role, setRole,
    theme, toggleTheme,
    filters, setFilters,
    activeTab, setActiveTab,
    addTransaction, editTransaction, deleteTransaction
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
