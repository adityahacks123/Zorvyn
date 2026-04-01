import React from 'react';
import { Bell, Search, Moon, Sun, UserCircle } from 'lucide-react';
import './Header.css';

const Header = ({ theme, toggleTheme, role, setRole }) => {
  return (
    <header className="header glass-panel">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search transactions..." />
      </div>
      
      <div className="header-actions">
        {/* Role Toggle */}
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

        {/* Theme Toggle */}
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="icon-btn">
          <Bell size={20} />
        </button>
        
        <div className="user-profile">
          <UserCircle size={24} className="profile-icon" />
          <span>Alex Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
