import { Container } from '@mui/material';
import Name from '../components/Name';

const Home = () => {
  return (
    <>
      <Container
        sx={{
          padding: 4,
          maxWidth: 'lg',
        }}
      >
        <Name />
      </Container>
    </>
  );
};

export default Home;
