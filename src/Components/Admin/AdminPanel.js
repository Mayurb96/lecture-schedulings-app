import React, { useEffect, useState } from 'react';
// import { useDispatch  } from 'react-redux';
// import { logout } from '../../redux/authSlice';
import AddCourseForm from './AddCourseForm.js';
// import AddInstructorForm from './AddInstructorForm.js';
import axios from 'axios';
// import InstructorList from './InstructorList.js';
// import { useNavigate } from 'react-router-dom';
import AddscheduleForm from './AddLecturesForm.js';
import '../../App.css';



const AdminPanel = () => {
//   const dispatch = useDispatch();
//  // const { user, loading, error } = useSelector((state) => state.auth);
//  const navigate=useNavigate(); 

  const [courses, setCourses] = useState([]);
  //const [instructors, setInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };
    fetchCourses();

//     const fetchInstructors = async () => {
//         try {
//           const token=localStorage.getItem('token');
//           const headers={
//               'Authorization': `Bearer ${token}`,
//               'Content-type' : 'application/json'
//           }      
          
//           const response = await axios.get('http://localhost:4000/api/instructors/',{ headers });
//           setInstructors(response.data);
//           setLoading(false);
//         } catch (error) {
//           setError('Failed to fetch courses');
//           setLoading(false);
//         }
//       };
//       fetchInstructors();
//   }, []);
const fetchLectures = async () => {
    try {
      const token=localStorage.getItem('token');
      const headers={
          'Authorization': `Bearer ${token}`,
          'Content-type' : 'application/json'
      }      
      
      const response = await axios.get('http://localhost:4000/api/schedule/',{ headers });
      setLectures(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };
  fetchLectures();
}, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const courseAdded= (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };
//   const instructorAdded= (newInstructor) => {
//     setInstructors((prevInstructors) => [...prevInstructors, newInstructor]);
//   };
    const scheduleAdded= (newSchedule) => {
        setLectures((prevSchedule) => [...prevSchedule, newSchedule]);
    };
 



  return (
    <div className="admin-panel">

      {/* <h2>Admin Panel</h2> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
      {<AddCourseForm onCourseAdded={courseAdded}/>}
      {/* <AddInstructorForm onInstructorAdded={ instructorAdded } /> */}
      {<AddscheduleForm onscheduleAdded={ scheduleAdded } />}

      <h2>Courses</h2>
      {/* <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.name} - {course.level} - {course.description} </li>
        ))}
      </ul> */}
      <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>{course.name}</td>
            <td>{course.level}</td>
            <td>{course.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
      <h2>Lectures</h2>
      {/* <ul>
        {lectures.map((schedule) => (
          <li key={schedule._id}>{schedule.name} -  {schedule.course.map((course, index) => (
            <span key={index}>
              {course.courseName} - {course.courseLevel} - {course.courseDescription} - {course.date}
            </span>
        ))}
            </li>
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

      {/* <InstructorList/> */}
    </div>
  );
};

export default AdminPanel;
