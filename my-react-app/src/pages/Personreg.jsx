
import React from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../styles/personreg.css';

export default function UserRegistration() {
  return (
    <div className="personreg-container">
      <div className="navbar">
        <NavLink className="website-name" to="/">GiveTogether</NavLink>
        <NavLink className="nav-link" to="/orgreg">Register as an organization</NavLink>
      </div>

      <Container maxWidth="sm" className="personreg-form-container">
        <Typography variant="h5" className="personreg-heading">
          User Registration
        </Typography>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className="personreg-field"
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className="personreg-field"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className="personreg-field"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            required
            className="personreg-field"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            required
            className="personreg-field"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="personreg-submit-button"
          >
            <NavLink to="/orgview">
              Register
            </NavLink>
          </Button>
          <NavLink to="/orgview">orgview</NavLink>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
          Already registered?{' '}
          <Link component={NavLink} to="/personlogin" color="primary">
            Login
          </Link>
        </Typography>
      </Container>
    </div>
  );
}
