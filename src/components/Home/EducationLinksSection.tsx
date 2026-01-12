import React from 'react';
import SectionIntro from '../Common/SectionIntro';
import './TopQuickLinks.css';

const EducationLinksSection: React.FC = () => {
  const EDUCATION_LINKS = [
    { education: '10th Pass', count: '28,785 Jobs', link: '/jobs/10th' },
    { education: '12th Pass', count: '43,087 Jobs', link: '/jobs/12th' },
    { education: 'Diploma', count: '22,359 Jobs', link: '/jobs/diploma' },
    { education: 'ITI', count: '7,393 Jobs', link: '/jobs/iti' },
    { education: 'B.Tech/B.E', count: '10,640 Jobs', link: '/jobs/btech' },
    { education: 'Any Graduate', count: '18,920 Jobs', link: '/jobs/graduate' },
    { education: 'B.Com', count: '6,041 Jobs', link: '/jobs/bcom' },
    { education: 'Any Post Graduate', count: '1,736 Jobs', link: '/jobs/postgraduate' }
  ];

  return (
    <section className="education-links-section">
      <div className="container">
        <SectionIntro
          title="Jobs by Education Qualification"
          subtitle="Find government jobs based on your educational background"
        />
        <div className="education-grid">
          {EDUCATION_LINKS.map((job) => (
            <a key={job.education} href={job.link} className="education-card">
              <h3 className="education-title">{job.education}</h3>
              <p className="job-count">{job.count}</p>
              <div className="explore-link">Explore Jobs →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationLinksSection;
