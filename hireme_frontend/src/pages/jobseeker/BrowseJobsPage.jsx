import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/BrowseJobsPage.css';

function BrowseJobsPage() {
  var navigate = useNavigate();

  var [search, setSearch] = useState('');
  var [location, setLocation] = useState('');
  var [jobType, setJobType] = useState('');

  // TODO: Uncomment when backend is ready
  // var [jobs, setJobs] = useState([]);
  // fetch('http://localhost:8080/api/jobs')
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setJobs(data); });

  var allJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Hyderabad', type: 'Full Time', salary: '6-8 LPA', posted: '2 days ago' },
    { id: 2, title: 'React Developer', company: 'Infosys', location: 'Bangalore', type: 'Full Time', salary: '8-12 LPA', posted: '1 day ago' },
    { id: 3, title: 'UI Engineer', company: 'Wipro', location: 'Chennai', type: 'Contract', salary: '5-7 LPA', posted: '3 days ago' },
    { id: 4, title: 'Full Stack Developer', company: 'TCS', location: 'Pune', type: 'Full Time', salary: '10-14 LPA', posted: '5 days ago' },
    { id: 5, title: 'Java Developer', company: 'HCL', location: 'Hyderabad', type: 'Full Time', salary: '7-10 LPA', posted: '1 day ago' },
    { id: 6, title: 'Backend Engineer', company: 'Cognizant', location: 'Mumbai', type: 'Remote', salary: '9-13 LPA', posted: '4 days ago' },
    { id: 7, title: 'DevOps Engineer', company: 'Accenture', location: 'Bangalore', type: 'Full Time', salary: '12-16 LPA', posted: '2 days ago' },
    { id: 8, title: 'Data Analyst', company: 'Capgemini', location: 'Chennai', type: 'Full Time', salary: '5-8 LPA', posted: '6 days ago' }
  ];

  var filteredJobs = allJobs.filter(function(job) {
    var matchSearch = search === '' || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase());
    var matchLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    var matchType = jobType === '' || job.type === jobType;
    return matchSearch && matchLocation && matchType;
  });

  function getTypeBadge(type) {
    if (type === 'Full Time') return 'badge badge-green';
    if (type === 'Remote') return 'badge badge-blue';
    if (type === 'Contract') return 'badge badge-yellow';
    return 'badge badge-yellow';
  }

  return (
    <div className="page-container">

      <h1 className="page-title">Browse Jobs</h1>

      <div className="search-bar card">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="🔍 Search job title or company..."
            value={search}
            onChange={function(e) { setSearch(e.target.value); }}
            className="search-input"
          />
          <input
            type="text"
            placeholder="📍 Location"
            value={location}
            onChange={function(e) { setLocation(e.target.value); }}
            className="search-input"
          />
          <select
            value={jobType}
            onChange={function(e) { setJobType(e.target.value); }}
            className="search-select"
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>

      <p className="results-count">{filteredJobs.length} jobs found</p>

      <div className="jobs-grid">
        {filteredJobs.length === 0 && (
          <div className="empty-state">No jobs found matching your search.</div>
        )}
        {filteredJobs.map(function(job) {
          return (
            <div className="job-card card" key={job.id}>
              <div className="job-card-top">
                <div className="job-company-logo">{job.company.charAt(0)}</div>
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                </div>
                <span className={getTypeBadge(job.type)}>{job.type}</span>
              </div>

              <div className="job-meta">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>🕐 {job.posted}</span>
              </div>

              <div className="job-card-actions">
                <button
                  className="btn-primary"
                  onClick={function() { navigate('/jobseeker/job/' + job.id); }}
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