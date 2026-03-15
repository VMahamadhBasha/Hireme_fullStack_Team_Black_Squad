import React, { useState } from 'react';
import '../../css/ManageApplicationsPage.css';

function ManageApplicationsPage() {

  var [search, setSearch] = useState('');
  var [filter, setFilter] = useState('ALL');

  // TODO: Uncomment when backend is ready
  // var [applications, setApplications] = useState([]);
  // fetch('http://localhost:8080/api/applications')
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setApplications(data); });

  var [applications, setApplications] = useState([
    { id: 1, candidate: 'John Doe', email: 'john@test.com', job: 'Frontend Developer', company: 'TechCorp', appliedDate: '2024-03-01', status: 'APPLIED' },
    { id: 2, candidate: 'Jane Smith', email: 'jane@test.com', job: 'React Developer', company: 'Infosys', appliedDate: '2024-03-02', status: 'INTERVIEW' },
    { id: 3, candidate: 'Mike Johnson', email: 'mike@test.com', job: 'UI Engineer', company: 'Wipro', appliedDate: '2024-03-03', status: 'SELECTED' },
    { id: 4, candidate: 'Sara Lee', email: 'sara@test.com', job: 'Full Stack Developer', company: 'TCS', appliedDate: '2024-03-04', status: 'REJECTED' },
    { id: 5, candidate: 'Tom Brown', email: 'tom@test.com', job: 'Java Developer', company: 'HCL', appliedDate: '2024-03-05', status: 'APPLIED' },
    { id: 6, candidate: 'Amy White', email: 'amy@test.com', job: 'Backend Engineer', company: 'Cognizant', appliedDate: '2024-03-06', status: 'INTERVIEW' },
    { id: 7, candidate: 'Chris Black', email: 'chris@test.com', job: 'DevOps Engineer', company: 'Accenture', appliedDate: '2024-03-07', status: 'APPLIED' },
    { id: 8, candidate: 'Nina Green', email: 'nina@test.com', job: 'Data Analyst', company: 'Capgemini', appliedDate: '2024-03-08', status: 'SELECTED' }
  ]);

  var filteredApplications = applications.filter(function(app) {
    var matchSearch = search === '' ||
      app.candidate.toLowerCase().includes(search.toLowerCase()) ||
      app.job.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase());
    var matchFilter = filter === 'ALL' || app.status === filter;
    return matchSearch && matchFilter;
  });

  function handleStatusChange(appId, newStatus) {
    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/applications/' + appId + '/status', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function() {
    //   setApplications(applications.map(function(a) {
    //     return a.id === appId ? Object.assign({}, a, { status: newStatus }) : a;
    //   }));
    // });

    setApplications(applications.map(function(a) {
      return a.id === appId ? Object.assign({}, a, { status: newStatus }) : a;
    }));
  }

  function getStatusClass(status) {
    if (status === 'APPLIED') return 'badge badge-blue';
    if (status === 'INTERVIEW') return 'badge badge-yellow';
    if (status === 'SELECTED') return 'badge badge-green';
    if (status === 'REJECTED') return 'badge badge-red';
    return 'badge badge-blue';
  }

  return (
    <div className="page-container">

      <h1 className="page-title">Manage Applications</h1>

      <div className="search-bar card">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="🔍 Search candidate, job or company..."
            value={search}
            onChange={function(e) { setSearch(e.target.value); }}
            className="search-input"
          />
        </div>
      </div>

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
            <div className="manage-app-card card" key={app.id}>

              <div className="manage-app-left">
                <div className="manage-app-avatar">{app.candidate.charAt(0)}</div>
                <div className="manage-app-info">
                  <h3 className="manage-app-name">{app.candidate}</h3>
                  <p className="manage-app-email">✉️ {app.email}</p>
                  <div className="manage-app-meta">
                    <span>💼 {app.job}</span>
                    <span>🏢 {app.company}</span>
                    <span>📅 {app.appliedDate}</span>
                  </div>
                </div>
              </div>

              <div className="manage-app-right">
                <span className={getStatusClass(app.status)}>{app.status}</span>
                <select
                  className="status-select"
                  value={app.status}
                  onChange={function(e) { handleStatusChange(app.id, e.target.value); }}
                >
                  <option value="APPLIED">APPLIED</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="SELECTED">SELECTED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ManageApplicationsPage;