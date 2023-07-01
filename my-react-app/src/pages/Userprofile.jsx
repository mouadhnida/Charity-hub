
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../styles/userprofile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSave = () => {
    // Save the user's profile information
    // You can perform the necessary logic here (e.g., update database, make API calls, etc.)
    console.log('Saving profile...');
    console.log('Name:', name);
    console.log('Profile Picture:', profilePic);
    console.log('Bio:', bio);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
  };

  return (
  <div>
    <div className="navbar">
        <Link className="website-name" to="/">
          GiveTogether
        </Link>
        <Link className="nav-link" to="/orgview">
         View Orgs 
        </Link>
      </div>
 
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <div className="profile-form">
        <div className="profile-picture">
          <img src={profilePic} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))}
          />
        </div>
        <div className="form-fields">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          <TextField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          <TextField
            label="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
</div>
);
}
