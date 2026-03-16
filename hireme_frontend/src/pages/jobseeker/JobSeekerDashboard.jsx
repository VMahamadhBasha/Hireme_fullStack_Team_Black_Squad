import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/JobSeekerDashboard.css';

function JobSeekerDashboard({ user }) {
  var navigate = useNavigate();

  var [applications, setApplications] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');

  useEffect(function() {
    fetch('http://localhost:8080/api/candidate/applications?candidateId=' + user.id)
    .then(function(res) {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(function(data) {
      setApplications(data);
      setLoading(false);
    })
    .catch(function() {
      setError('Failed to load applications.');
      setLoading(false);
    });
  }, [user.id]);

  var totalApplied  = applications.length;
  var shortlisted   = applications.filter(function(a) { return a.applicationStatus === 'SHORTLISTED'; }).length;
  var interviews    = applications.filter(function(a) { return a.applicationStatus === 'INTERVIEW'; }).length;
  var hired         = applications.filter(function(a) { return a.applicationStatus === 'HIRED'; }).length;

  var stats = [
    { label: 'Jobs Applied',  value: totalApplied, icon: '📋' },
    { label: 'Shortlisted',   value: shortlisted,  icon: '⭐' },
    { label: 'Interviews',    value: interviews,   icon: '🎯' },
    { label: 'Hired',         value: hired,        icon: '✅' }
  ];

  var recentApplications = applications.slice(0, 4);

  function getJobTitle(app) {
    if (app.job && app.job.title) return app.job.title;
    return 'Job #' + (app.jobId || app.id);
  }

  function getJobLocation(app) {
    if (app.job && app.job.location) return app.job.location;
    return '—';
  }

  function getStatusClass(status) {
    if (status === 'APPLIED')     return 'badge badge-blue';
    if (status === 'SHORTLISTED') return 'badge badge-yellow';
    if (status === 'INTERVIEW')   return 'badge badge-yellow';
    if (status === 'HIRED')       return 'badge badge-green';
    if (status === 'REJECTED')    return 'badge badge-red';
    return 'badge badge-blue';
  }

  var displayName = user.name || user.email || 'User';

  if (loading) return <div className="page-container"><p>Loading dashboard...</p></div>;

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <div>
          <h1 className="page-title">Welcome back, {displayName}! 👋</h1>
          <p className="dashboard-subtitle">Here's what's happening with your job search</p>
        </div>
        <button className="btn-primary" onClick={function() { navigate('/candidate/browse'); }}>
          Browse Jobs
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
          <h2>Recent Applications</h2>
          <button className="btn-secondary" onClick={function() { navigate('/candidate/applications'); }}>
            View All
          </button>
        </div>

        {recentApplications.length === 0 ? (
          <p style={{ padding: '20px', color: '#888' }}>
            No applications yet. Click "Browse Jobs" to get started!
          </p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map(function(app) {
                return (
                  <tr key={app.id}>
                    <td>{getJobTitle(app)}</td>
                    <td>{getJobLocation(app)}</td>
                    <td>{app.applyDate}</td>
                    <td><span className={getStatusClass(app.applicationStatus)}>{app.applicationStatus}</span></td>
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

export default JobSeekerDashboard;