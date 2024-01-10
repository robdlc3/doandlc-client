import React, { useEffect, useState } from 'react';
import { get } from '../services/authService';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        get('/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log('Error while fetching posts:', error);
            });
    }, []);
//
    return (
        <div>
            <h1>All Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.story}</p>
                            {/* Render other post details */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default Posts;