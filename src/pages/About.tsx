import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const About = () => {
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
          About Page
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          All about me
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          More about me
        </Typography>
      </Box>
    </>
  );
};

export default About;
