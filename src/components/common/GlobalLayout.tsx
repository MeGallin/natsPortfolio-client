// GlobalLayout.tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/theme'; // Import the shared theme

type GlobalLayoutProps = {
  children: React.ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default GlobalLayout;
