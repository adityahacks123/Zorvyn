import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import { useFinance } from './context/FinanceContext';
import './index.css';

function App() {
  const { theme, toggleTheme, role, setRole } = useFinance();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'insights':
        return (
          <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'var(--color-text-muted)' }}>Insights (Coming Soon)</h2>
          </div>
        );
      case 'settings':
        return (
          <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'var(--color-text-muted)' }}>Settings (Coming Soon)</h2>
          </div>
        );
      default:
        return <DashboardPage />;
    }
  }

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
