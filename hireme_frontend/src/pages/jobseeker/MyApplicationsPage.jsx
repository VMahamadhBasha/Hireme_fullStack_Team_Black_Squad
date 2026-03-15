import React, { useState } from 'react';
import '../../css/MyApplicationsPage.css';

function MyApplicationsPage({ user }) {

  // TODO: Uncomment when backend is ready
  // var [applications, setApplications] = useState([]);
  // fetch('http://localhost:8080/api/applications/candidate/' + user.id)
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setApplications(data); });

  var applications = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Hyderabad', type: 'Full Time', salary: '6-8 LPA', appliedDate: '2024-03-01', status: 'APPLIED' },
    { id: 2, title: 'React Developer', company: 'Infosys', location: 'Bangalore', type: 'Full Time', salary: '8-12 LPA', appliedDate: '2024-03-03', status: 'INTERVIEW' },
    { id: 3, title: 'UI Engineer', company: 'Wipro', location: 'Chennai', type: 'Contract', salary: '5-7 LPA', appliedDate: '2024-02-28', status: 'REJECTED' },
    { id: 4, title: 'Full Stack Developer', company: 'TCS', location: 'Pune', type: 'Full Time', salary: '10-14 LPA', appliedDate: '2024-03-05', status: 'APPLIED' },
    { id: 5, title: 'Java Developer', company: 'HCL', location: 'Hyderabad', type: 'Full Time', salary: '7-10 LPA', appliedDate: '2024-03-06', status: 'SELECTED' }
  ];

  var [filter, setFilter] = useState('ALL');

  var filteredApplications = applications.filter(function(app) {
    if (filter === 'ALL') return true;
    return app.status === filter;
  });

  function getStatusClass(status) {
    if (status === 'APPLIED') return 'badge badge-blue';
    if (status === 'INTERVIEW') return 'badge badge-yellow';
    if (status === 'SELECTED') return 'badge badge-green';
    if (status === 'REJECTED') return 'badge badge-red';
    return 'badge badge-blue';
  }

  return (
    <div className="page-container">

      <h1 className="page-title">My Applications</h1>

      <div className="filter-tabs">
        {['ALL', 'APPLIED', 'INTERVIEW', 'SELECTED', 'REJECTED'].map(function(tab) {
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
                <div className="app-company-logo">{app.company.charAt(0)}</div>
                <div className="app-info">
                  <h3 className="app-title">{app.title}</h3>
                  <p className="app-company">{app.company}</p>
                  <div className="app-meta">
                    <span>📍 {app.location}</span>
                    <span>💼 {app.type}</span>
                    <span>💰 {app.salary}</span>
                  </div>
                </div>
              </div>
              <div className="application-right">
                <span className={getStatusClass(app.status)}>{app.status}</span>
                <p className="app-date">Applied: {app.appliedDate}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default MyApplicationsPage;