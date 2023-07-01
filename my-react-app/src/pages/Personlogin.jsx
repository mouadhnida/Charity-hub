
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, FormControlLabel, Switch } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../styles/personlogin.css';

export default function Personlogin() {
  const [isUsingEmail, setIsUsingEmail] = useState(false);

  const handleLoginMethodChange = () => {
    setIsUsingEmail((prevValue) => !prevValue);
  };

  return (
    <div className='personlogin'>
      <div className="navbar">
        <NavLink className="website-name" to="/">GiveTogether</NavLink>
        <NavLink className="nav-link" to="/personreg">Register as a person</NavLink>
      </div>
      <Container maxWidth="sm" className="form-container">
        <div className="form-background">
          <Typography variant="h5" className="form-heading">
            User Login
          </Typography>
          <form>
            {isUsingEmail ? (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            ) : (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={<Switch checked={isUsingEmail} onChange={handleLoginMethodChange} />}
              label={isUsingEmail ? 'Log in with Email' : 'Log in with Username'}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
            New user?{' '}
            <Link component={NavLink} to="/personreg" color="primary">
              Register
            </Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
}
