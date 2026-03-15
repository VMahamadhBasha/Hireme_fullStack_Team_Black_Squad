import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar({ user, onLogout }) {
  var navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">HireMe</Link>
      </div>

      <div className="navbar-links">

        {user.role === 'JOB_SEEKER' && (
          <>
            <Link to="/jobseeker/dashboard">Dashboard</Link>
            <Link to="/jobseeker/browse">Browse Jobs</Link>
            <Link to="/jobseeker/applications">My Applications</Link>
            <Link to="/jobseeker/profile">Profile</Link>
          </>
        )}

        {user.role === 'EMPLOYER' && (
          <>
            <Link to="/employer/dashboard">Dashboard</Link>
            <Link to="/employer/post-job">Post Job</Link>
            <Link to="/employer/my-jobs">My Jobs</Link>
          </>
        )}

        {user.role === 'RECRUITER' && (
          <>
            <Link to="/recruiter/dashboard">Dashboard</Link>
            <Link to="/recruiter/all-jobs">All Jobs</Link>
            <Link to="/recruiter/applications">Applications</Link>
            <Link to="/recruiter/schedule-interview">Schedule Interview</Link>
          </>
        )}

      </div>

      <div className="navbar-user">
        <span className="navbar-username">👤 {user.name}</span>
        <span className="navbar-role">{user.role.replace('_', ' ')}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;