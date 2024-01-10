import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../context/loading.context';
import { fileChange } from '../services/fileChange';
import { post } from '../services/authService';

const AddPost = () => {
  const { user, buttonDisabled, setButtonDisabled, posts, setPosts } = useContext(LoadingContext);
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    name: '',
    review: '',
    image: '',
  });

  const handleTextChange = (e) => {
    setNewPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {

    fileChange(e)
      .then((response) => {
        
        const imageUrl = response.data.image;
        setNewPost((prev) => ({ ...prev, image: imageUrl }));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();



    
    post('/posts/create', newPost)
      .then((results) => {
        setPosts([results.data, ...posts]);
        navigate('/posts');
      })
      .catch((err) => {
        console.log(err);
      });
  }
      
return (
  <div>
    <h1>Add Review</h1>
    {user ? (
      <form onSubmit={handleSubmit}>
        <label>Name of Restaurant</label>
        <input type="text" name="name" value={newPost.name} onChange={handleTextChange} />

        <label>Review</label>
        <textarea name="review" value={newPost.review} onChange={handleTextChange} />

        <label>Image</label>
        <input type="file" name="image" onChange={handleFileChange} />

        <button type="submit">Submit Post</button>
      </form>
    ) : (
      <p>User must be logged in to add a post.</p>
    )}
  </div>
);
};


export default AddPost;