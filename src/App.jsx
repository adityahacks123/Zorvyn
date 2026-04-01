import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { useFinance } from './context/FinanceContext';
import './index.css';

function App() {
  const { theme, toggleTheme, role, setRole } = useFinance();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          role={role} 
          setRole={setRole} 
        />
        <main className="page-content">
          <div className="glass-panel" style={{ padding: '2rem', marginTop: '1rem' }}>
            <h1>Welcome to Zorvyn Dashboard</h1>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              Your premium financial dashboard. Current role: {role}.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
