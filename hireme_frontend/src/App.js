import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

import JobSeekerDashboard from './pages/jobseeker/JobSeekerDashboard';
import BrowseJobsPage from './pages/jobseeker/BrowseJobsPage';
import JobDetailsPage from './pages/jobseeker/JobDetailsPage';
import MyApplicationsPage from './pages/jobseeker/MyApplicationsPage';
import ProfilePage from './pages/jobseeker/ProfilePage';

import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJobPage from './pages/employer/PostJobPage';
import MyJobPostsPage from './pages/employer/MyJobPostsPage';
import ViewApplicantsPage from './pages/employer/ViewApplicantsPage';

import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import AllJobsPage from './pages/recruiter/AllJobsPage';
import ManageApplicationsPage from './pages/recruiter/ManageApplicationsPage';
import ScheduleInterviewPage from './pages/recruiter/ScheduleInterviewPage';

import './App.css';

function App() {

  
  var [user, setUser] = useState(function() {
    var stored = localStorage.getItem('user');
    if (stored) return JSON.parse(stored);
    return null;
  });

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  var currentUser = user;
  var role = currentUser ? currentUser.role : null;

  return (
    <Router>
      {currentUser && role && (
        <Navbar user={currentUser} onLogout={handleLogout} />
      )}

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={
          // ✅ fix 2 — changed JOB_SEEKER to CANDIDATE
          role === 'CANDIDATE' ? <Navigate to="/candidate/dashboard" /> :
          role === 'EMPLOYER'  ? <Navigate to="/employer/dashboard" /> :
          role === 'RECRUITER' ? <Navigate to="/recruiter/dashboard" /> :
          <LandingPage user={currentUser} onLogout={handleLogout} />
        } />

        <Route path="/login" element={
          currentUser ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
        } />

        <Route path="/register" element={
          currentUser ? <Navigate to="/" /> : <RegisterPage />
        } />

        {/* ✅ fix 3 — changed JOB_SEEKER to CANDIDATE, updated paths */}
        {role === 'CANDIDATE' && (
          <>
            <Route path="/candidate/dashboard" element={<JobSeekerDashboard user={currentUser} />} />
            <Route path="/candidate/browse" element={<BrowseJobsPage user={currentUser} />} />
            <Route path="/candidate/job/:id" element={<JobDetailsPage user={currentUser} />} />
            <Route path="/candidate/applications" element={<MyApplicationsPage user={currentUser} />} />
            <Route path="/candidate/profile" element={<ProfilePage user={currentUser} />} />
          </>
        )}

        {/* Employer Routes — no change */}
        {role === 'EMPLOYER' && (
          <>
            <Route path="/employer/dashboard" element={<EmployerDashboard user={currentUser} />} />
            <Route path="/employer/post-job" element={<PostJobPage user={currentUser} />} />
            <Route path="/employer/my-jobs" element={<MyJobPostsPage user={currentUser} />} />
            <Route path="/employer/applicants/:jobId" element={<ViewApplicantsPage user={currentUser} />} />
          </>
        )}

        {/* Recruiter Routes — no change */}
        {role === 'RECRUITER' && (
          <>
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard user={currentUser} />} />
            <Route path="/recruiter/all-jobs" element={<AllJobsPage user={currentUser} />} />
            <Route path="/recruiter/applications" element={<ManageApplicationsPage user={currentUser} />} />
            <Route path="/recruiter/schedule-interview" element={<ScheduleInterviewPage user={currentUser} />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;