import React, { useState, useEffect } from 'react';
import type { GovtJob } from '../types/GovtJobTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import '../pages/styles/Jobs.css';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<GovtJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    // Simulated API call - replace with actual API call
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs([
          {
            title: 'Railway Group D Recruitment 2025',
            department: 'Railway',
            vacancies: 1500,
            lastDate: '2025-12-31',
            qualifications: ['10th Pass', '12th Pass'],
            salary: '18000-56900',
            applicationLink: '#'
          },
          {
            title: 'Bank PO Recruitment 2025',
            department: 'Banking',
            vacancies: 2000,
            lastDate: '2025-12-25',
            qualifications: ['Graduation'],
            salary: '23700-42300',
            applicationLink: '#'
          }
        ]);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filter) ||
                         job.department.toLowerCase().includes(filter);
    const matchesDepartment = selectedDepartment === 'all' || 
                             job.department.toLowerCase() === selectedDepartment.toLowerCase();
    return matchesSearch && matchesDepartment;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="jobs-page container">
      <h1 className="section-main-title">All India Government Jobs</h1>
      
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search jobs..."
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="department-filter">
          <select 
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="department-select"
          >
            <option value="all">All Departments</option>
            <option value="railway">Railway</option>
            <option value="banking">Banking</option>
            <option value="defense">Defense</option>
            <option value="education">Education</option>
          </select>
        </div>
      </div>

      <section className="jobs-list">
        {filteredJobs.length === 0 ? (
          <div className="no-jobs-message">
            No jobs found matching your criteria
          </div>
        ) : (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <div className="job-details">
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Vacancies:</strong> {job.vacancies}</p>
                <p><strong>Last Date:</strong> {job.lastDate}</p>
                {job.salary && <p><strong>Salary:</strong> ₹{job.salary}</p>}
                <p><strong>Qualifications:</strong> {job.qualifications.join(', ')}</p>
              </div>
              {job.applicationLink && (
                <a 
                  href={job.applicationLink} 
                  className="apply-btn"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Apply Now
                </a>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Jobs;
