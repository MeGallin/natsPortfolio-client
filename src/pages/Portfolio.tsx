import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Portfolio = () => {
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
          Portfolio
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          This is my portfolio page
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          This is my portfolio page
        </Typography>
      </Box>
    </>
  );
};

export default Portfolio;
