import Typography from '@mui/material/Typography';
import ContactForm from '../components/ContactForm';
import Grid from '@mui/material/Grid';

const Contact = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
