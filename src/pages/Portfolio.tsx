import { Container, Box } from '@mui/material';
import Gallery from '../components/Gallery';

const Portfolio = () => {
  return (
    <Container
      sx={{
        padding: 4,
        maxWidth: 'lg',
      }}
    >
      <Box sx={{ width: '100%', height: '100vh' }}>
        <Gallery />
      </Box>
    </Container>
  );
};

export default Portfolio;
