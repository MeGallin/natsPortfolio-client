// Palette.tsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

type Color = {
  name: string;
  hex: string;
};

type PaletteProps = {
  title: string;
  colors: Color[];
};

const ColorBox: React.FC<Color> = ({ name, hex }) => (
  <Paper
    elevation={3}
    sx={{
      backgroundColor: hex,
      padding: '20px',
      margin: '10px',
      borderRadius: '8px',
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
    }}
  >
    <Typography variant="body1">{name}</Typography>
    <Typography variant="body2">{hex}</Typography>
  </Paper>
);

const Palette: React.FC<PaletteProps> = ({ title, colors }) => (
  <Box sx={{ margin: '20px 0', textAlign: 'center' }}>
    <Typography variant="h3" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      {colors.map((color) => (
        <Grid item key={color.hex}>
          <ColorBox name={color.name} hex={color.hex} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Palette;
