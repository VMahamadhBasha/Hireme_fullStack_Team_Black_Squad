import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PostJobPage.css';

function PostJobPage({ user }) {
  var navigate = useNavigate();

  var [title, setTitle] = useState('');
  var [description, setDescription] = useState('');
  var [location, setLocation] = useState('');
  var [salaryRange, setSalaryRange] = useState('');
  var [error, setError] = useState('');
  var [success, setSuccess] = useState('');

  function handlePostJob() {
    if (!title || !location || !salaryRange || !description) {
      setError('Please fill all fields');
      return;
    }
    if (!user || !user.id) {
      setError('User not logged in. Please login again.');
      return;
    }

    fetch('http://localhost:8080/job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        salaryRange: salaryRange,
        employerId: user.id
      })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Backend error: ' + res.status);
      return res.json();
    })
    .then(function(data) {
      if (data) {
        setSuccess('Job posted successfully!');
        setError('');
        setTimeout(function() { navigate('/employer/my-jobs'); }, 1500);
      } else {
        setError('Failed to post job. Try again.');
      }
    })
    .catch(function() { setError('Server error. Try again.'); });
  }

  return (
    <div className="page-container">

      <div className="post-job-header">
        <button className="back-btn" onClick={function() { navigate('/employer/dashboard'); }}>
          Back to Dashboard
        </button>
        <h1 className="page-title">Post a New Job</h1>
      </div>

      <div className="post-job-card card">

        <h2 className="form-section-title">Job Information</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" placeholder="e.g. Frontend Developer" value={title}
              onChange={function(e) { setTitle(e.target.value); }} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" placeholder="e.g. Hyderabad" value={location}
              onChange={function(e) { setLocation(e.target.value); }} />
          </div>
        </div>

        <div className="form-group">
          <label>Salary Range</label>
          <input type="text" placeholder="e.g. 6-8 LPA" value={salaryRange}
            onChange={function(e) { setSalaryRange(e.target.value); }} />
        </div>

        <h2 className="form-section-title">Job Details</h2>

        <div className="form-group">
          <label>Job Description</label>
          <textarea rows="4" placeholder="Describe the job role..." value={description}
            onChange={function(e) { setDescription(e.target.value); }} />
        </div>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <div className="post-job-actions">
          <button className="btn-secondary" onClick={function() { navigate('/employer/my-jobs'); }}>Cancel</button>
          <button className="btn-primary" onClick={handlePostJob}>Post Job</button>
        </div>

      </div>

    </div>
  );
}

export default PostJobPage;