import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">Z</div>
        <h2>Zorvyn</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </li>
          <li>
            <Receipt size={20} />
            <span>Transactions</span>
          </li>
          <li>
            <PieChart size={20} />
            <span>Insights</span>
          </li>
          <li>
            <Settings size={20} />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>Premium UI Demo</p>
      </div>
    </aside>
  );
};

export default Sidebar;
