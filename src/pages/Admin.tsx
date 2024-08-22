import Typography from '@mui/material/Typography';
import Login from './admin/Login';
//MUI imports
import Grid from '@mui/material/Grid';

const Admin = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Admin Login
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Welcome to your admin area. Please login to continue on to your
            dashboard.
          </Typography>

          <Login />
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
