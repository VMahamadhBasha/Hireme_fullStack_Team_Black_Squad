import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/RecruiterDashboard.css';

function RecruiterDashboard({ user }) {
  var navigate = useNavigate();

  // TODO: Uncomment when backend is ready
  // var [stats, setStats] = useState({ jobs: 0, applications: 0, interviews: 0, placed: 0 });
  // fetch('http://localhost:8080/api/recruiter/stats')
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setStats(data); });

  var stats = [
    { label: 'Total Jobs', value: 24, icon: '📋' },
    { label: 'Applications', value: 86, icon: '👥' },
    { label: 'Interviews Today', value: 5, icon: '🎯' },
    { label: 'Candidates Placed', value: 14, icon: '✅' }
  ];

  var recentApplications = [
    { id: 1, candidate: 'John Doe', job: 'Frontend Developer', company: 'TechCorp', date: '2024-03-06', status: 'INTERVIEW' },
    { id: 2, candidate: 'Jane Smith', job: 'React Developer', company: 'Infosys', date: '2024-03-05', status: 'APPLIED' },
    { id: 3, candidate: 'Mike Johnson', job: 'UI Engineer', company: 'Wipro', date: '2024-03-04', status: 'SELECTED' },
    { id: 4, candidate: 'Sara Lee', job: 'Full Stack Developer', company: 'TCS', date: '2024-03-03', status: 'REJECTED' }
  ];

  function getStatusClass(status) {
    if (status === 'APPLIED') return 'badge badge-blue';
    if (status === 'INTERVIEW') return 'badge badge-yellow';
    if (status === 'SELECTED') return 'badge badge-green';
    if (status === 'REJECTED') return 'badge badge-red';
    return 'badge badge-blue';
  }

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <div>
          <h1 className="page-title">Welcome, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">Manage all jobs, applications and interviews</p>
        </div>
        <button className="btn-primary" onClick={function() { navigate('/recruiter/schedule-interview'); }}>
          + Schedule Interview
        </button>
      </div>

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

      <div className="recruiter-grid">

        <div className="card">
          <div className="section-header">
            <h2>Recent Applications</h2>
            <button className="btn-secondary" onClick={function() { navigate('/recruiter/applications'); }}>
              View All
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map(function(app) {
                return (
                  <tr key={app.id}>
                    <td>{app.candidate}</td>
                    <td>{app.job}</td>
                    <td>{app.company}</td>
                    <td><span className={getStatusClass(app.status)}>{app.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions-list">

            <div className="quick-action-item" onClick={function() { navigate('/recruiter/all-jobs'); }}>
              <span className="quick-action-item-icon">📋</span>
              <div>
                <h4>View All Jobs</h4>
                <p>Browse and manage all job postings</p>
              </div>
            </div>

            <div className="quick-action-item" onClick={function() { navigate('/recruiter/applications'); }}>
              <span className="quick-action-item-icon">👥</span>
              <div>
                <h4>Manage Applications</h4>
                <p>Review and update application statuses</p>
              </div>
            </div>

            <div className="quick-action-item" onClick={function() { navigate('/recruiter/schedule-interview'); }}>
              <span className="quick-action-item-icon">🗓️</span>
              <div>
                <h4>Schedule Interview</h4>
                <p>Set up interviews for candidates</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default RecruiterDashboard;