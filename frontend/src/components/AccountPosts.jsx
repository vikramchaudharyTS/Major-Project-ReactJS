import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios.js';

function AccountPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="hover:scale-105 transition transform rounded overflow-hidden shadow-lg"
        >
          <img
            className="w-full h-64 object-cover object-center"
            src={post.images[0]} // Assuming posts have at least one image
            alt={post.description}
          />
          <div className="p-2">
            <h3 className="text-lg font-semibold">{post.description || 'No description'}</h3>
            <p className="text-gray-600 text-sm">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccountPosts;
