import React, { useState } from 'react';
import '../../css/ProfilePage.css';

function ProfilePage({ user }) {

  var [name, setName] = useState(user.name || '');
  var [email, setEmail] = useState(user.email || '');
  var [phone, setPhone] = useState('');
  var [location, setLocation] = useState('');
  var [skills, setSkills] = useState('');
  var [experience, setExperience] = useState('');
  var [education, setEducation] = useState('');
  var [bio, setBio] = useState('');
  var [success, setSuccess] = useState('');
  var [error, setError] = useState('');

  function handleSave() {
    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }
    setError('');
    setSuccess('Profile saved!');
    setTimeout(function() { setSuccess(''); }, 3000);
  }

  var displayName = user.name || user.email || 'User';

  return (
    <div className="page-container">

      <h1 className="page-title">My Profile</h1>

      <div className="profile-layout">

        <div className="profile-sidebar card">
          <div className="profile-avatar">{displayName.charAt(0).toUpperCase()}</div>
          <h2 className="profile-name">{displayName}</h2>
          <p className="profile-role">Job Seeker</p>
        </div>

        <div className="profile-form card">
          <h2 className="form-section-title">Personal Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={function(e) { setName(e.target.value); }} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); }} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="e.g. 9876543210" value={phone} onChange={function(e) { setPhone(e.target.value); }} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="e.g. Hyderabad" value={location} onChange={function(e) { setLocation(e.target.value); }} />
            </div>
          </div>

          <h2 className="form-section-title">Professional Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Experience</label>
              <input type="text" placeholder="e.g. 2 Years" value={experience} onChange={function(e) { setExperience(e.target.value); }} />
            </div>
            <div className="form-group">
              <label>Education</label>
              <input type="text" placeholder="e.g. B.Tech CSE" value={education} onChange={function(e) { setEducation(e.target.value); }} />
            </div>
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input type="text" placeholder="e.g. React, Java, SQL" value={skills} onChange={function(e) { setSkills(e.target.value); }} />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea rows="4" placeholder="Write a short bio..." value={bio} onChange={function(e) { setBio(e.target.value); }} />
          </div>

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button className="btn-primary save-btn" onClick={handleSave}>
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;