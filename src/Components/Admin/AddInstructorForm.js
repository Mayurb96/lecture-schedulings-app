// src/components/AddInstructorForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddInstructorForm = ({ onInstructorAdded }) => {
  const [instructorData, setInstructorData] = useState({ name: '', email: '', password: '' , course: '', date: '', courseName:'', courseLevel:'' , lectures: [] });
  const [courses, setCourses] = useState([]);
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token=localStorage.getItem('token');
        const headers={
            'Authorization': `Bearer ${token}`,
            'Content-type' : 'application/json'
        }      
        
        const response = await axios.get('http://localhost:4000/api/courses/',{ headers });
         setCourses(response.data);
        // setLoading(false);
      } catch (error) {
        // setError('Failed to fetch courses');
        // setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const onChange = (e) => setInstructorData({ ...instructorData, [e.target.name]: e.target.value });


const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    };

    // Ensure course is set correctly
    const selectedCourse = courses.find(course => course.name === instructorData.course);
    if (!selectedCourse) {
      console.error('Selected course not found');
      return;
    }
    const formattedDate = new Date(instructorData.date).toISOString().split('T')[0];
console.log(formattedDate)
    const postData = {
      ...instructorData,
      course: selectedCourse._id,
      courseName:selectedCourse.name,
      courseLevel: selectedCourse.level,
      date: formattedDate,
      lectures: [ {
        courseName: selectedCourse.name,
        courseLevel: selectedCourse.level,
        date: formattedDate
      },]

    };
    console.log(postData)

    const response = await axios.post('http://localhost:4000/api/instructors/add', postData, { headers });

    console.log('Instructor added successfully:', response.data);
    onInstructorAdded(response.data)
    setInstructorData({ name: '', email: '', password: '', course: '', date: '', courseName: '', courseLevel: '', lectures: [] }); // Clear form after successful submission
  } catch (error) {
    console.error('Error adding instructor:', error);
    // Handle error, show error message, etc.
  }
};
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="Instructor Name" value={instructorData.name} onChange={onChange} required />
      <input type="email" name="email" placeholder="Email" value={instructorData.email} onChange={onChange} required />
      <input type="password" name="password" placeholder="Password" value={instructorData.password} onChange={onChange} required />
      <select
        name="course"
        value={instructorData.course}
        onChange={onChange}
        
      >
        <option value="" disabled>Select Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course.name}>{course.name} - {course.level}</option>
        ))}
      </select>
<input type="date" name="date" placeholder="Date" value={instructorData.date} onChange={onChange}  />

      <button type="submit">Add Instructor</button>
    </form>
  );
};

export default AddInstructorForm;
