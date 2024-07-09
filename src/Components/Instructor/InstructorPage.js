import React from 'react';
import InstructorPanel from './InstructorPanel';
import { useDispatch  } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import '../../App.css';

const InstructorPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
    window.location.reload(); 
  };

  return (
    <div>
      <h1>Instructor Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>      
      <InstructorPanel />
    </div>
  );
};

export default InstructorPage;
