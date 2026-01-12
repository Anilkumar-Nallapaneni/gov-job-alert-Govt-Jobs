import React from 'react'
import './Header.css'

const Header: React.FC = () => (
  <header className="site-header">
    <div className="header-container">
      <div className="logo-section">
        <div className="logo">
          <img src="/logo.png" alt="Gov Job Alert" className="logo-img" />
        </div>
        <div className="site-info">
          <h1 className="site-title">
            <a href="/">GovJobAlert.Com</a>
          </h1>
          <p className="site-tagline">Government Jobs | Results | Admit Cards</p>
        </div>
      </div>
      <div className="header-actions">
        <a
          href="https://play.google.com/store/apps/details?id=com.govjobalert"
          className="app-download-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="btn-icon" role="img" aria-label="mobile">📱</span>
          Download Mobile App
        </a>
      </div>
    </div>
  </header>
);

export default Header;
