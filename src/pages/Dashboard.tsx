import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logout from './admin/Logout';
import { isAuthenticated } from '../auth'; // Ensure isAuthenticated is imported
import LoggedInUser from '../components/LoggedInUser';
import ContactsInformation from '../components/ContactsInformation';
import './Dashboard.css';
//MUI Imports

import FileUploader from '../components/common/FileUploader';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

// Styled component for custom Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: 'transparent',
            minHeight: 'auto',
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6}>
              <StyledPaper>
                <Typography variant="h6">User Info</Typography>
                <StyledPaper>
                  <Logout />
                </StyledPaper>
                <LoggedInUser />
              </StyledPaper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <StyledPaper>
                <Typography variant="h6">Image Upload</Typography>
                <FileUploader />
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <StyledPaper>
                <ContactsInformation />
              </StyledPaper>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
