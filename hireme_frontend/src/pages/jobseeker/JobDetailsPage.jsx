import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/JobDetailsPage.css';

function JobDetailsPage() {
  var { id } = useParams();
  var navigate = useNavigate();

  var [applied, setApplied] = useState(false);

  // TODO: Uncomment when backend is ready
  // var [job, setJob] = useState(null);
  // fetch('http://localhost:8080/api/jobs/' + id)
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setJob(data); });

  var job = {
    id: id,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Hyderabad',
    type: 'Full Time',
    salary: '6-8 LPA',
    posted: '2 days ago',
    experience: '1-3 Years',
    description: 'We are looking for a skilled Frontend Developer to join our growing team. You will be responsible for building and maintaining high-quality web applications using React.js and modern frontend technologies.',
    responsibilities: [
      'Build responsive and performant web applications using React.js',
      'Collaborate with backend developers and designers',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and team meetings',
      'Optimize applications for maximum speed and scalability'
    ],
    requirements: [
      'Strong proficiency in React.js and JavaScript',
      'Experience with HTML5, CSS3, and responsive design',
      'Familiarity with REST APIs and version control (Git)',
      'Good understanding of UI/UX principles',
      'Excellent problem-solving and communication skills'
    ],
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Git', 'REST API']
  };

  function handleApply() {
    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/applications', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ jobId: id, candidateId: user.id })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function(data) { setApplied(true); });

    setApplied(true);
  }

  return (
    <div className="page-container">

      <button className="back-btn" onClick={function() { navigate('/jobseeker/browse'); }}>
        ← Back to Jobs
      </button>

      <div className="job-details-card card">

        <div className="job-details-header">
          <div className="job-details-logo">{job.company.charAt(0)}</div>
          <div className="job-details-info">
            <h1 className="job-details-title">{job.title}</h1>
            <p className="job-details-company">{job.company}</p>
            <div className="job-details-meta">
              <span>📍 {job.location}</span>
              <span>💼 {job.type}</span>
              <span>💰 {job.salary}</span>
              <span>⏳ {job.experience}</span>
              <span>🕐 Posted {job.posted}</span>
            </div>
          </div>
          <div className="job-details-action">
            {applied ? (
              <button className="btn-secondary" disabled>✅ Applied</button>
            ) : (
              <button className="btn-primary apply-btn" onClick={handleApply}>
                Apply Now
              </button>
            )}
          </div>
        </div>

        <div className="job-skills">
          {job.skills.map(function(skill, index) {
            return (
              <span className="skill-tag" key={index}>{skill}</span>
            );
          })}
        </div>

        <div className="job-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="job-section">
          <h2>Responsibilities</h2>
          <ul>
            {job.responsibilities.map(function(item, index) {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="job-section">
          <h2>Requirements</h2>
          <ul>
            {job.requirements.map(function(item, index) {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

      </div>

    </div>
  );
}

export default JobDetailsPage;