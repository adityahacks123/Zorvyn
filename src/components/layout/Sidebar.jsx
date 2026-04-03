import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, Hexagon, X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { role, isSidebarOpen, setIsSidebarOpen } = useFinance();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Auto close sidebar on mobile after clicking
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="logo-icon-premium">
              <Hexagon size={24} strokeWidth={2.5} color="white" />
            </div>
            <h2 className="logo-text">Zorvyn</h2>
            
            <button className="mobile-close-btn" onClick={() => setIsSidebarOpen(false)}>
               <X size={24} />
            </button>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => handleNavClick('dashboard')}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </li>
              <li className={currentPage === 'transactions' ? 'active' : ''} onClick={() => handleNavClick('transactions')}>
                <Receipt size={20} />
                <span>Transactions</span>
              </li>
              <li className={currentPage === 'insights' ? 'active' : ''} onClick={() => handleNavClick('insights')}>
                <PieChart size={20} />
                <span>Insights</span>
              </li>
              <li className={currentPage === 'settings' ? 'active' : ''} onClick={() => handleNavClick('settings')}>
                <Settings size={20} />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </div>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AS</div>
          <div className="user-info">
            <span className="user-name">Aditya Singh</span>
            <span className="user-role">{role}</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
