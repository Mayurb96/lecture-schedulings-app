import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token=localStorage.getItem('token');
        const headers={
            'Authorization': `Bearer ${token}`,
            'Content-type' : 'application/json'
        }      
        
        const response = await axios.get('https://lecture-schedule-backend.vercel.app/api/instructors/',{ headers });
        setInstructors(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Instructors</h3>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor._id}>{instructor.name} - {instructor.course} - {instructor.date} </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;
