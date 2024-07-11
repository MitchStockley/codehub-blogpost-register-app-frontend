import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Nav from './layout/nav';
import Footer from './layout/footer';
import Register from './components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import BlogPost from './components/BlogPost';
import HomeLogin from './components/HomeLogin';
import Nav2 from './components/LoginNav';
import Login from './components/LoggedInHome'; // Import the correct Login component
import BlogPostList from './components/BlogPostList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setLoggedInUsername(username);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? <Nav2 /> : <Nav />}
      <div className="content-container">
        <Routes>
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<BlogPostList />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="/home" element={isLoggedIn ? <HomeLogin loggedInUsername={loggedInUsername} /> : <Navigate to="/" />} />
          <Route path="/posts/:id" element={<BlogPost loggedInUsername={loggedInUsername} />} /> {/* Update route to accept post ID */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
