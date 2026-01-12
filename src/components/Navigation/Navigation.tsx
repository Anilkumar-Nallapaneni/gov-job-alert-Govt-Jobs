import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const mainMenuItems = [
  { path: '/', label: 'Home' },
  { path: '/jobs', label: 'All India Govt Jobs' },
  { path: '/state', label: 'State Govt Jobs' },
  { path: '/bank-jobs', label: 'Bank Jobs' },
  { path: '/teaching-jobs', label: 'Teaching Jobs' },
  { path: '/engineering-jobs', label: 'Engineering Jobs' },
]

const quickLinks = [
  { path: '/admit-cards', label: 'Admit Cards' },
  { path: '/results', label: 'Results' },
  { path: '/answer-keys', label: 'Answer Keys' },
  { path: '/syllabus', label: 'Syllabus' },
]

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          {mainMenuItems.map((item, index) => (
            <Link key={index} to={item.path} className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="quick-links">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="quick-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
