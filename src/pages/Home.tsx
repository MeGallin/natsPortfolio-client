import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Home = () => {
  return (
    <>
      <Box
        my={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={4}
        p={2}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Welcome to the Home page!
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Welcome to the Home page!
        </Typography>
      </Box>
    </>
  );
};

export default Home;
