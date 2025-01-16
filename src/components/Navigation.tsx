import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC<{ authenticated: boolean }> = ({ authenticated }) => {
  const location = useLocation();

  const getLinkClass = (path: string): string => {
    return location.pathname === path ? 'active-link' : '';
  };

  const renderNavButton = (path: string, label: string) => (
    <Button
      color="inherit"
      sx={{
        fontSize: '1.15rem',
        padding: '0 6px',
        textTransform: 'upperCase',
      }}
    >
      <Link to={path} className={getLinkClass(path)}>
        {label}
      </Link>
    </Button>
  );

  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
      <Toolbar className={`navbar ${authenticated ? 'logged-in' : ''}`}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {renderNavButton('/', 'Home')}
          {authenticated && renderNavButton('/dashboard', 'Dashboard')}
        </Typography>
        {renderNavButton('/about', 'About')}
        {renderNavButton('/portfolio', 'Portfolio')}
        {renderNavButton('/contact', 'Contact')}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
