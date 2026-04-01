import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { User, Shield, Bell, Globe, Moon } from 'lucide-react';
import './SettingsView.css';

const SettingsView = () => {
  const { role, setRole, theme, toggleTheme } = useFinance();

  return (
    <div className="settings-view">
      <h2 className="view-title">Settings</h2>

      <div className="settings-container">
        <section className="settings-section glass-panel">
          <div className="section-header">
            <User size={20} className="section-icon" />
            <h3>Profile Settings</h3>
          </div>
          <div className="section-content">
            <div className="setting-row">
              <div className="setting-info">
                <label>User Role</label>
                <p>Change your access level within the application.</p>
              </div>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="setting-select">
                <option value="Viewer">Viewer (Read-only)</option>
                <option value="Admin">Admin (Full Control)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="settings-section glass-panel">
          <div className="section-header">
            <Moon size={20} className="section-icon" />
            <h3>Appearance</h3>
          </div>
          <div className="section-content">
            <div className="setting-row">
              <div className="setting-info">
                <label>Theme</label>
                <p>Toggle between light and dark mode.</p>
              </div>
              <button onClick={toggleTheme} className="setting-btn">
                {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
              </button>
            </div>
          </div>
        </section>

        <section className="settings-section glass-panel">
          <div className="section-header">
            <Shield size={20} className="section-icon" />
            <h3>Security & Privacy</h3>
          </div>
          <div className="section-content">
            <p className="coming-soon">Advanced security settings coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
