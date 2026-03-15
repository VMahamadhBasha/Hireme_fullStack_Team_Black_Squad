import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/ViewApplicantsPage.css';

function ViewApplicantsPage() {
  var { jobId } = useParams();
  var navigate = useNavigate();

  var [applicants, setApplicants] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');
  var [filter, setFilter] = useState('ALL');

  // fetch applicants when page loads
  useEffect(function() {
    fetch('http://localhost:8080/api/employer/applications?jobId=' + jobId)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      setApplicants(data);
      setLoading(false);
    })
    .catch(function() {
      setError('Failed to load applicants.');
      setLoading(false);
    });
  }, [jobId]);

  var filteredApplicants = applicants.filter(function(app) {
    if (filter === 'ALL') return true;
    return app.applicationStatus === filter;
  });

  function handleStatusChange(applicantId, newStatus) {
    fetch('http://localhost:8080/api/recruiter/application/' + applicantId + '?status=' + newStatus, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(res) { return res.json(); })
    .then(function() {
      // update status in UI without reloading
      setApplicants(applicants.map(function(a) {
        return a.id === applicantId
          ? Object.assign({}, a, { applicationStatus: newStatus })
          : a;
      }));
    })
    .catch(function() {
      setError('Failed to update status.');
    });
  }

  function getStatusClass(status) {
    if (status === 'APPLIED')     return 'badge badge-blue';
    if (status === 'SHORTLISTED') return 'badge badge-yellow';
    if (status === 'INTERVIEW')   return 'badge badge-yellow';
    if (status === 'HIRED')       return 'badge badge-green';
    if (status === 'REJECTED')    return 'badge badge-red';
    return 'badge badge-blue';
  }

  if (loading) {
    return <div className="page-container"><p>Loading applicants...</p></div>;
  }

  return (
    <div className="page-container">

      <button className="back-btn" onClick={function() { navigate('/employer/my-jobs'); }}>
        Back to My Jobs
      </button>

      <div className="dashboard-welcome">
        <h1 className="page-title">Applicants for Job #{jobId}</h1>
        <p className="dashboard-subtitle">{applicants.length} total applicants</p>
      </div>

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

      <p className="results-count">{filteredApplicants.length} applicants found</p>

      <div className="applicants-list">
        {filteredApplicants.length === 0 && (
          <div className="empty-state">No applicants found.</div>
        )}

        {filteredApplicants.map(function(applicant) {
          return (
            <div className="applicant-card card" key={applicant.id}>

              <div className="applicant-left">
                <div className="applicant-avatar">
                  {applicant.candidate
                    ? applicant.candidate.name.charAt(0)
                    : 'A'}
                </div>
                <div className="applicant-info">
                  <h3 className="applicant-name">
                    {applicant.candidate ? applicant.candidate.name : 'Unknown'}
                  </h3>
                  <div className="applicant-meta">
                    <span>✉️ {applicant.candidate ? applicant.candidate.email : '-'}</span>
                    <span>📅 Applied: {applicant.applyDate}</span>
                  </div>
                  <p className="applicant-skills">
                    📝 {applicant.coverLetter}
                  </p>
                </div>
              </div>

              <div className="applicant-right">
                <span className={getStatusClass(applicant.applicationStatus)}>
                  {applicant.applicationStatus}
                </span>
                <div className="applicant-actions">
                  <select
                    className="status-select"
                    value={applicant.applicationStatus}
                    onChange={function(e) { handleStatusChange(applicant.id, e.target.value); }}
                  >
                    <option value="APPLIED">APPLIED</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="INTERVIEW">INTERVIEW</option>
                    <option value="HIRED">HIRED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ViewApplicantsPage;