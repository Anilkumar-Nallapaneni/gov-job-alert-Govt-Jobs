import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StateGovtJobs, GovtJob } from '../types/GovtJobTypes';
import { stateGovtJobsData } from '../data/govtJobsData';
import './StateJobsPage.css';

interface StateJobsPageProps {
  stateId?: string;
}

const StateJobsPage: React.FC<StateJobsPageProps> = ({ stateId }) => {
  const { stateId: paramId } = useParams<{ stateId: string }>();
  const id = stateId || paramId;

  const [jobsData, setJobsData] = useState<StateGovtJobs | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadJobs = async () => {
      setError(null);
      setLoading(true);

      // Try fetching from API first
      const api = import.meta.env.VITE_JOBS_API;
      if (api) {
        try {
          const resp = await fetch(`${api}?state=${encodeURIComponent(id)}`);
          if (resp.ok) {
            const data = await resp.json() as StateGovtJobs;
            if (data?.jobs?.length > 0) {
              setJobsData(data);
              setLoading(false);
              return;
            }
          }
        } catch (err: any) {
          setError(err?.message || 'Failed to fetch live data');
        }
      }

      // Fallback to local data
      const local = stateGovtJobsData.find((s) => s.id === id);
      setJobsData(local || { id, stateName: id, jobs: [] });
      setLoading(false);
    };

    loadJobs();
  }, [id]);

  const JobCard: React.FC<{ job: GovtJob }> = ({ job }) => (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Department:</strong> {job.department}</p>
      <p><strong>Vacancies:</strong> {job.vacancies}</p>
      <p><strong>Last Date:</strong> {job.lastDate}</p>
      {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
      <div>
        <strong>Qualifications:</strong>
        <ul>
          {job.qualifications.map((qual, i) => (
            <li key={i}>{qual}</li>
          ))}
        </ul>
      </div>
      {job.applicationLink && (
        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="apply-button">
          Apply Now
        </a>
      )}
    </div>
  );

  const jobs = jobsData?.jobs ?? [];

  return (
    <div className="state-jobs-page">
      <h1>{jobsData?.stateName || id} — Government Jobs</h1>

      {loading && <p className="state-jobs-loading">Loading live jobs...</p>}
      {error && <p className="state-jobs-error">{error}</p>}

      {jobs.length > 0 ? (
        <div className="jobs-list">
          {jobs.map((job, i) => (
            <JobCard key={job.title || i} job={job} />
          ))}
        </div>
      ) : !loading && (
        <div className="placeholder">
          <p>No job listings found for this state.</p>
          <p>You can configure a live API by setting <code>VITE_JOBS_API</code> in your environment.</p>
        </div>
      )}
    </div>
  );
};

export default StateJobsPage;
