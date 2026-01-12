import React, { useState } from 'react';
import './TopQuickLinks.css';

const QUICK_LINKS = [
  { name: 'All India Govt Jobs', icon: '🏛️', link: '/jobs', details: 'Browse all government job opportunities across India' },
  { name: 'State Govt Jobs', icon: '🗺️', link: '/state', details: 'Find government jobs by state' },
  { name: 'Bank Jobs', icon: '🏦', link: '/bank-jobs', details: 'Banking sector job notifications and recruitment' },
  { name: 'Teaching Jobs', icon: '👨‍🏫', link: '/teaching-jobs', details: 'Teaching positions in government schools and colleges' },
  { name: 'Engineering Jobs', icon: '⚙️', link: '/engineering-jobs', details: 'Engineering positions in government sectors' },
  { name: 'Admit Cards', icon: '🎫', link: '/admit-cards', details: 'Download admit cards for upcoming exams' },
  { name: 'Results', icon: '📊', link: '/results', details: 'Check exam results and merit lists' },
  { name: 'Answer Keys', icon: '🔑', link: '/answer-keys', details: 'Download answer keys for various exams' },
  { name: 'Syllabus', icon: '📚', link: '/syllabus', details: 'View syllabus for different government exams' }
] as const;

const TopQuickLinks: React.FC = () => {
  const [selectedQuickLink, setSelectedQuickLink] = useState<string | null>(null);
  const selectedLink = QUICK_LINKS.find((link) => link.name === selectedQuickLink);

  return (
    <section className="top-icon-sidebar-section">
      <div className="container">
        <div className="top-icon-sidebar">
          <div className="top-icon-bar">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.name}
                type="button"
                className={`top-icon-item ${selectedQuickLink === link.name ? 'active' : ''}`}
                onClick={() =>
                  setSelectedQuickLink(selectedQuickLink === link.name ? null : link.name)
                }
                title={link.name}
                aria-pressed={selectedQuickLink === link.name}
              >
                <span className="top-icon-emoji" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="top-icon-tooltip">{link.name}</span>
              </button>
            ))}
          </div>

          {selectedLink && (
            <div className="top-sidebar-details">
              <button
                className="close-details-btn"
                onClick={() => setSelectedQuickLink(null)}
                aria-label="Close quick link details"
              >
                ×
              </button>
              <div className="top-details-content">
                <div className="top-details-icon" aria-hidden="true">
                  {selectedLink.icon}
                </div>
                <h4>{selectedLink.name}</h4>
                <p>{selectedLink.details}</p>
                <a href={selectedLink.link} className="top-details-link">
                  Explore {selectedLink.name} →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopQuickLinks;


