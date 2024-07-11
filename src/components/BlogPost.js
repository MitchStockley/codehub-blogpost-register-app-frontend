import React, { useState, useEffect } from 'react';
import './BlogPost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from './Comments';  // Import the Comments component

const BlogPost = ({ loggedInUsername }) => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    content: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [post, setPost] = useState(null);  // State to hold the specific post data
  const { id } = useParams();  // Get the post ID from the URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');

    if (loggedInUsername) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: loggedInUsername,
      }));
      localStorage.setItem('username', loggedInUsername);
    } else if (storedUsername) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: storedUsername,
      }));
    }

    // Fetch the specific post data when the component mounts
    const fetchPost = async () => {
      try {
        const postUrl = `https://springbootapibackend-4.onrender.com/api/posts/${id}`;
        console.log("Fetching post from URL:", postUrl);
        const response = await axios.get(postUrl);
        console.log("Post data:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [loggedInUsername, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'username') {
      localStorage.setItem('username', e.target.value);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('content', formData.content);
    postData.append('username', formData.username);
    if (selectedFile) {
      postData.append('file', selectedFile);
    }

    try {
      const response = await axios.post('https://springbootapibackend-4.onrender.com/api/posts', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setFormData({ title: '', content: '', username: formData.username });
      setSelectedFile(null);
      navigate('/posts');
    } catch (error) {
      console.error('Error submitting blog post:', error);
    }
  };

  return (
    <div className="blog-post">
      <form onSubmit={handleSubmit}>
        <div className="post-header">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="post-header">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          placeholder="Write your post..."
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>

      {post && (
        <div className="post-details">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.username}</p>
          <Comments postId={post.id} />  {/* Include the Comments component */}
        </div>
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

export default BlogPost;
