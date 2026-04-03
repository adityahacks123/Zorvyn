import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { useFinance } from '../context/FinanceContext';
import { Moon, Sun, Bell, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
  const { theme, toggleTheme, resetData, currency, setCurrency } = useFinance();
  
  // Local state for mock UI toggles 
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const handleReset = () => {
    if(window.confirm('Are you sure you want to reset all data back to the default mock transactions? This cannot be undone.')){
        resetData();
        alert('Data successfully reset.');
    }
  };

  return (
    <div className="settings-content">
      <Header />
      
      <div className="settings-header">
        <h2 style={{ color: 'var(--color-text-main)' }}>Settings & Preferences</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Customize your dashboard experience.</p>
      </div>

      <div className="settings-grid">
        {/* Appearance Settings */}
        <section className="settings-section glass-panel">
          <h3>Appearance</h3>
          <p className="section-desc">Choose your preferred visual theme.</p>
          
          <div className="theme-options">
             <button 
                className={`theme-card ${theme === 'light' ? 'active' : ''}`}
                onClick={() => { if(theme !== 'light') toggleTheme() }}
             >
                <Sun size={24} className={theme==='light' ? 'text-primary' : 'text-muted'} />
                <span>Light Mode</span>
             </button>
             <button 
                className={`theme-card ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => { if(theme !== 'dark') toggleTheme() }}
             >
                <Moon size={24} className={theme==='dark' ? 'text-primary' : 'text-muted'}/>
                <span>Dark Mode</span>
             </button>
          </div>
        </section>

        {/* Global Configuration */}
        <section className="settings-section glass-panel">
          <h3>Local Preferences</h3>
          <p className="section-desc">Manage regional and data defaults.</p>
          
          <div className="preference-item">
             <div className="pref-info">
               <h4>Default Currency</h4>
               <span>This updates all numbers across your dashboard.</span>
             </div>
             <select value={currency} onChange={e => setCurrency(e.target.value)} className="settings-dropdown">
                 <option value="USD">USD ($)</option>
                 <option value="EUR">EUR (€)</option>
                 <option value="INR">INR (₹)</option>
                 <option value="GBP">GBP (£)</option>
             </select>
          </div>
        </section>

        {/* Notifications (Mock) */}
        <section className="settings-section glass-panel">
          <h3>Notifications</h3>
          <p className="section-desc">Manage you email and push alerts.</p>
          
          <div className="preference-item">
             <div className="pref-info">
               <div className="title-with-icon">
                 <Bell size={18} className="text-muted"/>
                 <h4>Email Alerts</h4>
               </div>
               <span>Get notified for unusually high expenses.</span>
             </div>
             <label className="switch">
               <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)}/>
               <span className="slider round"></span>
             </label>
          </div>
          
          <div className="preference-item">
             <div className="pref-info">
               <div className="title-with-icon">
                 <ShieldCheck size={18} className="text-muted"/>
                 <h4>Weekly Reports</h4>
               </div>
               <span>Receive a summary of your spending every Monday.</span>
             </div>
             <label className="switch">
               <input type="checkbox" checked={weeklyReport} onChange={() => setWeeklyReport(!weeklyReport)}/>
               <span className="slider round"></span>
             </label>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger-zone glass-panel">
          <h3>Danger Zone</h3>
          <p className="section-desc">Irreversible actions regarding your account data.</p>
          
          <div className="preference-item border-none">
             <div className="pref-info">
               <div className="title-with-icon">
                 <AlertTriangle size={18} color="var(--color-danger)"/>
                 <h4 className="text-danger">Reset All Data</h4>
               </div>
               <span>This will permanently wipe any custom transactions and reset to mock data.</span>
             </div>
             <button className="btn-danger" onClick={handleReset}>Reset Data</button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsPage;
