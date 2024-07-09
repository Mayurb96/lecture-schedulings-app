import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  //const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const userRole = useSelector(state => state.auth.user?.role);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  useEffect(() => {
    if (user && userRole === 'admin') {
      navigate('/admin');
    } else if (user && userRole === 'instructor') {
      navigate('/instructor');
    }
  }, [user, userRole, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
       dispatch(login(formData));
    
    } catch (error) {
      console.log(error.message);
    }
  
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default LoginForm;
