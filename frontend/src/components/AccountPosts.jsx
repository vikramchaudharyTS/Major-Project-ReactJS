import React, { useEffect } from 'react';
import { usePostStore } from '../store/postsStore.js'; // Import Zustand store
import axiosInstance from '../utils/axios.js';

function AccountPosts({ userId }) {
  const { posts, loading, error, setPosts, setLoading, setError } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Fetch posts based on whether userId is provided
        const endpoint = userId ? `/users/profile/${userId}` : '/users/profile';
        const response = await axiosInstance.get(endpoint);
        
        // Check if response contains posts, then set them
        if (response.data && response.data.posts) {
          setPosts(response.data.posts); // Assuming the posts are returned in `response.data.posts`
        } else {
          setPosts([]); // If no posts are found
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, setPosts, setLoading, setError]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="w-full text-center text-xl text-gray-500">
        No posts available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {posts.map((post,index) => (
        <div
          key={index}
          className="hover:scale-105 transition transform rounded overflow-hidden shadow-lg"
        >
          <img
            className="w-full h-64 object-cover object-center"
            src={post.images[0]} // Assuming each post has an `images` array
            alt={post.description || 'Post image'}
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
