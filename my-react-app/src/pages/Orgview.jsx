
// orgview.js
import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/orgview.css';

const organizations = [
  {
    id: 1,
    name: 'Organization 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    cause: 'Education',
  },
  {
    id: 2,
    name: 'Organization 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    cause: 'Healthcare',
  },
  {
    id: 3,
    name: 'Organization 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    cause: 'Environment',
  },
];

export default function OrgView() {
  const [selectedCause, setSelectedCause] = useState('');

  const handleCauseChange = (event) => {
    setSelectedCause(event.target.value);
  };

  const filteredOrganizations = selectedCause
    ? organizations.filter((org) => org.cause === selectedCause)
    : organizations;

  return (
    <div>
      <div className="navbar">
        <Link className="website-name" to="/">
          GiveTogether
        </Link>
        <Link className="nav-link" to="/userprofile">
          profile 
        </Link>
      </div>
      <div className="container">
        <div className="filter-form">
          <Typography variant="h6">Filter Organizations</Typography>
          <select value={selectedCause} onChange={handleCauseChange}>
            <option value="">All Causes</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
          </select>
        </div>
        <div className="org-list">
          {filteredOrganizations.map((org) => (
            <Box key={org.id} className="org-card">
              <Typography variant="h5" className="org-name">
                {org.name}
              </Typography>
              <Typography variant="body1" className="org-description">
                {org.description}
              </Typography>
              <Typography variant="body2" className="org-cause">
                {org.cause}
              </Typography>
              <Button variant="contained" color="primary" className="donate-button">
                Donate
              </Button>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}
