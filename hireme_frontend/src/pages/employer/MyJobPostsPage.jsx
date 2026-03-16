import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/MyJobPostsPage.css';

function MyJobPostsPage({ user }) {
  var navigate = useNavigate();

  var [jobs, setJobs] = useState([]);
  var [filter, setFilter] = useState('ALL');
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');

  useEffect(function() {
    fetch('http://localhost:8080/jobs?employerId=' + user.id)
    .then(function(res) {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(function(data) {
      setJobs(data);
      setLoading(false);
    })
    .catch(function() {
      setError('Failed to load jobs.');
      setLoading(false);
    });
  }, [user.id]);

  var filteredJobs = jobs.filter(function(job) {
    if (filter === 'ALL') return true;
    return job.status === filter;
  });

  function handleClose(jobId) {
    fetch('http://localhost:8080/job/' + jobId + '/close', { method: 'PUT' })
    .then(function(res) {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(function() {
      setJobs(jobs.map(function(j) {
        return j.id === jobId ? Object.assign({}, j, { status: 'CLOSED' }) : j;
      }));
    })
    .catch(function() { setError('Failed to close job.'); });
  }

  function getStatusClass(status) {
    if (status === 'OPEN')   return 'badge badge-green';
    if (status === 'CLOSED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  if (loading) return <div className="page-container"><p>Loading jobs...</p></div>;

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <h1 className="page-title">My Job Posts</h1>
        <button className="btn-primary" onClick={function() { navigate('/employer/post-job'); }}>
          + Post New Job
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="filter-tabs">
        {['ALL', 'OPEN', 'CLOSED'].map(function(tab) {
          return (
            <button
              key={tab}
              className={filter === tab ? 'filter-tab active' : 'filter-tab'}
              onClick={function() { setFilter(tab); }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <p className="results-count">{filteredJobs.length} jobs found</p>

      <div className="job-posts-list">
        {filteredJobs.length === 0 && <div className="empty-state">No job posts found.</div>}
        {filteredJobs.map(function(job) {
          return (
            <div className="job-post-card card" key={job.id}>
              <div className="job-post-left">
                <div className="job-post-logo">{job.title.charAt(0)}</div>
                <div className="job-post-info">
                  <h3 className="job-post-title">{job.title}</h3>
                  <div className="job-post-meta">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salaryRange}</span>
                    <span>📝 {job.description}</span>
                  </div>
                </div>
              </div>
              <div className="job-post-right">
                <span className={getStatusClass(job.status)}>{job.status}</span>
                <div className="job-post-actions">
                  <button
                    className="btn-secondary small-btn"
                    onClick={function() { navigate('/employer/applicants/' + job.id); }}
                  >
                    View Applicants
                  </button>
                  {job.status === 'OPEN' && (
                    <button
                      className="btn-secondary small-btn"
                      onClick={function() { handleClose(job.id); }}
                    >
                      Close Job
                    </button>
                  )}
                  <button className="btn-danger small-btn" disabled title="Add @DeleteMapping in backend to enable">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default MyJobPostsPage;