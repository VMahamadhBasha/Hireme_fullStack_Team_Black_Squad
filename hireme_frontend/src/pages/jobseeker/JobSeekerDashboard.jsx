import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/JobSeekerDashboard.css';

function JobSeekerDashboard({ user }) {
  var navigate = useNavigate();

  // TODO: Uncomment when backend is ready
  // var [stats, setStats] = useState({ applied: 0, interviews: 0, saved: 0 });
  // fetch('http://localhost:8080/api/jobseeker/stats?userId=' + user.id)
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setStats(data); });

  var stats = [
    { label: 'Jobs Applied', value: 12, icon: '📋' },
    { label: 'Interviews', value: 3, icon: '🎯' },
    { label: 'Saved Jobs', value: 7, icon: '🔖' },
    { label: 'Profile Views', value: 24, icon: '👁️' }
  ];

  var recentJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Hyderabad', status: 'APPLIED' },
    { id: 2, title: 'React Developer', company: 'Infosys', location: 'Bangalore', status: 'INTERVIEW' },
    { id: 3, title: 'UI Engineer', company: 'Wipro', location: 'Chennai', status: 'REJECTED' },
    { id: 4, title: 'Full Stack Developer', company: 'TCS', location: 'Pune', status: 'APPLIED' }
  ];

  function getStatusClass(status) {
    if (status === 'APPLIED') return 'badge badge-blue';
    if (status === 'INTERVIEW') return 'badge badge-green';
    if (status === 'REJECTED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  return (
    <div className="page-container">

      <div className="dashboard-welcome">
        <div>
          <h1 className="page-title">Welcome back, {user.name}! 👋</h1>
          <p className="dashboard-subtitle">Here's what's happening with your job search</p>
        </div>
        <button className="btn-primary" onClick={function() { navigate('/jobseeker/browse'); }}>
          Browse Jobs
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

      <div className="card">
        <div className="section-header">
          <h2>Recent Applications</h2>
          <button className="btn-secondary" onClick={function() { navigate('/jobseeker/applications'); }}>
            View All
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map(function(job) {
              return (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
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

export default JobSeekerDashboard;