import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchUserDetails } from '../state/userSlice';
import Logout from './admin/Logout';
import { isAuthenticated } from '../auth'; // Ensure isAuthenticated is imported

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  console.log(
    'gggggggg',
    useSelector((state: RootState) => state),
  );
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
    if (!isAuthenticated()) {
      navigate('/admin');
    } else {
      dispatch(fetchUserDetails());
    }
  }, [navigate, dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
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
      <Logout />
    </div>
  );
};

export default Dashboard;
