import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/JobDetailsPage.css';

function JobDetailsPage({ user }) {
  var { id } = useParams();
  var navigate = useNavigate();

  var [job, setJob] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');
  var [coverLetter, setCoverLetter] = useState('');
  var [applied, setApplied] = useState(false);
  var [applying, setApplying] = useState(false);
  var [applyMsg, setApplyMsg] = useState('');

  useEffect(function() {
    fetch('http://localhost:8080/job/' + id)
    .then(function(res) {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then(function(data) {
      setJob(data);
      setLoading(false);
    })
    .catch(function() {
      setError('Failed to load job details.');
      setLoading(false);
    });
  }, [id]);

  function handleApply() {
    if (!coverLetter.trim()) {
      setApplyMsg('Please write a cover letter before applying.');
      return;
    }
    setApplying(true);
    setApplyMsg('');

    var url = 'http://localhost:8080/api/candidate/apply'
      + '?candidateId=' + user.id
      + '&jobId=' + id
      + '&coverLetter=' + encodeURIComponent(coverLetter);

    fetch(url, { method: 'POST' })
    .then(function(res) { return res.text(); })
    .then(function(msg) {
      if (msg === 'applied successfully') {
        setApplied(true);
        setApplyMsg('Application submitted successfully!');
      } else {
        setApplyMsg(msg);
      }
      setApplying(false);
    })
    .catch(function() {
      setApplyMsg('Failed to apply. Please try again.');
      setApplying(false);
    });
  }

  if (loading) return <div className="page-container"><p>Loading job details...</p></div>;

  if (error || !job) {
    return (
      <div className="page-container">
        <button className="back-btn" onClick={function() { navigate('/candidate/browse'); }}>← Back to Jobs</button>
        <p className="error-msg">{error || 'Job not found.'}</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <button className="back-btn" onClick={function() { navigate('/candidate/browse'); }}>
        ← Back to Jobs
      </button>

      <div className="job-details-card card">

        <div className="job-details-header">
          <div className="job-details-logo">{job.title.charAt(0)}</div>
          <div className="job-details-info">
            <h1 className="job-details-title">{job.title}</h1>
            <div className="job-details-meta">
              <span>📍 {job.location}</span>
              <span>💰 {job.salaryRange}</span>
              <span>📋 {job.status}</span>
            </div>
          </div>
        </div>

        <div className="job-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        {job.status === 'OPEN' && (
          <div className="job-section">
            <h2>Apply for this Job</h2>
            {applied ? (
              <p className="success-msg">✅ {applyMsg}</p>
            ) : (
              <>
                <div className="form-group">
                  <label>Cover Letter</label>
                  <textarea
                    rows="4"
                    placeholder="Write why you are a good fit for this role..."
                    value={coverLetter}
                    onChange={function(e) { setCoverLetter(e.target.value); }}
                  />
                </div>
                {applyMsg && <p className="error-msg">{applyMsg}</p>}
                <button
                  className="btn-primary"
                  onClick={handleApply}
                  disabled={applying}
                >
                  {applying ? 'Applying...' : 'Apply Now'}
                </button>
              </>
            )}
          </div>
        )}

        {job.status === 'CLOSED' && (
          <p className="error-msg">This job is no longer accepting applications.</p>
        )}

      </div>

    </div>
  );
}

export default JobDetailsPage;