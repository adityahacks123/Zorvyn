import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, Plus } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import './Sidebar.css';

const Sidebar = () => {
  const { activeTab, setActiveTab, setIsModalOpen } = useFinance();

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Transactions', icon: Receipt, label: 'Transactions' },
    { id: 'Insights', icon: PieChart, label: 'Insights' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">Z</div>
        <h2>Zorvyn</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-action">
        <button className="add-transaction-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>
      <div className="sidebar-footer">
        <p>Premium UI Demo</p>
      </div>
    </aside>
  );
};

export default Sidebar;
