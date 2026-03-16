import React, { useState, useEffect } from 'react';
import '../../css/MyApplicationsPage.css';

function MyApplicationsPage({ user }) {

  var [applications, setApplications] = useState([]);
  var [filter, setFilter] = useState('ALL');
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

  var filteredApplications = applications.filter(function(app) {
    if (filter === 'ALL') return true;
    return app.applicationStatus === filter;
  });

  function getJobTitle(app) {
    if (app.job && app.job.title) return app.job.title;
    return 'Job #' + (app.jobId || app.id);
  }

  function getJobLocation(app) {
    if (app.job && app.job.location) return app.job.location;
    return '—';
  }

  function getJobSalary(app) {
    if (app.job && app.job.salaryRange) return app.job.salaryRange;
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

  if (loading) return <div className="page-container"><p>Loading applications...</p></div>;

  return (
    <div className="page-container">

      <h1 className="page-title">My Applications</h1>

      {error && <p className="error-msg">{error}</p>}

      <div className="filter-tabs">
        {['ALL', 'APPLIED', 'SHORTLISTED', 'INTERVIEW', 'HIRED', 'REJECTED'].map(function(tab) {
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

      <p className="results-count">{filteredApplications.length} applications found</p>

      <div className="applications-list">
        {filteredApplications.length === 0 && (
          <div className="empty-state">No applications found.</div>
        )}
        {filteredApplications.map(function(app) {
          return (
            <div className="application-card card" key={app.id}>
              <div className="application-left">
                <div className="app-company-logo">{getJobTitle(app).charAt(0)}</div>
                <div className="app-info">
                  <h3 className="app-title">{getJobTitle(app)}</h3>
                  <p className="app-company">{getJobLocation(app)}</p>
                  <div className="app-meta">
                    <span>📍 {getJobLocation(app)}</span>
                    <span>💰 {getJobSalary(app)}</span>
                  </div>
                  {app.coverLetter && (
                    <p className="app-cover-letter">📝 {app.coverLetter}</p>
                  )}
                </div>
              </div>
              <div className="application-right">
                <span className={getStatusClass(app.applicationStatus)}>
                  {app.applicationStatus}
                </span>
                <p className="app-date">Applied: {app.applyDate}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default MyApplicationsPage;