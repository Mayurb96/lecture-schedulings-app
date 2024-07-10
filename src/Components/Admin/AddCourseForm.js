import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../../App.css';

const AddCourseForm = ({ onCourseAdded }) => {
  const [courseData, setCourseData] = useState({ name: '', level: '', description: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();

  const onChange = (e) => setCourseData({ ...courseData, [e.target.name]: e.target.value });

  const onImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result.split(',')[1]; // Get base64 string without the prefix

          const courseDataWithImage = {
            ...courseData,
            image: base64Image
          };

          const response = await axios.post('https://lecture-schedule-backend.vercel.app/api/courses/add', courseDataWithImage, { headers }); //https://lecture-schedule-backend.vercel.app
          console.log('Course added successfully:', response.data);
          onCourseAdded(response.data);

          setCourseData({ name: '', level: '', description: '', image: '' });
          fileInputRef.current.value = '';
          setImageFile(null);
        };

        reader.readAsDataURL(imageFile);
      } else {
        const response = await axios.post('https://lecture-schedule-backend.vercel.app/api/courses/add', courseData, { headers });
        console.log('Course added successfully:', response.data);
        onCourseAdded(response.data);
        setImageFile(null);

        setCourseData({ name: '', level: '', description: '', image: '' });
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <input className="form-input" type="text" name="name" placeholder="Course Name" value={courseData.name} onChange={onChange} required />
      <input className="form-input" type="text" name="level" placeholder="Level" value={courseData.level} onChange={onChange} required />
      <input className="form-input" type="text" name="description" placeholder="Description" value={courseData.description} onChange={onChange} required />
      <input className="form-input" type="file" name="image" onChange={onImageChange} ref={fileInputRef} required />
      <button className="form-button" type="submit">Add Course</button>
    </form>
  );
};

export default AddCourseForm;
