import React from 'react';
import './Home.css';
import backgroundImage from './images/himage.jpg';
import BlogPostList from './BlogPostList';
import Register from './Register';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="background-image" />
      <div className="home-content">
        {/* <h1>CODE HUB COMMUNITY</h1> */}
        <br />
        <p>
          Welcome to Code Hub! Join our community <br /> and post your code based issues, and receive multiple solutions
          from the Code Hub community!
        </p>
       <br></br>
        <button className="glow-button">
        <Link to="/register">Register to make your first post!</Link>
        </button>
      </div>
      <div className='reg-container'> 
        {/* <Register /> */}
      </div>
      {/* <div className="blog-post-list-container">
        <BlogPostList />
      </div> */}
    </div>
  );
};

export default HomePage;
