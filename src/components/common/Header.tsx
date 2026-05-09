import { useEffect, useState } from 'react';
import { isAuthenticated } from '../../auth';
import Navigation from '../Navigation';

const Header = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => setAuthenticated(isAuthenticated());

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return <Navigation authenticated={authenticated} />;
};

export default Header;
