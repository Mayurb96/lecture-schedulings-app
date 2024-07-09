// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login/LoginPage';
import AdminPage from './Components/Admin/AdminPage';
import InstructorPage from './Components/Instructor/InstructorPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/instructor" element={<InstructorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
