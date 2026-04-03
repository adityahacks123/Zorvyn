import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, Hexagon } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { role } = useFinance();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <div className="logo-icon-premium">
            <Hexagon size={24} strokeWidth={2.5} color="white" />
          </div>
          <h2 className="logo-text">Zorvyn</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => setCurrentPage('dashboard')}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </li>
            <li className={currentPage === 'transactions' ? 'active' : ''} onClick={() => setCurrentPage('transactions')}>
              <Receipt size={20} />
              <span>Transactions</span>
            </li>
            <li className={currentPage === 'insights' ? 'active' : ''} onClick={() => setCurrentPage('insights')}>
              <PieChart size={20} />
              <span>Insights</span>
            </li>
            <li className={currentPage === 'settings' ? 'active' : ''} onClick={() => setCurrentPage('settings')}>
              <Settings size={20} />
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Alex Doe</span>
            <span className="user-role">{role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
