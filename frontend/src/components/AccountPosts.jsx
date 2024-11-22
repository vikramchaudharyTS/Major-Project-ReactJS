import React, { useEffect } from 'react';
import { usePostStore } from '../store/postsStore.js'; // Import Zustand store
import axiosInstance from '../utils/axios.js';

function AccountPosts() {
  // Get state and actions from the Zustand store
  const { posts, loading, error, setPosts, setLoading, setError } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching starts
        const response = await axiosInstance.get('/posts');
        setPosts(response.data); // Set the posts data from the response
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong'); // Set error state
      } finally {
        setLoading(false); // Set loading state to false after fetching is complete
      }
    };

    fetchPosts();
  }, [setPosts, setLoading, setError]); // Empty dependency array means it only runs on mount

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
          key={post}
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
