import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9C27B0', // Purple
    },
    secondary: {
      main: '#3F51B5', // Blue
    },
    error: {
      main: '#FF4081', // Pink
    },
    warning: {
      main: '#FF7043', // Orange
    },
    info: {
      main: '#81D4FA', // Light Blue (Optional for variety)
    },
    success: {
      main: '#8BC34A', // Green (Optional for variety)
    },
    background: {
      default: '#e5e8e8', // Light gray background
      paper: '#e5e8e8', // White for papers or containers
    },
    text: {
      primary: '#212121', // Dark gray for main text
      secondary: '#757575', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Keeps button text case as written
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for a modern look
  },
});
