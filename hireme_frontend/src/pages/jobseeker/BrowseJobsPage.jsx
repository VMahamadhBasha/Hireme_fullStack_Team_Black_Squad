import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/BrowseJobsPage.css';

function BrowseJobsPage({ user }) {
  var navigate = useNavigate();

  
  var [search, setSearch] = useState('');
  var [locationFilter, setLocationFilter] = useState('');
  var [jobs, setJobs] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');

  useEffect(function() {
    fetch('http://localhost:8080/jobs/all')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      setJobs(data);
      setLoading(false);
    })
    .catch(function() {
      setError('Failed to load jobs.');
      setLoading(false);
    });
  }, []);

  var filteredJobs = jobs.filter(function(job) {
    var matchSearch = search === '' ||
      job.title.toLowerCase().includes(search.toLowerCase());
    var matchLocation = locationFilter === '' ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchSearch && matchLocation;
  });

  if (loading) {
    return <div className="page-container"><p>Loading jobs...</p></div>;
  }

  return (
    <div className="page-container">

      <h1 className="page-title">Browse Jobs</h1>

      {error && <p className="error-msg">{error}</p>}

      <div className="search-bar card">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="🔍 Search job title..."
            value={search}
            onChange={function(e) { setSearch(e.target.value); }}
            className="search-input"
          />
          <input
            type="text"
            placeholder="📍 Location"
            value={locationFilter}
            onChange={function(e) { setLocationFilter(e.target.value); }}
            className="search-input"
          />
        </div>
      </div>

      <p className="results-count">{filteredJobs.length} jobs found</p>

      <div className="jobs-grid">

        {filteredJobs.length === 0 && (
          <div className="empty-state">No jobs found.</div>
        )}

        {filteredJobs.map(function(job) {
          return (
            <div className="job-card card" key={job.id}>

              <div className="job-card-top">
                <div className="job-company-logo">
                  {job.title.charAt(0).toUpperCase()}
                </div>
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.location}</p>
                </div>
                <span className="badge badge-green">OPEN</span>
              </div>

              <div className="job-meta">
                <span>📍 {job.location}</span>
                <span>💰 {job.salaryRange}</span>
                <span>📝 {job.description}</span>
              </div>

              <div className="job-card-actions">
                <button
                  className="btn-primary"
                  onClick={function() { navigate('/candidate/job/' + job.id); }}
                >
                  View Details
                </button>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default BrowseJobsPage;