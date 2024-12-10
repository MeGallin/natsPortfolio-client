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

import { Grid, Paper } from '@mui/material';

import { styled } from '@mui/system';

// Styled component for custom Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const LoggedInUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const handleAvatarClick = () => setIsEditing(true);

  const handleSave = async () => {
    setIsEditing(false);
    if (user.id && editName && editEmail) {
      await dispatch(
        updateUserDetails({ id: user.id, name: editName, email: editEmail }),
      );
      dispatch(fetchUserDetails());
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(user.name || '');
    setEditEmail(user.email || '');
  };

  if (user.status === 'loading') return <Spinner />;
  if (user.status === 'failed') return <p>Error: {user.error}</p>;

  return (
    <Grid container spacing={1}>
      <Box
        my={2}
        mx={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <StyledPaper>
          {user.profileImage && (
            <Avatar
              alt="Profile"
              src={sample}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </StyledPaper>
      </Box>

      <Box
        my={2}
        mx={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
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
                onClick={handleCancel}
              />
            </div>
          </div>
        ) : (
          <div onClick={handleAvatarClick}>
            <Tooltip title="Click to edit" placement="top">
              <StyledPaper>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </StyledPaper>
            </Tooltip>
          </div>
        )}
      </Box>

      <Box
        my={1}
        mx={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ height: '100%' }}
      >
        <Typography variant="subtitle1" gutterBottom>
          <strong>Admin Status:</strong> {user.isAdmin ? 'Admin' : 'Not Admin'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Email Status:</strong>{' '}
          {user.isConfirmed ? 'Confirmed' : 'Not Confirmed'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Cloudinary ID:</strong> {user.cloudinaryId}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>IP Address:</strong> {user.ipAddress}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <strong>Login Counter:</strong> {user.loginCounter}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Google Registered:</strong>{' '}
          {user.registeredWithGoogle ? 'Yes' : 'No'}
        </Typography>
      </Box>
    </Grid>
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
