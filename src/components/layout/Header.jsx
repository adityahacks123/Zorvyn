import React from 'react';
import { MapPin } from 'lucide-react';
import './Header.css';

const Header = ({ theme, toggleTheme, role, setRole }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard</h1>
        <span className="header-date">{currentDate}</span>
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

        <button className="icon-btn outline" aria-label="Location">
          <MapPin size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
