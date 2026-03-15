import React, { useState } from 'react';
import '../../css/AllJobsPage.css';

function AllJobsPage() {

  var [search, setSearch] = useState('');
  var [location, setLocation] = useState('');
  var [status, setStatus] = useState('');

  // TODO: Uncomment when backend is ready
  // var [jobs, setJobs] = useState([]);
  // fetch('http://localhost:8080/api/jobs')
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setJobs(data); });

  var allJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Hyderabad', type: 'Full Time', salary: '6-8 LPA', applications: 12, posted: '2024-03-01', status: 'ACTIVE' },
    { id: 2, title: 'React Developer', company: 'Infosys', location: 'Bangalore', type: 'Full Time', salary: '8-12 LPA', applications: 8, posted: '2024-03-03', status: 'ACTIVE' },
    { id: 3, title: 'UI Engineer', company: 'Wipro', location: 'Chennai', type: 'Contract', salary: '5-7 LPA', applications: 15, posted: '2024-02-28', status: 'CLOSED' },
    { id: 4, title: 'Full Stack Developer', company: 'TCS', location: 'Pune', type: 'Full Time', salary: '10-14 LPA', applications: 12, posted: '2024-03-05', status: 'ACTIVE' },
    { id: 5, title: 'Java Developer', company: 'HCL', location: 'Hyderabad', type: 'Full Time', salary: '7-10 LPA', applications: 6, posted: '2024-03-06', status: 'ACTIVE' },
    { id: 6, title: 'Backend Engineer', company: 'Cognizant', location: 'Mumbai', type: 'Remote', salary: '9-13 LPA', applications: 9, posted: '2024-03-02', status: 'ACTIVE' },
    { id: 7, title: 'DevOps Engineer', company: 'Accenture', location: 'Bangalore', type: 'Full Time', salary: '12-16 LPA', applications: 4, posted: '2024-03-04', status: 'CLOSED' },
    { id: 8, title: 'Data Analyst', company: 'Capgemini', location: 'Chennai', type: 'Full Time', salary: '5-8 LPA', applications: 11, posted: '2024-03-07', status: 'ACTIVE' }
  ];

  var filteredJobs = allJobs.filter(function(job) {
    var matchSearch = search === '' || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase());
    var matchLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    var matchStatus = status === '' || job.status === status;
    return matchSearch && matchLocation && matchStatus;
  });

  function getStatusClass(status) {
    if (status === 'ACTIVE') return 'badge badge-green';
    if (status === 'CLOSED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  function getTypeBadge(type) {
    if (type === 'Full Time') return 'badge badge-blue';
    if (type === 'Remote') return 'badge badge-green';
    if (type === 'Contract') return 'badge badge-yellow';
    return 'badge badge-yellow';
  }

  return (
    <div className="page-container">

      <h1 className="page-title">All Jobs</h1>

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
            value={status}
            onChange={function(e) { setStatus(e.target.value); }}
            className="search-select"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <p className="results-count">{filteredJobs.length} jobs found</p>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Applications</th>
              <th>Posted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  No jobs found.
                </td>
              </tr>
            )}
            {filteredJobs.map(function(job) {
              return (
                <tr key={job.id}>
                  <td><strong>{job.title}</strong></td>
                  <td>{job.company}</td>
                  <td>📍 {job.location}</td>
                  <td><span className={getTypeBadge(job.type)}>{job.type}</span></td>
                  <td>{job.salary}</td>
                  <td>👥 {job.applications}</td>
                  <td>{job.posted}</td>
                  <td><span className={getStatusClass(job.status)}>{job.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AllJobsPage;