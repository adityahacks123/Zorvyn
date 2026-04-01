import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
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
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default App;
