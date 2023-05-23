import React from 'react';
import { useLocation } from 'react-router-dom';

const PostDetails = () => {
  const location = useLocation();
  const { post } = location.state;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.story}</p>
      {/* Render other post details */}
    </div>
  );
};

export default PostDetails;