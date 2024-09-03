import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logout from './admin/Logout';
import { isAuthenticated } from '../auth'; // Ensure isAuthenticated is imported
import LoggedInUser from '../components/LoggedInUser';
import ContactsInformation from '../components/ContactsInformation';
import './Dashboard.css';
//MUI Imports
import Grid from '@mui/material/Grid';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
    } else {
      return;
    }
  }, [navigate]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={2}>
          <Logout />
          <LoggedInUser />
        </Grid>
        <Grid item xs={12} sm={6} md={10}>
          <div className="border-temp">
            <h1>UPLOAD IMAGES COMPONENT!</h1>
          </div>
        </Grid>

        <Grid item xs={12} sm={10} md={10}>
          <ContactsInformation />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
