import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from './ImageModal';
import './BlogPostList.css';
import Comments from './Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './BlogPostList.css';

const BlogPostList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('https://springbootapibackend-4.onrender.com/api/posts');
      setBlogPosts(response.data.reverse());
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleImageClick = (image, alt) => {
    setModalImage(image);
    setModalAlt(alt);
  };

  const handleModalClose = () => {
    setModalImage(null);
    setModalAlt('');
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust the format as needed
  };

  return (
    <div className="blog-post-list">
      <h2> Posts</h2>
      <div className="blog-post-container">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post-card">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            {post.username} 
            <br></br>
            <br></br>
            <h3>{post.title}</h3>
          
            
            <p>{post.content}</p>
            {post.image && (
         
            <img
              src={decodeBase64Image(post.image)}
              alt={post.title}
              className="blog-post-image"
              onClick={() => handleImageClick(decodeBase64Image(post.image), post.title)}
            />
          
        )}
         
            
            <br></br>
             
            
            
            <p className="post-createdAt">Created at: {formatCreatedAt(post.createdAt)}</p>
            <Comments postId={post.id} /> 
          </div>
        ))}
      </div>
      {modalImage && (
        <ImageModal image={modalImage} alt={modalAlt} onClose={handleModalClose} />
      )}
      <div className="star-background">
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

export default BlogPostList;
