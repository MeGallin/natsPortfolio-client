import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import ContactForm from '../components/ContactForm';

import Box from '@mui/material/Box';

const Contact = () => {
  return (
    <>
      <Container
        sx={{
          padding: 4,
          maxWidth: 'lg',
        }}
      >
        <Box
          my={4}
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap={4}
          p={2}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Let's Connect!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Thanks for visiting my portfolio! If you have any questions, want to
            collaborate, or just want to chat about a project, I’d love to hear
            from you. Fill out the form below, and I’ll get back to you as soon
            as I can.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Whether you’re looking to work together or simply have something to
            share, I’m always open to connecting with creative minds.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Just want to say hi? I’m always up for a friendly conversation!
          </Typography>
          <ContactForm />
          <Typography variant="h6" align="center" gutterBottom>
            THANK YOU.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
