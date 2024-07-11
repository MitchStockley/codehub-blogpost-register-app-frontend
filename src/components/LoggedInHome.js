import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoggedInHome.css';
import { Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://springbootapibackend-4.onrender.com/api/login', formData);
      // Handle successful login
      console.log(response.data);
      // Assuming the response data contains the username
      const { username } = response.data;
      setIsLoggedIn(username);
      
      // Navigate to the logged-in home page
      navigate('/home', { state: { username } });
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-content">
          <div className="login-card-left">
            {/* Add any content for the left section */}
            <h2>Forgot To Register?</h2>
            <p>If you do not already have an account, click the button below to register.</p>
            <Link to="/register" className="login-button">
              Register
            </Link>
          </div>
          <div className="login-card-right">
            <div>
              <h2>Login</h2>
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
                <button type="submit">Login</button>
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

export default Login;
