import React from 'react'
import './JobSections.css'

const JobSections: React.FC = () => {
  const jobData = {
    notifications: [
      'RRB NTPC 5,810 Online Form 2025 - Apply Now',
      'Intelligence Bureau ACIO Tech Online Form 2025',
      'Territorial Army 1529 Soldier Offline Form 2025',
      'ONGC 2623 Apprentices Online Form 2025',
      'SBI 103 SCO Online Form 2025 - Last Date Approaching',
      'RITES 600 Senior Technical Assistant Online Form',
      'BRO 542 MSW, Vehicle Mechanic Offline Form',
      'PNB 750 LBO Online Form 2025 - Banking Jobs'
    ],
    admitCards: [
      'SBI Clerk Mains Admit Card 2025 - Download Now',
      'SSC CHSL Tier 1 Admit Card 2025 Released',
      'UPSC Indian Forest Service Mains Admit Card',
      'WBP SI Admit Card 2025 - PET/PMT Schedule',
      'MPSC Rajyaseva Admit Card 2025 Available',
      'IBPS Clerk Prelims Admit Card Coming Soon',
      'Railway Group D Admit Card 2025 Expected Date',
      'UP Police SI Admit Card - Check Exam City'
    ],
    results: [
      'Haryana TET Result 2025 Declared - Check Marks',
      'WBP SI Result 2025 - Final Merit List',
      'IBPS Clerk Prelims Result 2025 Scorecard',
      'SBI PO Mains Result 2025 - Interview Schedule',
      'RRB ALP Result 2025 - Technician Grade Cutoff',
      'SSC CGL Tier 1 Result 2025 Expected Soon',
      'Rajasthan Police Constable Result Final',
      'NICL AO Mains Result 2025 - Interview Call'
    ],
    stateJobs: [
      'BSSC 23175 Inter Level Online Form - Bihar',
      'WBSSC 8477 Group C and D Posts - West Bengal',
      'MP Police ASI, Subedar Online Form 2025',
      'Maharashtra Medical Officer 1440 Posts',
      'UP 1894 Junior Aided Teacher Recruitment',
      'Rajasthan REET Mains 7759 Teacher Posts',
      'Kerala High Court 255 Digitisation Officer',
      'Jharkhand Home Guard Online Form 2025'
    ]
  }

  const SectionBox: React.FC<{ title: string; items: string[]; viewAllLink: string; color?: string }> = ({ title, items, viewAllLink }) => (
    <div className="section-box">
      <div className={`section-header`}>
        <h3 className="section-title">{title}</h3>
      </div>
      <div className="section-content">
        <ul className="section-list">
          {items.map((item, index) => (
            <li key={index} className="section-item">
              <a href="#" className="item-link">
                <span className="item-bullet">›</span>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="section-footer">
          <a href={viewAllLink} className="view-all-btn">
            View All Updates →
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="job-sections">
      <div className="container">
        <h2 className="sections-main-title">Latest Updates</h2>
        <div className="sections-grid">
          <SectionBox title="Job Notifications" items={jobData.notifications} viewAllLink="/jobs" />
          <SectionBox title="Admit Cards" items={jobData.admitCards} viewAllLink="/admit-cards" />
          <SectionBox title="Results" items={jobData.results} viewAllLink="/results" />
          <SectionBox title="State Jobs" items={jobData.stateJobs} viewAllLink="/state-jobs" />
        </div>
      </div>
    </div>
  )
}

export default JobSections
