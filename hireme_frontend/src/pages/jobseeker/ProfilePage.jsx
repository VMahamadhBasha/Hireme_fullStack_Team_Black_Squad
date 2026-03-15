import React, { useState } from 'react';
import '../../css/ProfilePage.css';

function ProfilePage({ user }) {

  var [name, setName] = useState(user.name);
  var [email, setEmail] = useState(user.email);
  var [phone, setPhone] = useState('9876543210');
  var [location, setLocation] = useState('Hyderabad, Telangana');
  var [skills, setSkills] = useState('React, JavaScript, HTML, CSS');
  var [experience, setExperience] = useState('2 Years');
  var [education, setEducation] = useState('B.Tech Computer Science');
  var [bio, setBio] = useState('Passionate frontend developer with experience in building modern web applications.');
  var [success, setSuccess] = useState('');

  function handleSave() {
    // TODO: Uncomment when backend is ready
    // fetch('http://localhost:8080/api/users/' + user.id, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: name, email: email, phone: phone,
    //     location: location, skills: skills,
    //     experience: experience, education: education, bio: bio
    //   })
    // })
    // .then(function(res) { return res.json(); })
    // .then(function(data) { setSuccess('Profile updated successfully!'); });

    setSuccess('Profile updated successfully!');
    setTimeout(function() { setSuccess(''); }, 3000);
  }

  return (
    <div className="page-container">

      <h1 className="page-title">My Profile</h1>

      <div className="profile-layout">

        <div className="profile-sidebar card">
          <div className="profile-avatar">{name.charAt(0)}</div>
          <h2 className="profile-name">{name}</h2>
          <p className="profile-role">Job Seeker</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-value">12</span>
              <span className="profile-stat-label">Applied</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">3</span>
              <span className="profile-stat-label">Interviews</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">1</span>
              <span className="profile-stat-label">Selected</span>
            </div>
          </div>
        </div>

        <div className="profile-form card">
          <h2 className="form-section-title">Personal Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={function(e) { setName(e.target.value); }}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={function(e) { setEmail(e.target.value); }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={function(e) { setPhone(e.target.value); }}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={function(e) { setLocation(e.target.value); }}
              />
            </div>
          </div>

          <h2 className="form-section-title">Professional Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                value={experience}
                onChange={function(e) { setExperience(e.target.value); }}
              />
            </div>
            <div className="form-group">
              <label>Education</label>
              <input
                type="text"
                value={education}
                onChange={function(e) { setEducation(e.target.value); }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={function(e) { setSkills(e.target.value); }}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows="4"
              value={bio}
              onChange={function(e) { setBio(e.target.value); }}
            />
          </div>

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