import React, { useState } from 'react';
import '../../css/ScheduleInterviewPage.css';

function ScheduleInterviewPage() {

  var [candidateName, setCandidateName] = useState('');
  var [candidateEmail, setCandidateEmail] = useState('');
  var [jobTitle, setJobTitle] = useState('');
  var [company, setCompany] = useState('');
  var [interviewDate, setInterviewDate] = useState('');
  var [interviewTime, setInterviewTime] = useState('');
  var [interviewMode, setInterviewMode] = useState('Online');
  var [interviewLink, setInterviewLink] = useState('');
  var [notes, setNotes] = useState('');
  var [error, setError] = useState('');
  var [success, setSuccess] = useState('');

  // TODO: Uncomment when backend is ready
  // var [interviews, setInterviews] = useState([]);
  // fetch('http://localhost:8080/api/interviews')
  // .then(function(res) { return res.json(); })
  // .then(function(data) { setInterviews(data); });

  var [interviews, setInterviews] = useState([
    { id: 1, candidateName: 'John Doe', candidateEmail: 'john@test.com', jobTitle: 'Frontend Developer', company: 'TechCorp', interviewDate: '2024-03-10', interviewTime: '10:00', interviewMode: 'Online', status: 'SCHEDULED' },
    { id: 2, candidateName: 'Jane Smith', candidateEmail: 'jane@test.com', jobTitle: 'React Developer', company: 'Infosys', interviewDate: '2024-03-11', interviewTime: '14:00', interviewMode: 'In Person', status: 'SCHEDULED' },
    { id: 3, candidateName: 'Mike Johnson', candidateEmail: 'mike@test.com', jobTitle: 'UI Engineer', company: 'Wipro', interviewDate: '2024-03-08', interviewTime: '11:00', interviewMode: 'Online', status: 'COMPLETED' }
  ]);

  function handleSchedule() {
    if (!candidateName || !candidateEmail || !jobTitle || !company || !interviewDate || !interviewTime) {
      setError('Please fill all required fields');
      return;
    }

    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/interviews', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     candidateName: candidateName,
    //     candidateEmail: candidateEmail,
    //     jobTitle: jobTitle,
    //     company: company,
    //     interviewDate: interviewDate,
    //     interviewTime: interviewTime,
    //     interviewMode: interviewMode,
    //     interviewLink: interviewLink,
    //     notes: notes
    //   })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function(data) {
    //   setInterviews([data, ...interviews]);
    //   setSuccess('Interview scheduled successfully!');
    //   setError('');
    // });

    var newInterview = {
      id: interviews.length + 1,
      candidateName: candidateName,
      candidateEmail: candidateEmail,
      jobTitle: jobTitle,
      company: company,
      interviewDate: interviewDate,
      interviewTime: interviewTime,
      interviewMode: interviewMode,
      status: 'SCHEDULED'
    };

    setInterviews([newInterview, ...interviews]);
    setSuccess('Interview scheduled successfully!');
    setError('');

    setCandidateName('');
    setCandidateEmail('');
    setJobTitle('');
    setCompany('');
    setInterviewDate('');
    setInterviewTime('');
    setInterviewMode('Online');
    setInterviewLink('');
    setNotes('');

    setTimeout(function() { setSuccess(''); }, 3000);
  }

  function getStatusClass(status) {
    if (status === 'SCHEDULED') return 'badge badge-blue';
    if (status === 'COMPLETED') return 'badge badge-green';
    if (status === 'CANCELLED') return 'badge badge-red';
    return 'badge badge-yellow';
  }

  function getModeBadge(mode) {
    if (mode === 'Online') return 'badge badge-blue';
    if (mode === 'In Person') return 'badge badge-green';
    return 'badge badge-yellow';
  }

  return (
    <div className="page-container">

      <h1 className="page-title">Schedule Interview</h1>

      <div className="schedule-layout">

        <div className="schedule-form card">
          <h2 className="form-section-title">Interview Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Candidate Name *</label>
              <input
                type="text"
                placeholder="Enter candidate name"
                value={candidateName}
                onChange={function(e) { setCandidateName(e.target.value); }}
              />
            </div>
            <div className="form-group">
              <label>Candidate Email *</label>
              <input
                type="email"
                placeholder="Enter candidate email"
                value={candidateEmail}
                onChange={function(e) { setCandidateEmail(e.target.value); }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                value={jobTitle}
                onChange={function(e) { setJobTitle(e.target.value); }}
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                placeholder="e.g. TechCorp"
                value={company}
                onChange={function(e) { setCompany(e.target.value); }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Interview Date *</label>
              <input
                type="date"
                value={interviewDate}
                onChange={function(e) { setInterviewDate(e.target.value); }}
              />
            </div>
            <div className="form-group">
              <label>Interview Time *</label>
              <input
                type="time"
                value={interviewTime}
                onChange={function(e) { setInterviewTime(e.target.value); }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Interview Mode</label>
              <select
                value={interviewMode}
                onChange={function(e) { setInterviewMode(e.target.value); }}
              >
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            <div className="form-group">
              <label>Interview Link (optional)</label>
              <input
                type="text"
                placeholder="e.g. https://meet.google.com/..."
                value={interviewLink}
                onChange={function(e) { setInterviewLink(e.target.value); }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              rows="3"
              placeholder="Any additional notes..."
              value={notes}
              onChange={function(e) { setNotes(e.target.value); }}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button className="btn-primary schedule-btn" onClick={handleSchedule}>
            Schedule Interview
          </button>

        </div>

        <div className="interviews-list-section">
          <h2 className="section-title">Scheduled Interviews</h2>

          <div className="interviews-list">
            {interviews.map(function(interview) {
              return (
                <div className="interview-card card" key={interview.id}>
                  <div className="interview-card-top">
                    <div className="interview-avatar">{interview.candidateName.charAt(0)}</div>
                    <div className="interview-info">
                      <h3 className="interview-candidate">{interview.candidateName}</h3>
                      <p className="interview-email">{interview.candidateEmail}</p>
                    </div>
                    <span className={getStatusClass(interview.status)}>{interview.status}</span>
                  </div>
                  <div className="interview-details">
                    <span>💼 {interview.jobTitle}</span>
                    <span>🏢 {interview.company}</span>
                    <span>📅 {interview.interviewDate}</span>
                    <span>🕐 {interview.interviewTime}</span>
                    <span className={getModeBadge(interview.interviewMode)}>{interview.interviewMode}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

export default ScheduleInterviewPage;