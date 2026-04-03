import React from 'react';
import { MapPin, Sun, Moon, Menu } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme, role, setRole, setIsSidebarOpen } = useFinance();
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <div>
          <h1>Dashboard</h1>
          <span className="header-date">{currentDate}</span>
        </div>
      </div>
      
      <div className="header-actions">
        <div className="role-selector">
          <span className="role-label">Role:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="role-dropdown"
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button className="icon-btn outline" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="icon-btn outline" aria-label="Location">
          <MapPin size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
