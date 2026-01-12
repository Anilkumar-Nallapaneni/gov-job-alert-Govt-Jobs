import React from 'react'
import './Education.css'

const Education: React.FC = () => {
  const educationData = {
    updates: [
      'University Time Table 2025 Announced - Check Schedule',
      'College Result 2025 Released - Download Marksheet',
      'Entrance Exam Date Sheet 2025 - Important Dates',
      'Admission Forms 2025-26 - Apply Online Now',
      'Scholarship Application Deadline Extended',
      'University Ranking 2025 Released - Top Colleges',
      'Online Course Registration Started',
      'Semester Exam Postponement Notice'
    ],
    notifications: [
      'NTA JEE Main Sessions II Exam Schedule 2025',
      'GATE 2025 Exam Date and Registration Details',
      'NEET UG 2025 Application Process Started',
      'CAT 2025 Admit Card Download Available',
      'UPSC Civil Services 2025 Notification Expected',
      'SSC CGL 2025 Tier 1 Exam Dates Announced',
      'Bank PO 2025 Recruitment Notification Soon',
      'Railway Group D 2025 Application Dates'
    ],
    results: [
      'University Semester Results 2025 Declared',
      'Board Exam 2025 Result - Check Online',
      'Entrance Exam Result 2025 - Merit List',
      'Diploma Result 2025 - Download Marksheet',
      'Professional Course Result 2025 Announced',
      'Distance Education Result 2025 Available',
      'Certificate Course Result 2025 Published',
      'Skill Development Exam Result 2025'
    ]
  }

  const EduSection: React.FC<{ title: string; items: string[]; icon?: string }> = ({ title, items, icon }) => (
    <div className="edu-section">
      <div className="edu-section-header">
        <span className="edu-icon">{icon}</span>
        <h3 className="edu-section-title">{title}</h3>
      </div>
      <div className="edu-section-content">
        <ul className="edu-list">
          {items.map((item, index) => (
            <li key={index} className="edu-item">
              <a href="#" className="edu-link">
                <span className="edu-bullet">•</span>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="edu-section-footer">
          <a href="/education" className="edu-view-all">
            View All {title} →
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="education-section">
      <div className="container">
        <div className="education-header">
          <h2 className="education-main-title">EDUCATION UPDATES</h2>
          <p className="education-subtitle">Latest educational news, results, and exam updates</p>
        </div>

        <div className="education-grid">
          <EduSection title="Latest Updates" items={educationData.updates} icon="📚" />
          <EduSection title="Exam Notifications" items={educationData.notifications} icon="📝" />
          <EduSection title="Results" items={educationData.results} icon="🏆" />
        </div>
      </div>
    </div>
  )
}

export default Education
