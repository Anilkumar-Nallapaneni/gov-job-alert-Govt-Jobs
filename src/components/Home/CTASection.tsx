import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Never Miss a Job Opportunity</h2>
          <p>Get instant notifications for new government jobs, admit cards, and results.</p>
          <div className="cta-buttons">
            <a href="/register" className="cta-btn primary">Create Free Account</a>
            <a href="/download" className="cta-btn secondary">📱 Download Mobile App</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
