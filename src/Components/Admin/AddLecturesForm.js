// src/components/AddscheduleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

const AddscheduleForm = ({ onscheduleAdded }) => {
  const [scheduleData, setscheduleData] = useState({ name: '', course: '', date: ''});
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors]= useState([])
  const [error, setError]=useState(null);

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
         setError('Failed to fetch courses');
        // setLoading(false);
      }
    };
    fetchCourses();
    const fetchInstructors = async () => {
        try {
            const token=localStorage.getItem('token');
            const headers={
                'Authorization': `Bearer ${token}`,
                'Content-type' : 'application/json'
            }      
            
            const response = await axios.get('http://localhost:4000/api/instructors/',{ headers });
            setInstructors(response.data);
            //setLoading(false);
        } catch (error) {
             setError('Failed to fetch Instructor');
            // setLoading(false);
            console.log(error)
        }
        };
        fetchInstructors();
          }, []);
    
  
  const onChange = (e) => setscheduleData({ ...scheduleData, [e.target.name]: e.target.value });


const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    };

    console.log(instructors)
    // Ensure course is set correctly
    const selectedCourse = courses.find(course => course.name === scheduleData.course);
    const selectedInstructor = instructors.find(instructor => instructor.name === scheduleData.name);

    if (!selectedCourse) {
      console.error('Selected course not found');
      return;
    }
    if (!selectedInstructor) {
        console.error('Selected Instructor not found');
        return;
      }
    const formattedDate = new Date(scheduleData.date).toISOString().split('T')[0];
    console.log(formattedDate)
    const postData = {
      ...scheduleData,
      name: selectedInstructor.name,
      date: formattedDate,
      course: [ {
        courseName: selectedCourse.name,
        courseLevel: selectedCourse.level,
        courseDescription: selectedCourse.description,
        date: formattedDate
      },]

    };
    console.log(postData)

    const response = await axios.post('http://localhost:4000/api/schedule/add', postData, { headers });

    console.log('schedule added successfully:', response.data);
    onscheduleAdded(response.data)
    setError('')
    setscheduleData({ name: '', course: '', date: ''}); // Clear form after successful submission
  } catch (error) {
    console.error('Error adding schedule:', error);
    setError(error.response?.data?.message || 'An error occurred while adding the schedule');

  }
};
  return (
    <form className="form-container" onSubmit={onSubmit}>

      {/* <input type="text" name="name" placeholder="Name" value={scheduleData.name} onChange={onChange} required /> */}
      <select
        className="form-input"
        name="name"
        value={scheduleData.name}
        onChange={onChange}
        
      >
        <option value="" disabled>Select Name</option>
        {instructors.map((instructor) => (
          <option key={instructor._id} value={instructor.name}>{instructor.name}</option>
        ))}
      </select>
      <input className="form-input" type="date" name="date" placeholder="Date" value={scheduleData.date} onChange={onChange} required />
      {/* <input type="text" name="password" placeholder="Password" value={scheduleData.password} onChange={onChange} required /> */}
      <select
        className="form-input"
        name="course"
        value={scheduleData.course}
        onChange={onChange}
        
      >
        <option value="" disabled>Select Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course.name}>{course.name} - {course.level} - {course.description}</option>
        ))}
      </select>
{/* <input type="date" name="date" placeholder="Date" value={scheduleData.date} onChange={onChange}  /> */}

      <button className="form-button" type="submit">Add schedule</button>
      {error && <p className="error-message">{error}</p>}

    </form>
  );
};

export default AddscheduleForm;
