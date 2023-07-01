
import React, { useState } from 'react';
import '../styles/orgreg.css';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { NavLink } from 'react-router-dom';

// Country options with country codes
const countryOptions = [
  { value: '+1', label: '+1', code: 'US' },
  { value: '+44', label: '+44', code: 'GB' },
  { value: '+91', label: '+91', code: 'IN' },
  { value: '+86', label: '+86', code: 'CN' },
  { value: '+81', label: '+81', code: 'JP' },
  // Add more country options here
];

const causesOptions = [
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'environment', label: 'Environment' },
  // Add more cause options here
];

export default function Orgreg() {
  const [causes, setCauses] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleCauseChange = (event) => {
    setCauses(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least one number, one special character, and be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validatePassword();
    setSubmitClicked(true);
    // Form submission logic here
  };

  return (
    <div>
      <div className="navbar">
        <NavLink className="website-name" to="/"> GiveTogether </NavLink>
        <NavLink className="nav-link" to="/personreg"> Register as a person </NavLink>
      </div>
      <div className="container">
        <div className="form">
          <TextField className="input" label="Name" variant="outlined" required />
          <br />
          <TextField className="input" label="Email" variant="outlined" required type="email" />
          <br />
          <TextField
            className="input"
            label="Password"
            variant="outlined"
            required
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
            error={!!passwordError}
          />
          {passwordError && <FormHelperText className="error-text">{passwordError}</FormHelperText>}
          <br />
          <div className="country-container">
            <Autocomplete
              className="country-select"
              options={countryOptions}
              getOptionLabel={(option) => option.label}
              value={selectedCountry}
              onChange={handleCountryChange}
              renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
            />
            <TextField
              className="input phone-input"
              label="Phone Number"
              variant="outlined"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <br />
          <div className="causes-container">
            <p className="causes-label">Causes:</p>
            <FormControl
              error={submitClicked && causes.length === 0}
              variant="outlined"
              className="causes-select"
            >
              <InputLabel>Select Causes</InputLabel>
              <Select
                multiple
                value={causes}
                onChange={handleCauseChange}
                renderValue={(selected) => selected.join(', ')}
                label="Select Causes"
              >
                {causesOptions.map((cause) => (
                  <MenuItem key={cause.value} value={cause.value}>
                    {cause.label}
                  </MenuItem>
                ))}
              </Select>
              {submitClicked && causes.length === 0 && (
                <FormHelperText>Please select at least one cause</FormHelperText>
              )}
            </FormControl>
          </div>
          <br />
   <NavLink to="/orgreg2"  activeClassName="active-link">
    <Button variant="contained" className="submit-button"color="primary" >
      Submit
    </Button>
  </NavLink> <NavLink to="/orgreg2"  activeClassName="active-link">
    <Button variant="contained" className="submit-button"color="primary" onClick={handleSubmit}>
      Submit
    </Button>
  </NavLink>
        </div>
      </div>
    </div>
  );
}
