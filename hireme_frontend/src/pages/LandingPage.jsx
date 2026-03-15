import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/LandingPage.css';

function LandingPage({ onLogin }) {
  var navigate = useNavigate();

  var [search, setSearch] = useState('');
  var [location, setLocation] = useState('');

  function handleSearch() {
    navigate('/login');
  }

  var featuredJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      description: 'We are looking for an experienced Frontend Developer to join our team and help build cutting-edge...',
      posted: '2026-03-08'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataStream',
      location: 'Remote',
      salary: '$110,000 - $140,000',
      type: 'Full-time',
      description: 'Join our backend team to build scalable APIs and microservices.',
      posted: '2026-03-07'
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'DesignHub',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      type: 'Full-time',
      description: 'Create beautiful and intuitive user experiences for our products.',
      posted: '2026-03-06'
    }
  ];

  var stats = [
    { icon: '💼', value: '10,000+', label: 'Active Jobs' },
    { icon: '🏢', value: '5,000+', label: 'Companies' },
    { icon: '📈', value: '50,000+', label: 'Job Seekers' },
    { icon: '✅', value: '25,000+', label: 'Placements' }
  ];

  var features = [
    {
      icon: '🔍',
      title: 'Smart Job Matching',
      description: 'Our AI-powered algorithm matches you with the perfect job opportunities based on your skills and preferences.'
    },
    {
      icon: '💼',
      title: 'Easy Applications',
      description: 'Apply to multiple jobs with a single click. Track all your applications in one convenient dashboard.'
    },
    {
      icon: '👥',
      title: 'Employer Profiles',
      description: 'Get insights into company culture, benefits, and growth opportunities before you apply.'
    }
  ];

  var popularTags = ['Frontend Developer', 'Backend Engineer', 'Product Manager', 'UX Designer'];

  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <div className="landing-logo-icon">💼</div>
            <span>HireMe</span>
          </div>
          <div className="landing-nav-links">
            <Link to="/login" className="landing-nav-link">Find Jobs</Link>
          </div>
          <div className="landing-nav-actions">
            <Link to="/login" className="landing-signin-btn">Sign In</Link>
            <Link to="/register" className="landing-getstarted-btn">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your <span className="hero-highlight">Dream Job</span> Today
          </h1>
          <p className="hero-subtitle">
            Connect with top companies looking for talented individuals like you. Your
            next career opportunity is just a click away.
          </p>

          <div className="hero-search-box">
            <div className="hero-search-input-wrap">
              <span className="hero-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={search}
                onChange={function(e) { setSearch(e.target.value); }}
                className="hero-search-input"
              />
            </div>
            <div className="hero-search-divider"></div>
            <div className="hero-search-input-wrap">
              <span className="hero-search-icon">📍</span>
              <input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={function(e) { setLocation(e.target.value); }}
                className="hero-search-input"
              />
            </div>
            <button className="hero-search-btn" onClick={handleSearch}>
              Search Jobs
            </button>
          </div>

          <div className="hero-popular">
            <span className="hero-popular-label">Popular:</span>
            {popularTags.map(function(tag, index) {
              return (
                <button key={index} className="hero-popular-tag" onClick={function() { navigate('/login'); }}>
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stats-inner">
          {stats.map(function(stat, index) {
            return (
              <div className="landing-stat" key={index}>
                <div className="landing-stat-icon">{stat.icon}</div>
                <div className="landing-stat-value">{stat.value}</div>
                <div className="landing-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED JOBS SECTION */}
      <section className="featured-section">
        <div className="featured-inner">
          <div className="featured-header">
            <div>
              <h2 className="featured-title">Featured Jobs</h2>
              <p className="featured-subtitle">Handpicked opportunities from top companies</p>
            </div>
            <button className="view-all-btn" onClick={function() { navigate('/login'); }}>
              View All Jobs →
            </button>
          </div>

          <div className="featured-jobs-grid">
            {featuredJobs.map(function(job) {
              return (
                <div className="featured-job-card" key={job.id}>
                  <div className="featured-job-top">
                    <div className="featured-job-logo">🏢</div>
                    <div className="featured-job-info">
                      <h3 className="featured-job-title">{job.title}</h3>
                      <p className="featured-job-company">{job.company}</p>
                    </div>
                    <span className="featured-job-badge">{job.type}</span>
                  </div>
                  <div className="featured-job-meta">
                    <span>📍 {job.location}</span>
                    <span>🕐 {job.salary}</span>
                  </div>
                  <p className="featured-job-desc">{job.description}</p>
                  <div className="featured-job-footer">
                    <span className="featured-job-posted">Posted {job.posted}</span>
                    <button className="view-details-btn" onClick={function() { navigate('/login'); }}>
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE HIREME SECTION */}
      <section className="features-section">
        <div className="features-inner">
          <h2 className="features-title">Why Choose HireMe?</h2>
          <p className="features-subtitle">We make job hunting and hiring simple, efficient, and effective for everyone.</p>

          <div className="features-grid">
            {features.map(function(feature, index) {
              return (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to Take the Next Step?</h2>
          <p className="cta-subtitle">Join thousands of job seekers who found their perfect job through HireMe.</p>
          <div className="cta-buttons">
            <button className="cta-btn-white" onClick={function() { navigate('/register'); }}>
              Create Free Account
            </button>
            <button className="cta-btn-outline" onClick={function() { navigate('/login'); }}>
              Browse Jobs
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="landing-logo-icon">💼</div>
              <span>HireMe</span>
            </div>
            <p className="footer-desc">
              Connecting talented job seekers with innovative companies.
              Find your dream job or hire the perfect candidate today.
            </p>
            <div className="footer-socials">
              <span>🐦</span>
              <span>💼</span>
              <span>🐙</span>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>For Job Seekers</h4>
              <a href="#">Browse Jobs</a>
              <a href="#">Create Account</a>
              <a href="#">Career Resources</a>
              <a href="#">Resume Tips</a>
            </div>
            <div className="footer-col">
              <h4>For Employers</h4>
              <a href="#">Post a Job</a>
              <a href="#">Pricing</a>
              <a href="#">Employer Resources</a>
              <a href="#">Contact Sales</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 HireMe. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;