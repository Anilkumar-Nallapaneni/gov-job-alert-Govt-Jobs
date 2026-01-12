import React from 'react';
import SectionIntro from '../Common/SectionIntro';
import './NewUpdatesSection.css';

const DEFAULT_UPDATES = [
  'NABARD Officers Grade A Online Form 2025 - 91 Posts',
  'RRB NTPC 5,810 Online Form 2025 - Graduate Posts',
  'Intelligence Bureau ACIO II Tech Online Form - 258 Posts',
  'Territorial Army 1529 Soldier Offline Form 2025',
  'RRB JE Junior Engineer Online Form - 2570 Posts',
  'ONGC 2623 Apprentices Online Form 2025',
  'SBI SCO 103 Posts Online Form - Apply Now',
  'RITES Senior Technical Assistant 600 Posts'
] as const;

type NewUpdatesSectionProps = {
  updates?: readonly string[];
};

const NewUpdatesSection: React.FC<NewUpdatesSectionProps> = ({ updates = DEFAULT_UPDATES }) => (
  <section className="new-updates-section">
    <div className="container">
      <SectionIntro
        title="New Updates"
        subtitle="Recently announced job notifications and exam updates"
      />

      <div className="updates-grid">
        {updates.map((update, index) => (
          <article key={`${update}-${index}`} className="update-card">
            <div className="update-badge">New</div>
            <a href="#" className="update-link">
              {update}
            </a>
            <div className="update-meta">
              <span className="update-date">2 hours ago</span>
              <span className="update-category">Latest</span>
            </div>
          </article>
        ))}
      </div>

      <div className="section-footer">
        <a href="/new-updates" className="view-all-updates">
          View All New Updates →
        </a>
      </div>
    </div>
  </section>
);

export default NewUpdatesSection;


