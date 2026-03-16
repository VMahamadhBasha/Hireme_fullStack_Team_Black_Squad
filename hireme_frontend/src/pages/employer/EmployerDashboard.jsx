import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/EmployerDashboard.css';

function EmployerDashboard({ user }) {
  var navigate = useNavigate();

  var [jobs, setJobs] = useState([]);
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
      setError('Failed to load dashboard data.');
      setLoading(false);
    });
  }, [user.id]);

  var totalJobs  = jobs.length;
  var openJobs   = jobs.filter(function(j) { return j.status === 'OPEN'; }).length;
  var closedJobs = jobs.filter(function(j) { return j.status === 'CLOSED'; }).length;

  var stats = [
    { label: 'Jobs Posted',    value: totalJobs,  icon: '📋' },
    { label: 'Open Jobs',      value: openJobs,   icon: '✅' },
    { label: 'Closed Jobs',    value: closedJobs, icon: '🔒' },
    { label: 'Total Listings', value: totalJobs,  icon: '👥' }
  ];

  var recentJobs = jobs.slice(0, 4);

  function getStatusClass(status) {
    if (status === 'OPEN')   return 'badge badge-green';
    if (status === 'CLOSED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  var displayName = user.name || user.email || 'User';

  if (loading) return <div className="page-container"><p>Loading dashboard...</p></div>;

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <div>
          <h1 className="page-title">Welcome, {displayName}! 👋</h1>
          <p className="dashboard-subtitle">Manage your job postings and find the best candidates</p>
        </div>
        <button className="btn-primary" onClick={function() { navigate('/employer/post-job'); }}>
          + Post New Job
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="stats-grid">
        {stats.map(function(stat, index) {
          return (
            <div className="stat-card" key={index}>
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="section-header">
          <h2>Recent Job Postings</h2>
          <button className="btn-secondary" onClick={function() { navigate('/employer/my-jobs'); }}>
            View All
          </button>
        </div>

        {recentJobs.length === 0 ? (
          <p style={{ padding: '20px', color: '#888' }}>No jobs posted yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Salary Range</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map(function(job) {
                return (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{job.salaryRange}</td>
                    <td><span className={getStatusClass(job.status)}>{job.status}</span></td>
                    <td>
                      <button
                        className="btn-secondary small-btn"
                        onClick={function() { navigate('/employer/applicants/' + job.id); }}
                      >
                        View Applicants
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default EmployerDashboard;