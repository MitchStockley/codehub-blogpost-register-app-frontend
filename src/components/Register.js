import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';





const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://springbootapibackend-4.onrender.com/api/users', formData);
      // Handle successful registration
      console.log(response.data);
      // Navigate to the home page
      navigate('/');
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  return (
    <div className="register-container">
    <div className="register-card">
    <div className="card-content">
      
    <div className="card-left">
    <h2>Already Registered?</h2>
            <p>If you already have an account, click the button below to log in.</p>
            <Link to="/login" className="login-button">
              Login
            </Link>
        
      </div>
      <div className="card-right">
      <h2>Register</h2>
    <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
    </div>
    </div>
    <div className="star-background">
        {/* Generate stars dynamically */}
        {Array.from({ length: 100 }, (_, index) => (
          <div
            key={index}
            className="star"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Register;
