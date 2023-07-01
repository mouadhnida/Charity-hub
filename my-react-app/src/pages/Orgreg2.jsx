
import '../styles/orgreg2.css';
import React from 'react';
import { TextField, Typography, Button, Box, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Orgreg2() {
  const [logo, setLogo] = React.useState(null);
  const [logoURL, setLogoURL] = React.useState('');
  const [paypalId, setPaypalId] = React.useState('');

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    setLogoURL(URL.createObjectURL(file));
  };

  const handlePaypalIdChange = (event) => {
    setPaypalId(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission, including the PayPal ID
    console.log('PayPal ID:', paypalId);
    console.log('Other form data:', {
      logo,
      mission: document.getElementById('mission').value,
      description: document.getElementById('description').value,
      // Include other form field values
    });
  };

  return (
    <div>
      <div className="navbar">
        <NavLink className="website-name" to="/">
          GiveTogether
        </NavLink>
        <NavLink className="nav-link" to="/">
          Register as a person
        </NavLink>
      </div>
      <Box className="orgreg-container">
        <Box className="orgreg-form-container">
          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Logo</Typography>
              <Typography variant="caption">Upload the organization's logo.</Typography>
            </div>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoUpload}
              className="orgreg-field"
              style={{ margin: '10px 0' }}
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Logo Preview</Typography>
              {logo && <Avatar src={logoURL} alt="Logo Preview" style={{ marginLeft: '10px' }} />}
            </div>
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Mission</Typography>
              <Typography variant="caption">Enter the mission description.</Typography>
            </div>
            <TextField
              id="mission"
              label="Mission"
              variant="outlined"
              fullWidth
              multiline
              rows={1}
              margin="normal"
              className="orgreg-field orgreg-input-field"
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Description</Typography>
              <Typography variant="caption">Enter the detailed description.</Typography>
            </div>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              className="orgreg-field orgreg-input-field"
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Images</Typography>
              <Typography variant="caption">Upload relevant images.</Typography>
            </div>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="orgreg-field"
              style={{ margin: '10px 0' }}
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Website</Typography>
              <Typography variant="caption">Enter the website URL.</Typography>
            </div>
            <TextField
              id="website"
              label="Website"
              variant="outlined"
              fullWidth
              margin="normal"
              className="orgreg-field orgreg-input-field"
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Pincode</Typography>
              <Typography variant="caption">Enter the pincode.</Typography>
            </div>
            <TextField
              id="pincode"
              label="Pincode"
              variant="outlined"
              fullWidth
              margin="normal"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              className="orgreg-field orgreg-input-field"
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">Address</Typography>
              <Typography variant="caption">Enter the address.</Typography>
            </div>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                autoComplete: 'off',
              }}
              className="orgreg-field orgreg-input-field"
            />
          </div>

          <div className="orgreg-field-row">
            <div className="orgreg-field-label">
              <Typography variant="h6">PayPal ID</Typography>
              <Typography variant="caption">Enter your PayPal ID.</Typography>
            </div>
            <TextField
              id="paypalId"
              label="PayPal ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={paypalId}
              onChange={handlePaypalIdChange}
              className="orgreg-field orgreg-input-field"
            />
          </div>

          <Button variant="contained" color="primary" className="orgreg-submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}
