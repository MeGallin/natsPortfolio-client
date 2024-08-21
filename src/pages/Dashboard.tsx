import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logout from './admin/Logout';
import { isAuthenticated } from '../auth'; // Ensure isAuthenticated is imported
import LoggedInUser from '../components/LoggedInUser';
import ContactsInformation from '../components/ContactsInformation';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin');
    } else {
      return;
    }
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-wrapper">
        <LoggedInUser />
        <ContactsInformation />
      </div>
      <Logout />
    </>
  );
};

export default Dashboard;
