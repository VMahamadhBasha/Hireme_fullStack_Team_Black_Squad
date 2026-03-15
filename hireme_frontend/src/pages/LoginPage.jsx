import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LoginPage.css';

function LoginPage({ onLogin }) {
  var navigate = useNavigate();

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [error, setError] = useState('');

  function handleLogin() {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.role) {
        localStorage.setItem('user', JSON.stringify(data));
        onLogin(data);
        if (data.role === 'CANDIDATE') navigate('/candidate/dashboard');
        if (data.role === 'EMPLOYER')  navigate('/employer/dashboard');
        if (data.role === 'RECRUITER') navigate('/recruiter/dashboard');
      } else {
        setError('Invalid email or password');
      }
    })
    .catch(function() {
      setError('Server error. Make sure backend is running on port 8080');
    });
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1 className="login-brand">HireMe</h1>
          <p className="login-subtitle">Find your dream job or perfect candidate</p>
        </div>

        <div className="login-form">
          <h2>Welcome Back</h2>
          <p className="login-desc">Login to your account</p>

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
              placeholder="Enter your password"
              value={password}
              onChange={function(e) { setPassword(e.target.value); }}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn-primary login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="login-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;