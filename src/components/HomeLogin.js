import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav2 from './LoginNav';
import BlogPost from './BlogPost';
import './HomeLogin.css';

const HomeLogin = () => {
  const location = useLocation();
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const { username } = location.state || {};
    const storedUsername = localStorage.getItem('username');

    if (username) {
      setLoggedInUsername(username);
    } else if (storedUsername) {
      setLoggedInUsername(storedUsername);
    }
  }, [location.state]);

  return (
    <div>
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
      <div className="home-login">
        
        <div className="home-login-content">
          <div className="home-login-content-text">
          <h1>Welcome, {loggedInUsername}!</h1>
          <h2>Stuck on an error? Post your problem and receive helpful solutions from the Code Hub community</h2>
          </div>
          {/* Add any other components or content here */}
          <BlogPost loggedInUsername={loggedInUsername} />
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;
