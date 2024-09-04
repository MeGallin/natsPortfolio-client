import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';

const AboutMe: React.FC = () => {
  return (
    <Container
      sx={{
        padding: 4,
        maxWidth: 'lg',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        <Avatar
          src="/path-to-image.jpg" // Replace with the student's profile image
          alt="Student Name" // Replace with the student's name
          sx={{
            width: 150,
            height: 150,
            margin: '0 auto',
            mb: 2,
            border: '5px solid #fff',
          }}
        />
        <Typography variant="h3" gutterBottom>
          Natalie Allin
          <AnimatedText />
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Graphic Design Student
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Hi, I’m Natalie. I’m a passionate graphic design student with a keen
          eye for detail and a love for creating visually stunning designs. With
          experience in various design tools and a strong portfolio, I’m excited
          to bring my skills to [University Name].
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          <Link to="/portfolio">View Portfolio</Link>
        </Button>
      </Box>

      {/* About Me and Skills Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: 3,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography variant="h5" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1">
              [Detailed biography, achievements, and goals go here. Talk about
              past projects, design philosophy, and what excites you about
              graphic design.]
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: 3,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Skills & Tools
            </Typography>
            <Typography variant="body1">
              - Adobe Illustrator
              <br />
              - Adobe Photoshop
              <br />
              - Figma
              <br />
              - Sketch
              <br />
              [Include any additional relevant tools or skills.]
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Contact Section */}
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Contact
        </Typography>
        <Typography variant="body1">
          If you’d like to get in touch, feel free to reach out to me at:
          <br />
          <a href="mailto:student@example.com">student@example.com</a>
        </Typography>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          <Link to="/contact">Contact me</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default AboutMe;
