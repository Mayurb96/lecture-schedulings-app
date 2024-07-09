import React from 'react';
import AdminPanel from './AdminPanel';
import { useDispatch  } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import '../../App.css';

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
    window.location.reload(); 
  };
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <AdminPanel />
    </div>
  );
};

export default AdminPage;
