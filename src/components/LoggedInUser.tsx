import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchUserDetails } from '../state/userSlice';
import './LoggedInUser.css';

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

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <div className="logged-in-user-wrapper">
      {status === 'loading' && <p>Loading user details...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <div>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Admin Status:</strong> {isAdmin ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Confirmed:</strong> {isConfirmed ? 'Yes' : 'No'}
          </p>
          {profileImage && (
            <p>
              <strong>Profile Image:</strong>{' '}
              <img src={profileImage} alt="Profile" width="100" />
            </p>
          )}
          <p>
            <strong>Cloudinary ID:</strong> {cloudinaryId}
          </p>
          <p>
            <strong>IP Address:</strong> {ipAddress}
          </p>
          <p>
            <strong>Login Counter:</strong> {loginCounter}
          </p>
          <p>
            <strong>Registered with Google:</strong>{' '}
            {registeredWithGoogle ? 'Yes' : 'No'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoggedInUser;
