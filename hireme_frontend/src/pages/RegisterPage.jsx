import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/RegisterPage.css';

function RegisterPage() {
  var navigate = useNavigate();

  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [role, setRole] = useState('CANDIDATE');
  var [error, setError] = useState('');
  var [success, setSuccess] = useState('');

  function handleRegister() {
    if (!name || !email || !password || !role) {
      setError('Please fill all fields');
      return;
    }

    fetch('http://localhost:8080/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
        role: role
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.id) {
        setSuccess('Registration successful! Please login.');
        setError('');
        setTimeout(function() { navigate('/login'); }, 1500);
      } else {
        setError(data);
      }
    })
    .catch(function() {
      setError('Server error. Make sure backend is running on port 8080');
    });
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1 className="register-brand">HireMe</h1>
          <p className="register-subtitle">Join thousands of job seekers and employers</p>
        </div>

        <div className="register-form">
          <h2>Create Account</h2>
          <p className="register-desc">Register to get started</p>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={function(e) { setName(e.target.value); }}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={function(e) { setEmail(e.target.value); }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={function(e) { setPassword(e.target.value); }}
            />
          </div>

          <div className="form-group">
            <label>Register As</label>
            <select
              value={role}
              onChange={function(e) { setRole(e.target.value); }}
            >
              <option value="CANDIDATE">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
              <option value="RECRUITER">Recruiter</option>
            </select>
          </div>

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button className="btn-primary register-btn" onClick={handleRegister}>
            Register
          </button>

          <p className="register-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;
