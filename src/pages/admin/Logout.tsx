import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../state/authSlice';
import Button from '../../components/common/Button';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');

    // Dispatch the logout action to clear the Redux state
    dispatch(logout());

    // Trigger custom event to notify of authentication change
    window.dispatchEvent(new Event('authChange'));

    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <div style={logoutContainerStyle}>
      <Button
        text="Logout"
        color="red"
        onClick={handleLogout}
        style={buttonStyle}
        disabled={false}
      />
    </div>
  );
};

export default Logout;

const logoutContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '20px',
  width: '200px',
};
