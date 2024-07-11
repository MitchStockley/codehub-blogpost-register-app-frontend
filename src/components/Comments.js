import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadMore from './ReadMore';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ username: '', content: '' });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = `https://springbootapibackend-4.onrender.com/api/posts/${postId}/comments`;
        const response = await axios.get(url);
        setComments(response.data.reverse());
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://springbootapibackend-4.onrender.com/api/posts/${postId}/comments`;
      const response = await axios.post(url, newComment);
      setComments([response.data, ...comments]); // Add the new comment to the top of the list
      setNewComment({ username: '', content: '' }); // Reset form fields after submission
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="comments">
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.username}</strong>: <ReadMore>{comment.content}</ReadMore></p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          name="username"
          value={newComment.username}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <textarea
          name="content"
          value={newComment.content}
          onChange={handleChange}
          placeholder="Write your comment"
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default Comments;
