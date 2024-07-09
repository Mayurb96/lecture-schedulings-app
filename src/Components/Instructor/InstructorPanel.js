// src/components/InstructorPanel.js
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../redux/authSlice';
import CourseList from './CourseList';
// import { useNavigate } from 'react-router-dom';

const InstructorPanel = () => {
  // const dispatch = useDispatch();
  // const navigate=useNavigate();  
  // const handleLogout = () => {
  //   dispatch(logout());
  //   localStorage.removeItem('token');
  //   navigate('/login')
  //   window.location.reload(); 
  // };

  return (
    <div>
      <CourseList />
    </div>
  );
};

export default InstructorPanel;
