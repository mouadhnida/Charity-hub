import { NavLink } from 'react-router-dom';

import '../styles/homepage.css'
import Button from '@mui/material/Button';
export default function Homepage(){
  return (
  <div className='homepage'>
    <div className='homepage-nav'>
        <div className='homepage-org'><NavLink to="/orgreg" > Register as an org </NavLink> </div>
        <div className='homepage-person'><NavLink to="/personreg"> Register/login </NavLink></div>
      </div>
    <div className='homepage-con'>
      <div className='homepage-con-title'>GIVE TOGETHER</div>
      <div className='homepage-con-subtitle'>Unite,Serve,Transform</div>
      <Button variant="contained" className='homepage-con-button'>Contribute</Button>
      


      </div>
    
    </div>
  )
}
