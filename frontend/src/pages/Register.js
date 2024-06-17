import React, { useState } from 'react';
import '../CSS/Register.css'
import getCurrentLocation from '../utils/useCurrentLocation';
import { json, useNavigate } from 'react-router-dom'; 
import axios from 'axios'
const Register = () => {

  const [mylocationCoord , setLocationCoord] = useState([])
  const [mylocationAdd , setLocationAdd] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    locationAdd: '',
    locationCoord: [],
    profileImage: null,
    panImage: null,
    dob: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));

    console.log(files);
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    console.log(formData);

  await  getCurrentLocation(setLocationAdd, setLocationCoord)
    setFormData({...formData, locationCoord : mylocationCoord})
    console.log(formData);
    
    try{

     

     const response =  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/signup`, {...formData, subject : "New registration", message: `Hi ${formData.username}, you are successfully registered on EMO. ~Abhishek, founder, EMO `}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

      
            console.log(response);

      if(response.status == 201)
      {
        setFormData({
          username: '',
          email: '',
          password: '',
          phone: '',
          locationAdd: '',
          profileImage: null,
          panImage: null,
          dob: '',
        });
       
        alert("Registration successful !!!")
        navigate('/login')
        
      }
      else
      {
        // const jsonData = await response.json()
        console.log("error->" , response);
        // alert(jsonData.msg)
      }

     } catch(err){
       console.log("Error:", err);
     } 

   


  };

  return (
   <div className="register-container">
     <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="locationAdd"
            value={formData.locationAdd}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Upload Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            
            required
          />
        </div>
        <div className="form-group">
          <label>Upload PAN Card Image</label>
          <input
            type="file"
            name="panImage"
            onChange={handleFileChange}
           
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
   </div>
  );
};

export default Register;
