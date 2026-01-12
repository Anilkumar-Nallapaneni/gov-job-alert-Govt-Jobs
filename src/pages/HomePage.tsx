import React, { useState } from 'react';
import JobSections from '../components/JobSections/JobSections';
import Education from '../components/Education/Education';
import { IndiaMap } from '../features/IndiaMap';
import StateJobsPage from './StateJobsPage';
import TopQuickLinks from '../components/Home/TopQuickLinks';
import SectionIntro from '../components/Common/SectionIntro';
import NewUpdatesSection from '../components/Home/NewUpdatesSection';
import EducationLinksSection from '../components/Home/EducationLinksSection';
import StateSelectionPanel from '../components/Home/StateSelectionPanel';
import CTASection from '../components/Home/CTASection';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (stateId: string) => setSelectedState(stateId);

  return (
    <div className="home-page">
      <TopQuickLinks />

      <section className="map-section">
        <div className="container">
          <SectionIntro
            title="Explore Jobs by State"
            subtitle="Click on any state to discover government job opportunities"
          />
          
          <div className="map-layout">
            <div className="map-container">
              <IndiaMap onStateClick={handleStateClick} />
            </div>

            <div className="state-panel">
              {selectedState ? (
                <div className="state-jobs-container">
                  <div className="state-jobs-header">
                    <h3>State Government Jobs</h3>
                    <button 
                      className="back-btn"
                      onClick={() => setSelectedState(null)}
                    >
                      ← Back
                    </button>
                  </div>
                  <div className="state-jobs-content">
                    <StateJobsPage stateId={selectedState} />
                  </div>
                </div>
              ) : (
                <StateSelectionPanel onStateClick={handleStateClick} />
              )}
            </div>
          </div>
        </div>
      </section>

      <NewUpdatesSection />
      
      {/* Education Links Section - moved back to HomePage */}
      <EducationLinksSection />
      
      <JobSections />
      <Education />
      <CTASection />
    </div>
  );
};

export default HomePage;

