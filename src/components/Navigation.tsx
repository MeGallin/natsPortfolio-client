import { Link, useLocation } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthenticated(isAuthenticated());
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'link activeLink'
      : 'link';
  };

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button color="inherit">
            <Link to="/" className={getLinkClass('/')}>
              Home
            </Link>
          </Button>
        </Typography>
        <Button color="inherit">
          <Link to="/about" className={getLinkClass('/about')}>
            About
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/portfolio" className={getLinkClass('/portfolio')}>
            Portfolio
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/contact" className={getLinkClass('/contact')}>
            Contact
          </Link>
        </Button>
        {authenticated && (
          <Button color="inherit">
            <Link to="/dashboard" className={getLinkClass('/dashboard')}>
              DB
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;