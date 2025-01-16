import DateTime from './DateTime';
import Counter from '../Counter';
import { Container, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Toolbar>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DateTime />
          <Typography variant="body1" component="div">
            Page Hits <Counter />
          </Typography>
        </Container>
      </Toolbar>
    </footer>
  );
};

export default Footer;
