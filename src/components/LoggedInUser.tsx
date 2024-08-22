import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchUserDetails, updateUserDetails } from '../state/userSlice';
import './LoggedInUser.css';
import Spinner from './common/Spinner';
import sample from '../assets/images/sample.jpg';
import Avatar from '@mui/material/Avatar';
import Button from './common/Button';
import Input from './common/Input';
//MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

const LoggedInUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    name,
    email,
    isAdmin,
    isConfirmed,
    profileImage,
    cloudinaryId,
    ipAddress,
    loginCounter,
    registeredWithGoogle,
    status,
    error,
  } = useSelector((state: RootState) => state.user);

  console.log(useSelector((state: RootState) => state.user));

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);

  const handleAvatarClick = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    // Dispatch new details
    if (editName && editEmail) {
      dispatch(updateUserDetails({ name: editName, email: editEmail }));
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name || '');
    setEditEmail(email || '');
    setEditEmail(email);
  };

  return (
    <div className="logged-in-user-wrapper">
      {status === 'loading' && <Spinner />}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <div>
          <div className="avatar-wrapper">
            <Box
              my={1}
              mx={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ height: '100%' }}
            >
              {profileImage && (
                <Avatar
                  alt="Profile"
                  src={sample}
                  sx={{ width: 100, height: 100 }}
                />
              )}
            </Box>
            <div className="avatar-text-wrapper">
              {isEditing ? (
                <div className="avatar-text-input-wrapper">
                  <Typography variant="h6" gutterBottom>
                    Edit
                  </Typography>

                  <div style={fieldStyle}>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={editName || ''}
                      onChange={(e) => setEditName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldStyle}>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={editEmail || ''}
                      onChange={(e) => setEditEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div className="avatar-text-button-wrapper">
                    <Button
                      text="Save"
                      color={getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color')
                        .trim()}
                      disabled={!editName || !editEmail}
                      onClick={handleSave}
                    />
                    <Button
                      text="Discard"
                      color={getComputedStyle(document.documentElement)
                        .getPropertyValue('--secondary-color')
                        .trim()}
                      disabled={!editName || !editEmail}
                      onClick={handleCancel}
                    />
                  </div>
                </div>
              ) : (
                <div onClick={handleAvatarClick}>
                  <Tooltip title="Click to edit" placement="top">
                    <div>
                      <h3>{name}</h3>
                      <p>{email}</p>
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          <Box
            my={1}
            mx={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{ height: '100%' }}
          >
            <div className="avatar-text-wrapper">
              <Typography variant="subtitle1" gutterBottom>
                <strong>Admin Status:</strong> {isAdmin ? 'Admin' : 'Not Admin'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Email Status:</strong>{' '}
                {isConfirmed ? 'Confirmed' : 'Not Confirmed'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Cloudinary ID:</strong> {cloudinaryId}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>IP Address:</strong> {ipAddress}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Login Counter:</strong> {loginCounter}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Google Registered:</strong>{' '}
                {registeredWithGoogle ? 'Yes' : 'No'}
              </Typography>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default LoggedInUser;

const fieldStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
};
