import { Link } from '@tanstack/react-router';
import './Navigation.css';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';

const Navigation = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    // Function to manually trigger re-check of authentication
    const handleAuthChange = () => {
      setAuthenticated(isAuthenticated());
    };

    // Listen for custom events triggered on login/logout
    window.addEventListener('authChange', handleAuthChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>

        {authenticated && (
          <li>
            <Link to="/dashboard">DB</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
