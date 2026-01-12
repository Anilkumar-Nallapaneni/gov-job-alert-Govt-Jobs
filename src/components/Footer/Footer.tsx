import React from 'react'
import './Footer.css'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Job Notifications', path: '/jobs' },
  { label: 'Admit Cards', path: '/admit-cards' },
  { label: 'Results', path: '/results' },
]

const stateLinks = [
  'Andhra Pradesh', 'Maharashtra', 'Uttar Pradesh', 'Tamil Nadu',
  'Karnataka', 'Gujarat', 'Rajasthan', 'Madhya Pradesh'
]

const importantLinks = [
  'Privacy Policy', 'Terms & Conditions', 'Contact Us', 'About Us'
]

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, idx) => (
                <li key={idx}><a href={link.path} className="footer-link">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">States</h4>
            <ul className="footer-links">
              {stateLinks.map((state, idx) => (
                <li key={idx}><a href={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">{state}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Important</h4>
            <ul className="footer-links">
              {importantLinks.map((link, idx) => (
                <li key={idx}><a href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GovJobAlert.Com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
