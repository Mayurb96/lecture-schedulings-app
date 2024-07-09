// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useSelector } from 'react-redux';

const CourseList = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchLectures = async () => {
        console.log(user)
      if (user) {
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
          };
          const id = user._id;
          const response = await axios.post(`http://localhost:4000/api/schedule/${id}`, user,{ headers });
          console.log(response)
          setLectures(response.data);
          setLoading(false);
        } catch (error) {
          if(error.response==='Unauthorized'){
            console.log(error);
            setError('You are not authorized to use this feature. Please contact Admin.')
          }else{
            console.log(error);

            setError('Failed to fetch courses');
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchLectures();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Courses</h2>
      {/* <ul>
        {lectures.map((lecture) => (
          <li key={lecture._id}>{lecture.courseName} - {lecture.courseLevel} - {lecture.date}</li>
        ))}
      </ul> */}
      <table border="1">
      <thead>
        <tr>
          <th>Instructor</th>
          <th>Course Name</th>
          <th>Course Level</th>
          <th>Course Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {lectures.map((schedule) => (
          <React.Fragment key={schedule._id}>
            {schedule.course.map((course, index) => (
              <tr key={index}>
                <td>{schedule.name}</td>
                <td>{course.courseName}</td>
                <td>{course.courseLevel}</td>
                <td>{course.courseDescription}</td>
                <td>{course.date}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>

    </div>
  );
};

export default CourseList;
